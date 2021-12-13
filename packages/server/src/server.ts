import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import * as Query from './resolvers/Query';
import * as Mutation from './resolvers/Mutation';
import { typeDefs } from './graphql/models';
import { createContext } from './utils/context.utils';

dotenv.config();
const PORT: string | 4000 = process.env.PORT || 4000;

async function startServer() {
  const app = express();
  const apolloServer: ApolloServer<any> = new ApolloServer({
    typeDefs,
    resolvers: {
      Query,
      Mutation,
    },
    context: createContext,
  });
  await apolloServer.start();
  app.use(cookieParser());
  apolloServer.applyMiddleware({
    app,
    cors: {
      credentials: true,
      // origin: 'http://localhost:3000',
      origin: 'https://studio.apollographql.com',
    },
  });

  app.use((req, res) => {
    res.send('Hello from express apollo server');
  });

  app.listen(PORT, () => console.log('Server is running on port 4000'));
}

startServer();
