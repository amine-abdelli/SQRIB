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
  avatar: string;
  isHost: boolean;
  wordIndex: number;
  isAuthenticated: boolean;
  status: PlayerOrSessionStatus;
  wrongWords: number;
  correctLetters: number;
  totalLetters: number;
  wrongLetters: number;
  precision: number;
  points: number;
  mpm: number;
}

export interface PlayerSubscribe {
  username: string;
  color: string;
  avatar: string;
  isAuthenticated: boolean;
}

export interface SessionOptions {
  name: string;
  word_set_id?: string;
  language: TLanguages;
  mode: SessionMode;
  wordCount?: number;
  time?: number;
}

export interface Session {
  id: string;
  options: SessionOptions;
  status: PlayerOrSessionStatus;
  players?: Record<string, Player>;
}

export type GetSessionInfo = Pick<Session, 'status' | 'options'>

export interface Room {
  id: string;
  name: string;
  players: number;
  language: TLanguages;
  mode: SessionMode;
  wordCount?: number;
  time?: number;
}

export type IRoomList = Room[]

export type SessionList = Omit<Session, 'players'>[];

export interface GetRoomListResponse {
  rooms: SessionList;
  total: number;
}
