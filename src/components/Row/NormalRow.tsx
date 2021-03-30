import Checkbox from "@material-ui/core/Checkbox";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import { ReadList } from "../../types/generated-types";
import { dateFormatter } from "../../utils/helper";
import DeleteButton from "../Button/DeleteButton";
import EditButton from "../Button/EditButton";

interface Props {
  readList: ReadList;
  isRowSelected: boolean;
  onCheckboxClick: () => void;
  onEditButtonClick: () => void;
  showComment: boolean;
}

export default function NormalRow({
  readList,
  isRowSelected,
  onCheckboxClick,
  onEditButtonClick,
  showComment
}: Props) {
  const { id, title, link, readAt, comment } = readList;

  return (
    <TableRow tabIndex={-1} selected={isRowSelected}>
      <TableCell padding="checkbox">
        <Checkbox checked={isRowSelected} onClick={onCheckboxClick} />
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
        <EditButton onClick={onEditButtonClick} disabled={isRowSelected} />
        <DeleteButton ids={[id]} disabled={isRowSelected} />
      </TableCell>
    </TableRow>
  );
}
