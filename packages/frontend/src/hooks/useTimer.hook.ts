// import { useState, useEffect, useRef } from 'react';

// type UseTimerProps = {
//   initialValue?: number;
//   isRunning?: boolean;
//   onFinish?: () => void;
//   countDown?: boolean;
// };

// const useTimer = ({
//   initialValue = 0,
//   isRunning = true,
//   onFinish,
//   countDown = false,
// }: UseTimerProps): number => {
//   const [timer, setTimer] = useState(initialValue);
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     console.log('isRunning', isRunning);
//     if (isRunning) {
//       console.log('here');
//       intervalRef.current = setInterval(() => {
//         setTimer((prevTimer) => {
//           console.log('prevTimer', prevTimer);
//           const newValue = countDown ? prevTimer - 1 : prevTimer + 1;
//           if (countDown && newValue <= 0) {
//             clearInterval(intervalRef.current as NodeJS.Timeout);
//             if (onFinish) onFinish();
//             return 0;
//           }
//           return newValue;
//         });
//       }, 1000);
//     } else {
//       clearInterval(intervalRef.current as NodeJS.Timeout);
//     }

//     return () => {
//       clearInterval(intervalRef.current as NodeJS.Timeout);
//     };
//   }, [isRunning, onFinish, countDown]);

//   return timer;
// };

// export { useTimer };
import { useState, useEffect, useRef } from 'react';

type UseTimerProps = {
  initialValue?: number;
  isRunning?: boolean;
  countDown?: boolean;
  onFinish?: () => void;
};

function useTimer({
  initialValue = 0,
  isRunning = true,
  onFinish,
  countDown = false,
}: UseTimerProps): number {
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
      setTimer(initialValue);
      clearInterval(intervalRef as NodeJS.Timeout);
    }

    return () => {
      clearInterval(intervalRef as NodeJS.Timeout);
    };
  }, [isRunning, timer]);

  return timer;
}

export { useTimer };
