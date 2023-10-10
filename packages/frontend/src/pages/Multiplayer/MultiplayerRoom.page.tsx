import React, { useEffect } from 'react'
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { GetSessionInfo, PlayerOrSessionStatus, SocketPreGameEventsEnum } from '@sqrib/shared';

import { MAIN_ROUTES } from '../../routes/paths';
import { useSocket } from '../../contexts/SocketContext';
import { Text } from '../../components/Text/Text.component';

const MultiplayerRoom = () => {
  const [sessionProperties, setSessionProperties] = React.useState<GetSessionInfo>();
  const { roomId } = useParams();
  const { emit, listen } = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    if (!roomId) {
      navigate(MAIN_ROUTES.MULTIPLAYER)
    };
    emit(SocketPreGameEventsEnum.CHECK_SESSION_ID_VALIDITY, roomId)
    emit(SocketPreGameEventsEnum.GET_ROOM_INFO, roomId)
  }, [])

  listen(SocketPreGameEventsEnum.CHECK_SESSION_ID_VALIDITY, ({ isValid }) => {
    if (!isValid) {
      toast.error('This session does not exist')
      navigate(MAIN_ROUTES.MULTIPLAYER_SELECTION)
    }
  })

  listen(SocketPreGameEventsEnum.GET_ROOM_INFO, ({ options, status }: GetSessionInfo) => {
    if (roomId && status === PlayerOrSessionStatus.STAGING) {
      navigate(generatePath(MAIN_ROUTES.MULTIPLAYER_STAGING, { roomId }))
    }
    setSessionProperties({ options, status })
  })

  return (
    <section>
      <Text p fira>{sessionProperties?.options.name}</Text>
      Room n°{roomId}
    </section>
  )
}

export default MultiplayerRoom