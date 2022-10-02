import { prisma } from '../../client';

export function findManyScores() {
  return prisma.score.findMany();
}
