import { Dispatch, SetStateAction } from 'react';

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

export type IScoringProps = IUserInputProps & IScore & any
interface IScore {
  score: number
}
