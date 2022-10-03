import { prisma } from '../../client';

export async function createOneGame(args: any) {
  return prisma.game.create({
    data: args,
    select: {
      id: true,
    },
  });
}
