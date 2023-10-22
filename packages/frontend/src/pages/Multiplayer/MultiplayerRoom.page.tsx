import React, { useEffect } from 'react'
import { generatePath, useLocation, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { GetSessionInfo, PlayerOrSessionStatus, Session, SocketPreGameEventsEnum } from '@sqrib/shared';

import { MAIN_ROUTES } from '../../routes/paths';
import { useSocket } from '../../contexts/SocketContext';
import { Text } from '../../components/Text/Text.component';
import { usePlayer } from '../../contexts/PlayerContext';
import { MultiplayerLayout } from '../../layouts/desktop/MultiplayerLayout.desktop';

const MultiplayerRoom = () => {
  const [sessionProperties, setSessionProperties] = React.useState<GetSessionInfo>();
  const { roomId } = useParams();
  const location = useLocation();

  const { emit, listen, socket } = useSocket();
  const { username, color, avatar } = usePlayer();
  const navigate = useNavigate();

  useEffect(() => {
    if (!roomId) {
      navigate(MAIN_ROUTES.MULTIPLAYER)
    };
    if (!username) {
      return navigate(`${MAIN_ROUTES.MULTIPLAYER}?redirectTo=${location.pathname}`)
    }
    // Is user already in game ?
    // Check if socket.id is already in the room if not, do a JOIN_ROOM.
    emit(SocketPreGameEventsEnum.CHECK_SESSION_ID_VALIDITY, roomId)
    emit(SocketPreGameEventsEnum.GET_SESSION_INFO, roomId)
  }, [])

  listen(SocketPreGameEventsEnum.CHECK_SESSION_ID_VALIDITY, ({ isValid }) => {
    if (!isValid) {
      toast.error('This session does not exist')
      navigate(MAIN_ROUTES.MULTIPLAYER_SELECTION)
    }
  })

  listen(SocketPreGameEventsEnum.GET_SESSION_INFO, ({ options, status, players }: Session) => {
    // If player not in room yet, join it
    const sockerId = socket?.id
    const player = Object.values(players ?? {})?.find(player => player.id === sockerId)
    if (!player) emit(SocketPreGameEventsEnum.JOIN_SESSION, roomId, { username, color, avatar })

    if (roomId && status === PlayerOrSessionStatus.STAGING) {
      navigate(generatePath(MAIN_ROUTES.MULTIPLAYER_STAGING, { roomId }))
    }
    setSessionProperties({ options, status })
  })

  return (
    <MultiplayerLayout column>
      <Text h1>In progress ...</Text>
    </MultiplayerLayout>
  )
}

export default MultiplayerRoom