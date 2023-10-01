import React, { createContext, useContext, useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';

const ENDPOINT = 'http://localhost:4000';


const socket = io(ENDPOINT, {
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
    return () => {
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

