import React from 'react'
import { useSocket } from '../../contexts/SocketContext';
import { Button } from '../../components/Button/Button.component';
import { MultiplayerSocketEventsListenerEnum } from '@sqrib/shared';

const MultiplayerRoom = () => {
  const { listen, emit } = useSocket();

  listen(MultiplayerSocketEventsListenerEnum.MESSAGE_ONE, (data) => { console.log('message-one', data) });

  const handleClick = () => {
    emit(MultiplayerSocketEventsListenerEnum.MESSAGE_ONE, { my: 'one' });
  };

  return (
    <div>
      <Button onClick={handleClick}>Click me</Button>
      MultiplayerRoom
    </div>
  )
}

export default MultiplayerRoom