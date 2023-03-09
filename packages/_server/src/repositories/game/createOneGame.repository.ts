import { prisma } from '../../client';

export async function createOneGame(args: any) {
  return prisma.game.create({
    data: {
      ...args,
      word_amount: +args.word_amount,
    },
    select: {
      id: true,
    },
  });
}
