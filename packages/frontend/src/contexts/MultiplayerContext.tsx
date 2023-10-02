import React, { createContext, useContext, useState } from 'react';

interface IMultiplayerContextValue {
  username: string;
  setUsername: (value: string) => void;
}
export const MultiplayerContext = createContext<IMultiplayerContextValue>({
  username: 'johnny_bone_jones',
  setUsername: (value: string) => { },
});

export const MultiplayerProvider = React.memo(({ children }: React.PropsWithChildren<object>) => {
  const [username, setUsername] = useState('');

  return (
    <MultiplayerContext.Provider value={{ username, setUsername }}>
      {children}
    </MultiplayerContext.Provider>
  );
});

MultiplayerProvider.displayName = 'MultiplayerProvider';

export const useMultiplayer = () => {
  return useContext(MultiplayerContext);
};
