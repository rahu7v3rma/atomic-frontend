import { createSlice } from "@reduxjs/toolkit";

// import { atomicConfig } from "../../config";
// import { call_api_auth } from "../../utils/services";

const initialState = {
  brandsLoading: false,
  brandsHasErrors: false,
  brands: [],
  brandsErrorMessage: null,
};

// A slice for recipes with our 3 reducers
const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    getBrands: (state) => {
      state.brandsLoading = true;
      state.brandsErrorMessage = null;
    },
    getBrandsSuccess: (state, { payload }) => {
      state.brands = payload;
      state.brandsLoading = false;
      state.brandsHasErrors = false;
      state.brandsMessage = null;
    },
    getBrandsFailure: (state, { payload }) => {
      state.brandsLoading = false;
      state.brandsHasErrors = true;
      state.brandsErrorMessage = payload;
    },
  },
});

// Three actions generated from the slice
// const { getBrands, getBrandsSuccess, getBrandsFailure } = brandsSlice.actions;

// A selector
// export const brandsSelector = (state) => state.brands;

// The reducer
export default brandsSlice.reducer;

// Asynchronous thunk action
// function fetchBrands() {
//   return async (dispatch) => {
//     dispatch(getBrands());
//     let url = `${atomicConfig.brandScoreCardServiceUrl}/brands`;
//     try {
//       let result = await call_api_auth(url, "GET");
//       // let result = brand_data; // for local testing
//       result = result.data;
//       if (result.message !== undefined) {
//         dispatch(getBrandsFailure(result.message));
//       } else {
//         dispatch(getBrandsSuccess(result));
//       }
//     } catch (error) {
//       dispatch(getBrandsFailure(error.message));
//     }
//   };
// }
