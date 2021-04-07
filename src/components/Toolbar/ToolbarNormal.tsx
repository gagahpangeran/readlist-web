import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import RefreshIcon from "@material-ui/icons/Refresh";
import React from "react";
import useAuth from "../../gql/auth";

interface Props {
  className: string;
  refetch: () => void;
  openForm: () => void;
  openLoginForm: () => void;
}

export default function ToolbarNormal(props: Props) {
  const { className, refetch, openForm, openLoginForm } = props;
  const { isLogin, logout } = useAuth();

  return (
    <>
      <Typography
        className={className}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        List
      </Typography>

      {isLogin ? (
        <Tooltip title="Logout">
          <IconButton onClick={logout} aria-label="logout">
            <ExitToAppIcon color="secondary" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Login">
          <IconButton onClick={openLoginForm} aria-label="login">
            <PersonAddIcon color="primary" />
          </IconButton>
        </Tooltip>
      )}
      <Tooltip title="Add New Read List">
        <IconButton onClick={openForm} aria-label="add new read list">
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Refresh Data">
        <IconButton onClick={refetch} aria-label="refresh data">
          <RefreshIcon />
        </IconButton>
      </Tooltip>
    </>
  );
}
