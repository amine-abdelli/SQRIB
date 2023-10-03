import React from 'react';
import { generateRandomColor } from '@sqrib/shared';

import { AvatarProps } from './Avatar.props';

import './Avatar.style.scss';

function Avatar({ username, size, avatarUrl, color, style, onClick }: AvatarProps) {
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
  } else if (size === 'xxlarge') {
    edgeSize = '7.5rem';
    fontSize = '80px';
  } else if (size === 'xxxlarge') {
    edgeSize = '10rem';
    fontSize = '95px';
  }
  const colorPicker = () => React.useMemo(() => generateRandomColor(), [username])
  // TODO in future, when user will be able to edit its own profile. Add react-image-crop library
  return (
    avatarUrl ? <img onClick={onClick} src={avatarUrl} alt="User's Avatar" style={{
      width: edgeSize,
      height: edgeSize, borderRadius: '10px',
      border: '3px solid black'
    }} /> : <div
      className='avatar'
      onClick={onClick}
      style={{
        background: color ?? colorPicker(),
        fontSize,
        width: edgeSize,
        height: edgeSize,
        ...style
      }}
    >
      {typeof username === 'string' ? username?.[0]?.toLocaleUpperCase() + username?.[1] : username}
    </div>
  );
}

export { Avatar };
