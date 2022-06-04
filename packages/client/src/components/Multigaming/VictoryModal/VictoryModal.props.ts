import { GameType } from '@aqac/utils';

export interface VictoryModalProps {
  isGameEnded: boolean
  counter: number
  game: GameType;
}
