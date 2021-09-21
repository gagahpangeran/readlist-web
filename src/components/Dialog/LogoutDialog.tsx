import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";
import { useAuth } from "../../hooks/auth";
import { useDialog } from "../../hooks/dialog";

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
