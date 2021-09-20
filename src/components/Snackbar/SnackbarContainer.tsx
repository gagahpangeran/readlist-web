import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import React from "react";
import { useSnackbar } from "../../hooks/snackbar";

export default function SnackbarContainer() {
  const { isSnackbarOpen, snackbarMessage, snackbarType, closeSnackbar } =
    useSnackbar();

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={isSnackbarOpen}
      autoHideDuration={3000}
      onClose={closeSnackbar}
    >
      <Alert onClose={closeSnackbar} severity={snackbarType} variant="filled">
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
}
