import { groupScoresByLanguageAndHighestScores, log } from '@aqac/utils';
import { findGameDataService } from '../../services/game/findGameDataService.service';
import { Context } from '../../utils';

/**
 * Returns Scores and games data well formatted for main page display
 */
export async function findGameData(parent: any, args: any, context: Context) {
  log.info('Trying to fetch all game & scores data');
  const { scores, games } = await findGameDataService(context);
  const groupedScores = groupScoresByLanguageAndHighestScores(scores);
  log.info('Game & scores data fetched successfully');
  return { scores: groupedScores, games };
}
