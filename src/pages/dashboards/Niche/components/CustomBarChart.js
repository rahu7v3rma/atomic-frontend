import {
  Card as MuiCard,
  CardContent as MuiCardContent,
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";
import React from "react";
import { Bar } from "react-chartjs-2";
import styled, { withTheme } from "styled-components";

import DataTable from "./DataTable";
import SelectionControls from "./SelectionControls";

const Card = styled(MuiCard)(spacing);

const Spacer = styled.div(spacing);

const ChartWrapper = styled.div`
  height: 300px;
  width: 100%;
  overflow: auto;
`;

const CardContent = styled(MuiCardContent)`
  text-align: center;
`;

const BarChart = ({ chart_data }) => {
  const [checked, setChecked] = React.useState(true);
  const data = {
    labels: chart_data.data.labels,
    datasets: chart_data.data.datasets,
  };

  const options =
    data.datasets.length > 1
      ? {
          maintainAspectRatio: false,
          plugins: chart_data.data.plugins || {},
          scales: {
            y: {
              grid: {
                display: false,
              },
              stacked: false,
            },

            ya: {
              position: "right",
              grid: {
                display: false,
              },
              stacked: false,
            },

            x: {
              stacked: false,
              grid: {
                color: "transparent",
              },
              ticks: chart_data.data.ticks || {},
            },
          },
        }
      : {
          maintainAspectRatio: false,
          plugins: chart_data.data.plugins || {},
          scales: {
            y: {
              grid: {
                display: false,
              },
              stacked: false,
            },
            x: {
              stacked: false,
              grid: {
                color: "transparent",
              },
              ticks: chart_data.data.ticks || {},
            },
          },
        };

  return (
    <Card mb={1}>
      <CardContent>
        <SelectionControls setChecked={setChecked} checked={checked} />
        <Typography variant="h6" gutterBottom>
          {chart_data.title}
        </Typography>
        <Spacer mb={6} />

        <ChartWrapper>
          {checked && (
            <Bar options={options} data={data} plugins={chart_data.plugins} />
          )}
          {!checked && (
            <DataTable
              headCells={chart_data.headCells}
              rows={chart_data.rows}
            />
          )}
        </ChartWrapper>
      </CardContent>
    </Card>
  );
};

export default withTheme(BarChart);
