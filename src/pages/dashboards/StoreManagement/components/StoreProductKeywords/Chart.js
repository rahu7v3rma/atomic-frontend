import React from "react";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
`;

function ChartKeywords({
  _dates,
  keywords,
  data1,
  data2,
  data3 = [],
  cpc,
  cost,
  cpc2,
  cost2,
  data_type,
  hide_volume = false,
}) {
  // sort data
  var options = {};
  var data = {};
  if (data_type === "keyword_clicks") {
    if (typeof data2 !== "undefined" && data2.length) {
      const clicks = [
        ...data1?.map((elem, idx) => [
          elem,
          data2[idx],
          keywords[idx],
          cpc[idx],
          cost[idx],
          cpc2[idx],
          cost2[idx],
        ]),
      ];
      clicks.sort((a, b) => a[0] < b[0]);
      data1 = clicks.map((el) => el[0]);
      data2 = clicks.map((el) => el[1]);
      keywords = clicks.map((el) => el[2]);
      cpc = clicks.map((el) => el[3]);
      cost = clicks.map((el) => el[4]);
      cpc2 = clicks.map((el) => el[5]);
      cost2 = clicks.map((el) => el[6]);
    } else {
      const clicks = [
        ...data1?.map((elem, idx) => [
          elem,
          keywords[idx],
          cpc[idx],
          cost[idx],
        ]),
      ];
      clicks.sort((a, b) => a[0] < b[0]);
      data1 = clicks.map((el) => el[0]);
      keywords = clicks.map((el) => el[1]);
      cpc = clicks.map((el) => el[2]);
      cost = clicks.map((el) => el[3]);
    }

    const callback = (context) => {
      return `CPC: ${context[0].dataset.cpc[context[0].dataIndex]}\nCost:
    ${context[0].dataset.cost[context[0].dataIndex]}`;
    };

    const labels = keywords;

    options = {
      plugins: {
        tooltip: {
          callbacks: {
            afterBody: callback,
          },
        },
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          ticks: {
            padding: 20,
            font: {
              size: 14,
            },
          },
          grid: { display: false },
        },
        y1: {
          position: "left",
          id: "y-axis-1",
          ticks: {
            callback: function (label, _index, _labels) {
              return label / 1000 + "k";
            },
          },
        },
      },
    };

    data = {
      labels: labels,
      datasets: [
        {
          label: "This period",
          yAxisID: "y1",
          backgroundColor: "#8B5CF6",
          borderWidth: 2,
          data: data1,
          cpc: cpc,
          cost: cost,
          borderRadius: 20,
        },
        {
          label: "Compared period",
          yAxisID: "y1",
          backgroundColor: "#C4B5FD",
          borderWidth: 2,
          data: data2,
          cpc: cpc2,
          cost: cost2,
          borderRadius: 20,
        },
      ],
    };
  } else {
    const sales = [
      ...data1?.map((elem, idx) => [
        elem,
        data2[idx],
        data3[idx],
        keywords[idx],
      ]),
    ];
    sales.sort((a, b) => a[0] < b[0]);
    data1 = sales.map((el) => el[0]);
    data2 = sales.map((el) => el[1]);
    data3 = sales.map((el) => el[2]);
    keywords = sales.map((el) => el[3]);

    const labels = keywords;

    options = {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          ticks: {
            padding: 20,
            font: {
              size: 14,
            },
          },
          grid: { display: false },
        },
        y1: {
          position: "left",
          id: "y-axis-1",
          ticks: {
            callback: function (label, _index, _labels) {
              return label / 1000 + "k";
            },
          },
        },
        y2: {
          position: "right",
          id: "y-axis-2",
          grid: { display: false },
          ticks: { display: false },
        },
      },
    };

    data = {
      labels: labels,
      datasets: [
        {
          label: "This period",
          yAxisID: "y1",
          backgroundColor: "#8B5CF6",
          borderWidth: 2,
          data: data1,
          borderRadius: 20,
          order: 2,
        },
        {
          label: "Compared period",
          yAxisID: "y1",
          backgroundColor: "#C4B5FD",
          borderWidth: 2,
          data: data2,
          borderRadius: 20,
          order: 3,
        },
        {
          label: "Search volume",
          yAxisID: "y2",
          borderColor: "#5EBA7D",
          backgroundColor: "#5EBA7D",
          data: !hide_volume ? data3 : [],
          type: "line",
          order: 1,
        },
      ],
    };
  }
  return (
    <Wrapper>
      <Bar type="bar" options={options} data={data} />
    </Wrapper>
  );
}

export default ChartKeywords;
