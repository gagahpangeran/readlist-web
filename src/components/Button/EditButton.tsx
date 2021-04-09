import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import React from "react";
import { useDialog } from "../../hooks/dialog";

interface Props {
  disabled: boolean;
}

function DeleteButton({ disabled }: Props) {
  const { openDialog } = useDialog();

  return (
    <Tooltip title="Edit">
      <IconButton
        aria-label="edit"
        color="primary"
        disabled={disabled}
        onClick={() => openDialog("edit")}
      >
        <EditIcon />
      </IconButton>
    </Tooltip>
  );
}

export default DeleteButton;
