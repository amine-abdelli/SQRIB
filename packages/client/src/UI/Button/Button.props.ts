import { CSSProperties } from 'react';

export interface ButtonProps {
  text: string | JSX.Element,
  onClick: () => void,
  secondary?: boolean,
  stretch?: boolean,
  style?: CSSProperties,
  disabled?: boolean,
  light?: boolean
}
