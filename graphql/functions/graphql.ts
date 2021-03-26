import { ApolloServer } from "apollo-server-lambda";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Callback,
  Context
} from "aws-lambda";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { connectDB } from "../db";
import ReadListResolver from "../ReadListResolver";

const createHandler = async () => {
  await connectDB();

  const schema = await buildSchema({ resolvers: [ReadListResolver] });
  const server = new ApolloServer({ schema });
  return server.createHandler();
};

export const handler = (
  event: APIGatewayProxyEvent,
  context: Context,
  callback?: Callback<APIGatewayProxyResult>
) => {
  context.callbackWaitsForEmptyEventLoop = false;
  createHandler().then(handler => {
    handler(event, context, callback);
  });
};
