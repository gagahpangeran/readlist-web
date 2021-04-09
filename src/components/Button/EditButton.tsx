import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import React from "react";
import { useDialog } from "../../hooks/dialog";
import { useReadListEditData } from "../../hooks/readlist";
import { ReadList } from "../../types/generated-types";

interface Props {
  editData: ReadList;
  disabled: boolean;
}

function DeleteButton({ editData, disabled }: Props) {
  const { openDialog } = useDialog();
  const { setEditData } = useReadListEditData();

  const handleClick = () => {
    const { id, ...data } = editData;
    setEditData({ id, data });
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
