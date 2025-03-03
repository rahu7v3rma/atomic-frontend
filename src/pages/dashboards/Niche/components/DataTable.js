import {
  Grid,
  Paper as MuiPaper,
  styled as MuiStyled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { spacing } from "@mui/system";
import React from "react";
import styled from "styled-components/macro";

const Paper = styled(MuiPaper)(spacing);

function descendingComparator(a, b, orderBy) {
  let bNumber = b[orderBy];
  let aNumber = a[orderBy];

  if (typeof b[orderBy] === "string" && typeof a[orderBy] === "string") {
    bNumber = b[orderBy].replace(/[^,.\d]/g, "").replace(/,/g, "")
      ? Number(
          b[orderBy]
            .toLowerCase()
            .replace(/[^,.\d]/g, "")
            .replace(/,/g, "")
        )
      : b[orderBy].toLowerCase();
    aNumber = a[orderBy].replace(/[^,.\d]/g, "").replace(/,/g, "")
      ? Number(
          a[orderBy]
            .toLowerCase()
            .replace(/[^,.\d]/g, "")
            .replace(/,/g, "")
        )
      : a[orderBy].toLowerCase();
  }

  if (bNumber < aNumber) {
    return -1;
  }
  if (bNumber > aNumber) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => ({
    el,
    index,
  }));
  stabilizedThis.sort((a, b) => {
    const order = comparator(a.el, b.el);
    if (order !== 0) return order;
    return a.index - b.index;
  });
  return stabilizedThis.map((element) => element.el);
}

const EnhancedTableHead = (props) => {
  const { order, orderBy, onRequestSort, headCells } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, index) => (
          <TableCell
            key={headCell.id}
            align={index === 0 ? "left" : "right"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ width: 50 }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const useStyles = makeStyles({
  customTableContainer: {
    overflowX: "initial",
  },
});

const StyledTableFooter = MuiStyled(TableFooter)`
  position: sticky;
  bottom: 0;
  background-color: white;
  margin-bottom: 0;
`;

function EnhancedTable({ headCells, rows }) {
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState(headCells[1].id);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const classes = useStyles();

  return (
    <div>
      <Paper>
        <TableContainer classes={{ root: classes.customTableContainer }}>
          <Table
            aria-labelledby="tableTitle"
            size={"small"}
            aria-label="enhanced table"
            stickyHeader
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row[headCells[0].id]);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) =>
                        handleClick(event, row[headCells[0].id])
                      }
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={`${row[headCells[0].id]}:tr`}
                      selected={isItemSelected}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        style={{ width: 50 }}
                      >
                        {row[headCells[0].id]}
                      </TableCell>
                      {headCells.slice(1).map((headCell, idx) => (
                        <TableCell
                          key={`${row[headCell.id]}:tc:${String(idx)}`}
                          align="right"
                        >
                          {String(row[headCell.id])}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 33 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <StyledTableFooter>
              <TableRow>
                <TableCell colSpan={headCells.length}>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableCell>
              </TableRow>
            </StyledTableFooter>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

function DataTable({ headCells, rows }) {
  return (
    <React.Fragment>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <EnhancedTable headCells={headCells} rows={rows} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default DataTable;
