import { PrismaClient } from '@prisma/client';

export async function createOnePlayer(args: any, prisma: PrismaClient) {
  return prisma.player.create({
    data: args,
    select: {
      id: true,
    },
  });
}
