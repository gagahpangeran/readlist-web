import Typography from "@mui/material/Typography";
import React from "react";
import DeleteButton from "../Button/DeleteButton";

interface Props {
  selected: string[];
}

export default function ToolbarSelect(props: Props) {
  const { selected } = props;

  return (
    <>
      <Typography
        sx={{ flex: "1 1 100%" }}
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
