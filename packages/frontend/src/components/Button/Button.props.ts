import { CSSProperties } from 'react';

export interface ButtonProps {
  // eslint-disable-next-line no-undef
  label: string | number | JSX.Element,
  onClick: () => void,
  secondary?: boolean,
  stretch?: boolean,
  style?: CSSProperties,
  disabled?: boolean,
  light?: boolean,
  color?: string,
  className?: any
}
