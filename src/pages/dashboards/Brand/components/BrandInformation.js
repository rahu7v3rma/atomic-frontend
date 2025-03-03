import { Card as MuiCard, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import styled from "styled-components/macro";

import EditableTableCell from "../../../../pages/components/EditableTableCell";
import ExpandableSection from "../../../components/ExpandableSection";
import HorizontalBarChart from "../../Default/HorizontalBarChart";

const ScoreTitle = styled(MuiCard)`
  display: flex;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const ScoreIcon = styled(MuiCard)`
  background-color: lightgrey;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 30px;
  border-radius: 50%;
  height: 32px;
  width: 32px;
`;

export default function BrandInfoSection(props) {
  const { results, edit, handleInputEdit } = props;
  const [open, setOpen] = React.useState([true]);
  const chartData = [];

  // Get the element with the highest occurrence
  function mode(arr) {
    return arr
      .sort(
        (a, b) =>
          arr.filter((v) => v === a).length - arr.filter((v) => v === b).length
      )
      .pop();
  }

  chartData.push(results.operational_complexity?.score || 0);
  chartData.push(results.financial_health?.score || 0);
  chartData.push(results.brand_health?.score || 0);
  chartData.push(results.niche_attractiveness?.score || 0);
  chartData.push(results.best_sellers_competetive_position?.score || 0);
  chartData.push(results.growth_potential?.score || 0);

  const yaxis_labels = [
    "Operational Complexity",
    "Financial performance",
    "Brand health",
    "Niche attractiveness",
    "Competitive position",
    "Growth potential",
  ];

  const dataset_label = "Score";

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
              <TableCell component="th">Brand name</TableCell>
              <EditableTableCell
                field="brand_name"
                value={results.brand_name}
                edit={false}
                onEdit={handleInputEdit}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">ASIN table</TableCell>
              <EditableTableCell
                field="asin_table"
                value={results.asins ? "Available" : "Unavailable"}
                edit={false}
                onEdit={handleInputEdit}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">Years active</TableCell>
              <EditableTableCell
                field="active_since"
                value={results?.brand_health?.years_since_first_listing}
                edit={false}
                onEdit={handleInputEdit}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">Annual revenue</TableCell>
              <EditableTableCell
                field="annual_revenue"
                value={
                  results.asins
                    ? results.asins
                        .map((el) => el.ltm_revenue)
                        .reduce((ell, res) => (res = res + ell), 0)
                    : results.financial_health.ltm_revenues
                }
                edit={false}
                onEdit={handleInputEdit}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">Number of ASINs</TableCell>
              <EditableTableCell
                field="number_of_asins"
                value={
                  results.asins
                    ? new Set(results.asins.map((el) => el.asin)).size
                    : results.operational_complexity.number_of_asins
                }
                edit={false}
                onEdit={handleInputEdit}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">Number of SKUs</TableCell>
              <EditableTableCell
                field="number_of_skus"
                value={
                  results.asins
                    ? new Set(results.asins.map((el) => el.sku)).size
                    : results.operational_complexity.number_of_skus
                }
                edit={false}
                onEdit={handleInputEdit}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">Main Category</TableCell>
              <EditableTableCell
                field="main_category"
                value={
                  results.asins
                    ? mode(results.asins.map((el) => el.category))
                    : results.brand_major_category
                }
                edit={false}
                onEdit={handleInputEdit}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">Subcategory</TableCell>
              <EditableTableCell
                field="subcategory"
                value={
                  results.asins
                    ? [
                        ...new Set(results.asins.map((el) => el.sub_category)),
                      ].join()
                    : results.brand_sub_categories
                }
                edit={edit}
                onEdit={handleInputEdit}
              />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <ScoreTitle>
        <Typography variant="h6">Score summary</Typography>
        <ExpandableSection open={open} setOpen={setOpen} idx={0} />
        <ScoreIcon>
          {(results?.score && results?.score.toFixed(2)) || 0}
        </ScoreIcon>
      </ScoreTitle>
      {open[0] ? (
        <HorizontalBarChart
          data={chartData}
          dataset_label={dataset_label}
          yaxis_labels={yaxis_labels}
        />
      ) : null}
    </React.Fragment>
  );
}
