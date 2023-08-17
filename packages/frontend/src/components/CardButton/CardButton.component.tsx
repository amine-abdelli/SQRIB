import React from 'react';
import { CardButtonProps } from './CardButton.props';
import './CardButton.style.scss';

const CardButton = ({ label, subLabel, secondary, onClick }: CardButtonProps) => {
  const classes = ['card-button', secondary ? 'card-button--secondary' : ''].join(' ').trim();
  return (
    <button
      onClick={onClick}
      className={classes}
    >
      <h1 className='card-button--label'>{label}</h1>
      {subLabel && <p className='card-button--sublabel'>{subLabel}</p>}
    </button>
  )
}

export { CardButton }