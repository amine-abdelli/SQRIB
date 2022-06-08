import { Context } from '../../utils/context.utils';

export function createOneScore(args: any, { prisma, userId }: Context) {
  return prisma.score.create({
    data: {
      ...args,
      userId: userId || null,
    },
  });
}
