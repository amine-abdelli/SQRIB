import React from 'react';
import styles from './CountDown.module.scss';
import { useTimer } from '../../hooks/useTimer';

function CountDown() {
  const timer = useTimer();
  return (
    <span className={styles.container}>
      {timer}
    </span>
  );
}

export { CountDown };
