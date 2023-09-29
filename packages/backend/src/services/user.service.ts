/* eslint-disable indent */
/* eslint-disable consistent-return */
import {
  Palmares, Prisma, Score, User,
} from '@prisma/client';
import { Request } from 'express';
import {
  emailPolicy, log, passwordPolicy, usernamePolicy, formatEmail, CreateUserRequestBody,
  uniqueDays, weeklyDaysInTechnicalOrder, roundToDecimal, areTimestampsFromSameDay,
  calculateDaysAgoDate,
} from '@sqrib/shared';
import bcrypt from 'bcryptjs';
import { HttpError, calculateDuration } from '../utils';
import {
  createUserRepository, deleteUserRepository, getAllPalmaresRepository, getGlobalMetricsRepository,
  getUserByEmailRepository, getUserByIdRepository, getUserByUsernameRepository, getUserPalmares,
  getUserScoreRepository, getUserWeeklyTrackerRepository, updateGlobalMetricsRepository,
  updatePalmaresRepository, updateUserByIdRepository,
} from '../repositories';

const GUEST_USER_ID = '48450d94-305b-4934-8f3f-b55bf1511122';

async function updateUserCountMetric() {
  const globalMetrics = await getGlobalMetricsRepository();
  if (globalMetrics) {
    await updateGlobalMetricsRepository(globalMetrics.id, {
      ...globalMetrics,
      account_count: globalMetrics.account_count + 1,
    });
  }
}

export async function createUserService(
  { username, email, password }: CreateUserRequestBody,
): Promise<User> {
  log.info('Creating user with data:', { email });
  if (!emailPolicy.test(email)
    || !passwordPolicy.test(password)
    || !usernamePolicy.test(username)) {
    throw new HttpError(400, 'Invalid email, username or password');
  }

  const user = await getUserByEmailRepository(email);
  if (user) {
    throw new HttpError(403, 'This email is already used');
  }
  const userByUsername = await getUserByUsernameRepository(username);
  if (userByUsername) {
    throw new HttpError(403, 'This username is already taken');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const createdUser = await createUserRepository({
    username,
    email: formatEmail(email),
    password: hashedPassword,
  });
  if (!createdUser) {
    throw new HttpError(500, 'An error occurred while creating a user');
  }
  await updateUserCountMetric();
  log.info('User created successfully:', { email: createdUser.email });
  return createdUser;
}

export async function deleteUserService(req: Request):
  Promise<[Prisma.BatchPayload, Prisma.BatchPayload, Prisma.BatchPayload,
    Prisma.BatchPayload, User] | null> {
  if (req.userId === GUEST_USER_ID) {
    throw new HttpError(400, "Slow down ! You can't change this password or delete guest account. But you can settle down by creating your own ;) !");
  }
  const { password } = req.body;
  log.info('Deleting user:', { userId: req.userId });
  if (!password) {
    throw new HttpError(400, 'Email or password parameter missing');
  }
  const userToDelete = await getUserByIdRepository(req.userId);
  if (!userToDelete) {
    throw new HttpError(404, 'Cannot perform user deletion as user could not be found');
  }
  const isPasswordValid = await bcrypt.compare(password, userToDelete.password);
  if (!isPasswordValid) {
    throw new HttpError(401, 'Invalid password');
  }
  const deleteResponse = await deleteUserRepository(userToDelete.id);
  log.info('User deleted successfully:', { userId: userToDelete.id });
  return deleteResponse;
}

export async function getUserByIdService(req: Request): Promise<User> {
  const { userId } = req;
  const username = req.query.username as string;
  const isVisitingOwnProfile = !username;
  log.info('Getting user by ID: ', { userId });
  if (!userId) {
    throw new HttpError(400, 'Missing user ID');
  }
  let user: User | null;
  if (isVisitingOwnProfile) {
    user = await getUserByIdRepository(userId);
  } else {
    user = await getUserByUsernameRepository(username);
  }
  if (!user) {
    throw new HttpError(404, 'User not found');
  }
  log.info('User data retrieved successfully:', { email: user.email });
  return user;
}

export async function getUserByEmailService(email: string): Promise<User | null> {
  log.info('Getting user by email: ', { email });
  if (!emailPolicy.test(email)) {
    throw new HttpError(400, 'Invalid email format or parameter missing');
  }
  const user = await getUserByEmailRepository(email);
  if (!user) {
    throw new HttpError(404, 'User not found');
  }
  log.info('User data retrieved successfully:', { email: user.email });
  return user;
}

export async function updateUserByIdService(userId: string, data: User):
  Promise<User> {
  log.info('Updating user by ID: ', userId);
  if (!userId) {
    throw new HttpError(400, 'Missing user ID');
  }
  const user = await getUserByIdRepository(userId);
  if (!user) {
    throw new HttpError(404, 'User not found');
  }
  const updatedUser = await updateUserByIdRepository(user.id, data);
  if (!updatedUser) {
    throw new HttpError(500, 'An error occurred while updating user');
  }
  log.info('User updated successfully:', { email: updatedUser?.email });
  return updatedUser;
}

export async function getUserWeeklyTrackerService(req: Request) {
  const username = req.query.username as string;

  const isVisitingOwnProfile = !username;
  log.info('Getting user weekly tracker');
  let user: User | null;
  if (!isVisitingOwnProfile) {
    user = await getUserByUsernameRepository(username);
  } else {
    user = await getUserByIdRepository(req.userId);
  }
  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  const today = new Date();
  const daysAgo = calculateDaysAgoDate(today);

  const weeklyTracker = await getUserWeeklyTrackerRepository(user.id, daysAgo) ?? [];

  const uniqueDates = uniqueDays(weeklyTracker.map((s: Score) => s.created_at.toString()));

  const daysOfActivity = Array.from(new Set(uniqueDates.map(
    (date) => weeklyDaysInTechnicalOrder[new Date(date).getDay()],
  )));

  const totalTypedWords = weeklyTracker.reduce((total, score) => total + score.typed_words, 0);

  log.info('User weekly tracker retrieved successfully:', { email: user.email });
  return {
    daysOfActivity,
    sessionCount: weeklyTracker.length ?? 0,
    typedWordsCount: totalTypedWords,
  };
}

export async function getUserStatsService(req: Request) {
  const username = req.query.username as string;
  const isVisitingOwnProfile = !username;
  log.info('Getting user stats');
  if (!req.userId) { throw new HttpError(400, 'Missing user ID'); }
  let user: User | null;

  if (isVisitingOwnProfile) {
    user = await getUserByIdRepository(req.userId);
  } else {
    user = await getUserByUsernameRepository(username);
  }

  if (!user) {
    throw new HttpError(404, 'User not found');
  }
  const palmares = await getUserPalmares(user.id);
  log.info('User stats retrieved successfully:', { email: user.email });
  return palmares;
}

export async function updatePalmaresService(userId: string, score: Score) {
  const palmares = await getUserPalmares(userId);
  if (!palmares) {
    throw new HttpError(404, 'Palmares not found');
  }

  const newPalmares: Partial<Palmares> = {
    session_count: palmares.session_count + 1,
    best_wpm: score.wpm > palmares.best_wpm ? score.wpm : palmares.best_wpm,
    total_points: palmares.total_points + score.points,
    total_words_typed: palmares.total_words_typed + (score.typed_words || 0),
    total_time_in_seconds: palmares
      .total_time_in_seconds + calculateDuration(Number(score.start_time), Number(score.end_time)),
    best_points: score.points > palmares.best_points ? score.points : palmares.best_points,
    average_wpm: Math.round(((
      palmares.average_wpm * palmares.session_count) + score.wpm) / (palmares.session_count + 1)),
    average_accuracy: roundToDecimal(((
      palmares.average_accuracy * palmares.session_count) + score.accuracy) / (palmares
        .session_count + 1)),
    last_activity: new Date(),
    days_of_activity: areTimestampsFromSameDay(palmares?.last_activity, new Date())
      ? palmares.days_of_activity : palmares.days_of_activity + 1,
  };

  const updatedPalmares = await updatePalmaresRepository(userId, newPalmares);
  if (!updatedPalmares) {
    throw new HttpError(500, 'An error occurred while updating palmares');
  }
}

export async function updateGlobalMetricsService(score: Score) {
  log.info('Updating global metrics');
  const globalMetrics = await getGlobalMetricsRepository();

  if (!globalMetrics) {
    throw new HttpError(404, 'An error occured while updating global metrics');
  }

  const newGlobalMetrics = {
    ...globalMetrics,
    game_count: globalMetrics.game_count + 1,
    best_wpm: score.wpm > globalMetrics.best_wpm ? score.wpm : globalMetrics.best_wpm,
    average_wpm: Math.round(((
      globalMetrics.average_wpm * globalMetrics.game_count)
      + score.wpm) / (globalMetrics.game_count + 1)),
    average_accuracy: roundToDecimal(((
      globalMetrics.average_accuracy * globalMetrics.game_count) + score.accuracy) / (globalMetrics
        .game_count + 1)),
    best_accuracy: score.accuracy > globalMetrics.best_accuracy
      ? score.accuracy
      : globalMetrics.best_accuracy,
    best_points: score.points > globalMetrics.best_points
      ? score.points
      : globalMetrics.best_points,
    average_points: Math.round(((
      globalMetrics.average_points * globalMetrics.game_count)
      + score.points) / (globalMetrics.game_count + 1)),
    total_points: globalMetrics.total_points + score.points,
    total_time_in_seconds: globalMetrics.total_time_in_seconds + calculateDuration(
      Number(score.start_time),
      Number(score.end_time),
    ),
    // total_typed_words: globalMetrics.total_typed_words + (score.typed_words || 0),
  };

  await updateGlobalMetricsRepository(globalMetrics.id, newGlobalMetrics);
  log.info('Global metrics updated successfully');
}

export function setRankingOrder(sortedUsers: (Palmares & { user: User })[], userRankIndex: number) {
  let count = [];
  for (let i = userRankIndex - 2; i < userRankIndex + 3; i += 1) {
    count.push(i);
  }
  if (userRankIndex === 0 || userRankIndex === 1 || userRankIndex === 2 || userRankIndex === 3
    || userRankIndex === 4) {
    count = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  } else if (userRankIndex === sortedUsers.length - 1 || userRankIndex === sortedUsers.length - 2
    || userRankIndex === sortedUsers.length - 3 || userRankIndex === sortedUsers.length - 4
    || userRankIndex === sortedUsers.length - 5) {
    count = [
      sortedUsers.length - 11,
      sortedUsers.length - 10,
      sortedUsers.length - 9,
      sortedUsers.length - 8,
      sortedUsers.length - 7,
      sortedUsers.length - 6,
      sortedUsers.length - 5,
      sortedUsers.length - 4,
      sortedUsers.length - 3,
      sortedUsers.length - 2,
      sortedUsers.length - 1];
  } else {
    count = [
      userRankIndex - 5,
      userRankIndex - 4,
      userRankIndex - 3,
      userRankIndex - 2,
      userRankIndex - 1,
      userRankIndex,
      userRankIndex + 1,
      userRankIndex + 2,
      userRankIndex + 3,
      userRankIndex + 4,
      userRankIndex + 5,
    ];
  }
  return count;
}

export async function getUserRankService(req: Request) {
  const username = req.query.username as string;
  const isVisitingOwnProfile = !username;

  let user: User | null;

  if (isVisitingOwnProfile) {
    user = await getUserByIdRepository(req.userId);
  } else {
    user = await getUserByUsernameRepository(username);
  }

  if (!user?.id) { throw new HttpError(404, 'The user your trying to get palmares from does not exists'); }

  const palmares = await getUserPalmares(user.id ?? req.userId);
  if (!palmares) { throw new HttpError(404, 'Palmares not found'); }

  const users = await getAllPalmaresRepository();
  const sortedUsers = users.sort((_a, b) => b.best_wpm - _a.best_wpm);
  const userRankIndex = sortedUsers.findIndex((p) => p.user_id === (user?.id ?? ''));
  const userRank = userRankIndex + 1;
  // Uncomment this to send only the 5 users before and after the user
  // const range = setRankingOrder(sortedUsers, userRankIndex).map((i) => ({
  const range = sortedUsers.map((sortedUser, i) => ({
    best_wpm: sortedUser?.best_wpm,
    username: sortedUser?.user.username,
    average_accuracy: sortedUser?.average_accuracy,
    avatar: sortedUser?.user.avatar,
    color: sortedUser?.user.color,
    rank: i + 1,
    current: i === userRankIndex,
  }));

  return {
    user_rank: userRank,
    range,
    username: user.username,
    total_users: sortedUsers?.length ?? 0,
    user_total_points: palmares.total_points ?? 0,
    user_best_wpm: palmares.best_wpm ?? 0,
    uer_average_accuracy: palmares.average_accuracy ?? 0,
  };
}

export async function getUserScoresService(req: Request) {
  log.info('Getting user scores');
  // eslint-disable-next-line prefer-destructuring
  const username = req.query.username;

  if (!req.userId) {
    throw new HttpError(400, 'Missing user ID');
  }

  const user = await getUserByIdRepository(req.userId);

  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  if (username) {
    const userByUsername = await getUserByUsernameRepository(username as string);
    if (userByUsername) {
      const userScore = await getUserScoreRepository(userByUsername.id);
      return userScore ?? [];
    }
    throw new HttpError(404, "The user you're trying to get the scores from does not exist");
  }

  const userScore = await getUserScoreRepository(req.userId);

  log.info('User scores retrieved successfully:', { email: user?.email });
  return userScore ?? [];
}

export async function updatePasswordService(req: Request) {
  if (req.userId === GUEST_USER_ID) {
    throw new HttpError(400, "Slow down ! You can't change this password or delete guest account. But you can settle down by creating your own ;) !");
  }

  log.info('Updating password', { userId: req.userId });
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new HttpError(400, 'Missing old or new password');
  }
  const user = await getUserByIdRepository(req.userId);
  if (!user) {
    throw new HttpError(404, 'User not found');
  }
  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordValid) {
    throw new HttpError(401, 'Invalid password');
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const updatedUser = await updateUserByIdRepository(user.id, { password: hashedPassword });
  log.info('Password updated successfully:', { email: updatedUser?.email });
  return updatedUser;
}
