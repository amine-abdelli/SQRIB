export interface ScoringProps {
  computedWords: number,
  mpm: number,
  points: number,
  precision: number,
  timer: number,
}

export interface ScoreItemProps {
  content?: string | number,
  color?: string,
}
