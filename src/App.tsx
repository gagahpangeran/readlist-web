import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import React from "react";
import ReadListTable from "./components/Table/Table";

const uri =
  process.env.NODE_ENV === "production"
    ? "/graphql"
    : "http://localhost:9000/graphql";

const client = new ApolloClient({
  uri,
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Container component="main" maxWidth="md">
        <Typography variant="h2">Read List</Typography>
        <ReadListTable />
      </Container>
    </ApolloProvider>
  );
}

export default App;
