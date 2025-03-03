import "@fontsource/inter";
import "@fontsource/inter/600.css";
import InfoIcon from "@mui/icons-material/Info";
import { Box, Tooltip } from "@mui/material";
import Link from "@mui/material/Link";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";
import * as React from "react";

import { months } from "../../constants";

function calculations(product, _compareConditions) {
  //3pl_quantity_column_variables
  let quantity3pl = product["3pl"]?.quantity;
  // quantity3plAvailable = product.quantity_3pl?.tooltip?.available,
  // quantity3plReserved = product.quantity_3pl?.tooltip?.reserved,
  // quantity3plInbound = product.quantity_3pl?.tooltip?.inbound;

  //fba_quantity_column_variables
  let quantityfba = product.fba_report?.quantity,
    quantityfbaAvailable = product.fba_report?.available,
    quantityfbaReserved = product.fba_report?.reserved,
    quantityfbaInbound = product.fba_report?.inbound;

  //1 months forecast
  let demand_forcasting_1_months = product.demand_forcasting_1_months;

  //3 months forecast
  let demand_forcasting_3_months = product.demand_forcasting_3_months;

  //6 months forecast
  let demand_forcasting_6_months = product.demand_forcasting_6_months;

  //days-of_supply_column_variables
  let daysOfSupply = product.days_of_supply?.visible,
    daysOfSupplyPieces = product.days_of_supply?.tooltip?.pieces,
    daysOfSupplyBefore = new Date(product.days_of_supply?.tooltip?.before);

  // days of supply tooltip date conversion to human readable form
  daysOfSupplyBefore =
    months[daysOfSupplyBefore.getUTCMonth()] +
    " " +
    daysOfSupplyBefore.getDate() +
    " " +
    daysOfSupplyBefore.getFullYear();

  return {
    quantity3pl,
    // quantity3plAvailable,
    // quantity3plReserved,
    // quantity3plInbound,
    quantityfba,
    demand_forcasting_1_months,
    demand_forcasting_3_months,
    demand_forcasting_6_months,
    quantityfbaAvailable,
    quantityfbaReserved,
    quantityfbaInbound,
    daysOfSupply,
    daysOfSupplyPieces,
    daysOfSupplyBefore,
  };
}
const ProductRowCalculated = ({
  store,
  sku,
  product,
  compareConditions = {},
}) => {
  const charMax = 45;

  ProductRowCalculated.propTypes = {
    sku: PropTypes.string,
    store: PropTypes.string,
    product: PropTypes.object,
    compareConditions: PropTypes.object,
  };

  const {
    quantity3pl,
    demand_forcasting_1_months,
    demand_forcasting_3_months,
    demand_forcasting_6_months,
    // quantity3plAvailable,
    // quantity3plReserved,
    // quantity3plInbound,
    quantityfba,
    quantityfbaAvailable,
    quantityfbaReserved,
    quantityfbaInbound,
    daysOfSupply,
    daysOfSupplyPieces,
    daysOfSupplyBefore,
  } = calculations(product, compareConditions);

  // reusable component for 2nd and 3rd columns
  const TableCell1 = ({ quantity, available, reserved, inbound }) => {
    TableCell1.propTypes = {
      quantity: PropTypes.number,
      available: PropTypes.number,
      reserved: PropTypes.number,
      inbound: PropTypes.number,
    };
    return (
      <TableCell
        align="center"
        sx={{
          fontFamily: "Inter",
          fontWeight: 600,
          color: "#475569",
          fontSize: 14,
        }}
        data-testid="2nd_3rd_column_visible_data"
      >
        {quantity ? (
          <>
            {quantity}
            <Tooltip
              title={
                <Box
                  sx={{
                    fontFamily: "Inter",
                    fontWeight: 400,
                    fontSize: 12,
                    padding: 1,
                  }}
                  data-testid="2nd_3rd_column_tooltip_menu"
                >
                  <p>Available: {available}</p>
                  <p>Reserved: {reserved}</p>
                  <p>Inbound: {inbound}</p>
                </Box>
              }
            >
              <InfoIcon
                sx={{ fontSize: 12, marginLeft: 0.5 }}
                data-testid="2nd_3rd_columns_tooltip"
              />
            </Tooltip>
          </>
        ) : (
          "Soon"
        )}
      </TableCell>
    );
  };

  return (
    // render
    <>
      <TableRow style={{ padding: 0, borderWidth: 1 }}>
        <TableCell sx={{ maxWidth: 400 }}>
          <Link
            data-testid="product_href"
            href={`/store-product-detail?store=${store}&sku=${sku}&asin=${""}&child_asin=${""}`}
            sx={{
              fontFamily: "Inter",
              fontWeight: 600,
              fontSize: 14,
              textDecoration: "none",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <img
                src={
                  product.image ||
                  "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
                }
                alt={sku}
                style={{ width: 50, height: 50, borderRadius: 5 }}
                data-testid="product_image"
              />
              <div style={{ marginLeft: 10, whiteSpace: "nowrap" }}>
                <p data-testid="product_name">
                  {product.name?.substring(0, charMax)}
                </p>
                <p
                  style={{
                    fontFamily: "Inter",
                    fontWeight: 400,
                    color: "#64748B",
                    fontSize: 12,
                  }}
                  data-testid="product_sku"
                >
                  SKU: {sku}
                </p>
              </div>
            </div>
          </Link>
        </TableCell>
        <TableCell
          align="center"
          sx={{
            fontFamily: "Inter",
            fontWeight: 600,
            color: "#475569",
            fontSize: 14,
          }}
        >
          {quantity3pl === undefined || quantity3pl === "" ? (
            <>N/A</>
          ) : (
            <>{quantity3pl}</>
          )}
        </TableCell>
        <TableCell1
          quantity={quantityfba}
          available={quantityfbaAvailable}
          reserved={quantityfbaReserved}
          inbound={quantityfbaInbound}
        />
        <TableCell
          align="center"
          sx={{
            fontFamily: "Inter",
            fontWeight: 600,
            color: "#475569",
            fontSize: 14,
          }}
        >
          {demand_forcasting_1_months}
        </TableCell>
        <TableCell
          align="center"
          sx={{
            fontFamily: "Inter",
            fontWeight: 600,
            color: "#475569",
            fontSize: 14,
          }}
        >
          {demand_forcasting_3_months}
        </TableCell>
        <TableCell
          align="center"
          sx={{
            fontFamily: "Inter",
            fontWeight: 600,
            color: "#475569",
            fontSize: 14,
          }}
        >
          {demand_forcasting_6_months}
        </TableCell>
        <TableCell
          align="center"
          sx={{
            fontFamily: "Inter",
            fontWeight: 600,
            color: "#475569",
            fontSize: 14,
          }}
          data-testid="4th_column_visible_data"
        >
          {daysOfSupply ? (
            <>
              {daysOfSupply}
              <Tooltip
                title={
                  <p
                    style={{
                      fontFamily: "Inter",
                      fontWeight: 400,
                      fontSize: 12,
                      textAlign: "center",
                      padding: 0,
                    }}
                    data-testid="4th_column_tooltip_menu"
                  >
                    It&apos;s recommended to order&nbsp;
                    {daysOfSupplyPieces}&nbsp;pieces from&nbsp;
                    {daysOfSupplyBefore}&nbsp;
                  </p>
                }
              >
                <InfoIcon
                  sx={{ fontSize: 12, marginLeft: 0.5 }}
                  data-testid="4th_column_tooltip"
                />
              </Tooltip>{" "}
            </>
          ) : (
            "Soon"
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          align="right"
          style={{ padding: 0, borderBottom: 0 }}
          colSpan={12}
        />
      </TableRow>
    </>
  );
};

const ProductRowAdvanced = ({
  store,
  sku,
  product,
  compareConditions = {},
}) => {
  const charMax = 45;

  ProductRowAdvanced.propTypes = {
    sku: PropTypes.string,
    store: PropTypes.string,
    product: PropTypes.object,
    compareConditions: PropTypes.object,
  };

  const {
    quantity3pl,
    // demand_forcasting_1_months,
    // demand_forcasting_3_months,
    // demand_forcasting_6_months,
    // quantity3plAvailable,
    // quantity3plReserved,
    // quantity3plInbound,
    // quantityfba,
    quantityfbaAvailable,
    quantityfbaReserved,
    quantityfbaInbound,
    // daysOfSupply,
    // daysOfSupplyPieces,
    // daysOfSupplyBefore,
  } = calculations(product, compareConditions);

  // reusable component for 2nd and 3rd columns
  // const TableCell1 = ({ quantity, available, reserved, inbound }) => {
  //   TableCell1.propTypes = {
  //     quantity: PropTypes.number,
  //     available: PropTypes.number,
  //     reserved: PropTypes.number,
  //     inbound: PropTypes.number,
  //   };
  //   return (
  //     <TableCell
  //       sx={{
  //         fontFamily: "Inter",
  //         fontWeight: 600,
  //         color: "#475569",
  //         fontSize: 14,
  //       }}
  //       data-testid="2nd_3rd_column_visible_data"
  //     >
  //       {quantity ? (
  //         <>
  //           {quantity}
  //           <Tooltip
  //             title={
  //               <Box
  //                 sx={{
  //                   fontFamily: "Inter",
  //                   fontWeight: 400,
  //                   fontSize: 12,
  //                   padding: 1,
  //                 }}
  //                 data-testid="2nd_3rd_column_tooltip_menu"
  //               >
  //                 <p>Available: {available}</p>
  //                 <p>Reserved: {reserved}</p>
  //                 <p>Inbound: {inbound}</p>
  //               </Box>
  //             }
  //           >
  //             <InfoIcon
  //               sx={{ fontSize: 12, marginLeft: 0.5 }}
  //               data-testid="2nd_3rd_columns_tooltip"
  //             />
  //           </Tooltip>
  //         </>
  //       ) : (
  //         "Soon"
  //       )}
  //     </TableCell>
  //   );
  // };

  return (
    // render
    <>
      <TableRow style={{ padding: 0, borderWidth: 1 }}>
        <TableCell sx={{ maxWidth: 400 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <img
              src={
                product.image ||
                "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
              }
              alt={sku}
              style={{ width: 50, height: 50, borderRadius: 5 }}
              data-testid="product_image"
            />
            <div style={{ marginLeft: 10, whiteSpace: "nowrap" }}>
              <p data-testid="product_name">
                <Link
                  data-testid="product_href"
                  href={`https://www.amazon.com/dp/${product.asin}?th=1`}
                  sx={{
                    fontFamily: "Inter",
                    fontWeight: 600,
                    fontSize: 14,
                    textDecoration: "none",
                  }}
                >
                  {product.name?.substring(0, charMax)}
                </Link>
              </p>
              <p
                style={{
                  fontFamily: "Inter",
                  fontWeight: 400,
                  color: "#64748B",
                  fontSize: 12,
                  marginBottom: -5,
                }}
                data-testid="product_sku"
              >
                <Link
                  data-testid="product_href"
                  href={`/advanced-business-report?level=sku&store=${store}&value=${product.sku}&start_date=${compareConditions.current.start_date}&end_date=${compareConditions.current.end_date}&periodicity=day&metrics=units,avg_price`}
                  sx={{
                    fontFamily: "Inter",
                    fontWeight: 600,
                    fontSize: 14,
                    textDecoration: "none",
                  }}
                >
                  SKU:&nbsp;
                </Link>
                {sku}
              </p>
              <p
                style={{
                  fontFamily: "Inter",
                  fontWeight: 400,
                  color: "#64748B",
                  fontSize: 12,
                }}
                data-testid="product_asin"
              >
                <Link
                  data-testid="product_href"
                  href={`/advanced-business-report?level=child_asin&store=${store}&value=${product.asin}&start_date=${compareConditions.current.start_date}&end_date=${compareConditions.current.end_date}&periodicity=day&metrics=units,avg_price`}
                  sx={{
                    fontFamily: "Inter",
                    fontWeight: 600,
                    fontSize: 14,
                    textDecoration: "none",
                  }}
                >
                  ASIN:&nbsp;
                </Link>
                {product.asin?.substring(0, charMax)}
              </p>
            </div>
          </div>
        </TableCell>
        <TableCell
          sx={{
            fontFamily: "Inter",
            fontWeight: 600,
            color: "#475569",
            fontSize: 14,
          }}
        >
          {quantity3pl === undefined || quantity3pl === "" ? (
            <>N/A</>
          ) : (
            <>{quantity3pl}</>
          )}
        </TableCell>
        {/* <TableCell1
          quantity={quantityfba}
          available={quantityfbaAvailable}
          reserved={quantityfbaReserved}
          inbound={quantityfbaInbound}
        /> */}
        <TableCell
          sx={{
            fontFamily: "Inter",
            fontWeight: 300,
            color: "#475569",
            fontSize: 14,
          }}
        >
          {"Available "}
          <b>{quantityfbaAvailable}</b>
          <br />
          {"Reserved "}
          <b>{quantityfbaReserved}</b>
          <br />
          {"Inbound "}
          <b>{quantityfbaInbound}</b>
          <br />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0, borderBottom: 0 }} colSpan={12} />
      </TableRow>
    </>
  );
};

export { ProductRowCalculated, ProductRowAdvanced };
