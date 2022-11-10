import { CSSProperties } from 'react';

export interface ProgressBarProps {
  completed: number,
  color: string,
  key: string,
  style?: CSSProperties,
  focus?: boolean
}
