import Checkbox from "@material-ui/core/Checkbox";
import LinearProgress from "@material-ui/core/LinearProgress";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import useAuth from "../../hooks/auth";
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
  error: boolean;
  onCheckboxClick: (id: string) => void;
  isSelected: (id: string) => boolean;
}

export default function ReadListTableBody(props: Props) {
  const {
    rows,
    order,
    orderBy,
    loading,
    error,
    onCheckboxClick,
    isSelected
  } = props;

  const { isLogin } = useAuth();

  const onEditButtonClick = () => {
    console.log("edit");
  };

  return (
    <TableBody>
      <TableRow>
        <TableCell colSpan={4} padding="none">
          {loading && <LinearProgress />}
        </TableCell>
      </TableRow>

      {!loading && error && (
        <TableRow>
          <TableCell colSpan={4} align="center">
            Error, there is something wrong!
          </TableCell>
        </TableRow>
      )}

      {!loading && rows?.length === 0 && (
        <TableRow>
          <TableCell colSpan={4} align="center">
            There is no data
          </TableCell>
        </TableRow>
      )}

      {rows?.map(({ id, link, title, readAt }) => {
        const selected = isSelected(id);
        return (
          <TableRow key={id} tabIndex={-1} selected={selected}>
            <TableCell padding="checkbox">
              <Checkbox
                checked={selected}
                onClick={() => onCheckboxClick(id)}
              />
            </TableCell>
            <TableCell width="550">
              <a href={link} target="_blank" rel="nofollow noreferrer">
                {title}
              </a>
            </TableCell>
            <TableCell width="90">{dateFormatter(readAt)}</TableCell>
            {isLogin && (
              <TableCell width="100" align="center">
                <EditButton onClick={onEditButtonClick} disabled={selected} />
                <DeleteButton ids={[id]} disabled={selected} />
              </TableCell>
            )}
          </TableRow>
        );
      })}
    </TableBody>
  );
}
