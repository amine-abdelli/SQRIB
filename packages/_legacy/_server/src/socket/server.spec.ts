const { createServer } = require('http');
const { Server } = require('socket.io');
const Client = require('socket.io-client');

describe('Socket service', () => {
  let io;
  let serverSocket;
  let clientSocket;

  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const { port } = httpServer.address();
      clientSocket = new Client(`http://localhost:${port}`);
      io.on('connection', (socket) => {
        serverSocket = socket;
      });
      clientSocket.on('connect', done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  test('Client should receive "word !" from socket client "hello"', (done) => {
    serverSocket.emit('hello', 'world !');
    clientSocket.on('hello', (arg) => {
      expect(arg).toBe('world !');
      done();
    });
  });

  test('Server should receive "word !" from socket server "hello"', (done) => {
    clientSocket.emit('hello', (arg) => {
      expect(arg).toBe('world !');
      done();
    });
    serverSocket.on('hello', (cb) => {
      cb('world !');
    });
  });
});
