import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import React from "react";
import useDialog from "../../gql/dialog";

export default function ReadListDialog() {
  const { openedDialog, closeDialog } = useDialog();

  return (
    <Dialog open={openedDialog === "readlist"} onClose={closeDialog} fullWidth>
      <DialogTitle>Add New Read List</DialogTitle>
      <DialogContent>
        <TextField required name="link" label="Link" fullWidth />
      </DialogContent>

      <DialogContent>
        <TextField required name="title" label="Title" fullWidth />
      </DialogContent>

      <DialogContent>
        <FormControlLabel
          control={<Checkbox defaultChecked name="isRead" color="primary" />}
          label="Already Read?"
        />
      </DialogContent>

      <DialogContent>
        <TextField type="date" name="readAt" fullWidth />
      </DialogContent>

      <DialogContent>
        <TextField name="comment" placeholder="Comment" multiline fullWidth />
      </DialogContent>

      <DialogActions>
        <Button color="secondary" onClick={closeDialog}>
          Cancel
        </Button>
        <Button variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
