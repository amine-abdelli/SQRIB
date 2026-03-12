import React from 'react'
import { Avatar } from '../../../../components/Avatar/Avatar.component'
import { COLORS } from '../../../../theme/colors'
import { Text } from '../../../../components/Text/Text.component'
import { Tooltip } from '../../../../components/ToolTip/ToolTip.component'
import { BsFillShieldFill } from 'react-icons/bs'
import ProgressBar from '@ramonak/react-progress-bar'
import { upperFirst } from '../../../../utils'
import { PlayerCardProps } from './PlayerCard.props'

import './PlayerCard.style.scss';

const PlayerCard = ({ player, showCase, totalWords, currentUsername }: PlayerCardProps) => {
  const { avatar, color, isHost, indexOfProgression, username } = player;

  const pct = showCase
    ? 100
    : totalWords && totalWords > 0
      ? Math.min(Math.round((indexOfProgression / totalWords) * 100), 100)
      : 0;

  const isCurrentPlayer = currentUsername
    ? player.username === currentUsername
    : false;

  return (
    <div className={`player-card ${isCurrentPlayer ? 'player-card--highlighted' : ''}`}>
      <Avatar username={username} avatarUrl={avatar} color={color} size='medium' />
      <div className='player-card--progression'>
        <div className='player-card--progression__username'>
          <Text p fira bold={isCurrentPlayer}>{upperFirst(username)}</Text>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {isHost && (
              <Tooltip direction='right' content="Host">
                <BsFillShieldFill color={COLORS.DARK_GREEN} size={13} />
              </Tooltip>
            )}
            {isCurrentPlayer && (
              <span style={{ fontSize: '11px', color: COLORS.GOLD, fontFamily: 'Fira Code', fontWeight: 700 }}>You</span>
            )}
          </div>
        </div>
        <ProgressBar
          labelAlignment='center'
          width='100%'
          height='12px'
          borderRadius='4px'
          completed={pct}
          customLabel={showCase ? ' ' : `${pct}%`}
          bgColor={color}
          labelColor='#fff'
          baseBgColor='#e5e5e5'
          animateOnRender
        />
      </div>
    </div>
  )
}

export { PlayerCard }
