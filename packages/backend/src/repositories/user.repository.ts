import { Palmares, Score, User } from '@prisma/client';

import { CreateUserRequestBody, colorGenerator } from '@sqrib/shared';
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
      color: colorGenerator(),
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

/**
 * Get one user by its username.
 * @param username string
 * @returns one user
 */
export function getUserByUsernameRepository(username: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: {
      username,
    },
  });
}

/**
 * Get user's weekly tracker.
 * @param userId string
 * @param daysAgo Date
 * @returns a list of scores
 */
export function getUserWeeklyTrackerRepository(userId: string, daysAgo: Date): Promise<Score[]> {
  return prisma.score.findMany({
    where: {
      AND: [
        { user_id: userId },
        { created_at: { gte: daysAgo } },
      ],
    },
  });
}

/**
 * Get user's palmares.
 * @param userId string
 * @returns a palmares
 */
export function getUserPalmares(userId: string): Promise<Palmares | null> {
  return prisma.palmares.findUnique({
    where: {
      user_id: userId,
    },
  });
}

/**
 * Get user's palmares.
 * @param userId string
 * @returns a palmares
 */
export function updatePalmaresRepository(userId: string, data: any): Promise<Palmares | null> {
  return prisma.palmares.update({
    data,
    where: {
      user_id: userId,
    },
  });
}
