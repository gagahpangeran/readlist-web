import { useMutation } from "@apollo/client";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import useDialog from "../../gql/dialog";
import { DELETE_READ_LISTS, GET_ALL_READ_LISTS } from "../../gql/readlist";
import {
  DeleteReadLists,
  DeleteReadListsVariables
} from "../../types/generated-types";

interface Props {
  ids: string[];
  disabled?: boolean;
}

function DeleteButton({ ids, disabled }: Props) {
  const [deleteReadLists] = useMutation<
    DeleteReadLists,
    DeleteReadListsVariables
  >(DELETE_READ_LISTS, {
    refetchQueries: [
      {
        query: GET_ALL_READ_LISTS
      }
    ]
  });

  const handleClick = async () => {
    await deleteReadLists({ variables: { ids } });
  };

  const { openDialog } = useDialog();

  return (
    <Tooltip title="Delete">
      <IconButton
        aria-label="delete"
        color="secondary"
        onClick={() => openDialog("delete")}
        disabled={disabled}
      >
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
}

export default DeleteButton;
