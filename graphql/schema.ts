import { buildSchema } from "type-graphql";
import ReadListResolver from "./ReadListResolver";

export async function createSchema() {
  return await buildSchema({ resolvers: [ReadListResolver] });
}
