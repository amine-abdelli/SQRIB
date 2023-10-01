import React from 'react';
import { MultiplayerSocketEventsListenerEnum } from '@sqrib/shared';

import { useSocket } from '../contexts/SocketContext';
import { MovingBackground } from '../components/MovingBackground/MovingBackground.component';

import '../theme/pages/_Multiplayer.scss';
import { Button } from '@nextui-org/react';

function Multiplayer() {
  const { listen, emit } = useSocket();

  listen(MultiplayerSocketEventsListenerEnum.MESSAGE_ONE, (data) => { console.log('message-one', data) });

  const handleClick = () => {
    emit(MultiplayerSocketEventsListenerEnum.MESSAGE_ONE, { my: 'one' });
  };
  return (
    <main className='layout--main multiplayer-page'>
      <Button onClick={handleClick}>Click me</Button>
      <MovingBackground />
    </main>
  );
}

export default Multiplayer;
