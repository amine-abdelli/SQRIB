export const Client = `
input Client {
  id: String
  userId: String
  host: Boolean
  correctLetters: Int
  status: String
  mpm: Int
  points: Int
  precision: Int
  totalLetters: Int
  username: String
  wordAmount: Int
  wordIndex: Int
  wrongLetters: Int
  wrongWords: Int
  color: String
}`;

export const GameInput = `
 input GameInput {
  id: ID
  language: String
  name: String
  setID: ID
  status: String
  wordAmount: Int
  timer: Int
  clients: [Client]
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

// export const PlayerInput = `
// input PlayerInput {
//   id: String
//   user_id: String
//   name: String
//   score_id: String
//   game_id: String
//   score: ScoreInput
// }`;

export const GameOutPut = `
type GameOutPut {
  id: ID
  host: String
  name: String
  winner: String
  language: String
  word_amount: Int
  player_length: Int
  created_at: Date
  players: [Player]
}
`;

export const GameTypes = [GameInput, Client, GameOutPut, Player];
