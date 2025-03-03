import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { Stack } from "@mui/system";
import moment from "moment";
import React, { useCallback, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { AuthContext } from "../../../contexts/JWTContext";
import {
  advanceBusinessReportSelector,
  changeDefaultAdvanceSelectionReport,
} from "../../../redux/slices/advance_business_report";
import { notificationsSelector } from "../../../redux/slices/notifications";
import { productDetailSelector } from "../../../redux/slices/product_detail";
import {
  fetchActiveNotificationsCount,
  getStoreGoals,
  getWeeklyInsights,
  setStore,
  storeAnalyticsSelector,
} from "../../../redux/slices/store_analytics";

import StoreAnalysis from "./components/StoreAnalysis";
// import StoreAnalytics from "./components/StoreAnalytics";
import StorePlanning from "./components/StorePlanning";
import StoreProductCompetitors from "./components/StoreProductCompetitors";
import BusinessReportAdvanced from "./components/StoreProductDetails/BusinessReportAdvanced";
import StoreProducts from "./components/StoreProducts";
// import StoreSnappyPlaning from "./components/StoreSnappySettings";
import StorePicker from "./components/shared/Storepicker";
import { defaultLevel1AdvancedReport, storesEmails } from "./constants";
import { TabPanel } from "./helpers";

function a11yProps(index) {
  return {
    value: index,
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function StoreManagement() {
  const router = useLocation();
  const [searchParams] = useSearchParams();
  const Selectedstore = searchParams.get("store");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useContext(AuthContext);
  const {
    skuASINsLoading,
    productItemDetailsList,
    advanceBusinessReportLoading,
  } = useSelector(advanceBusinessReportSelector);

  const {
    notificationCountList,
    productListLoading,
    storeSalesChartLoading,
    monthlyGoalsLoading,
    storePlanningsLoading,
    goalsLoading,
  } = useSelector(storeAnalyticsSelector);

  const { asinNotificationsLoading } = useSelector(notificationsSelector);
  const { trackedASINsLoading } = useSelector(productDetailSelector);
  const { store: storeName } = useSelector(storeAnalyticsSelector);

  const assignStoreByEmail = useCallback((email) => {
    const storeEmails = Object.entries(storesEmails).filter(([_, e]) =>
      e.includes(email)
    );
    return storeEmails.length ? storeEmails[0][0] : null;
  }, []);

  // Load default data for advance report
  useEffect(() => {
    const selectedReport = {
      selectedStartDate: moment().subtract(30, "days").format("YYYY-MM-DD"),
      selectedEndDate: moment().format("YYYY-MM-DD"),
      selectedLevel1: defaultLevel1AdvancedReport,
      selectedMetric: ["units", "avg_price"],
    };
    dispatch(changeDefaultAdvanceSelectionReport(selectedReport));
  }, [dispatch]);

  useEffect(() => {
    const selectedReport = { selectedLevel2: "Select" };
    if (productItemDetailsList && productItemDetailsList.length > 0) {
      selectedReport.selectedLevel2 = productItemDetailsList[0]?.sku;
    }
    dispatch(changeDefaultAdvanceSelectionReport(selectedReport));
  }, [productItemDetailsList, dispatch]);

  useEffect(() => {
    if (user?.email) {
      const store = assignStoreByEmail(user.email);
      gtag("config", "G-V6M3YFX88Z", {
        user_id: user.email,
      });
      gtag("set", "user_properties", {
        email: user.email,
      });
      if (store) {
        if (store === "AmazonWallDisplay") {
          navigate("/sm-planning", {
            state: { showCurrMonthBreakdown: true },
          });
        } else {
          dispatch(setStore(store));
          dispatch(getWeeklyInsights(store));
        }
      }
    }
  }, [user, dispatch, assignStoreByEmail, navigate]);

  const [value, setValue] = React.useState(0);
  const handleChange = (_, newValue) => setValue(newValue);

  useEffect(() => {
    const pathname = router.pathname;
    if (pathname.includes("sm-product-list")) {
      setValue(1);
    } else if (pathname.includes("sm-planning")) {
      setValue(2);
    } else if (pathname.includes("advanced-business-report")) {
      setValue(3);
    } else if (pathname.includes("sm-competitors")) {
      setValue(4);
    } else {
      setValue(parseInt(0));
    }
  }, [router]);

  useEffect(() => {
    const currPath = router.pathname;
    if (currPath === "/" || currPath === "/store-management") {
      dispatch(getStoreGoals(storeName));
    }
  }, [storeName, dispatch, router]);

  const handleStoreChange = (name) => {
    const { pathname, search } = window.location;
    const params = new URLSearchParams(search);
    if (params.has("store")) {
      params.set("store", name);
      if (params.has("level")) {
        params.delete("level");
      }
      if (params.has("value")) {
        params.delete("value");
      }
      if (params.has("start_date")) {
        params.delete("start_date");
      }
      if (params.has("end_date")) {
        params.delete("end_date");
      }
      if (params.has("metrics")) {
        params.delete("metrics");
      }
      const newUrl = `${pathname}?${params.toString()}`;
      navigate(newUrl, { replace: true });
    }
    dispatch(setStore(name));

    // TODO: add BE support for all stores
    // if (name !== "all") {
    //   dispatch(getWeeklyInsights(name));
    // }
  };

  useEffect(() => {
    if (storeName !== null && storeName !== "all") {
      dispatch(getWeeklyInsights(storeName));
      dispatch(fetchActiveNotificationsCount(storeName));
    }
    dispatch(setStore(storeName !== null ? storeName : "all"));
  }, [storeName, dispatch]);

  useEffect(() => {
    const pathName = router.pathname;
    if (Selectedstore) {
      dispatch(setStore(Selectedstore));
    } else if (storeName === "all") {
      if (pathName === "/advanced-business-report") {
        dispatch(setStore("atlasonix"));
      }
    }
  }, [dispatch, storeName, router, Selectedstore]);

  return (
    <>
      <Box sx={{ width: "100%" }} display="flex" justifyContent="end">
        <StorePicker
          onStoreSelected={handleStoreChange}
          value={storeName}
          disabled={
            productListLoading ||
            storeSalesChartLoading ||
            monthlyGoalsLoading ||
            storePlanningsLoading ||
            goalsLoading ||
            trackedASINsLoading ||
            asinNotificationsLoading ||
            skuASINsLoading ||
            advanceBusinessReportLoading
          }
        />
      </Box>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              label="Dashboard"
              onClick={() => navigate("/store-management")}
              {...a11yProps(0)}
            />
            <Tab
              label="Operations Management"
              onClick={() => navigate("/sm-product-list")}
              {...a11yProps(1)}
            />
            <Tab
              label="Goals & KPIs"
              onClick={() => navigate("/sm-planning")}
              {...a11yProps(2)}
            />
            <Tab
              label="Advanced Report"
              onClick={() => navigate("/advanced-business-report")}
              {...a11yProps(3)}
            />

            <Stack
              direction="row"
              spacing={1}
              position="relative"
              justifyContent="flex-end"
            >
              <Tab
                label="Competitors"
                onClick={() => navigate("/sm-competitors")}
                {...a11yProps(4)}
              />
              {notificationCountList?.alerts_count?.[storeName] > 0 && (
                <Stack
                  top={9}
                  position="absolute"
                  backgroundColor="#FF0000"
                  borderRadius="100%"
                  width={15}
                  height={15}
                  display="flex"
                  fontSize={10}
                  fontWeight={700}
                  color="#FFFFFF"
                  alignItems="center"
                  justifyContent="center"
                >
                  {notificationCountList?.alerts_count?.[`${storeName}`]}
                </Stack>
              )}
            </Stack>
            {/*<StyledSpan>Soon</StyledSpan>*/}
            {/*  <Tab
              label="Analytics"
              onClick={() => navigate("/sm-analytics")}
              {...a11yProps(3)}
            />
            <StyledSpan>Soon</StyledSpan>
            <Tab
              label="Snappy Settings"
              onClick={() => navigate("/sm-snappy-settings")}
              {...a11yProps(4)}
          /> */}
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <StoreAnalysis storeName={storeName} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <StoreProducts value={storeName} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <StorePlanning value={storeName} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <BusinessReportAdvanced value={storeName} />
        </TabPanel>
        {/* <TabPanel value={value} index={3}>
          <StoreAnalytics />
        </TabPanel> */}
        {/* <TabPanel value={value} index={4}>
          <StoreSnappyPlaning store={storeName} />
        </TabPanel> */}
        <TabPanel value={value} index={4}>
          <StoreProductCompetitors value={storeName} />
        </TabPanel>
      </Box>
    </>
  );
}

export default StoreManagement;
