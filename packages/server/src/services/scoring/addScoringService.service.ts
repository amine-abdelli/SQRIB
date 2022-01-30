import { ApolloError } from 'apollo-server-errors';
import { Context } from '../../utils/context.utils';
import { oneScoreById } from '../../repositories/scoring/oneScoreById.repository';

export async function addScoringService(args: any, context: Context) {
  try {
    const score = await oneScoreById(args, context);
    if (!score) throw new ApolloError('The score created could not be found !');
    return score;
  } catch (error) {
    throw new ApolloError('Error while fetching score', args, { error });
  }
}
