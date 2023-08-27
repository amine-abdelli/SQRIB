export interface ScoringProps {
  computedWords: number,
  mpm: number,
  points: number,
  precision: number,
  timer: number,
}

export interface ScoreItemProps {
  label?: string | number,
  value?: string | number,
  color?: string,
}
