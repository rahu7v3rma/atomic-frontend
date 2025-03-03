import {
  CardContent,
  IconButton,
  Card as MuiCard,
  CardHeader as MuiCardHeader,
  Typography as MuiTypography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { spacing } from "@mui/system";
import React from "react";
import { Line } from "react-chartjs-2";
import { MoreVertical } from "react-feather";
import styled, { withTheme } from "styled-components";

const Card = styled(MuiCard)(spacing);

const ChartWrapper = styled.div`
  height: 378px;
`;

const CardHeader = styled(MuiCardHeader)`
  span {
    font-size: 30px;
    font-family: "Arial Black";
  }
`;

const Typography = styled(MuiTypography)`
  font-size: 1.2rem;
  color: gray;
`;

function LineChart({
  theme,
  report_groups_weekly,
  report_groups_weekly_competitors,
}) {
  const data = (canvas) => {
    const ctx = canvas.getContext("2d");

    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, alpha(theme.palette.secondary.main, 0.0875));
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

    let data1;
    let data2;
    let labels_chart;

    labels_chart = Object.keys(report_groups_weekly).map((el) => {
      return el;
    });

    labels_chart.reverse();

    data1 = labels_chart.map((el) => {
      return (
        report_groups_weekly[el].reduce((res, el) => {
          res += el.rating;
          return res;
        }, 0) / report_groups_weekly[el].length
      );
    });

    data2 = labels_chart.map((el) => {
      if (
        !report_groups_weekly_competitors ||
        Object.keys(report_groups_weekly_competitors).length === 0
      ) {
        return 0;
      }

      return (
        report_groups_weekly_competitors[el].reduce((res, el) => {
          res += el.rating;
          return res;
        }, 0) / report_groups_weekly_competitors[el].length
      );
    });

    return {
      labels: labels_chart,
      datasets: [
        {
          label: "Weekly rating",
          backgroundColor: theme.palette.secondary.main,
          borderColor: theme.palette.secondary.main,
          tension: 0.4,
          data: data1,
        },
        {
          label: "Competitors avg",
          backgroundColor: "#f44336",
          borderColor: "#f44336",
          tension: 0.4,
          data: data2,
        },
      ],
    };
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(0,0,0,0.0)",
        },
      },
      y: {
        grid: {
          color: "rgba(0,0,0,0.0375)",
          fontColor: "#fff",
        },
      },
    },
  };

  return (
    <Card mb={6}>
      <CardHeader
        action={
          <IconButton aria-label="settings" size="large">
            <MoreVertical />
          </IconButton>
        }
        title="Velocity"
      />
      <CardContent style={{ textAlign: "center" }}>
        <Typography variant="h6" gutterBottom>
          Weekly rating growth and Competitors avg.
        </Typography>
        <ChartWrapper>
          <Line type="line" data={data} options={options} />
        </ChartWrapper>
      </CardContent>
    </Card>
  );
}
export default withTheme(LineChart);
