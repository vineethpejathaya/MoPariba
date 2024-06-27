import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://dev.mopariba.com/graphql',
  }),
  cache: new InMemoryCache(),
});

export const ApolloWrapper = ({children}: any) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
