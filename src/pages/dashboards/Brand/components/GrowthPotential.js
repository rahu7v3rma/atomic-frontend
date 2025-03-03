import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";

import EditableTableCell from "../../../../pages/components/EditableTableCell";

export default function GrowthPotentialSection(props) {
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
              <TableCell component="th">
                Number of possible variations for existing products
              </TableCell>
              <EditableTableCell
                field="growth_potential.number_of_possible_variation_for_existing_products"
                value={
                  results.growth_potential
                    ?.number_of_possible_variation_for_existing_products
                }
                edit={edit}
                onEdit={handleInputEdit}
                suffix={"#"}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">
                Number of possible new products in sub category
              </TableCell>
              <EditableTableCell
                field="growth_potential.number_of_possible_new_products_in_sub_category"
                value={
                  results.growth_potential
                    ?.number_of_possible_new_products_in_sub_category
                }
                edit={edit}
                onEdit={handleInputEdit}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">
                Number of possible new products in sub category +1
              </TableCell>
              <EditableTableCell
                field="growth_potential.number_of_possible_new_prodcuts_in_sub_category_1"
                value={
                  results.growth_potential
                    ?.number_of_possible_new_prodcuts_in_sub_category_1
                }
                edit={edit}
                onEdit={handleInputEdit}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">Potential PPC improvements</TableCell>
              <EditableTableCell
                field="growth_potential.potential_ppc_improvement"
                value={results.growth_potential?.potential_ppc_improvement}
                edit={edit}
                onEdit={handleInputEdit}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">Listing improvement</TableCell>
              <EditableTableCell
                field="growth_potential.listing_improvement"
                value={results.growth_potential?.listing_improvement}
                edit={edit}
                onEdit={handleInputEdit}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">
                Additional relevant amazon markets
              </TableCell>
              <EditableTableCell
                field="growth_potential.additional_relevant_amazon_markets"
                value={
                  results.growth_potential?.additional_relevant_amazon_markets
                }
                edit={edit}
                onEdit={handleInputEdit}
              />
            </TableRow>
            <TableRow style={{ backgroundColor: "yellow" }}>
              <TableCell component="th">Score</TableCell>
              <EditableTableCell
                field="growth_potential.score"
                value={results.growth_potential?.score}
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
