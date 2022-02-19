import { averageValue, roundNumber, topValue } from '@aqac/utils';

export function createTopScoringObject(scores: any) {
  return {
    averageMpm: averageValue(scores, 'mpm') || 0,
    averagePoints: averageValue(scores, 'points') || 0,
    topMpm: topValue(scores, 'mpm') || 0,
    topPoint: topValue(scores, 'points') || 0,
    latestMpm: scores?.at(-1)?.mpm || 0,
    latestPoints: scores?.at(-1)?.points || 0,
    precision: averageValue(scores, 'precision'),
    totalGame: scores?.length,
  };
}

export function createScoringObject(correctWords: any, computedWords: any) {
  const wrongWords: number = computedWords.length - correctWords.length;
  const correctLetters: number = correctWords.join('').length + correctWords.length;
  const totalLetters: number = computedWords.join('').length + correctWords.length;
  const wrongLetters: number = totalLetters - correctLetters;
  const precision: number = roundNumber((correctLetters / totalLetters) * 100, 0) || 0;
  const wordPerMinute: number = correctLetters / 5;
  const points: number = roundNumber(correctLetters * (precision / 100), 0);
  const mpm: number = roundNumber(wordPerMinute, 0);
  return {
    wrongWords,
    correctLetters,
    totalLetters,
    wrongLetters,
    precision,
    points,
    mpm,
  };
}
