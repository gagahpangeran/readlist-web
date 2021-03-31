import FormControlLabel from "@material-ui/core/FormControlLabel";
import {
  createStyles,
  lighten,
  makeStyles,
  Theme
} from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Toolbar from "@material-ui/core/Toolbar";
import clsx from "clsx";
import React, { useState } from "react";
import ToolbarForm from "../Toolbar/ToolbarForm";
import ToolbarNormal from "../Toolbar/ToolbarNormal";
import ToolbarSelect from "../Toolbar/ToolbarSelect";

interface Props {
  selected: string[];
  refetch: () => void;
  showComment: boolean;
  changeShowComment: () => void;
  openLoginForm: () => void;
}

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

export default function ReadListTableToolbar(props: Props) {
  const classes = useToolbarStyles();
  const {
    selected,
    refetch,
    showComment,
    changeShowComment,
    openLoginForm
  } = props;

  const [showForm, setShowForm] = useState(false);

  const renderToolbarMenu = () => {
    if (selected.length > 0) {
      return <ToolbarSelect className={classes.title} selected={selected} />;
    }

    if (showForm) {
      return (
        <ToolbarForm
          className={classes.title}
          closeForm={() => setShowForm(false)}
        />
      );
    }

    return (
      <ToolbarNormal
        className={classes.title}
        refetch={refetch}
        openForm={() => setShowForm(true)}
        openLoginForm={openLoginForm}
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

      <Toolbar>
        <FormControlLabel
          control={
            <Switch
              checked={showComment}
              onChange={changeShowComment}
              color="primary"
            />
          }
          label="Show Comment"
        />
      </Toolbar>
    </>
  );
}
