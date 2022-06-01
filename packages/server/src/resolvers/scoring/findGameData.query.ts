import { log } from '@aqac/utils';
import { findGameDataService } from '../../services/game/findGameDataService.service';
import { Context } from '../../utils';

/**
 * Returns Scores and games data well formatted for main page display
 */
export async function findGameData(parent: any, args: any, context: Context) {
  log.info('Trying to fetch all game & scores data');
  const { multi, solo, games } = await findGameDataService(context);
  log.info('Game & scores data fetched successfully');
  return { multi, solo, games };
}
