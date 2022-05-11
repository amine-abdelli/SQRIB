import { Dispatch, SetStateAction } from 'react';
import { Socket } from 'socket.io-client';
import { GameParametersProps } from '../CreateModal/CreateModal.props';

export interface JoiningRoomProps {
  roomID: string | undefined,
  setRoomID: Dispatch<SetStateAction<string | undefined>>,
  roomList: any,
  username: string,
  gameParameters: GameParametersProps,
  setGameParameters: Dispatch<SetStateAction<GameParametersProps>>,
  socket: Socket,
}
