import { createSlice } from "@reduxjs/toolkit";

import { atomicConfig } from "../../config";
import { call_api_auth } from "../../utils/services";

const initialState = {
  keywordsLoading: false,
  keywordsErrorMessage: null,
  keywordsData: {},

  keywordsSalesLoading: false,
  keywordsSalesErrorMessage: null,
  keywordsSalesData: [],
};

// A slice for recipes with our 3 reducers
const keywordsSlice = createSlice({
  name: "keywords",
  initialState,
  reducers: {
    getKeywordsReports: (state) => {
      state.keywordsLoading = true;
      state.keywordsErrorMessage = null;
    },
    getKeywordsReportsSuccess: (state, { payload }) => {
      state.keywordsData = payload;
      state.keywordsLoading = false;
      state.keywordsErrorMessage = null;
    },
    getKeywordsReportsFailure: (state, { payload }) => {
      state.keywordsLoading = false;
      state.keywordsErrorMessage = payload;
    },
    getKeywordsSales: (state) => {
      state.keywordsSalesLoading = true;
      state.keywordsSalesErrorMessage = null;
    },
    getKeywordsSalesSuccess: (state, { payload }) => {
      state.keywordsSalesData = payload;
      state.keywordsSalesLoading = false;
      state.keywordsSalesErrorMessage = null;
    },
    getKeywordsSalesFailure: (state, { payload }) => {
      state.keywordsSalesLoading = false;
      state.keywordsSalesErrorMessage = payload;
    },
  },
});

// Three actions generated from the slice
const {
  getKeywordsReports,
  getKeywordsReportsSuccess,
  getKeywordsReportsFailure,
  getKeywordsSales,
  getKeywordsSalesSuccess,
  getKeywordsSalesFailure,
} = keywordsSlice.actions;

// A selector
export const keywordsSelector = (state) => state.keywords;

// The reducer
export default keywordsSlice.reducer;

// Asynchronous thunk action
export function fetchKeywordsReports(
  store,
  sku,
  start_date,
  end_date,
  compare_start_date,
  compare_end_date
) {
  return async (dispatch) => {
    dispatch(getKeywordsReports());

    let url = `${
      atomicConfig.storeManagementServiceUrl
    }/keywords-top-cards/${store}?sku=${sku}&start_date=${start_date}&end_date=${end_date}${
      compare_start_date !== "Invalid date" &&
      compare_end_date !== "Invalid date"
        ? `compare_start_date=${compare_start_date}&compare_end_date=${compare_end_date}`
        : ""
    }`;
    try {
      let result = await call_api_auth(url, "GET");
      if (result) {
        dispatch(getKeywordsReportsSuccess(result.data));
      } else {
        dispatch(getKeywordsReportsFailure("no keywords reports found"));
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      dispatch(getKeywordsReportsFailure(message));
    }
  };
}

export function fetchKeywordsSales(
  store,
  sku,
  start_date,
  end_date,
  compare_start_date,
  compare_end_date
) {
  return async (dispatch) => {
    dispatch(getKeywordsSales());

    let url = `${
      atomicConfig.storeManagementServiceUrl
    }/keywords-bar-chart-data/${store}?sku=${sku}&start_date=${start_date}&end_date=${end_date}${
      compare_start_date !== "Invalid date" &&
      compare_end_date !== "Invalid date"
        ? `compare_start_date=${compare_start_date}&compare_end_date=${compare_end_date}`
        : ""
    }`;
    try {
      const result = await call_api_auth(url, "GET");

      if (result) {
        dispatch(getKeywordsSalesSuccess(result.data));
      } else {
        dispatch(getKeywordsSalesFailure("no keywords sales found"));
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      dispatch(getKeywordsSalesFailure(message));
    }
  };
}
