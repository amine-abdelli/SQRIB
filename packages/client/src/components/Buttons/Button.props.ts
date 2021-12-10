import { CSSProperties, ReactNode } from 'react';

export interface IButton {
  children: ReactNode;
  style?: CSSProperties;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'primary' | 'link';
}
