import {
  CategoryScale,
  Chart,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

import { productDetailSelector } from "../../../../../../redux/slices/product_detail";
import LoaderDiv from "../../../../../components/LoaderDiv";

import { externalTooltipHandler } from "./utils";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "left",
    },
    x1: {
      type: "category",
      grid: {
        display: false,
      },
      ticks: {
        callback: function (val) {
          return this.getLabelForValue(val).split("#").reverse().pop();
        },
      },
    },
    x2: {
      type: "category",
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        callback: function (val) {
          let tickVal = this.getLabelForValue(val).split("#").pop();
          return tickVal !== "undefined" ? tickVal : undefined;
        },
      },
    },
  },
  plugins: {
    tooltip: {
      enabled: false,
      position: "nearest",
      external: externalTooltipHandler,
    },
  },
  parsing: {
    yAxisKey: "sales",
    xAxisKey: "label",
  },
};
export const LineChart = (_props) => {
  const { skuSalesChartData, skuSalesChartLoading } = useSelector(
    productDetailSelector
  );
  const labels = skuSalesChartData?.sales_chart?.compare_labels
    ? skuSalesChartData?.sales_chart?.labels.map(
        (_label, idx) =>
          `${_label}#${skuSalesChartData?.sales_chart?.compare_labels[idx]}`
      )
    : skuSalesChartData?.sales_chart?.labels;
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Current Period Sales ($)",
        data: skuSalesChartData?.sales_chart?.dataset?.current_period.map(
          function (values) {
            return values["sales"];
          }
        ),
        units: skuSalesChartData?.sales_chart?.dataset?.current_period.map(
          function (values) {
            return values["units"];
          }
        ),
        margins: skuSalesChartData?.sales_chart?.dataset?.current_period.map(
          function (values) {
            return values["margin"];
          }
        ),
        profits: skuSalesChartData?.sales_chart?.dataset?.current_period.map(
          function (values) {
            return values["profit"];
          }
        ),
        borderColor: "#3F73E5",
        borderWidth: 2,
        backgroundColor: "transparent",
        yAxisID: "y",
        xAxisID: "x1",
        tension: 0.4,
        cubicInterpolationMode: "monotone",
        fill: false,
      },
      {
        label: "Compared Period Sales ($)",
        data: skuSalesChartData?.sales_chart?.dataset?.compared_period.map(
          function (values) {
            return values["sales"];
          }
        ),
        units: skuSalesChartData?.sales_chart?.dataset?.compared_period.map(
          function (values) {
            return values["units"];
          }
        ),
        margins: skuSalesChartData?.sales_chart?.dataset?.compared_period.map(
          function (values) {
            return values["margin"];
          }
        ),
        profits: skuSalesChartData?.sales_chart?.dataset?.compared_period.map(
          function (values) {
            return values["profit"];
          }
        ),
        borderColor: "#14B8A6",
        borderWidth: 2,
        borderDash: [4],
        backgroundColor: "transparent",
        yAxisID: "y",
        xAxisID: "x2",
        tension: 0.4,
        cubicInterpolationMode: "monotone",
        fill: false,
      },
    ],
  };

  return (
    <>
      {skuSalesChartLoading ? (
        <div>
          <LoaderDiv />
        </div>
      ) : (
        <Line
          options={options}
          data={data}
          data-testid="chart"
          id="chart"
          height={90}
        />
      )}
    </>
  );
};
