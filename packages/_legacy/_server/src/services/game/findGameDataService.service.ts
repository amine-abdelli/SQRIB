import {
  groupScoresByLanguageAndHighestScores, isMulti, isSolo, log,
} from '@sqrib/utils';
import { ApolloError } from 'apollo-server-errors';
import { findManyGames, findManyScores } from '../../repositories';

export async function findGameDataService() {
  const scores = await findManyScores();
  if (!scores) {
    log.error('Scores could not be found');
    throw new ApolloError('Scores could not be found');
  }
  const multiplayerScores = scores.filter(isMulti);
  const scoresInSolo = scores.filter(isSolo);
  const multiplayerGroupedScores = groupScoresByLanguageAndHighestScores(multiplayerScores);
  const scoresInSoloGroupedScores = groupScoresByLanguageAndHighestScores(scoresInSolo);
  const games = await findManyGames();
  if (!games) {
    log.error('Games could not be found');
    throw new ApolloError('Games could not be found');
  }
  return { solo: scoresInSoloGroupedScores, multi: multiplayerGroupedScores, games };
}
