import { Languages } from '@aqac/utils';

export type ClientType = {
  id: string;
  username: string;
  wordIndex: number;
  color: string;
}

export type GameType = {
  id: string;
  setID: string;
  language: Languages;
  wordAmount: number;
  clients: Record<string, ClientType>;
};

export type SetType = string[];
