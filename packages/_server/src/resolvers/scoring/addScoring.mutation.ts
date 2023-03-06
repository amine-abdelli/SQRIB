import { log } from '@sqrib/utils';
import { ApolloError } from 'apollo-server-errors';
import { Context } from '../../utils';
import { addScoringService } from '../../services/scoring/addScoringService.service';

export interface IAddScoring {
  userId: string | undefined,
  type: string,
  mpm: number,
  wrong_words: number,
  correct_letters: number,
  total_letters: number,
  wrong_letters: number,
  precision: number,
  points: number,
  username: string,
  language: string,
  timer: number
}

export async function addScoring(parent: any, args: IAddScoring, ctx: Context) {
  log.info('Trying to add a new score');
  const score = await addScoringService({ ...args, userId: ctx.userId });
  if (!score) {
    log.error('Score could not be added');
    throw new ApolloError('Score could not be added !');
  }
  log.info('Score added with success !');
  return score;
}
