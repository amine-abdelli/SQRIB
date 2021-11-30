import { Dispatch, ReactNode, SetStateAction } from 'react';

export interface IModal {
  showModeSelection: boolean,
  setShowModeSelection: Dispatch<SetStateAction<boolean>>,
  content: ReactNode,
}
