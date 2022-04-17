import { ClientType } from '@aqac/utils';
import { Socket } from 'socket.io-client';

export interface GameRoomProps {
  roomID: string | undefined,
   handleLeave: () => void,
   username: string,
   game: ClientType[],
   wordSet: string[],
   socketRef: Socket,
   isGameEnded: boolean,
}
