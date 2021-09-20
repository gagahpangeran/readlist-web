import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useSelectData } from "../../hooks/data";
import ToolbarFilter from "../Toolbar/ToolbarFilter";
import ToolbarNormal from "../Toolbar/ToolbarNormal";
import ToolbarSelect from "../Toolbar/ToolbarSelect";

const PREFIX = "ReadListTableToolbar";

const classes = {
  root: `${PREFIX}-root`,
  highlight: `${PREFIX}-highlight`,
  title: `${PREFIX}-title`
};

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  [`&.${classes.root}`]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  [`& .${classes.highlight}`]: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.secondary.dark
  },
  [`& .${classes.title}`]: {
    flex: "1 1 100%"
  }
}));

export default function ReadListTableToolbar() {
  const { selected } = useSelectData();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (selected.length > 0) {
      setIsFilterOpen(false);
    }
  }, [selected]);

  const renderToolbarMenu = () => {
    if (selected.length > 0) {
      return <ToolbarSelect className={classes.title} selected={selected} />;
    }

    return (
      <ToolbarNormal
        className={classes.title}
        openFilter={() => setIsFilterOpen(!isFilterOpen)}
      />
    );
  };

  return (
    <>
      <StyledToolbar
        className={clsx(classes.root, {
          [classes.highlight]: selected.length > 0
        })}
      >
        {renderToolbarMenu()}
      </StyledToolbar>
      {isFilterOpen && <ToolbarFilter close={() => setIsFilterOpen(false)} />}
    </>
  );
}
