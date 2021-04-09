import TablePagination from "@material-ui/core/TablePagination";
import React, { useState } from "react";
import {
  useGetReadList,
  useReadListSelect,
  useReadListVariable
} from "../../hooks/readlist";

export default function ReadListTablePagination() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { allReadLists } = useGetReadList();
  const { changeVariables } = useReadListVariable();
  const { setSelected } = useReadListSelect();

  const handleChangePage = (page: number) => {
    setPage(page);
    changeVariables({
      skip: page * rowsPerPage
    });
    setSelected([]);
  };

  const handleChangeRowsPerPage = (rowsPerPage: number) => {
    setRowsPerPage(rowsPerPage);
    setPage(0);
    changeVariables({
      skip: 0,
      limit: rowsPerPage
    });
    setSelected([]);
  };

  return (
    <TablePagination
      rowsPerPageOptions={Array.from({ length: 10 }).map((_, i) => (i + 1) * 5)}
      component="div"
      count={-1}
      rowsPerPage={rowsPerPage}
      page={page}
      nextIconButtonProps={{
        disabled: (allReadLists?.length ?? 0) < rowsPerPage
      }}
      onChangePage={(_, page) => handleChangePage(page)}
      onChangeRowsPerPage={e => handleChangeRowsPerPage(Number(e.target.value))}
    />
  );
}
