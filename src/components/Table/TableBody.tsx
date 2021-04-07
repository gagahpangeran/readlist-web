import Checkbox from "@material-ui/core/Checkbox";
import LinearProgress from "@material-ui/core/LinearProgress";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import useAuth from "../../gql/auth";
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
}

export default function ReadListTableBody(props: Props) {
  const { rows, order, orderBy, loading, onCheckboxClick, isSelected } = props;

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
      {rows?.map(({ id, link, title, readAt, comment }) => {
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
            <TableCell width="100" align="center">
              {isLogin && (
                <>
                  <EditButton onClick={onEditButtonClick} disabled={selected} />
                  <DeleteButton ids={[id]} disabled={selected} />
                </>
              )}
              {comment !== null && <div>Show Comment</div>}
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
}
