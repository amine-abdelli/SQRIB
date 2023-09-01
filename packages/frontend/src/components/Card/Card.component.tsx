import React from 'react';
import './Card.style.scss';
import { CardProps } from './Card.props';

const Card = ({ children, shadowed, background, width, className, centered, style }: CardProps) => {
  const hasBackground = background ? `card--${background}` : '';
  return (
    <div className={`card--wrapper ${shadowed ? 'card--shadowed' : ''} ${centered ? 'card--centered' : ''} ${hasBackground} ${className}`} style={{ width, ...style }}>
      {children}
    </div>
  )
}

export { Card };