import { capitalize } from "@mui/material";
import React from "react";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
`;

const SelectionLabel = styled.div`
  margin-top: 15px;
  line-height: 15px;
  color: #808080;
  font-weight: 500;
  fontsize: "16px";
`;

const GoalsChartContainer = styled.div`
  margin-top: 15px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 24px;
`;

function PerformanceChart({
  dates,
  actualData,
  forecastData,
  goalData,
  aggregated_sales,
  store,
  month,
  year,
}) {
  const labels = dates?.map((el) => [el[0], el[1]]);
  // const labels = dates.map((el) => [
  //   el.toString().split(" ")[0][0],
  //   el.toString().split(" ")[2],
  // ]);

  const colors = dates?.map((el) =>
    new Date(el).toDateString() === new Date().toDateString()
      ? "white"
      : "black"
  );
  const backdropColors = dates?.map((el) =>
    new Date(el).toDateString() === new Date().toDateString() ? "red" : "white"
  );

  const showBackdrop = dates?.map((el) =>
    new Date(el).toDateString() === new Date().toDateString() ? true : false
  );
  const options = {
    //    plugins: {
    //      title: {
    //        display: true,
    //        text: `${new Date(
    //          dates[0] ? dates[0][1] + "-" + month + "-" + year : "invalid"
    //        ).toDateString()} - ${new Date(
    //          dates[0]
    //            ? dates[dates.length - 1][1] + "-" + month + "-" + year
    //            : "invalid"
    //        ).toDateString()}`,
    //        align: "start",
    //      },
    //    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: colors,
          backdropColor: backdropColors,
          showLabelBackdrop: showBackdrop,
          backdropPadding: 10,
          padding: 20,
          font: {
            size: 14,
            family: "'Georgia', 'serif'",
          },
        },
        grid: { display: false },
      },
      y: {
        position: "left",
        id: "y-axis-1",
        ticks: {
          callback: function (label, _index, _labels) {
            return "$" + label / 1000 + "k";
          },
        },
      },
    },
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Daily Sales",
        yAxisID: "y",
        backgroundColor: "#FFFFFF",
        borderWidth: 2,
        borderColor: "#3F73E5",
        data: actualData,
        borderRadius: 10,
        order: 2,
      },
      {
        type: "line",
        label: "Daily goals",
        yAxisID: "y",
        backgroundColor: "#3F73E5",
        data: forecastData,
        order: 1,
      },
    ],
  };
  const line_chart_data = {
    labels: labels,
    datasets: [
      {
        type: "line",
        label: "Goal",
        yAxisID: "y",
        backgroundColor: "#94A3B8",
        data: goalData,
        order: 1,
      },
      {
        type: "line",
        label: "Aggregated_sales",
        yAxisID: "y",
        backgroundColor: "#3F73E5",
        data: aggregated_sales,
        order: 2,
      },
    ],
  };

  return (
    <GoalsChartContainer>
      <Wrapper>
        <SelectionLabel>
          {capitalize(store.toString())} - {month}, {year}&nbsp;
        </SelectionLabel>

        <Bar options={options} data={data} height={90} />

        <Bar options={options} data={line_chart_data} height={90} />
      </Wrapper>
    </GoalsChartContainer>
  );
}

export default PerformanceChart;
