import { GameType } from '@sqrib/utils';
import { Socket } from 'socket.io-client';

export interface VictoryModalProps {
  socketRef: Socket
  counter: number
  game: GameType;
}
