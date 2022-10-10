import {
  CSSProperties, Dispatch, ReactElement, SetStateAction,
} from 'react';

export interface IWordDisplayer {
  setState?: Dispatch<SetStateAction<number | undefined>>,
  word: string | ReactElement,
  className?: string,
  style?: CSSProperties,
  index?: number,
  computedWords?: string[],
  wordsStack?: string[],
  wordIndex?: number,
  isWordPassed?: boolean,
  fontSize?: number,
}
