import { Dispatch, SetStateAction } from 'react';
import { Position } from '../../utils/enums/Direction.enum';

export interface ISideBarProps {
  setFontSize?: Dispatch<SetStateAction<number>>,
  setLanguage?: Dispatch<SetStateAction<string>>,
  position?: Position.LEFT | Position.RIGHT | Position.TOP | Position.BOTTOM,
}
