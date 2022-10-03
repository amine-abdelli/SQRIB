import { prisma } from '../../client';

export async function createOnePlayer(args: any) {
  return prisma.player.create({
    data: args,
    select: {
      id: true,
    },
  });
}
