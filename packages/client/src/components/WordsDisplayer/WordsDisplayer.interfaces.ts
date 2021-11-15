import { Dispatch, SetStateAction } from "../../../interfaces/Main.interfaces";

export interface WordsDisplayerProps {
  wordsToDisplay: Array<string>,
  offSet: number,
  setYNextPosition: Dispatch<SetStateAction<number>>,
  setYFocusedPosition: Dispatch<SetStateAction<number>>
  computedWords: Array<string>,
  fontSize: number
}