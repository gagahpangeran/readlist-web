import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import LinearProgress from "@material-ui/core/LinearProgress";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../gql/auth";
import { LoginVariables } from "../../types/generated-types";

interface Props {
  open: boolean;
  handleClose: () => void;
}

export default function LoginForm({ open, handleClose }: Props) {
  const { register, handleSubmit } = useForm<LoginVariables>();
  const { login, loading } = useAuth();

  const onSubmit = async (inputData: LoginVariables) => {
    await login({ variables: { ...inputData } });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
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
          <Button disabled={loading} onClick={handleClose} color="secondary">
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
