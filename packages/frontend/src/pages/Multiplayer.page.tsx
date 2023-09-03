import React from 'react';
import { MovingBackground } from '../components/MovingBackground/MovingBackground.component';
import '../theme/pages/_Multiplayer.scss';

function Multiplayer() {
  return (
    <main className='layout--main multiplayer-page'>
      <MovingBackground />
    </main>
  );
}

export default Multiplayer;
