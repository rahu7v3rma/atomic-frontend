import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";

import EditableTableCell from "../../../../pages/components/EditableTableCell";

export default function BrandHealthSection(props) {
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
              <TableCell component="th">Years since first listing</TableCell>
              <EditableTableCell
                field="brand_health.years_since_first_listing"
                value={results.brand_health?.years_since_first_listing}
                edit={edit}
                onEdit={handleInputEdit}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">Average number of reviews</TableCell>
              <EditableTableCell
                field="brand_health.average_number_of_reviews"
                value={results.brand_health?.average_number_of_reviews}
                edit={edit}
                onEdit={handleInputEdit}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">Average rating</TableCell>
              <EditableTableCell
                field="brand_health.average_rating"
                value={results.brand_health?.average_rating}
                edit={edit}
                onEdit={handleInputEdit}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">
                Monthly review acquisition rate
              </TableCell>
              <EditableTableCell
                field="brand_health.monthly_review_acquistion_rate"
                value={results.brand_health?.monthly_review_acquistion_rate}
                edit={edit}
                onEdit={handleInputEdit}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">
                Percentage of ASINs with more reviews than subcategory average
              </TableCell>
              <EditableTableCell
                field="brand_health.number_of_asins_with_reviews_greater_average"
                value={
                  results.brand_health
                    ?.number_of_asins_with_reviews_greater_average
                }
                edit={edit}
                onEdit={handleInputEdit}
                suffix={"%"}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">
                Percentage of ASINs with higher rating than subcategory average
              </TableCell>
              <EditableTableCell
                field="brand_health.number_of_asins_with_rating_greater_average"
                value={
                  results.brand_health
                    ?.number_of_asins_with_rating_greater_average
                }
                edit={edit}
                onEdit={handleInputEdit}
                suffix={"%"}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">
                Percentage of SKUs with more than 300 units sold per month
              </TableCell>
              <EditableTableCell
                field="brand_health.number_of_sku_unit_sales_greater_300_pm"
                value={
                  results.brand_health?.number_of_sku_unit_sales_greater_300_pm
                }
                edit={edit}
                onEdit={handleInputEdit}
                suffix={"%"}
              />
            </TableRow>

            <TableRow style={{ backgroundColor: "yellow" }}>
              <TableCell component="th">Score</TableCell>
              <EditableTableCell
                field="brand_health.score"
                value={results.brand_health?.score}
                edit={false}
                onEdit={handleInputEdit}
                suffix={"%"}
              />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
