import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import * as Query from './resolvers/Query';
import { typeDefs } from './graphql/models';

dotenv.config();
const PORT = process.env.PORT || 4000;

async function startServer(){
  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers: { 
      Query, 
    },
    }
  );
  await apolloServer.start();
  app.use(cookieParser());
  apolloServer.applyMiddleware({
    app, 
    cors: {
      credentials: true,
      origin: 'https://studio.apollographql.com',
    }});
    
  app.use((req, res) => {
    res.send('Hello from express apollo server');
  })
  app.listen(PORT, () => console.log("Server is running on port 4000"));
};

startServer();