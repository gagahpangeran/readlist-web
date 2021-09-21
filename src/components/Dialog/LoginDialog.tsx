import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import LinearProgress from "@mui/material/LinearProgress";
import TextField from "@mui/material/TextField";
import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/auth";
import { useDialog } from "../../hooks/dialog";
import { LoginVariables } from "../../types/generated-types";

export default function LoginDialog() {
  const { register, handleSubmit } = useForm<LoginVariables>();
  const { login, loading } = useAuth();
  const { openedDialog, closeDialog } = useDialog();

  const onSubmit = async (inputData: LoginVariables) => {
    await login({ variables: { ...inputData } });
    closeDialog();
  };

  return (
    <Dialog open={openedDialog === "login"} onClose={closeDialog}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            inputRef={register}
            name="username"
            autoFocus
            margin="dense"
            label="Username"
            type="text"
            fullWidth
          />

          <TextField
            inputRef={register}
            name="password"
            margin="dense"
            label="Password"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={closeDialog} color="secondary">
            Cancel
          </Button>
          <Button
            disabled={loading}
            variant="contained"
            type="submit"
            color="primary"
          >
            Login
          </Button>
        </DialogActions>
        {loading && <LinearProgress />}
      </form>
    </Dialog>
  );
}
