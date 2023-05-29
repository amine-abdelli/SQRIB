import React from 'react';
import { AvatarProps } from './Avatar.props';
import { COLORS } from '../../theme/colors';

function Avatar({ username, size }: AvatarProps) {
  const edgeSize = size === 'small' ? '2.2rem' : '3rem';
  return (
    <div style={{
      display: 'inline-flex',
      background: COLORS.DARK_GREEN,
      color: COLORS.WHITE,
      border: `2px solid ${COLORS.WHITE}`,
      borderRadius: '100%',
      fontSize: size === 'small' ? '25px' : '30px',
      fontWeight: 800,
      width: edgeSize,
      height: edgeSize,
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: `2px 2px 0 ${COLORS.BLACK}`,
    }}
    >
      {username?.[0].toLocaleUpperCase()}
    </div>
  );
}

export default Avatar;
