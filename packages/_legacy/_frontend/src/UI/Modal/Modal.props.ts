import { CSSProperties } from 'react';

export interface ModalProps {
  isOpen: boolean,
  setIsOpen?: (isOpen: boolean) => boolean | void,
  children: any,
  blur?: boolean,
  closeable?: boolean,
  darkCross?: boolean,
  fullScreen?: boolean,
  style?: CSSProperties,
  sqribBackground?: boolean
}

export interface SubComponentProps {
  children: JSX.Element,
}
