import React from 'react';
import './Card.style.scss';
import { CardProps } from './Card.props';

const Card = ({ children, shadowed, background, width, className }: CardProps) => {
  const hasBackground = background ? `card--${background}` : '';
  return (
    <div style={{ width }} className={`card--wrapper ${shadowed ? 'card--shadowed' : ''} ${hasBackground} ${className}`}>
      {children}
    </div>
  )
}

export { Card };