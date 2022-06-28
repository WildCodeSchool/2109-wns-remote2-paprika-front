import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(`GraphQl error ${message}`);
    });
  }
});

const httpLink = from([
  errorLink,
  new HttpLink({ uri: 'http://localhost:4000/', credentials: 'include' }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
  credentials: 'include',
});

export default client;
