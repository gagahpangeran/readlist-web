import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import { useDialog } from "../../hooks/dialog";

export default function DeleteDialog() {
  const { openedDialog, closeDialog } = useDialog();

  return (
    <Dialog open={openedDialog === "delete"} onClose={closeDialog}>
      <DialogTitle>Delete List</DialogTitle>
      <DialogContent>Are you sure want to delete this list</DialogContent>
      <DialogActions>
        <Button color="primary" onClick={closeDialog}>
          Cancel
        </Button>
        <Button variant="contained" type="submit" color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
