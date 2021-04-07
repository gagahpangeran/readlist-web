import { ApolloProvider } from "@apollo/client";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { apolloClient } from "./apollo/client";
import LoginDialog from "./components/Dialog/LoginDialog";
import LogoutDialog from "./components/Dialog/LogoutDialog";
import ReadListTable from "./components/Table/Table";

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Container component="main" maxWidth="md">
        <Typography variant="h2">Read List</Typography>
        <ReadListTable />
      </Container>
      <LoginDialog />
      <LogoutDialog />
    </ApolloProvider>
  );
}

export default App;
