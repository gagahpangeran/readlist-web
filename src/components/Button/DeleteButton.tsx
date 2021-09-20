import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import React from "react";
import { useSelectData } from "../../hooks/data";
import { useDialog } from "../../hooks/dialog";

interface Props {
  deletedId?: string;
  disabled?: boolean;
}

function DeleteButton({ deletedId, disabled }: Props) {
  const { openDialog } = useDialog();
  const { setSelected } = useSelectData();

  const handleOnClick = () => {
    if (deletedId !== undefined) {
      setSelected([deletedId]);
    }

    openDialog("delete");
  };

  return (
    <Tooltip title="Delete">
      <IconButton
        aria-label="delete"
        color="secondary"
        onClick={handleOnClick}
        disabled={disabled}
      >
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
}

export default DeleteButton;
