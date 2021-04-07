// See https://www.apollographql.com/docs/devtools/apollo-config
// for config documentation

module.exports = {
  client: {
    service: {
      name: "graphql",
      localSchemaFile: ["./src/types/schema.json", "./src/apollo/client.gql"]
    },
    includes: ["./src/**/*.ts", "./src/**/*.tsx"]
  }
};
