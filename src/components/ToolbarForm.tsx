import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { useForm } from "react-hook-form";

interface Props {
  className: string;
  closeForm: () => void;
}

interface InputForm {
  link: string;
  title: string;
  isRead: boolean;
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

  const { register, handleSubmit } = useForm<InputForm>();

  const onSubmit = (value: InputForm) => {
    console.log(value);
  };

  return (
    <>
      <form
        className={`${classes.root} ${className}`}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          inputRef={register}
          name="link"
          label="Link"
          autoFocus={true}
        />
        <TextField inputRef={register} name="title" label="Title" />
        <FormControlLabel
          control={
            <Checkbox
              inputRef={register}
              defaultChecked
              name="isRead"
              color="primary"
            />
          }
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
