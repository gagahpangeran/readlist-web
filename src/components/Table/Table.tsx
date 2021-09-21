import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import React from "react";
import ReadListTableBody from "./TableBody";
import ReadListTableHead from "./TableHead";
import ReadListTablePagination from "./TablePagination";
import ReadListTableToolbar from "./TableToolbar";

export default function ReadListTable() {
  return (
    <Paper
      sx={{
        width: "100%",
        marginBottom: 2
      }}
    >
      <ReadListTableToolbar />
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size="medium"
          aria-label="enhanced table"
        >
          <ReadListTableHead />
          <ReadListTableBody />
        </Table>
      </TableContainer>
      <ReadListTablePagination />
    </Paper>
  );
}
