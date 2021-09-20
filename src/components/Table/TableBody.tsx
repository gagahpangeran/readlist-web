import Checkbox from "@mui/material/Checkbox";
import LinearProgress from "@mui/material/LinearProgress";
import Link from "@mui/material/Link";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React, { useEffect } from "react";
import { useAuth } from "../../hooks/auth";
import { useSelectData } from "../../hooks/data";
import { useGetReadList, useReadListVariable } from "../../hooks/readlist";
import { dateFormatter, getSelected } from "../../utils/helper";
import DeleteButton from "../Button/DeleteButton";
import EditButton from "../Button/EditButton";

export default function ReadListTableBody() {
  const { isLogin } = useAuth();
  const { getAllReadLists, allReadLists, loading, refetch } = useGetReadList();
  const { variables } = useReadListVariable();
  const { selected, setSelected } = useSelectData();

  useEffect(() => {
    getAllReadLists();
  }, [getAllReadLists]);

  useEffect(() => {
    if (refetch !== undefined) {
      refetch(variables);
    }
  }, [variables, refetch]);

  const handleCheckBoxClick = (id: string) => {
    const newSelected = getSelected(selected, id);
    setSelected(newSelected);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  return (
    <TableBody>
      <TableRow>
        <TableCell colSpan={4} padding="none">
          {loading && <LinearProgress />}
        </TableCell>
      </TableRow>

      {!loading && allReadLists.length === 0 && (
        <TableRow>
          <TableCell colSpan={4} align="center">
            There is no data
          </TableCell>
        </TableRow>
      )}

      {allReadLists.map(readList => {
        const { id, link, title, readAt } = readList;
        const selected = isSelected(id);

        return (
          <TableRow key={id} tabIndex={-1} selected={selected}>
            <TableCell padding="checkbox">
              <Checkbox
                checked={selected}
                onClick={() => handleCheckBoxClick(id)}
              />
            </TableCell>
            <TableCell width="545">
              <Link
                color="primary"
                variant="body1"
                href={link}
                target="_blank"
                rel="nofollow noreferrer"
              >
                {title}
              </Link>
            </TableCell>
            <TableCell width="90">{dateFormatter(readAt)}</TableCell>
            {isLogin && (
              <TableCell width="120" align="center">
                <EditButton editData={readList} disabled={selected} />
                <DeleteButton deletedId={id} disabled={selected} />
              </TableCell>
            )}
          </TableRow>
        );
      })}
    </TableBody>
  );
}
