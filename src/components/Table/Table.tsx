import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import React, { useState } from "react";
import { useGetReadList } from "../../hooks/readlist";
import { Order, ReadListKey } from "../../utils/table";
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
  const [order, setOrder] = useState<Order>("desc");
  const [orderBy, setOrderBy] = useState<ReadListKey>("readAt");
  const [selected, setSelected] = useState<string[]>([]);

  const { allReadLists } = useGetReadList();

  const handleRequestSort = (
    _: React.MouseEvent<unknown>,
    property: ReadListKey
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = allReadLists?.map(n => n.id) ?? [];
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

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
            <ReadListTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={allReadLists?.length ?? 0}
            />
            <ReadListTableBody />
          </Table>
        </TableContainer>
        <ReadListTablePagination />
      </Paper>
    </div>
  );
}
