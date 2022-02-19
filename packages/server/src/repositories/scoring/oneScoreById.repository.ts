import { Context } from '../../utils/context.utils';

export function oneScoreById(args: any, { prisma, userId }: Context) {
  return prisma.score.create({
    data: {
      ...args,
      userId,
    },
    select: {
      id: true,
      timing: true,
      mpm: true,
      wrong_words: true,
      correct_letters: true,
      total_letters: true,
      wrong_letters: true,
      precision: true,
      points: true,
      game_mode: true,
      createdAt: true,
    },
  });
}
