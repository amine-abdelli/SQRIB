import { averageValue, topValue } from '@aqac/utils';

export function createScoringObject(scores: any) {
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
