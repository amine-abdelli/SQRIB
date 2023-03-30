import { IUser } from '@sqrib/shared';
import { User } from '@prisma/client';
import { prisma } from '../client';

/**
 * Create user and its associated settings and palmares.
 * @param data IUser
 */
export function createUserRepository(data: IUser): Promise<User> {
  return prisma.user.create({
    data: {
      email: data.email,
      username: data.username,
      password: data.password,
      Palmares: {
        create: {},
      },
      Settings: {
        create: {},
      },
    },
  });
}

/**
 * Deletes user and its associated settings and palmares.
 * @param userId string
 */
export function deleteUserRepository(userId: string) {
  return prisma.$transaction([
    prisma.palmares.deleteMany({ where: { user_id: userId } }),
    prisma.settings.deleteMany({ where: { user_id: userId } }),
    prisma.user.delete({ where: { id: userId } }),
  ]);
}

/**
 * Get user by ID.
 * @param userId string
 * @returns a one user
 */
export function getUserByIdRepository(userId: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}

/**
 * Update a user by its ID.
 * @param userId string
 * @param data Partia<User>
 * @returns An updated user
 */
export function updateUserByIdRepository(userId: string, data: Partial<User>) {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data,
  });
}
