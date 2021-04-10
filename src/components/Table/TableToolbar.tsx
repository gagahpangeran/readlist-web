import {
  createStyles,
  lighten,
  makeStyles,
  Theme
} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useReadListSelect } from "../../hooks/readlist";
import ToolbarFilter from "../Toolbar/ToolbarFilter";
import ToolbarNormal from "../Toolbar/ToolbarNormal";
import ToolbarSelect from "../Toolbar/ToolbarSelect";

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1)
    },
    highlight:
      theme.palette.type === "light"
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85)
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark
          },
    title: {
      flex: "1 1 100%"
    }
  })
);

export default function ReadListTableToolbar() {
  const classes = useToolbarStyles();
  const { selected } = useReadListSelect();
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
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: selected.length > 0
        })}
      >
        {renderToolbarMenu()}
      </Toolbar>
      {isFilterOpen && <ToolbarFilter close={() => setIsFilterOpen(false)} />}
    </>
  );
}
