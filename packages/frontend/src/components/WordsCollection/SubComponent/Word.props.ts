import { FontSize } from '@sqrib/shared';

export interface WordProps {
  word: string,
  isFocused: boolean,
  comparison: string,
  indexOfProgression: number,
  currentIndex: number,
  input: string,
  fontSize: FontSize
}
