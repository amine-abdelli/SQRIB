import React from 'react';
import { Logo, NavLinks, Spacer, SpacerSize } from '../components';
import { Button } from '../components/Button/Button.component';
import { MODAL_ID } from '../components/Modals/modals.constants';
import { useAuthContext, useModal } from '../contexts';
import '../theme/pages/_Home.scss';
import { SvgLetters } from '../assets/images/letters';
import { randomIntFromInterval } from '@sqrib/shared';
import { parallax } from '../utils';

function Home() {
  const { openModal } = useModal();
  const { isAuthenticated, logout } = useAuthContext();

  // Handle moving background
  document.addEventListener("mousemove", parallax);

  const alphabets = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
  return (
    <main className='layout--main home-main'>
      {SvgLetters.map((image, index) =>
        <img className={`letters letters--${alphabets[index]}`}
          style={{ transform: `rotate(${index % 2 === 0 ? 12 : -12}deg)` }}
          key={index}
          src={image}
          data-speed={randomIntFromInterval(-3, 3)}
        />)}
      <Logo label='SQRIB.IO' size={75} />
      <Spacer y size={SpacerSize.LARGE} />
      <NavLinks />
      <Spacer y size={SpacerSize.LARGE} />
      {isAuthenticated
        ? <Button style={{ zIndex: 0 }} stretch onClick={() => logout()}>Logout</Button>
        : <Button style={{ zIndex: 0 }} stretch onClick={() => openModal(MODAL_ID.LOGIN)}>Login</Button>
      }
    </main>
  );
}

export default Home;
