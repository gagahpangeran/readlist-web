import { gql, useQuery } from "@apollo/client";
import { apolloClient, cache } from "../apollo/client";
import { OpenedDialog } from "../types/generated-types";

const GET_OPENED_DIALOG = gql`
  query OpenedDialog {
    openedDialog @client
  }
`;

type Dialog = "login" | null;

const writeQueryData = (openedDialog: Dialog) => ({
  query: GET_OPENED_DIALOG,
  data: {
    openedDialog
  }
});

cache.writeQuery(writeQueryData(null));

export default function useDialog() {
  const { data } = useQuery<OpenedDialog>(GET_OPENED_DIALOG);

  const openDialog = (dialog: Dialog) => {
    apolloClient.writeQuery(writeQueryData(dialog));
  };

  const closeDialog = () => {
    apolloClient.writeQuery(writeQueryData(null));
  };

  return {
    openedDialog: (data?.openedDialog ?? null) as Dialog,
    openDialog,
    closeDialog
  };
}
