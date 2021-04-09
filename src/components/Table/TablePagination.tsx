import TablePagination from "@material-ui/core/TablePagination";
import React, { useState } from "react";

export default function ReadListTablePagination() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (page: number) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = (rowsPerPage: number) => {
    setRowsPerPage(rowsPerPage);
    setPage(0);
  };

  return (
    <TablePagination
      rowsPerPageOptions={Array.from({ length: 10 }).map((_, i) => (i + 1) * 5)}
      component="div"
      count={-1}
      rowsPerPage={rowsPerPage}
      page={page}
      onChangePage={(_, page) => handleChangePage(page)}
      onChangeRowsPerPage={e => handleChangeRowsPerPage(Number(e.target.value))}
    />
  );
}
