import { makeVar, useReactiveVar } from "@apollo/client";

const isSnackbarOpenVar = makeVar(false);
const snackbarMessageVar = makeVar("");

export function useSnackbar() {
  const handleOpen = (message: string) => {
    isSnackbarOpenVar(true);
    snackbarMessageVar(message);
  };

  const handleClose = () => {
    isSnackbarOpenVar(false);
    snackbarMessageVar("");
  };

  return {
    isSnackbarOpen: useReactiveVar(isSnackbarOpenVar),
    snackbarMessage: useReactiveVar(snackbarMessageVar),
    openSnackbar: handleOpen,
    closeSnackbar: handleClose
  };
}
