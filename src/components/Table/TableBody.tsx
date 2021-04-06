import Checkbox from "@material-ui/core/Checkbox";
import CircularProgress from "@material-ui/core/CircularProgress";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import React, { useState } from "react";
import { ReadList } from "../../types/generated-types";
import { dateFormatter } from "../../utils/helper";
import { Order, ReadListKey } from "../../utils/table";
import DeleteButton from "../Button/DeleteButton";
import EditButton from "../Button/EditButton";

interface Props {
  rows?: ReadList[];
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

  if (loading || rows === undefined) {
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

  const onEditButtonClick = () => {
    console.log("edit");
  };

  return (
    <TableBody>
      {rows.map(({ id, link, title, readAt, comment }) => {
        const selected = isSelected(id);
        return (
          <TableRow key={id} tabIndex={-1} selected={selected}>
            <TableCell padding="checkbox">
              <Checkbox
                checked={selected}
                onClick={() => onCheckboxClick(id)}
              />
            </TableCell>
            <TableCell width={showComment ? "460" : "550"}>
              <a href={link} target="_blank" rel="nofollow noreferrer">
                {title}
              </a>
            </TableCell>
            <TableCell width="90">{dateFormatter(readAt)}</TableCell>
            {showComment && (
              <TableCell align="left" width="90">
                {comment ?? "-"}
              </TableCell>
            )}
            <TableCell width="100">
              <EditButton onClick={onEditButtonClick} disabled={selected} />
              <DeleteButton ids={[id]} disabled={selected} />
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
}
