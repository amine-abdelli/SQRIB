import { GameType, Languages, SetType } from '@aqac/utils';
import { Socket } from 'socket.io';

export interface assignUserToARoomArgs {
  games: Record<string, GameType>;
  roomID: string;
  username: string;
  userId: string | null;
  socket: Socket;
}

export interface updateRoomArgs {
  games: Record<string, GameType>;
  roomID: string;
  sets: Record<string, SetType>;
  language: Languages;
  wordAmount: number;
  name: string;
}

export interface CreateRoomArgs {
  games: Record<string, GameType>;
  roomID: string;
  sets: Record<string, SetType>;
  clientID: string;
  username: string;
  userId: string | null;
  language: Languages;
  wordAmount: number;
  name: string;
}
