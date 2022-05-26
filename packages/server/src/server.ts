import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { log } from '@aqac/utils';
import resolvers from './resolvers';
import { typeDefs } from './graphql/models';
import { createContext } from './utils/context.utils';

dotenv.config();
const PORT: string | 4000 = process.env.PORT || 4000;

async function startServer() {
  const app = express();
  app.use(cors());
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
}

startServer();
