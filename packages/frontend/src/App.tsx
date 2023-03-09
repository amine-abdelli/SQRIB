import { useEffect, useRef } from 'react';
import { Socket } from 'socket.io-client';
import { socket, socketConnect, socketDisconnect } from './socket';
import './App.css';

function foo(socketParam: Socket) {
  return socketParam.emit('message', 'Whats up bradda');
}

async function bar() {
  const data = await fetch('http://localhost:4000/api');
  console.log(await data.json());
}

function App() {
  const { current: socketRef } = useRef(socket);

  useEffect(() => {
    socketConnect(socketRef);
    socketRef.on('response', (payload) => console.log('Socket server message : ', payload));
    return () => socketDisconnect(socketRef);
  }, [socketRef]);

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => foo(socketRef)}>SOCKET</button>
        <button onClick={() => bar()}>API</button>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
