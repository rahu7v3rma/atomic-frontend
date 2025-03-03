import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
// import moment from "moment";
// import { useEffect } from "react";
import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  // useDispatch,
  useSelector,
} from "react-redux";

import {
  // fetchStoreSalesChartData,
  storeAnalyticsSelector,
} from "../../../../../redux/slices/store_analytics";

import { externalTooltipHandler } from "./utils";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  BarElement
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
      beginAtZero: true,
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
};

export const LineChart = () =>
  // props
  {
    // const { timeRange = {}, value } = props;
    // const [labels, setLabels] = useState([]);
    const { storeSalesChartData } = useSelector(storeAnalyticsSelector);

    // const dispatch = useDispatch();

    // useEffect(() => {
    //   const startDate = timeRange?.start_date
    //     ? moment(timeRange?.start_date)
    //     : moment().subtract(6, "days");
    //   const endDate = timeRange?.end_date
    //     ? moment(timeRange?.end_date)
    //     : moment();

    //   const compareStartDate = timeRange?.compare_start_date
    //     ? moment(timeRange?.compare_start_date)
    //     : moment().subtract(2, "months");

    //   const compareEndDate = timeRange?.compare_end_date
    //     ? moment(timeRange?.compare_end_date)
    //     : moment().subtract(1, "months");

    //   const dayCount = endDate.diff(startDate, "days");
    //   let listOfLabels = [];
    //   if (dayCount <= 30) {
    //     // Daily granularity
    //     [...Array(dayCount)].forEach((_, index) => {
    //       const date = moment(startDate).add(index, "day");
    //       listOfLabels.push(date.format("DD"));
    //     });
    //   } else if (dayCount > 30 && endDate.diff(startDate, "month") <= 4) {
    //     //  Weekly granularity
    //     const weekCount = endDate.diff(startDate, "days");
    //     [...Array(weekCount)].forEach((_, index) => {
    //       const date = moment(startDate).add(index, "week");
    //       const startOfWeek = moment(date).startOf("week");
    //       const endOfWeek = moment(date).endOf("week");
    //       if (startOfWeek.format("MMM") === endOfWeek.format("MMM")) {
    //         listOfLabels.push(
    //           `${startOfWeek.format("DD")} - ${endOfWeek.format("DD")}`
    //         );
    //       } else {
    //         listOfLabels.push(
    //           `${startOfWeek.format("DD,MMM")} - ${endOfWeek.format("DD,MMM")}`
    //         );
    //       }
    //     });
    //   } else {
    //     // Monthly granularity
    //     const monthCount = endDate.diff(startDate, "month");
    //     [...Array(monthCount)].forEach((_, index) => {
    //       const date = moment(startDate).add(index, "month");
    //       listOfLabels.push(date.format("MMM"));
    //     });
    //   }

    //   // setLabels(listOfLabels);

    //   dispatch(
    //     fetchStoreSalesChartData({
    //       store: value,
    //       start_date: moment(startDate).format("YYYY-MM-DD"),
    //       end_date: moment(endDate).format("YYYY-MM-DD"),
    //       compare_start_date: moment(compareStartDate).format("YYYY-MM-DD"),
    //       compare_end_date: moment(compareEndDate).format("YYYY-MM-DD"),
    //     })
    //   );
    // }, [timeRange, dispatch, value]);

    // getData();

    //const labels = storeSalesChartData?.sales_chart?.compare_labels
    //  ? storeSalesChartData?.sales_chart?.labels.map(
    //      (_label, idx) =>
    //        `${_label}#${storeSalesChartData?.sales_chart?.compare_labels[idx]}`
    //    )
    //  : storeSalesChartData?.sales_chart?.labels;
    const labels = useMemo(() => {
      if (!storeSalesChartData?.sales_chart?.compare_labels) {
        return storeSalesChartData?.sales_chart?.labels;
      }

      return storeSalesChartData.sales_chart.labels.map(
        (_label, idx) =>
          `${_label}#${storeSalesChartData.sales_chart.compare_labels[idx]}`
      );
    }, [
      storeSalesChartData?.sales_chart?.labels,
      storeSalesChartData?.sales_chart?.compare_labels,
    ]);
    const data = {
      // labels,
      labels: labels,
      datasets: [
        {
          label: "Current Period Sales ($)",
          data: storeSalesChartData?.sales_chart?.dataset?.current_period.map(
            (el) => el.sales
          ),
          units: storeSalesChartData?.sales_chart?.dataset?.current_period.map(
            (el) => el.units
          ),
          margins:
            storeSalesChartData?.sales_chart?.dataset?.current_period.map(
              (el) => el.margin
            ),
          profits:
            storeSalesChartData?.sales_chart?.dataset?.current_period.map(
              (el) => el.profit
            ),
          borderColor: "#3F73E5",
          borderWidth: 2,
          backgroundColor: "transparent",
          xAxisID: "x1",
          tension: 0.4,
          cubicInterpolationMode: "monotone",
          fill: false,
        },
        {
          label: "Compared Period Sales ($)",
          data: storeSalesChartData?.sales_chart?.dataset?.compared_period.map(
            (el) => el.sales
          ),
          units: storeSalesChartData?.sales_chart?.dataset?.compared_period.map(
            (el) => el.units
          ),
          margins:
            storeSalesChartData?.sales_chart?.dataset?.compared_period.map(
              (el) => el.margin
            ),
          profits:
            storeSalesChartData?.sales_chart?.dataset?.compared_period.map(
              (el) => el.profit
            ),
          borderColor: "#14B8A6",
          borderWidth: 2,
          borderDash: [4],
          backgroundColor: "transparent",
          xAxisID: "x2",
          tension: 0.4,
          cubicInterpolationMode: "monotone",
          fill: false,
        },
      ],
    };
    return (
      <Line
        options={options}
        data={data}
        id="chart2"
        data-testid="chart2"
        height={90}
      />
    );
  };
