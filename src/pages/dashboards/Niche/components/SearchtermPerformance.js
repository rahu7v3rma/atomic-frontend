import React from "react";

import BarChart from "./CustomBarChart";

const callback = (context) => {
  return `Top 3 brands: ${context[0].dataset.top_brands_data[
    context[0].dataIndex
  ].join()}`;
};

const getBrandByName = (data, product_name) => {
  return data.filter((elem) => elem.name === product_name).length
    ? data.filter((elem) => elem.name === product_name)[0].brand
    : "";
};

const createData = (search_term, search_volume, conversion_rate) => {
  return { search_term, search_volume, conversion_rate };
};

const getSearchTermPerformanceData = (p_data) => {
  const data_list = p_data?.search_terms;
  const data_list_products = p_data?.products;
  const top_products = data_list.map((elem) =>
    [...Array(3).keys()].map((i) => elem[`top_${i + 1}_clicked_product_name`])
  );
  var top_brands = top_products.map((elem) =>
    elem.map((el) => getBrandByName(data_list_products, el))
  );
  top_brands = top_brands.map((elem) => elem.filter((el) => el));

  const headCells = [
    {
      id: "search_term",
      numeric: false,
      disablePadding: true,
      label: "Search Term",
    },
    {
      id: "search_volume",
      numeric: true,
      disablePadding: false,
      label: "Search Volume",
    },
    {
      id: "conversion_rate",
      numeric: true,
      disablePadding: false,
      label: "Conversion rate",
    },
  ];

  const rows = data_list.map((el) => {
    return createData(
      el.search_term,
      el.search_volume,
      parseFloat(el.search_conversion_rate)
    );
  });

  const data = {
    labels: data_list.map((elem) => elem.search_term),
    datasets: [
      {
        label: "Search Volume",
        backgroundColor: "rgba(71, 130, 218, 1)",
        borderColor: "rgba(71, 130, 218, 1)",
        hoverBackgroundColor: "rgba(71, 130, 218, 1)",
        hoverBorderColor: "rgba(71, 130, 218, 1)",
        data: data_list.map((elem) => elem.search_volume),
        top_brands_data: top_brands,
        barPercentage: 0.75,
        categoryPercentage: 0.5,
        yAxisID: "y",
      },
      {
        label: "Conversion rate",
        backgroundColor: "rgba(255, 0, 0, 0.8)",
        borderColor: "rgba(255, 0, 0, 0.8)",
        hoverBackgroundColor: "rgba(255, 0, 0, 0.8)",
        hoverBorderColor: "rgba(255, 0, 0, 0.8)",
        data: data_list.map((elem) => parseFloat(elem.search_conversion_rate)),
        top_brands_data: top_brands,
        barPercentage: 0.75,
        categoryPercentage: 0.5,
        yAxisID: "ya",
      },
    ],
    ticks: {},
    plugins: {
      tooltip: {
        callbacks: {
          afterBody: callback,
        },
      },
      legend: {
        display: true,
      },
    },
  };

  const title = "Search terms analysis";

  return { data: data, title: title, headCells: headCells, rows: rows };
};

function SearchtermPerformance({ data }) {
  const chart_data_searchterm = getSearchTermPerformanceData(data);

  return (
    <React.Fragment>
      <BarChart chart_data={chart_data_searchterm} />
    </React.Fragment>
  );
}

export default SearchtermPerformance;
