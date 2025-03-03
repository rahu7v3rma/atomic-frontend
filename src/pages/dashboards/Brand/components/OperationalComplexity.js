import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";

import EditableTableCell from "../../../../pages/components/EditableTableCell";

export default function OperationalComplexitySection(props) {
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
              <TableCell component="th">Number of ASINs</TableCell>
              <EditableTableCell
                field="operational_complexity.number_of_asins"
                value={results.operational_complexity?.number_of_asins}
                edit={edit}
                onEdit={handleInputEdit}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">Number of SKUs</TableCell>
              <EditableTableCell
                field="operational_complexity.number_of_skus"
                value={results.operational_complexity?.number_of_skus}
                edit={edit}
                onEdit={handleInputEdit}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">Number of suppliers</TableCell>
              <EditableTableCell
                field="operational_complexity.number_of_suppliers"
                value={results.operational_complexity?.number_of_suppliers}
                edit={edit}
                onEdit={handleInputEdit}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">Number of Amazon markets</TableCell>
              <EditableTableCell
                field="operational_complexity.number_of_amazon_markets"
                value={results.operational_complexity?.number_of_amazon_markets}
                edit={edit}
                onEdit={handleInputEdit}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">
                Primary Amazon revenues percentage
              </TableCell>
              <EditableTableCell
                field="operational_complexity.percentage_of_primary_amazon_revenues_of_total_revenues"
                value={
                  results.operational_complexity
                    ?.percentage_of_primary_amazon_revenues_of_total_revenues
                }
                edit={edit}
                onEdit={handleInputEdit}
                suffix={"%"}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">
                Number of sales platforms (apart from Amazon)
              </TableCell>
              <EditableTableCell
                field="operational_complexity.number_of_sales_platforms_in_addition_to_amazon"
                value={
                  results.operational_complexity
                    ?.number_of_sales_platforms_in_addition_to_amazon
                }
                edit={edit}
                onEdit={handleInputEdit}
                suffix={"#"}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">Number of SKUs in FBM</TableCell>
              <EditableTableCell
                field="operational_complexity.number_of_sku_in_fbm"
                value={results.operational_complexity?.number_of_sku_in_fbm}
                edit={edit}
                onEdit={handleInputEdit}
                suffix={"#"}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">Number of employees / VAs</TableCell>
              <EditableTableCell
                field="operational_complexity.number_of_employees_vas"
                value={results.operational_complexity?.number_of_employees_vas}
                edit={edit}
                onEdit={handleInputEdit}
                suffix={"#"}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">Potential liabilities</TableCell>
              <EditableTableCell
                field="operational_complexity.potential_liabilitis"
                value={results.operational_complexity?.potential_liabilitis}
                edit={edit}
                onEdit={handleInputEdit}
              />
            </TableRow>

            <TableRow style={{ backgroundColor: "yellow" }}>
              <TableCell component="th">Score</TableCell>
              <EditableTableCell
                field="operational_complexity.score"
                value={results.operational_complexity?.score}
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
