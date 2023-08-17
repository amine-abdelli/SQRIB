import { EngineProps } from "../../modules/Training/Engine";

export interface WordsCollectionProps {
  wordChain: string[];
}


export interface IWordsCollectionProps extends EngineProps {
  setMisspellings: React.Dispatch<React.SetStateAction<string[]>>
}