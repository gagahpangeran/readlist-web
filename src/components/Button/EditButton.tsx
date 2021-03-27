import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import React from "react";

interface Props {
  onClick: () => void;
  disabled: boolean;
}

function DeleteButton({ onClick, disabled }: Props) {
  return (
    <Tooltip title="Edit">
      <IconButton
        aria-label="edit"
        color="primary"
        disabled={disabled}
        onClick={onClick}
      >
        <EditIcon />
      </IconButton>
    </Tooltip>
  );
}

export default DeleteButton;
