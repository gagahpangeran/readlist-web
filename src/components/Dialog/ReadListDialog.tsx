import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import React from "react";
import useDialog from "../../gql/dialog";

export default function ReadListDialog() {
  const { openedDialog, closeDialog } = useDialog();

  return (
    <Dialog open={openedDialog === "readlist"} onClose={closeDialog}>
      <DialogTitle>Add New Read List</DialogTitle>
      <DialogContent>
        <TextField name="link" margin="dense" label="Link" type="text" />
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
