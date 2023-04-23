import { Dispatch, SetStateAction } from 'react';

export interface SideBarProps {
  isMenuOpen: boolean,
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>
}
