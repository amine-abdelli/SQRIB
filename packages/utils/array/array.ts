import { roundNumber } from '..';

/**
 * Returns the highest value of an array of scores
 * @param array Array of scores
 * @param key Defined key
 * @returns the highest value
 */
function topValue(array: any[], key: 'points' | 'mpm' | 'precision' | 'value') {
  if (!array?.length) return 0;
  return roundNumber(array?.reduce(
    (acc, score): number => Math.max(acc, score[key]),
    0,
  ), 2);
}

/**
 * Returns the average value of an array of scores
 * @param array Array of scores
 * @param key Defined key
 * @returns the average value
 */
function averageValue(array: any[], key: 'points' | 'mpm' | 'precision' | 'value') {
  if (!array?.length) return 0;
  return roundNumber(array.reduce((acc, score) => acc + score[key], 0)
    / array.length, 2);
}

export { topValue, averageValue };
