import { log } from '@sqrib/utils';
import { Score } from '@prisma/client';
import { ApolloError } from 'apollo-server-errors';
import { findManyScoresByUserId } from '../../repositories';
import { Context } from '../../utils/context.utils';

export async function findScores(parent: any, args: any, context: Context): Promise<Score[]> {
  log.info(`Trying to find many scores by userId, ${{ userId: context.userId }}`);
  const { userId } = context;
  if (!userId) {
    log.error('A userId was not provided while trying to find many scores by userId');
    throw new ApolloError('User not found');
  }
  const scores = findManyScoresByUserId({ userId }, context.prisma);
  if (!scores) {
    log.error('Scores could not be found');
    throw new ApolloError('User not found');
  }
  log.info(`Scores fetched successfully, ${{ userId: context.userId }}`);
  return scores;
}
