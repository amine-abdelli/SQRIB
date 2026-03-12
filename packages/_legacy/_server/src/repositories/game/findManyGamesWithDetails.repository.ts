import { PrismaClient } from '@prisma/client';
import { fetchScoringDataArgs } from '../../resolvers/game';

export function findManyGamesWithDetails({ userId }: fetchScoringDataArgs, prisma: PrismaClient) {
  return prisma.game.findMany({
    where: {
      players: {
        some: {
          user_id: userId,
        },
      },
    },
    include: {
      players: {
        include: {
          score: true,
        },
      },
    },
  });
}
