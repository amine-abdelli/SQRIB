import { Dispatch, SetStateAction } from 'react';

export interface ICountUpValues {
  timerMinutes: number,
  timerSeconds: number
}

export interface IUserInputProps {
  theme?: string,
  setStartTimer: Dispatch<SetStateAction<boolean>>,
  startTimer: boolean,
  setIsTimeOut: Dispatch<SetStateAction<boolean>>,
}

export type IScoringProps = IUserInputProps & IScore;
interface IScore {
  score: number
}
