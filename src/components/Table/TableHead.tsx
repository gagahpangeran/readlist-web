import Checkbox from "@mui/material/Checkbox";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import React from "react";
import { useAuth } from "../../hooks/auth";
import { useSelectData } from "../../hooks/data";
import { useGetReadList, useReadListVariable } from "../../hooks/readlist";
import { Order, ReadListFields } from "../../types/generated-types";

export default function ReadListTableHead() {
  const { isLogin } = useAuth();
  const { allReadLists } = useGetReadList();
  const { selected, setSelected } = useSelectData();
  const { variables, changeVariables } = useReadListVariable();

  const rowCount = allReadLists.length ?? 0;
  const numSelected = selected.length;
  const { fields, order } = variables.sort;
  const isAsc = order === Order.ASC;

  const handleSelectAllClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const newSelecteds = allReadLists.map(({ id }) => id) ?? [];
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleSort = (newFields: ReadListFields) => {
    setSelected([]);

    if (newFields === fields) {
      changeVariables({
        ...variables,
        sort: {
          fields,
          order: isAsc ? Order.DESC : Order.ASC
        }
      });
    } else {
      changeVariables({
        ...variables,
        sort: {
          fields: newFields,
          order: Order.DESC
        }
      });
    }
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
        <TableCell width="545">
          <TableSortLabel
            active={fields === ReadListFields.title}
            direction={isAsc ? "asc" : "desc"}
            onClick={() => handleSort(ReadListFields.title)}
          >
            Title
          </TableSortLabel>
        </TableCell>
        <TableCell width="95">
          <TableSortLabel
            active={fields === ReadListFields.readAt}
            direction={isAsc ? "asc" : "desc"}
            onClick={() => handleSort(ReadListFields.readAt)}
          >
            Read At
          </TableSortLabel>
        </TableCell>
        {isLogin && (
          <TableCell align="center" width="120">
            Actions
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
}
