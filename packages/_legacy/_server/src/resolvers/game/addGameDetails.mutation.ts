import { log } from '@sqrib/utils';
import { addGameDetailsService } from '../../services/game/addGameDetailsService.service';

export async function addGameDetails(parent: any, args: any) {
  log.info('Trying to add one game');
  await addGameDetailsService(args);
  log.info('Game added successfully');
  return { message: 'Game added successfully' };
}
