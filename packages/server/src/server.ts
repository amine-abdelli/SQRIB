import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { log } from '@sqrib/utils';
import cors from 'cors';
import http from 'http';
import resolvers from './resolvers';
import { typeDefs } from './graphql/models';
import { createContext } from './utils/context.utils';
import { initializeSocket } from './socket/server';

const app_socket = express();
const socketServer = http.createServer(app_socket);
const io = require('socket.io')(socketServer, {
  path: '/socket',
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

dotenv.config();
const APOLLO_SERVER_PORT = process.env.APOLLO_SERVER_PORT || 4000;
const SOCKET_SERVER_PORT = process.env.SOCKET_SERVER_PORT || 4001;

async function startServer() {
  const app = express();
  app_socket.use(cors());
  initializeSocket(io);
  const apolloServer: ApolloServer<any> = new ApolloServer({
    typeDefs,
    resolvers,
    context: createContext,
  });
  await apolloServer.start();
  app.use(cookieParser());
  apolloServer.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: [process.env.FRONTEND_URL || 'http://localhost:3000', 'http://localhost:3000',
        'https://studio.apollographql.com',
      ],
    },
  });

  app.use((req, res) => {
    res.send('Hello from express apollo server');
  });

  app_socket.use((req, res) => {
    res.send('Hello from express websocket server');
  });

  app.listen(APOLLO_SERVER_PORT, () => log.info(`Apollo server running on port ${APOLLO_SERVER_PORT}`));
  // Socket server
  socketServer.listen(SOCKET_SERVER_PORT, () => log.info(`Websocket server running on port ${process.env.SOCKET_SERVER_PORT}`));
}

startServer();
