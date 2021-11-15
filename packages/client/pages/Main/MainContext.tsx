import React from 'react'
import { GameMode } from '../../src/helpers/Mode.enum';

export const MainContext = React.createContext<{
  userInput: string,
  wordIndex: number,
  wordCount: number,
  isTimeOut: boolean,
  setIsTimeOut: React.Dispatch<React.SetStateAction<boolean>>,
  startCountDown: boolean,
  setStartCountDown: React.Dispatch<React.SetStateAction<boolean>>,
  gameMode: GameMode,
  countDown: number,
}>({} as any);

