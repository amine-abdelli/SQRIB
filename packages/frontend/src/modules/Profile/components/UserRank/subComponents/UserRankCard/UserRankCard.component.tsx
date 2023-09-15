import React from 'react';
import { UserRankRange } from '@sqrib/shared';
import { Text } from '../../../../../../components/Text/Text.component';
import { orderSuffix } from '../../../../../../utils';
import crown from '../../../../../../assets/images/crown.png';
import { Button } from '../../../../../../components/Button/Button.component';
import { MdOutlineMoreVert } from 'react-icons/md';
import { generatePath, useNavigate } from 'react-router-dom';
import { MAIN_ROUTES } from '../../../../../../routes/paths';
import { Tooltip } from '../../../../../../components/ToolTip/ToolTip.component';
import './UserRankCard.style.scss';

interface UserRankCardProps {
  user: UserRankRange;
  isCurrent?: boolean;
  containerRef: React.RefObject<HTMLDivElement> | null;
}

const UserRankCard = ({ user, containerRef }: UserRankCardProps) => {
  const isTheGoat = user.rank === 1;
  const isSecond = user.rank === 2;
  const isThird = user.rank === 3;
  const classes = `user-rank-card ${user.current ? 'user-rank-card--current' : ''} ${isTheGoat ? 'user-rank-card--gold' : ''} ${isSecond ? 'user-rank-card--silver' : ''} ${isThird ? 'user-rank-card--copper' : ''}`;
  const navigate = useNavigate();
  return (
    <div className={classes} ref={containerRef}>
      <Text p fira bold style={{ flex: 1 }}>{user.rank}{orderSuffix(user.rank)}</Text>
      <Text p fira bold style={{ flex: 1 }}>{user.username}</Text>
      <span style={{ display: 'flex', flex: 1 }}>
        <Text p bold>{user.best_wpm}</Text>
        <Text p size={12} style={{ alignSelf: 'flex-end' }} fira>WPM</Text>
      </span>
      <span style={{ display: 'flex', flex: 1 }}>
        <Text p bold>{user.average_accuracy}</Text>
        <Text p size={12} style={{ alignSelf: 'flex-end' }} fira >%</Text>
      </span>
      {isTheGoat ? <img width={50} className='first-ranked' src={crown} /> : ''}
      <Tooltip size={7} content="Visit profile">
        <Button className='user-rank-card__see-more--button' light stretch onClick={() => { navigate(generatePath(MAIN_ROUTES.USER_PROFILE, { username: user.username })) }} style={{ position: 'absolute', right: '0rem', top: '50%', bottom: '50%', transform: 'translate(0%, -50%)' }}><MdOutlineMoreVert /></Button>
      </Tooltip>
    </div>
  )
}

export { UserRankCard }