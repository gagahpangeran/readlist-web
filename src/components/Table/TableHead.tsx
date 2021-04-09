import Checkbox from "@material-ui/core/Checkbox";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import { useAuth } from "../../hooks/auth";
import { useGetReadList, useReadListSelect } from "../../hooks/readlist";

export default function ReadListTableHead() {
  const { isLogin } = useAuth();
  const { allReadLists } = useGetReadList();
  const { selected, setSelected } = useReadListSelect();

  const rowCount = allReadLists?.length ?? 0;
  const numSelected = selected.length;

  const handleSelectAllClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const newSelecteds = allReadLists?.map(({ id }) => id) ?? [];
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={handleSelectAllClick}
          />
        </TableCell>
        <TableCell width="550">Title</TableCell>
        <TableCell width="90">Read At</TableCell>
        {isLogin && (
          <TableCell align="center" width="100">
            Actions
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
}
