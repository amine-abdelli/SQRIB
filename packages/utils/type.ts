export interface ScoreType {
  correct_letters: number;
  createdAt: Date | string;
  game_mode: string;
  mpm: number;
  points: number;
  precision: number;
  timing: string;
  total_letters: number;
  wrong_letters: number;
  wrong_words: number;
}
