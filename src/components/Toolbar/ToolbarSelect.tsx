import Typography from "@material-ui/core/Typography";
import React from "react";
import DeleteButton from "../Button/DeleteButton";

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

      <DeleteButton />
    </>
  );
}
