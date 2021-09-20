import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import React from "react";
import ReadListTableBody from "./TableBody";
import ReadListTableHead from "./TableHead";
import ReadListTablePagination from "./TablePagination";
import ReadListTableToolbar from "./TableToolbar";

const PREFIX = "ReadListTable";

const classes = {
  root: `${PREFIX}-root`,
  paper: `${PREFIX}-paper`,
  table: `${PREFIX}-content`
};

const Root = styled("div")(({ theme }) => ({
  [`&.${classes.root}`]: {
    width: "100%"
  },
  [`& .${classes.paper}`]: {
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  [`& .${classes.table}`]: {
    minWidth: 750
  }
}));

export default function ReadListTable() {
  return (
    <Root className={classes.root}>
      <Paper className={classes.paper}>
        <ReadListTableToolbar />
        <TableContainer>
          <Table
            className={classes.table}
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
    </Root>
  );
}
