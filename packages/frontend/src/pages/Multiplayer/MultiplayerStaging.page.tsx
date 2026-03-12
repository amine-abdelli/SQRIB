import React, { useEffect } from 'react'
import { generatePath, useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { GetSessionInfo, Player, PlayerOrSessionStatus, SessionMode, SocketPreGameEventsEnum } from '@sqrib/shared'

import { useSocket } from '../../contexts/SocketContext'
import { MAIN_ROUTES } from '../../routes/paths'
import { Card } from '../../components/Card/Card.component'
import { ClipBoard } from '../../modules/Multiplayer/components/ClipBoard/ClipBoard.component'
import { Text } from '../../components/Text/Text.component'
import { usePlayer } from '../../contexts/PlayerContext'
import { TOAST_ID, warnToast } from '../../theme/toast'
import { Button } from '../../components/Button/Button.component'
import { Spacer, SpacerSize } from '../../components'
import { MultiplayerLayout } from '../../layouts/desktop/MultiplayerLayout.desktop'
import { PlayerCard } from '../../modules/Multiplayer/components/PlayerCard'

interface Players {
  players: Player[]
}

const MultiplayerStaging = () => {
  const { roomId } = useParams()
  const { emit, listen } = useSocket()
  const { username } = usePlayer()
  const [players, setPlayers] = React.useState<Player[]>([])
  const [sessionProperties, setSessionProperties] = React.useState<GetSessionInfo>()
  const navigate = useNavigate()

  useEffect(() => {
    if (!roomId) navigate(MAIN_ROUTES.MULTIPLAYER_SELECTION)
    if (!username) {
      return navigate(`${MAIN_ROUTES.MULTIPLAYER}?redirectTo=${generatePath(MAIN_ROUTES.MULTIPLAYER_ROOM, { roomId: roomId ?? '' })}`)
    }
    emit(SocketPreGameEventsEnum.CHECK_SESSION_ID_VALIDITY, roomId)
    emit(SocketPreGameEventsEnum.GET_SESSION_INFO, roomId)
    emit(SocketPreGameEventsEnum.GET_PLAYERS, roomId)
  }, [])

  listen(SocketPreGameEventsEnum.CHECK_SESSION_ID_VALIDITY, ({ isValid }) => {
    if (!isValid) {
      toast.error('This session does not exist')
      navigate(MAIN_ROUTES.MULTIPLAYER_SELECTION)
    }
  })

  listen(SocketPreGameEventsEnum.GET_PLAYERS, ({ players: playersInSession }: Players) => {
    setPlayers(playersInSession)
  })

  useEffect(() => {
    if (players.length > 5) {
      toast.success('This room is full', { ...warnToast, id: TOAST_ID.FULL_ROOM })
      navigate(generatePath(MAIN_ROUTES.MULTIPLAYER_SELECTION))
    }
    return () => {
      toast.dismiss(TOAST_ID.FULL_ROOM)
    }
  }, [players])

  listen(SocketPreGameEventsEnum.GET_SESSION_INFO, ({ options, status }: GetSessionInfo) => {
    if (status !== PlayerOrSessionStatus.STAGING) {
      navigate(generatePath(MAIN_ROUTES.MULTIPLAYER_ROOM, { roomId: roomId ?? '' }))
    }
    setSessionProperties({ options, status })
  })

  listen(SocketPreGameEventsEnum.START_SESSION, () => {
    navigate(generatePath(MAIN_ROUTES.MULTIPLAYER_ROOM, { roomId: roomId ?? '' }))
  })

  const options = sessionProperties?.options;
  const isHost = players.find((player) => player.isHost)?.username === username

  return (
    <MultiplayerLayout column>
      <Card style={{ padding: '2rem' }}>
        <Text fira h1 bold centered>Lobby</Text>
        <Text fira h3 centered>{players.length}/5 player{players.length > 1 ? 's' : ''}</Text>
        <div style={{ margin: '1rem 0', display: 'flex', justifyContent: 'space-evenly' }}>
          <Text fira h3 centered>{options?.mode}</Text>
          {options?.mode === SessionMode.TIME_TRIAL && <Text fira h3 centered>{options?.language}</Text>}
          {options?.mode === SessionMode.SPEED_CHALLENGE && <Text fira h3 centered>{options?.wordCount} words</Text>}
          <Text fira h3 centered>{options?.time}s</Text>
        </div>
        {players.map((player) => <PlayerCard key={username} player={player} showCase />)}
        <Button
          disabled={players.length === 0 || !isHost}
          onClick={() => {
            if (roomId) emit(SocketPreGameEventsEnum.START_SESSION, roomId)
          }
          }>Start</Button>
        <Spacer y size={SpacerSize.SMALL} />
        <Button secondary onClick={() => {
          emit(SocketPreGameEventsEnum.LEAVE_SESSION, roomId)
          navigate(MAIN_ROUTES.MULTIPLAYER_SELECTION)
        }}>Leave</Button>
      </Card>
      {roomId && <ClipBoard url={`${import.meta.env.VITE_FRONTEND_URL}${generatePath(MAIN_ROUTES.MULTIPLAYER_ROOM, { roomId })} `} />}
    </MultiplayerLayout>
  )
}

export default MultiplayerStaging