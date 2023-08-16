import React from 'react';
import { AvatarProps } from './Avatar.props';
import { COLORS } from '../../theme/colors';
import { colorGenerator } from '@sqrib/shared';

function Avatar({ username, size }: AvatarProps) {
  const edgeSize = size === 'small' ? '2.2rem' : '3rem';
  const colorPicker = () => React.useMemo(() => colorGenerator(), [username])
  return (
    <div style={{
      display: 'inline-flex',
      background: colorPicker(),
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
      {typeof username === 'string' ? username?.[0].toLocaleUpperCase() : username}
    </div>
  );
}

export default Avatar;
