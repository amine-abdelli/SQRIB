import { useCallback } from 'react';
import { useSound } from '../contexts';

export const useSoundPlayer = () => {
  const { isSoundOn, selectedSound, setSoundOn } = useSound();

  const play = useCallback(() => {
    const audio = new Audio(selectedSound)
    if (isSoundOn) {
      audio.src = selectedSound;
      audio.currentTime = 0;
      audio.play().catch(error => console.error("Error playing sound:", error));
    }
  }, [isSoundOn, selectedSound, setSoundOn]);

  return play;
};
