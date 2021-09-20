import Paper from "@mui/material/Paper";
import { createStyles, makeStyles, Theme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import React from "react";
import ReadListTableBody from "./TableBody";
import ReadListTableHead from "./TableHead";
import ReadListTablePagination from "./TablePagination";
import ReadListTableToolbar from "./TableToolbar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%"
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2)
    },
    table: {
      minWidth: 750
    }
  })
);

export default function ReadListTable() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
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
    </div>
  );
}
