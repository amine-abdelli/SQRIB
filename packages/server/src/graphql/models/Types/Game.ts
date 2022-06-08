export const Client = `
input Client {
  id: String
  host: Boolean
  correctLetters: Int
  mpm: Int
  points: Int
  precision: Int
  totalLetters: Int
  username: String
  wordAmount: Int
  wordIndex: Int
  wrongLetters: Int
  wrongWords: Int
}`;

export const GameInput = `
 input GameInput {
  id: ID
  name: String
  language: String
  setID: ID
  wordAmount: Int
}`;

export const Game = `
 type GameInput {
  id: ID
  name: String
  language: String
  setID: ID
  wordAmount: Int
}`;

export const Player = `
type Player {
  id: String
  user_id: String
  name: String
  score_id: String
  game_id: String
  score: Score
}`;

export const GameOutPut = `
type GameOutPut {
  id: ID
  host: String
  name: String
  winner: String
  language: String
  word_amount: Int
  player_length: Int
  createdAt: Date
  players: [Player]
}
`;

export const GameTypes = [GameInput, Client, GameOutPut, Player];
