import { log } from '@aqac/utils';
import { ApolloError } from 'apollo-server-errors';
import { addScoringService } from '../../services/scoring/addScoringService.service';
import { Context } from '../../utils/context.utils';

export interface IAddScoring {
  type: string
  mpm: number
  wrong_words: number
  correct_letters: number
  total_letters: number
  wrong_letters: number
  precision: number
  points: number
  username: string
  language: string
  timer: number
}

export async function addScoring(parent: any, args: IAddScoring, context: Context) {
  log.info('Trying to add a new score', { userId: context.userId });
  const score = await addScoringService(args, context);
  if (!score) {
    log.error('Score could not be added');
    throw new ApolloError('Score could not be added !');
  }
  log.info('Score added with success !', { userId: context.userId });
  return score;
}
