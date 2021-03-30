import CircularProgress from "@material-ui/core/CircularProgress";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import React, { useState } from "react";
import { ReadList } from "../../types/generated-types";
import {
  getComparator,
  Order,
  ReadListKey,
  stableSort
} from "../../utils/table";
import EditRow from "../Row/EditRow";
import NormalRow from "../Row/NormalRow";

interface Props {
  rows: ReadList[];
  order: Order;
  orderBy: ReadListKey;
  loading: boolean;
  onCheckboxClick: (id: string) => void;
  isSelected: (id: string) => boolean;
  showComment: boolean;
}

export default function ReadListTableBody(props: Props) {
  const [editedRow, setEditedRow] = useState("");
  const {
    rows,
    order,
    orderBy,
    loading,
    onCheckboxClick,
    isSelected,
    showComment
  } = props;

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

  const onEditButtonClick = (id: string) => {
    setEditedRow(id);
  };

  return (
    <TableBody>
      {stableSort(rows ?? [], getComparator(order, orderBy)).map(row =>
        row.id === editedRow ? (
          <EditRow
            key={row.id}
            readList={row}
            onCancelButtonClick={() => onEditButtonClick("")}
            showComment={showComment}
          />
        ) : (
          <NormalRow
            key={row.id}
            readList={row}
            isRowSelected={isSelected(row.id)}
            onCheckboxClick={() => onCheckboxClick(row.id)}
            onEditButtonClick={() => onEditButtonClick(row.id)}
            showComment={showComment}
          />
        )
      )}
    </TableBody>
  );
}
