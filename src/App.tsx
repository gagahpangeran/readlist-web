import { ApolloProvider } from "@apollo/client";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { apolloClient } from "./apollo/client";
import DialogContainer from "./components/Dialog/DialogContainer";
import SnackbarContainer from "./components/Snackbar/SnackbarContainer";
import ReadListTable from "./components/Table/Table";

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Container component="main" maxWidth="md">
        <Typography variant="h2">Read List</Typography>
        <ReadListTable />
      </Container>
      <DialogContainer />
      <SnackbarContainer />
    </ApolloProvider>
  );
}

export default App;
