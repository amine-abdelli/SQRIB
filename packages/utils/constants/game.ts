import { Languages } from '..';

export type ClientType = {
  id: string;
  userId: string | null;
  username: string;
  wordIndex: number;
  color: string;
  wordAmount?: number;
  status: 'staging' | 'playing' | 'finished';
  host: boolean;
  wrongWords: number;
  correctLetters: number;
  totalLetters: number;
  wrongLetters: number;
  precision: number;
  points: number;
  mpm: number;
}

export type scoringObjectType = {
  wrongWords: number;
  correctLetters: number;
  totalLetters: number;
  wrongLetters: number;
  precision: number;
  points: number;
  mpm: number;
}

export type GameType = {
  id: string;
  setID: string;
  language: Languages;
  wordAmount: number;
  clients: Record<string, ClientType>;
  status: 'staging' | 'playing' | 'finished';
  name: string;
  timer?: number;
};

export type GameWithClientsFormatted = {
  id: string;
  setID: string;
  language: Languages;
  wordAmount: number;
  clients: ClientType[];
  status: 'staging' | 'playing' | 'finished';
  name: string;
  timer?: number;
};

export type SetType = string[];

export enum Game {
  SOLO = 'solo',
  MULTI = 'multi',
}
