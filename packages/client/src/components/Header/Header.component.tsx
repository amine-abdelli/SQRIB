import { Avatar } from '@nextui-org/react';
import React from 'react';
import { useGetSelf } from '../../hooks/useGetSelf';
import { useWindowSize } from '../../hooks/useWindowSize';
import Button from '../../UI/Button/Button.component';
import { HeaderProps } from './Header.props';

function Header({ isMenuOpen, setIsMenuOpen }: HeaderProps) {
  const { data: selfData, isLoggedIn } = useGetSelf();
  const { isMediumScreen } = useWindowSize();
  return (
    <div className="w100" style={{ height: '3rem' }}>
      {isLoggedIn && !isMediumScreen && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <h2 style={{ marginBottom: 0 }}>{selfData?.self?.nickname}</h2>
          <Avatar className='pointer ml5' size="md" squared src="https://picsum.photos/200" color="success" bordered />
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {isMediumScreen && <Button secondary stretch onClick={() => setIsMenuOpen(true)} text='MENU' />}
      </div>
    </div>
  );
}

export default Header;
