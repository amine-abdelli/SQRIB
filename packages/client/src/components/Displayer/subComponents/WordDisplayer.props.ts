import {
  CSSProperties, Dispatch, ReactElement, SetStateAction,
} from 'react';

export interface IWordDisplayer {
  setState?: Dispatch<SetStateAction<number | undefined>>,
  word: string | ReactElement,
  className?: string,
  key?: string | number,
  style?: CSSProperties,
}
