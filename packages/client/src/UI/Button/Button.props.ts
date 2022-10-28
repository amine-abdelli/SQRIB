import { CSSProperties } from 'react';

export interface ButtonProps {
  text: string,
  onClick: () => void,
  secondary?: boolean,
  stretch?: boolean,
  style?: CSSProperties
}
