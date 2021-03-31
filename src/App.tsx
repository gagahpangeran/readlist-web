import { ApolloProvider } from "@apollo/client";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import LoginForm from "./components/Form/LoginForm";
import ReadListTable from "./components/Table/Table";
import { apolloClient } from "./context/apollo";

function App() {
  const [isLoginFormOpen, setisLoginFormOpen] = useState(false);

  return (
    <ApolloProvider client={apolloClient}>
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
