import { makeVar, useReactiveVar } from "@apollo/client";

type Dialog = "login" | "logout" | "readlist" | "delete" | null;

const openedDialogVar = makeVar<Dialog>(null);

export default function useDialog() {
  return {
    openedDialog: useReactiveVar(openedDialogVar),
    openDialog: (dialog: Dialog) => openedDialogVar(dialog),
    closeDialog: () => openedDialogVar(null)
  };
}
