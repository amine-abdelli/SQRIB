import { Dispatch, SetStateAction } from 'react';

export interface DisplayerProps {
  wordsToDisplay: Array<string>,
  offSet: number,
  setYNextPosition: Dispatch<SetStateAction<number>>,
  setYFocusedPosition: Dispatch<SetStateAction<number>>
  correctWords: Array<string>,
  fontSize: number,
  setShowModeSelection: Dispatch<SetStateAction<boolean>>
}
