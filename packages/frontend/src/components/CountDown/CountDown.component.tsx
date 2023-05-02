import React from 'react';
import styles from './CountDown.module.scss';
import { convertSecondsToTimer } from '../../utils';

interface CountDownProps {
  timer: number;
}

function CountDown({ timer }: CountDownProps) {
  return (
    <span className={styles.container}>
      {convertSecondsToTimer(timer)}
    </span>
  );
}

export { CountDown };
