import { Dispatch, SetStateAction } from 'react';
import { ITheme } from '../../../styles/theme';

export interface INav {
  theme: ITheme,
  setTheme: Dispatch<SetStateAction<ITheme>>,
  startTimer?: boolean
}
