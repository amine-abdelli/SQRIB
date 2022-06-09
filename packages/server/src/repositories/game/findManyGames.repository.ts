import { PrismaClient } from '@prisma/client';

export function findManyGames(prisma: PrismaClient) {
  return prisma.game.findMany();
}
