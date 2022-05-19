import { log } from '@aqac/utils';
import { createAllSetsService } from '../../services/didacticiel/createAllSets.service';
import { Context } from '../../utils/context.utils';

export async function createAllSets(parent: any, args: any, context: Context) {
  log.info('Trying to create all sets');
  await createAllSetsService(context);
  log.info('All sets created successfully');
  return { message: 'All sets created successfully' };
}
