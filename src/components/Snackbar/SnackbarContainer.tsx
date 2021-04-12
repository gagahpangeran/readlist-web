import Snackbar from "@material-ui/core/Snackbar";
import React from "react";
import { useSnackbar } from "../../hooks/snackbar";

export default function SnackbarContainer() {
  const { isSnackbarOpen, snackbarMessage, closeSnackbar } = useSnackbar();

  return (
    <Snackbar
      open={isSnackbarOpen}
      message={snackbarMessage}
      autoHideDuration={3000}
      onClose={closeSnackbar}
    />
  );
}
