import { Dispatch, SetStateAction } from 'react';
import { FontSize } from '../../../utils/fontsize.enum';

export interface WordProps {
  word: string,
  isFocused: boolean,
  comparison: string,
  indexOfProgression: number,
  currentIndex: number,
  input: string,
  fontSize: FontSize,
  setCurrentWordSpanPosition: Dispatch<SetStateAction<number>>,
  setNextWordSpanPosition: Dispatch<SetStateAction<number>>,
  setMisspellings: Dispatch<SetStateAction<string[]>>,
  isRunning: boolean,
}
