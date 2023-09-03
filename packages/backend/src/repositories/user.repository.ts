import { User } from '@prisma/client';

import { CreateUserRequestBody } from '@sqrib/shared';
import { subDays } from 'date-fns';
import { prisma } from '../client';

/**
 * Create user and its associated settings and palmares.
 * @param data IRegister
 */
export function createUserRepository(data: CreateUserRequestBody): Promise<User> {
  return prisma.user.create({
    data: {
      email: data.email,
      username: data.username,
      password: data.password,
      Palmares: {
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
 * Get user by Email.
 * @param email string
 * @returns one user
 */
export function getUserByEmailRepository(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

/**
 * Update a user by its ID.
 * @param userId string
 * @param data Partial<User>
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

export function getUserByUsernameRepository(username: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: {
      username,
    },
  });
}

export function getUserWeeklyTrackerRepository(userId: string) {
  const daysAgo = subDays(new Date(), 7);
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      sessions: {
        where: {
          created_at: {
            gte: daysAgo,
          },
        },
      },
    },
  });
}
