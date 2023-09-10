import React from 'react';
import { CardProps } from './Card.props';
import './Card.style.scss';

const Card = ({ children, shadowed, background, width, className, centered, style }: CardProps) => {
  const hasBackground = background ? `card--${background}` : '';
  return (
    <div className={`card--wrapper ${shadowed ? 'card--shadowed' : ''} ${centered ? 'card--centered' : ''} ${hasBackground} ${className}`} style={{ width, ...style }}>
      {children}
    </div>
  )
}

export { Card };