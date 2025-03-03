import { createSlice } from "@reduxjs/toolkit";

import { atomicConfig } from "../../config";
import { call_api_auth } from "../../utils/services";

const initialState = {
  advanceBusinessReportData: {},
  advanceBusinessReportLoading: false,
  advanceBusinessReportErrorMessage: null,

  rankTrackingData: {},
  rankTrackingDataLoading: false,
  rankTrackingDataErrorMessage: null,

  ukRankTrackingData: {},
  ukRankTrackingDataLoading: false,
  ukRankTrackingDataErrorMessage: null,

  skuASINsList: [],
  skuASINsLoading: false,
  skuASINsErrorMessage: null,

  productItemDetailsList: [],
  productItemDetailsLoading: false,
  productItemDetailsErrorMessage: null,

  defaultAdvanceSelectionReport: {},
};

// A slice for recipes with our 3 reducers
const advanceBusinessReportSlice = createSlice({
  name: "businessReport",
  initialState,
  reducers: {
    getAdvanceBusinessReport: (state) => {
      state.advanceBusinessReportLoading = true;
      state.advanceBusinessReportErrorMessage = null;
      state.advanceBusinessReportData = {};
    },

    initAdvanceBusinessReport: (state) => {
      state.advanceBusinessReportData = {};
      state.advanceBusinessReportLoading = false;
      state.advanceBusinessReportErrorMessage = null;
    },
    getAdvanceBusinessReportFailure: (state, { payload }) => {
      state.advanceBusinessReportData = {};
      state.advanceBusinessReportLoading = false;
      state.advanceBusinessReportErrorMessage = payload;
    },
    getAdvanceBusinessReportSuccess: (state, { payload }) => {
      state.advanceBusinessReportData = payload;
      state.advanceBusinessReportLoading = false;
      state.advanceBusinessReportErrorMessage = null;
    },
    getRankTrackingData: (state) => {
      state.rankTrackingData = {};
      state.rankTrackingDataLoading = true;
      state.rankTrackingDataErrorMessage = null;
    },
    getRankTrackingDataFailure: (state, { payload }) => {
      state.rankTrackingData = {};
      state.rankTrackingDataLoading = false;
      state.rankTrackingDataErrorMessage = payload;
    },
    getRankTrackingDataSuccess: (state, { payload }) => {
      state.rankTrackingData = payload;
      state.rankTrackingDataLoading = false;
      state.rankTrackingDataErrorMessage = null;
    },
    getUKRankTrackingData: (state) => {
      state.ukRankTrackingData = {};
      state.ukRankTrackingDataLoading = true;
      state.ukRankTrackingDataErrorMessage = null;
    },
    getUKRankTrackingDataFailure: (state, { payload }) => {
      state.ukRankTrackingData = {};
      state.ukRankTrackingDataLoading = false;
      state.ukRankTrackingDataErrorMessage = payload;
    },
    getUKRankTrackingDataSuccess: (state, { payload }) => {
      state.ukRankTrackingData = payload;
      state.ukRankTrackingDataLoading = false;
      state.ukRankTrackingDataErrorMessage = null;
    },
    getSkuASINsList: (state) => {
      state.skuASINsList = [];
      state.skuASINsLoading = true;
      state.skuASINsErrorMessage = null;
    },
    getSkuASINsListSuccess: (state, { payload }) => {
      state.skuASINsList = payload;
      state.skuASINsLoading = false;
      state.skuASINsErrorMessage = null;
    },
    getSkuASINsListFailure: (state, { paylaod }) => {
      state.skuASINsList = false;
      state.skuASINsErrorMessage = paylaod;
      state.skuASINsLoading = false;
    },

    getProductItemDetails: (state) => {
      state.productItemDetailsList = [];
      state.productItemDetailsLoading = true;
      state.productItemDetailsErrorMessage = null;
    },
    getProductItemDetailsSuccess: (state, { payload }) => {
      state.productItemDetailsList = payload;
      state.productItemDetailsLoading = false;
      state.productItemDetailsErrorMessage = null;
    },
    getProductItemDetailsFailure: (state, { payload }) => {
      state.productItemDetailsList = [];
      state.productItemDetailsLoading = false;
      state.productItemDetailsErrorMessage = payload;
    },

    resetProductItemDetails: (state) => {
      state.productItemDetailsList = [];
    },
    resetRankTracking: (state) => {
      state.rankTrackingData = {};
    },
    resetUKRankTracking: (state) => {
      state.ukRankTrackingData = {};
    },
    setDefaultAdvanceSelectionReport: (state, { payload }) => {
      state.defaultAdvanceSelectionReport = {
        ...state.defaultAdvanceSelectionReport,
        ...payload,
      };
    },
  },
});

// Three actions generated from the slice
const {
  getAdvanceBusinessReport,
  getAdvanceBusinessReportSuccess,
  getAdvanceBusinessReportFailure,

  getRankTrackingData,
  getRankTrackingDataFailure,
  getRankTrackingDataSuccess,

  getUKRankTrackingData,
  getUKRankTrackingDataFailure,
  getUKRankTrackingDataSuccess,

  getSkuASINsList,
  getSkuASINsListSuccess,
  getSkuASINsListFailure,

  getProductItemDetails,
  getProductItemDetailsSuccess,
  getProductItemDetailsFailure,
  resetProductItemDetails,
  resetRankTracking,
  resetUKRankTracking,
  setDefaultAdvanceSelectionReport,
} = advanceBusinessReportSlice.actions;

// A selector
// export const businessReportSelector = (state) => state.business_report;
export const advanceBusinessReportSelector = (state) =>
  state.advance_business_report;

// The reducer
export default advanceBusinessReportSlice.reducer;

// Asynchronous thunk action

export function fetchAdvanceBusinessReport(payload) {
  return async (dispatch) => {
    dispatch(getAdvanceBusinessReport(payload));

    let url;
    if (payload["compare_start_date"]) {
      url = `${atomicConfig.storeManagementServiceUrl}/advance-business-report/${payload.store}?parent_asin=${payload.asin}&sku=${payload.sku}&child_asin=${payload.child_asin}&start_date=${payload.start_date}&end_date=${payload.end_date}&periodicity=${payload.periodicity}&compare_start_date=${payload.compare_start_date}&compare_end_date=${payload.compare_end_date}`;
    } else {
      url = `${atomicConfig.storeManagementServiceUrl}/advance-business-report/${payload.store}?parent_asin=${payload.asin}&sku=${payload.sku}&child_asin=${payload.child_asin}&start_date=${payload.start_date}&end_date=${payload.end_date}&periodicity=${payload.periodicity}`;
    }
    try {
      let result = await call_api_auth(url, "GET");

      result = result.data;
      if (result.message !== undefined) {
        dispatch(getAdvanceBusinessReportFailure(result.message));
      } else {
        dispatch(getAdvanceBusinessReportSuccess(result));
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      dispatch(getAdvanceBusinessReportFailure(message));
    }
  };
}

export function fetchRankTrackingData(payload) {
  return async (dispatch) => {
    dispatch(getRankTrackingData(payload));

    let url = `${
      atomicConfig.storeManagementServiceUrl
    }/get-rank-tracking-comp?${
      payload.child_asin
        ? `child_asin=${payload.child_asin}`
        : `parent_asin=${payload.asin}`
    }&start_date=${payload.startDate}&end_date=${payload.endDate}&periodicity=${
      payload.periodicity
    }&marketplace=us&store=${payload.store}`;
    try {
      let result = await call_api_auth(url, "GET");
      result = result.data;

      if (result.message !== undefined) {
        dispatch(getRankTrackingDataFailure(result.message));
      } else {
        dispatch(getRankTrackingDataSuccess(result));
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      dispatch(getRankTrackingDataFailure(message));
    }
  };
}

export function fetchUKRankTrackingData(payload) {
  return async (dispatch) => {
    dispatch(getUKRankTrackingData(payload));

    let url = `${
      atomicConfig.storeManagementServiceUrl
    }/get-rank-tracking-comp?${
      payload.child_asin
        ? `child_asin=${payload.child_asin}`
        : `parent_asin=${payload.asin}`
    }&start_date=${payload.startDate}&end_date=${payload.endDate}&periodicity=${
      payload.periodicity
    }&marketplace=uk&store=${payload.store}`;
    try {
      let result = await call_api_auth(url, "GET");
      result = result.data;

      if (result.message !== undefined) {
        dispatch(getUKRankTrackingDataFailure(result.message));
      } else {
        dispatch(getUKRankTrackingDataSuccess(result));
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      dispatch(getUKRankTrackingDataFailure(message));
    }
  };
}

export function fetchSkuASINList(payload) {
  return async (dispatch) => {
    dispatch(getSkuASINsList());

    let url = `${atomicConfig.storeManagementServiceUrl}/fetch-sku-and-asin-list/${payload.store}`;

    try {
      let result = await call_api_auth(url, "GET");
      result = result.data;

      if (result.message !== undefined) {
        dispatch(getSkuASINsListFailure(result.message));
      } else {
        if (payload["level"]) {
          dispatch(getSkuASINsListSuccess(result[payload["level"]]));
        } else {
          dispatch(getSkuASINsListSuccess(result));
        }
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      dispatch(getSkuASINsListFailure(message));
    }
  };
}

export function fetchProductItemDetails(payload) {
  return async (dispatch) => {
    dispatch(getProductItemDetails());
    const { store, level } = payload;

    let url = `${atomicConfig.storeManagementServiceUrl}/fetch-product-item-details/${store}?level=${level}`;

    try {
      let result = await call_api_auth(url, "GET");
      if (result?.error) {
        dispatch(getProductItemDetailsFailure(result.error));
      } else {
        dispatch(getProductItemDetailsSuccess(result.data.product_item[0]));
      }
    } catch (error) {
      dispatch(
        getProductItemDetailsFailure(error.message || "Something went wrong")
      );
    }
  };
}

export function resetProductItemDetailsList() {
  return async (dispatch) => {
    dispatch(resetProductItemDetails());
  };
}

export function resetRankTrackingData() {
  return async (dispatch) => {
    dispatch(resetRankTracking());
  };
}
export function resetUKRankTrackingData() {
  return async (dispatch) => {
    dispatch(resetUKRankTracking());
  };
}

export function changeDefaultAdvanceSelectionReport(payload) {
  return async (dispatch) => {
    dispatch(setDefaultAdvanceSelectionReport(payload));
  };
}
