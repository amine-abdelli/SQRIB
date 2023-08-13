import React, { createContext, useContext, useState } from 'react';

interface ISoundContextValue {
  isSoundOn: boolean;
  setSoundOn: (value: boolean) => void;
  selectedSound: string;
  setSelectedSound: (value: string) => void;
}
const soundPath = 'src/assets/sounds/keyboardSoundA.mp3';
export const SoundContext = createContext<ISoundContextValue>({
  isSoundOn: true,
  setSoundOn: (value: boolean) => {},
  selectedSound: soundPath,
  setSelectedSound: (value: string) => {},
});

export const SoundProvider = React.memo(({ children }: React.PropsWithChildren<object>)  => {
  const [isSoundOn, setSoundOn] = useState(true);
  const [selectedSound, setSelectedSound] = useState(soundPath);

  return (
    <SoundContext.Provider value={{ isSoundOn, setSoundOn, selectedSound, setSelectedSound }}>
      {children}
    </SoundContext.Provider>
  );
});

SoundProvider.displayName = 'ScanningProvider';

export const useSound = () => {
  return useContext(SoundContext);
};
