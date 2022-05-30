import { log } from '@aqac/utils';
import { ApolloError } from 'apollo-server-errors';
import { findManyGames, findManyScores } from '../../repositories';
import { Context } from '../../utils';

export async function findGameDataService(context: Context) {
  const scores = await findManyScores(context.prisma);
  if (!scores) {
    log.error('Scores could not be found');
    throw new ApolloError('Scores could not be found');
  }
  const games = await findManyGames(context.prisma);
  if (!games) {
    log.error('Games could not be found');
    throw new ApolloError('Games could not be found');
  }
  return { scores, games };
}
