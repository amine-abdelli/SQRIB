export interface GlobalScoreType {
  correct_letters: number
  createdAt: number
  gameId: null
  id: number
  language: number
  mpm: number
  points: number
  precision: number
  timer: number
  total_letters: number
  type: number
  userId: number
  username: number
  wrong_letters: number
  wrong_words: number
}

export interface GlobalGameType {
  createdAt: string
  host: string
  id: string
  language: string
  name: string
  player_length: number
  players: null
  winner: string
  word_amount: number
}

export type GlobalScoresData = Record<string, GlobalScoreType[]>

export type GlobalGamesData = GlobalGameType[]
