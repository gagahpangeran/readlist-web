// See https://www.apollographql.com/docs/devtools/apollo-config
// for config documentation

module.exports = {
  client: {
    service: {
      name: "graphql",
      url: "http://localhost:9000/graphql"
    },
    includes: ["./src/**/*.ts", "./src/**/*.tsx"]
  }
}