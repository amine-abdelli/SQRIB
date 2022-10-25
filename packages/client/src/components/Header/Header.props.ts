import { Dispatch, SetStateAction } from 'react';

export interface HeaderProps {
  isMenuOpen: boolean,
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>
}
