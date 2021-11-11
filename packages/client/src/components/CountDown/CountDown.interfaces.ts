import { Dispatch, SetStateAction } from "../../../interfaces/Main.interfaces";

export interface ICountUpValues {
  timerMinutes: number,
  timerSeconds: number
}

export interface IUserInputProps {
  theme?: any,
  setStartCountDown: Dispatch<SetStateAction<boolean>>,
  startCountDown: boolean,
  setIsTimeOut: any
}

export interface IWordCountProps {
  wordCount: number
}

export type IScoringProps = IUserInputProps & IWordCountProps & IScore & any
interface IScore {
  score: number
}