import { CSSProperties, ChangeEvent, ReactNode } from 'react';

export interface InputProps {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void,
  placeholder?: string,
  value?: string,
  type?: 'text' | 'password' | 'email' | 'username',
  stretch?: boolean,
  state?: 'error' | 'success',
  helperColor?: string,
  helperText?: string | boolean,
  name?: string,
  disabled?: boolean,
  fullWidth?: boolean,
  rightContent?: ReactNode,
  style?: CSSProperties
}
