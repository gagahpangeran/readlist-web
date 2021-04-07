import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";

export default function LogoutDialog() {
  return (
    <Dialog open={true}>
      <DialogTitle>Logout</DialogTitle>
      <DialogContent>Are you sure want to logout?</DialogContent>
      <DialogActions>
        <Button>Cancel</Button>
        <Button variant="contained" color="secondary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
