import {
  useContext, useEffect, useRef, useState,
} from 'react';
import { formatTimerParameters } from '../helpers/countDown.helper';
import { GameMode } from '../helpers/enums/Mode.enum';
import { MainContext } from '../contexts/MainContext';

const useTimer = function () {
  const {
    setIsTimeOut,
    isTimeOut,
    gameMode,
    startCountDown,
    setStartCountDown,
    countDown,
  } = useContext(MainContext);

  let count = countDown;

  const [timerMinutes, setTimerMinutes] = useState<number>(Math.floor(count / 60));
  const [timerSeconds, setTimerSeconds] = useState<number>(Math.floor(count % 60));

  useEffect(() => {
    setTimerMinutes(Math.floor(count / 60));
    setTimerSeconds(Math.floor(count % 60));
  }, [countDown, gameMode, startCountDown]);

  let interval: any = useRef();

  function updateTimerDown(countingValue: number): void {
    const minutes = Math.floor(count / 60);
    const seconds = Math.floor(count % 60);
    if (isTimeOut || countingValue < 0) {
      clearInterval(interval);
      setStartCountDown(false);
      setIsTimeOut(true);
    } else {
      setTimerMinutes(minutes);
      setTimerSeconds(seconds);
    }
  }

  function startTimer() {
    interval = setInterval(() => {
      if (gameMode === GameMode.ONE) {
        count -= 1;
      } else {
        count += 1;
      }
      updateTimerDown(count);
    }, 1000);
  }

  useEffect(() => {
    if (startCountDown) {
      startTimer();
    }
    updateTimerDown(count);
    return () => {
      clearInterval(interval);
    };
  }, [startCountDown, isTimeOut]);

  return formatTimerParameters({ timerMinutes, timerSeconds });
};

export { useTimer };
