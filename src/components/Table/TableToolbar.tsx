import Toolbar from "@mui/material/Toolbar";
import React, { useEffect, useState } from "react";
import { useSelectData } from "../../hooks/data";
import ToolbarFilter from "../Toolbar/ToolbarFilter";
import ToolbarNormal from "../Toolbar/ToolbarNormal";
import ToolbarSelect from "../Toolbar/ToolbarSelect";

export default function ReadListTableToolbar() {
  const { selected } = useSelectData();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (selected.length > 0) {
      setIsFilterOpen(false);
    }
  }, [selected]);

  const renderToolbarMenu = () => {
    if (selected.length > 0) {
      return <ToolbarSelect selected={selected} />;
    }

    return <ToolbarNormal openFilter={() => setIsFilterOpen(!isFilterOpen)} />;
  };

  return (
    <>
      <Toolbar
        sx={{
          pl: 2,
          pr: 1,
          ...(selected.length > 0 && {
            bgcolor: theme => theme.palette.secondary.dark,
            color: theme => theme.palette.text.primary
          })
        }}
      >
        {renderToolbarMenu()}
      </Toolbar>
      {isFilterOpen && <ToolbarFilter close={() => setIsFilterOpen(false)} />}
    </>
  );
}
