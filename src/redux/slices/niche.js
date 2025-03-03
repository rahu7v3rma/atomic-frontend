import { createSlice } from "@reduxjs/toolkit";

import { atomicConfig } from "../../config";
import { call_api_auth } from "../../utils/services";

const initialState = {
  nicheLoading: false,
  nicheHasErrors: false,
  nicheToSearch: {},
  niche: [],
  nicheErrorMessage: null,
};

// A slice for niches with our 3 reducers
const nicheSlice = createSlice({
  name: "niche",
  initialState,
  reducers: {
    getNiche: (state, { payload }) => {
      state.nicheLoading = true;
      state.nicheToSearch = payload;
    },
    fetchNicheSuccess: (state, { payload }) => {
      state.niche = payload;
      state.nicheLoading = false;
      state.nicheErrorMessage = null;
    },
    getNicheFailure: (state, { payload }) => {
      state.nicheLoading = false;
      state.nicheHasErrors = true;
      state.nicheErrorMessage = payload;
    },
    clearNiche: (state) => {
      state.niche = [];
    },
  },
});

// Three actions generated from the slice
export const { clearNiche } = nicheSlice.actions;

const { getNiche, fetchNicheSuccess, getNicheFailure } = nicheSlice.actions;

// A selector
export const nicheSelector = (state) => state.niche;

// The reducer
export default nicheSlice.reducer;

// Asynchronous thunk action
export function fetchNiche(niches = [], brand_name = "", updateNiche = false) {
  return async (dispatch) => {
    dispatch(getNiche());

    let encodedNiches = encodeURIComponent(niches);

    let url = `${
      atomicConfig.nicheExplorerServiceApiUrl
    }/scrape-niche?update_niche=${updateNiche}&db=1&niches=${encodedNiches}${
      brand_name ? "&brand_name=" + encodeURIComponent(brand_name) : ""
    }`;
    try {
      let result = await call_api_auth(url, "GET");
      if (result?.error) {
        dispatch(getNicheFailure(result?.error));
      } else {
        dispatch(fetchNicheSuccess(result?.data));
      }
    } catch (error) {
      dispatch(getNicheFailure(error.message || "Something went wrong"));
    }
  };
}
