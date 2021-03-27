import CircularProgress from "@material-ui/core/CircularProgress";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import { ReadList } from "../../types/generated-types";
import {
  getComparator,
  Order,
  ReadListKey,
  stableSort
} from "../../utils/table";
import NormalRow from "../Row/NormalRow";

interface Props {
  rows: ReadList[];
  order: Order;
  orderBy: ReadListKey;
  loading: boolean;
  onCheckboxClick: (id: string) => void;
  isSelected: (id: string) => boolean;
}

export default function ReadListTableBody(props: Props) {
  const { rows, order, orderBy, loading, onCheckboxClick, isSelected } = props;

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
      {stableSort(rows ?? [], getComparator(order, orderBy)).map(row => {
        return (
          <NormalRow
            key={row.id}
            readList={row}
            isRowSelected={isSelected(row.id)}
            onCheckboxClick={onCheckboxClick}
          />
        );
      })}
    </TableBody>
  );
}
