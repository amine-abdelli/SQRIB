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

export interface SubcomponentProps {
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export type ModalComponents = {
  Header: React.FC<SubcomponentProps>;
  Body: React.FC<SubcomponentProps>;
  Footer: React.FC<SubcomponentProps>;
};
