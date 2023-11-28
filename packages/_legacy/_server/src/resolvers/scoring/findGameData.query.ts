import { log } from '@sqrib/utils';
import { findGameDataService } from '../../services/game/findGameDataService.service';

/**
 * Returns Scores and games data well formatted for main page display
 */
export async function findGameData() {
  log.info('Trying to fetch all game & scores data');
  const { multi, solo, games } = await findGameDataService();
  log.info('Game & scores data fetched successfully');
  return { multi, solo, games };
}
