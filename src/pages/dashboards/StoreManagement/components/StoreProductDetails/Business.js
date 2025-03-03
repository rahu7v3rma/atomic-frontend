import { Box, Button, Link, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";

import {
  businessReportSelector,
  fetchBusinessReport,
} from "../../../../../redux/slices/business_report";
//import DatePicker from "../shared/Datepicker";
import { Report } from "../../constants";

import BusinessCard from "./BusinessCard";
import FunnelCharts from "./FunnelChart";

const Card = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background-color: #ffffff;
  padding: 24px 24px 40px;
`;

const Details = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
`;

const BtnText = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  color: #334155;
  margin-left: 9px;
`;

const AdvanceReportButton = styled(Button)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 16px;
  height: 40px;
  border: 2px solid #cbd5e1;
  border-radius: 10px;
  margin-left: 8px;
  margin-top: 4px;
  cursor: pointer;
  &&:hover {
    border-color: black;
    background-color: white;
  }
`;

const Chart = styled.div`
  /* transform: rotate(-90deg); */
  width: 100%;
  height: 150px;
`;

const ProductDetails = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
`;

const AdvanceSection = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  margin-bottom: 20px;
`;

const AdvancedReportLinkContainer = styled(Link)`
  && {
    text-decoration: none;
    cursor: pointer;
  }
`;

const AdvancedReportLink = ({
  content,
  sku,
  store,
  asin,
  childAsin,
  level1,
  startDate,
  endDate,
  compareStartDate,
  compareEndDate,
}) => (
  <>
    {!sku && !asin && !childAsin ? (
      <AdvancedReportLinkContainer
        href={`/advanced-business-report?store=${store}`}
      >
        <AdvanceReportButton>
          <BtnText>{content}</BtnText>
        </AdvanceReportButton>
      </AdvancedReportLinkContainer>
    ) : (
      <AdvancedReportLinkContainer
        href={`/advanced-business-report?store=${store}&sku=${sku}&asin=${asin}&child-asin=${childAsin}&level1=${level1}&start-date=${startDate}&end-date=${endDate}&comp-start-date=${compareStartDate}&comp-end-date=${compareEndDate}`}
      >
        <AdvanceReportButton>
          <BtnText>{content}</BtnText>
        </AdvanceReportButton>
      </AdvancedReportLinkContainer>
    )}
  </>
);
const Business = (props) => {
  const dispatch = useDispatch();
  const { businessReportData, businessReportLoading } = useSelector(
    businessReportSelector
  );

  //  const [startDate, setStartDate] = useState("");
  //  const [endDate, setEndDate] = useState("");
  //  const [compareStartDate, setCompareStartDate] = useState("");
  //  const [compareEndDate, setCompareEndDate] = useState("");
  const storeName = props?.store;
  const sku = props?.sku;
  const level1 = props?.level1;
  const asin = props?.asin;
  const child_asin = props?.childAsin;
  const startDate = props?.start_date;
  const endDate = props?.end_date;
  const compareStartDate = props?.compare_start_date;
  const compareEndDate = props?.compare_end_date;
  const [report, setReport] = useState(Report);

  useEffect(() => {
    if (asin !== "" || sku !== "" || child_asin !== "") {
      dispatch(
        fetchBusinessReport({
          store: storeName,
          sku: sku,
          asin: asin,
          child_asin: child_asin,
          start_date: startDate,
          end_date: endDate,
          compare_start_date: compareStartDate,
          compare_end_date: compareEndDate,
        })
      );
    }
  }, [
    dispatch,
    startDate,
    endDate,
    sku,
    compareStartDate,
    compareEndDate,
    asin,
    child_asin,
    storeName,
  ]);

  useEffect(() => {
    if (businessReportData && Object.keys(businessReportData).length) {
      const {
        page_views,
        buy_box_percentage,
        sessions,
        sessions_per_view_ratio,
        units_ordered,
        units_per_session_ratio,
        total_order_items,
        items_per_session_ratio,
        comparison,
      } = businessReportData;

      let data = [...Report];
      if (data.length) {
        data[0].value = page_views;
        data[0].percentvalue = buy_box_percentage;
        data[0].percentage = comparison.page_views;
        data[1].value = sessions;
        data[1].percentvalue = parseFloat(sessions_per_view_ratio) * 100;
        data[1].percentage = comparison.sessions;
        data[2].value = units_ordered;
        data[2].percentvalue = parseFloat(units_per_session_ratio) * 100;
        data[2].percentage = comparison.orders;
        data[2].sessionpercentage = comparison.units_per_session;
        data[3].value = total_order_items;
        data[3].percentvalue = parseFloat(items_per_session_ratio) * 100;
        data[3].percentage = comparison.items;
        data[3].sessionpercentage = comparison.item_per_session;

        setReport(data);
      }
    }
  }, [businessReportData]);

  //  const onDatesSelected = (
  //    startDate,
  //    endDate,
  //    comparedStartDate,
  //    comparedEndDate
  //  ) => {
  //    const payload = {
  //      start_date: startDate ? moment(startDate).format("YYYY-MM-DD") : "",
  //      end_date: endDate ? moment(endDate).format("YYYY-MM-DD") : "",
  //      compare_start_date: comparedStartDate
  //        ? moment(comparedStartDate).format("YYYY-MM-DD")
  //        : "",
  //      compare_end_date: comparedEndDate
  //        ? moment(comparedEndDate).format("YYYY-MM-DD")
  //        : "",
  //    };
  //
  //    setStartDate(payload["start_date"]);
  //    setEndDate(payload["end_date"]);
  //    setCompareStartDate(payload["compare_start_date"]);
  //    setCompareEndDate(payload["compare_end_date"]);
  //  };

  return (
    <React.Fragment>
      <ProductDetails>
        <Details>Business Report</Details>
      </ProductDetails>
      <Card>
        <AdvanceSection>
          <Box sx={{ display: "flex" }}>
            {/*<DatePicker
              title={"This Month"}
              pickerContainerStyle={{ width: "800px", left: "unset" }}
              onDatesSelected={onDatesSelected}
              defaultDates={{
                startDate,
                endDate,
                compareStartDate,
                compareEndDate,
              }}
            />*/}
            <AdvancedReportLink
              asin={asin}
              sku={sku}
              store={storeName}
              childAsin={child_asin}
              level1={level1}
              startDate={startDate}
              endDate={endDate}
              compareStartDate={compareStartDate}
              compareEndDate={compareEndDate}
              content="See advanced report"
            />
          </Box>
        </AdvanceSection>
        {businessReportLoading ? (
          <div>
            <>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <Skeleton
                  key={item}
                  width={"100%"}
                  sx={{ mt: 5, ml: 5 }}
                  variant="rectangular"
                  height={15}
                />
              ))}
            </>
          </div>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  position: "relative",
                }}
              >
                {report.map((item, index) => {
                  return (
                    <BusinessCard key={index} report={item} index={index} />
                  );
                })}
              </Box>

              <Chart>
                <FunnelCharts data={report} />
              </Chart>
            </Box>
          </>
        )}
      </Card>
    </React.Fragment>
  );
};

export default Business;
