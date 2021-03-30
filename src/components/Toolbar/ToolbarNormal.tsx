import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import FilterListIcon from "@material-ui/icons/FilterList";
import RefreshIcon from "@material-ui/icons/Refresh";
import React from "react";

interface Props {
  className: string;
  refetch: () => void;
  openForm: () => void;
  changeShowFilter: () => void;
}

export default function ToolbarNormal(props: Props) {
  const { className, refetch, openForm, changeShowFilter } = props;

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
      <Tooltip title="Filter list">
        <IconButton onClick={changeShowFilter} aria-label="filter list">
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </>
  );
}
