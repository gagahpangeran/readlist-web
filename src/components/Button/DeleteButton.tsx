import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import { useDialog } from "../../hooks/dialog";
import { useReadListSelect } from "../../hooks/readlist";

interface Props {
  deletedId?: string;
  disabled?: boolean;
}

function DeleteButton({ deletedId, disabled }: Props) {
  const { openDialog } = useDialog();
  const { setSelected } = useReadListSelect();

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
