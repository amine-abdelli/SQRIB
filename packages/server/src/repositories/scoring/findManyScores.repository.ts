import { PrismaClient } from '@prisma/client';

export function findManyScores(prisma: PrismaClient) {
  return prisma.score.findMany();
}
