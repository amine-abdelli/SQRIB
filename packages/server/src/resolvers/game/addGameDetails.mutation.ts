import { log } from '@aqac/utils';
import { addGameDetailsService } from '../../services/game/addGameDetailsService.service';
import { Context } from '../../utils/context.utils';

export async function addGameDetails(parent: any, args: any, context: Context) {
  log.info('Trying to add one game');
  await addGameDetailsService(args, context);
  log.info('Game added successfully');
  return { message: 'Game added successfully' };
}
