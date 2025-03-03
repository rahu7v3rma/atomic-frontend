import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid, Snackbar } from "@mui/material";
import moment from "moment";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import ResultsContext from "../../../../../contexts/ResultsContext";
import {
  dismissNotifications,
  fetchNotifications,
  notificationsSelector,
} from "../../../../../redux/slices/notifications";
import {
  // fetchBusinessReport,
  // fetchAdsBusinessReport,
  fetchOrdersBusinessReport,
  fetchSalesBusinessReport,
  productDetailSelector,
} from "../../../../../redux/slices/product_detail";
import {
  clearStoreSalesChartData,
  fetchStoreSalesChartData,
  storeAnalyticsSelector,
} from "../../../../../redux/slices/store_analytics";
import LoaderDiv from "../../../../components/LoaderDiv";
import tooltipContent from "../../../../components/tooltips_content";
import { GetCalculatedReportsData, roundNumber } from "../../helpers";
import WeeklyInsights from "../WeeklyInsights";
import { ChartLoader } from "../chartloader";
import DatePicker from "../shared/DatePicker";

import DetailsCard from "./../shared/DetailsCard";
import Alerts from "./Alert";
import GoalsKpis from "./GoalsKpis";
import GraphCard from "./GraphCard";
import SummaryCard from "./SummaryCard";
import { LineChart } from "./chart";

const DateRangeWrapper = styled.div``;
const DateLabel = styled.div`
  margin-left: 15px;
  font-size: 15px;
  line-height: 15px;
  color: #808080;
  font-weight: 500;
`;

const Sales = styled.div`
  margin-left: 15px;
  font-size: 12px;
  line-height: 12px;
  margin-top: 15px;
  font-weight: 600;
`;
const GraphCardsContainer = styled(Box)`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin: 3% 0;
`;

const Title = styled.label`
  font-weight: 700;
  margin-bottom: 20px;
  font-size: 18px;
  margin: 10px 0;
`;

const DatePickerGrid = styled(Grid)`
  display: flex;
  justify-content: flex-end;
  align-self: flex-end;
`;

const useStyles = makeStyles({
  styleRangeButton: {
    justifyContent: "end",
  },
  gridStyle: {
    marginTop: "20px",
    marginBottom: "40px",
  },
  performanceStyle: {
    marginRight: "40px",
    position: "relative",
  },
});

function StoreAnalysis({ storeName }) {
  const { storeAnalyticsData } = useContext(ResultsContext);
  // const [timeRange, setTimeRange] = useState({});
  const dispatch = useDispatch();

  const {
    businessReportData,
    salesBusinessReportLoading,
    ordersBusinessReportLoading,
    // adsBusinessReportLoading,
  } = useSelector(productDetailSelector);

  const { notifications, notificationsLoading } = useSelector(
    notificationsSelector
  );

  const [startDate, setStartDate] = useState(
    moment().subtract(6, "days").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
  //  const [dateRange, setDateRange] = useState(
  //    `${moment(startDate).format("MMM DD YYYY")} - ${moment(endDate).format(
  //      "MMM DD YYYY"
  //    )}`
  //  );
  const [compareStartDate, setCompareStartDate] = useState(
    moment().subtract(6, "days").subtract(1, "years").format("YYYY-MM-DD")
  );
  const [compareEndDate, setCompareEndDate] = useState(
    moment().subtract(1, "years").format("YYYY-MM-DD")
  );

  const [calculatedReportsData, setCalculatedReportsData] = useState({});

  useEffect(() => {
    dispatch(
      fetchSalesBusinessReport({
        store: storeName,
        start_date: startDate,
        end_date: endDate,
        compare_start_date: compareStartDate,
        compare_end_date: compareEndDate,
      })
    );
    dispatch(
      fetchOrdersBusinessReport({
        store: storeName,
        start_date: startDate,
        end_date: endDate,
        compare_start_date: compareStartDate,
        compare_end_date: compareEndDate,
      })
    );
    // dispatch(
    //   fetchAdsBusinessReport({
    //     store: storeName,
    //     start_date: startDate,
    //     end_date: endDate,
    //     compare_start_date: compareStartDate,
    //     compare_end_date: compareEndDate,
    //   })
    // );
    dispatch(fetchNotifications({ store: storeName }));

    let salesChartDataDispatch = {
      store: storeName,
      start_date: startDate,
      end_date: endDate,
    };
    if (compareStartDate && compareEndDate) {
      salesChartDataDispatch = {
        ...salesChartDataDispatch,
        compare_start_date: compareStartDate,
        compare_end_date: compareEndDate,
      };
    }
    if (storeName !== "all") {
      dispatch(fetchStoreSalesChartData(salesChartDataDispatch));
    } else {
      dispatch(clearStoreSalesChartData());
    }
  }, [
    dispatch,
    startDate,
    endDate,
    compareStartDate,
    compareEndDate,
    storeName,
  ]);

  useEffect(() => {
    setCalculatedReportsData(GetCalculatedReportsData(businessReportData));
  }, [businessReportData]);

  // Graph cards
  const {
    storeSalesChartData,
    storeSalesChartLoading,
    weeklyInsightData,
    weeklyInsightLoading,
  } = useSelector(storeAnalyticsSelector);

  const graphDefaultMetrics = { sales: 0, units: 0, date_range: "" };
  const [chosenPeriod, setChoosenPeriod] = useState(graphDefaultMetrics);
  const [lastPeriod, setLastPeriod] = useState(graphDefaultMetrics);
  const [samePeriodLastYear, setSamePeriodLastYear] =
    useState(graphDefaultMetrics);
  useEffect(() => {
    if (storeSalesChartData?.middle_cards) {
      const { chosen_period, last_period, same_period_last_year } =
        storeSalesChartData.middle_cards;
      setChoosenPeriod(chosen_period);
      setLastPeriod(last_period);
      setSamePeriodLastYear(same_period_last_year);
    } else {
      setChoosenPeriod({ sales: 0, units: 0, date_range: "" });
      setLastPeriod({ sales: 0, units: 0, date_range: "" });
      setSamePeriodLastYear({ sales: 0, units: 0, date_range: "" });
    }
  }, [storeSalesChartData]);

  // alert notifications
  const [availableAlerts, setAvailableAlerts] = useState([]);
  useEffect(() => {
    const alerts = storeAnalyticsData.alerts || [];
    const availableAlerts = [];
    alerts.forEach((item) => {
      if (
        item.type === "Account deactivated" ||
        item.type === "Listing deactivated" ||
        item.type === "PPC credit card not working" ||
        item.type === "Out of stock" ||
        item.type === "Poor/very poor voice of the customer"
      ) {
        availableAlerts.push(item);
      }
    });
    setAvailableAlerts(availableAlerts);
  }, [storeAnalyticsData]);

  const [storeSelectAlert, setStoreSelectAlert] = useState(false);
  const onDatesSelected = useCallback(
    (startDate, endDate, comparedStartDate, comparedEndDate) => {
      if (storeName === "all") {
        setStoreSelectAlert(true);

        setTimeout(() => {
          setStoreSelectAlert(false);
        }, 2000);
      }

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

      // setTimeRange(payload);

      //setDateRange(
      //  `${moment(startDate).format("MMM DD YYYY")} - ${moment(endDate).format(
      //    "MMM DD YYYY"
      //  )}`
      //);

      if (payload["start_date"] && payload["end_date"]) {
        setStartDate(payload["start_date"]);
        setEndDate(payload["end_date"]);
      }
      setCompareStartDate(payload["compare_start_date"]);
      setCompareEndDate(payload["compare_end_date"]);
    },
    [storeName]
  );

  const classes = useStyles();

  // Dismiss single notification
  const dismissNotification = useCallback(
    (notification_id) => {
      dispatch(dismissNotifications({ notification_id }));
    },
    [dispatch]
  );

  // Dismiss All notifications
  const dismissAllNotification = useCallback(() => {
    dispatch(dismissNotifications({ storeName }));
  }, [dispatch, storeName]);

  return (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={storeSelectAlert}
        message="Please select a store first!"
      />
      <Grid container>
        <Grid item xs={6}>
          <GoalsKpis />
        </Grid>
        <DatePickerGrid item xs={6}>
          <DatePicker
            onDatesSelected={onDatesSelected}
            defaultDates={{
              startDate: new Date(startDate),
              endDate: new Date(endDate),
              compareStartDate: new Date(compareStartDate),
              compareEndDate: new Date(compareEndDate),
            }}
            defaultPreset={"Last 7 days"}
            disabled={
              storeSalesChartLoading ||
              salesBusinessReportLoading ||
              ordersBusinessReportLoading
            }
          />
        </DatePickerGrid>
      </Grid>
      {availableAlerts.map((item, key) => (
        <Alerts key={key} alertsDetails={item} />
      ))}
      <Grid className={classes.gridStyle} container spacing={0.5}>
        <Grid item xs={3}>
          <SummaryCard
            title="Sales"
            value={`$ ${roundNumber(calculatedReportsData.sumOfSales)}`}
            percentage={roundNumber(calculatedReportsData.salesComparison)}
            subTitleOne="Net profit ($)"
            totalValueOne={`$${Number(
              calculatedReportsData.netProfit
            ).toLocaleString()}`}
            subTitleTwo="Net margin (%)"
            totalValueTwo={`${Number(
              calculatedReportsData.netMargin
            ).toLocaleString()}%`}
            content={tooltipContent.store_management_dashboard.sales}
            showCollapseValueOne={true}
            isLoading={salesBusinessReportLoading}
            valueOneExpended={`Amazon:
            <br>
            <div style="display: flex">
              <div style="width: 100%">&nbsp;Revenue</div>
              <div>
              $${Number(calculatedReportsData.pnlRevenue).toLocaleString()}
              </div>
              <div style="text-align: right; width: 75px; font-size: 10px; font-style: italic;">
                (100%)&nbsp;&nbsp;
              </div>
            </div>
            <div style="display: flex">
              <div style="width: 100%">&nbsp;Ads</div>
              <div>
              -$${Number(calculatedReportsData.pnlPPCSpend).toLocaleString()}
              </div>
              <div style="text-align: right; width: 75px; font-size: 10px; font-style: italic;">&nbsp;(${
                Math.round(
                  (calculatedReportsData.pnlPPCSpend /
                    calculatedReportsData.pnlRevenue) *
                    100
                ) / 1
              }%)&nbsp;&nbsp;</div>
            </div>
            <div style="display: flex">
              <div style="width: 100%">&nbsp;Refunds</div>
              <div>
              -$${Number(calculatedReportsData.pnlRefundCost).toLocaleString()}
              </div>
              <div style="text-align: right; width: 75px; font-size: 10px; font-style: italic;">&nbsp;(${
                Math.round(
                  (calculatedReportsData.pnlRefundCost /
                    calculatedReportsData.pnlRevenue) *
                    100
                ) / 1
              }%)&nbsp;&nbsp;</div>
            </div>
            <div style="display: flex">
              <div style="width: 100%;">&nbsp;Promotions</div>
              <div>
              -$${Number(
                calculatedReportsData.pnlPromotionCost
              ).toLocaleString()}
              </div>
              <div style="text-align: right; width: 75px; font-size: 10px; font-style: italic;">&nbsp;(${
                Math.round(
                  (calculatedReportsData.pnlPromotionCost /
                    calculatedReportsData.pnlRevenue) *
                    100
                ) / 1
              }%)&nbsp;&nbsp;</div>
            </div>
            <div style="display: flex">
              <div style="width: 100%;">&nbsp;Extra Fees</div>
              <div>
              -$${Number(calculatedReportsData.pnlExtraFees).toLocaleString()}
              </div>
              <div style="text-align: right; width: 75px; font-size: 10px; font-style: italic;">&nbsp;(${
                Math.round(
                  (calculatedReportsData.pnlExtraFees /
                    calculatedReportsData.pnlRevenue) *
                    100
                ) / 1
              }%)&nbsp;&nbsp;</div>
            </div>
            <div style="display: flex">
              <div style="width: 100%;">&nbsp;Fees</div>
              <div>
              -$${Number(
                calculatedReportsData.pnlEstimatedFees
              ).toLocaleString()}
              </div>
              <div style="text-align: right; width: 75px; font-size: 10px; font-style: italic;">&nbsp;(${
                Math.round(
                  (calculatedReportsData.pnlEstimatedFees /
                    calculatedReportsData.pnlRevenue) *
                    100
                ) / 1
              }%)&nbsp;&nbsp;</div>
            </div>
            <div style="display: flex">
              <div style="width: 100%;">&nbsp;COGS</div>
              <div>
              -$${Number(calculatedReportsData.pnlCogs).toLocaleString()}
              </div>
              <div style="text-align: right; width: 75px; font-size: 10px; font-style: italic;">&nbsp;(${
                Math.round(
                  (calculatedReportsData.pnlCogs /
                    calculatedReportsData.pnlRevenue) *
                    100
                ) / 1
              }%)&nbsp;&nbsp;</div>
            </div>
            `}
          />
        </Grid>
        <Grid item xs={3}>
          <SummaryCard
            title="Orders"
            value={roundNumber(calculatedReportsData.sumOfOrders)}
            percentage={roundNumber(calculatedReportsData.ordersComparison)}
            // subTitleOne="Returns"
            // totalValueOne={`${Number(
            //   calculatedReportsData.returns
            // ).toLocaleString()}`}
            subTitleTwo="Units"
            totalValueTwo={`${Number(
              calculatedReportsData.units
            ).toLocaleString()}`}
            content={tooltipContent.store_management_dashboard.orders}
            strikeValueOne={!calculatedReportsData.returns}
            isLoading={ordersBusinessReportLoading}
          />
        </Grid>
        <Grid item xs={3}>
          <SummaryCard
            title="Conversion rate"
            value={roundNumber(calculatedReportsData.conversionRate) + "%"}
            percentage={roundNumber(
              calculatedReportsData.conversionRateComparison
            )}
            subTitleOne="Sessions"
            totalValueOne={`${Number(
              calculatedReportsData.sumOfSessions
            ).toLocaleString()}`}
            subTitleTwo="Page views"
            totalValueTwo={`${Number(
              calculatedReportsData.sumOfPageViews
            ).toLocaleString()}`}
            content={tooltipContent.store_management_dashboard.conversion_rate}
            isLoading={salesBusinessReportLoading}
          />
        </Grid>
        <Grid item xs={3}>
          <SummaryCard
            title="Ads spent"
            value={`$${roundNumber(calculatedReportsData.sumOfSpent)}`}
            percentage={roundNumber(calculatedReportsData.adsSpentComparison)}
            subTitleOne="Tacos"
            totalValueOne={`${Number(
              calculatedReportsData.tacos
            ).toLocaleString()}%`}
            subTitleTwo="ROAS"
            totalValueTwo={`${Number(
              calculatedReportsData.roas
            ).toLocaleString()}`}
            content={tooltipContent.store_management_dashboard.ads_spent}
            isLoading={salesBusinessReportLoading}
          />
        </Grid>
      </Grid>
      <>
        <div className={classes.performanceStyle}>
          <DateRangeWrapper>
            <DateLabel>
              {moment(startDate).format("MMM DD YYYY")} -{" "}
              {moment(endDate).format("MMM DD YYYY")}
            </DateLabel>
            <Sales>Sales($)</Sales>
          </DateRangeWrapper>
          {storeSalesChartLoading ? (
            <>
              <ChartLoader />
            </>
          ) : (
            <LineChart />
          )}
        </div>
        <GraphCardsContainer>
          <GraphCard
            title="Chosen Period"
            amount={Number(chosenPeriod.sales).toLocaleString()}
            units={chosenPeriod.units}
            accentColor="#3F73E5"
            active="true"
            date={chosenPeriod.date_range}
            isLoading={storeSalesChartLoading}
          />
          <GraphCard
            title="Last Period"
            amount={Number(lastPeriod.sales).toLocaleString()}
            units={lastPeriod.units}
            accentColor="#A855F7"
            date={lastPeriod.date_range}
            isLoading={storeSalesChartLoading}
          />
          <GraphCard
            title="Same Period Last Year"
            amount={Number(samePeriodLastYear.sales).toLocaleString()}
            units={samePeriodLastYear.units}
            accentColor="#F59E0B"
            date={samePeriodLastYear.date_range}
            isLoading={storeSalesChartLoading}
          />
        </GraphCardsContainer>
      </>
      <Grid className={classes.gridStyle} container spacing={2}>
        <Grid item xs={6}>
          <DetailsCard
            title="Listings"
            firstWarningTitle="Listings require attention"
            firstWarningValue={`${notifications.length} Notifications`}
            firstWarningDetails={`${notifications.length} Notifications`}
            isLoading={notificationsLoading}
            dismissNotification={dismissNotification}
            secondRowShow={false}
            notifications={notifications}
            // secondWarningTitle="Listings performing poor details"
            // secondWarningValue="2 listings worse than average"
            // secondWarningDetails="2 listings worse than average details"
            dismissAllNotification={dismissAllNotification}
          />
        </Grid>
      </Grid>
      <Title>Weekly Insights</Title>
      {weeklyInsightLoading ? (
        <div style={{ margin: "auto" }}>
          <LoaderDiv loaderHeight="50vh" />
        </div>
      ) : (
        <WeeklyInsights weeklyInsightData={weeklyInsightData || []} />
      )}
    </React.Fragment>
  );
}

export default StoreAnalysis;
