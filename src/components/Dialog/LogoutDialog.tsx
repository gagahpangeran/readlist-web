import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import useAuth from "../../hooks/auth";
import useDialog from "../../hooks/dialog";

export default function LogoutDialog() {
  const { logout } = useAuth();
  const { openedDialog, closeDialog } = useDialog();

  const handleConfirm = () => {
    logout();
    closeDialog();
  };

  return (
    <Dialog open={openedDialog === "logout"} onClose={closeDialog}>
      <DialogTitle>Logout</DialogTitle>
      <DialogContent>Are you sure want to logout?</DialogContent>
      <DialogActions>
        <Button color="primary" onClick={closeDialog}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleConfirm()}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
