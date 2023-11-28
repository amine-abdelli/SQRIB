import React from 'react';
import { theme } from '../../../styles/theme';
import { AvatarProps } from './Avatar.props';

function Avatar({ username, size }: AvatarProps) {
  const edgeSize = size === 'small' ? '2.2rem' : '3rem';
  return (
    <div style={{
      display: 'inline-flex',
      background: theme.secondary,
      color: theme.tertiary,
      border: `2px solid ${theme.outline}`,
      borderRadius: '100%',
      fontSize: size === 'small' ? '25px' : '30px',
      fontWeight: 800,
      width: edgeSize,
      height: edgeSize,
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: `2px 2px 0 ${theme.outline}`,
    }}
    >
      {username?.[0].toLocaleUpperCase()}
    </div>
  );
}

export default Avatar;
