import { ApolloError } from 'apollo-server-errors';
import { IAddScoring } from '../../resolvers/scoring';
import { createOneScore } from '../../repositories/scoring/oneScoreById.repository';

export async function addScoringService(args: IAddScoring) {
  try {
    const score = await createOneScore(args);
    if (!score) throw new ApolloError('The score created could not be found !');
    return score;
  } catch (error) {
    throw new ApolloError(`Error while fetching score ${{ error }}`);
  }
}
