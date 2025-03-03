import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";

const numFormatter = (num) => {
  let roundedNumber = num || 0;
  let unit = "";
  if (num > 999 && num < 1000000) {
    roundedNumber = Number((num / 1000).toFixed(1)); // convert to K for number from > 1000 < 1 million
    unit = "K";
  } else if (num > 1000000) {
    roundedNumber = Number((num / 1000000).toFixed(1)); // convert to M for number from > 1 million
    unit = "M";
  }
  return (
    "$" +
    (roundedNumber % 1 !== 0 ? roundedNumber.toFixed(1) : roundedNumber) +
    unit
  );
};
const decFormatter1 = (num) => (num ? Math.round(num * 10) / 10 : 0) + "%";
const decFormatter2 = (num) => "$" + (num ? Math.round(num * 100) / 100 : 0);

export default function NicheCardContent(props) {
  const { data } = props;
  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Field</TableCell>
              <TableCell align="right">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th">Estimated niche size</TableCell>
              <TableCell align="right">
                <div>{numFormatter(data?.estimated_niche_size)}</div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th">Search volume growth</TableCell>
              <TableCell align="right">
                <div>{decFormatter1(data?.search_volume_growth)}</div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th">Units sold</TableCell>
              <TableCell align="right">
                <div>{data?.units_sold || 0}</div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th">Sales Potential score</TableCell>
              <TableCell align="right">
                <div>{data?.sales_potential_score || 0}</div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th">
                Number of top clicked products
              </TableCell>
              <TableCell align="right">
                <div>{data?.num_top_clicked_products || 0}</div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th">Search volume</TableCell>
              <TableCell align="right">
                <div>{decFormatter1(data?.search_volume)}</div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th">Average Price</TableCell>
              <TableCell align="right">
                <div>{decFormatter2(data?.avg_price)}</div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
