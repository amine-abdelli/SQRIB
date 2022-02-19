import { GameMode } from '../../utils/enums';

export interface IStats {
  wrongWords: number,
  computedWords: string[],
  correctLetters: number,
  totalLetters: number,
  wrongLetters: number,
  precision: number,
  points: number,
  mpm: number,
  correctWords: string[],
  onSetFinish: any,
  gameMode: GameMode,
  setShowStatsModal: any,
  typingSpeed: number,
}
