import { ApolloServer, gql } from "apollo-server-lambda";

const typeDefs = gql`
  type Query {
    name: String!
  }
  type Mutation {
    changeName(name: String): String!
  }
`;

let name = "world";

const resolvers = {
  Query: {
    name: () => {
      return name;
    }
  },
  Mutation: {
    changeName: (parent, args, context) => {
      name = args.name;
      return name;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

export const handler = server.createHandler();
