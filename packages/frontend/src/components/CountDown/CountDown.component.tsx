import React from 'react';
import styles from './CountDown.module.scss';
import { convertSecondsToTimerFormat } from '../../utils';

interface CountDownProps {
  timer: number;
}

function CountDown({ timer }: CountDownProps) {
  return (
    <span className={styles.container}>
      {convertSecondsToTimerFormat(timer)}
    </span>
  );
}

export { CountDown };
