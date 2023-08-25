/* eslint-disable no-use-before-define */
import { TLanguages } from './languages.type';

export interface TrainingGamesRequestBody {
  count: number;
  language: TLanguages;
}

export interface TrainingGamesResponseBody {
  data: string[]
}

export enum SessionType {
  TRAINING = 'TRAINING',
  LEARNING = 'LEARNING',
  MULTIPLAYER = 'MULTIPLAYER'
}

export enum SessionMode {
  TIME_TRIAL,
  SPEED_CHALLENGE
}
/** ********  MODELS ******** */
interface UserModel {
  id: string;
  username: string;
  email: string;
  password: string;
  description?: string;
  avatar?: string;
  created_at: Date;
  is_confirmed: boolean;
  is_locked: boolean;
  last_password_update?: Date;
  last_activity: Date;
  sessions: SessionModel[];
  Palmares?: PalmaresModel;
  Scores: ScoreModel[];
  UserAchievements: UserAchievementModel[];
}

interface AchievementModel {
  id: string;
  name: string;
  description: string;
  icon: string;
  created_at: Date;
  UserAchievements: UserAchievementModel[];
}

interface UserAchievementModel {
  id: string;
  achievement: AchievementModel;
  achievement_id: string;
  user: UserModel;
  user_id: string;
  created_at: Date;
}

interface PalmaresModel {
  id: string;
  role: string;
  game_count: number;
  best_wpm: number;
  best_accuracy: number;
  average_accuracy: number;
  best_points: number;
  total_points: number;
  total_xp: number;
  total_time_in_seconds: number;
  created_at: Date;
  user: UserModel;
  user_id: string;
}

/**
 * Model Score
 *
 */
export type ScoreModel = {
  id: string
  wpm: number
  accuracy: number
  points: number
  xp: number
  typed_words: number
  start_time: bigint
  end_time: bigint
  user_id: string | null
  session_id: string | null
  created_at: Date
}

interface SessionModel {
  id: string;
  type: string;
  mode: 'timeTrial' | 'speedChallenge';
  name?: string;
  zen_mode?: boolean;
  language: TLanguages;
  word_count: number;
  total_duration: number;
  word_set_id?: string;
  scores: ScoreModel[];
  created_at: Date;
  created_by?: UserModel;
}

/** ********  REQUEST BODIES  ******** */
/** @POST /game/save-score */
export interface ScoreRequestBody {
  wpm: number;
  accuracy: number;
  points: number;
  start_time: number;
  end_time: number;
  typed_words: number;
}

/** @POST /game/save-score */
export interface SessionRequestBody {
  type: string;
  mode: string;
  name?: string;
  zen_mode?: boolean;
  language: TLanguages;
  word_count?: number; // For speed challenge only
  count_down?: number; // For time trial only
  word_set_id?: string;
}

/** @POST /game/save-score */
export interface SaveTrainingScoringRequestBody {
  session: SessionRequestBody,
  score: ScoreRequestBody
}

/** ********  RESPONSE BODIES  ******** */
/** @POST /game/save-score */
export type SaveTrainingScoringResponseBody = ScoreModel;

/** ********  MODELS REQUEST ******** */
/** @POST /game/save-score */
export interface SaveTrainingSessionRequestModel {
  type: string // "training", "multiplayer" ,"learning"
  mode: string // "timeTrial", "speedChallenge"
  name?: string
  zen_mode?: boolean // for training mode only
  language: string // "fr", "en", "es", "de"
  word_count?: number // for speedChallenge Number of words to type
  count_down?: number // for TimeTrial
  total_duration: number // Total time available for the session in seconds
  word_set_id?: string
  created_by: string
}

/** @POST /game/save-score */
export interface SaveTrainingScoreRequestModel {
  wpm: number;
  accuracy: number;
  points: number;
  xp: number;
  typed_words: number;
  start_time: number; // When the user began typing
  end_time: number; // When the user finished typing or the session ended
  user_id: string;
  session_id: string
}

/** ********  MODELS RESPONSE ******** */
/** @POST /game/save-score */
export type SaveTrainingScoreResponseModel = ScoreModel;
export type SaveTrainingSessionResponseModel = SessionModel;
