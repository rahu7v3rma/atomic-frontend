import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";

import EditableTableCell from "../../../components/EditableTableCell";

export default function FinancialHealthSection(props) {
  const { results, edit, handleInputEdit } = props;

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
              <TableCell component="th">LTM revenues</TableCell>
              <EditableTableCell
                field="financial_health.ltm_revenues"
                value={results.financial_health?.ltm_revenues}
                edit={edit}
                onEdit={handleInputEdit}
                suffix={"$"}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">LTM revenue growth</TableCell>
              <EditableTableCell
                field="financial_health.ltm_revenue_growth"
                value={results.financial_health?.ltm_revenue_growth}
                edit={edit}
                onEdit={handleInputEdit}
                suffix={"%"}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">Average unit price</TableCell>
              <EditableTableCell
                field="financial_health.average_unit_price"
                value={results.financial_health?.average_unit_price}
                edit={edit}
                onEdit={handleInputEdit}
                suffix={"$"}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">Revenues concentration</TableCell>
              <EditableTableCell
                field="financial_health.revenues_concentration"
                value={results.financial_health?.revenues_concentration}
                edit={edit}
                onEdit={handleInputEdit}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">Gross margin</TableCell>
              <EditableTableCell
                field="financial_health.gross_margin"
                value={results.financial_health?.gross_margin}
                edit={edit}
                onEdit={handleInputEdit}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">SDE margin</TableCell>
              <EditableTableCell
                field="financial_health.sde_margin"
                value={results.financial_health?.sde_margin}
                edit={edit}
                onEdit={handleInputEdit}
                suffix={"$"}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">Ask price</TableCell>
              <EditableTableCell
                field="financial_health.ask_price"
                value={results.financial_health?.ask_price}
                edit={edit}
                onEdit={handleInputEdit}
                suffix={"$"}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">Expected multiple</TableCell>
              <EditableTableCell
                field="financial_health.expected_multiple"
                value={results.financial_health?.expected_multiple}
                edit={edit}
                onEdit={handleInputEdit}
                suffix={"x"}
              />
            </TableRow>
            <TableRow style={{ backgroundColor: "yellow" }}>
              <TableCell component="th">Score</TableCell>
              <EditableTableCell
                field="financial_health.score"
                value={results.financial_health?.score}
                edit={false}
                onEdit={handleInputEdit}
              />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
