import React from 'react';
import style from './Card.module.scss';
import { CardProps } from './Card.props';

function Card({
  children, styles, shadowed, width, minWidth,
}: CardProps) {
  return (
    <div
      className={style.cardStyle}
      style={{
        boxShadow: shadowed ? '' : 'none', width: `${width}px`, minWidth: `${minWidth}`, ...styles,
      }}
    >
      {children}
    </div>
  );
}

export default Card;
