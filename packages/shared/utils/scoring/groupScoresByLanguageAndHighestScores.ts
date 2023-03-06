import _ from 'lodash';

/**
 * Takes an array of Scores and group them by highest scores per language
 * @param scores Score[]
 * @returns return an object with the language as key and the highest scores as value
 */
export function groupScoresByLanguageAndHighestScores(scores: any) {
  const sortedByLanguage = _.groupBy(scores, 'language');
  const GroupObject: any = {};
  // eslint-disable-next-line no-unreachable-loop
  for (const [aGroupKey, aGroupValue] of Object.entries(sortedByLanguage)) {
    // Group by username
    const usersGroupedByTheirName = _.groupBy(aGroupValue, 'username');
    // Array where best score will be pushed into
    const bestUsersScore = [];
    // Find the highest score of each user
    for (const aBestScore of Object.values(usersGroupedByTheirName)) {
      const bestScore = _.maxBy(aBestScore, 'mpm');
      bestUsersScore.push(bestScore);
    }
    // Sort it by mpm or precision (if a & b mpm are equals)
    GroupObject[aGroupKey] = bestUsersScore.sort((a, b) => {
      if (b.mpm === a.mpm) {
        return b.precision - a.precision;
      }
      return b.mpm - a.mpm;
    });
  }
  return GroupObject;
}
