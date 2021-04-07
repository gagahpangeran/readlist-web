import { useQuery } from "@apollo/client";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import React, { useEffect, useState } from "react";
import { GET_ALL_READ_LISTS } from "../../gql/readlist";
import {
  GetAllReadLists,
  GetAllReadListsVariables,
  Order as ReadListOrder,
  ReadList,
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
  const [delayed, setDelayed] = useState(false);
  const [allReadLists, setAllReadLists] = useState<ReadList[] | undefined>();

  const { data, loading, refetch } = useQuery<
    GetAllReadLists,
    GetAllReadListsVariables
  >(GET_ALL_READ_LISTS, {
    fetchPolicy: "cache-and-network",
    variables: {
      skip: page * rowsPerPage,
      limit: rowsPerPage,
      sort: { fields: ReadListFields.readAt, order: ReadListOrder.DESC },
      filter: { readAt: { isNull: false } }
    }
  });

  useEffect(() => {
    setDelayed(true);
    const timeout = setTimeout(() => {
      setDelayed(false);
      setAllReadLists(data?.allReadLists);
    }, 500);
    return () => clearTimeout(timeout);
  }, [data]);

  useEffect(() => {
    refetch({
      skip: page * rowsPerPage,
      limit: rowsPerPage
    });
  }, [refetch, page, rowsPerPage]);

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
            />
            <ReadListTableBody
              rows={allReadLists}
              order={order}
              orderBy={orderBy}
              loading={loading || delayed}
              onCheckboxClick={handleClick}
              isSelected={isSelected}
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
