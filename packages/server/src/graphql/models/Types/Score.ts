export const Score = `
 type Score {
  id: ID!
  timing: String
  mpm: Int
  wrong_words: Int
  correct_letters: Int
  total_letters: Int
  wrong_letters: Int
  precision: Float
  points: Int
  game_mode: String
  createdAt: Date
 }`;

export const ScoreTypes = [Score];
