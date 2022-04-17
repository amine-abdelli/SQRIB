import { Dispatch, SetStateAction } from 'react';
import { GameParametersProps } from '../CreateModal/CreateModal.props';

export interface JoiningRoomProps {
  roomID: string | undefined,
  setRoomID: Dispatch<SetStateAction<string | undefined>>,
  roomList: any,
  setHasJoined: Dispatch<SetStateAction<boolean>>,
  isCreateModalOpen: boolean,
  setIsCreateModalOpen: Dispatch<SetStateAction<boolean>>,
  username: string,
  gameParameters: GameParametersProps,
  setGameParameters: Dispatch<SetStateAction<GameParametersProps>>,
}
