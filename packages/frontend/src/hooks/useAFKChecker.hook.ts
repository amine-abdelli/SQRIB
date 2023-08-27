import { useEffect, useState } from 'react';
import { alertService } from '../modules/Alert/Alert.service';

interface AFKCheckerProps {
  input: string;
  timestamp: number;
  isRunning: boolean;
  callback: () => void;
  afkMessage?: string;
}

const AFK_TIMEOUT_MS = 8000;

export const useAFKChecker = ({ input, timestamp, isRunning, callback, afkMessage = 'You have been kicked out from the game for being AFK for too long.' }: AFKCheckerProps) => {
  const [lastInputTimestamp, setLastInput] = useState(0);

  const now = Date.now();

  useEffect(() => {
    if (isRunning) {
      setLastInput(now);
    } else {
      setLastInput(0);
    }
  }, [input, isRunning]);

  useEffect(() => {
    if (isRunning) {
      let timeSinceLastInput = now - lastInputTimestamp;
      if (timeSinceLastInput > AFK_TIMEOUT_MS) {
        callback();
        alertService.warn(afkMessage, {
          autoClose: false,
          closingButton: true
        });
      } else {
        timeSinceLastInput = 0;
      }
    }
  }, [timestamp]);
};
