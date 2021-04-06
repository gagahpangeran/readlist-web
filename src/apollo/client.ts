import { ApolloClient, gql as graphql, InMemoryCache } from "@apollo/client";

const typeDefs = graphql`
  extend type Query {
    isLogin: Boolean!
  }
`;

export const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL,
  cache,
  typeDefs
});
