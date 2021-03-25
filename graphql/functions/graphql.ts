import "reflect-metadata";
import { ApolloServer } from "apollo-server-lambda";
import { buildSchemaSync } from "type-graphql";
import ReadListResolver from "../ReadListResolver";

const schema = buildSchemaSync({ resolvers: [ReadListResolver] });
const server = new ApolloServer({ schema });

export const handler = server.createHandler();