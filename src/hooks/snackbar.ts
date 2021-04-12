import { makeVar, useReactiveVar } from "@apollo/client";

type SnackbarType = "success" | "error";

const isSnackbarOpenVar = makeVar(false);
const snackbarMessageVar = makeVar("");
const snackbarTypeVar = makeVar<SnackbarType | undefined>(undefined);

export function useSnackbar() {
  const handleOpen = (message: string, type: SnackbarType) => {
    isSnackbarOpenVar(true);
    snackbarMessageVar(message);
    snackbarTypeVar(type);
  };

  const handleClose = () => {
    isSnackbarOpenVar(false);
  };

  return {
    isSnackbarOpen: useReactiveVar(isSnackbarOpenVar),
    snackbarMessage: useReactiveVar(snackbarMessageVar),
    snackbarType: useReactiveVar(snackbarTypeVar),
    openSnackbar: handleOpen,
    closeSnackbar: handleClose
  };
}
