import Checkbox from "@material-ui/core/Checkbox";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import { useAuth } from "../../hooks/auth";
import { Order, ReadListKey } from "../../utils/table";

interface Props {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: ReadListKey
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export default function ReadListTableHead(props: Props) {
  const { onSelectAllClick, numSelected, rowCount } = props;
  const { isLogin } = useAuth();

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
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
