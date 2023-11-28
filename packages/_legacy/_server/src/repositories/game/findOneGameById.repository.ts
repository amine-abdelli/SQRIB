import { PrismaClient } from '@prisma/client';

export function findOneGameById({ gameId }: {gameId: string}, prisma: PrismaClient) {
  return prisma.game.findUnique({
    where: {
      id: gameId,
    },
  });
}
