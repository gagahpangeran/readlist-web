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
import { useDialog } from "../../hooks/dialog";
import {
  useAddReadList,
  useEditReadList,
  useReadListEditData
} from "../../hooks/readlist";

export interface ReadListInputForm {
  link: string;
  title: string;
  isRead: boolean;
  readAt: string;
  comment: string;
}

export default function ReadListDialog() {
  const { openedDialog, closeDialog } = useDialog();
  const { addReadList, loading: addLoading } = useAddReadList();
  const { editReadList, loading: editLoading } = useEditReadList();
  const { editData, clearEditData } = useReadListEditData();

  const isOpen = openedDialog === "add" || openedDialog === "edit";
  const isEdit = openedDialog === "edit";
  const loading = addLoading || editLoading;

  const { id, ...defaultValues } = editData;

  const { register, handleSubmit, watch, reset } = useForm<ReadListInputForm>();

  const onSubmit = async ({
    link,
    title,
    isRead,
    readAt,
    comment
  }: ReadListInputForm) => {
    const data = {
      link: link.trim(),
      title: title.trim(),
      readAt: isRead ? new Date(readAt).toISOString() : null,
      comment: comment.trim().length > 0 ? comment.trim() : null
    };

    let result;
    if (isEdit && id !== undefined) {
      result = await editReadList({ variables: { id, data } });
    } else {
      result = await addReadList({ variables: { data } });
    }

    if (result !== undefined) {
      handleClose();
    }
  };

  const handleClose = () => {
    clearEditData();
    closeDialog();
  };

  const isRead = watch("isRead") ?? defaultValues.isRead;

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{`${isEdit ? "Edit" : "Add New"} Read List`}</DialogTitle>
        <DialogContent>
          <TextField
            inputRef={register}
            required
            name="link"
            label="Link"
            type="url"
            defaultValue={defaultValues.link}
            autoFocus={!isEdit}
            fullWidth
          />
        </DialogContent>

        <DialogContent>
          <TextField
            inputRef={register}
            required
            name="title"
            label="Title"
            defaultValue={defaultValues.title}
            fullWidth
          />
        </DialogContent>

        <DialogContent>
          <FormControlLabel
            control={
              <Checkbox
                inputRef={register}
                defaultChecked={defaultValues.isRead}
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
            defaultValue={defaultValues.readAt}
            disabled={!isRead}
            fullWidth
          />
        </DialogContent>

        <DialogContent>
          <TextField
            inputRef={register}
            name="comment"
            placeholder="Comment"
            defaultValue={defaultValues.comment}
            multiline
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          <Button disabled={loading} onClick={() => reset()}>
            Reset
          </Button>
          <Button disabled={loading} color="secondary" onClick={handleClose}>
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
