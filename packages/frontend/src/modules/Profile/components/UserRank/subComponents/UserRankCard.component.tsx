import React from 'react';
import { UserRankRange } from '@sqrib/shared';
import { Text } from '../../../../../components/Text/Text.component';
import { orderSuffix } from '../../../../../utils';
import crown from '../../../../../assets/images/crown.png';
import './UserRankCard.style.scss';

interface UserRankCardProps {
  user: UserRankRange;
}

const UserRankCard = ({ user }: UserRankCardProps) => {
  const isTheGoat = user.rank === 1;
  const isSecond = user.rank === 2;
  const isThird = user.rank === 3;
  const classes = `user-rank-card ${user.current ? 'user-rank-card--current': ''} ${isTheGoat ? 'user-rank-card--gold' : ''} ${isSecond ? 'user-rank-card--silver' : ''} ${isThird ? 'user-rank-card--copper' : ''}`;
  return (
    <div className={classes}>
      <Text p fira>{user.username}</Text>
      <Text p fira>{isTheGoat ? "The G.O.A.T" + " " + user.rank : user.rank}{orderSuffix(user.rank)}</Text>
      {isTheGoat ? <img width={50} className='first-ranked' src={crown} /> : ''}
    </div>
  )
}

export { UserRankCard }