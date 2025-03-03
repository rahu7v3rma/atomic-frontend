import CircleIcon from "@mui/icons-material/Circle";
import SearchIcon from "@mui/icons-material/Search";
import {
  CircularProgress,
  Grid,
  InputAdornment,
  ListSubheader,
  MenuItem,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";

import "@fontsource/inter";
import "@fontsource/inter/600.css";
// product details page
import {
  advanceBusinessReportSelector,
  fetchProductItemDetails,
} from "../../../../../redux/slices/advance_business_report";
import { businessReportSelector } from "../../../../../redux/slices/business_report";
import {
  productDetailSelector,
  setLevels1,
  setLevels2,
} from "../../../../../redux/slices/product_detail";
import {
  setStore,
  storeAnalyticsSelector,
} from "../../../../../redux/slices/store_analytics";
import { TabPanel } from "../../helpers";
//import ReviewAnalysis from "../ReviewAnalysis";
// import StoreProductCompetitors from "../StoreProductCompetitors";
import StoreProductDetails from "../StoreProductDetails";
import AnalyticsStoreProductDetails from "../StoreProductDetails/Analytics";
//import Business from "../StoreProductDetails/Business";
import {
  AllSKUsSelect,
  DropdownProgressDiv,
  Level2DropdownAsin,
  Level2DropdownImage,
  Level2DropdownProductName,
  Level2DropdownSku,
  StyledImageNotSupportedIcon,
} from "../StoreProductDetails/BusinessReportAdvanced/styles";
//import Insights from "../StoreProductDetails/Insights";
// product keywords page
import StoreProductKeywords from "../StoreProductKeywords";
import KeywordsBarchart from "../StoreProductKeywords/keywords_barchart";
import KeywordsListing from "../StoreProductKeywords/keywords_listing";
import KeywordsPerformance from "../StoreProductKeywords/keywords_performance";
// Dynamic store-level-SKU
import StorePicker from "../shared/Storepicker";

// product reviews page
import HistoricalCharts from "./HistoricalCharts";
import { Gap } from "./styles";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const StoreProductPage = ({
  currentStore,
  level1,
  level2,
  isLevel2Selected,
}) => {
  const [searchParams] = useSearchParams();
  const parent_asin =
    level1 === "Parent ASIN" && isLevel2Selected ? level2 : "";

  const sku = level1 === "SKU" && isLevel2Selected ? level2 : "";
  const child_asin = level1 === "Child ASIN" && isLevel2Selected ? level2 : "";

  const store = currentStore;
  const name = searchParams.get("name");

  return (
    <>
      <Gap height={40} />
      <StoreProductDetails
        store={store}
        skuId={sku}
        asinId={parent_asin}
        childAsin={child_asin}
        isLevel2Selected={isLevel2Selected}
      />
      <Gap height={40} />
      <AnalyticsStoreProductDetails
        store={store}
        sku={sku}
        asin={parent_asin}
        childAsin={child_asin}
        name={name}
        level1={level1}
      />
      <Gap height={40} />
      <HistoricalCharts
        store={store}
        asin={parent_asin}
        childAsin={child_asin}
        sku={sku}
      />
      {/*<Gap height={40} />/*}
      {/*<Business store={store} name={name} asin={asin} sku={sku} />*/}
      {/* <Gap height={40} /> */}
      {/* <Insights /> */}
    </>
  );
};

const ProductKeywordsPage = ({
  current_store,
  level1,
  level2,
  isLevel2Selected,
}) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const asin = searchParams.get("asin")
    ? searchParams.get("asin")
    : level1 === "Parent ASIN" && isLevel2Selected
    ? level2
    : "";

  const sku = searchParams.get("sku")
    ? searchParams.get("sku")
    : level1 === "SKU" && isLevel2Selected
    ? level2
    : "";

  const store = searchParams.get("store")
    ? searchParams.get("store")
    : current_store;

  useEffect(() => {
    dispatch(fetchProductKeywords({ productId: 1 }));
  }, [dispatch]);

  return (
    <React.Fragment>
      <Gap height={40} />
      <StoreProductKeywords
        store={store}
        skuId={sku}
        asinId={asin}
        isLevel2Selected={isLevel2Selected}
      />
      <Gap height={40} />
      <KeywordsBarchart />
      <Gap height={40} />
      <KeywordsListing />
      <Gap height={40} />
      {/* <ChartKeywords /> */}
      <KeywordsPerformance />
    </React.Fragment>
  );
};

const ProductSKUDashboard = () => {
  const router = useLocation();
  const [searchParams] = useSearchParams();
  const [value, setValue] = React.useState(0);
  const [skuSearchText, setSKUSearchText] = React.useState("");
  const sku = searchParams.get("sku");
  const dispatch = useDispatch();

  const Selectedstore = searchParams.get("store")
    ? searchParams.get("store")
    : "all";
  useEffect(() => {
    if (Selectedstore !== "all") {
      dispatch(setStore(Selectedstore));
    }
  }, [dispatch, Selectedstore]);
  const [currentStore, setCurrentStore] = useState(Selectedstore);

  // levels values
  const [level1, setLevel1] = useState("Select Level");
  const [level2, setLevel2] = useState("Select");
  const [level2Placeholder, setLevel2Placeholder] = useState("Select");
  const [_selectedLevel, setSelectedLevel] = useState("");
  //const fetchData = useRef(false);
  const { productItemDetailsList, productItemDetailsLoading } = useSelector(
    advanceBusinessReportSelector
  );
  const skuASINsLoading = false;
  const [selectedSkuASINList, setSelectedSkuASINList] = useState([]);
  const [isLevel2Selected, setIsLevel2Selected] = useState(false);

  const listLevel1 = ["SKU", "Parent ASIN", "Child ASIN"];

  const filteredSkuAsinList = useMemo(() => {
    if (selectedSkuASINList && selectedSkuASINList.length) {
      const formattedQuery = skuSearchText.toLowerCase().trim();
      if (formattedQuery === "") {
        return selectedSkuASINList;
      }
      const level = level1.toLowerCase().replace(/ /g, "_");
      return selectedSkuASINList.filter((skuItem) =>
        skuItem[level].toLowerCase().startsWith(formattedQuery)
      );
    }
    return [];
  }, [selectedSkuASINList, skuSearchText, level1]);
  useEffect(() => {
    setSelectedSkuASINList(productItemDetailsList);
  }, [productItemDetailsList]);
  const handlelevel1Change = (event) => {
    //    dispatch(setLevels1(event.target.value));
    setLevel1(event.target.value);
    setSelectedLevel(
      event.target.value === "SKU"
        ? "sku_list"
        : event.target.value === "Child ASIN"
        ? "child_asin_list"
        : "asin_list"
    );

    const level2 =
      event.target.value === "SKU"
        ? "Select SKU"
        : event.target.value === "Child ASIN"
        ? "Select Child ASIN"
        : "Select Parent ASIN";
    setLevel2Placeholder(level2);
    setLevel2(level2);
    setIsLevel2Selected(false);
  };
  const handlelevel2Change = (event) => {
    //    dispatch(setLevels2(event.target.value));
    setIsLevel2Selected(true);
    setLevel2(event.target.value);
  };

  useEffect(() => {
    if (currentStore !== "all" && level1.toLowerCase() !== "select level") {
      dispatch(
        fetchProductItemDetails({
          store: currentStore,
          level: level1.toLowerCase().split(" ").join("_"),
        })
      );
    }
  }, [currentStore, level1, dispatch]);

  //const handleStoreChange = (name) => {
  //  let level2 = null;
  //  setCurrentStore(name);
  //  dispatch(setStore(name));
  //  dispatch(setLevels1(null));
  //  dispatch(setLevels2(null));
  //  setSKUSearchText("");
  // setIsLevel2Selected(false);
  //  if (level1 === "SKU") level2 = "Select SKU";
  //  else if (level1 === "Parent ASIN") level2 = "Select Parent ASIN";
  //  else if (level1 === "Child ASIN") level2 = "Select Child ASIN";
  //  else {
  //    level2 = "Select";
  //  }

  //  setLevel2Placeholder(level2);
  //  setLevel2(level2);
  //};
  const handleStoreChange = useCallback(
    (name) => {
      let level2 = null;
      setCurrentStore(name);
      dispatch(setStore(name));
      dispatch(setLevels1(null));
      dispatch(setLevels2(null));
      setSKUSearchText("");
      setIsLevel2Selected(false);
      if (level1 === "SKU") level2 = "Select SKU";
      else if (level1 === "Parent ASIN") level2 = "Select Parent ASIN";
      else if (level1 === "Child ASIN") level2 = "Select Child ASIN";
      else if (level1 === "Child ASIN") level2 = "Select Child ASIN";
      else {
        level2 = "Select";
      }

      setLevel2Placeholder(level2);
      setLevel2(level2);
    },
    [
      setCurrentStore,
      dispatch,
      level1,
      setSKUSearchText,
      setIsLevel2Selected,
      setLevel2Placeholder,
      setLevel2,
    ]
  );

  //useEffect(() => {
  //  fetchData.current = true;
  //}, [level2]);

  useEffect(() => {
    const pathname = router.pathname;
    if (pathname.includes("pm-keywords-and-search")) {
      setValue(2);
    }
    // else if (pathname.includes("sm-competitors")) {
    //   setValue(1);
    // }
    else if (pathname.includes("pm-review-analysis")) {
      setValue(3);
    } else {
      setValue(parseInt(0));
    }
  }, [router]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const paramSKU = searchParams.get("sku");
    if (paramSKU) {
      setLevel1("SKU");
      setSelectedLevel("sku_list");

      setLevel2Placeholder(paramSKU);
      setLevel2(paramSKU);

      setIsLevel2Selected(true);
    }

    const paramAsin = searchParams.get("asin");
    if (paramAsin) {
      setLevel1("Parent ASIN");
      setSelectedLevel("asin_list");

      setLevel2Placeholder(paramAsin);
      setLevel2(paramAsin);

      setIsLevel2Selected(true);
    }

    const paramChildAsin = searchParams.get("child_asin");
    if (paramChildAsin) {
      setLevel1("Child ASIN");
      setSelectedLevel("child_asin_list");

      setLevel2Placeholder(paramChildAsin);
      setLevel2(paramChildAsin);

      setIsLevel2Selected(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (level1 !== "Select Level" && level2 !== "Select") {
      dispatch(setLevels1(level1));
      dispatch(setLevels2(level2));
    }
  }, [dispatch, level1, level2]);

  const { store } = useSelector(storeAnalyticsSelector);
  const {
    levels1,
    levels2,
    skuSalesChartLoading,
    productDetailLoading,
    historicalChartsLoading,
  } = useSelector(productDetailSelector);
  const { businessReportLoading } = useSelector(businessReportSelector);
  useEffect(() => {
    if (store) {
      setCurrentStore(store);
    }
  }, [store]);

  useEffect(() => {
    if (levels1) setLevel1(levels1);
  }, [levels1]);

  useEffect(() => {
    if (levels2) {
      setLevel2(levels2);
      setLevel2Placeholder(levels2);
    }
  }, [levels2]);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex" }}>
          <Box>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Overview" {...a11yProps(0)} />
              {/* <Tab label="Competitors" {...a11yProps(1)} /> */}
              {/*  <Tab label="Keywords & Search Funnel" {...a11yProps(2)} /> */}
              {/* <Tab label="Review Analysis" {...a11yProps(3)} /> */}
            </Tabs>
          </Box>
          {/* store-level-SKU selector */}
          <Box sx={{ marginLeft: "auto" }}>
            <StorePicker
              onStoreSelected={handleStoreChange}
              value={currentStore}
              style={{ backgroundColor: "white" }}
              disabled={
                skuSalesChartLoading ||
                productDetailLoading ||
                historicalChartsLoading ||
                skuASINsLoading ||
                businessReportLoading ||
                productItemDetailsLoading
              }
            />
            {value !== 1 && (
              <AllSKUsSelect
                value={level1}
                onChange={handlelevel1Change}
                displayEmpty
                disabled={
                  skuSalesChartLoading ||
                  productDetailLoading ||
                  historicalChartsLoading ||
                  skuASINsLoading ||
                  businessReportLoading ||
                  productItemDetailsLoading
                }
              >
                <MenuItem value="Select Level" selected={true} disabled={true}>
                  Select Level
                </MenuItem>
                {listLevel1?.map((row, index) => (
                  <MenuItem key={index} value={row}>
                    {row}
                  </MenuItem>
                ))}
              </AllSKUsSelect>
            )}
            {value !== 1 && (
              <AllSKUsSelect
                MenuProps={{ autoFocus: false, sx: { height: 700 } }}
                value={level2}
                onChange={handlelevel2Change}
                displayEmpty
                onClose={() => setSKUSearchText("")}
                renderValue={() => level2}
                disabled={
                  skuASINsLoading ||
                  skuSalesChartLoading ||
                  productDetailLoading ||
                  historicalChartsLoading ||
                  businessReportLoading ||
                  productItemDetailsLoading
                }
              >
                <ListSubheader>
                  <TextField
                    size="small"
                    autoFocus
                    placeholder="Search..."
                    fullWidth
                    value={skuSearchText}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    onChange={(e) => {
                      setSKUSearchText(e.target.value);
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
                  value={level2Placeholder}
                  selected={true}
                  disabled={true}
                >
                  {level2Placeholder}
                </MenuItem>
                {skuASINsLoading ? (
                  <DropdownProgressDiv>
                    <CircularProgress />
                  </DropdownProgressDiv>
                ) : (
                  filteredSkuAsinList?.length > 0 &&
                  filteredSkuAsinList?.map((row, index) => {
                    const level2ObjectKey = level1
                      .toLowerCase()
                      .split(" ")
                      .join("_");
                    return (
                      <MenuItem key={index} value={row[level2ObjectKey]}>
                        {row.image.startsWith("http") ? (
                          <Level2DropdownImage
                            src={row.image}
                            alt={row.image}
                          />
                        ) : (
                          <StyledImageNotSupportedIcon />
                        )}
                        <Grid container width={250}>
                          <Grid item xs={12}>
                            <Level2DropdownAsin>
                              {(level2ObjectKey === "sku"
                                ? row["parent_asin"]
                                : row[level2ObjectKey]) || "N/A"}
                            </Level2DropdownAsin>
                            <CircleIcon
                              sx={{ fontSize: 5, color: "#cdcdcd" }}
                            />
                            <Level2DropdownSku>
                              SKU {row.sku || "N/A"}
                            </Level2DropdownSku>
                          </Grid>
                          <Grid item>
                            <Level2DropdownProductName>
                              {row.product_name
                                ? row.product_name.slice(0, 30) + "..."
                                : "N/A"}
                            </Level2DropdownProductName>
                          </Grid>
                        </Grid>
                      </MenuItem>
                    );
                  })
                )}
              </AllSKUsSelect>
            )}
          </Box>
        </Box>
        <TabPanel value={value} index={0}>
          <StoreProductPage
            currentStore={currentStore}
            level1={level1}
            level2={level2}
            isLevel2Selected={isLevel2Selected}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ProductKeywordsPage
            value={sku}
            level1={level1}
            level2={level2}
            current_store={currentStore}
            isLevel2Selected={isLevel2Selected}
          />
        </TabPanel>
        {/* <TabPanel value={value} index={1}>
          <StoreProductCompetitors value={currentStore} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <ReviewAnalysis />
        </TabPanel> */}
      </Box>
    </>
  );
};

export default ProductSKUDashboard;
