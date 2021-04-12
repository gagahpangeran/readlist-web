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
  const { addReadList, loading: addLoading } = useAddReadList();
  const { editReadList, loading: editLoading } = useEditReadList();
  const { editData, setEditData } = useReadListEditData();

  const isOpen = openedDialog === "add" || openedDialog === "edit";
  const isEdit = openedDialog === "edit";
  const loading = addLoading || editLoading;

  const defaultValue: InputForm = {
    link: editData?.data.link ?? "",
    title: editData?.data.title ?? "",
    isRead: !!editData?.data.readAt || !isEdit,
    readAt: editData?.data.readAt
      ? dateFormatter(editData.data.readAt)
      : dateFormatter(new Date()),
    comment: editData?.data.comment ?? ""
  };

  const { register, handleSubmit, watch, reset } = useForm<InputForm>();

  const onSubmit = async ({ isRead, readAt, comment, ...rest }: InputForm) => {
    const data = {
      ...rest,
      readAt: isRead ? new Date(readAt).toISOString() : null,
      comment: comment.trim().length > 0 ? comment.trim() : null
    };

    if (isEdit && editData?.id !== undefined) {
      await editReadList({ variables: { id: editData.id, data } });
    } else {
      await addReadList({ variables: { data } });
    }

    setEditData(null);
    closeDialog();
  };

  const isRead = watch("isRead") ?? defaultValue.isRead;

  return (
    <Dialog open={isOpen} onClose={closeDialog} fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{`${isEdit ? "Edit" : "Add New"} Read List`}</DialogTitle>
        <DialogContent>
          <TextField
            inputRef={register}
            required
            name="link"
            label="Link"
            type="url"
            defaultValue={defaultValue.link}
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
            defaultValue={defaultValue.title}
            fullWidth
          />
        </DialogContent>

        <DialogContent>
          <FormControlLabel
            control={
              <Checkbox
                inputRef={register}
                defaultChecked={defaultValue.isRead}
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
            defaultValue={defaultValue.readAt}
            disabled={!isRead}
            fullWidth
          />
        </DialogContent>

        <DialogContent>
          <TextField
            inputRef={register}
            name="comment"
            placeholder="Comment"
            defaultValue={defaultValue.comment}
            multiline
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          <Button disabled={loading} onClick={() => reset()}>
            Reset
          </Button>
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
