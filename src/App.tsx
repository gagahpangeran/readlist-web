import { ApolloProvider } from "@apollo/client";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import { apolloClient } from "./apollo/client";
import LoginDialog from "./components/Dialog/LoginDialog";
import ReadListTable from "./components/Table/Table";

function App() {
  const [isLoginFormOpen, setisLoginFormOpen] = useState(false);

  return (
    <ApolloProvider client={apolloClient}>
      <Container component="main" maxWidth="md">
        <Typography variant="h2">Read List</Typography>
        <ReadListTable openLoginForm={() => setisLoginFormOpen(true)} />
      </Container>
      <LoginDialog
        open={isLoginFormOpen}
        handleClose={() => setisLoginFormOpen(false)}
      />
    </ApolloProvider>
  );
}

export default App;
