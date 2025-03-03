import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  insightsData: {},
  insightsLoading: false,
  insightsErrorMessage: null,
};

// A slice for recipes with our 3 reducers
const insightsSlice = createSlice({
  name: "insights",
  initialState,
  reducers: {
    getInsights: (state) => {
      state.insightsLoading = true;
      state.insightsErrorMessage = null;
    },
    getInsightsSuccess: (state, { payload }) => {
      state.insightsData = payload;
      state.insightsLoading = false;
      state.insightsErrorMessage = null;
    },
    getInsightsFailure: (state, { payload }) => {
      state.insightsLoading = false;
      state.insightsErrorMessage = payload;
    },
    initInsights: (state) => {
      state.insightsData = {};
      state.insightsLoading = false;
      state.insightsErrorMessage = null;
    },
  },
});

// Three actions generated from the slice
const { getInsights, getInsightsSuccess } = insightsSlice.actions;

// A selector
export const insightsSelector = (state) => state.insights;

// The reducer
export default insightsSlice.reducer;

// Asynchronous thunk action
export function fetchInsights(payload = {}) {
  return async (dispatch) => {
    dispatch(getInsights(payload));
    dispatch(
      getInsightsSuccess({
        insights: [
          {
            heading:
              "One of the supplier decreased the price of the unit to $50",
            desc: "The average price for the product is $63.30, which is $2.35 lower than your price.",
          },
          {
            heading:
              "One of the supplier decreased the price of the unit to $50",
            desc: "The average price for the product is $63.30, which is $2.35 lower than your price.",
          },
          {
            heading:
              "One of the supplier decreased the price of the unit to $50",
            desc: "The average price for the product is $63.30, which is $2.35 lower than your price.",
          },
        ],
        questions: [
          { number: "93 Answer" },
          { number: "23 Answer" },
          { number: "29 Answer" },
          { number: "29 Answer" },
        ],
      })
    );

    // const accessToken = window.localStorage.getItem("accessToken");

    // let url = `${atomicConfig.storeManagementServiceUrl}/analytics/${payload.store}?start_date=${payload.start_date}&end_date=${payload.end_date}&compare_to_period=${payload.compare_to_period}`;
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
    //     dispatch(getInsightsFailure(result.message));
    //   } else {
    //     dispatch(getInsightsSuccess(result));
    //   }
    // } catch (error) {
    //   const message = error.message || "Something went wrong";
    //   dispatch(getInsightsFailure(message));
    // }
  };
}
