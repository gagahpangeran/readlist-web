import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import React from "react";
import { useEditData } from "../../hooks/data";
import { useDialog } from "../../hooks/dialog";
import { ReadList } from "../../types/generated-types";

interface Props {
  editData: ReadList;
  disabled: boolean;
}

function DeleteButton({ editData, disabled }: Props) {
  const { openDialog } = useDialog();
  const { setEditData } = useEditData();

  const handleClick = () => {
    setEditData(editData);
    openDialog("edit");
  };

  return (
    <Tooltip title="Edit">
      <IconButton
        aria-label="edit"
        color="primary"
        disabled={disabled}
        onClick={handleClick}
      >
        <EditIcon />
      </IconButton>
    </Tooltip>
  );
}

export default DeleteButton;
