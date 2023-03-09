import { prisma } from '../../client';

export function createOneScore(args: any) {
  return prisma.score.create({
    data: { ...args },
  });
}
