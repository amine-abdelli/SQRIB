import React, { useEffect, useState } from 'react';
import styles from './CountDown.module.scss';
import { formatTimerParameters } from '../../pages/helpers/countDown.helper';
import { UserInputInterface } from './CountDown.interfaces';


const CountDown = ({ setIsCountDownFinished, countUpValues, setCountUpValues, countUp, setCountUp, startCountDown }: UserInputInterface) => {
  const [timer, setTimer] = useState<string>('01:00');

  useEffect(() => {
    if (countUp <= 60 && startCountDown) {
      var addOneSecond: NodeJS.Timer = setInterval(() => setCountUp(countUp + 1), 1000);
      if (countUp > 0) setCountUpValues({ minutes: 0, seconds: 60 - countUp });
    }
    if (countUp === 60) {
      setIsCountDownFinished(true);
    }
    setTimer(formatTimerParameters(countUpValues))
    return () => clearInterval(addOneSecond);
  }, [countUp, startCountDown])

  return (
    <span className={styles.container}>
      {timer}
    </span >
  )
}

export { CountDown };
