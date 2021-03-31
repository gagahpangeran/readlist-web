import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import LoginForm from "./components/Form/LoginForm";
import ReadListTable from "./components/Table/Table";

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL,
  cache: new InMemoryCache()
});

function App() {
  const [isLoginFormOpen, setisLoginFormOpen] = useState(false);

  return (
    <ApolloProvider client={client}>
      <Container component="main" maxWidth="md">
        <Typography variant="h2">Read List</Typography>
        <ReadListTable openLoginForm={() => setisLoginFormOpen(true)} />
      </Container>
      <LoginForm
        open={isLoginFormOpen}
        handleClose={() => setisLoginFormOpen(false)}
      />
    </ApolloProvider>
  );
}

export default App;
