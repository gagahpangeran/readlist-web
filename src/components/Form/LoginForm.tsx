import { useMutation } from "@apollo/client";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { LOGIN } from "../../gql/mutation";
import { Login, LoginVariables } from "../../types/generated-types";
import { saveToken } from "../../utils/helper";

interface Props {
  open: boolean;
  handleClose: () => void;
}

export default function LoginForm({ open, handleClose }: Props) {
  const { register, handleSubmit } = useForm<LoginVariables>();
  const [login, { data, loading, error }] = useMutation<Login, LoginVariables>(
    LOGIN,
    { errorPolicy: "all" }
  );

  const onSubmit = async (inputData: LoginVariables) => {
    await login({ variables: { ...inputData } });
  };

  useEffect(() => {
    if (!loading) {
      if (data !== undefined && data !== null) {
        saveToken(data.login.token);
      }

      if (error !== undefined) {
        console.log(error.message);
      }
    }
  }, [data, loading, error]);

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
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button variant="contained" type="submit" color="primary">
            Login
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
