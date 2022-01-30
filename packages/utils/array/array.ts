import { roundNumber } from '..';

function topValue(array: Array<number>, key: 'points' | 'mpm' | 'precision' | 'value') {
  if (!array?.length) return 0;
  return roundNumber(array?.reduce((acc: number, score: any) => Math.max(acc, score[key]), 0), 2);
}

function averageValue(array: Array<number>, key: 'points' | 'mpm' | 'precision' | 'value') {
  if (!array?.length) return 0;
  return roundNumber(array.reduce((acc: number, score: any) => acc + score[key], 0)
   / array.length, 2);
}

export { topValue, averageValue };
