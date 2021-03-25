import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";

interface Props {
  className: string;
  closeForm: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1)
      }
    }
  })
);
export default function ToolbarForm(props: Props) {
  const { className, closeForm } = props;
  const classes = useStyles();

  return (
    <>
      <form
        className={`${classes.root} ${className}`}
        noValidate
        autoComplete="off"
      >
        <TextField name="link" label="Link" autoFocus={true} />
        <TextField name="title" label="Title" />
        <FormControlLabel
          control={<Checkbox defaultChecked name="isRead" color="primary" />}
          label="Already Read?"
        />

        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>

      <Tooltip title="Add New Read List">
        <IconButton onClick={closeForm} aria-label="add new read list">
          <CloseIcon />
        </IconButton>
      </Tooltip>
    </>
  );
}
