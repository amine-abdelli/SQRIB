import React from 'react';
import { Logo, NavLinks, Spacer, SpacerSize } from '../components';
import { Button } from '../components/Button/Button.component';
import { MODAL_ID } from '../components/Modals/modals.constants';
import { useAuthContext, useModal } from '../contexts';
import '../theme/pages/_Home.scss';
import { MovingBackground } from '../components/MovingBackground/MovingBackground.component';
import { Version } from '../modules/Home/components';

function Home() {
  document.title = 'SQRIB.IO';
  const { openModal } = useModal();
  const { isAuthenticated, logout } = useAuthContext();

  return (
    <main className='layout--main home-main'>
      <MovingBackground />
      <Logo label='SQRIB.IO' size={75} />
      <Spacer y size={SpacerSize.LARGE} />
      <NavLinks />
      <Spacer y size={SpacerSize.LARGE} />
      {isAuthenticated
        ? <Button style={{ zIndex: 0 }} stretch onClick={() => logout()}>Logout</Button>
        : <Button style={{ zIndex: 0 }} stretch onClick={() => openModal(MODAL_ID.LOGIN)}>Login</Button>
      }
      <Version />
    </main>
  );
}

export default Home;
