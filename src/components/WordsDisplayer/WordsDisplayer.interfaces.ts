import { Dispatch, SetStateAction } from "../../pages/Main/Main.interfaces";

export interface WordsDisplayerProps {
  wordsToDisplay: Array<string>,
  userInput: string,
  wordIndex: number,
  offSet: number,
  setYNextPosition: Dispatch<SetStateAction<number>>,
  setYFocusedPosition: Dispatch<SetStateAction<number>>
  computedWords: Array<string>,
  fontSize: number
}