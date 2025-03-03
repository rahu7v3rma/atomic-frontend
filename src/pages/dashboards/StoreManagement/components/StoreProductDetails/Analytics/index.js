import { Box, Grid, Skeleton, Stack, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "@fontsource/inter";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import {
  fetchOrdersBusinessReport,
  fetchSalesBusinessReport,
  fetchSkuSalesChartData,
  productDetailSelector,
} from "../../../../../../redux/slices/product_detail";
import tooltipContent from "../../../../../components/tooltips_content";
import { Gap } from "../../ProductSKUDashboard/styles";
import Business from "../../StoreProductDetails/Business";
import { ChartLoader } from "../../chartloader";
import DatePicker from "../../shared/DatePicker";

import { LineChart } from "./chart";
import { SectionFirstCard, SectionLastCard } from "./components";
import s, { DatePickerGrid } from "./styles";

// import { Line } from "react-chartjs-2";

function AnalyticsStoreProductDetails(props) {
  const dispatch = useDispatch();
  // const [timeRange, setTimeRange] = React.useState({});
  const {
    businessReportData,
    businessReportLoading,
    ordersBusinessReportLoading,
    salesBusinessReportLoading,
  } = useSelector(productDetailSelector);
  const { skuSalesChartData, skuSalesChartLoading } = useSelector(
    productDetailSelector
  );
  const middleCardsData = skuSalesChartData.middle_cards;
  const [startDate, setStartDate] = useState(
    moment().subtract(6, "days").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
  const [compareStartDate, setCompareStartDate] = useState(
    moment(startDate).subtract(1, "year").format("YYYY-MM-DD")
  );
  const [compareEndDate, setCompareEndDate] = useState(
    moment(endDate).subtract(1, "year").format("YYYY-MM-DD")
  );
  const storeName = props?.store;
  const sku = props?.sku;
  const asin = props?.asin;
  const name = props?.name;
  const child_asin = props?.childAsin;

  const [ChoosenPeriod, setChoosenPeriod] = useState({});
  const [LastPeriod, setLastPeriod] = useState({});
  const [SamePeriodLastYear, setSamePeriodLastYear] = useState({});

  //  const [dateRange, setDateRange] = useState(
  //    `${moment(startDate).format("MMM DD YYYY")} - ${moment(endDate).format(
  //      "MMM DD YYYY"
  //    )}`
  //  );
  const [calculatedReportsData, setCalculatedReportsData] = useState({});

  const onDatesSelected = (
    startDate,
    endDate,
    comparedStartDate,
    comparedEndDate
  ) => {
    const payload = {
      start_date: startDate ? moment(startDate).format("YYYY-MM-DD") : "",
      end_date: endDate ? moment(endDate).format("YYYY-MM-DD") : "",
      compare_start_date: comparedStartDate
        ? moment(comparedStartDate).format("YYYY-MM-DD")
        : "",
      compare_end_date: comparedEndDate
        ? moment(comparedEndDate).format("YYYY-MM-DD")
        : "",
    };

    //setDateRange(
    //  `${moment(startDate).format("MMM DD YYYY")} - ${moment(endDate).format(
    //    "MMM DD YYYY"
    //  )}`
    //);

    setStartDate(payload["start_date"]);
    setEndDate(payload["end_date"]);
    setCompareStartDate(payload["compare_start_date"]);
    setCompareEndDate(payload["compare_end_date"]);
  };

  useEffect(() => {
    if (sku !== "" || asin !== "" || child_asin !== "") {
      dispatch(
        fetchSalesBusinessReport({
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
      dispatch(
        fetchOrdersBusinessReport({
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
      // dispatch(
      //   fetchAdsBusinessReport({
      //     store: storeName,
      //     sku: sku,
      //     asin: asin,
      //     child_asin: child_asin,
      //     start_date: startDate,
      //     end_date: endDate,
      //     compare_start_date: compareStartDate,
      //     compare_end_date: compareEndDate,
      //   })
      // );
      dispatch(
        fetchSkuSalesChartData({
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
    compareStartDate,
    compareEndDate,
    sku,
    asin,
    child_asin,
    storeName,
  ]);

  useEffect(() => {
    let choosenPeriodSales = 0;
    let choosenPeriodUnits = 0;
    let lastPeriodSales = 0;
    let lastPeriodUnits = 0;
    let samePeriodLastYearSales = 0;
    let samePeriodLastYearUnits = 0;

    if (skuSalesChartData.hasOwnProperty("middle_cards")) {
      choosenPeriodSales =
        skuSalesChartData["middle_cards"]["chosen_period"]["sales"];
      choosenPeriodUnits =
        skuSalesChartData["middle_cards"]["chosen_period"]["units"];
      lastPeriodSales =
        skuSalesChartData["middle_cards"]["last_period"]["sales"];
      lastPeriodUnits =
        skuSalesChartData["middle_cards"]["last_period"]["units"];
      samePeriodLastYearSales =
        skuSalesChartData["middle_cards"]["same_period_last_year"]["sales"];
      samePeriodLastYearUnits =
        skuSalesChartData["middle_cards"]["same_period_last_year"]["units"];
    }

    setChoosenPeriod({
      choosenPeriodSales,
      choosenPeriodUnits,
    });
    setLastPeriod({
      lastPeriodSales,
      lastPeriodUnits,
    });
    setSamePeriodLastYear({
      samePeriodLastYearSales,
      samePeriodLastYearUnits,
    });
  }, [skuSalesChartData]);

  useEffect(() => {
    let sumOfSales = 0;
    let salesComparison = 0;
    let salesChange = false;
    let netProfit = 0;
    let netMargin = 0;

    let sumOfOrders = 0;
    let ordersComparison = 0;
    let ordersChange = false;
    let returns = 0;
    let units = 0;

    let conversionRate = 0;
    let conversionRateComparison = 0;
    let conversionChange = false;
    let sumOfPageViews = 0;
    let sumOfSessions = 0;

    let sumOfSpent = 0;
    let avgConversionRate = 0;
    let adsSpentComparison = 0;
    let tacos = 0;
    let roas = 0;
    let acos = 0;
    let avg_cpc = 0;
    let spentChange = false;

    if (businessReportData.hasOwnProperty("sales")) {
      sumOfSales = businessReportData["sales"]["sum"];
      salesComparison =
        businessReportData["sales"]["selected_period_comparison"];
      salesChange = salesComparison < 0;
      netProfit = businessReportData["sales"]["net_profit"];
      netMargin = businessReportData["sales"]["net_margin"];
    }
    if (businessReportData.hasOwnProperty("orders")) {
      sumOfOrders = businessReportData["orders"]["sum"];
      ordersComparison =
        businessReportData["orders"]["selected_period_comparison"];
      ordersChange = ordersComparison < 0;
      units = businessReportData["orders"]["units"];
    }
    if (businessReportData.hasOwnProperty("conversion_rate")) {
      conversionRate = businessReportData["conversion_rate"]["sum"];
      conversionRateComparison =
        businessReportData["conversion_rate"]["selected_period_comparison"];
      conversionChange = conversionRateComparison < 0;
      sumOfSessions = businessReportData["conversion_rate"]["sessions"];
      sumOfPageViews = businessReportData["conversion_rate"]["page_views"];
    }
    if (businessReportData.hasOwnProperty("ads_spent")) {
      sumOfSpent = businessReportData["ads_spent"]["sum"];
      adsSpentComparison =
        businessReportData["ads_spent"]["selected_period_comparison"];
      avgConversionRate =
        businessReportData["ads_spent"]["avg_conversion_rate"];
      tacos = businessReportData["ads_spent"]["tacos"];
      roas = businessReportData["ads_spent"]["roas"];
      acos = businessReportData["ads_spent"]["acos"];
      avg_cpc = businessReportData["ads_spent"]["avg_cpc"];
      spentChange = avgConversionRate < 0;
    }

    setCalculatedReportsData({
      sumOfSales,
      salesComparison,
      salesChange,
      netProfit,
      netMargin,
      sumOfOrders,
      ordersChange,
      ordersComparison,
      returns,
      units,
      conversionRate,
      conversionRateComparison,
      conversionChange,
      sumOfSessions,
      sumOfPageViews,
      sumOfSpent,
      adsSpentComparison,
      avgConversionRate,
      tacos,
      roas,
      acos,
      avg_cpc,
      spentChange,
    });
  }, [businessReportData]);

  return (
    <div style={{ width: "100%" }}>
      <Grid container spacing={0.5}>
        <Grid item xs={1}>
          <Typography
            sx={{ ...s.inter({ s: 24, w: 600, c: "#0F172A" }) }}
            data-testid="heading"
          >
            Analytics
          </Typography>
        </Grid>
        <DatePickerGrid item xs={11}>
          <DatePicker
            onDatesSelected={onDatesSelected}
            defaultDates={{
              startDate: new Date(startDate),
              endDate: new Date(endDate),
              compareStartDate: new Date(compareStartDate),
              compareEndDate: new Date(compareEndDate),
            }}
            defaultPreset={"Last 7 days"}
            disabled={skuSalesChartLoading || businessReportLoading}
          />
        </DatePickerGrid>
      </Grid>
      <Box
        sx={{
          backgroundColor: "white",
          mt: 4,
          p: 6,
          pb: 10,
          borderRadius: 2.5,
          border: "1px solid #E2E8F0",
          width: "100%",
        }}
      >
        {businessReportLoading ? (
          <>
            {[1, 2, 3, 4, 5].map((item) => (
              <Skeleton
                key={item}
                width={"95%"}
                sx={{ mt: 5, ml: 5 }}
                variant="rectangular"
                height={15}
              />
            ))}
          </>
        ) : (
          <>
            <Box sx={{ marginTop: 1 }}>
              {/* Section First Cards */}
              <Box sx={s.flex({ j: "space-between" })}>
                <SectionFirstCard
                  e1="Sales"
                  e2={`$${Number(
                    calculatedReportsData.sumOfSales
                  ).toLocaleString()}`}
                  e3={`${Number(
                    calculatedReportsData.salesComparison
                  ).toLocaleString()}%`}
                  e4="Net profit"
                  e5={`$${Number(
                    calculatedReportsData.netProfit
                  ).toLocaleString()}`}
                  // strikeE5={!calculatedReportsData.netProfit}
                  e6="Net margin"
                  e7={`${Number(
                    calculatedReportsData.netMargin
                  ).toLocaleString()}%`}
                  // strikeE7={!calculatedReportsData.netMargin}
                  c1="#84CC16"
                  active={true}
                  decrease={calculatedReportsData.salesChange}
                  content={tooltipContent.store_management_dashboard.sales}
                  isLoading={salesBusinessReportLoading}
                />
                <SectionFirstCard
                  e1="Orders"
                  e2={`${Number(
                    calculatedReportsData.sumOfOrders
                  ).toLocaleString()}`}
                  e3={`${Number(
                    calculatedReportsData.ordersComparison
                  ).toLocaleString()}%`}
                  e4="Returns"
                  e5={`${Number(
                    calculatedReportsData.returns
                  ).toLocaleString()}`}
                  strikeE5={!calculatedReportsData.returns}
                  e6="Units"
                  e7={`${Number(calculatedReportsData.units).toLocaleString()}`}
                  c1="#06B6D4"
                  decrease={calculatedReportsData.ordersChange}
                  content={tooltipContent.store_management_dashboard.orders}
                  isLoading={ordersBusinessReportLoading}
                />
                <SectionFirstCard
                  e1="Conversion Rate"
                  e2={`${Number(
                    calculatedReportsData.conversionRate
                  ).toLocaleString()}%`}
                  e3={`${Number(
                    calculatedReportsData.conversionRateComparison
                  ).toLocaleString()}%`}
                  e4="Sessions"
                  e5={`${Number(
                    calculatedReportsData.sumOfSessions
                  ).toLocaleString()}`}
                  e6="Page Views"
                  e7={`${Number(
                    calculatedReportsData.sumOfPageViews
                  ).toLocaleString()}`}
                  c1="#14B8A6"
                  decrease={calculatedReportsData.conversionChange}
                  content={
                    tooltipContent.store_management_dashboard.conversion_rate
                  }
                  isLoading={salesBusinessReportLoading}
                />
                <SectionFirstCard
                  e1="Ads Spent"
                  e2={`$${Number(
                    calculatedReportsData.sumOfSpent
                  ).toLocaleString()}`}
                  strikeE2={!calculatedReportsData.sumOfSpent}
                  e3={`${Number(
                    calculatedReportsData.adsSpentComparison
                  ).toLocaleString()}%`}
                  strikeE3={!calculatedReportsData.avgConversionRate}
                  e4="Tacos"
                  e5={`${Number(
                    calculatedReportsData.tacos
                  ).toLocaleString()}%`}
                  strikeE5={!calculatedReportsData.tacos}
                  e6="ROAS"
                  e7={`${Number(calculatedReportsData.roas).toLocaleString()}`}
                  strikeE7={!calculatedReportsData.roas}
                  c1="#6366F1"
                  decrease={calculatedReportsData.spentChange}
                  content={tooltipContent.store_management_dashboard.ads_spent}
                  isLoading={salesBusinessReportLoading}
                />
              </Box>
            </Box>
          </>
        )}

        {skuSalesChartLoading ? (
          <>
            <ChartLoader />
          </>
        ) : (
          <>
            <Box sx={{ ...s.flex({ d: "row", j: "space-between" }), mt: 10 }}>
              {/* Chart above date */}
              <Typography
                sx={{
                  ...s.inter({ s: 14, c: "#64748B" }),
                  ...s.flex({ d: "row", a: "center" }),
                }}
              >
                {moment(startDate).format("MMM DD YYYY")} -{" "}
                {moment(endDate).format("MMM DD YYYY")}
              </Typography>
              <Box sx={s.flex({ d: "row", a: "center" })}>
                <Stack
                  sx={{ ...s.flex({ d: "row", a: "center" }), marginRight: 2 }}
                >
                  <hr
                    style={{
                      borderTop: "4px solid #3F73E5",
                      width: 15,
                      marginRight: 10,
                      borderRadius: 15,
                    }}
                    data-testid="chartLineIdentifierIcon1"
                  />
                  <Typography sx={s.inter({ s: 14, c: "#475569" })}>
                    Current Sales
                  </Typography>
                </Stack>
                <Stack sx={s.flex({ d: "row", a: "center" })}>
                  <hr
                    style={{
                      borderTop: "4px dotted #14B8A6",
                      width: 15,
                      marginRight: 10,
                    }}
                    data-testid="chartLineIdentifierIcon2"
                  />
                  <Typography sx={s.inter({ s: 14, c: "#475569" })}>
                    Compared Period Sales
                  </Typography>
                </Stack>
              </Box>
            </Box>
            <Box sx={{ mt: 5, mb: -2, ...s.flex({ d: "row", j: "center" }) }}>
              <Box
                sx={{
                  ...s.flex({ d: "row", j: "space-between" }),
                  width: "99%",
                }}
              >
                <Typography
                  sx={{
                    ...s.inter({ s: 12, w: 600, c: "#14B8A6" }),
                    zIndex: 2,
                  }}
                >
                  Sales($)
                </Typography>
              </Box>
            </Box>
            <Box sx={{ position: "relative", mt: 2 }}>
              <Typography
                sx={{
                  height: 24,
                  position: "absolute",
                  zIndex: 1,
                  backgroundColor: "white",
                  width: "70%",
                }}
              />
              {/* Chart */}
              <LineChart />
            </Box>
            <Box sx={{ mt: 5 }}>
              {/* Festivals section */}
              <Box
                sx={{ position: "relative", left: 32, ...s.flex({ d: "row" }) }}
              >
                {/* <Typography
                  sx={{
                    ...s.inter({ s: 12, w: 500, c: "#475569" }),
                    width: "31%",
                    backgroundColor: "#F1F5F9",
                    textAlign: "center",
                    height: 35,
                    borderRadius: 4,
                    ...s.flex({ d: "row", j: "center", a: "center" }),
                  }}
                >
                  Black Friday
                </Typography>
                <Typography
                  sx={{
                    width: "28%",
                    ...s.inter({ s: 12, w: 500, c: "#475569" }),
                    backgroundColor: "#F1F5F9",
                    textAlign: "center",
                    marginLeft: 10,
                    height: 35,
                    borderRadius: 4,
                    ...s.flex({ d: "row", j: "center", a: "center" }),
                  }}
                >
                  Valentines
                </Typography> */}
              </Box>
            </Box>
            <Box sx={{ marginTop: 5 }}>
              {/* Section last cards */}
              <Box
                sx={{
                  position: "relative",
                  ...s.flex({ d: "row", j: "space-between" }),
                  marginX: "2%",
                }}
              >
                <SectionLastCard
                  e1="Choosen Period"
                  e2={`$${Number(
                    ChoosenPeriod.choosenPeriodSales
                  ).toLocaleString()}`}
                  e3={`${ChoosenPeriod.choosenPeriodUnits} units`}
                  c1="#3F73E5"
                  active={true}
                  date={middleCardsData?.chosen_period?.date_range}
                />
                <SectionLastCard
                  e1="Last Period"
                  e2={`$${Number(LastPeriod.lastPeriodSales).toLocaleString()}`}
                  e3={`${LastPeriod.lastPeriodUnits} units`}
                  c1="#A855F7"
                  date={middleCardsData?.last_period?.date_range}
                />
                <SectionLastCard
                  e1="Same Period Last Year"
                  e2={`$${Number(
                    SamePeriodLastYear.samePeriodLastYearSales
                  ).toLocaleString()}`}
                  e3={`${SamePeriodLastYear.samePeriodLastYearUnits} units`}
                  c1="#F59E0B"
                  date={middleCardsData?.same_period_last_year?.date_range}
                />
              </Box>
            </Box>
          </>
        )}
      </Box>
      <Gap height={40} />
      <Business
        store={storeName}
        name={name}
        asin={asin}
        childAsin={child_asin}
        sku={sku}
        start_date={startDate}
        end_date={endDate}
        compare_start_date={compareStartDate}
        compare_end_date={compareEndDate}
        level1={props.level1}
      />
    </div>
  );
}

export default AnalyticsStoreProductDetails;
