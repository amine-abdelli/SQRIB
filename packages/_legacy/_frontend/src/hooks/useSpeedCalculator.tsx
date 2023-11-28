import {
  useEffect, useRef, useState,
} from 'react';

function returnSpeed(start: number): number {
  return Math.round(start) || 0;
}
const useSpeedCalculator = (
  correctWords: string[],
  startTimer: boolean,
  isTimeOut: boolean,
) => {
  const [increment, setIncrement] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(0);
  const correctLetters = correctWords.join('').length + correctWords.length;
  let interval: any = useRef();

  function triggerTimer() {
    interval = setInterval(() => {
      setIncrement(increment + 1);
    }, 1000);
  }

  useEffect(() => {
    if (startTimer) {
      triggerTimer();
      setTypingSpeed(((correctLetters / 5) / increment) * 60);
    }
    if (isTimeOut) {
      clearInterval(interval);
    }
    // Reset speed calculator parameter after each level
    if (!isTimeOut && !correctLetters) {
      setIncrement(0);
    }

    return function cleanup() {
      clearInterval(interval);
    };
  }, [increment, startTimer]);

  return [returnSpeed(typingSpeed)];
};

export default useSpeedCalculator;
