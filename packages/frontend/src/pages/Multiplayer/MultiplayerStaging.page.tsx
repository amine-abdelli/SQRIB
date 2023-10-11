import React, { useEffect } from 'react'
import { generatePath, useNavigate, useParams } from 'react-router-dom'
import { useSocket } from '../../contexts/SocketContext'
import { GetSessionInfo, Player, PlayerOrSessionStatus, SessionMode, SocketPreGameEventsEnum } from '@sqrib/shared'
import toast from 'react-hot-toast'
import { MAIN_ROUTES } from '../../routes/paths'
import { Card } from '../../components/Card/Card.component'
import { ClipBoard } from '../../modules/Multiplayer/ClipBoard/ClipBoard.component'
import { COLORS } from '../../theme/colors'
import { Avatar } from '../../components/Avatar/Avatar.component'
import { Text } from '../../components/Text/Text.component'
import ProgressBar from '@ramonak/react-progress-bar'
import { usePlayer } from '../../contexts/PlayerContext'
import { TOAST_ID, warnToast } from '../../theme/toast'
import { Button } from '../../components/Button/Button.component'
import { Spacer, SpacerSize } from '../../components'
import { upperFirst } from '../../utils'
import { BsFillShieldFill } from 'react-icons/bs'
import { Tooltip } from '../../components/ToolTip/ToolTip.component'

interface Players {
  players: Player[]
}

const MultiplayerStaging = () => {
  const { roomId } = useParams()
  const { emit, listen, socket } = useSocket()
  const { username, color, avatar } = usePlayer()
  const [players, setPlayers] = React.useState<Player[]>([])
  const [sessionProperties, setSessionProperties] = React.useState<GetSessionInfo>()
  const navigate = useNavigate()

  useEffect(() => {
    if (!roomId) navigate(MAIN_ROUTES.MULTIPLAYER_SELECTION)

    // ! DUPLICATE CODE
    // ! Create a wrapper for this ???
    if (!username) {
      return navigate(`${MAIN_ROUTES.MULTIPLAYER}?redirectTo=${generatePath(MAIN_ROUTES.MULTIPLAYER_STAGING, { roomId: roomId ?? '' })
        } `)
    }
    emit(SocketPreGameEventsEnum.CHECK_SESSION_ID_VALIDITY, roomId)
    emit(SocketPreGameEventsEnum.GET_PLAYERS, roomId)
  }, [])

  listen(SocketPreGameEventsEnum.CHECK_SESSION_ID_VALIDITY, ({ isValid }) => {
    if (!isValid) {
      toast.error('This session does not exist')
      navigate(MAIN_ROUTES.MULTIPLAYER_SELECTION)
    }
  })

  listen(SocketPreGameEventsEnum.GET_PLAYERS, ({ players }: Players) => {
    setPlayers(players)
  })

  useEffect(() => {
    if (players.length > 5) {
      toast.success('This room is full', { ...warnToast, id: TOAST_ID.FULL_ROOM })
      navigate(generatePath(MAIN_ROUTES.MULTIPLAYER_SELECTION))
    }
    emit(SocketPreGameEventsEnum.GET_SESSION_INFO, roomId)
    return () => {
      toast.dismiss(TOAST_ID.FULL_ROOM)
    }
  }, [players])

  listen(SocketPreGameEventsEnum.GET_SESSION_INFO, ({ options, status }: GetSessionInfo) => {
    // If player not in room yet, join
    // ! DUPLICATE CODE
    // ! Create a wrapper for this ???
    const sockerId = socket?.id
    const player = Object.values(players ?? {})?.find(player => player.id === sockerId)
    if (!player) emit(SocketPreGameEventsEnum.JOIN_SESSION, roomId, { username, color, avatar })


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
    <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100%' }}>
      <Card style={{ padding: '2rem' }}>
        <Text fira h1 bold centered>Lobby</Text>
        <Text fira h2 thin centered>{sessionProperties?.options.name}</Text>
        <Text fira h3 centered>{players.length}/5 player{players.length > 1 ? 's' : ''}</Text>
        <div style={{ margin: '1rem 0', display: 'flex', justifyContent: 'space-evenly' }}>
          <Text fira h3 centered>{options?.mode}</Text>
          {options?.mode === SessionMode.TIME_TRIAL && <Text fira h3 centered>{options?.language}</Text>}
          {options?.mode === SessionMode.SPEED_CHALLENGE && <Text fira h3 centered>{options?.wordCount} words</Text>}
          <Text fira h3 centered>{options?.time}s</Text>
        </div>
        {players.map((player) => (
          <div style={{
            background: COLORS.WHITE,
            padding: '1rem',
            borderRadius: '10px',
            marginBottom: '0.5rem',
            border: `3px solid ${username === player.username ? 'gold' : 'black'} `,
            display: 'flex',
            width: '20rem',
            boxShadow: '4px 4px 0px black'
          }}>
            <Avatar username={player.username} avatarUrl={player.avatar} color={player.color} size='medium' />
            <div style={{ marginLeft: '0.5rem', width: '100%', display: 'flex', flexDirection: 'column', padding: '3px', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text p fira>{upperFirst(player.username)}</Text>
                {player.isHost ?
                  <Tooltip direction='right' content="Host">
                    <BsFillShieldFill color={COLORS.DARK_GREEN} />
                  </Tooltip>
                  : ''}
              </div>
              <ProgressBar width='100%' completed={100} bgColor={player.color} />
            </div>
          </div>
        ))}
        <Button
          disabled={players.length === 1 || players.length === 0 || !isHost}
          onClick={() => {
            if (roomId) emit(SocketPreGameEventsEnum.START_SESSION, roomId)
          }
          }>Start</Button>
        <Spacer y size={SpacerSize.SMALL} />
        <Button
          secondary
          onClick={() => {
            emit(SocketPreGameEventsEnum.LEAVE_SESSION, roomId)
            navigate(MAIN_ROUTES.MULTIPLAYER_SELECTION)
          }}
        >Leave</Button>
      </Card>
      {roomId && <ClipBoard url={`${import.meta.env.VITE_FRONTEND_URL}${generatePath(MAIN_ROUTES.MULTIPLAYER_ROOM, { roomId })} `} />}
    </main>
  )
}

export default MultiplayerStaging