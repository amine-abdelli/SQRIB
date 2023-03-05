import { log } from '@sqrib/utils';
import _ from 'lodash';
import { findOneSetService } from '../../services/didacticiel/findOneSet.service';
import { Context } from '../../utils/context.utils';

export interface IFindOneSet {
  letter: string,
}

export async function findOneSet(parent: any, args: IFindOneSet, context: Context) {
  log.info({ ...args }, 'Trying to fetch a new set');
  const wordSet = await findOneSetService(args, context);
  log.info({ ...args }, 'Set fetched successfully !');
  return _.shuffle(wordSet[0].word_set.slice(0, 500).filter((word) => (args.letter === 'a' ? !word.includes('j') : true)));
}
