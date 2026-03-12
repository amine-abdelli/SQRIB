import { Dispatch, SetStateAction } from 'react';

export interface InputProps {
  setUserInput: Dispatch<SetStateAction<string>>
  userInput: string;
  isTimeOut: boolean;
  didacticielStack?: string[];
  disabled?: boolean;
}
