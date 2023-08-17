import { useState, useEffect } from 'react';

export function useTimestamp(isRunning: boolean): number {
  const [timestamp, setTimestamp] = useState(Date.now());

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTimestamp(Date.now());
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  return timestamp;
}
