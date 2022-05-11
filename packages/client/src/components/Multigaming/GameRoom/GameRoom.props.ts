import { GameType } from '@aqac/utils';
import { Socket } from 'socket.io-client';

export interface GameRoomProps {
  roomID: string | undefined,
  username: string,
  game: GameType,
  wordSet: string[],
  socketRef: Socket,
  isGameEnded: boolean,
  setGame: any,
  setWordSet: any,
  setWinner: any,
  setCounter: any,
  isGameStarted: boolean,
}
