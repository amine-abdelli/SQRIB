import { Dispatch, SetStateAction } from 'react';
import { ITheme } from '../../../../styles/theme';

export interface ISettingMenu {
  setTheme: Dispatch<SetStateAction<ITheme>>,
  setFontSize: Dispatch<SetStateAction<number>>,
  setLanguage: Dispatch<SetStateAction<string>>
}
