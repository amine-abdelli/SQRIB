import { Languages } from '@aqac/utils';

export interface GameParametersProps {
  language: Languages,
  wordAmount: number,
  playersLimit: number,
  private: boolean,
  password?: string,
}

export interface CreateModalProps {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  setRoomID: (roomID: string | undefined) => void;
  setHasJoined: (hasJoined: boolean) => void;
  username: string
  setGameParameters: (gameParameters: GameParametersProps) => void;
  gameParameters: GameParametersProps;
}

export const defaultGameParameters = {
  language: Languages.FR,
  wordAmount: 60,
  playersLimit: 5,
  private: false,
};
