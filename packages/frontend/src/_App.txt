import { useEffect, useRef } from 'react';
import { Socket } from 'socket.io-client';
import { socket, socketConnect, socketDisconnect } from './socket';
import './App.css';

function foo(socketParam: Socket) {
  return socketParam.emit('message', 'Whats up bradda');
}

async function bar() {
  const data = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api`);
  console.log(await data.json());
}

function App() {
  const { current: socketRef } = useRef(socket);

  useEffect(() => {
    socketConnect(socketRef);
    socketRef.on('response', (payload) => console.log('Socket server message : ', payload));
    return () => socketDisconnect(socketRef);
  }, [socketRef]);

  async function login() {
    return fetch('http://localhost:4000/auth/login', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ username: 'amine_karbon', password: 'Passw0rd!' }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...new Headers(),
      },
    }).then((res) => res.json());
  }

  async function logout() {
    return fetch('http://localhost:4000/auth/logout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...new Headers(),
      },
    }).then((res) => res.json());
  }
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => foo(socketRef)}>SOCKET</button>
        <button onClick={() => bar()}>API</button>
        <button onClick={() => login()}>LOGIN TEST</button>
        <button onClick={() => logout()}>LOGOUT TEST</button>
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
