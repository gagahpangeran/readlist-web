import { makeVar, useReactiveVar } from "@apollo/client";

type Dialog = "login" | "logout" | "add" | "edit" | "delete" | null;

const openedDialogVar = makeVar<Dialog>(null);

export function useDialog() {
  return {
    openedDialog: useReactiveVar(openedDialogVar),
    openDialog: (dialog: Dialog) => openedDialogVar(dialog),
    closeDialog: () => openedDialogVar(null)
  };
}
