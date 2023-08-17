import { TLanguage } from './language';

export interface TrainingGamesRequestBody {
  count: number;
  language: TLanguage;
}

export interface TrainingGamesResponseBody {
  data: string[]
}

export interface IGame {
  type: string // 'multiplayer' | 'solo'
  mode: string
  name: string
  language: string
  word_count: number
  duration: number
  word_set_id?: string
}

export interface IScore {
  wpm: number
  precision: number
  points: number
  xp: number
  duration: number
  user_id: string
}

export interface ISaveScoring {
  score: IScore;
  game: IGame
}
