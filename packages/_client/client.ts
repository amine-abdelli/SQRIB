import {
  ApolloClient,
  // createHttpLink,
  InMemoryCache,
  // from,
} from '@apollo/client';

// const httpLink = createHttpLink({
//   uri: process.env.BACKEND_URL,
//   credentials: 'include',
//   headers: {
//     origin: 'https://162.19.26.154:4000',
//   },
// });

const client = new ApolloClient({
  // /!\ the order of links is important here, see : https://www.apollographql.com/docs/react/api/link/introduction/#handling-a-response
  // "HttpLink and BatchHttpLink are both examples of terminating links."
  // link: from([httpLink]),
  cache: new InMemoryCache(),
  uri: process.env.BACKEND_URL,
  credentials: 'include',
  headers: {
    origin: 'https://162.19.26.154:4000',
  },
});

export { client };
