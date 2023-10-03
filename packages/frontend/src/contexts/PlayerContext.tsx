import React, { createContext, useContext, useEffect, useState } from 'react';
import { useGetSelf } from '../api/queries';

interface PlayerContextValue {
  username: string;
  setUsername: (value: string) => void;
  isAuthenticated?: boolean;
}

export const PlayerContext = createContext<PlayerContextValue>({
  username: '',
  setUsername: (value: string) => { },
  isAuthenticated: false,
});

export const PlayerProvider = React.memo(({ children }: React.PropsWithChildren<object>) => {
  const [username, setUsername] = useState('');
  const { user, isAuthenticated } = useGetSelf();

  useEffect(() => {
    setUsername(user?.username || '')
  }, [user])
  console.log('username', username)
  return (
    <PlayerContext.Provider value={{ username, setUsername, isAuthenticated }}>
      {children}
    </PlayerContext.Provider>
  );
});

PlayerProvider.displayName = 'SoundProvider';

export const usePlayer = () => {
  return useContext(PlayerContext);
};
