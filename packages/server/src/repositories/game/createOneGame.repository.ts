import { PrismaClient } from '@prisma/client';

export async function createOneGame(args: any, prisma: PrismaClient) {
  return prisma.game.create({
    data: args,
    select: {
      id: true,
    },
  });
}
