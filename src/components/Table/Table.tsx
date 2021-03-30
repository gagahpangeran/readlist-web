import { useLazyQuery } from "@apollo/client";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import React, { useEffect, useState } from "react";
import { GET_ALL_READ_LISTS } from "../../gql/query";
import {
  GetAllReadLists,
  GetAllReadListsVariables,
  Order as ReadListOrder,
  ReadListFields
} from "../../types/generated-types";
import { getSelected, Order, ReadListKey } from "../../utils/table";
import ReadListTableBody from "./TableBody";
import ReadListTableHead from "./TableHead";
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showComment, setShowComment] = useState(false);

  const [getAllReadLists, { data, loading }] = useLazyQuery<
    GetAllReadLists,
    GetAllReadListsVariables
  >(GET_ALL_READ_LISTS, { fetchPolicy: "network-only" });

  useEffect(() => {
    getAllReadLists({
      variables: {
        skip: page * rowsPerPage,
        limit: rowsPerPage,
        sort: { fields: ReadListFields.readAt, order: ReadListOrder.DESC },
        filter: { readAt: { isNull: false } }
      }
    });
  }, [getAllReadLists, page, rowsPerPage]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (data === undefined) {
    return <div>No Data!</div>;
  }

  const { allReadLists } = data;

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

  const handleClick = (id: string) => {
    const newSelected = getSelected(selected, id);
    setSelected(newSelected);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <ReadListTableToolbar
          selected={selected}
          refetch={() => console.log("refetch")}
          showComment={showComment}
          changeShowComment={() => setShowComment(!showComment)}
        />
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
              showComment={showComment}
            />
            <ReadListTableBody
              rows={allReadLists}
              order={order}
              orderBy={orderBy}
              loading={false}
              onCheckboxClick={handleClick}
              isSelected={isSelected}
              showComment={showComment}
            />
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={Array.from({ length: 10 }).map(
            (_, i) => (i + 1) * 5
          )}
          component="div"
          count={-1}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={(_, page) => setPage(page)}
          onChangeRowsPerPage={e => {
            setRowsPerPage(Number(e.target.value));
            setPage(0);
          }}
        />
      </Paper>
    </div>
  );
}
