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
  username: String
  timer: Int
  language: String
 }`;

export const GroupedScores = `
  type GroupedScores {
    fr: [Score]
    en: [Score]
    de: [Score]
    es: [Score]
  }
`;

export const GroupedGameData = `
  type GroupedGameData {
    solo: GroupedScores
    multi: GroupedScores
    games: [GameOutPut]
  }
`;

export const ScoreTypes = [Score, GroupedScores, GroupedGameData];
