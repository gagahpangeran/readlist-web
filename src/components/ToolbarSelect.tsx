import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";

interface Props {
  className: string;
  selected: string[];
}

export default function ToolbarSelect(props: Props) {
  const { className, selected } = props;

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
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </>
  );
}
