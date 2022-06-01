import { groupScoresByLanguageAndHighestScores, log } from '@aqac/utils';
import { Score } from '@prisma/client';
import { ApolloError } from 'apollo-server-errors';
import { findManyGames, findManyScores } from '../../repositories';
import { Context } from '../../utils';

function isMulti(score: Score) {
  return score.type === 'multi';
}
function isSolo(score: Score) {
  return score.type === 'solo';
}

export async function findGameDataService(context: Context) {
  const scores = await findManyScores(context.prisma);
  if (!scores) {
    log.error('Scores could not be found');
    throw new ApolloError('Scores could not be found');
  }
  const multiplayerScores = scores.filter(isMulti);
  const scoresInSolo = scores.filter(isSolo);
  const multiplayerGroupedScores = groupScoresByLanguageAndHighestScores(multiplayerScores);
  const scoresInSoloGroupedScores = groupScoresByLanguageAndHighestScores(scoresInSolo);
  const games = await findManyGames(context.prisma);
  if (!games) {
    log.error('Games could not be found');
    throw new ApolloError('Games could not be found');
  }
  return { solo: scoresInSoloGroupedScores, multi: multiplayerGroupedScores, games };
}
