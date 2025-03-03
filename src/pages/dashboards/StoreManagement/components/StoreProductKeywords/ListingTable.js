import { Box, Button, Link } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import styled from "styled-components/macro";

import { keywordsList } from "../../constants";

const styles = {
  nextIconButtonProps: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderStyle: "solid",
    borderRadius: 8,
    width: 32,
    height: 32,
  },
  backIconButtonProps: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderStyle: "solid",
    borderRadius: 8,
    width: 32,
    height: 32,
    marginRight: "8px",
  },
};

const Btn = styled(Button)`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  color: #334155;
  padding: 4px, 16px, 4px, 16px;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
`;

const Tabelcell = styled(TableCell)`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  color: #64748b;
`;

const TableCellTitle = styled(TableCell)`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  text-align: left;
  color: #3b82f6;
`;

const TabelCellData = styled(TableCell)`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  text-align: left;
  color: #475569;
`;

const ListingTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "scroll", marginTop: 6 }}>
      <TableContainer sx={{ maxHeight: 424 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {[
                "#",
                "Keyword",
                "Clicks",
                "Impressions",
                "Avg. CPC",
                "Cost",
                "CTR",
                "Transactions",
                "CR",
              ].map((title, index) => {
                return (
                  <Tabelcell
                    sx={index === 0 ? { width: "5%" } : { width: "10%" }}
                    key={index}
                  >
                    {title}
                  </Tabelcell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {keywordsList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell sx={{ width: "5%" }}>
                      {page * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCellTitle>
                      <Link
                        component="div"
                        onClick={() => {}}
                        href="www.google.com"
                      >
                        {row.flag}
                      </Link>
                    </TableCellTitle>
                    <TabelCellData>{row.v1}</TabelCellData>
                    <TabelCellData>{row.v2}</TabelCellData>
                    <TabelCellData>{row.v3}</TabelCellData>
                    <TabelCellData>{row.v4}</TabelCellData>
                    <TabelCellData>{row.v5}</TabelCellData>
                    <TabelCellData>{row.v6}</TabelCellData>
                    <TabelCellData>{row.v7}</TabelCellData>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 4,
          alignItems: "center",
        }}
      >
        <Btn>Learn More</Btn>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={keywordsList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          backIconButtonProps={{
            style: styles.backIconButtonProps,
          }}
          nextIconButtonProps={{
            style: styles.nextIconButtonProps,
          }}
        />
      </Box>
    </Paper>
  );
};
export default ListingTable;
