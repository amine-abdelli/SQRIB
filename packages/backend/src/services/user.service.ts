/* eslint-disable consistent-return */
import {
  Palmares, Prisma, Score, User,
} from '@prisma/client';
import { Request } from 'express';
import {
  emailPolicy, log, passwordPolicy, usernamePolicy, formatEmail, CreateUserRequestBody,
  uniqueDays, weeklyDaysInTechnicalOrder, roundToDecimal, areTimestampsFromSameDay,
} from '@sqrib/shared';
import bcrypt from 'bcryptjs';
import { subDays } from 'date-fns';
import { HttpError, calculateDuration } from '../utils';
import {
  createUserRepository, deleteUserRepository, getUserByEmailRepository, getUserByIdRepository,
  getUserByUsernameRepository, getUserPalmares, getUserWeeklyTrackerRepository,
  updatePalmaresRepository, updateUserByIdRepository,
} from '../repositories/user.repository';

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
  log.info('User created successfully:', { email: createdUser.email });
  return createdUser;
}

export async function deleteUserService(email: string, password: string):
  Promise<[Prisma.BatchPayload, User] | null> {
  log.info('Deleting user:', { email });
  if (!email || !password) {
    throw new HttpError(400, 'Email or password parameter missing');
  }
  const userToDelete = await getUserByEmailRepository(formatEmail(email));
  if (!userToDelete) {
    throw new HttpError(404, 'Cannot perform user deletion as user could not be found');
  }
  const isPasswordValid = await bcrypt.compare(password, userToDelete.password);
  if (!isPasswordValid) {
    throw new HttpError(401, 'Invalid password');
  }
  const deleteResponse = await deleteUserRepository(userToDelete.id);
  log.info('User deleted successfully:', { email });
  return deleteResponse;
}

export async function getUserByIdService(userId: string): Promise<User> {
  log.info('Getting user by ID: ', { userId });
  if (!userId) {
    throw new HttpError(400, 'Missing user ID');
  }
  const user = await getUserByIdRepository(userId);
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

export async function updateUserByIdService(userId: string, data: Partial<User>):
  Promise<User | null> {
  log.info('Updating user by ID: ', userId);
  if (!userId) {
    throw new HttpError(400, 'Missing user ID');
  }
  const user = await getUserByIdRepository(userId);
  if (!user) {
    throw new HttpError(404, 'User not found');
  }
  const updatedUser = await updateUserByIdRepository(user.id, data);
  log.info('User updated successfully:', { email: updatedUser?.email });
  return updatedUser;
}

export async function getUserWeeklyTrackerService(req: Request) {
  log.info('Getting user weekly tracker');
  const user = await getUserByIdService(req.userId);
  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  const daysAgo = subDays(new Date(), (new Date().getDay() || 7));

  const weeklyTracker = await getUserWeeklyTrackerRepository(req.userId, daysAgo) ?? [];

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
  log.info('Getting user stats');
  const user = await getUserByIdService(req.userId);
  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  const palmares = await getUserPalmares(req.userId);
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
