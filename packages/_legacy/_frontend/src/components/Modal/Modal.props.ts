import { Dispatch, ReactNode, SetStateAction } from 'react';

export interface IModal {
  isVisible: boolean,
  setIsVisible: Dispatch<SetStateAction<boolean>>,
  content: ReactNode,
  className?: string
  closable?: boolean
}
