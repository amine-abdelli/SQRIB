import { Languages } from '..';

export type ClientType = {
  id: string;
  username: string;
  wordIndex: number;
  color: string;
  wordAmount?: number;
  status: 'staging' | 'playing' | 'finished';
  host: boolean;
}

export type GameType = {
  id: string;
  setID: string;
  language: Languages;
  wordAmount: number;
  clients: Record<string, ClientType>;
  status: 'staging' | 'playing' | 'finished';
  name: string;
};

export type SetType = string[];
