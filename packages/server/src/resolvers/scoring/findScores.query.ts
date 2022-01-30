import { PrismaPromise, Score } from '@prisma/client';
import { Context } from '../../utils/context.utils';

export async function findScores(parent: any, args: any, context: Context): Promise<Score[]> {
  const scores: PrismaPromise<Score[]> = context.prisma.score.findMany({
    where: {
      userId: context.userId,
    },
  });
  return scores;
}
