import { FontSize } from '../../../utils/fontsize.enum';

export interface WordProps {
  word: string,
  isFocused: boolean,
  comparison: string,
  indexOfProgression: number,
  currentIndex: number,
  input: string,
  fontSize: FontSize,
}
