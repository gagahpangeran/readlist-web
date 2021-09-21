import AddIcon from "@mui/icons-material/Add";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import FilterListIcon from "@mui/icons-material/FilterList";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React from "react";
import { useAuth } from "../../hooks/auth";
import { useDialog } from "../../hooks/dialog";

interface Props {
  openFilter: () => void;
}

export default function ToolbarNormal(props: Props) {
  const { openFilter } = props;
  const { isLogin } = useAuth();
  const { openDialog } = useDialog();

  return (
    <>
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        List
      </Typography>

      {isLogin ? (
        <>
          <Tooltip title="Logout">
            <IconButton
              onClick={() => openDialog("logout")}
              aria-label="logout"
              size="medium"
            >
              <ExitToAppIcon color="secondary" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add New Read List">
            <IconButton
              onClick={() => openDialog("add")}
              aria-label="add new read list"
              size="medium"
            >
              <AddIcon color="primary" />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Tooltip title="Login">
          <IconButton
            onClick={() => openDialog("login")}
            aria-label="login"
            size="medium"
          >
            <PersonAddIcon color="primary" />
          </IconButton>
        </Tooltip>
      )}
      <Tooltip title="Filter list">
        <IconButton onClick={openFilter} aria-label="filter list" size="medium">
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </>
  );
}
