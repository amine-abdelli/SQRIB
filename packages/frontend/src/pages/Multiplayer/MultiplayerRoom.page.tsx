import React from 'react'
import { useSocket } from '../../contexts/SocketContext';
import { Button } from '../../components/Button/Button.component';
import { MultiplayerSocketEventsListenerEnum } from '@sqrib/shared';
import { useLocation, useNavigate } from 'react-router-dom';
import { MAIN_ROUTES } from '../../routes/paths';

const MultiplayerRoom = () => {
  const { listen, emit } = useSocket();

  listen(MultiplayerSocketEventsListenerEnum.MESSAGE_ONE, (data) => { console.log('message-one', data) });

  const handleClick = () => {
    emit(MultiplayerSocketEventsListenerEnum.MESSAGE_ONE, { my: 'one' });
  };
  const navigate = useNavigate();
  const location = useLocation();
  if (!location?.state?.roomId) {
    console.log('Navigating to multiplayer')
    // Trigger notification
    navigate(MAIN_ROUTES.MULTIPLAYER)
  };
  console.log(location?.state);
  return (
    <section>
      <Button onClick={handleClick}>Click me</Button>
      MultiplayerRoom
    </section>
  )
}

export default MultiplayerRoom