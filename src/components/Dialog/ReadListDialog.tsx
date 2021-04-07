import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { useForm } from "react-hook-form";
import useDialog from "../../gql/dialog";
import { ReadListInput } from "../../types/generated-types";
import { dateFormatter } from "../../utils/helper";

interface InputForm extends ReadListInput {
  isRead: boolean;
}

export default function ReadListDialog() {
  const { openedDialog, closeDialog } = useDialog();
  const { register, handleSubmit, watch } = useForm<InputForm>();

  const onSubmit = (inputData: InputForm) => {
    console.log(inputData);
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
          <Button color="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
