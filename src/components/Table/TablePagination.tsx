import TablePagination from "@mui/material/TablePagination";
import React, { useState } from "react";
import { useSelectData } from "../../hooks/data";
import { useGetReadList, useReadListVariable } from "../../hooks/readlist";

export default function ReadListTablePagination() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { allReadLists } = useGetReadList();
  const { changeVariables } = useReadListVariable();
  const { setSelected } = useSelectData();

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
        disabled: allReadLists.length < rowsPerPage
      }}
      onRowsPerPageChange={e => handleChangeRowsPerPage(Number(e.target.value))}
      onPageChange={(_, page) => handleChangePage(page)}
    />
  );
}
