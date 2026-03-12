import { GetSessionInfo, Player } from "@sqrib/shared";
import { ReactElement } from "react";
import { FontSize } from "../../../../../utils";

export interface ClassicEngineProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  wordChain: string[];
  typedWords: string[];
  setTypedWords: React.Dispatch<React.SetStateAction<string[]>>;
  indexOfProgression: number;
  setIndexOfProgression: React.Dispatch<React.SetStateAction<number>>;
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
  fontSize: FontSize;
  setFontSize: React.Dispatch<React.SetStateAction<FontSize>>;
  isUserAllowToType: boolean;
  setIsUserAllowToType: React.Dispatch<React.SetStateAction<boolean>>;
  verticalOffSet: number;
  setVerticalOffSet: React.Dispatch<React.SetStateAction<number>>;
  shouldOpenVictoryModal: boolean;
  setShouldOpenVictoryModal: React.Dispatch<React.SetStateAction<boolean>>;
  misspellings: string[];
  setMisspellings: React.Dispatch<React.SetStateAction<string[]>>;
  players: Player[];
  sessionProperties: GetSessionInfo;
  timer: number;
  countdown: number | null;
  totalWords: number;
  gameEnded: boolean;
  rankings: Player[];
  isZenModeOn: boolean;
}

export interface ClassicEngineChildren {
  children: ReactElement<ClassicEngineProps> | ReactElement<ClassicEngineProps>[] | any;
}
