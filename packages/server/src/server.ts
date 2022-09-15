import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { log } from '@aqac/utils';
import cors from 'cors';
import http from 'http';
import resolvers from './resolvers';
import { typeDefs } from './graphql/models';
import { createContext } from './utils/context.utils';
import { initializeSocket } from './socket/server';

const app_socket = express();
const socketServer = http.createServer(app_socket);
const io = require('socket.io')(socketServer, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

dotenv.config();
const PORT: string | 4000 = process.env.PORT || 4000;

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
      origin: [process.env.FRONTEND_URL || 'http://localhost:3000',
        'https://studio.apollographql.com',
      ],
    },
  });

  app.use((req, res) => {
    res.send('Hello from express apollo server');
  });

  app.listen(PORT, () => log.info(`Server is running on port ${PORT}`));
  // Socket server
  socketServer.listen(4001, () => log.info('listening on *:4001'));
}

startServer();
