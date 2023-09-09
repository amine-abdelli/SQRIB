import React from 'react';
import { AvatarProps } from './Avatar.props';
import { COLORS } from '../../theme/colors';
import { colorGenerator } from '@sqrib/shared';
import './Avatar.style.scss'

function Avatar({ username, size, avatarUrl, color }: AvatarProps) {
  let edgeSize = '2.2rem';
  let fontSize = '25px';
  if (size === 'small') {
    edgeSize = '2.2rem';
    fontSize = '25px';
  } else if (size === 'medium') {
    edgeSize = '3rem';
    fontSize = '30px';
  } else if (size === 'large') {
    edgeSize = '4rem';
    fontSize = '36px';
  } else if (size === 'xlarge') {
    edgeSize = '5rem';
    fontSize = '60px';
  }
  const colorPicker = () => React.useMemo(() => colorGenerator(), [username])
  // TODO in future, when user will be able to edit its own profile. Add react-image-crop library
  return (
    avatarUrl ? <img src={avatarUrl} alt="User's Avatar" style={{ width: '5rem', height: 'auto', borderRadius: '100%', border: '3px solid black' }} /> : <div
      className='avatar'
      style={{
        display: 'inline-flex',
        background: color ?? colorPicker(),
        color: COLORS.WHITE,
        border: `3px solid ${COLORS.BLACK}`,
        borderRadius: '100%',
        fontSize,
        fontWeight: 800,
        width: edgeSize,
        height: edgeSize,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {typeof username === 'string' ? username?.[0].toLocaleUpperCase() : username}
    </div>
  );
}

export default Avatar;
