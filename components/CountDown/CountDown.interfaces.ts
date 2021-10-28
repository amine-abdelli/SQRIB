import { Dispatch, SetStateAction } from "../../pages/Main/Main.interfaces";

export interface ICountUpValues {
  minutes: number,
  seconds: number
}

export interface UserInputInterface {
  setIsCountDownFinished: Dispatch<SetStateAction<boolean>>,
  setCountUpValues: Dispatch<SetStateAction<ICountUpValues>>,
  setCountUp: Dispatch<SetStateAction<number>>,
  countUp: number,
  countUpValues: ICountUpValues,
  startCountDown: boolean
}