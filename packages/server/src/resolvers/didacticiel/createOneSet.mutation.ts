import { log } from '@aqac/utils';
import { createOneSetService } from '../../services/didacticiel/createOneSet.service';
import { Context } from '../../utils/context.utils';

export interface ICreateOneSet {
  letter: string,
  level: number,
}

export async function createOneSet(parent: any, args: ICreateOneSet, context: Context) {
  log.info('Trying to create a new set', { args });
  const { wordSet } = await createOneSetService(args, context);
  log.info('Set created successfully !', { args });
  return wordSet;
}
