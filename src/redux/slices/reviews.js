import { createSlice } from "@reduxjs/toolkit";

import { atomicConfig } from "../../config";
import { call_api_auth } from "../../utils/services";

const initialState = {
  reviewsLoading: false,
  reviewsErrorMessage: null,
  reviews: [],
  reviewsAsin: {},
  reviewsCompetingAsins: [],
};

// A slice for recipes with our 3 reducers
const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    getReviewsReports: (state) => {
      state.reviewsLoading = true;
      state.reviewsErrorMessage = null;
    },
    getReviewsReportsSuccess: (
      state,
      { payload, main_asin = {}, asins_list = [] }
    ) => {
      state.reviews = payload;
      if (Object.keys(main_asin).length > 0) {
        state.reviewsAsin = state.reviews.filter((review) => {
          return review.asin === main_asin.asin;
        });
      }
      if (asins_list.length > 0) {
        state.reviewsCompetingAsins = state.reviews.filter((review) => {
          return asins_list.indexOf(review.asin) > -1;
        });
      }
      state.reviewsLoading = false;
      state.reviewsErrorMessage = false;
      state.reviewsErrorMessage = null;
    },
    getReviewsReportsFailure: (state, { payload }) => {
      state.reviewsLoading = false;
      state.reviewsErrorMessage = true;
      state.reviewsErrorMessage = payload;
    },
  },
});

// Three actions generated from the slice
const {
  getReviewsReports,
  getReviewsReportsSuccess,
  getReviewsReportsFailure,
} = reviewsSlice.actions;

// A selector
export const reviewsSelector = (state) => state.reviews;

// The reducer
export default reviewsSlice.reducer;

// Asynchronous thunk action
export function fetchAllReviewsReports() {
  return async (dispatch) => {
    dispatch(getReviewsReports());

    let url = `${atomicConfig.storeManagementServiceUrl}/reviews`;
    try {
      let result = await call_api_auth(url, "GET");
      if (result) {
        dispatch(getReviewsReportsSuccess(result.data));
      } else {
        dispatch(getReviewsReportsFailure("no reviews reports found"));
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      dispatch(getReviewsReportsFailure(message));
    }
  };
}

// Asynchronous thunk action
export function fetchAsinReviewsReport(
  main_asin,
  asins_list = [],
  refresh_report = false
) {
  return async (dispatch) => {
    dispatch(getReviewsReports());
    const asins = asins_list.map((el) => el["asin"]).join(",");

    let url = `${atomicConfig.storeManagementServiceUrl}/reviews/${main_asin}?competing_asins=${asins}`;
    if (refresh_report) {
      url += "&db=0";
    } else {
      url += "&db=1";
    }

    try {
      let result = await call_api_auth(url, "GET");
      if (result) {
        dispatch(getReviewsReportsSuccess(result.data, main_asin, asins_list));
      } else {
        dispatch(getReviewsReportsFailure("no reviews reports found"));
      }
    } catch (error) {
      let message = error.response
        .map(function (el) {
          return el.asin + ": " + el.message;
        })
        .join(", ");
      if (message == null) {
        message = error.message || "Something went wrong";
      }
      dispatch(getReviewsReportsFailure(message));
    }
  };
}
