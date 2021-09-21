import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import LinearProgress from "@mui/material/LinearProgress";
import TextField from "@mui/material/TextField";
import React from "react";
import { useForm } from "react-hook-form";
import { useEditData } from "../../hooks/data";
import { useDialog } from "../../hooks/dialog";
import { useAddReadList, useEditReadList } from "../../hooks/readlist";

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
  const { editData, clearEditData } = useEditData();

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
            margin="dense"
            fullWidth
          />

          <TextField
            inputRef={register}
            required
            name="title"
            label="Title"
            defaultValue={defaultValues.title}
            margin="dense"
            fullWidth
          />

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

          <TextField
            inputRef={register}
            type="date"
            name="readAt"
            defaultValue={defaultValues.readAt}
            disabled={!isRead}
            margin="dense"
            fullWidth
          />

          <TextField
            inputRef={register}
            name="comment"
            placeholder="Comment"
            defaultValue={defaultValues.comment}
            multiline
            margin="dense"
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          <Button disabled={loading} onClick={() => reset()} color="inherit">
            Reset
          </Button>
          <Button
            disabled={loading}
            color="secondary"
            onClick={handleClose}
            variant="outlined"
          >
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
