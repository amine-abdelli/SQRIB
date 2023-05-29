import { ReactNode } from 'react';

export interface DisplayerHeaderProps {
  wordChain: string[],
  indexOfProgression: number,
  userInput: string,
  children?: ReactNode,
  size?: number
}
