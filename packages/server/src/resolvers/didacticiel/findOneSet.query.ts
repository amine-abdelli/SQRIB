import _ from 'lodash';
import { findOneSetService } from '../../services/didacticiel/findOneSet.service';
import { Context } from '../../utils/context.utils';

export interface IFindOneSet {
  letter: string,
}

export async function findOneSet(parent: any, args: IFindOneSet, context: Context) {
  console.log('Trying to fetch a new set');
  const wordSet = await findOneSetService(args, context);
  console.log('Set fetched successfully !');
  return _.shuffle(wordSet[0].wordSet.slice(0, 500).filter((word) => (args.letter === 'a' ? !word.includes('j') : true)));
}
