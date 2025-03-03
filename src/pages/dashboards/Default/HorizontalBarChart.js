import { CardContent, CardHeader, Card as MuiCard } from "@mui/material";
import { spacing } from "@mui/system";
import React from "react";
import { Bar } from "react-chartjs-2";
import styled, { withTheme } from "styled-components";

const Card = styled(MuiCard)(spacing);

const ChartWrapper = styled.div`
  height: 340px;
  width: 100%;
`;

const HorizontalBarChart = ({ theme, ...props }) => {
  const firstDatasetColor = theme.palette.secondary.main;
  const { data, title = "", yaxis_labels = null, dataset_label = "" } = props;

  const overallData = {
    labels: yaxis_labels,
    datasets: [
      {
        label: dataset_label,
        backgroundColor: firstDatasetColor,
        borderColor: firstDatasetColor,
        hoverBackgroundColor: firstDatasetColor,
        hoverBorderColor: firstDatasetColor,
        data: data,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        grid: {
          display: true,
        },
        stacked: true,
        ticks: {
          stepSize: 20,
          fontColor: theme.palette.text.secondary,
        },
      },

      x: {
        stacked: true,
        grid: {
          color: "transparent",
        },
        ticks: {
          fontColor: theme.palette.text.secondary,
        },
      },
    },
  };

  return (
    <Card mb={6}>
      <CardHeader title={title} />

      <CardContent>
        <ChartWrapper>
          <Bar type="bar" data={overallData} options={options} />
        </ChartWrapper>
      </CardContent>
    </Card>
  );
};

export default withTheme(HorizontalBarChart);
