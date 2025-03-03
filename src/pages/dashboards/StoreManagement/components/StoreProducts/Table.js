import InfoIcon from "@mui/icons-material/Info";
import { Box, Skeleton, Tooltip, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import "@fontsource/inter";
import "@fontsource/inter/600.css";

import {
  fetchProductList,
  storeAnalyticsSelector,
} from "../../../../../redux/slices/store_analytics";
import tooltipContent from "../../../../components/tooltips_content";
import {
  sortAvailableFor,
  sortAvailableType,
  storeNames,
} from "../../constants";

import { ProductRowAdvanced, ProductRowCalculated } from "./TableRow";
import { SortIcon } from "./components";
import { handleSort } from "./helpers";
import {
  ColumnTitle,
  EmptyProductListMsg,
  LastUpdatedText,
  ProductHeader,
  ProductImage,
  ProductTitle,
  TableStyled,
} from "./styles";

const TableCustom = ({ style, value }) => {
  const stores = useMemo(() => storeNames, []);
  const [lastFetchedProduct, setLastFetchedProduct] = useState(null);

  var columns = ["Product", "3PL Quantity", "FBA Quantity"];

  if (stores.find((store) => store.value === value)) {
    columns.push(
      ...[
        "1 Month Forecast",
        "3 Months Forecast",
        "6 Months Forecast",
        "Days of Supply",
      ]
    );
  }

  const dispatch = useDispatch();

  const { productListData, productListLoading } = useSelector(
    storeAnalyticsSelector
  );

  const [productsList, setProductsList] = useState([]);
  const [csv_headers, setCsv_headers] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const return_csv_data = useCallback(() => {
    try {
      const keysToRemove = [
        "fba_report_working",
        "fba_report_receiving",
        "fba_report_shipped",
        "fba_report_available",
      ];
      const prioritizedValues = ["sku", "store", "name"];
      const data = productsList.map((item) => {
        const keys = Object.keys(item);

        const orderedKeys = keys.sort((a, b) =>
          prioritizedValues.includes(a)
            ? -1
            : prioritizedValues.includes(b)
            ? 1
            : 0
        );
        const newItem = {};
        orderedKeys.forEach((key) => {
          if (
            key === "3pl" ||
            key === "conversion_rate" ||
            key === "fba_report" ||
            key === "sales_velocity" ||
            key === "sales"
          ) {
            for (const k in item[key]) {
              if (item[key].hasOwnProperty(k)) {
                newItem[`${key}_${k}`] = item[key][k];
              }

              if (key === "3pl") {
                keysToRemove.forEach((key) => {
                  if (newItem.hasOwnProperty(key)) {
                    delete newItem[key];
                  }
                });
              }
            }
          } else {
            if (key === "name") {
              newItem[key] = item[key]?.replace(/"/g, "'");
            } else {
              newItem[key] = item[key];
            }
          }
        });
        return newItem;
      });
      keysToRemove.forEach((key) => {
        if (data.hasOwnProperty(key)) {
          delete myObject[key];
        }
      });
      setCsvData(data);
      const headers = Object.keys(data[0]);
      setCsv_headers(headers);
    } catch (error) {
      setCsvData([]);
      setCsv_headers([]);
    }
  }, [productsList]);

  const showLastUpdateDate = (e) => {
    let columnName = null;
    if (productsList.length > 0) {
      if (e === "FBA Quantity") {
        columnName = "fba_report";
      } else if (e === "3PL Quantity") {
        columnName = "3pl";
      }
    }
    let lastUpdated = null;
    if (columnName) {
      lastUpdated =
        "Last updated on " + productsList[0][columnName]?.last_updated;
    }
    return lastUpdated;
  };

  useEffect(() => {
    if (value !== "all" && stores.find((store) => store.value === value)) {
      dispatch(
        fetchProductList({
          store: value,
          // duration: compareConditions.duration,
          // compare: compareConditions.compare,
        })
      );
    } else {
      if (typeof value === "object") {
        console.log(
          "single product " + value.product?.id_type + ": " + value.product?.id
        );
        if (
          !value.product ||
          (value.product && value.product.id.includes("Select"))
        ) {
          setProductsList([]);
        } else if (
          JSON.stringify(value.product) !== JSON.stringify(lastFetchedProduct)
        ) {
          setLastFetchedProduct(value.product);
          dispatch(
            fetchProductList({
              duration: value.current,
              compare: value.compare,
              store: value.store,
              product: value.product,
            })
          );
        }
      }
    }
  }, [value, lastFetchedProduct, stores, dispatch]); // table rerender on compare conditions change

  useEffect(() => {
    if (Object.keys(productListData).length > 0) {
      const list = [];
      Object.keys(productListData).forEach((sku) => {
        const prodDetail = productListData[sku];
        const sales = prodDetail.sales;
        const totalSales = sales
          ? Object.values(sales).reduce((a, b) => a + b, 0)
          : 0;
        list.push({
          ...prodDetail,
          sku,
          salesVolume: totalSales,
        });
      });

      const sortedList = list.sort(
        (a, b) =>
          sortAvailableFor["1 Month Forecast"](b) -
          sortAvailableFor["1 Month Forecast"](a)
      );
      setProductsList(sortedList);
    } else {
      setProductsList([]);
    }
  }, [productListData]);

  const [sortBy, setSortBy] = useState("1 Month Forecast");
  const [sortType, setSortType] = useState(sortAvailableType);

  return (
    <React.Fragment>
      <ProductHeader>
        {typeof value === "object" ? (
          <div style={{ marginTop: 0 }} />
        ) : (
          <React.Fragment>
            <ProductTitle>Product List</ProductTitle>
            <ProductImage.Container disabled={productListLoading}>
              {productListLoading || value === "all" ? (
                <>
                  <ProductImage.Icon disabled={productListLoading} />
                  <ProductImage.Text disabled={productListLoading}>
                    Download
                  </ProductImage.Text>
                </>
              ) : (
                <>
                  <ProductImage.Icon disabled={productListLoading} />
                  <CSVLink
                    onClick={return_csv_data}
                    data={csvData || []}
                    filename={`${value}_products.csv`}
                    headers={csv_headers}
                  >
                    <ProductImage.Text disabled={productListLoading}>
                      Download
                    </ProductImage.Text>
                  </CSVLink>
                </>
              )}
            </ProductImage.Container>
          </React.Fragment>
        )}
      </ProductHeader>
      <TableStyled style={style} component={Paper}>
        {productListLoading ? (
          <>
            {[1, 2, 3, 4, 5].map((item) => (
              <Skeleton
                key={item}
                width={"97%"}
                sx={{ mt: 5, ml: 5 }}
                variant="rectangular"
                height={15}
              />
            ))}
          </>
        ) : (
          <Table>
            {/* table headers */}
            <TableHead>
              <TableRow>
                {columns.map((e, i) => (
                  <TableCell
                    key={i}
                    style={{
                      padding: "13px",
                      whiteSpace: "nowrap",
                      borderLeft:
                        e === "Conversion Rate" && "1px solid #e0e0e0",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "Inter",
                        fontWeight: 600,
                        color: "#64748B",
                        position: "relative",
                      }}
                      data-testid="table_header"
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        {sortBy === e && <SortIcon sortType={sortType[e]} />}
                        <ColumnTitle
                          onClick={() =>
                            handleSort({
                              columnTitle: e,
                              productsList,
                              setProductsList,
                              setSortBy,
                              sortType: sortType[e],
                              sortTypeState: sortType,
                              setSortType,
                            })
                          }
                        >
                          {e}
                        </ColumnTitle>
                        {e !== "Product" && (
                          <Tooltip
                            placement="right"
                            arrow
                            title={
                              <Box
                                sx={{
                                  fontFamily: "Inter",
                                  fontWeight: 400,
                                  fontSize: 12,
                                  width: "185px",
                                }}
                                data-testid="2nd_3rd_column_tooltip_menu"
                              >
                                <Typography>
                                  {tooltipContent.store_management_product_list.hasOwnProperty(
                                    e
                                  ) &&
                                    tooltipContent
                                      .store_management_product_list[e]}
                                </Typography>
                              </Box>
                            }
                          >
                            <InfoIcon
                              sx={{
                                width: "15px",
                                height: "15px",
                                color: "#CBD5E1",
                                // marginRight: "20px",
                              }}
                              data-testid="2nd_3rd_columns_tooltip"
                            />
                          </Tooltip>
                        )}
                      </div>
                      <LastUpdatedText>
                        {showLastUpdateDate(e) ? showLastUpdateDate(e) : <br />}
                      </LastUpdatedText>
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {/* table body products - productListData */}
            {productsList.length !== 0 ? (
              <TableBody>
                {productsList.map((product, index) =>
                  typeof value === "object" ? (
                    <ProductRowAdvanced
                      key={index}
                      store={value.store}
                      sku={product.sku}
                      product={product}
                      compareConditions={value}
                    />
                  ) : (
                    <ProductRowCalculated
                      key={index}
                      store={value}
                      sku={product.sku}
                      product={product}
                    />
                  )
                )}
              </TableBody>
            ) : null}
          </Table>
        )}

        {!productListLoading && productsList.length === 0 && (
          <EmptyProductListMsg>
            {value === "all"
              ? "Please select a store first!"
              : "No products available"}
          </EmptyProductListMsg>
        )}
      </TableStyled>
    </React.Fragment>
  );
};

export default TableCustom;
