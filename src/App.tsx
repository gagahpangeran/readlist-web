import { ApolloProvider } from "@apollo/client";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { createMuiTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/styles";
import React from "react";
import { apolloClient } from "./apollo/client";
import DialogContainer from "./components/Dialog/DialogContainer";
import SnackbarContainer from "./components/Snackbar/SnackbarContainer";
import ReadListTable from "./components/Table/Table";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      default: "#16161a",
      paper: "#242629"
    },
    primary: {
      main: "#0096d6",
      contrastText: "#fff"
    },
    secondary: {
      main: "#e53170"
    },
    success: {
      main: "#2cb67d"
    },
    error: {
      main: "#e53170"
    }
  }
});

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container component="main" maxWidth="md">
          <ReadListTable />
        </Container>
        <DialogContainer />
        <SnackbarContainer />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
