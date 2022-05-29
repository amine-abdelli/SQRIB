import { Dispatch, SetStateAction } from 'react';

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
  onSetFinish: () => void,
  setShowStatsModal: Dispatch<SetStateAction<boolean>>,
  typingSpeed: number,
}
