import MuiAlert, { AlertProps } from "@mui/lab/Alert";
import Snackbar from "@mui/material/Snackbar";
import React from "react";
import { useSnackbar } from "../../hooks/snackbar";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SnackbarContainer() {
  const { isSnackbarOpen, snackbarMessage, snackbarType, closeSnackbar } =
    useSnackbar();

  return (
    <Snackbar
      open={isSnackbarOpen}
      autoHideDuration={3000}
      onClose={closeSnackbar}
    >
      <Alert onClose={closeSnackbar} severity={snackbarType}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
}
