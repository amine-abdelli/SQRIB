import { GameType } from '@aqac/utils';
import { Dispatch, SetStateAction } from 'react';
import { Socket } from 'socket.io-client';

export interface GameRoomProps {
  roomID: string | undefined,
  username: string,
  game: GameType,
  wordSet: string[],
  socketRef: Socket,
  isGameEnded: boolean,
  setGame: Dispatch<SetStateAction<GameType | undefined>>,
  setWordSet: Dispatch<SetStateAction<string[] | undefined>>,
  setWinner: Dispatch<SetStateAction<string>>,
  setCounter: Dispatch<SetStateAction<number>>,
}
