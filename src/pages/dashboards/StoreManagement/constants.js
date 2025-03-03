const storesEmails = {
  buttertree: ["jonethan@atomic-growth.com"],
  rushmorerose: ["motim@atomic-growth.com"],
  vos: ["eli@atomic-growth.com"],
  atlasonix: ["alex@atomic-growth.com"],
  trueocity: ["lihi@atomic-growth.com"],
  AmazonWallDisplay: ["amazon@atomic-growth.com"],
};

const storeNames = [
  {
    value: "all",
    label: "All stores",
  },
  {
    value: "atlasonix",
    label: "Atlasonix",
  },
  {
    value: "buttertree",
    label: "Buttertree",
  },
  {
    value: "duramont",
    label: "Duramont",
  },
  {
    value: "garnetics",
    label: "Garnetics",
  },
  {
    value: "rushmorerose",
    label: "Rushmore Rose",
  },
  {
    value: "trueocity",
    label: "Trueocity",
  },
  {
    value: "vos",
    label: "Vos",
  },
  {
    value: "volko",
    label: "VolkGo",
  },
]; // file: shared/Storepicker.js

const filters = [
  {
    value: "",
    label: "None",
  },
  {
    value: 1,
    label: "1 star",
  },
  {
    value: 2,
    label: "2 star",
  },
  {
    value: 3,
    label: "3 star",
  },
  {
    value: 4,
    label: "4 star",
  },
  {
    value: 5,
    label: "5 star",
  },
  {
    value: "v-1",
    label: "verified purchase",
  },
]; // file: AllReviews.js

const sort_by_list = [
  {
    value: "",
    label: "None",
  },
  {
    value: "1",
    label: "date_utc ascending",
  },
  {
    value: "2",
    label: "date_utc descending",
  },
  {
    value: "3",
    label: "helpful_votes ascending",
  },
  {
    value: "4",
    label: "helpful_votes descending",
  },
]; // file: AllReviews.js

const presets = [
  "Today",
  "Yesterday",
  "Last 7 days",
  "Last 30 days",
  "Last 90 days",
  "Last month",
  "Last year",
  "Week to date",
]; //file: shared/DatePicker/helper.js

const dateRanges = [
  {
    value: 1,
    label: "Custom",
  },
  {
    value: 2,
    label: "Today",
  },
  {
    value: 3,
    label: "Last 30 days",
  },
  {
    value: 4,
    label: "Last 12 months",
  },
  {
    value: 5,
    label: "Last 7 days",
  },
  {
    value: 6,
    label: "Last 14 days",
  },
  {
    value: 7,
    label: "Last 90 days",
  },
]; // file: StoreAnalysis/Datepicker.js

const compareToValues = [
  {
    value: 1,
    label: "Previous period",
  },
  {
    value: 2,
    label: "Previous year",
  },
]; // file: StoreAnalysis/Datepicker.js

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]; // file: StorePlanning/GoalsTable.js and StoreProducts/TableRow.js

const labels = [
  ["S", "01"],
  ["S", "02"],
  ["M", "03"],
  ["T", "04"],
  ["W", "05"],
  ["T", "06"],
  ["F", "07"],
  ["S", "08"],
  ["S", "09"],
  ["M", "10"],
  ["T", "11"],
  ["W", "12"],
  ["T", "13"],
  ["F", "14"],
  ["S", "15"],
  ["S", "16"],
  ["M", "17"],
  ["T", "18"],
  ["W", "19"],
  ["T", "20"],
  ["F", "21"],
  ["S", "22"],
  ["S", "23"],
  ["M", "24"],
  ["T", "25"],
  ["W", "26"],
  ["T", "27"],
  ["F", "28"],
  ["S", "29"],
  ["S", "30"],
]; //file: StorePlanning/store_planning.js

const actualData = [
  1000, 1500, 1400, 1700, 1500, 1500, 2100, 1700, 2000, 1200, 1600, 1400, 1500,
  1000, 1200, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
]; //file: StorePlanning/store_planning.js
const forecastData = [
  1000, 1500, 1500, 1700, 1500, 2000, 2100, 2000, 2000, 2400, 2000, 1800, 2300,
  1000, 2000, 1000, 2000, 1500, 1600, 2200, 1800, 1900, 1200, 1400, 1200, 1500,
  1600, 1700, 1400, 9000,
];
const goalData = [
  1300, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000, 3200, 3400, 3600, 3800,
  4000, 4200, 4400, 4600, 4800, 5000, 5200, 5400, 5600, 5800, 6000, 6200, 6400,
  6600, 6800, 7000, 7200,
]; //file: StorePlanning/store_planning.js
const dates = [
  "2022-10-01T18:30:00.000Z",
  "2022-10-02T18:30:00.000Z",
  "2022-10-03T18:30:00.000Z",
  "2022-10-04T18:30:00.000Z",
  "2022-10-05T18:30:00.000Z",
  "2022-10-06T18:30:00.000Z",
  "2022-10-07T18:30:00.000Z",
  "2022-10-08T18:30:00.000Z",
  "2022-10-09T18:30:00.000Z",
  "2022-10-10T18:30:00.000Z",
  "2022-10-11T18:30:00.000Z",
  "2022-10-12T18:30:00.000Z",
  "2022-10-13T18:30:00.000Z",
  "2022-10-14T18:30:00.000Z",
  "2022-10-15T18:30:00.000Z",
  "2022-10-16T18:30:00.000Z",
  "2022-10-17T18:30:00.000Z",
  "2022-10-18T18:30:00.000Z",
  "2022-10-19T18:30:00.000Z",
  "2022-10-20T18:30:00.000Z",
  "2022-10-21T18:30:00.000Z",
  "2022-10-22T18:30:00.000Z",
  "2022-10-23T18:30:00.000Z",
  "2022-10-24T18:30:00.000Z",
  "2022-10-25T18:30:00.000Z",
  "2022-10-26T18:30:00.000Z",
  "2022-10-27T18:30:00.000Z",
  "2022-10-28T18:30:00.000Z",
  "2022-10-29T18:30:00.000Z",
  "2022-10-30T18:30:00.000Z",
]; //file: StorePlanning/store_planning.js

const days = ["M", "T", "W", "T", "F", "S", "S"]; //file: Analytics/data.js and BusinessReportAdvanced/data.js

const Report = [
  {
    title: "Page views",
    subtitle: "Buy box percentage",
    value: "",
    percentvalue: null,
    percentage: null,
    sessionpercentage: 3,
  },
  {
    title: "Sessions",
    subtitle: "Sessions per view ratio",
    value: "",
    percentvalue: null,
    percentage: null,
    sessionpercentage: null,
  },
  {
    title: "Units order",
    subtitle: "Units per sessions rate",
    value: "",
    percentvalue: null,
    sessionpercentage: null,
    percentage: null,
    loss: "loss",
    gain: false,
    session: true,
  },
  {
    title: "Total order items",
    subtitle: "Items per sessions rate",
    value: "",
    percentvalue: null,
    percentage: null,
    sessionpercentage: null,
    loss: "loss",
    gain: "gain",
    session: true,
  },
]; //file: StoreProductDetails/Business.js

const keywordsList = [
  {
    flag: "USA flag",
    v1: "76.532",
    v2: "245.593",
    v3: "$1, 21",
    v4: "$72.451,04",
    v5: "4,56%",
    v6: "642",
    v7: "15,61%",
  },
  {
    flag: "USA flag",
    v1: "76.532",
    v2: "245.593",
    v3: "$1, 21",
    v4: "$72.451,04",
    v5: "4,56%",
    v6: "642",
    v7: "15,61%",
  },
  {
    flag: "USA flag",
    v1: "76.532",
    v2: "245.593",
    v3: "$1, 21",
    v4: "$72.451,04",
    v5: "4,56%",
    v6: "642",
    v7: "15,61%",
  },
  {
    flag: "USA flag",
    v1: "76.532",
    v2: "245.593",
    v3: "$1, 21",
    v4: "$72.451,04",
    v5: "4,56%",
    v6: "642",
    v7: "15,61%",
  },
  {
    flag: "USA flag",
    v1: "76.532",
    v2: "245.593",
    v3: "$1, 21",
    v4: "$72.451,04",
    v5: "4,56%",
    v6: "642",
    v7: "15,61%",
  },
  {
    flag: "USA flag",
    v1: "76.532",
    v2: "245.593",
    v3: "$1, 21",
    v4: "$72.451,04",
    v5: "4,56%",
    v6: "642",
    v7: "15,61%",
  },
  {
    flag: "USA flag",
    v1: "76.532",
    v2: "245.593",
    v3: "$1, 21",
    v4: "$72.451,04",
    v5: "4,56%",
    v6: "642",
    v7: "15,61%",
  },
  {
    flag: "USA flag",
    v1: "76.532",
    v2: "245.593",
    v3: "$1, 21",
    v4: "$72.451,04",
    v5: "4,56%",
    v6: "642",
    v7: "15,61%",
  },
  {
    flag: "USA flag",
    v1: "76.532",
    v2: "245.593",
    v3: "$1, 21",
    v4: "$72.451,04",
    v5: "4,56%",
    v6: "642",
    v7: "15,61%",
  },
  {
    flag: "USA flag",
    v1: "76.532",
    v2: "245.593",
    v3: "$1, 21",
    v4: "$72.451,04",
    v5: "4,56%",
    v6: "642",
    v7: "15,61%",
  },
  {
    flag: "USA flag",
    v1: "76.532",
    v2: "245.593",
    v3: "$1, 21",
    v4: "$72.451,04",
    v5: "4,56%",
    v6: "642",
    v7: "15,61%",
  },
  {
    flag: "USA flag",
    v1: "76.532",
    v2: "245.593",
    v3: "$1, 21",
    v4: "$72.451,04",
    v5: "4,56%",
    v6: "642",
    v7: "15,61%",
  },
  {
    flag: "USA flag",
    v1: "76.532",
    v2: "245.593",
    v3: "$1, 21",
    v4: "$72.451,04",
    v5: "4,56%",
    v6: "642",
    v7: "15,61%",
  },
  {
    flag: "USA flag",
    v1: "76.532",
    v2: "245.593",
    v3: "$1, 21",
    v4: "$72.451,04",
    v5: "4,56%",
    v6: "642",
    v7: "15,61%",
  },
  {
    flag: "USA flag",
    v1: "76.532",
    v2: "245.593",
    v3: "$1, 21",
    v4: "$72.451,04",
    v5: "4,56%",
    v6: "642",
    v7: "15,61%",
  },
  {
    flag: "USA flag",
    v1: "76.532",
    v2: "245.593",
    v3: "$1, 21",
    v4: "$72.451,04",
    v5: "4,56%",
    v6: "642",
    v7: "15,61%",
  },
]; // file: StoreProductKeywords/ListingTable.js

const sortAvailableFor = {
  "3PL Quantity": (row) => ("3pl" in row ? row["3pl"]["quantity"] : ""),
  "FBA Quantity": (row) =>
    "fba_report" in row
      ? row["fba_report"]["quantity"] === "Soon"
        ? 0
        : row["fba_report"]["quantity"]
      : 0,
  "1 Month Forecast": (row) =>
    row[`demand_forcasting_1_months`] === "N/A"
      ? 0
      : row[`demand_forcasting_1_months`],
  "3 Months Forecast": (row) =>
    row[`demand_forcasting_3_months`] === "N/A"
      ? 0
      : row[`demand_forcasting_3_months`],
  "6 Months Forecast": (row) =>
    row[`demand_forcasting_6_months`] === "N/A"
      ? 0
      : row[`demand_forcasting_6_months`],
  "Days of Supply": (row) => row.days_of_supply?.visible || 0,
}; // file: StoreProducts/helpers.js

const sortAvailableType = {
  "3PL Quantity": "desc",
  "FBA Quantity": "desc",
  "3 Months Forecast": "desc",
  "6 Months Forecast": "desc",
  "1 Month Forecast": "desc",
}; // file: StoreProducts/helpers.js

const columns = [
  "",
  "Goal",
  "Sales to date",
  "Last Year same month",
  "Days Left",
  "Actual vs. Goal",
  "Profit (est.)",
];

const defaultLevel1AdvancedReport = "Child ASIN";
const defaultStoreProductAdvancedReport = {
  atlasonix: {
    sku: "DOMINO_80",
    childAsin: "B08CHGC9HK",
    parentAsin: "B08CHGC9HK",
  },
  duramont: {
    sku: "Desk chair",
    childAsin: "B0797HZ8W1",
    parentAsin: "B0797HZ8W1",
  },
  vos: {
    sku: "Vos-4",
    childAsin: "B0171BTJ84",
    parentAsin: "B0171BTJ84",
  },
  volko: {
    sku: "QN-EVS9-KB5W",
    childAsin: "B01M2A4IK1",
    parentAsin: "B01M2A4IK1",
  },
  buttertree: {
    sku: "MBP20",
    childAsin: "B08CSZHY2Z",
    parentAsin: "B08CSZHY2Z",
  },
  rushmorerose: {
    sku: "RRN3X5US",
    childAsin: "B01HMWWLCI",
    parentAsin: "B01N7C5DL4",
  },
  garnetics: {
    sku: "US Flag cover 52-55",
    childAsin: "B0B7S3S8H5",
    parentAsin: "B0B8C47WBV",
  },
  trueocity: {
    sku: "SUCTIONASSORTED",
    childAsin: "B07Y9L2N5Z",
    parentAsin: "B07Y9L2N5Z",
  },
};
const defaultPeriodicity = "day";
const LOGOUT_ROUTE = "/auth/sign-in";

module.exports = {
  storesEmails,
  storeNames,
  filters,
  sort_by_list,
  presets,
  dateRanges,
  compareToValues,
  months,
  labels,
  actualData,
  forecastData,
  goalData,
  dates,
  days,
  Report,
  keywordsList,
  sortAvailableFor,
  sortAvailableType,
  columns,
  defaultLevel1AdvancedReport,
  defaultStoreProductAdvancedReport,
  defaultPeriodicity,
  LOGOUT_ROUTE,
};
