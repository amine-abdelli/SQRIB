import React, { useEffect } from 'react'
import { useSocket } from '../../contexts/SocketContext';
import { Button } from '../../components/Button/Button.component';
import { MultiplayerSocketEventsListenerEnum } from '@sqrib/shared';
import { useLocation, useNavigate } from 'react-router-dom';
import { MAIN_ROUTES } from '../../routes/paths';
import { BackButton } from '../../components/HomeButton/HomeButton.component';

const MultiplayerRoom = () => {
  const { listen, emit } = useSocket();
  const location = useLocation();
  const roomId = location?.state?.roomId
  listen(MultiplayerSocketEventsListenerEnum.MESSAGE_ONE, (data) => { console.log('message-one', data) });

  const handleClick = () => {
    emit(MultiplayerSocketEventsListenerEnum.MESSAGE_ONE, { my: 'one' });
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (!roomId) {
      // TODO Trigger notification
      navigate(MAIN_ROUTES.MULTIPLAYER)
    };
  }, [])
  console.log(location?.state);
  return (
    <section>
      <div className='back-button'>
        <BackButton />
      </div>
      <Button onClick={handleClick}>Click me</Button>
      Room n°{roomId}
    </section>
  )
}

export default MultiplayerRoom