import moment from "moment";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { productDetailSelector } from "../../../../../redux/slices/product_detail";
import {
  fetchPerformanceData,
  // storeAnalyticsSelector,
} from "../../../../../redux/slices/store_analytics";
import PerformanceChart from "../StoreAnalysis/PerformanceChart";
import { ChartLoader } from "../chartloader";

import GoalsTable from "./GoalsTable";
import { performanceData } from "./store_planning";

const GoalsChartContainer = styled.div`
  margin-top: 15px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 24px;
`;

const StorePlanning = ({ value }) => {
  const dispatch = useDispatch();
  // const { storePerformanceData } = useSelector(storeAnalyticsSelector);
  // const { labels, actualData, forecastData, goalData } = storePerformanceData;

  let { goalsAndPlanningData, goalsAndPlanningLoading } = useSelector(
    productDetailSelector
  );

  var label = useMemo(
    () =>
      goalsAndPlanningData?.chart_data &&
      goalsAndPlanningData?.chart_data?.map((_el) => {
        return [
          moment(_el.date).format("dddd").charAt(0),
          moment(_el.date).format("DD"),
        ];
      }),
    [goalsAndPlanningData]
  );
  var actual = useMemo(
    () =>
      goalsAndPlanningData?.chart_data &&
      goalsAndPlanningData?.chart_data?.map((_el) => {
        return _el.daily_sales;
      }),
    [goalsAndPlanningData]
  );
  var forecast = useMemo(
    () =>
      goalsAndPlanningData?.chart_data &&
      goalsAndPlanningData?.chart_data?.map((_el) => {
        return _el.daily_goal;
      }),
    [goalsAndPlanningData]
  );
  var goal = useMemo(
    () =>
      goalsAndPlanningData?.chart_data &&
      goalsAndPlanningData?.chart_data?.map((_el) => {
        return _el.goal;
      }),
    [goalsAndPlanningData]
  );

  var aggregated_sales = useMemo(
    () =>
      goalsAndPlanningData?.chart_data &&
      goalsAndPlanningData?.chart_data?.map((_el) => {
        return _el.aggregated_sales;
      }),
    [goalsAndPlanningData]
  );

  useEffect(() => {
    dispatch(fetchPerformanceData(performanceData));
  }, [dispatch]);

  return (
    <React.Fragment>
      <GoalsTable value={value} />
      {goalsAndPlanningLoading ? (
        <GoalsChartContainer>
          <ChartLoader />
        </GoalsChartContainer>
      ) : (
        goalsAndPlanningData &&
        goalsAndPlanningData.store === value && (
          <PerformanceChart
            dates={label}
            actualData={actual}
            forecastData={forecast}
            goalData={goal}
            aggregated_sales={aggregated_sales}
            store={goalsAndPlanningData?.store}
            month={goalsAndPlanningData?.month}
            year={goalsAndPlanningData?.year}
          />
        )
      )}
    </React.Fragment>
  );
};

export default StorePlanning;
