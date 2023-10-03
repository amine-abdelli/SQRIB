import React, { createContext, useContext, useEffect, useState } from 'react';
import { useGetSelf } from '../api/queries';
import { generateRandomColor } from '@sqrib/shared';

interface PlayerContextValue {
  username: string;
  setUsername: (value: string) => void;
  isAuthenticated?: boolean;
  color?: string;
  avatar?: string;
}

export const PlayerContext = createContext<PlayerContextValue>({
  username: '',
  setUsername: (value: string) => { },
  isAuthenticated: false,
  color: '',
  avatar: '',
});

export const PlayerProvider = React.memo(({ children }: React.PropsWithChildren<object>) => {
  const [username, setUsername] = useState('');
  const { user, isAuthenticated } = useGetSelf();

  useEffect(() => {
    setUsername(user?.username || '')
  }, [user])

  return (
    <PlayerContext.Provider value={{ username, setUsername, isAuthenticated, color: user?.color ?? generateRandomColor(), avatar: user?.avatar ?? '' }}>
      {children}
    </PlayerContext.Provider>
  );
});

PlayerProvider.displayName = 'SoundProvider';

export const usePlayer = () => {
  return useContext(PlayerContext);
};
