import React, { useEffect, useRef, useState } from 'react';
import styles from './CountDown.module.scss';
import { formatTimerParameters } from '../../helpers/countDown.helper';
import { IUserInputProps } from './CountDown.interfaces';

const CountDown = ({ setStartCountDown, startCountDown, setIsTimeOut, countDown }: IUserInputProps | any) => {
  const [timerMinutes, setTimerMinutes] = useState<number>(1);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);

  var interval: any = useRef();

  function updateTimer(countDown: number) {
    const minutes = Math.floor(countDown / 60)
    const seconds = Math.floor(countDown % 60)
    if (countDown < 0) {
      clearInterval(interval);
      setStartCountDown(false);
      setIsTimeOut(true);
    } else {
      setTimerMinutes(minutes)
      setTimerSeconds(seconds);
    }
  }
  function startTimer() {
    interval = setInterval(() => {
      countDown--
      updateTimer(countDown)
    }, 1000)
  }

  useEffect(() => {
    startCountDown && startTimer();
    updateTimer(countDown)
    return () => {
      clearInterval(interval)
    }
  }, [startCountDown])


  return (
    <span className={styles.container}>
      {formatTimerParameters({ timerMinutes, timerSeconds })}
    </span >
  );
};

export { CountDown };
