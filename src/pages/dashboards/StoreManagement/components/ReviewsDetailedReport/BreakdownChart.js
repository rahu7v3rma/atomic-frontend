import { Tab, Tabs } from "@mui/material";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { isSameYear } from "date-fns";
import React, { useState } from "react";
import styled from "styled-components/macro";

import HorizontalBarChart from "../../../Default/HorizontalBarChart";

const Container = styled("div")`
  margin: 1.5em 0;
`;

const BreakDownChartContainer = styled("div")`
  position: relative;
  padding-top: 3.75em;
  margin-top: 1em;
`;

const TabContainer = styled(Tabs)`
  position: absolute;
  top: 0;
`;

const BreakdownChart = (props) => {
  const {
    data,
    title = "",
    sort = false,
    useNumericAgg = false,
    dataset_label = "Count",
  } = props;
  const [sortValue, setSortValue] = useState(0);
  const [startValue, setStartValue] = useState(new Date());
  const [endValue, setEndValue] = useState(new Date());

  const handleStartDateChange = (newValue) => {
    setStartValue(newValue);
  };

  const handleEndDateChange = (newValue) => {
    setEndValue(newValue);
  };

  const renderCustomInputs = () => {
    return sortValue === 3 ? (
      <Container>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Start Date"
            inputFormat="MM/dd/yyyy"
            value={startValue}
            onChange={handleStartDateChange}
            renderInput={(params) => <TextField size="small" {...params} />}
          />
          <DesktopDatePicker
            label="End Date"
            inputFormat="MM/dd/yyyy"
            value={endValue}
            onChange={handleEndDateChange}
            renderInput={(params) => <TextField size="small" {...params} />}
          />
        </LocalizationProvider>
      </Container>
    ) : (
      ""
    );
  };

  const sortedData = () => {
    switch (sortValue) {
      case 0:
        return data;
      // Year to date Reviews
      case 1:
        return data.filter((review) => {
          const reviewDate = new Date(review.date_utc);
          const currentDate = new Date();
          return isSameYear(reviewDate, currentDate);
        });
      // Last Year Reviews
      case 2:
        return data.filter((review) => {
          const reviewDate = new Date(review.date_utc);
          const currentDate = new Date();
          const diffTime = Math.abs(currentDate - reviewDate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 24));
          return diffDays <= 365;
        });
      // Custom Range of Reviews
      case 3:
        const result = data.filter((review) => {
          const reviewDate = new Date(review.date_utc);
          return reviewDate >= startValue && reviewDate <= endValue;
        });
        return result;
      default:
        return [];
    }
  };

  const countRatingInReviews = (data) => {
    const getValues = data.length
      ? data.map((review) => {
          return review.rating;
        })
      : [];

    const countFive = getValues.filter((rate) => rate === 5).length;
    const countFour = getValues.filter((rate) => rate === 4).length;
    const countThree = getValues.filter((rate) => rate === 3).length;
    const countTwo = getValues.filter((rate) => rate === 2).length;
    const countOne = getValues.filter((rate) => rate === 1).length;

    return [countFive, countFour, countThree, countTwo, countOne];
  };

  const yaxis_labels = [5, 4, 3, 2, 1];

  const getData = () => {
    return sort
      ? countRatingInReviews(sortedData())
      : useNumericAgg
      ? data
      : countRatingInReviews(data);
  };

  return (
    <BreakDownChartContainer>
      {sort ? (
        <TabContainer
          value={sortValue}
          indicatorColor="secondary"
          onChange={(e, value) => {
            setSortValue(value);
          }}
        >
          <Tab label="All" />
          <Tab label="YTD" />
          <Tab label="Last Year" />
          <Tab label="Custom Range" />
        </TabContainer>
      ) : (
        ""
      )}

      {renderCustomInputs()}

      <HorizontalBarChart
        data={getData()}
        sortValue={sortValue}
        title={title}
        dataset_label={dataset_label}
        yaxis_labels={yaxis_labels}
      />
    </BreakDownChartContainer>
  );
};

export default BreakdownChart;
