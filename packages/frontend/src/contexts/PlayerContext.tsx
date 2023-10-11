import React, { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { SocketChoreEventsEnum, generateRandomColor } from '@sqrib/shared';

import { useGetSelf } from '../api/queries';
import { useSocket } from './SocketContext';

interface PlayerContextValue {
  username: string;
  setUsername: (value: string) => void;
  isAuthenticated: boolean;
  color: string;
  avatar: string;
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
  const { listen } = useSocket();

  // Handle all player notifications here with a sendPlayerNotification function. store socker id here ?
  listen(SocketChoreEventsEnum.PLAYER_NOTIFICATION, ({ message }: { message: string }) => {
    toast.success(message, { icon: '' })
  })

  useEffect(() => {
    setUsername(user?.username || '')
  }, [user])

  return (
    <PlayerContext.Provider value={{ username, setUsername, isAuthenticated, color: user?.color ?? generateRandomColor(), avatar: user?.avatar ?? '' }}>
      {children}
    </PlayerContext.Provider>
  );
});

PlayerProvider.displayName = 'PlayerProvider';

export const usePlayer = () => {
  return useContext(PlayerContext);
};
