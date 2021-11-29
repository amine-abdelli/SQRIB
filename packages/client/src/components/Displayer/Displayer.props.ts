import { Dispatch, SetStateAction } from '../../../models/Main.interfaces';

export interface DisplayerProps {
  wordsToDisplay: Array<string>,
  offSet: number,
  setYNextPosition: Dispatch<SetStateAction<number>>,
  setYFocusedPosition: Dispatch<SetStateAction<number>>
  correctWords: Array<string>,
  fontSize: number,
  difficulty: string,
  setDifficulty: any,
  setShowModeSelection: any
}
