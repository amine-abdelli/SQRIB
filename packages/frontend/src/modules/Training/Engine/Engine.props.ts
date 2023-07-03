import { TLanguage } from "@sqrib/shared";
import { FontSize } from "../../../utils";
import { TTrainingMode, WordsCollectionLayout } from "../../../components/Options/Options.props";
import { ReactElement } from "react";

export interface IScore {
  wpm: number,
  accuracy: number,
  typedWords: number,
  points: number,
  startTime: number,
  endTime: number,
}

export interface EngineProps {
  input: string,
  setInput: React.Dispatch<React.SetStateAction<string>>,
  wordChain: string[],
  setWordChain: React.Dispatch<React.SetStateAction<string[]>>,
  timer: number,
  setTimer: React.Dispatch<React.SetStateAction<number>>,
  typedWords: string[],
  setTypedWords: React.Dispatch<React.SetStateAction<string[]>>,
  dictionary: string[],
  indexOfProgression: number,
  setIndexOfProgression: React.Dispatch<React.SetStateAction<number>>,
  score: IScore,
  isRunning: boolean,
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>,
  fontSize: FontSize,
  setFontSize: React.Dispatch<React.SetStateAction<FontSize>>,
  language: TLanguage,
  setLanguage: React.Dispatch<React.SetStateAction<TLanguage>>,
  mode: TTrainingMode,
  setMode: React.Dispatch<React.SetStateAction<TTrainingMode>>,
  countDown: number,
  setCountDown: React.Dispatch<React.SetStateAction<number>>,
  wordCount: number,
  setWordCount: React.Dispatch<React.SetStateAction<number>>,
  layout: WordsCollectionLayout,
  setLayout: React.Dispatch<React.SetStateAction<WordsCollectionLayout>>,
  resetTraining: () => void,
  resetTrainingAndRefetch: () => void,
  isUserAllowToType: boolean,
  verticalOffSet: number,
  setVerticalOffSet: React.Dispatch<React.SetStateAction<number>>,
  shouldOpenVictoryModal: boolean,
  setShouldOpenVictoryModal: React.Dispatch<React.SetStateAction<boolean>>,
}

export interface EngineChildren {
  children: ReactElement<EngineProps> | ReactElement<EngineProps>[];
}
