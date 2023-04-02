/* eslint-disable consistent-return */
import { Prisma, User } from '@prisma/client';
import {
  emailPolicy, IUser, log, passwordPolicy, usernamePolicy,
} from '@sqrib/shared';
import bcrypt from 'bcryptjs';
import { HttpError } from '../utils/error.utils';
import {
  createUserRepository, deleteUserRepository, getUserByEmailRepository, getUserByIdRepository,
  updateUserByIdRepository,
} from '../repositories/user.repository';

export async function createUserService(
  { username, email, password }: IUser,
): Promise<User> {
  log.info('Creating user with data:', { email });
  if (!emailPolicy.test(email)
  || !passwordPolicy.test(password)
  || !usernamePolicy.test(username)) {
    throw new HttpError(400, 'Invalid email, username or password');
  }

  const user = await getUserByEmailRepository(email);
  if (user) {
    throw new HttpError(403, 'User already exists');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const createdUser = await createUserRepository({ username, email, password: hashedPassword });
  if (!createdUser) {
    throw new HttpError(500, 'An error occurred while creating a user');
  }
  log.info('User created successfully:', { email: createdUser.email });
  return createdUser;
}

export async function deleteUserService(email: string, password: string):
Promise<[Prisma.BatchPayload, Prisma.BatchPayload, User] | null> {
  log.info('Deleting user:', { email });
  if (!email || !password) {
    throw new HttpError(400, 'Email or password parameter missing');
  }
  const userToDelete = await getUserByEmailRepository(email);
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

export async function getUserByIdService(userId: string): Promise<User | null> {
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
