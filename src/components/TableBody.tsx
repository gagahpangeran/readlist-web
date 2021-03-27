import Checkbox from "@material-ui/core/Checkbox";
import CircularProgress from "@material-ui/core/CircularProgress";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import { ReadList } from "../types/generated-types";
import { dateFormatter } from "../utils/helper";
import { getComparator, Order, ReadListKey, stableSort } from "../utils/table";

interface Props {
  rows: ReadList[] | null;
  order: Order;
  orderBy: ReadListKey;
  loading: boolean;
  onRowClick: (event: React.MouseEvent<unknown>, id: string) => void;
  isSelected: (id: string) => boolean;
}

export default function ReadListTableBody(props: Props) {
  const { rows, order, orderBy, loading, onRowClick, isSelected } = props;

  if (rows === null || loading) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={4} align="center">
            {loading ? <CircularProgress /> : "No Data"}
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {stableSort(rows ?? [], getComparator(order, orderBy)).map(
        (row, index) => {
          const isItemSelected = isSelected(row.id);
          const labelId = `enhanced-table-checkbox-${index}`;

          return (
            <TableRow
              hover
              onClick={event => onRowClick(event, row.id)}
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={row.id}
              selected={isItemSelected}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  checked={isItemSelected}
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </TableCell>
              <TableCell component="th" id={labelId} scope="row">
                <a href={row.link} target="_blank" rel="nofollow noreferrer">
                  {row.title}
                </a>
              </TableCell>
              <TableCell align="left">{dateFormatter(row.readAt)}</TableCell>
              <TableCell align="left">{row.comment ?? "-"}</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          );
        }
      )}
    </TableBody>
  );
}
