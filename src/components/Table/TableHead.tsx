import Checkbox from "@material-ui/core/Checkbox";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import React from "react";
import { useAuth } from "../../hooks/auth";
import {
  useGetReadList,
  useReadListSelect,
  useReadListVariable
} from "../../hooks/readlist";
import { Order, ReadListFields } from "../../types/generated-types";

export default function ReadListTableHead() {
  const { isLogin } = useAuth();
  const { allReadLists } = useGetReadList();
  const { selected, setSelected } = useReadListSelect();
  const { variables } = useReadListVariable();

  const rowCount = allReadLists?.length ?? 0;
  const numSelected = selected.length;
  const { fields, order } = variables.sort;
  const isAsc = order === Order.ASC;

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
        <TableCell width="550">
          <TableSortLabel
            active={fields === ReadListFields.title}
            direction={isAsc ? "asc" : "desc"}
          >
            Title
          </TableSortLabel>
        </TableCell>
        <TableCell width="90">
          <TableSortLabel
            active={fields === ReadListFields.readAt}
            direction={isAsc ? "asc" : "desc"}
          >
            Read At
          </TableSortLabel>
        </TableCell>
        {isLogin && (
          <TableCell align="center" width="100">
            Actions
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
}
