export const Score = `
 type Score {
  id: ID!
  type: String
  mpm: Int
  wrong_words: Int
  correct_letters: Int
  total_letters: Int
  wrong_letters: Int
  precision: Float
  points: Int
  createdAt: Date
  userId: String
  gameId: String
 }`;

export const ScoreTypes = [Score];
