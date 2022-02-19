import { createAllSetsService } from '../../services/didacticiel/createAllSets.service';
import { Context } from '../../utils/context.utils';

export async function createAllSets(parent: any, args: any, context: Context) {
  await createAllSetsService(context);
  return { message: 'All sets created successfully' };
}
