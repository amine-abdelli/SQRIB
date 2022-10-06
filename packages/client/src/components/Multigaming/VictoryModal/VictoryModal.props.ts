import { GameType } from '@sqrib/utils';

export interface VictoryModalProps {
  isGameEnded: boolean
  counter: number
  game: GameType;
}
