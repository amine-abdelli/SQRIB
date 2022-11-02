import React from 'react';
import { useWindowSize } from '../../hooks/useWindowSize';
import Button from '../../UI/Button/Button.component';
import { HeaderProps } from './Header.props';

function Header({ setIsMenuOpen }: HeaderProps) {
  const { isMediumScreen } = useWindowSize();
  return (
    <div className="w100" style={{ height: '3rem', display: isMediumScreen ? 'block' : 'none' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button secondary stretch onClick={() => setIsMenuOpen(true)} text='MENU' />
      </div>
    </div>
  );
}

export default Header;
