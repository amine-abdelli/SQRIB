import { PrismaClient } from '@prisma/client';
import { fetchScoringDataArgs } from '../../resolvers/game';

interface findManyScoresByTypeArgs extends fetchScoringDataArgs {
  type: string
}

export function findManyScoresByType(
  { userId, type }: findManyScoresByTypeArgs,
  prisma: PrismaClient,
) {
  return prisma.score.findMany({
    where: {
      type,
      userId,
    },
  });
}
