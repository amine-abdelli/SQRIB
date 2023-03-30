import { User } from '@prisma/client';
import { IUser, log } from '@sqrib/shared';
import {
  createUserRepository, deleteUserRepository, getUserByIdRepository, updateUserByIdRepository,
} from '../repositories/user.repository';

export function createUserService(data: IUser): Promise<User> {
  try {
    log.info('Creating user with data:', { email: data.email });
    return createUserRepository(data);
  } catch (error) {
    log.error('Error creating user with settings and palmares:', error);
    throw error;
  }
}

export function deleteUserService(userId: string) {
  try {
    log.info('Deleting user:', { userId });
    return deleteUserRepository(userId);
  } catch (error) {
    log.error('Error deleting user with settings and palmares:', { error });
    throw error;
  }
}

export function getUserByIdService(userId: string): Promise<User | null> {
  try {
    log.info('Getting user by ID: ', userId);
    return getUserByIdRepository(userId);
  } catch (error) {
    log.error('Error getting user by ID: ', error);
    throw error;
  }
}

export function updateUserByIdService(userId: string, data: Partial<User>): Promise<
User | null> {
  try {
    log.info('Updating user by ID: ', userId);
    return updateUserByIdRepository(userId, data);
  } catch (error) {
    log.error('Error updating user by ID: ', error);
    throw error;
  }
}
