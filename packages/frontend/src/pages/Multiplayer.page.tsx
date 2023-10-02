import React from 'react';
import { Outlet } from 'react-router-dom';

import { MovingBackground } from '../components/MovingBackground/MovingBackground.component';

import '../theme/pages/_Multiplayer.scss';

function Multiplayer() {
  return (
    <main className='layout--main multiplayer-page'>
      <MovingBackground />
      <Outlet />
    </main>
  );
}

export default Multiplayer;
