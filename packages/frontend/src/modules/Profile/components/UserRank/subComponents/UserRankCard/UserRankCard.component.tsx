import React from 'react';
import { UserRankRange } from '@sqrib/shared';

import { Text } from '../../../../../../components/Text/Text.component';
import { capitalizeFirstLetter, orderSuffix } from '../../../../../../utils';
import crown from '../../../../../../assets/images/crown.png';
import { generatePath, useNavigate } from 'react-router-dom';
import { MAIN_ROUTES } from '../../../../../../routes/paths';
import { Tooltip } from '../../../../../../components/ToolTip/ToolTip.component';
import { Avatar } from '../../../../../../components/Avatar/Avatar.component';
import { useWindowSize } from '../../../../../../hooks';

import './UserRankCard.style.scss';

interface UserRankCardProps {
  user: UserRankRange;
  isCurrent?: boolean;
  containerRef: React.RefObject<HTMLDivElement> | null;
}

const UserRankCard = ({ user, containerRef }: UserRankCardProps) => {
  const { isMediumScreen } = useWindowSize();
  const navigate = useNavigate();

  const isTheGoat = user.rank === 1;
  const isSecond = user.rank === 2;
  const isThird = user.rank === 3;

  const isOwnProfile = user.current;

  const classes = `user-rank-card ${isOwnProfile ? 'user-rank-card--current' : ''} ${isTheGoat ? 'user-rank-card--gold' : ''} ${isSecond ? 'user-rank-card--silver' : ''} ${isThird ? 'user-rank-card--copper' : ''}`;

  return (
    <div className={classes} style={{ cursor: isOwnProfile ? 'inherit' : 'pointer' }} ref={containerRef} onClick={() => {
      if (!isOwnProfile) {
        navigate(generatePath(MAIN_ROUTES.USER_PROFILE, { username: user.username }))
      }
    }}>
      <Text p fira bold style={{ marginRight: '1rem' }}>{user.rank}{orderSuffix(user.rank)}</Text>
      <Tooltip enable={!isMediumScreen && !isOwnProfile} size={14} content={`Visit ${user.username}'s profile`} direction='right'>
        <Avatar style={{ padding: 0, margin: '0 0.3rem' }} color={user.color} username={user.username} avatarUrl={user.avatar} />
      </Tooltip>
      <Text p fira bold style={{ flex: 1 }}>{capitalizeFirstLetter(user.username)}</Text>
      <span style={{ display: 'flex', flex: 1 }}>
        <Text p bold>{user.best_wpm}</Text>
        <Text p size={12} style={{ alignSelf: 'flex-end' }} fira>WPM</Text>
      </span>
      <span style={{ display: 'flex' }}>
        <Text p bold>{user.average_accuracy}</Text>
        <Text p size={12} style={{ alignSelf: 'flex-end' }} fira >%</Text>
      </span>
      {isTheGoat ? <img width={50} className='first-ranked' src={crown} /> : ''}
    </div>
  )
}

export { UserRankCard }