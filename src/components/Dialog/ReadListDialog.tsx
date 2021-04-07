import { useMutation } from "@apollo/client";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import LinearProgress from "@material-ui/core/LinearProgress";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { useForm } from "react-hook-form";
import useDialog from "../../gql/dialog";
import { ADD_READ_LIST } from "../../gql/readlist";
import { AddReadList, AddReadListVariables } from "../../types/generated-types";
import { dateFormatter } from "../../utils/helper";

interface InputForm {
  link: string;
  title: string;
  isRead: boolean;
  readAt: string;
  comment: string;
}

export default function ReadListDialog() {
  const { openedDialog, closeDialog } = useDialog();

  const [addReadList, { loading }] = useMutation<
    AddReadList,
    AddReadListVariables
  >(ADD_READ_LIST, { errorPolicy: "all" });

  const { register, handleSubmit, watch } = useForm<InputForm>();

  const onSubmit = async ({ isRead, readAt, comment, ...rest }: InputForm) => {
    const data = {
      ...rest,
      readAt: isRead ? new Date(readAt).toISOString() : null,
      comment: comment.trim().length > 0 ? comment.trim() : null
    };

    await addReadList({ variables: { data } });

    closeDialog();
  };

  const isRead = watch("isRead") ?? true;

  return (
    <Dialog open={openedDialog === "readlist"} onClose={closeDialog} fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Add New Read List</DialogTitle>
        <DialogContent>
          <TextField
            inputRef={register}
            required
            name="link"
            label="Link"
            fullWidth
          />
        </DialogContent>

        <DialogContent>
          <TextField
            inputRef={register}
            required
            name="title"
            label="Title"
            fullWidth
          />
        </DialogContent>

        <DialogContent>
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
        </DialogContent>

        <DialogContent>
          <TextField
            inputRef={register}
            type="date"
            name="readAt"
            defaultValue={dateFormatter(new Date())}
            disabled={!isRead}
            fullWidth
          />
        </DialogContent>

        <DialogContent>
          <TextField
            inputRef={register}
            name="comment"
            placeholder="Comment"
            multiline
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          <Button disabled={loading} color="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button
            disabled={loading}
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit
          </Button>
        </DialogActions>
        {loading && <LinearProgress />}
      </form>
    </Dialog>
  );
}
