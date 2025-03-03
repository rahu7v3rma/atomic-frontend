import { createSlice } from "@reduxjs/toolkit";

import { atomicConfig } from "../../config";
import { call_api_auth } from "../../utils/services";
// import websocket from "../../utils/websocket";

const SampleImg = "/assets/Sample.png";

const initialState = {
  levels1: null,
  levels2: null,
  productDetailData: {},
  productDetailLoading: false,
  productDetailErrorMessage: null,

  businessReportData: {
    sales: {},
    orders: {},
    conversion_rate: {},
    ads_spent: {},
  },
  businessReportLoading: false,
  businessReportErrorMessage: null,

  // ordersBusinessReportData: {},
  ordersBusinessReportLoading: false,
  ordersBusinessReportErrorMessage: null,

  // salesBusinessReportData: {},
  salesBusinessReportLoading: false,
  salesBusinessReportErrorMessage: null,

  // adsBusinessReportData: {},
  adsBusinessReportLoading: false,
  adsBusinessReportErrorMessage: null,

  productKeywordsData: {},
  productKeywordsLoading: false,
  productKeywordsErrorMessage: null,
  skuSalesChartData: {},
  skuSalesChartLoading: false,
  skuSalesChartErrorMessage: null,

  trackedASINsData: [],
  trackedASINsLoading: false,
  trackedASINsErrorMessage: null,

  createAsinData: null,
  createAsinDataLoading: false,
  createAsinDataErrorMessage: null,

  goalsAndPlanningData: null,
  goalsAndPlanningLoading: false,
  goalsAndPlanningErrorMessage: null,

  historicalChartsData: {},
  historicalChartsLoading: false,
  historicalChartsErrorMessage: null,
};

// A slice for recipes with our 3 reducers
const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {
    resetAllState: (state) => {
      Object.keys(initialState).forEach((key) => {
        state[key] = initialState[key];
      });
    },
    getProductDetail: (state) => {
      state.productDetailLoading = true;
      state.productDetailErrorMessage = null;
    },
    getProductDetailSuccess: (state, { payload }) => {
      state.productDetailData = payload;
      state.productDetailLoading = false;
      state.productDetailErrorMessage = null;
    },
    getProductDetailFailure: (state, { payload }) => {
      state.productDetailLoading = false;
      state.productDetailErrorMessage = payload;
    },
    initProductDetail: (state) => {
      state.productDetailData = {};
      state.productDetailLoading = false;
      state.productDetailErrorMessage = null;
    },
    getOrdersBusinessReport: (state) => {
      state.ordersBusinessReportLoading = true;
      state.ordersBusinessReportErrorMessage = null;
    },
    getOrdersBusinessReportSuccess: (state, { payload }) => {
      state.businessReportData["orders"] = payload.orders;
      state.ordersBusinessReportLoading = false;
      state.ordersBusinessReportErrorMessage = null;
    },
    getOrdersBusinessReportFailure: (state, { payload }) => {
      state.businessReportData["orders"] = {};
      state.ordersBusinessReportLoading = false;
      state.ordersBusinessReportErrorMessage = payload;
    },
    getSalesBusinessReport: (state) => {
      state.salesBusinessReportLoading = true;
      state.salesBusinessReportErrorMessage = null;
    },
    getSalesBusinessReportSuccess: (state, { payload }) => {
      state.businessReportData["sales"] = payload.sales;
      state.businessReportData["conversion_rate"] = payload.conversion_rate;
      state.businessReportData["ads_spent"] = payload.ads_spent;
      state.salesBusinessReportLoading = false;
      state.salesBusinessReportErrorMessage = null;
    },
    getSalesBusinessReportFailure: (state, { payload }) => {
      state.businessReportData["sales"] = {};
      state.businessReportData["conversion_rate"] = {};
      state.businessReportData["ads_spent"] = {};
      state.salesBusinessReportLoading = false;
      state.salesBusinessReportErrorMessage = payload;
    },
    // getAdsBusinessReport: (state) => {
    //   state.adsBusinessReportLoading = true;
    //   state.adsBusinessReportErrorMessage = null;
    // },
    // getAdsBusinessReportSuccess: (state, { payload }) => {
    //   state.businessReportData["ads_spent"] = payload.ads_spent;
    //   state.adsBusinessReportLoading = false;
    //   state.adsBusinessReportErrorMessage = null;
    // },
    // getAdsBusinessReportFailure: (state, { payload }) => {
    //   state.businessReportData["ads_spent"] = {};
    //   state.adsBusinessReportLoading = false;
    //   state.adsBusinessReportErrorMessage = payload;
    // },
    getProductKeywords: (state) => {
      state.productKeywordsLoading = true;
      state.productKeywordsErrorMessage = null;
    },
    getProductKeywordsSuccess: (state, { payload }) => {
      state.productKeywordsData = payload;
      state.productKeywordsLoading = false;
      state.productKeywordsErrorMessage = null;
    },
    getProductKeywordsFailure: (state, { payload }) => {
      state.ProductKeywordsLoading = false;
      state.productKeywordsErrorMessage = payload;
    },
    initProductKeywords: (state) => {
      state.productKeywordsData = {};
      state.productKeywordsLoading = false;
      state.productKeywordsErrorMessage = null;
    },
    getSkuSalesChartData: (state, { payload }) => {
      state.skuSalesChartData = payload;
      state.skuSalesChartLoading = true;
      state.skuSalesChartErrorMessage = null;
    },
    getSkuSalesChartDataSuccess: (state, { payload }) => {
      state.skuSalesChartData = payload;
      state.skuSalesChartLoading = false;
      state.skuSalesChartErrorMessage = null;
    },
    getSkuSalesChartDataFailure: (state, { payload }) => {
      state.skuSalesChartLoading = false;
      state.skuSalesChartErrorMessage = payload;
    },
    getTrackedASINsData: (state) => {
      state.trackedASINsData = [];
      state.trackedASINsLoading = true;
      state.trackedASINsErrorMessage = null;
    },
    getTrackedASINsDataSuccess: (state, { payload }) => {
      state.trackedASINsData = payload;
      state.trackedASINsLoading = false;
      state.trackedASINsErrorMessage = null;
    },
    getTrackedASINsDataFailure: (state, { payload }) => {
      state.trackedASINsLoading = false;
      state.trackedASINsErrorMessage = payload;
    },
    getGoalsAndPlanningData: (state) => {
      state.goalsAndPlanningData = [];
      state.goalsAndPlanningLoading = true;
      state.goalsAndPlanningErrorMessage = null;
    },
    getGoalsAndPlanningDataSuccess: (state, { payload }) => {
      state.goalsAndPlanningData = payload;
      state.goalsAndPlanningLoading = false;
      state.goalsAndPlanningErrorMessage = null;
    },
    getGoalsAndPlanningDataFailure: (state, { payload }) => {
      state.goalsAndPlanningData = [];
      state.goalsAndPlanningLoading = false;
      state.goalsAndPlanningErrorMessage = payload;
    },
    removeTrackedASIN: (state) => {
      state.trackedASINsLoading = true;
      state.trackedASINsErrorMessage = null;
    },
    removeTrackedASINSuccess: (state, { payload }) => {
      state.trackedASINsData = state.trackedASINsData.filter(
        (record) => record.asin !== payload.asin
      );
      state.trackedASINsLoading = false;
      state.trackedASINsErrorMessage = null;
    },
    removeTrackedASINFailure: (state, { payload }) => {
      state.trackedASINsLoading = false;
      state.trackedASINsErrorMessage = payload;
    },

    createAsinTracking: (state) => {
      state.createAsinDataLoading = true;
      state.createAsinDataErrorMessage = null;
    },
    createAsinTrackingSuccess: (state, { payload }) => {
      // state.createAsinData = state.createAsinData.filter(
      //   (record) => record.asin !== payload.asin
      // );
      console.log("success payload", payload);
      state.createAsinData = payload;
      state.createAsinDataLoading = false;
      state.createAsinDataErrorMessage = null;
    },
    createAsinTrackingFailure: (state, { payload }) => {
      console.log("failure payload", payload);
      state.createAsinDataLoading = false;
      state.createAsinDataErrorMessage = payload;
    },
    getHistoricalCharts: (state) => {
      state.historicalChartsLoading = true;
      state.historicalChartsErrorMessage = null;
    },
    getHistoricalChartsSuccess: (state, { payload }) => {
      state.historicalChartsData = payload;
      state.historicalChartsLoading = false;
      state.historicalChartsErrorMessage = null;
    },
    getHistoricalChartsFailure: (state, { payload }) => {
      state.historicalChartsLoading = false;
      state.historicalChartsErrorMessage = payload;
    },
    setLevel1Success: (state, { payload }) => {
      state.levels1 = payload;
    },
    setLevel2Success: (state, { payload }) => {
      state.levels2 = payload;
    },
  },
});

// Three actions generated from the slice
const {
  resetAllState,
  setLevel1Success,
  setLevel2Success,
  getProductDetail,
  getProductDetailSuccess,
  getProductDetailFailure,
  _initProductDetail,
  getOrdersBusinessReport,
  getOrdersBusinessReportSuccess,
  getOrdersBusinessReportFailure,
  // getAdsBusinessReport,
  // getAdsBusinessReportSuccess,
  // getAdsBusinessReportFailure,
  getSalesBusinessReport,
  getSalesBusinessReportSuccess,
  getSalesBusinessReportFailure,
  getProductKeywords,
  getProductKeywordsSuccess,
  _getProductKeywordsFailure,
  _initProductKeywords,
  getSkuSalesChartData,
  getSkuSalesChartDataSuccess,
  getSkuSalesChartDataFailure,

  getTrackedASINsData,
  getTrackedASINsDataSuccess,
  getTrackedASINsDataFailure,

  getGoalsAndPlanningData,
  getGoalsAndPlanningDataSuccess,
  getGoalsAndPlanningDataFailure,

  removeTrackedASIN,
  removeTrackedASINSuccess,
  removeTrackedASINFailure,

  createAsinTracking,
  createAsinTrackingSuccess,
  createAsinTrackingFailure,

  getHistoricalCharts,
  getHistoricalChartsSuccess,
  getHistoricalChartsFailure,
} = productDetailSlice.actions;

// A selector
export const productDetailSelector = (state) => state.product_detail;

// The reducer
export default productDetailSlice.reducer;

// Asynchronous thunk action
//export function fetchProductDetail(payload) {
//  return async (dispatch) => {
//    dispatch(getProductDetail(payload));

// const accessToken = window.localStorage.getItem("accessToken");

// let url = `${atomicConfig.storeManagementServiceUrl}/`;
// try {
//   let result = await axios.get(url, {
//     headers: {
//       Authorization: "Bearer " + accessToken,
//       "Content-Type": "application/json",
//     },
//     crossDomain: true,
//   });

//   // let result = brand_data; // for local testing
//   result = result.data;

//   if (result.message !== undefined) {
//     dispatch(getProductDetailFailure(result.message));
//   } else {
//     dispatch(getProductDetailSuccess(result));
//   }
// } catch (error) {
//   const message = error.message || "Something went wrong";
//   dispatch(getProductDetailFailure(message));
// }
//
//    dispatch(
//      getProductDetailSuccess({
//        title: "Placeholder title",
//        subTitle: "Placeholder sub title",
//        productImage: SampleImg,
//        asin: "ABCD1234",
//        price: "00.01",
//        created: "2016.06.27",
//        rating: "0.0",
//        ranking: "#0",
//        size: "PlaceHolderSize",
//        estimatedFees: "$0.0",
//      })
//    );
//  };
//}

export function setLevels1(store) {
  return (dispatch) => {
    dispatch(setLevel1Success(store));
  };
}
export function setLevels2(store) {
  return (dispatch) => {
    dispatch(setLevel2Success(store));
  };
}
export function resetProductDetailState() {
  return async (dispatch) => {
    dispatch(resetAllState());
  };
}

// export function fetchAdsBusinessReport(payload) {
//   return async (dispatch) => {
//     let result = { ads_spent: {} };

//     if (payload.store === "all" || payload.store === null) {
//       dispatch(getAdsBusinessReportSuccess(result));
//       return;
//     }
//     dispatch(getAdsBusinessReport(payload));
//     let urlParams = `${payload.store}?start_date=${payload.start_date}&end_date=${payload.end_date}`;
//     if (
//       typeof payload.compare_start_date != "undefined" &&
//       typeof payload.compare_end_date != "undefined"
//     ) {
//       urlParams += `&compare_start_date=${payload.compare_start_date}&compare_end_date=${payload.compare_end_date}`;
//     }
//     if (payload.sku !== "" && typeof payload.sku != "undefined") {
//       urlParams += `&sku=${payload.sku}`;
//     } else if (payload.asin !== "" && typeof payload.asin != "undefined") {
//       urlParams += `&parent_asin=${payload.asin}`;
//     } else if (
//       payload.child_asin !== "" &&
//       typeof payload.child_asin != "undefined"
//     ) {
//       urlParams += `&child_asin=${payload.child_asin}`;
//     }

//     try {
//       let result = await call_api_auth(
//         `${atomicConfig.storeManagementServiceUrl}/topcard-ads-stats/${urlParams}`,
//         "GET"
//       );

//       result = result.data;

//       if (result.message !== undefined) {
//         dispatch(getAdsBusinessReportFailure(result.message));
//       } else {
//         dispatch(getAdsBusinessReportSuccess(result));
//       }
//     } catch (error) {
//       const message = error.message || "Something went wrong";
//       dispatch(getAdsBusinessReportFailure(message));
//     }
//   };
// }

export function fetchSalesBusinessReport(payload) {
  return async (dispatch) => {
    let result = { sales: {}, conversion_rate: {}, ads_spent: {} };

    if (payload.store === "all" || payload.store === null) {
      dispatch(getSalesBusinessReportSuccess(result));
      return;
    }
    dispatch(getSalesBusinessReport(payload));
    let urlParams = `${payload.store}?start_date=${payload.start_date}&end_date=${payload.end_date}`;
    if (
      typeof payload.compare_start_date != "undefined" &&
      typeof payload.compare_end_date != "undefined"
    ) {
      urlParams += `&compare_start_date=${payload.compare_start_date}&compare_end_date=${payload.compare_end_date}`;
    }

    if (payload.sku !== "" && typeof payload.sku != "undefined") {
      urlParams += `&sku=${payload.sku}`;
    } else if (payload.asin !== "" && typeof payload.asin != "undefined") {
      urlParams += `&parent_asin=${payload.asin}`;
    } else if (
      payload.child_asin !== "" &&
      typeof payload.child_asin != "undefined"
    ) {
      urlParams += `&child_asin=${payload.child_asin}`;
    }

    try {
      let result = await call_api_auth(
        `${atomicConfig.storeManagementServiceUrl}/topcard-business-stats/${urlParams}`,
        "GET"
      );

      result = result.data;

      if (result.message !== undefined) {
        dispatch(getSalesBusinessReportFailure(result.message));
      } else {
        dispatch(getSalesBusinessReportSuccess(result));
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      dispatch(getSalesBusinessReportFailure(message));
    }
  };
}

export function fetchOrdersBusinessReport(payload) {
  return async (dispatch) => {
    let result = { orders: {} };

    if (payload.store === "all" || payload.store === null) {
      dispatch(getOrdersBusinessReportSuccess(result));
      return;
    }
    dispatch(getOrdersBusinessReport(payload));
    let urlParams = `${payload.store}?start_date=${payload.start_date}&end_date=${payload.end_date}`;
    if (
      typeof payload.compare_start_date != "undefined" &&
      typeof payload.compare_end_date != "undefined"
    ) {
      urlParams += `&compare_start_date=${payload.compare_start_date}&compare_end_date=${payload.compare_end_date}`;
    }

    if (payload.sku !== "" && typeof payload.sku != "undefined") {
      urlParams += `&sku=${payload.sku}`;
    } else if (payload.asin !== "" && typeof payload.asin != "undefined") {
      urlParams += `&parent_asin=${payload.asin}`;
    } else if (
      payload.child_asin !== "" &&
      typeof payload.child_asin != "undefined"
    ) {
      urlParams += `&child_asin=${payload.child_asin}`;
    }

    try {
      let result = await call_api_auth(
        `${atomicConfig.storeManagementServiceUrl}/topcard-orders-stats/${urlParams}`,
        "GET"
      );
      result = result.data;

      if (result.message !== undefined) {
        dispatch(getOrdersBusinessReportFailure(result.message));
      } else {
        dispatch(getOrdersBusinessReportSuccess(result));
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      dispatch(getOrdersBusinessReportFailure(message));
    }
  };
}

export function fetchProductKeywords(payload) {
  return async (dispatch) => {
    dispatch(getProductKeywords(payload));

    // const accessToken = window.localStorage.getItem("accessToken");

    // let url = `${atomicConfig.storeManagementServiceUrl}/`;
    // try {
    //   let result = await axios.get(url, {
    //     headers: {
    //       Authorization: "Bearer " + accessToken,
    //       "Content-Type": "application/json",
    //     },
    //     crossDomain: true,
    //   });

    //   result = result.data;

    //   if (result.message !== undefined) {
    //     dispatch(getProductKeywordsFailure(result.message));
    //   } else {
    //     dispatch(getProductKeywordsSuccess(result));
    //   }
    // } catch (error) {
    //   const message = error.message || "Something went wrong";
    //   dispatch(getProductKeywordsFailure(message));
    // }

    dispatch(
      getProductKeywordsSuccess({
        title: "American Flag for outside 3x5",
        subTitle: "Rushmore Rose USA",
        productImage: SampleImg,
        asin: "B01HMWWLCI",
        price: "$33.95",
        created: "2016.06.27",
        rating: "4.8",
        ranking: "#9",
        size: "UsLargeStandardSize",
        estimatedFees: "$6.50",
      })
    );
  };
}

export function fetchSkuSalesChartData(payload) {
  return async (dispatch) => {
    dispatch(getSkuSalesChartData(payload));

    if (payload.store === "all" || payload.store === null) {
      dispatch(getSkuSalesChartDataFailure("No store selected"));
      return;
    }

    let url = `${atomicConfig.storeManagementServiceUrl}/sales-chart-data/${payload.store}?sku=${payload.sku}&parent_asin=${payload.asin}&child_asin=${payload.child_asin}&start_date=${payload.start_date}&end_date=${payload.end_date}`;
    if (
      typeof payload.compare_start_date != "undefined" &&
      typeof payload.compare_end_date != "undefined"
    ) {
      url += `&compare_start_date=${payload.compare_start_date}&compare_end_date=${payload.compare_end_date}`;
    }
    try {
      let result = await call_api_auth(url, "GET");

      result = result.data;

      if (result.message !== undefined) {
        dispatch(getSkuSalesChartDataFailure(result.message));
      } else {
        dispatch(getSkuSalesChartDataSuccess(result));
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      dispatch(getSkuSalesChartDataFailure(message));
    }
  };
}

export function fetchTrackedASINs() {
  return async (dispatch) => {
    dispatch(getTrackedASINsData());

    let url = `${atomicConfig.storeManagementServiceUrl}/fetch-tracked-asin/all`; // Need to replace 'all' with ${payload.store} later;
    try {
      let result = await call_api_auth(url, "GET");
      result = result.data;

      dispatch(getTrackedASINsDataSuccess(result));
    } catch (error) {
      const message = error.message || "Something went wrong";
      dispatch(getTrackedASINsDataFailure(message));
    }
  };
}

export function fetchGoalsData(payload) {
  return async (dispatch) => {
    dispatch(getGoalsAndPlanningData());
    let url = `${atomicConfig.storeManagementServiceUrl}/goals-chart-data/${payload.store}?year=${payload.year}&month=${payload.month}&target=${payload.target}`;
    try {
      let result = await call_api_auth(url, "GET");
      result = result.data;
      dispatch(getGoalsAndPlanningDataSuccess(result));
    } catch (error) {
      const message = error.message || "Something went wrong";
      dispatch(getGoalsAndPlanningDataFailure(message));
    }
  };
}

export function deleteTrackedASIN(payload) {
  return async (dispatch) => {
    dispatch(removeTrackedASIN());
    let url = `${atomicConfig.storeManagementServiceUrl}/remove-asin-tracking`;
    let json_body = {};

    json_body = JSON.stringify({
      asin: payload.asin,
      parent_asin: payload.parentAsin,
    });

    try {
      let result = await call_api_auth(url, "POST", json_body);
      result = result.data;
      if (result.message) {
        dispatch(removeTrackedASINSuccess(payload));
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      dispatch(removeTrackedASINFailure(message));
    }
  };
}
export function createAsinTrackingData(payload) {
  return async (dispatch) => {
    dispatch(createAsinTracking());
    let url = `${atomicConfig.storeManagementServiceUrl}/create-asin-tracking`;
    let json_body = {};

    json_body = JSON.stringify({
      asin: payload.asin,
      parent_asin: payload.parentAsin,
      store: payload.store,
    });

    try {
      let result = await call_api_auth(url, "POST", json_body);
      result = result.data;
      if (result.message) {
        dispatch(createAsinTrackingSuccess(result));
      }
    } catch (result) {
      const message = result.message || "Something went wrong";
      dispatch(createAsinTrackingFailure(message));
    }
  };
}

export function fetchProductDetails(payload) {
  return async (dispatch) => {
    dispatch(getProductDetail(payload));
    let url = `${atomicConfig.storeManagementServiceUrl}/fetch-product-details?store=${payload.store}&sku=${payload.sku}&parent_asin=${payload.asin}&child_asin=${payload.child_asin}`;
    try {
      let result = await call_api_auth(url, "GET");
      result = result.data;
      dispatch(getProductDetailSuccess(result));
    } catch (error) {
      let message = "Unable to get product detail for ";
      if (payload.sku !== "") {
        message += payload.sku;
      } else if (payload.asin !== "") {
        message += payload.asin;
      } else if (payload.child_asin !== "") {
        message += payload.child_asin;
      }
      dispatch(getProductDetailFailure(message));
    }
  };
}

export function fetchHistoricalCharts(payload) {
  return async (dispatch) => {
    const { store, asin, sku, childAsin } = payload;

    let params = {};
    if (asin) params.parent_asin = asin;
    if (sku) params.sku = sku;
    if (childAsin) params.child_asin = childAsin;

    if (store !== "all" && store !== null && Object.keys(params).length > 0) {
      dispatch(getHistoricalCharts());
      params = new URLSearchParams(params).toString();
      let url = `${atomicConfig.storeManagementServiceUrl}/historical-charts/${store}?${params}`;

      try {
        let result = await call_api_auth(url, "GET");
        dispatch(getHistoricalChartsSuccess(result.data));
      } catch (error) {
        const message = error.message || "Something went wrong";
        dispatch(getHistoricalChartsFailure(message));
      }
    }
  };
}
