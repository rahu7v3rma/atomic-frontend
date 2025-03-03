import React from "react";

import BarChart from "./CustomBarChart";

export const CustomerRatingChartType = {
  PRODUCT: "PRODUCT",
  BRAND: "BRAND",
};

const TotalReviews = (products) => {
  return products.reduce((r, el) => {
    r = r + parseInt(el.total_reviews);
    return r;
  }, 0);
};

const average_list = (arr) =>
  (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2);

const createDataBrand = (brand, total_reviews, avg_ratings) => {
  return { brand, total_reviews, avg_ratings };
};

const createDataProduct = (asin, total_reviews, avg_ratings, brand) => {
  return { asin, total_reviews, avg_ratings, brand };
};

const getCustomerRatingData = (p_data, brandName) => {
  const data_products = p_data?.products?.reduce((result, product) => {
    result[product.brand || "-"] = result[product.brand || "-"] || [];
    result[product.brand || "-"].push(product);
    return result;
  }, {});

  const data_list = Object.keys(data_products).map(
    (elem) => data_products[elem]
  );

  // sort the list
  data_list.sort(function (a, b) {
    if (TotalReviews(a) > TotalReviews(b)) return -1;
    if (TotalReviews(a) < TotalReviews(b)) return 1;
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
      id: "total_reviews",
      numeric: true,
      disablePadding: false,
      label: "Total Reviews",
    },
    {
      id: "avg_ratings",
      numeric: true,
      disablePadding: false,
      label: "Avg. ratings",
    },
  ];

  const rows = data_list.map((el) => {
    return createDataBrand(
      el[0].brand || "unknown",
      TotalReviews(el),
      parseFloat(
        average_list(el.map((elem) => parseFloat(elem.avg_customer_rating)))
      )
    );
  });

  const data = {
    labels: data_list.map((elem) => elem[0].brand || "unknown"),
    datasets: [
      {
        label: "Total Reviews",
        backgroundColor: "rgba(71, 130, 218, 1)",
        borderColor: "rgba(71, 130, 218, 1)",
        hoverBackgroundColor: "rgba(71, 130, 218, 1)",
        hoverBorderColor: "rgba(71, 130, 218, 1)",
        data: data_list.map((elem) => TotalReviews(elem)),
        barPercentage: 0.75,
        categoryPercentage: 0.5,
        yAxisID: "y",
      },
      {
        label: "Avg. ratings",
        backgroundColor: "rgba(255, 0, 0, 0.8)",
        borderColor: "rgba(255, 0, 0, 0.8)",
        hoverBackgroundColor: "rgba(255, 0, 0, 0.8)",
        hoverBorderColor: "rgba(255, 0, 0, 0.8)",
        data: data_list.map((elem) =>
          parseFloat(
            average_list(elem.map((el) => parseFloat(el.avg_customer_rating)))
          )
        ),
        barPercentage: 0.75,
        categoryPercentage: 0.5,
        yAxisID: "ya",
      },
    ],
    ticks: {
      color: data_list.map((elem) =>
        elem[0].brand.toLowerCase() === brandName.toLowerCase()
          ? "rgba(255, 0, 0, 1)"
          : "rgba(0, 0, 0, 0.5)"
      ),
    },
  };

  const title = "Brand Customer rating";

  return { data: data, title: title, headCells: headCells, rows: rows };
};

const getCustomerRatingByProductData = (p_data, brandName) => {
  const data_list = [...p_data?.products];

  data_list.sort(function (a, b) {
    if (parseInt(a.total_reviews) > parseInt(b.total_reviews)) return -1;
    if (parseInt(a.total_reviews) < parseInt(b.total_reviews)) return 1;
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
      id: "total_reviews",
      numeric: true,
      disablePadding: false,
      label: "Total Reviews",
    },
    {
      id: "avg_ratings",
      numeric: true,
      disablePadding: false,
      label: "Avg. ratings",
    },
    {
      id: "brand",
      numeric: false,
      disablePadding: false,
      label: "Brand",
    },
  ];

  const rows = data_list.map((el) => {
    return createDataProduct(
      el.asin,
      parseInt(el.total_reviews),
      el.avg_customer_rating,
      el.brand
    );
  });

  const data = {
    labels: data_list.map((product) => product.asin),
    datasets: [
      {
        label: "Total Reviews",
        backgroundColor: "rgba(71, 130, 218, 1)",
        borderColor: "rgba(71, 130, 218, 1)",
        hoverBackgroundColor: "rgba(71, 130, 218, 1)",
        hoverBorderColor: "rgba(71, 130, 218, 1)",
        data: data_list.map((elem) => parseInt(elem.total_reviews)),
        data_product_brand: data_list.map((elem) => elem.brand),
        data_product_name: data_list.map(
          (elem) => elem.name.substring(0, 40) + "..."
        ),
        data_product_url: data_list.map((elem) => elem.url),
        barPercentage: 0.75,
        categoryPercentage: 0.5,
        yAxisID: "y",
      },
      {
        label: "Avg. ratings",
        backgroundColor: "rgba(255, 0, 0, 0.8)",
        borderColor: "rgba(255, 0, 0, 0.8)",
        hoverBackgroundColor: "rgba(255, 0, 0, 0.8)",
        hoverBorderColor: "rgba(255, 0, 0, 0.8)",
        data: data_list.map((elem) => parseFloat(elem.avg_customer_rating)),
        data_product_brand: data_list.map((elem) => elem.brand),
        data_product_name: data_list.map(
          (elem) => elem.name.substring(0, 40) + "..."
        ),
        data_product_url: data_list.map((elem) => elem.url),
        barPercentage: 0.75,
        categoryPercentage: 0.5,
        yAxisID: "ya",
      },
    ],
    ticks: {
      color: data_list.map((elem) =>
        elem.brand.toLowerCase() === brandName.toLowerCase()
          ? "rgba(255, 0, 0, 1)"
          : "rgba(0, 0, 0, 0.5)"
      ),
    },
  };

  const options = {
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
        external: function (context) {
          // Tooltip Element
          let tooltipEl = document.getElementById("chartjs-tooltip2");
          const data_idx = context.tooltip.dataPoints[0].dataIndex;
          const body_brand = [
            "brand : " +
              context.chart.data.datasets[0].data_product_brand[data_idx],
          ];
          const body_name_url = [
            {
              name: context.chart.data.datasets[0].data_product_name[data_idx],
              url: context.chart.data.datasets[0].data_product_url[data_idx],
            },
          ];

          // Create element on first render
          if (!tooltipEl) {
            tooltipEl = document.createElement("div");
            tooltipEl.id = "chartjs-tooltip2";
            tooltipEl.style.backgroundColor = "beige";
            tooltipEl.innerHTML = "<table></table>";
            document.body.appendChild(tooltipEl);
          }

          // Hide if no tooltip
          const tooltipModel = context.tooltip;

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

            body_brand.forEach(function (body, i) {
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
            position.left + window.pageXOffset + tooltipModel.caretX + "px";
          tooltipEl.style.top =
            position.top + window.pageYOffset + tooltipModel.caretY + "px";
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
      },
    },
  };

  const plugins = [
    {
      id: "myEventCatcher2",
      beforeEvent(chart, args, _pluginOptions) {
        const event = args.event;
        if (event.type === "mouseout") {
          let tooltipEl = document.getElementById("chartjs-tooltip2");
          if (tooltipEl) {
            tooltipEl.style.opacity = 0;
          }

          // process the event
        }
      },
    },
  ];

  const title = "Product Customer rating";

  return {
    data: data,
    title: title,
    options: options,
    headCells: headCells,
    rows: rows,
    plugins: plugins,
  };
};

function CustomerRating({ brand, nicheData, type }) {
  let chart_data = {};
  brand = brand || "";
  if (type === CustomerRatingChartType.BRAND) {
    chart_data = getCustomerRatingData(nicheData, brand);
  } else if (type === CustomerRatingChartType.PRODUCT) {
    chart_data = getCustomerRatingByProductData(nicheData, brand);
  } else {
    console.log("unsupported customer rating chart type: " + type);
    return null;
  }

  return (
    <React.Fragment>
      <BarChart chart_data={chart_data} />
    </React.Fragment>
  );
}

export default CustomerRating;
