import { Context } from '../../utils/context.utils';

export function createOneScore(args: any, { prisma, userId }: Context) {
  return prisma.score.create({
    data: {
      ...args,
      userId: userId || null,
    },
    select: {
      id: true,
      type: true,
      mpm: true,
      wrong_words: true,
      correct_letters: true,
      total_letters: true,
      wrong_letters: true,
      precision: true,
      points: true,
      createdAt: true,
    },
  });
}
