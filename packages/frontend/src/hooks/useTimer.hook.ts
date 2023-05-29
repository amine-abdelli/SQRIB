import { useState, useEffect, useRef } from 'react';

type UseTimerProps = {
  initialValue?: number,
  isRunning?: boolean,
  countDown?: boolean,
  onFinish?: () => void
};

type UseTimerReturnType = { timer: number, resetTimer: () => void }

function useTimer({
  initialValue = 0,
  isRunning = true,
  onFinish,
  countDown = false,
}: UseTimerProps): UseTimerReturnType {
  const [timer, setTimer] = useState(initialValue);

  let intervalRef: any = useRef();
  function main() {
    intervalRef = setInterval(() => {
      setTimer(() => {
        const timerDown = timer - 1;
        const timerUp = timer + 1;
        const newValue = countDown ? timerDown : timerUp;
        if (countDown && newValue <= 0) {
          clearInterval(intervalRef as NodeJS.Timeout);
          if (onFinish) onFinish();
          return 0;
        }
        return newValue;
      });
    }, 1000);
  }

  useEffect(() => {
    if (isRunning) {
      main();
    } else {
      // Uncomment to reset timer on countdown end or when isRunning is false
      // setTimer(initialValue);
      clearInterval(intervalRef as NodeJS.Timeout);
    }

    return () => {
      clearInterval(intervalRef as NodeJS.Timeout);
    };
  }, [isRunning, timer, initialValue]);

  function resetTimer() {
    setTimer(initialValue);
  }

  return {timer, resetTimer };
}

export { useTimer };
