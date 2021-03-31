import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import React from "react";

interface Props {
  open: boolean;
  handleClose: () => void;
}

export default function LoginForm({ open, handleClose }: Props) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Username"
          type="text"
          fullWidth
        />
      </DialogContent>
      <DialogContent>
        <TextField margin="dense" label="Password" type="password" fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button variant="contained" type="submit" color="primary">
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
}
