import "@fontsource/inter";
import "@fontsource/inter/600.css";

import CircleIcon from "@mui/icons-material/Circle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import SearchIcon from "@mui/icons-material/Search";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  Grid,
  InputAdornment,
  ListSubheader,
  MenuItem,
  Select,
  Skeleton,
  Snackbar,
  SnackbarContent,
  Tab,
  Tabs,
  TextField,
  Tooltip,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DataGridPro, useGridApiRef } from "@mui/x-data-grid-pro";
import moment from "moment";
import { rgba } from "polished";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import {
  advanceBusinessReportSelector,
  changeDefaultAdvanceSelectionReport,
  fetchAdvanceBusinessReport,
  fetchProductItemDetails,
  fetchRankTrackingData,
  fetchUKRankTrackingData,
  resetProductItemDetailsList,
  resetRankTrackingData,
  resetUKRankTrackingData,
} from "../../../../../../redux/slices/advance_business_report";
import {
  setStore,
  storeAnalyticsSelector,
} from "../../../../../../redux/slices/store_analytics";
import {
  defaultLevel1AdvancedReport,
  defaultPeriodicity,
  defaultStoreProductAdvancedReport,
  storeNames,
} from "../../../constants";
import { TabPanel } from "../../../helpers";
import TableCustom from "../../StoreProducts/Table";
import { ChartLoader } from "../../chartloader";
import DatePicker from "../../shared/DatePicker";

import RankTracking from "./RankTracking";
import LineChart from "./chart";
import {
  AllSKUsSelect,
  Body,
  CustomCheckbox,
  CustomInput,
  DropdownProgressDiv,
  Gap,
  GraphContainer,
  GraphIndicators,
  Header,
  Level2DropdownAsin,
  Level2DropdownImage,
  Level2DropdownProductName,
  Level2DropdownSku,
  MetricsSelect,
  StyledImageNotSupportedIcon,
} from "./styles";

const DataTable = styled(DataGridPro)({
  ".MuiDataGrid-main>div:nth-child(3)": {
    display: "none",
  },
  // "& .MuiDataGrid-columnHeader .MuiDataGrid-iconButtonContainer": {
  //   display: "none",
  // },
  "& .MuiDataGrid-pinnedColumns": {
    backgroundColor: "white",
  },
  "& .MuiDataGrid-columnsContainer": {
    backgroundColor: "#fafafa",
  },
  // "& .MuiDataGrid-iconSeparator": {
  //   display: "none",
  // },
  "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
    borderRight: "1px solid #f0f0f0",
  },
  "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
    borderBottom: "1px solid #f0f0f0",
  },
  "& .MuiDataGrid-cell": {
    color: "rgba(0,0,0,.85)",
  },
  "& .MuiPaginationItem-root": {
    borderRadius: 0,
  },
});

const CustomAccordion = styled(Accordion)(({ _ }) => {
  return {
    boxShadow: "none", // this styles directly apply to accordion
    // border: "4px solid red",
    ".Mui-expanded": {
      minHeight: 25,
      marginTop: 5,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
    },
    ".MuiBox-root": {
      marginTop: 0,
    },
  };
});

const useStyles = makeStyles(() => ({
  menuPaper: {
    maxHeight: "calc(100% - 216px)",
  },
}));
const BusinessReportAdvanced = ({ value }) => {
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = React.useState(0);
  const classes = useStyles();
  const [searchParams] = useSearchParams();
  const paramLevel = searchParams.get("level");
  const paramValue = searchParams.get("value");
  const selectedLevel =
    paramLevel === "sku"
      ? "SKU"
      : paramLevel === "parent_asin"
      ? "Parent ASIN"
      : paramLevel === "child_asin"
      ? "Child ASIN"
      : null;
  const startDate = searchParams.get("start_date");
  const endDate = searchParams.get("end_date");
  const metrics = searchParams.get("metrics");

  const dispatch = useDispatch();
  // receive the API response from advance_business_report redux
  const {
    advanceBusinessReportData,
    advanceBusinessReportLoading,
    productItemDetailsList,
    productItemDetailsLoading,
    defaultAdvanceSelectionReport,
    rankTrackingData,
    rankTrackingDataLoading,
    ukRankTrackingData,
    ukRankTrackingDataLoading,
  } = useSelector(advanceBusinessReportSelector);

  const apiRef = useGridApiRef();

  setTimeout(() => {
    if (
      apiRef &&
      apiRef.current &&
      apiRef.current.scrollToIndexes &&
      apiRef.current.getAllColumns
    ) {
      apiRef.current.scrollToIndexes({
        colIndex: apiRef.current.getAllColumns
          ? apiRef.current.getAllColumns().length - 1
          : 0,
      });
    }
  }, 100);

  // Metrics
  const [displayEvents, setDisplayEvents] = useState(true);
  const [displayDeals, setDisplayDeals] = useState(true);
  const [currentMetric, setCurrentMetric] = useState(["select"]);
  const [metricList, setMetricList] = useState([]);
  const [list1, setList1] = useState([]);
  const marketRanks = ["US", "UK"];
  const [marketPlace, setMarketPlace] = React.useState("us");
  const [csv_headers, setCsv_headers] = useState([]);
  const [advBusinessData, setAdvBusinessData] = useState();
  const [chartData, setChartData] = useState({
    metric: "",
    labels: "",
    comparedLabels: "",
    dataset: [],
    compareDataset: [],
    events: {},
    comparedEvents: {},
    deals: {},
    comparedDeals: {},
  });
  // dummy data
  const [csvDataset, setCsvDataset] = useState([]);
  const [displayDataset, setDisplayDataset] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [level, setLevel] = useState("");
  const [showCompareGraph, setShowCompareGraph] = useState(false);

  const searchOptions = useMemo(() => {
    if (
      Array.isArray(productItemDetailsList) &&
      productItemDetailsList.length > 0
    ) {
      return productItemDetailsList.filter(
        (option) =>
          option?.product_name
            ?.toLowerCase()
            .includes(searchText.toLowerCase()) ||
          (level === "SKU"
            ? option?.sku?.toLowerCase().startsWith(searchText.toLowerCase())
            : level === "Parent ASIN"
            ? option?.parent_asin
                ?.toLowerCase()
                .startsWith(searchText.toLowerCase())
            : option?.child_asin
                ?.toLowerCase()
                .startsWith(searchText.toLowerCase()))
      );
    }
    return [];
  }, [searchText, productItemDetailsList, level]);

  const return_csv_data = useCallback(() => {
    const keys_list = [{ label: "LABEL", key: "label" }];
    const headers = keys_list.concat(
      metricList.map((v) => ({
        label: v.toUpperCase(),
        key: v.toLowerCase(),
      }))
    );
    setCsv_headers(headers);
  }, [metricList]);

  const handleMetricValueChange = useCallback(
    (value, advBusinessData) => {
      let data = {};
      let compareData = {};
      value.forEach((element) => {
        data[element] = extractData(element, advBusinessData);
        if (showCompareGraph) {
          compareData[element] = extractCompareData(element, advBusinessData);
        }
      });
      let events = {};
      let comparedEvents = {};
      let deals = {};
      let comparedDeals = {};
      let base_business_report = {};
      let base_compared_business_report = {};
      base_business_report = advBusinessData?.business_report;
      base_compared_business_report = advBusinessData?.compared_business_report;
      for (let i = 0; i < base_business_report?.dataset?.length; i++) {
        events[i] = base_business_report?.dataset[i]?.events;
        deals[i] = base_business_report?.dataset[i]?.deals;
        if (showCompareGraph) {
          comparedEvents[i] = base_compared_business_report?.dataset[i]?.events;
          comparedDeals[i] = base_compared_business_report?.dataset[i]?.deals;
        }
      }

      setChartData({
        metric: value,
        dataset: data,
        compareDataset: compareData,
        labels: base_business_report?.labels,
        comparedLabels: base_compared_business_report?.labels,
        events: events,
        comparedEvents: comparedEvents,
        deals: deals,
        comparedDeals: comparedDeals,
      });
      setCsvDataset(base_business_report?.dataset);
      setDisplayDataset(transposeMetricsData(base_business_report?.dataset));
    },
    [showCompareGraph]
  );

  // Function to handle selected matric values
  const handleMetricChange = useCallback(
    (event) => {
      let {
        target: { value },
      } = event;
      if (value && value.length < 5) {
        if (value.includes("select")) {
          value.splice(0, 1);
        }
        value = value.length === 0 ? ["select"] : value;
        setCurrentMetric(value);
        handleMetricValueChange(value, advBusinessData);
        setGraphHeight(
          (showCompareGraph ? value.length * 2 : value.length) > 4
            ? "22%"
            : "43%"
        );
      }
    },
    [showCompareGraph, advBusinessData, handleMetricValueChange]
  );

  function transposeMetricsData(data) {
    let transposedTable = Object.keys(data[0]).map((label) => {
      const transposedRow = { label };
      data.forEach((row) => {
        transposedRow[row.label] = row[label];
      });
      return transposedRow;
    });
    //formatting the data
    let orderedTable = [];
    let genIndex = 10;
    transposedTable.forEach((element) => {
      if (element.label === "label") {
        orderedTable[0] = element;
      } else if (element.label === "units") {
        orderedTable[1] = element;
      } else if (element.label === "sales") {
        const newElement = {};
        for (const key in element) {
          newElement[key] =
            key === "label"
              ? element[key]
              : "$" + element[key].toLocaleString();
        }
        orderedTable[2] = newElement;
      } else if (element.label === "avg_price") {
        const newElement = {};
        for (const key in element) {
          newElement[key] =
            key === "label"
              ? element[key]
              : "$" + element[key].toLocaleString();
        }
        orderedTable[3] = newElement;
      } else if (element.label === "spend_sp") {
        const newElement = {};
        for (const key in element) {
          newElement[key] =
            key === "label"
              ? element[key]
              : "$" + element[key].toLocaleString();
        }
        orderedTable[4] = newElement;
      } else if (element.label === "cpc_sp") {
        const newElement = {};
        for (const key in element) {
          newElement[key] =
            key === "label"
              ? element[key]
              : "$" + element[key].toLocaleString();
        }
        orderedTable[5] = newElement;
      } else if (element.label === "conversion_rate") {
        const newElement = {};
        for (const key in element) {
          newElement[key] = key === "label" ? element[key] : element[key] + "%";
        }
        orderedTable[6] = newElement;
      } else if (element.label === "sessions") {
        const newElement = {};
        for (const key in element) {
          newElement[key] =
            key === "label" ? element[key] : element[key].toLocaleString();
        }
        orderedTable[7] = newElement;
      } else if (element.label === "net_profit") {
        const newElement = {};
        for (const key in element) {
          newElement[key] =
            key === "label"
              ? element[key]
              : "$" + element[key].toLocaleString();
        }
        orderedTable[8] = newElement;
      } else if (element.label === "net_margin") {
        const newElement = {};
        for (const key in element) {
          newElement[key] = key === "label" ? element[key] : element[key] + "%";
        }
        orderedTable[9] = newElement;
      } else {
        orderedTable[genIndex] = element;
        genIndex++;
      }
    });
    return orderedTable;
  }

  //  Function which returns the filtered data from dataset
  function extractData(element, advBusinessData) {
    let extractedData = [];
    let base_business_report = {};

    base_business_report = advBusinessData?.business_report;
    base_business_report?.dataset?.forEach((item) => {
      if (advBusinessData.all_metrics.includes(element)) {
        extractedData.push(item[element]);
      }
    });
    return extractedData;
  }
  function extractCompareData(element, advBusinessData) {
    let extractedCompareData = [];
    let base_compared_business_report = {};

    base_compared_business_report = advBusinessData?.compared_business_report;
    base_compared_business_report?.dataset?.forEach((item) => {
      if (advBusinessData.all_metrics.includes(element)) {
        extractedCompareData.push(item[element]);
      }
    });
    return extractedCompareData;
  }
  const { store } = useSelector(storeAnalyticsSelector);
  const [currentStore, setCurrentStore] = useState(store);
  const [rankLoading, setRankLoading] = useState(false);

  // Periodicity
  const [currentPeriodicity, setCurrentPeriodicity] = useState(
    searchParams.get("periodicity") ?? defaultPeriodicity
  );

  // Initializing current dates
  const [currentStartDate, setCurrentStartDate] = useState(
    startDate && endDate
      ? startDate
      : defaultAdvanceSelectionReport.selectedStartDate ||
          moment().subtract(30, "days").format("YYYY-MM-DD")
  );

  const [currentEndDate, setCurrentEndDate] = useState(
    endDate && startDate
      ? endDate
      : defaultAdvanceSelectionReport.selectedEndDate ||
          moment().format("YYYY-MM-DD")
  );

  const [compareStartDate, setCompareStartDate] = useState(undefined);
  const [compareEndDate, setCompareEndDate] = useState(undefined);
  const [emptyAdvanceReport, setEmptyAdvanceReport] = useState(true);

  // levels values
  const [level1, setLevel1] = useState(
    defaultAdvanceSelectionReport &&
      defaultAdvanceSelectionReport.selectedLevel1
      ? defaultAdvanceSelectionReport.selectedLevel1
      : defaultLevel1AdvancedReport
  );
  const [level2, setLevel2] = useState(
    defaultAdvanceSelectionReport &&
      defaultAdvanceSelectionReport.selectedLevel2
      ? defaultAdvanceSelectionReport.selectedLevel2
      : "Select"
  );
  const fetchData = useRef(false);

  const listLevel1 = ["Parent ASIN", "Child ASIN", "SKU"];

  const handlelevel1Change = (event) => {
    const _level1 = event.target.value;
    setLevel1(_level1);
    setLevel2(`Select ${_level1}`);
    setEmptyAdvanceReport(true);

    const defaultAdvanceReportOption = {
      selectedStartDate: null,
      selectedEndDate: null,
      selectedLevel1: null,
      selectedMetric: [],
      selectedLevel2: null,
    };
    dispatch(changeDefaultAdvanceSelectionReport(defaultAdvanceReportOption));

    // Get product details for advance report page
    dispatch(
      fetchProductItemDetails({
        store: currentStore,
        level: _level1.toLowerCase().replaceAll(" ", "_"),
      })
    );
  };

  const handlelevel2Change = (event) => {
    const _level2 = event.target.value;
    setLevel2(_level2);
    if (compareStartDate) {
      setShowCompareGraph(true);
    } else {
      setShowCompareGraph(false);
    }
    if (
      currentStore !== "all" &&
      level1 !== "Select Level" &&
      !_level2.startsWith("Select")
    ) {
      dispatch(
        fetchAdvanceBusinessReport({
          store: currentStore,
          sku: level1 === "SKU" ? _level2 : "",
          asin: level1 === "Parent ASIN" ? _level2 : "",
          child_asin: level1 === "Child ASIN" ? _level2 : "",
          start_date: currentStartDate,
          end_date: currentEndDate,
          periodicity: currentPeriodicity,
          compare_start_date: compareStartDate,
          compare_end_date: compareEndDate,
        })
      );
      setEmptyAdvanceReport(false);
    }
  };

  useEffect(() => {
    if (
      defaultAdvanceSelectionReport &&
      defaultAdvanceSelectionReport.selectedLevel1 &&
      defaultAdvanceSelectionReport.selectedLevel2 &&
      defaultAdvanceSelectionReport.selectedStartDate &&
      defaultAdvanceSelectionReport.selectedEndDate &&
      productItemDetailsList?.length > 0
    ) {
      setLoading(true);
      setCompareStartDate(undefined);
      setCompareEndDate(undefined);
      setShowCompareGraph(false);
      setEmptyAdvanceReport(false);
      if (metrics && metrics !== "select") {
        setCurrentMetric(metrics.split(","));
      } else if (defaultAdvanceSelectionReport.selectedMetric) {
        setCurrentMetric(defaultAdvanceSelectionReport.selectedMetric);
      }
    }
  }, [defaultAdvanceSelectionReport, productItemDetailsList, metrics]);

  useEffect(() => {
    if (!level2 || level2 === "Select") {
      let initialStore;
      if (!currentStore || currentStore === "all") {
        initialStore = storeNames[1].value;
        setCurrentStore(initialStore);
        dispatch(setStore(initialStore));
      } else {
        initialStore = currentStore;
        // Get product details for advance report page
        dispatch(
          fetchProductItemDetails({
            store: initialStore,
            level: defaultLevel1AdvancedReport
              .toLowerCase()
              .split(" ")
              .join("_"),
          })
        );
      }
    }
  }, [currentStore, dispatch, level2]);

  // Set default data when reload or if there are no data selected on screen
  useEffect(() => {
    if (
      currentStore &&
      level2 === "Select" &&
      currentStore !== "all" &&
      // productItemDetailsList &&
      // productItemDetailsList.length > 0 &&
      !searchParams.get("value")
    ) {
      let value;
      setLoading(true);
      if (searchParams.get("level")) {
        setLevel1(selectedLevel);
        if (searchParams.get("level") === "sku") {
          value = defaultStoreProductAdvancedReport[currentStore].sku;
        } else if (searchParams.get("level") === "parent_asin") {
          value = defaultStoreProductAdvancedReport[currentStore].parentAsin;
        } else if (searchParams.get("level") === "child_asin") {
          value = defaultStoreProductAdvancedReport[currentStore].childAsin;
        }
      } else {
        value = defaultStoreProductAdvancedReport[currentStore].childAsin;
      }
      setLevel2(value);
      const defaultAdvanceReportOption = {
        selectedStartDate: currentStartDate,
        selectedEndDate: currentEndDate,
        selectedLevel1: searchParams.get("level")
          ? searchParams.get("level")
          : defaultLevel1AdvancedReport,
        selectedMetric: ["units", "avg_price"],
        selectedLevel2: value,
        selectedPeriodicity: defaultPeriodicity,
      };

      dispatch(changeDefaultAdvanceSelectionReport(defaultAdvanceReportOption));

      dispatch(
        fetchAdvanceBusinessReport({
          store: currentStore,
          sku: searchParams.get("level")
            ? searchParams.get("level") === "sku"
              ? defaultAdvanceReportOption.selectedLevel2
              : ""
            : defaultLevel1AdvancedReport === "SKU"
            ? defaultAdvanceReportOption.selectedLevel2
            : "",
          asin: searchParams.get("level")
            ? searchParams.get("level") === "parent_asin"
              ? defaultAdvanceReportOption.selectedLevel2
              : ""
            : defaultLevel1AdvancedReport === "Parent ASIN"
            ? defaultAdvanceReportOption.selectedLevel2
            : "",
          child_asin: searchParams.get("level")
            ? searchParams.get("level") === "child_asin"
              ? defaultAdvanceReportOption.selectedLevel2
              : ""
            : defaultLevel1AdvancedReport === "Child ASIN"
            ? defaultAdvanceReportOption.selectedLevel2
            : "",
          start_date: defaultAdvanceReportOption.selectedStartDate,
          end_date: defaultAdvanceReportOption.selectedEndDate,
          periodicity: defaultAdvanceReportOption.selectedPeriodicity,
          compare_start_date: null,
          compare_end_date: null,
        })
      );
      setEmptyAdvanceReport(false);
      setShowCompareGraph(false);
      setLoading(false);
    }
  }, [
    dispatch,
    level2,
    productItemDetailsList,
    currentStore,
    searchParams,
    selectedLevel,
    currentStartDate,
    currentEndDate,
  ]);

  // Convert the date into YYYY-MM-DD format to call API
  const handleDateChange = (csd, ced, cosd, coed, pc) => {
    if (level1 === "Child ASIN") {
      setRankLoading(true);
    }
    fetchData.current = true;
    if (cosd) {
      setShowCompareGraph(true);
    } else {
      setShowCompareGraph(false);
    }
    const payload = {
      start_date: csd ? moment(csd).format("YYYY-MM-DD") : "",
      end_date: ced ? moment(ced).format("YYYY-MM-DD") : "",
      compare_start_date: cosd ? moment(cosd).format("YYYY-MM-DD") : "",
      compare_end_date: coed ? moment(coed).format("YYYY-MM-DD") : "",
      periodicity: pc,
    };
    setCurrentStartDate(payload["start_date"]);
    setCurrentEndDate(payload["end_date"]);
    setCompareStartDate(payload["compare_start_date"]);
    setCompareEndDate(payload["compare_end_date"]);
    setCurrentPeriodicity(payload["periodicity"]);
    if (
      currentStore !== "all" &&
      level1 !== "Select Level" &&
      !level2.startsWith("Select")
    ) {
      dispatch(
        fetchAdvanceBusinessReport({
          store: currentStore,
          sku: level1 === "SKU" ? level2 : "",
          asin: level1 === "Parent ASIN" ? level2 : "",
          child_asin: level1 === "Child ASIN" ? level2 : "",
          start_date: payload["start_date"],
          end_date: payload["end_date"],
          periodicity: payload["periodicity"],
          compare_start_date: payload["compare_start_date"],
          compare_end_date: payload["compare_end_date"],
        })
      );
    }
    setEmptyAdvanceReport(false);
  };
  useEffect(() => {
    if (!defaultAdvanceSelectionReport?.selectedLevel2) {
      dispatch(resetProductItemDetailsList());
    }
  }, [dispatch, defaultAdvanceSelectionReport]);

  useEffect(() => {
    if (level2.includes("Select")) {
      // setCurrentMetric(["select"]);
      // setMetricList([]);
      setChartData({
        metric: "",
        labels: "",
        comparedLabels: "",
        dataset: [],
        compareDataset: [],
        events: {},
        comparedEvents: {},
        deals: {},
        comparedDeals: {},
      });
    }
  }, [level2]);
  // This useEffect allots the value to advBusinessData once data is received from API
  useEffect(() => {
    if (
      !emptyAdvanceReport &&
      advanceBusinessReportData &&
      Object.keys(advanceBusinessReportData).length
    ) {
      let report = structuredClone(advanceBusinessReportData);
      if (typeof report === "string") {
        report = report.replaceAll(":Infinity", ':"Infinity"');
        report = JSON.parse(report);
      }
      let data = {};
      let compareData = {};
      currentMetric.forEach((element) => {
        data[element] = extractData(element, report);
      });
      if (showCompareGraph) {
        currentMetric.forEach((element) => {
          compareData[element] = extractCompareData(element, report);
        });
      }

      let events = {};
      let comparedEvents = {};
      let deals = {};
      let comparedDeals = {};
      let base_business_report = {};
      let base_compared_business_report = {};
      base_business_report = report?.business_report;
      base_compared_business_report = report?.compared_business_report;
      for (let i = 0; i < base_business_report?.dataset?.length; i++) {
        events[i] = base_business_report?.dataset[i]?.events;
        deals[i] = base_business_report?.dataset[i]?.deals;
        if (showCompareGraph) {
          comparedEvents[i] = base_compared_business_report?.dataset[i]?.events;
          comparedDeals[i] = base_compared_business_report?.dataset[i]?.deals;
        }
      }

      setChartData({
        metric: currentMetric,
        dataset: data,
        compareDataset: compareData,
        labels: base_business_report?.labels,
        comparedLabels: base_compared_business_report?.labels,
        events: events,
        comparedEvents: comparedEvents,
        deals: deals,
        comparedDeals: comparedDeals,
      });
      setMetricList(report?.all_metrics);
      setAdvBusinessData(report);
      setCsvDataset(base_business_report?.dataset);
      setDisplayDataset(transposeMetricsData(base_business_report?.dataset));
      setEmptyAdvanceReport(false);
      setLoading(false);
    }
  }, [
    advanceBusinessReportData,
    currentMetric,
    showCompareGraph,
    emptyAdvanceReport,
  ]);

  useEffect(() => {
    if (
      advanceBusinessReportData &&
      Object.keys(advanceBusinessReportData).length
    ) {
      setCurrentStartDate(
        advanceBusinessReportData?.business_report?.start_date
      );
      setCurrentEndDate(advanceBusinessReportData?.business_report?.end_date);

      if (advanceBusinessReportData?.compared_business_report) {
        setCompareStartDate(
          advanceBusinessReportData?.compared_business_report?.start_date
        );
        setCompareEndDate(
          advanceBusinessReportData?.compared_business_report?.end_date
        );
      }
    }
  }, [advanceBusinessReportData]);

  useEffect(() => {
    setList1([
      ...metricList.filter(
        (x) =>
          x === "sales" ||
          x === "units" ||
          x === "sessions" ||
          x === "avg_price" ||
          x === "spend_sp" ||
          x === "conversion_rate"
      ),
      ...metricList.filter(
        (x) =>
          x !== "sales" &&
          x !== "units" &&
          x !== "sessions" &&
          x !== "avg_price" &&
          x !== "spend_sp" &&
          x !== "conversion_rate"
      ),
    ]);
  }, [level1, level2, dispatch, metricList]);

  useEffect(() => {
    if (selectedLevel && paramValue) {
      setLoading(true);
      setLevel1(selectedLevel);
      setLevel2(`Select ${selectedLevel}`);
      dispatch(
        fetchProductItemDetails({
          store: currentStore,
          level: selectedLevel.toLowerCase().split(" ").join("_"),
        })
      ).then(() => {
        setLevel2(paramValue);

        const defaultAdvanceReportOption = {
          selectedStartDate: currentStartDate,
          selectedEndDate: currentEndDate,
          selectedLevel1: selectedLevel,
          selectedMetric: ["sales", "sessions", "conversion_rate", "spend_sp"],
          selectedLevel2: paramValue,
        };

        dispatch(
          changeDefaultAdvanceSelectionReport(defaultAdvanceReportOption)
        );
        dispatch(
          fetchAdvanceBusinessReport({
            store: currentStore,
            sku: selectedLevel === "SKU" ? paramValue : "",
            asin: selectedLevel === "Parent ASIN" ? paramValue : "",
            child_asin: selectedLevel === "Child ASIN" ? paramValue : "",
            start_date: currentStartDate,
            end_date: currentEndDate,
            periodicity: currentPeriodicity,
          })
        );
        setEmptyAdvanceReport(false);
        setLoading(false);
      });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (
      (level1 === "Child ASIN" || level1 === "Parent ASIN") &&
      !level2.startsWith("Select") &&
      currentStartDate &&
      currentEndDate
    ) {
      dispatch(
        fetchRankTrackingData({
          asin: level1 === "Parent ASIN" ? level2 : "",
          child_asin: level1 === "Child ASIN" ? level2 : "",
          startDate: currentStartDate,
          endDate: currentEndDate,
          periodicity: currentPeriodicity,
          store: currentStore,
        })
      );
      dispatch(
        fetchUKRankTrackingData({
          asin: level1 === "Parent ASIN" ? level2 : "",
          child_asin: level1 === "Child ASIN" ? level2 : "",
          startDate: currentStartDate,
          endDate: currentEndDate,
          periodicity: currentPeriodicity,
          store: currentStore,
        })
      );
      setTabValue(0);
      setMarketPlace("us");
    } else if (level1 === "Child ASIN" || level1 === "Parent ASIN") {
      dispatch(resetRankTrackingData());
      dispatch(resetUKRankTrackingData());
    }
    setRankLoading(false);
  }, [
    dispatch,
    level1,
    currentStartDate,
    currentEndDate,
    level2,
    currentPeriodicity,
    currentStore,
  ]);

  const [readmore, setReadmore] = useState(false);
  const handleReadMore = () => {
    setReadmore(true);
  };
  const handleLessMore = () => {
    setReadmore(false);
  };

  const handleDisplayHideEvents = () => {
    setDisplayEvents(!displayEvents);
  };

  const handleDisplayHideDeals = () => {
    setDisplayDeals(!displayDeals);
  };

  useEffect(() => {
    if (value && !selectedLevel && !startDate && !endDate) {
      setCurrentStore(value);
      setLevel1(defaultLevel1AdvancedReport);
      setLevel2("Select");
      dispatch(resetProductItemDetailsList());
      setAdvBusinessData(null);
      dispatch(setStore(value));
      setCurrentMetric(["select"]);
      setCurrentStartDate(moment().subtract(30, "days").format("YYYY-MM-DD"));
      setCurrentEndDate(moment().format("YYYY-MM-DD"));
    }
  }, [dispatch, value, selectedLevel, startDate, endDate]);

  const chart1Scales = {
    y: {
      ticks: {
        color: "#EC4899",
      },
      beginAtZero: true,
      afterFit(scale) {
        scale.width = 40;
      },
    },
    y1: {
      ticks: {
        color: "#0891B2",
      },
      beginAtZero: true,
      afterFit(scale) {
        scale.width = 40;
      },
    },
    y2: {
      display: false,
    },
    y3: { display: false },
  };

  const chart1ScalesMany = {
    y: {
      ticks: {
        color: "#EC4899",
      },
      beginAtZero: true,
      afterFit(scale) {
        scale.width = 40;
      },
    },
    y1: {
      ticks: {
        color: "#0891B2",
      },
      beginAtZero: true,
      afterFit(scale) {
        scale.width = 40;
      },
    },
    y2: {
      display: false,
    },
    y3: { display: false },
    x: {
      ticks: {
        color: "transparent",
      },
    },
  };

  const chart2Scales = {
    y: { display: false },
    y1: { display: false },
    y2: {
      ticks: {
        color: "#D4D4D4",
      },
      beginAtZero: true,
      afterFit(scale) {
        scale.width = 40;
      },
    },
    y3: {
      ticks: {
        color: "#1A30F8",
      },
      beginAtZero: true,
      afterFit(scale) {
        scale.width = 40;
      },
    },
  };

  const colors = ["#EC4899", "#0891B2", "#D4D4D4", "#1A30F8"];
  // const height = "22%";

  // calculating height of graph box
  const [graphHeight, setGraphHeight] = useState("22%");
  useLayoutEffect(() => {
    var numOfPlotLines = 0;
    if (currentMetric[0] !== "select") {
      numOfPlotLines = showCompareGraph
        ? currentMetric.length * 2
        : currentMetric.length;
    }
    setGraphHeight(numOfPlotLines > 4 ? "22%" : "43%");
  }, [currentMetric, showCompareGraph]);

  // calculating height of the container having both graphs
  const [graphsContainerHeight, setGraphsContainerHeight] = useState(0);
  useLayoutEffect(() => {
    setGraphsContainerHeight(0.6 * window.innerHeight);
  }, []);
  const [open, setOpen] = useState(false);
  const copyContent = async () => {
    setOpen(true);
    try {
      let url = window.location.href.split("/advanced-business-report")[0];
      let pathname = window.location.pathname;
      let level =
        level1 === "Child ASIN"
          ? "child_asin"
          : level1 === "Parent ASIN"
          ? "parent_asin"
          : "sku";
      let value_level = level2;
      let text =
        url +
        pathname +
        "?store=" +
        value +
        "&level=" +
        level +
        "&start_date=" +
        currentStartDate +
        "&end_date=" +
        currentEndDate +
        "&periodicity=" +
        currentPeriodicity;
      if (!value_level.includes("Select")) {
        text += "&value=" + value_level;
      }
      if (currentMetric[0] !== "select") {
        text += "&metrics=" + currentMetric;
      }
      await navigator.clipboard.writeText(text);
    } catch {}
  };
  const handleClose = () => {
    setOpen(false);
  };
  function tabsProps(index) {
    return {
      value: index,
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const handleRankChange = (e) => {
    setMarketPlace(e.target.value);
    setTabValue(0);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  function getSelectedProduct(level1, level2) {
    let res = {};
    if (level2 !== "Select") {
      res["id_type"] = level1;
      res["id"] = level2;
    } else {
      res = null;
    }
    return res;
  }

  return (
    <>
      <Box
        sx={{ width: "100%" }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      />
      <Header.Container>
        <Header.Actions.Container>
          {/* Dynamic list for sku */}
          <AllSKUsSelect
            value={level1}
            onChange={handlelevel1Change}
            displayEmpty
            disabled={advanceBusinessReportLoading || loading}
          >
            <MenuItem value="Select Level" selected={true} disabled={true}>
              Select Level
            </MenuItem>
            {listLevel1.map((row, index) => (
              <MenuItem key={index} value={row}>
                {row}
              </MenuItem>
            ))}
          </AllSKUsSelect>
          <AllSKUsSelect
            MenuProps={{ autoFocus: false, sx: { height: 700 } }}
            value={level2}
            onChange={handlelevel2Change}
            displayEmpty
            onClose={() => setSearchText("")}
            renderValue={() => level2}
            disabled={advanceBusinessReportLoading || loading}
          >
            <ListSubheader>
              <TextField
                size="small"
                autoFocus
                placeholder="Search..."
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setLevel(level1);
                }}
                onKeyDown={(e) => {
                  if (e.key !== "Escape") {
                    //Prevent auto-selecting item while typing
                    e.stopPropagation();
                  }
                }}
              />
            </ListSubheader>
            <MenuItem
              value={
                level1 === "Select Level"
                  ? "Select"
                  : level1 === "SKU"
                  ? "Select SKU"
                  : level1 === "Child ASIN"
                  ? "Select Child ASIN"
                  : "Select Parent ASIN"
              }
              selected={true}
              disabled={true}
            >
              {level1 === "Select Level"
                ? "Select"
                : level1 === "SKU"
                ? "Select SKU"
                : level1 === "Child ASIN"
                ? "Select Child ASIN"
                : "Select Parent ASIN"}
            </MenuItem>
            {productItemDetailsLoading ? (
              <DropdownProgressDiv>
                <CircularProgress />
              </DropdownProgressDiv>
            ) : (
              productItemDetailsList?.length > 0 &&
              searchOptions?.map((row, index) => {
                const level2ObjectKey = level1
                  .toLowerCase()
                  .split(" ")
                  .join("_");
                return (
                  <MenuItem key={index} value={row[level2ObjectKey]}>
                    {row.image.startsWith("http") ? (
                      <Level2DropdownImage src={row.image} alt={row.image} />
                    ) : (
                      <StyledImageNotSupportedIcon />
                    )}
                    <Grid container width={500}>
                      <Grid item xs={12}>
                        <Level2DropdownAsin>
                          {(level2ObjectKey === "sku"
                            ? row["parent_asin"]
                            : row[level2ObjectKey]) || "N/A"}
                        </Level2DropdownAsin>
                        <CircleIcon sx={{ fontSize: 5, color: "#cdcdcd" }} />
                        <Level2DropdownSku>
                          SKU {row.sku || "N/A"}
                        </Level2DropdownSku>
                      </Grid>
                      <Grid item>
                        <Tooltip title={row.product_name}>
                          <Level2DropdownProductName>
                            {row.product_name
                              ? row.product_name.slice(0, 75) + "..."
                              : "N/A"}
                          </Level2DropdownProductName>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </MenuItem>
                );
              })
            )}
          </AllSKUsSelect>
          {/* Dynamic list for all Matrics */}
          <MetricsSelect
            multiple
            value={currentMetric}
            onChange={handleMetricChange}
            MenuProps={{ classes: { paper: classes.menuPaper } }}
            disabled={advanceBusinessReportLoading || loading}
          >
            <MenuItem selected={true} disabled={true} value="select">
              Select Metric
            </MenuItem>
            {list1?.length &&
              list1.map((row, index) => (
                <MenuItem
                  key={index}
                  value={row}
                  sx={
                    !readmore
                      ? {
                          ":nth-child(n+8)": {
                            position: "absolute",
                            zIndex: "-1",
                            visibility: "hidden",
                          },
                        }
                      : {}
                  }
                >
                  {row}
                </MenuItem>
              ))}
            {list1?.length !== 0 &&
              (!readmore ? (
                <MenuItem
                  style={{ color: "gray", justifyContent: "center" }}
                  onClick={handleReadMore}
                >
                  More <KeyboardArrowDownOutlinedIcon />
                </MenuItem>
              ) : (
                <MenuItem
                  style={{ color: "gray", justifyContent: "center" }}
                  onClick={handleLessMore}
                >
                  Close <KeyboardArrowUpOutlinedIcon />
                </MenuItem>
              ))}
          </MetricsSelect>
          <DatePicker
            showPeriodicity={true}
            onDatesSelected={handleDateChange}
            defaultDates={{
              startDate: new Date(currentStartDate),
              endDate: new Date(currentEndDate),
              compareStartDate: new Date(compareStartDate),
              compareEndDate: new Date(compareEndDate),
            }}
            defaultComparePeriod={
              defaultAdvanceSelectionReport ? "nothing" : "last-year"
            }
            defaultPreset={"Last 30 days"}
            disabled={advanceBusinessReportLoading || loading}
            periodicity={currentPeriodicity}
          />
          <Header.Actions.DownloadCSV.Container
            disabled={advanceBusinessReportLoading || loading}
          >
            {advanceBusinessReportLoading || loading ? (
              <div>
                <Header.Actions.DownloadCSV.Icons.Download
                  disabled={advanceBusinessReportLoading || loading}
                />
              </div>
            ) : (
              <CSVLink
                onClick={return_csv_data}
                data={csvDataset || []}
                filename="advance_business_report.csv"
                headers={csv_headers}
              >
                <Tooltip title="Download Report">
                  <Header.Actions.DownloadCSV.Icons.Download
                    disabled={advanceBusinessReportLoading || loading}
                  />
                </Tooltip>
              </CSVLink>
            )}
          </Header.Actions.DownloadCSV.Container>
          <Header.Actions.DownloadCSV.Container
            disabled={advanceBusinessReportLoading || loading}
          >
            {advanceBusinessReportLoading || loading ? (
              <div>
                <Header.Actions.DownloadCSV.Icons.Copy
                  disabled={advanceBusinessReportLoading || loading}
                />
              </div>
            ) : (
              <div onClick={copyContent}>
                <Tooltip title="Copy Report Url">
                  <Header.Actions.DownloadCSV.Icons.Copy
                    disabled={advanceBusinessReportLoading || loading}
                  />
                </Tooltip>
              </div>
            )}
          </Header.Actions.DownloadCSV.Container>
        </Header.Actions.Container>
      </Header.Container>
      <Gap height={20} />
      <CustomAccordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panelinventory-content"
          id="panelinventory-header"
          sx={{
            // minHeight: "15px",
            backgroundColor: rgba(203, 213, 225, 0.5),
          }}
        >
          <b>Inventory</b>
        </AccordionSummary>
        <AccordionDetails
          id="panelinventory-content"
          sx={{
            backgroundColor: rgba(203, 213, 225, 0.5),
          }}
        >
          <TableCustom
            style={{ maxHeight: "220px" }}
            value={{
              current: {
                start_date: currentStartDate,
                end_date: currentEndDate,
              },
              compare: {
                start_date: compareStartDate,
                end_date: compareEndDate,
              },
              product: getSelectedProduct(level1, level2),
              store: currentStore,
            }}
          />
        </AccordionDetails>
      </CustomAccordion>
      <CustomAccordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panelgraph-content"
          id="panelgraph-header"
          sx={{
            backgroundColor: rgba(203, 213, 225, 0.5),
          }}
        >
          <b>Graph</b>
        </AccordionSummary>
        <AccordionDetails
          id="panelgraph-content"
          sx={{
            backgroundColor: rgba(203, 213, 225, 0.5),
          }}
        >
          <Body.Container>
            {advanceBusinessReportLoading || loading ? (
              <>
                <ChartLoader max={500} />
              </>
            ) : (
              advBusinessData && (
                <Box height={graphsContainerHeight}>
                  <CustomInput
                    control={
                      <CustomCheckbox
                        disabled={!list1?.length}
                        checked={displayEvents}
                        onChange={handleDisplayHideEvents}
                      />
                    }
                    label={"Display events"}
                  />
                  <CustomInput
                    control={
                      <CustomCheckbox
                        disabled={!list1?.length}
                        checked={displayDeals}
                        onChange={handleDisplayHideDeals}
                      />
                    }
                    label={"Display deals"}
                  />
                  <GraphIndicators.Container>
                    {currentMetric[0] !== "select" &&
                      currentMetric.map((m, i) => (
                        <GraphIndicators.Wrapper key={i}>
                          <GraphIndicators.Line color={colors[i]} />
                          <GraphIndicators.Text>{m}</GraphIndicators.Text>
                        </GraphIndicators.Wrapper>
                      ))}
                  </GraphIndicators.Container>
                  <Gap height={30} />
                  {showCompareGraph ? (
                    <>
                      <GraphContainer height={graphHeight}>
                        <LineChart
                          dataset={chartData?.dataset}
                          labels={chartData?.labels}
                          scales={
                            currentMetric.length > 2
                              ? chart1ScalesMany
                              : chart1Scales
                          }
                          events={displayEvents ? chartData?.events : {}}
                          deals={displayDeals ? chartData?.deals : {}}
                        />
                      </GraphContainer>
                      {currentMetric.length > 2 ? (
                        <GraphContainer height={graphHeight}>
                          <LineChart
                            dataset={chartData?.dataset}
                            labels={chartData?.labels}
                            scales={chart2Scales}
                            events={displayEvents ? chartData?.events : {}}
                            deals={displayDeals ? chartData?.deals : {}}
                          />
                        </GraphContainer>
                      ) : (
                        <></>
                      )}
                      <Gap height={20} />
                      <GraphContainer height={graphHeight}>
                        <LineChart
                          dataset={chartData?.compareDataset}
                          labels={chartData?.comparedLabels}
                          scales={
                            currentMetric.length > 2
                              ? chart1ScalesMany
                              : chart1Scales
                          }
                          events={
                            displayEvents ? chartData?.comparedEvents : {}
                          }
                          deals={displayDeals ? chartData?.comparedDeals : {}}
                          is_compare={true}
                        />
                      </GraphContainer>
                      {currentMetric.length > 2 ? (
                        <GraphContainer height={graphHeight}>
                          <LineChart
                            dataset={chartData?.compareDataset}
                            labels={chartData?.comparedLabels}
                            scales={chart2Scales}
                            events={
                              displayEvents ? chartData?.comparedEvents : {}
                            }
                            deals={displayDeals ? chartData?.comparedDeals : {}}
                            is_compare={true}
                          />
                        </GraphContainer>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <>
                      <GraphContainer
                        height={currentMetric.length > 2 ? "40%" : "90%"}
                      >
                        <LineChart
                          dataset={chartData?.dataset}
                          labels={chartData?.labels}
                          scales={
                            currentMetric.length > 2
                              ? chart1ScalesMany
                              : chart1Scales
                          }
                          events={displayEvents ? chartData?.events : {}}
                          deals={displayDeals ? chartData?.deals : {}}
                        />
                      </GraphContainer>
                      {currentMetric.length > 2 ? (
                        <GraphContainer height={"43%"}>
                          <LineChart
                            dataset={chartData?.dataset}
                            labels={chartData?.labels}
                            scales={chart2Scales}
                            events={displayEvents ? chartData?.events : {}}
                            deals={displayDeals ? chartData?.deals : {}}
                          />
                        </GraphContainer>
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                </Box>
              )
            )}
          </Body.Container>
        </AccordionDetails>
      </CustomAccordion>
      <CustomAccordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="paneltable-content"
          id="paneltable-header"
          sx={{
            backgroundColor: rgba(203, 213, 225, 0.5),
          }}
        >
          <b>Data table</b>
        </AccordionSummary>
        <AccordionDetails
          id="paneltable-content"
          sx={{
            backgroundColor: rgba(203, 213, 225, 0.5),
          }}
        >
          {loading ||
          advanceBusinessReportLoading ||
          displayDataset[0] === undefined ? (
            <>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <Skeleton
                  key={item}
                  width={"95%"}
                  sx={{ mt: 5, ml: 5 }}
                  variant="rectangular"
                  height={15}
                />
              ))}
            </>
          ) : (
            <DataTable
              disableColumnReorder={true}
              rowReordering={true}
              apiRef={apiRef}
              style={{ backgroundColor: "white", height: "500px" }}
              columns={Object.keys(displayDataset[0]).map((item) => ({
                field: item,
                headerName: item,
                width: item === "label" ? 165 : 100,
              }))}
              rows={displayDataset.slice(1)}
              getRowId={(row) => row["label"]}
              initialState={{ pinnedColumns: { left: ["label"] } }}
            />
          )}
        </AccordionDetails>
      </CustomAccordion>
      <CustomAccordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panelrank-content"
          id="panelrank-header"
          sx={{
            backgroundColor: rgba(203, 213, 225, 0.5),
          }}
        >
          <b>Ranking</b>
        </AccordionSummary>
        <AccordionDetails
          id="panelrank-content"
          sx={{
            backgroundColor: rgba(203, 213, 225, 0.5),
          }}
        >
          {rankTrackingDataLoading ||
          rankLoading ||
          ukRankTrackingDataLoading ? (
            <>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <Skeleton
                  key={item}
                  width={"95%"}
                  sx={{ mt: 5, ml: 5 }}
                  variant="rectangular"
                  height={15}
                />
              ))}
            </>
          ) : (
            rankTrackingData?.ranks &&
            (level1 === "Child ASIN" || level1 === "Parent ASIN") && (
              <Body.Container>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Select
                    value={marketPlace}
                    style={{
                      height: 30,
                      fontSize: "10px",
                      width: 60,
                    }}
                    onChange={handleRankChange}
                  >
                    {marketRanks?.map((place, index) => (
                      <MenuItem
                        key={index}
                        value={place === "US" ? "us" : "uk"}
                      >
                        {place}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <Tabs value={tabValue} onChange={handleTabChange}>
                  <Tab label={"Rank Tracking"} {...tabsProps(0)} />
                  <Tab
                    label={"Competitors"}
                    disabled={
                      marketPlace === "uk" ||
                      rankTrackingData.ranks.competitors_ranks?.competitors_asin
                        .length === 0 ||
                      Object.keys(
                        rankTrackingData.ranks.competitors_ranks?.ranks
                      ).length === 0
                    }
                    {...tabsProps(1)}
                  />
                </Tabs>
                <TabPanel value={tabValue} index={0}>
                  <RankTracking
                    data={rankTrackingData}
                    uk_data={ukRankTrackingData}
                    currentPeriodicity={currentPeriodicity}
                    marketPlace={marketPlace}
                  />
                </TabPanel>
                <TabPanel
                  value={tabValue}
                  disabled={marketPlace === "uk"}
                  index={1}
                >
                  <RankTracking
                    type="competitors"
                    data={rankTrackingData}
                    uk_data={ukRankTrackingData}
                    marketPlace={marketPlace}
                    currentPeriodicity={currentPeriodicity}
                  />
                </TabPanel>
                <Gap height={30} />
              </Body.Container>
            )
          )}
        </AccordionDetails>
      </CustomAccordion>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Report url copied"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <SnackbarContent
          sx={{ minWidth: "100px !important" }}
          message="Report url copied"
        />
      </Snackbar>
    </>
  );
};

export default BusinessReportAdvanced;
