import { TLanguage } from './language';

export interface TrainingGamesRequestBody {
  count: number;
  language: TLanguage;
}

export interface TrainingGamesResponseBody {
  data: string[]
}

export enum SessionType {
  TRAINING = 'training',
  MULTIPLAYER = 'multiplayer',
  LEARNING = 'learning',
}

export enum SessionMode {
  TIME_TRIAL = 'timeTrial',
  SPEED_CHALLENGE = 'speedChallenge',
}

export interface SaveTrainingScoreRequestModel {
  type: SessionType;
  mode: SessionMode;
  name?: string;
  zen_mode?: boolean;
  language: TLanguage;
  word_count: number;
  total_duration: number;
  word_set_id?: string;
  wpm: number;
  points: number;
  accuracy: number;
  xp: number;
  start_time: Date;
  end_time: Date;
}

export interface SaveTrainingScoreResponseModel {
  message: string;
}
