import {
  useContext, useEffect, useRef, useState,
} from 'react';
import { formatTimerParameters } from '../utils/timer.utils';
import { GameMode } from '../utils/enums/Mode.enum';
import { MainContext } from '../context/MainContext';

function useTimer() {
  const {
    gameMode,
    startTimer,
    setStartTimer,
    countDown,
    setIsTimeOut,
    isTimeOut,
  } = useContext(MainContext);

  let count = countDown;
  let timePassed = Date.now();

  const [timerMinutes, setTimerMinutes] = useState<number>(Math.floor(count / 60));
  const [timerSeconds, setTimerSeconds] = useState<number>(Math.floor(count % 60));
  const [, setPassed] = useState<number>(0);

  useEffect(() => {
    setTimerMinutes(Math.floor(count / 60));
    setTimerSeconds(Math.floor(count % 60));
  }, [countDown, gameMode, startTimer]);

  let interval: any = useRef();

  function updateTimerDown(countingValue: number, timePassedShadow: number): void {
    const minutes = Math.floor(count / 60);
    const seconds = Math.floor(count % 60);
    if (isTimeOut || countingValue < 0) {
      clearInterval(interval);
      setStartTimer(false);
      setIsTimeOut(true);
    } else {
      setPassed(timePassedShadow);
      setTimerMinutes(minutes);
      setTimerSeconds(seconds);
    }
  }

  function triggerTimer() {
    interval = setInterval(() => {
      if (gameMode === GameMode.COUNTDOWN) {
        count -= 1;
      } else {
        timePassed += 1;
        count += 1;
      }
      updateTimerDown(count, timePassed);
    }, 1000);
  }

  useEffect(() => {
    if (startTimer) {
      triggerTimer();
    }
    updateTimerDown(count, timePassed);
    return () => {
      clearInterval(interval);
    };
  }, [startTimer, isTimeOut]);

  return {
    timer: formatTimerParameters({ timerMinutes, timerSeconds }),
    isTimeOut,
    setIsTimeOut,
    timerSeconds,
  };
}

export { useTimer };
