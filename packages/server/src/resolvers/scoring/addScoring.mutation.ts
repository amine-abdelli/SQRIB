import { ApolloError } from 'apollo-server-errors';
import { addScoringService } from '../../services/scoring/addScoringService.service';
import { Context } from '../../utils/context.utils';

interface IAddScoring {
  timing: string
  mpm: number
  wrong_words: number
  correct_letters: number
  total_letters: number
  wrong_letters: number
  precision: number
  points: number
  game_mode: string
}

export async function addScoring(parent: any, args: IAddScoring, context: Context) {
  console.log('Trying to add a new score');
  const score = await addScoringService(args, context);
  if (!score) {
    throw new ApolloError('Score could not be added !');
  }
  console.log('Score added with success !');
  return score;
}
