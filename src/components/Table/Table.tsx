import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import React, { useState } from "react";
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
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <ReadListTableToolbar selected={selected} />
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
