import { Dispatch, SetStateAction } from 'react';
import { Socket } from 'socket.io-client';

export interface JoiningRoomProps {
  roomID: string | undefined,
  setRoomID: Dispatch<SetStateAction<string | undefined>>,
  roomList: any,
  socket: Socket,
  setShouldDisplayUsernameInput: Dispatch<SetStateAction<boolean>>,
}
