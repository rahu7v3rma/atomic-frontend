import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import React from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

const LineChart = ({
  dataset,
  labels,
  scales,
  events,
  deals,
  is_compare = false,
}) => {
  const data = { labels, datasets: [] };
  const yAxis = ["y", "y1", "y2", "y3"];
  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      annotation: {
        annotations: {},
      },
    },
    stacked: false,
    scales: {
      y: {
        type: "linear",
        position: "left",
        ticks: {},
        ...scales.y,
      },
      y1: {
        type: "linear",
        position: "right",
        ticks: {},
        ...scales.y1,
      },
      y2: {
        type: "linear",
        position: "left",
        ticks: {},
        ...scales.y2,
      },
      y3: {
        type: "linear",
        position: "right",
        ticks: {},
        ...scales.y3,
      },
      x: {
        grid: {
          display: false,
        },
        ...scales.x,
      },
    },
    maintainAspectRatio: false,
  };

  let i = 0;
  for (let key in dataset) {
    data.datasets.push({
      label: key,
      data: dataset[key],
      borderColor: scales[yAxis[i]]?.ticks?.color || "transparent",
      backgroundColor: "transparent",
      yAxisID: yAxis[i],
      tension: 0.4,
      cubicInterpolationMode: "monotone",
      fill: false,
      borderDash: is_compare ? [10, 5] : [0, 0],
    });
    options.scales[yAxis[i]].ticks.callback = (value) => {
      if (!isNaN(value)) {
        value = Number(value);
        if (!Number.isInteger(value)) value = value.toFixed(2);
        value =
          Math.abs(value) > 999
            ? Math.sign(value) * (Math.abs(value) / 1000).toFixed(1) + "k"
            : value;
      }
      return value;
    };
    ++i;
  }
  if (events) {
    for (let index = 0; index < Object.keys(events).length; index++) {
      if (events[index] && events[index].length > 0) {
        options.plugins.annotation.annotations[`line${index}`] = {
          type: "line",
          xMin: index,
          xMax: index,
          borderColor: "rgb(0, 0, 0)",
          borderWidth: 2,
          borderDash: [5, 5],
          display: true,
        };
        options.plugins.annotation.annotations[`label${index}`] = {
          type: "label",
          xValue: index,
          yValue:
            Math.max(...Object.values(dataset)[0]) -
            (events[index].length * Math.max(...Object.values(dataset)[0])) /
              100,
          yScaleID: "y",
          yAdjust: 30,
          textAlign: "start",
          backgroundColor: "white",
          borderWidth: 0,
          content: events[index],
          display: true,
          rotation: 90,
        };
      }
    }
  }
  if (deals) {
    let isBestDeal = false;
    let bestDealRanges = [];
    for (let index = 0; index < Object.keys(deals).length; index++) {
      if (deals[index] && deals[index].length > 0) {
        if (deals[index][0].includes("Lightning")) {
          options.plugins.annotation.annotations[`line${index}`] = {
            type: "line",
            xMin: index,
            xMax: index,
            borderColor: "rgb(121, 123, 234)",
            borderWidth: 2,
            borderDash: [5, 5],
            display: true,
          };
          options.plugins.annotation.annotations[`label${index}`] = {
            type: "label",
            xValue: index,
            yValue: 0,
            yScaleID: "y",
            yAdjust: -25,
            backgroundColor: "white",
            borderWidth: 0,
            content: "⚡deal",
            display: true,
            rotation: 90,
            // position: "auto",
          };
        } else if (
          deals[index][0].includes("Best") &&
          bestDealRanges.some((range) => range.includes(index)) === false
        ) {
          isBestDeal = true;
          bestDealRanges.push(Array.from({ length: 7 }, (_, i) => index + i));
        }
      }
    }
    if (isBestDeal) {
      for (let [i, range] of bestDealRanges.entries()) {
        options.plugins.annotation.annotations[`box${i}`] = {
          type: "box",
          xMin: range[0],
          xMax: range[range.length - 1],
          backgroundColor: "rgba(121, 123, 234, 0.25)",
          borderWidth: 0,
          display: true,
        };
        options.plugins.annotation.annotations[`label${i}`] = {
          type: "label",
          yValue: 0,
          yScaleID: "y",
          yAdjust: -10,
          xValue: (range[range.length - 1] - range[0]) / 2 + range[0],
          backgroundColor: "rgba(121, 123, 234, 0.1)",
          borderWidth: 0,
          content: "Best deal",
          display: true,
        };
      }
    }
  }

  return <Line options={options} data={data} />;
};

export default LineChart;
