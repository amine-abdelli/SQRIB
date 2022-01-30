import { createOneSetService } from '../../services/didacticiel/createOneSet.service';
import { Context } from '../../utils/context.utils';

export interface ICreateOneSet {
  letter: string,
  level: number,
}

export async function createOneSet(parent: any, args: ICreateOneSet, context: Context) {
  console.log('Trying to create a new set');
  const { wordSet } = await createOneSetService(args, context);
  console.log('Set created successfully !');
  return wordSet;
}
