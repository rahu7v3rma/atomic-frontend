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

const CardContent = styled(MuiCardContent)`
  text-align: center;
`;

const Spacer = styled.div(spacing);

const ChartWrapper = styled.div`
  height: 300px;
  width: 100%;
  text-align: center;
  overflow: auto;
`;

export const BrandBreakdownChartType = {
  PRODUCT: "PRODUCT",
  BRAND: "BRAND",
};

const ClickCounts = (products) => {
  if (products?.length > 0 && Array.isArray(products)) {
    return products?.reduce((r, el) => {
      r = r + parseInt(el["click_count"]);
      return r;
    }, 0);
  }
};

const callback = (context) => {
  let tooltip = `Average Unit price: ${
    context[0].dataset.data_average_unit_price[context[0].dataIndex]
  }\nBSR value: ${context[0].dataset.data_bsr_value[context[0].dataIndex]}`;
  if (context[0].dataset.data_click_count !== undefined) {
    tooltip += `\nClick Count: ${
      context[0].dataset.data_click_count[context[0].dataIndex]
    }`;
  }
  if (
    context[0].dataset.data_count_of_asins[context[0].dataIndex] !== undefined
  ) {
    tooltip += `\nAsin Count: ${
      context[0].dataset.data_count_of_asins[context[0].dataIndex]
    }`;
  }
  return tooltip;
};

const createDataBrand = (
  brand,
  click_count,
  count_of_asins,
  average_unit_price,
  bsr_value,
  estimated_revenue,
  estimated_units_sales
) => {
  const decFormatter = (num) => {
    return num ? "$" + Math.round(num * 100) / 100 : 0;
  };

  const numberWithCommas = (num) => {
    return num
      ? num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
      : 0;
  };

  return {
    brand,
    click_count,
    count_of_asins,
    average_unit_price: decFormatter(average_unit_price),
    bsr_value,
    estimated_revenue: "$" + numberWithCommas(estimated_revenue),
    estimated_units_sales: numberWithCommas(
      parseInt(estimated_units_sales, 10)
    ),
  };
};

const createDataProduct = (
  asin,
  click_count,
  average_unit_price,
  bsr_value,
  estimated_revenue,
  estimated_units_sales,
  brand
) => {
  const decFormatter = (num) => {
    return num ? "$" + Math.round(num * 100) / 100 : 0;
  };

  const numberWithCommas = (num) => {
    return num
      ? num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
      : 0;
  };
  return {
    asin: asin,
    click_count: click_count,
    average_unit_price: decFormatter(average_unit_price),
    bsr_value: bsr_value,
    estimated_revenue: "$" + numberWithCommas(estimated_revenue),
    estimated_units_sales: numberWithCommas(
      parseInt(estimated_units_sales, 10)
    ),
    brand: brand,
  };
};

const getPerformanceBrandChart = (p_data) => {
  const data_products = p_data?.products?.reduce((result, product) => {
    result[product.brand || "-"] = result[product.brand || "-"] || [];
    result[product.brand || "-"].push(product);
    return result;
  }, {});

  let data_list = Object.keys(data_products).map((elem) => data_products[elem]);

  // sort the list
  data_list = data_list.slice().sort(function (a, b) {
    if (ClickCounts(a) > ClickCounts(b)) return -1;
    if (ClickCounts(a) < ClickCounts(b)) return 1;
    return 0;
  });

  const headCells = [
    {
      id: "brand",
      numeric: false,
      disablePadding: true,
      label: "Brand",
    },
    {
      id: "click_count",
      numeric: true,
      disablePadding: false,
      label: "Click Count",
    },
    {
      id: "count_of_asins",
      numeric: true,
      disablePadding: false,
      label: "Count Of Asins",
    },
    {
      id: "average_unit_price",
      numeric: true,
      disablePadding: false,
      label: "Average Unit Price",
    },
    {
      id: "bsr_value",
      numeric: true,
      disablePadding: false,
      label: "Average annual BSR",
    },
    {
      id: "estimated_revenue",
      numeric: true,
      disablePadding: false,
      label: "Estimated revenue",
    },
    {
      id: "estimated_units_sales",
      numeric: true,
      disablePadding: false,
      label: "Estimated units sales",
    },
  ];

  const rows = data_list.map((el) => {
    return createDataBrand(
      el[0].brand || "unknown",
      ClickCounts(el),
      el.length,
      parseFloat(
        (
          el
            .map((elem) => parseFloat(elem.avg_selling_price))
            .reduce((a, b) => a + b, 0) / el.length
        ).toFixed(2)
      ),
      parseFloat(
        (
          el
            .map((elem) => parseFloat(elem.avg_bsr))
            .reduce((a, b) => a + b, 0) / el.length
        ).toFixed(2)
      ),
      parseFloat(
        (
          el
            .map((elem) => parseFloat(elem.estimated_revenue))
            .reduce((a, b) => a + b, 0) / el.length
        ).toFixed(2)
      ),
      parseFloat(
        (
          el
            .map((elem) => parseFloat(elem.estimated_units_sales))
            .reduce((a, b) => a + b, 0) / el.length
        ).toFixed(2)
      )
    );
  });

  const data = {
    labels: data_list.map((elem) => elem[0].brand || "unknown"),
    datasets: [
      {
        label: "Estimated revenue",
        backgroundColor: "rgba(46, 204, 113, 1.0)",
        borderColor: "rgba(46, 204, 113, 1.0)",
        hoverBackgroundColor: "rgba(46, 204, 113, 1.0)",
        hoverBorderColor: "rgba(46, 204, 113, 1.0)",
        data: data_list.map((el) =>
          (
            el
              .map((elem) => parseFloat(elem.estimated_revenue))
              .reduce((a, b) => a + b, 0) / el.length
          ).toFixed(2)
        ),
        data_click_count: data_list.map((el) => ClickCounts(el)),
        data_count_of_asins: data_list.map((el) => el.length),
        data_average_unit_price: data_list.map((el) =>
          parseFloat(
            (
              el
                .map((elem) => parseFloat(elem.avg_selling_price))
                .reduce((a, b) => a + b, 0) / el.length
            ).toFixed(2)
          )
        ),
        data_bsr_value: data_list.map((el) =>
          parseFloat(
            (
              el
                .map((elem) => parseFloat(elem.avg_bsr))
                .reduce((a, b) => a + b, 0) / el.length
            ).toFixed(2)
          )
        ),
        barPercentage: 0.75,
        categoryPercentage: 0.5,
        yAxisID: "ya",
      },
      {
        label: "Estimated units sold",
        backgroundColor: "rgba(255, 252, 127, 1.0)",
        borderColor: "rgba(255, 252, 127, 1.0)",
        hoverBackgroundColor: "rgba(255, 252, 127, 1.0)",
        hoverBorderColor: "rgba(255, 252, 127, 1.0)",
        data: data_list.map((el) =>
          (
            el
              .map((elem) => parseInt(elem.estimated_units_sales))
              .reduce((a, b) => a + b, 0) / el.length
          ).toFixed(2)
        ),
        data_click_count: data_list.map((el) => ClickCounts(el)),
        data_count_of_asins: data_list.map((el) => el.length),
        data_average_unit_price: data_list.map((el) =>
          parseFloat(
            (
              el
                .map((elem) => parseFloat(elem.avg_selling_price))
                .reduce((a, b) => a + b, 0) / el.length
            ).toFixed(2)
          )
        ),
        data_bsr_value: data_list.map((el) =>
          parseFloat(
            (
              el
                .map((elem) => parseFloat(elem.avg_bsr))
                .reduce((a, b) => a + b, 0) / el.length
            ).toFixed(2)
          )
        ),
        barPercentage: 0.75,
        categoryPercentage: 0.5,
        yAxisID: "yb",
      },
    ],
  };

  const title = "Brand Performance";

  return {
    data: data,
    title: title,
    callback: callback,
    headCells: headCells,
    rows: rows,
  };
};

const getPerformanceAsinChart = (p_data) => {
  let data_list = p_data?.products;

  // sort the list
  data_list = data_list.slice().sort(function (a, b) {
    if (parseInt(a.click_count) > parseInt(b.click_count)) return -1;
    if (parseInt(a.click_count) < parseInt(b.click_count)) return 1;
    return 0;
  });

  const headCells = [
    {
      id: "asin",
      numeric: false,
      disablePadding: true,
      label: "ASIN",
    },
    {
      id: "click_count",
      numeric: true,
      disablePadding: false,
      label: "Click Count",
    },
    {
      id: "average_unit_price",
      numeric: true,
      disablePadding: false,
      label: "Average Unit Price",
    },
    {
      id: "bsr_value",
      numeric: true,
      disablePadding: false,
      label: "Average annual BSR",
    },
    {
      id: "estimated_revenue",
      numeric: true,
      disablePadding: false,
      label: "Estimated revenue",
    },
    {
      id: "estimated_units_sales",
      numeric: true,
      disablePadding: false,
      label: "Estimated units sales",
    },
    {
      id: "brand",
      numeric: false,
      disablePadding: false,
      label: "Brand",
    },
  ];

  const rows = data_list.map((product) => {
    return createDataProduct(
      product.asin,
      parseInt(product.click_count),
      parseFloat(product.avg_selling_price),
      product.avg_bsr,
      parseFloat(product.estimated_revenue),
      parseInt(product.estimated_units_sales),
      product.brand
    );
  });

  const data = {
    labels: data_list.map((product) => product.asin),
    datasets: [
      {
        label: "Estimated revenue",
        backgroundColor: "rgba(46, 204, 113, 1.0)",
        borderColor: "rgba(46, 204, 113, 1.0)",
        hoverBackgroundColor: "rgba(46, 204, 113, 1.0)",
        hoverBorderColor: "rgba(46, 204, 113, 1.0)",
        data: data_list.map((elem) => parseFloat(elem.estimated_revenue)),
        data_click_count: data_list.map((el) => ClickCounts(el)),
        data_count_of_asins: data_list.map((el) => el.length),
        data_average_unit_price: data_list.map(
          (elem) => elem.avg_selling_price
        ),
        data_bsr_value: data_list.map((elem) => elem.avg_bsr),
        data_product_estimated_revenue: data_list.map(
          (elem) => elem.estimated_revenue
        ),
        data_product_estimated_units_sales: data_list.map(
          (elem) => elem.estimated_units_sales
        ),
        data_product_brand: data_list.map((elem) => elem.brand),
        data_product_name: data_list.map(
          (elem) => elem.name.substring(0, 40) + "..."
        ),
        data_product_url: data_list.map((elem) => elem.url),
        barPercentage: 0.75,
        categoryPercentage: 0.5,
        yAxisID: "ya",
      },
      {
        label: "Estimated units sold",
        backgroundColor: "rgba(255, 252, 127, 1.0)",
        borderColor: "rgba(255, 252, 127, 1.0)",
        hoverBackgroundColor: "rgba(255, 252, 127, 1.0)",
        hoverBorderColor: "rgba(255, 252, 127, 1.0)",
        data: data_list.map((elem) => parseInt(elem.estimated_units_sales)),
        data_click_count: data_list.map((el) => ClickCounts(el)),
        data_count_of_asins: data_list.map((el) => el.length),
        data_average_unit_price: data_list.map(
          (elem) => elem.avg_selling_price
        ),
        data_bsr_value: data_list.map((elem) => elem.avg_bsr),
        data_product_estimated_revenue: data_list.map(
          (elem) => elem.estimated_revenue
        ),
        data_product_estimated_units_sales: data_list.map(
          (elem) => elem.estimated_units_sales
        ),
        data_product_brand: data_list.map((elem) => elem.brand),
        data_product_name: data_list.map(
          (elem) => elem.name.substring(0, 40) + "..."
        ),
        data_product_url: data_list.map((elem) => elem.url),
        barPercentage: 0.75,
        categoryPercentage: 0.5,
        yAxisID: "yb",
      },
    ],
  };

  const title = "Product Performance";

  return {
    data: data,
    title: title,
    callback: callback,
    headCells: headCells,
    rows: rows,
  };
};

const BrandBreakdown = ({ nicheData, type }) => {
  const [checked, setChecked] = React.useState(true);

  let chart_data = {};
  if (type === BrandBreakdownChartType.BRAND) {
    chart_data = getPerformanceBrandChart(nicheData);
  } else if (type === BrandBreakdownChartType.PRODUCT) {
    chart_data = getPerformanceAsinChart(nicheData);
  } else {
    console.log("unsupported brand breakdown type: " + type);
    return null;
  }

  const data = {
    labels: chart_data.data.labels,
    datasets: chart_data.data.datasets,
  };

  const options =
    data.datasets.length > 1
      ? {
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              callbacks: {
                afterBody: chart_data.callback,
              },
            },
            legend: {
              display: true,
            },
          },
          scales: {
            ya: {
              position: "left",
              grid: {
                display: false,
              },
              stacked: false,
            },

            yb: {
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
            },
          },
        }
      : {
          maintainAspectRatio: false,
          hover: {
            mode: "nearest",
            intersect: true,
          },
          plugins: {
            tooltip: {
              enabled: false,
              mode: "index",
              intersect: false,
              position: "average",
              external: function (context) {
                // Tooltip Element
                let tooltipEl = document.getElementById("chartjs-tooltip");
                const data_idx = context.tooltip.dataPoints[0].dataIndex;
                const body_click_count = [
                  "Click count : " +
                    context.chart.data.datasets[0].data_click_count[data_idx],
                ];
                const body_count_of_asins = [
                  "Count of ASINs : " +
                    context.chart.data.datasets[0].data_count_of_asins[
                      data_idx
                    ],
                ];
                const body_bsr = [
                  "BSR value : " +
                    context.chart.data.datasets[0].data_bsr_value[data_idx],
                ];
                const body_average_unit_price = [
                  "Average Unit price : " +
                    context.chart.data.datasets[0].data_average_unit_price[
                      data_idx
                    ],
                ];
                const body_brand = [
                  "brand : " +
                    context.chart.data.datasets[0].data_product_brand[data_idx],
                ];
                const body_estimated_revenue = [
                  "estimated revenue : " +
                    context.chart.data.datasets[0]
                      .data_product_estimated_revenue[data_idx],
                ];
                const body_estimated_units_sales = [
                  "estimated units sales : " +
                    context.chart.data.datasets[0]
                      .data_product_estimated_units_sales[data_idx],
                ];
                const body_name_url = [
                  {
                    name: context.chart.data.datasets[0].data_product_name[
                      data_idx
                    ],
                    url: context.chart.data.datasets[0].data_product_url[
                      data_idx
                    ],
                  },
                ];

                // Create element on first render
                if (!tooltipEl) {
                  tooltipEl = document.createElement("div");
                  tooltipEl.id = "chartjs-tooltip";
                  tooltipEl.style.backgroundColor = "beige";
                  tooltipEl.innerHTML = "<table></table>";
                  document.body.appendChild(tooltipEl);
                }

                // Hide if no tooltip
                const tooltipModel = context.tooltip;
                /*
                const mouseOverTooltip = () => {
                  tooltipEl.style.opacity = 1;
                };

                tooltipEl.addEventListener(
                  "mouseover",
                  mouseOverTooltip,
                  false
                );
                */
                /*
                if (tooltipModel.opacity === 0) {
                  tooltipEl.style.opacity = 0;
                  return;
                }
                */

                // Set caret Position
                tooltipEl.classList.remove("above", "below", "no-transform");
                if (tooltipModel.yAlign) {
                  tooltipEl.classList.add(tooltipModel.yAlign);
                } else {
                  tooltipEl.classList.add("no-transform");
                }

                function getBody(bodyItem) {
                  return bodyItem.lines;
                }

                // Set Text
                if (tooltipModel.body) {
                  const titleLines = tooltipModel.title || [];
                  const bodyLines = tooltipModel.body.map(getBody);

                  let innerHtml = "<thead>";

                  titleLines.forEach(function (title) {
                    innerHtml += "<tr><th>" + title + "</th></tr>";
                  });
                  innerHtml += "</thead><tbody>";

                  bodyLines.forEach(function (body, i) {
                    const colors = tooltipModel.labelColors[i];
                    let style = "background:" + colors.backgroundColor;
                    style += "; border-color:" + colors.borderColor;
                    style += "; border-width: 2px";
                    const span = '<span style="' + style + '"></span>';
                    innerHtml += "<tr><td>" + span + body + "</td></tr>";
                  });

                  body_bsr.forEach(function (body, i) {
                    const colors = tooltipModel.labelColors[i];
                    let style = "background:" + colors.backgroundColor;
                    style += "; border-color:" + colors.borderColor;
                    style += "; border-width: 2px";
                    const span = '<span style="' + style + '"></span>';
                    innerHtml += "<tr><td>" + span + body + "</td></tr>";
                  });

                  body_click_count.forEach(function (body, i) {
                    const colors = tooltipModel.labelColors[i];
                    let style = "background:" + colors.backgroundColor;
                    style += "; border-color:" + colors.borderColor;
                    style += "; border-width: 2px";
                    const span = '<span style="' + style + '"></span>';
                    innerHtml += "<tr><td>" + span + body + "</td></tr>";
                  });

                  body_count_of_asins.forEach(function (body, i) {
                    const colors = tooltipModel.labelColors[i];
                    let style = "background:" + colors.backgroundColor;
                    style += "; border-color:" + colors.borderColor;
                    style += "; border-width: 2px";
                    const span = '<span style="' + style + '"></span>';
                    innerHtml += "<tr><td>" + span + body + "</td></tr>";
                  });
                  body_average_unit_price.forEach(function (body, i) {
                    const colors = tooltipModel.labelColors[i];
                    let style = "background:" + colors.backgroundColor;
                    style += "; border-color:" + colors.borderColor;
                    style += "; border-width: 2px";
                    const span = '<span style="' + style + '"></span>';
                    innerHtml += "<tr><td>" + span + body + "</td></tr>";
                  });

                  body_brand.forEach(function (body, i) {
                    const colors = tooltipModel.labelColors[i];
                    let style = "background:" + colors.backgroundColor;
                    style += "; border-color:" + colors.borderColor;
                    style += "; border-width: 2px";
                    const span = '<span style="' + style + '"></span>';
                    innerHtml += "<tr><td>" + span + body + "</td></tr>";
                  });

                  body_estimated_revenue.forEach(function (body, i) {
                    const colors = tooltipModel.labelColors[i];
                    let style = "background:" + colors.backgroundColor;
                    style += "; border-color:" + colors.borderColor;
                    style += "; border-width: 2px";
                    const span = '<span style="' + style + '"></span>';
                    innerHtml += "<tr><td>" + span + body + "</td></tr>";
                  });

                  body_estimated_units_sales.forEach(function (body, i) {
                    const colors = tooltipModel.labelColors[i];
                    let style = "background:" + colors.backgroundColor;
                    style += "; border-color:" + colors.borderColor;
                    style += "; border-width: 2px";
                    const span = '<span style="' + style + '"></span>';
                    innerHtml += "<tr><td>" + span + body + "</td></tr>";
                  });

                  body_name_url.forEach(function (body, i) {
                    const colors = tooltipModel.labelColors[i];
                    let style = "background:" + colors.backgroundColor;
                    style += "; border-color:" + colors.borderColor;
                    style += "; border-width: 2px";
                    const span = '<span style="' + style + '"></span>';
                    innerHtml +=
                      "<tr><td>" +
                      span +
                      '<a target="_blank" href=' +
                      body.url +
                      ">" +
                      body.name +
                      "</a></td></tr>";
                  });
                  innerHtml += "</tbody>";

                  let tableRoot = tooltipEl.querySelector("table");
                  tableRoot.innerHTML = innerHtml;
                }

                const position = context.chart.canvas.getBoundingClientRect();
                // const bodyFont = Chart.helpers.toFont(
                // tooltipModel.options.bodyFont
                // );

                // Display, position, and set styles for font
                tooltipEl.style.opacity = 1;
                tooltipEl.style.position = "absolute";
                tooltipEl.style.left =
                  position.left +
                  window.pageXOffset +
                  tooltipModel.caretX +
                  "px";
                tooltipEl.style.top = position.top + "px";
                // tooltipEl.style.font = bodyFont.string;
                tooltipEl.style.padding =
                  tooltipModel.padding + "px " + tooltipModel.padding + "px";
                // tooltipEl.style.pointerEvents = "none";
              },
            },
            legend: {
              display: true,
            },
          },
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
            },
          },
        };

  const plugins = [
    {
      id: "myEventCatcher",
      beforeEvent(chart, args, _pluginOptions) {
        const event = args.event;
        if (event.type === "mouseout") {
          let tooltipEl = document.getElementById("chartjs-tooltip");
          if (tooltipEl) {
            tooltipEl.style.opacity = 0;
          }

          // process the event
        }
      },
    },
  ];

  return (
    <Card mb={1}>
      <CardContent>
        <SelectionControls setChecked={setChecked} checked={checked} />
        <Typography variant="h6" gutterBottom>
          {chart_data.title}
        </Typography>
        <Spacer mb={6} />
        <ChartWrapper>
          {checked && <Bar options={options} data={data} plugins={plugins} />}
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

export default withTheme(BrandBreakdown);
