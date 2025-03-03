import { CardContent, Card as MuiCard } from "@mui/material";
import { spacing } from "@mui/system";
import React from "react";
import { Line } from "react-chartjs-2";
import styled from "styled-components";

const Card = styled(MuiCard)(spacing);

const Spacer = styled.div(spacing);

const ChartWrapper = styled.div`
  height: 150px;
  width: 300px;
`;

function SalesChart({ labels, data, theme }) {
  const chart_data = {
    labels: labels,
    datasets: [
      {
        label: "Sales ($)",
        fill: true,
        backgroundColor: "transparent",
        borderColor: theme.palette.secondary.main,
        tension: 0.4,
        data: data,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(0,0,0,0.05)",
        },
      },
      y: {
        display: true,
        borderDash: [5, 5],
        ticks: {
          callback: function (value) {
            return `$${value}`;
          },
        },
        grid: {
          color: "rgba(0,0,0,0)",
          fontColor: "#fff",
        },
      },
    },
  };

  return (
    <Card mb={1}>
      <CardContent>
        <Spacer mb={6} />

        <ChartWrapper>
          <Line data={chart_data} options={options} />
        </ChartWrapper>
      </CardContent>
    </Card>
  );
}

//export default withTheme(SalesChart);
SalesChart();
