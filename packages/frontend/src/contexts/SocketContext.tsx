import React, { createContext, useContext, useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import toast from 'react-hot-toast';

import { SocketChoreEventsEnum } from '@sqrib/shared';
import { BACKEND_URL } from '../config-global';

const socket = io(BACKEND_URL, {
  transports: ['websocket'],
  autoConnect: false,
});

export const SocketContext = createContext<{
  socket: Socket;
}>({ socket });


export const SocketProvider: React.FC<any> = ({ children }) => {
  const { current: socketRef } = useRef(socket);

  useEffect(() => {
    socketRef.connect();
    socketRef.on(SocketChoreEventsEnum.ERROR, ({ message }) => {
      toast.error(message)
    })
    return () => {
      socketRef.off(SocketChoreEventsEnum.ERROR);
      socketRef.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket: socketRef }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const { socket } = useContext(SocketContext);

  const emit = (emitEventName: string, ...args: any[]) => {
    if (socket) {
      socket.emit(emitEventName, ...args);
    }
  };

  const listen = (receiveEventName: string, callback: (...args: any[]) => void) => {
    useEffect(() => {
      if (socket) {
        socket.on(receiveEventName, callback);

        // Cleanup: remove the event listener
        return () => {
          socket.off(receiveEventName, callback);
        };
      }
    }, [socket, receiveEventName, callback]);
  };

  return { socket, emit, listen };
};

