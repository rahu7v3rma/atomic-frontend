import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import $ from "jquery";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import TransitionAlerts from "../../../../../components/alerts/TransitionAlert";
import { advanceBusinessReportSelector } from "../../../../../redux/slices/advance_business_report";
import { productDetailSelector } from "../../../../../redux/slices/product_detail";

import CompetitorsInput from "./competitorsInput";

const KeywordsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
`;

const KeywordsTitleContainer = styled(Box)`
  display: flex;
  align-items: center;
  margin: 20px;
`;

const KeywordsTitle = styled(Typography)`
  font: 600 18px "Inter", sans-serif;
  margin-left: 5px;
`;

const KeyIcon = styled.img`
  background-color: #0d9488;
  width: 24px;
  height: 24px;
  padding: 5px;
  border-radius: 4px;
`;

const DeleteRow = styled(DeleteIcon)`
  display: none;
  cursor: pointer;
`;

const TableContainer = styled(Box)`
  width: 100%;
  padding: 0 20px;
  margin: 10px 0;
  margin-bottom: 20px;
`;

const MainCard = styled(Card)`
  border: 1px solid #e2e8f0;
  margin-bottom: 20px;
  cursor: pointer;
`;

const CardContentHeader = styled(CardHeader)``;

const CollapseIconButton = styled(IconButton)``;

const CollapseCardContent = styled(CardContent)`
  height: 285px;
  position: relative;
  padding: 0 12px;
  &:last-child {
    paddingbottom: 0;
  }
`;

const DataGridWrapper = styled(DataGrid)`
  border: none;
  & .MuiDataGrid-virtualScrollerContent {
    padding-top: 58px;
  }
  & .MuiDataGrid-columnSeparator {
    visibility: hidden;
  }
  & .MuiDataGrid-columnHeaders {
    background-color: #f8fafc;
  }
  & .MuiDataGrid-columnHeaderTitle {
    font-size: 14px;
    font-family: "Inter", sans-serif;
    color: #8191a6;
    font-weight: 600;
  }
  & .id {
    font-size: 14px;
    font-family: "Inter", sans-serif;
  }
  & .asin {
    color: #3f97fe;
    font-size: 14px;
    font-family: "Inter", sans-serif;
    font-weight: 600;
  }
  & .productTitle,
  & .productBrand {
    color: #7e8999;
    font-size: 14px;
    font-family: "Inter", sans-serif;
  }
  & .add-competitors {
    padding: 0;
  }
  & .MuiDataGrid-cell {
    outline: none !important;
  }
`;

const EmptyTrackedMsg = styled.div`
  background-color: #fff;
  padding: 14px 0px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  font-weight: 600;
  font-size: 16px;
  text-align: center;
  font-family: "Inter";
  color: #64748f;
`;

const TitleBox = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const AddAsinWrapper = styled.div`
  width: 100%;
  height: 56px;
  position: absolute;
  top: 56px;
  z-index: 5;
  display: flex;
  padding-right: 24px;
`;

const AddAsinContainer = styled.div`
  background-color: white;
  border-bottom: 1px solid rgb(226, 232, 240);
  width: 100%;
  align-items: center;
  display: flex;
`;

const useStyles = makeStyles({
  multiLineEllipsis: {
    maxWidth: 600,
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": 1,
    "-webkit-box-orient": "vertical",
    marginBottom: "10px",
    fontWeight: 700,
  },
});
const Keywords = ({ asinList, removeASINItem, value }) => {
  const {
    createAsinDataErrorMessage,
    createAsinDataLoading,
    trackedASINsLoading,
    trackedASINsErrorMessage,
    createAsinData,
  } = useSelector(productDetailSelector);
  const { skuASINsList, skuASINsLoading } = useSelector(
    advanceBusinessReportSelector
  );
  const classes = useStyles();

  // set alert data
  const [alertData, setAlertData] = useState({
    errorAlert: false,
    successAlert: false,
    alreadyExist: false,
    messageSuccess: "",
    messageFailure: "",
    messageExist: "",
  });

  useEffect(() => {
    if (createAsinData !== null && createAsinData?.message !== null) {
      let initData = {
        errorAlert: false,
        successAlert: false,
        alreadyExist: false,
        messageSuccess: "",
        messageFailure: "",
        messageExist: "",
      };

      if (createAsinData?.data?.success?.length) {
        initData.successAlert = true;
        initData.messageSuccess = `${createAsinData?.data?.success?.join(
          ","
        )} tracked successfully`;
      }
      if (createAsinData?.data?.failure?.length) {
        initData.errorAlert = true;
        initData.messageFailure = `${createAsinData?.data?.failure?.join(
          ","
        )} failed to be tracked`;
      }
      if (createAsinData?.data?.errorMessage?.length) {
        initData.errorAlert = true;
        initData.messageFailure = `Tracking was unsuccessful due to an error`;
      }
      // if (createAsinData?.data?.tracked.length) {
      //   initData.alreadyExist = true;
      //   initData.messageExist = `${createAsinData?.data?.tracked.join(
      //     ","
      //   )} tracked`;
      // }
      setAlertData(initData);
    }
  }, [createAsinData]);

  const [openKey, setOpenKey] = useState();
  const handleToggle = (key) => setOpenKey(openKey !== key ? key : null);

  const columns = [
    {
      field: "asin",
      headerName: "ASIN",
      sortable: false,
      headerAlign: "left",
      align: "left",
      cellClassName: (params) =>
        params.row.id === rows.length ? "add-competitors" : "asin",
      width: 250,

      renderCell: (params) => {
        return params.row.id === rows.length ? (
          <>
            <CompetitorsInput
              store={value}
              parentAsin={params.row.parent_asin}
              openKey={openKey}
            />
          </>
        ) : (
          params.row?.asin
        );
      },
    },
    {
      field: "product_title",
      headerName: "Product Title",
      flex: 2,
      minWidth: 200,
      sortable: false,
      headerAlign: "left",
      align: "left",
      cellClassName: "productTitle",
      renderCell: (params) => params.row.productTitle,
    },
    {
      field: "brand",
      headerName: "Brand",
      sortable: false,
      flex: 1,
      headerAlign: "left",
      align: "left",
      cellClassName: "productBrand",
      renderCell: (params) => params.row.brand,
    },
    {
      field: "delete",
      headerName: "",
      sortable: false,
      headerAlign: "left",
      align: "left",
      type: "boolean",
      renderCell: (params) => {
        if (params.row.asin && params.row.product_title) {
          return (
            <DeleteRow
              onClick={() =>
                rowDeleteHandler(params.row?.asin, params.row.parent_asin)
              }
            />
          );
        }
        return "";
      },
      cellClassName: "delete-icon",
    },
  ];

  const newRow = {
    id: asinList.length === 0 ? 1 : asinList.length + 1,
    productTitle: "",
    asin: "+ Add Competitors",
    brand: "",
  };

  const rows = [newRow, ...asinList];

  const getFilteredRow = (asinList, current) => {
    const data = asinList.filter((el) => el.parent_asin === current);
    let newRowData = { ...newRow };
    newRowData["parent_asin"] = current;
    if (data.length > 0) {
      return [newRowData, ...data];
    } else {
      return [newRowData];
    }
  };

  function rowDeleteHandler(asin, parentAsin) {
    removeASINItem(asin, parentAsin);
  }

  const handleRowEnter = useCallback(
    (event) =>
      $(event.target).parent().find(".delete-icon svg").css("display", "block"),
    []
  );
  const handleRowLeave = useCallback(
    (event) =>
      $(event.target).parent().find(".delete-icon svg").css("display", "none"),
    []
  );
  useEffect(() => {
    if (createAsinDataErrorMessage !== null) {
      setAlertData({
        errorAlert: true,
        successAlert: false,
        alreadyExist: false,
        messageSuccess: "",
        messageFailure: createAsinDataErrorMessage,
        messageExist: "",
      });
    }
  }, [createAsinDataErrorMessage]);
  useEffect(() => {
    if (trackedASINsErrorMessage) {
      setAlertData({
        errorAlert: true,
        successAlert: false,
        alreadyExist: false,
        messageSuccess: "",
        messageFailure: trackedASINsErrorMessage,
        messageExist: "",
      });
    }
  }, [trackedASINsErrorMessage]);

  const showTitleWithSku = (productList) => {
    return (
      <TitleBox>
        <Tooltip title={productList.product_title}>
          <Typography
            className={classes.multiLineEllipsis}
            variant="h4"
            color="#376fd0"
          >
            {productList.product_title}
          </Typography>
        </Tooltip>
        <Typography sx={{ marginBottom: "10px" }} variant="h5" color="#6c7d91">
          ASIN: {productList.parent_asin}
        </Typography>
        <Typography variant="h5" color="#7f7f7f">
          SKU: {productList.sku}
        </Typography>
      </TitleBox>
    );
  };

  return (
    <>
      <KeywordsContainer>
        <KeywordsTitleContainer>
          <KeyIcon src="/assets/lockkey.png" />
          <KeywordsTitle>Tracked ASINs</KeywordsTitle>
        </KeywordsTitleContainer>
        <TableContainer>
          {trackedASINsLoading || skuASINsLoading || createAsinDataLoading ? (
            <>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <Skeleton
                  key={item}
                  width={"100%"}
                  sx={{ mt: 5 }}
                  variant="rectangular"
                  height={15}
                />
              ))}
            </>
          ) : (
            <>
              {skuASINsList?.product_details?.length > 0 ? (
                skuASINsList?.product_details?.map((el, index) => {
                  return (
                    <MainCard key={index}>
                      <CardContentHeader
                        onClick={() => handleToggle(el.parent_asin)}
                        title={showTitleWithSku(el)}
                        action={
                          <CollapseIconButton aria-label="expand" size="medium">
                            {openKey === el.parent_asin ? (
                              <KeyboardArrowUpIcon />
                            ) : (
                              <KeyboardArrowDownIcon />
                            )}
                          </CollapseIconButton>
                        }
                      />
                      <div>
                        <Collapse
                          in={openKey === el.parent_asin}
                          timeout="auto"
                          unmountOnExit
                        >
                          <CollapseCardContent>
                            <AddAsinWrapper>
                              <AddAsinContainer>
                                <CompetitorsInput
                                  store={value}
                                  parentAsin={el.parent_asin}
                                  openKey={openKey}
                                />
                              </AddAsinContainer>
                            </AddAsinWrapper>
                            <DataGridWrapper
                              rows={getFilteredRow(
                                asinList,
                                el.parent_asin
                              ).slice(1)}
                              columns={columns}
                              pageSize={5}
                              rowsPerPageOptions={[5]}
                              disableColumnMenu={true}
                              componentsProps={{
                                row: {
                                  onMouseEnter: handleRowEnter,
                                  onMouseLeave: handleRowLeave,
                                },
                              }}
                              getRowId={(row) => row?.asin || -1}
                            />
                          </CollapseCardContent>
                        </Collapse>
                      </div>
                    </MainCard>
                  );
                })
              ) : (
                <EmptyTrackedMsg>
                  {value === "all"
                    ? "Please select a store first!"
                    : "No Tracked ASINs available"}
                </EmptyTrackedMsg>
              )}
            </>
          )}
        </TableContainer>
      </KeywordsContainer>
      <TransitionAlerts alert={alertData} />
    </>
  );
};

export default Keywords;
