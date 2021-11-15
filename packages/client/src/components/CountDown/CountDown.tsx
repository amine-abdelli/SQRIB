import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './CountDown.module.scss';
import { formatTimerParameters } from '../../helpers/countDown.helper';
import { GameMode } from '../../helpers/Mode.enum';
import { MainContext } from '../../../pages/Main/MainContext';

const CountDown = () => {
  const { 
    setIsTimeOut, 
    isTimeOut, 
    gameMode, 
    startCountDown, 
    setStartCountDown, 
    countDown
  } = useContext(MainContext);
  let count = countDown;
  const [timerMinutes, setTimerMinutes] = useState<number>(Math.floor(count / 60));
  const [timerSeconds, setTimerSeconds] = useState<number>(Math.floor(count % 60));

  useEffect(()=> {
    setTimerMinutes(Math.floor(count / 60));
    setTimerSeconds(Math.floor(count % 60));
  }, [countDown, gameMode, startCountDown])

  var interval: any = useRef();

  function updateTimerDown(count: number) {
    const minutes = Math.floor(count / 60)
    const seconds = Math.floor(count % 60)
    if (isTimeOut || count < 0) {
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
      if(gameMode === GameMode.ONE) {
        count--
      } else {
        count++
      }
      updateTimerDown(count);
    }, 1000)
  }
  useEffect(() => {
    startCountDown && startTimer();
      updateTimerDown(count)
    return () => {
      clearInterval(interval)
    }
  }, [startCountDown, isTimeOut])
  
  return (
    <span className={styles.container}>
      {formatTimerParameters({ timerMinutes, timerSeconds })}
    </span >
  );
};

export { CountDown };
