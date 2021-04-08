import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import LinearProgress from "@material-ui/core/LinearProgress";
import TextField from "@material-ui/core/TextField";
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
        </DialogContent>
        <DialogContent>
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
