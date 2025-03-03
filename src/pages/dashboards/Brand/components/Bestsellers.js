import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";

import EditableTableCell from "../../../components/EditableTableCell";

export default function BestsellersSection(props) {
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
            {/* Bestseller 1 */}
            <TableRow>
              <TableCell colSpan={2} align="center">
                Bestseller 1
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th">ASIN</TableCell>
              <EditableTableCell
                field={`best_sellers_competetive_position.best_sellers.${results.best_sellers_competetive_position?.best_sellers?.product_0?.asin}.asin`}
                value={
                  results.best_sellers_competetive_position?.best_sellers
                    ?.product_0?.asin
                }
                edit={edit}
                onEdit={handleInputEdit}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">Percentage of brand revenue</TableCell>
              <EditableTableCell
                field={`best_sellers_competetive_position.best_sellers.${results.best_sellers_competetive_position?.best_sellers?.product_0?.asin}.percentage_of_revenues`}
                value={
                  results.best_sellers_competetive_position?.best_sellers
                    ?.product_0?.percentage_of_revenues
                }
                edit={edit}
                onEdit={handleInputEdit}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">LTM revenue growth</TableCell>
              <EditableTableCell
                field={`best_sellers_competetive_position.best_sellers.${results.best_sellers_competetive_position?.best_sellers?.product_0?.asin}.listing_revenue_growth_ltm`}
                value={
                  results.best_sellers_competetive_position?.best_sellers
                    ?.product_0?.listing_revenue_growth_ltm
                }
                edit={edit}
                onEdit={handleInputEdit}
                suffix={"%"}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">Monthly units sold</TableCell>
              <EditableTableCell
                field={`best_sellers_competetive_position.best_sellers.${results.best_sellers_competetive_position?.best_sellers?.product_0?.asin}.listings_monthly_sales_volume_units`}
                value={
                  results.best_sellers_competetive_position?.best_sellers
                    ?.product_0?.listings_monthly_sales_volume_units
                }
                edit={edit}
                onEdit={handleInputEdit}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">Leading search term</TableCell>
              <EditableTableCell
                field={`best_sellers_competetive_position.best_sellers.${results.best_sellers_competetive_position?.best_sellers?.product_0?.asin}.leading_product_search_term`}
                value={
                  results.best_sellers_competetive_position?.best_sellers
                    ?.product_0?.leading_product_search_term
                }
                edit={edit}
                onEdit={handleInputEdit}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">
                Leading search term annual volume
              </TableCell>
              <EditableTableCell
                field={`best_sellers_competetive_position.best_sellers.${results.best_sellers_competetive_position?.best_sellers?.product_0?.asin}.leading_search_term_annual_volume`}
                value={
                  results.best_sellers_competetive_position?.best_sellers
                    ?.product_0?.leading_search_term_annual_volume
                }
                edit={edit}
                onEdit={handleInputEdit}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">
                Organic position in key search term
              </TableCell>
              <EditableTableCell
                field={`best_sellers_competetive_position.best_sellers.${results.best_sellers_competetive_position?.best_sellers?.product_0?.asin}.listing_organic_position_in_key_search_term`}
                value={
                  results.best_sellers_competetive_position?.best_sellers
                    ?.product_0?.listing_organic_position_in_key_search_term
                }
                edit={edit}
                onEdit={handleInputEdit}
                suffix={"#"}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">Listing rank in sub category</TableCell>
              <EditableTableCell
                field={`best_sellers_competetive_position.best_sellers.${results.best_sellers_competetive_position?.best_sellers?.product_0?.asin}.listing_position_in_sub_category`}
                value={
                  results.best_sellers_competetive_position?.best_sellers
                    ?.product_0?.listing_position_in_sub_category
                }
                edit={edit}
                onEdit={handleInputEdit}
                suffix={"#"}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">
                Listing percentage of reviews from top 3 listings for key search
                terms
              </TableCell>
              <EditableTableCell
                field={`best_sellers_competetive_position.best_sellers.${results.best_sellers_competetive_position?.best_sellers?.product_0?.asin}.listing_number_of_reviews_top_3_average_reviews`}
                value={
                  results.best_sellers_competetive_position?.best_sellers
                    ?.product_0?.listing_number_of_reviews_top_3_average_reviews
                }
                edit={edit}
                onEdit={handleInputEdit}
                suffix={"%"}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">
                Listing percentage of units sold from top 3 listings in category
              </TableCell>
              <EditableTableCell
                field={`best_sellers_competetive_position.best_sellers.${results.best_sellers_competetive_position?.best_sellers?.product_0?.asin}.listing_number_of_units_sold_pm_category_leader_units_sold_pm`}
                value={
                  results.best_sellers_competetive_position?.best_sellers
                    ?.product_0
                    ?.listing_number_of_units_sold_pm_category_leader_units_sold_pm
                }
                edit={edit}
                onEdit={handleInputEdit}
                suffix={"%"}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">Estimated annual sales</TableCell>
              <EditableTableCell
                field={
                  "best_sellers_competetive_position.best_sellers.product_0.product_data.aoe_product.monthly_sales_estimate"
                }
                value={
                  results.best_sellers_competetive_position?.best_sellers
                    ?.product_0?.product_data?.aoe_product
                    ?.monthly_sales_estimate * 12
                }
                edit={false}
                onEdit={handleInputEdit}
                suffix={"$"}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">
                Estimated annual sales in units
              </TableCell>
              <EditableTableCell
                field="best_sellers_competetive_position.best_sellers.product_0.listings_monthly_sales_volume_units"
                value={
                  results.best_sellers_competetive_position?.best_sellers
                    ?.product_0?.listings_monthly_sales_volume_units * 12
                }
                edit={false}
                onEdit={handleInputEdit}
                suffix={"#"}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">List of all niches</TableCell>
              <EditableTableCell
                field="best_sellers_competetive_position.best_sellers.product_0.product_data.aoe_product.aoe_products_niche"
                value={results.best_sellers_competetive_position?.best_sellers?.product_0?.product_data?.aoe_product?.aoe_products_niche?.map(
                  (o) => o.name
                )}
                edit={false}
                onEdit={handleInputEdit}
              />
            </TableRow>
            {/* Bestseller 2 */}
            <TableRow>
              <TableCell colSpan={2} align="center">
                Bestseller 2
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th">ASIN</TableCell>
              <EditableTableCell
                field={`best_sellers_competetive_position.best_sellers.${results.best_sellers_competetive_position?.best_sellers?.product_1?.asin}.asin`}
                value={
                  results.best_sellers_competetive_position?.best_sellers
                    ?.product_1?.asin
                }
                edit={edit}
                onEdit={handleInputEdit}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">Percentage of brand revenue</TableCell>
              <EditableTableCell
                field={`best_sellers_competetive_position.best_sellers.${results.best_sellers_competetive_position?.best_sellers?.product_1?.asin}.percentage_of_revenues`}
                value={
                  results.best_sellers_competetive_position?.best_sellers
                    ?.product_1?.percentage_of_revenues
                }
                edit={edit}
                onEdit={handleInputEdit}
                suffix={"%"}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">LTM revenue growth</TableCell>
              <EditableTableCell
                field={`best_sellers_competetive_position.best_sellers.${results.best_sellers_competetive_position?.best_sellers?.product_1?.asin}.listing_revenue_growth_ltm`}
                value={
                  results.best_sellers_competetive_position?.best_sellers
                    ?.product_1?.listing_revenue_growth_ltm
                }
                edit={edit}
                onEdit={handleInputEdit}
                suffix={"%"}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">Monthly units sold</TableCell>
              <EditableTableCell
                field={`best_sellers_competetive_position.best_sellers.${results.best_sellers_competetive_position?.best_sellers?.product_1?.asin}.listings_monthly_sales_volume_units`}
                value={
                  results.best_sellers_competetive_position?.best_sellers
                    ?.product_1?.listings_monthly_sales_volume_units
                }
                edit={edit}
                onEdit={handleInputEdit}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">Leading search term</TableCell>
              <EditableTableCell
                field={`best_sellers_competetive_position.best_sellers.${results.best_sellers_competetive_position?.best_sellers?.product_1?.asin}.leading_product_search_term`}
                value={
                  results.best_sellers_competetive_position?.best_sellers
                    ?.product_1?.leading_product_search_term
                }
                edit={edit}
                onEdit={handleInputEdit}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">
                Leading search term annual volume
              </TableCell>
              <EditableTableCell
                field={`best_sellers_competetive_position.best_sellers.${results.best_sellers_competetive_position?.best_sellers?.product_1?.asin}.leading_search_term_annual_volume`}
                value={
                  results.best_sellers_competetive_position?.best_sellers
                    ?.product_1?.leading_search_term_annual_volume
                }
                edit={edit}
                onEdit={handleInputEdit}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">
                Organic position in key search term
              </TableCell>
              <EditableTableCell
                field={`best_sellers_competetive_position.best_sellers.${results.best_sellers_competetive_position?.best_sellers?.product_1?.asin}.listing_organic_position_in_key_search_term`}
                value={
                  results.best_sellers_competetive_position?.best_sellers
                    ?.product_1?.listing_organic_position_in_key_search_term
                }
                edit={edit}
                onEdit={handleInputEdit}
                suffix={"#"}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">Listing rank in sub category</TableCell>
              <EditableTableCell
                field={`best_sellers_competetive_position.best_sellers.${results.best_sellers_competetive_position?.best_sellers?.product_1?.asin}.listing_position_in_sub_category`}
                value={
                  results.best_sellers_competetive_position?.best_sellers
                    ?.product_1?.listing_position_in_sub_category
                }
                edit={edit}
                onEdit={handleInputEdit}
                suffix={"#"}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">
                Listing percentage of reviews from top 3 listings for key search
                terms
              </TableCell>
              <EditableTableCell
                field={`best_sellers_competetive_position.best_sellers.${results.best_sellers_competetive_position?.best_sellers?.product_1?.asin}.listing_number_of_reviews_top_3_average_reviews`}
                value={
                  results.best_sellers_competetive_position?.best_sellers
                    ?.product_1?.listing_number_of_reviews_top_3_average_reviews
                }
                edit={edit}
                onEdit={handleInputEdit}
                suffix={"%"}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">
                Listing percentage of units sold from top 3 listings in category
              </TableCell>
              <EditableTableCell
                field={`best_sellers_competetive_position.best_sellers.${results.best_sellers_competetive_position?.best_sellers?.product_1?.asin}.listing_number_of_units_sold_pm_category_leader_units_sold_pm`}
                value={
                  results.best_sellers_competetive_position?.best_sellers
                    ?.product_1
                    ?.listing_number_of_units_sold_pm_category_leader_units_sold_pm
                }
                edit={edit}
                onEdit={handleInputEdit}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">Estimated annual sales</TableCell>
              <EditableTableCell
                field={
                  "best_sellers_competetive_position.best_sellers.product_1.product_data.aoe_product.monthly_sales_estimate"
                }
                value={
                  results.best_sellers_competetive_position?.best_sellers
                    ?.product_1?.product_data?.aoe_product
                    ?.monthly_sales_estimate * 12
                }
                edit={false}
                onEdit={handleInputEdit}
                suffix={"$"}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">
                Estimated annual sales in units
              </TableCell>
              <EditableTableCell
                field="best_sellers_competetive_position.best_sellers.product_1.listings_monthly_sales_volume_units"
                value={
                  results.best_sellers_competetive_position?.best_sellers
                    ?.product_1?.listings_monthly_sales_volume_units * 12
                }
                edit={false}
                onEdit={handleInputEdit}
                suffix={"#"}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">List of all niches</TableCell>
              <EditableTableCell
                field="best_sellers_competetive_position.best_sellers.product_1.product_data.aoe_product.aoe_products_niche"
                value={results.best_sellers_competetive_position?.best_sellers?.product_1?.product_data?.aoe_product?.aoe_products_niche?.map(
                  (o) => o.name
                )}
                edit={false}
                onEdit={handleInputEdit}
              />
            </TableRow>
            {/* Bestseller 3 */}
            <TableRow>
              <TableCell colSpan={2} align="center">
                Bestseller 3
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th">ASIN</TableCell>
              <EditableTableCell
                field={`best_sellers_competetive_position.best_sellers.${results.best_sellers_competetive_position?.best_sellers?.product_2?.asin}.asin`}
                value={
                  results.best_sellers_competetive_position?.best_sellers
                    ?.product_2?.asin
                }
                edit={edit}
                onEdit={handleInputEdit}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">Percentage of brand revenue</TableCell>
              <EditableTableCell
                field={`best_sellers_competetive_position.best_sellers.${results.best_sellers_competetive_position?.best_sellers?.product_2?.asin}.percentage_of_revenues`}
                value={
                  results.best_sellers_competetive_position?.best_sellers
                    ?.product_2?.percentage_of_revenues
                }
                edit={edit}
                onEdit={handleInputEdit}
                suffix={"%"}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">LTM revenue growth</TableCell>
              <EditableTableCell
                field={`best_sellers_competetive_position.best_sellers.${results.best_sellers_competetive_position?.best_sellers?.product_2?.asin}.listing_revenue_growth_ltm`}
                value={
                  results.best_sellers_competetive_position?.best_sellers
                    ?.product_2?.listing_revenue_growth_ltm
                }
                edit={edit}
                onEdit={handleInputEdit}
                suffix={"%"}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">Monthly units sold</TableCell>
              <EditableTableCell
                field={`best_sellers_competetive_position.best_sellers.${results.best_sellers_competetive_position?.best_sellers?.product_2?.asin}.listings_monthly_sales_volume_units`}
                value={
                  results.best_sellers_competetive_position?.best_sellers
                    ?.product_2?.listings_monthly_sales_volume_units
                }
                edit={edit}
                onEdit={handleInputEdit}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">Leading search term</TableCell>
              <EditableTableCell
                field={`best_sellers_competetive_position.best_sellers.${results.best_sellers_competetive_position?.best_sellers?.product_2?.asin}.leading_product_search_term`}
                value={
                  results.best_sellers_competetive_position?.best_sellers
                    ?.product_2?.leading_product_search_term
                }
                edit={edit}
                onEdit={handleInputEdit}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">
                Leading search term annual volume
              </TableCell>
              <EditableTableCell
                field={`best_sellers_competetive_position.best_sellers.${results.best_sellers_competetive_position?.best_sellers?.product_2?.asin}.leading_search_term_annual_volume`}
                value={
                  results.best_sellers_competetive_position?.best_sellers
                    ?.product_2?.leading_search_term_annual_volume
                }
                edit={edit}
                onEdit={handleInputEdit}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">
                Organic position in key search term
              </TableCell>
              <EditableTableCell
                field={`best_sellers_competetive_position.best_sellers.${results.best_sellers_competetive_position?.best_sellers?.product_2?.asin}.listing_organic_position_in_key_search_term`}
                value={
                  results.best_sellers_competetive_position?.best_sellers
                    ?.product_2?.listing_organic_position_in_key_search_term
                }
                edit={edit}
                onEdit={handleInputEdit}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">Listing rank in sub category</TableCell>
              <EditableTableCell
                field={`best_sellers_competetive_position.best_sellers.${results.best_sellers_competetive_position?.best_sellers?.product_2?.asin}.listing_position_in_sub_category`}
                value={
                  results.best_sellers_competetive_position?.best_sellers
                    ?.product_2?.listing_position_in_sub_category
                }
                edit={edit}
                onEdit={handleInputEdit}
                suffix={"#"}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">
                Listing percentage of reviews from top 3 listings for key search
                terms
              </TableCell>
              <EditableTableCell
                field={`best_sellers_competetive_position.best_sellers.${results.best_sellers_competetive_position?.best_sellers?.product_2?.asin}.listing_number_of_reviews_top_3_average_reviews`}
                value={
                  results.best_sellers_competetive_position?.best_sellers
                    ?.product_2?.listing_number_of_reviews_top_3_average_reviews
                }
                edit={edit}
                onEdit={handleInputEdit}
                suffix={"$"}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">
                Listing percentage of units sold from top 3 listings in category
              </TableCell>
              <EditableTableCell
                field={`best_sellers_competetive_position.best_sellers.${results.best_sellers_competetive_position?.best_sellers?.product_2?.asin}.listing_number_of_units_sold_pm_category_leader_units_sold_pm`}
                value={
                  results.best_sellers_competetive_position?.best_sellers
                    ?.product_2
                    ?.listing_number_of_units_sold_pm_category_leader_units_sold_pm
                }
                edit={edit}
                onEdit={handleInputEdit}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">Estimated annual sales</TableCell>
              <EditableTableCell
                field={
                  "best_sellers_competetive_position.best_sellers.product_2.product_data.aoe_product.monthly_sales_estimate"
                }
                value={
                  results.best_sellers_competetive_position?.best_sellers
                    ?.product_2?.product_data?.aoe_product
                    ?.monthly_sales_estimate * 12
                }
                edit={false}
                onEdit={handleInputEdit}
                suffix={"$"}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">
                Estimated annual sales in units
              </TableCell>
              <EditableTableCell
                field="best_sellers_competetive_position.best_sellers.product_2.listings_monthly_sales_volume_units"
                value={
                  results.best_sellers_competetive_position?.best_sellers
                    ?.product_2?.listings_monthly_sales_volume_units * 12
                }
                edit={false}
                onEdit={handleInputEdit}
                suffix={"#"}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">List of all niches</TableCell>
              <EditableTableCell
                field="best_sellers_competetive_position.best_sellers.product_2.product_data.aoe_product.aoe_products_niche"
                value={results.best_sellers_competetive_position?.best_sellers?.product_2?.product_data?.aoe_product?.aoe_products_niche?.map(
                  (o) => o.name
                )}
                edit={false}
                onEdit={handleInputEdit}
              />
            </TableRow>

            {/* General */}
            <TableRow>
              <TableCell colSpan={2} align="center">
                Top 3 organic products
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th">
                Top 3 listings in search term average number of reviews
              </TableCell>
              <EditableTableCell
                field="best_sellers_competetive_position.top_3_listings_in_search_term_average_number_reviews"
                value={
                  results.best_sellers_competetive_position
                    ?.top_3_listings_in_search_term_average_number_reviews
                }
                edit={edit}
                onEdit={handleInputEdit}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">
                Top 3 listings in search term average units sold per month
              </TableCell>
              <EditableTableCell
                field="best_sellers_competetive_position.top_3_listings_average_montly_sales_volume_units"
                value={
                  results.best_sellers_competetive_position
                    ?.top_3_listings_average_montly_sales_volume_units
                }
                edit={edit}
                onEdit={handleInputEdit}
              />
            </TableRow>
            <TableRow>
              <TableCell component="th">
                Top 3 listings in search term average rating
              </TableCell>
              <EditableTableCell
                field="best_sellers_competetive_position.top_3_listings_average_rating"
                value={
                  results.best_sellers_competetive_position
                    ?.top_3_listings_average_rating
                }
                edit={edit}
                onEdit={handleInputEdit}
              />
            </TableRow>
            <TableRow style={{ backgroundColor: "yellow" }}>
              <TableCell component="th">Score</TableCell>
              <EditableTableCell
                field="best_sellers_competetive_position.score"
                value={results.best_sellers_competetive_position?.score}
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
