import { useMutation } from "@apollo/client";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import { DELETE_READ_LISTS } from "../../gql/mutation";
import { GET_ALL_READ_LISTS } from "../../gql/query";
import {
  DeleteReadLists,
  DeleteReadListsVariables
} from "../../types/generated-types";

interface Props {
  className: string;
  selected: string[];
}

export default function ToolbarSelect(props: Props) {
  const { className, selected } = props;

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
    await deleteReadLists({ variables: { ids: selected } });
  };

  return (
    <>
      <Typography
        className={className}
        color="inherit"
        variant="subtitle1"
        component="div"
      >
        {selected.length} selected
      </Typography>

      <Tooltip title="Delete">
        <IconButton aria-label="delete" color="secondary" onClick={handleClick}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </>
  );
}
