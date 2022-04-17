import { Languages } from '@aqac/utils';

export type ClientType = {
  id: string;
  username: string;
  wordIndex: number;
  color: string;
  wordAmount?: number;
}

export type GameType = {
  id: string;
  setID: string;
  language: Languages;
  wordAmount: number;
  clients: Record<string, ClientType>;
  status: 'waiting' | 'playing' | 'finished';
};

export type SetType = string[];
