import { useMutation } from "@apollo/client";
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
import { ADD_READ_LIST } from "../../gql/mutation";
import { GET_ALL_READ_LISTS } from "../../gql/query";
import { AddReadList, AddReadListVariables } from "../../types/generated-types";
import { dateFormatter } from "../../utils/helper";

interface Props {
  className: string;
  closeForm: () => void;
}

interface InputForm {
  link: string;
  title: string;
  isRead: boolean;
  readAt: string;
  comment: string;
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

  const [addReadList] = useMutation<AddReadList, AddReadListVariables>(
    ADD_READ_LIST,
    {
      refetchQueries: [
        {
          query: GET_ALL_READ_LISTS
        }
      ]
    }
  );

  const { register, handleSubmit, reset, watch } = useForm<InputForm>();

  const onSubmit = async ({
    link,
    title,
    isRead,
    readAt,
    comment
  }: InputForm) => {
    comment = comment.trim();
    const data: AddReadListVariables = {
      link,
      title,
      readAt: isRead ? new Date(readAt).toISOString() : null,
      comment: comment.length > 0 ? comment : null
    };
    await addReadList({ variables: { ...data } });
    reset();
  };

  const isRead = watch("isRead") ?? true;

  return (
    <>
      <form
        className={`${classes.root} ${className}`}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
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
          <TextField
            inputRef={register}
            type="date"
            name="readAt"
            defaultValue={dateFormatter(new Date())}
            disabled={!isRead}
          />
        </div>

        <div>
          <TextField
            inputRef={register}
            name="comment"
            placeholder="Comment"
            multiline
          />
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </div>
      </form>

      <Tooltip title="Add New Read List">
        <IconButton onClick={closeForm} aria-label="add new read list">
          <CloseIcon />
        </IconButton>
      </Tooltip>
    </>
  );
}
