import { Dispatch, SetStateAction } from 'react';
import { ITheme } from '../../../styles/theme';
import { Position } from '../../helpers/enums/Direction.enum';

export interface ISideBarProps {
  setFontSize?: Dispatch<SetStateAction<number>>,
  setTheme?: Dispatch<SetStateAction<ITheme>>,
  setLanguage?: Dispatch<SetStateAction<string>>,
  theme: ITheme,
  position?: Position.LEFT | Position.RIGHT | Position.TOP | Position.BOTTOM,
}
