import {
  useEffect, useRef, useState,
} from 'react';

function returnSpeed(start: any): number {
  return start || '0';
}
const useSpeedCalculator = (
  correctWords: string[],
  startCountDown: boolean,
  isTimeOut: boolean,
) => {
  const [increment, setIncrement] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(0);
  const correctLetters = correctWords.join('').length + correctWords.length;
  let interval: any = useRef();

  function startTimer() {
    interval = setInterval(() => {
      setIncrement(increment + 1);
    }, 1000);
  }

  useEffect(() => {
    if (startCountDown) {
      startTimer();
      setTypingSpeed(((correctLetters / 5) / increment) * 60);
    }
    if (isTimeOut) {
      clearInterval(interval);
    }
    return function cleanup() {
      clearInterval(interval);
    };
  }, [increment, startCountDown]);

  return [returnSpeed(typingSpeed)];
};

export default useSpeedCalculator;
