import { log } from '@aqac/utils';
import _ from 'lodash';
import { findOneSetService } from '../../services/didacticiel/findOneSet.service';
import { Context } from '../../utils/context.utils';

export interface IFindOneSet {
  letter: string,
}

export async function findOneSet(parent: any, args: IFindOneSet, context: Context) {
  log.info('Trying to fetch a new set', { ...args });
  const wordSet = await findOneSetService(args, context);
  log.info('Set fetched successfully !');
  return _.shuffle(wordSet[0].wordSet.slice(0, 500).filter((word) => (args.letter === 'a' ? !word.includes('j') : true)));
}
