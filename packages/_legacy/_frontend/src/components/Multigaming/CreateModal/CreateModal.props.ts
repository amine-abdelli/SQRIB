import { Languages } from '@sqrib/utils';
import { Socket } from 'socket.io-client';

export interface GameParametersProps {
  language: Languages,
  wordAmount: number,
  playersLimit: number,
  private: boolean,
  password?: string,
  name?: string
}

export interface CreateModalProps {
  isVisible: boolean;
  roomID: string;
  username?: string;
  isHost: boolean;
  gameParameters: GameParametersProps;
  setGameParameters: (gameParameters: GameParametersProps) => void;
  game: any;
  startGame: () => void;
  socket: Socket;
}

export const defaultGameParameters = {
  language: Languages.FR,
  wordAmount: 60,
  playersLimit: 5,
  private: false,
};
