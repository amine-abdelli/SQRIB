import React from 'react';
import './Cross.style.scss';
import { CrossProps } from './Cross.props';

function Cross({ onClick, isVisible }: CrossProps) {
  return (
    isVisible ? <button className='closing-cross' onClick={onClick}>&#10006;</button> : <></>
  );
}

export { Cross };
