// See https://www.apollographql.com/docs/devtools/apollo-config
// for config documentation

module.exports = {
  client: {
    service: {
      name: "graphql",
      localSchemaFile: ["./src/types/schema.json"]
    },
    includes: ["./src/**/*.gql.ts"]
  }
};
