import React from 'react';
import { convertSecondsToTimerFormat } from '../../utils';
import './CountDown.style.scss';

interface CountDownProps {
  timer: number;
}

function CountDown({ timer }: CountDownProps) {
  return (
    <span className='container'>
      {convertSecondsToTimerFormat(timer)}
    </span>
  );
}

export { CountDown };
