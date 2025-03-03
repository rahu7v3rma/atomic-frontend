import { createSlice } from "@reduxjs/toolkit";

import { atomicConfig } from "../../config";
import { call_api_auth } from "../../utils/services";

const initialState = {
  businessReportData: {},
  businessReportLoading: false,
  businessReportErrorMessage: null,
};

// A slice for recipes with our 3 reducers
const businessReportSlice = createSlice({
  name: "businessReport",
  initialState,
  reducers: {
    getBusinessReport: (state) => {
      state.businessReportLoading = true;
      state.businessReportErrorMessage = null;
    },
    getBusinessReportSuccess: (state, { payload }) => {
      state.businessReportData = payload;
      state.businessReportLoading = false;
      state.businessReportErrorMessage = null;
    },
    getBusinessReportFailure: (state, { payload }) => {
      state.businessReportLoading = false;
      state.businessReportErrorMessage = payload;
    },
    initBusinessReport: (state) => {
      state.businessReportData = {};
      state.businessReportLoading = false;
      state.businessReportErrorMessage = null;
    },
  },
});

// Three actions generated from the slice
const {
  getBusinessReport,
  getBusinessReportSuccess,
  getBusinessReportFailure,
} = businessReportSlice.actions;

// A selector
export const businessReportSelector = (state) => state.business_report;

// The reducer
export default businessReportSlice.reducer;

// Asynchronous thunk action
export function fetchBusinessReport(payload) {
  return async (dispatch) => {
    dispatch(getBusinessReport(payload));

    let url = `${atomicConfig.storeManagementServiceUrl}/conversion-funnel/${payload.store}?sku=${payload.sku}&parent_asin=${payload.asin}&child_asin=${payload.child_asin}&start_date=${payload.start_date}&end_date=${payload.end_date}&compare_start_date=${payload.compare_start_date}&compare_end_date=${payload.compare_end_date}`;
    try {
      let result = await call_api_auth(url, "GET");

      result = result.data;

      if (result.message !== undefined) {
        dispatch(getBusinessReportFailure(result.message));
      } else {
        dispatch(getBusinessReportSuccess(result));
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      dispatch(getBusinessReportFailure(message));
    }
  };
}
