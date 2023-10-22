import React from 'react'
import { LuRefreshCcw } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'

import { Card } from '../../../components/Card/Card.component'
import { Text } from '../../../components/Text/Text.component'
import { Input } from '../../Auth/components'
import { Button } from '../../../components/Button/Button.component'
import { Spacer, SpacerSize } from '../../../components'
import { generateRandomUsername } from '../../../utils/username.util'
import { COLORS } from '../../../theme/colors'
import { useUsernameChecker } from '../../../api/queries/useUsernameChecker.hook'
import Notification from '../../../components/Notification/Notification.component'
import { usePlayer } from '../../../contexts/PlayerContext'
import { MAIN_ROUTES } from '../../../routes/paths'
import { getTodaysGreeting } from './greet'

interface JoinCardProps {
  redirectTo?: string
}

const JoinCard = ({ redirectTo }: JoinCardProps) => {
  const { mutateAsync, data } = useUsernameChecker()
  const { username, setUsername, isAuthenticated } = usePlayer()
  // Local username
  const [_username, _setUsername] = React.useState(username || generateRandomUsername())
  const navigate = useNavigate()

  React.useEffect(() => {
    let delayTimer: any;
    if (!isAuthenticated) {
      delayTimer = setTimeout(function () {
        mutateAsync({ username: _username })
      }, 1500);
    }
    return () => clearTimeout(delayTimer);
  }, [_username])

  function join() {
    setUsername(_username)
    localStorage.setItem('mp_username', _username)
    return redirectTo ? navigate(redirectTo) : navigate(MAIN_ROUTES.MULTIPLAYER_SELECTION)
  }
  const isJoinButtonDisabled = isAuthenticated ? false : !data?.data || !data?.data.isAvailable || _username.length < 4
  return (
    <Card style={{ width: '100%', padding: '2rem 1.5rem' }}>
      <Text h2 fira>WELCOME TO SQRIB.IO MULTIPLAYER</Text>
      <Spacer y size={SpacerSize.SMALL} />
      {isAuthenticated
        ? <Text p fira>{getTodaysGreeting()}</Text>
        : <Text p fira>Get ready to unleash your typing skills and conquer the leaderboard! Are you the fastest typer in the universe? There's only one way to find out.</Text>}
      <Spacer y size={SpacerSize.MEDIUM} />
      {!isAuthenticated && <Text p fira>Use this random username or enter your own.</Text>}
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Input disabled={isAuthenticated} style={{ width: '100%' }} name='' placeholder='Username' value={_username} onChange={(e) => _setUsername(e.target.value)} />
          {!isAuthenticated && <Button stretch light onClick={() => _setUsername(generateRandomUsername())}>
            <LuRefreshCcw color={COLORS.BLACK} size={24} />
          </Button>}
        </div>
        {data?.data && !isAuthenticated ? (data?.data.isAvailable ? <Text p size={10} thin color={COLORS.SUCCESS}>Username available</Text> : <Text size={10} p thin color={COLORS.ERROR}>Username not available</Text>)
          : <Text p size={10} thin color='transparent'>Loading</Text>}
      </div>
      <Notification type='error' message='SQRIB.IO is in alpha. Please report bugs when you see them!' />
      <Button disabled={isJoinButtonDisabled} onClick={join}>JOIN</Button>
      <Spacer y size={SpacerSize.SMALL} />
      <Button secondary onClick={() => navigate(MAIN_ROUTES.HOME)}>Leave</Button>
    </Card>
  )
}

export { JoinCard }