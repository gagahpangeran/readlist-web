import { ApolloClient, InMemoryCache } from "@apollo/client";

export const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL,
  cache
});
