import { SessionMode, TLanguages } from '../types';

export enum PlayerOrSessionStatus {
  PLAYING = 'playing',
  FINISHED = 'finished',
  STAGING = 'staging',
}

export interface Player {
  id: string;
  username: string;
  color: string;
  avatar?: string;
  wordIndex: number;
  status: PlayerOrSessionStatus;
  wrongWords: number;
  correctLetters: number;
  totalLetters: number;
  wrongLetters: number;
  precision: number;
  points: number;
  mpm: number;
}

export interface MultiplayerSessionOptions {
  name: string;
  wordCount: number;
  word_set_id: string;
  language: TLanguages;
  mode: SessionMode;
  time: number;
}

export interface MultiplayerSession {
  id: string;
  options: MultiplayerSessionOptions;
  status: PlayerOrSessionStatus;
  players: Record<string, Player>;
}

export type MultiplayerSessionList = Omit<MultiplayerSession, 'players'>[];

export interface GetRoomListResponse {
  rooms: MultiplayerSessionList;
  total: number;
}
