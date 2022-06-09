import React from 'react';
import Image from 'next/image';
import { Text } from '@nextui-org/react';
import CountUp from 'react-countup';

import { UserCardProps } from './UserCard.props';
import goldMedal from '../../../../assets/Images/gold-medal.png';
import silverMedal from '../../../../assets/Images/silver-medal.png';
import bronzeMedal from '../../../../assets/Images/bronze-medal.png';
import { useWindowSize } from '../../../../hooks/useWindowSize';

function getMedalFromPosition(position: number) {
  switch (position) {
    case 0:
      return goldMedal;
    case 1:
      return silverMedal;
    case 2:
      return bronzeMedal;
    default:
      return '';
  }
}

function getUpPosition(position: number) {
  switch (position) {
    case 0:
      return -2;
    case 1:
      return null;
    case 2:
      return 2;
    default:
      return '';
  }
}
function getColorPosition(position: number) {
  switch (position) {
    case 0:
      return 'gold';
    case 1:
      return 'grey';
    case 2:
      return '#B87333';
    default:
      return '';
  }
}
function UserCard({ userData, position }: UserCardProps) {
  const {
    username, mpm, precision, points,
  } = userData;
  const { isSmallScreen } = useWindowSize();
  return (
    <div style={{
      border: `1px solid ${getColorPosition(position)}`,
      borderRadius: '10px',
      padding: isSmallScreen ? '5px' : '1rem',
      margin: isSmallScreen ? '5px' : '0.5rem',
      position: 'relative',
      minWidth: isSmallScreen ? '7rem' : '10rem',
      maxWidth: '100%',
      top: `${getUpPosition(position)}rem`,
    }}
    >
      <Text size={16}>
        <span style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
          <Image
            src={getMedalFromPosition(position)}
            alt="Icon of a medal"
            quality={100}
            layout='fixed'
            width={isSmallScreen ? '15px' : '32px'}
            height={isSmallScreen ? '15px' : '32px'}
          />
          {`${username}`}
        </span>
      </Text>
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingLeft: isSmallScreen ? 0 : '1rem',
      }}
      >
        <p style={{ margin: 0, padding: 0 }}>
          mpm:
          {' '}
          <CountUp end={mpm} duration={3} />
        </p>
        <p style={{ margin: 0, padding: 0 }}>
          precision:
          {' '}
          <CountUp end={precision} duration={3} />
        </p>
        <p style={{ margin: 0, padding: 0 }}>
          points:
          {' '}
          <CountUp end={points} duration={3} />
        </p>
      </div>
    </div>
  );
}

export default UserCard;
