import React from 'react';
import { CardButtonProps } from './CardButton.props';
import './CardButton.style.scss';

const CardButton = ({ label, subLabel, secondary, onClick, style, classNames, color, shadowed }: CardButtonProps) => {
  const classes = ['card-button', classNames, secondary ? 'card-button--secondary' : '', shadowed ? 'card-button--shadowed' : ''].join(' ').trim();
  return (
    <button
      onClick={onClick}
      className={classes}
      style={{...style, color}}
    >
      <h1 className='card-button--label'>{label}</h1>
      {subLabel && <p className='card-button--sublabel'>{subLabel}</p>}
    </button>
  )
}

export { CardButton }