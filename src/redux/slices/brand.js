import { createSlice } from "@reduxjs/toolkit";

import { atomicConfig } from "../../config";
import { call_api_auth } from "../../utils/services";
// import websocket from "../../utils/websocket";

// import { clearNiche, fetchNiche } from "./niche";

const initialState = {
  brandLoading: false,
  hasErrors: false,
  brand: {},
  errorMessage: null,
  edit: false,
};

// A slice for recipes with our 3 reducers
const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    getBrand: (state) => {
      state.brandLoading = true;
      state.errorMessage = null;
    },
    // getBestSellerNicheSuccess: (state, { payload }) => {
    //   state.niche_best_sellers = [
    //     {
    //       asins: payload.result["asins"],
    //       nicheName: payload.result["nicheName"],
    //       data: payload.result["data"],
    //     },
    //     ...state.niche_best_sellers,
    //   ];
    //   if (state.best_sellers_to_process) {
    //     state.best_sellers_to_process = state.best_sellers_to_process.filter(
    //       (item) => !payload.result["asins"].includes(item)
    //     );
    //   }
    //   state.best_sellers_loading = state.best_sellers_to_process.length !== 0;
    // },
    // getBestSellerNicheFailure: (state, { payload }) => {
    //   if (state.best_sellers_to_process) {
    //     state.best_sellers_to_process = state.best_sellers_to_process.filter(
    //       (item) => !payload.result["asins"].includes(item)
    //     );
    //   }
    //   state.best_sellers_loading = state.best_sellers_to_process.length !== 0;
    // },
    getBrandSuccess: (state, { payload }) => {
      state.brand = payload["data"];
      state.brandLoading = false;
      state.hasErrors = false;
      state.errorMessage = null;
      state.edit = true;
      state.niche_best_sellers = {};
      state.best_sellers_to_process = payload["best_sellers_to_process"];
      state.best_sellers_loading = state.best_sellers_to_process?.length !== 0;
    },
    getBrandFailure: (state, { payload }) => {
      state.brandLoading = false;
      state.hasErrors = true;
      state.errorMessage = payload;
      state.best_sellers_loading = false;
      state.niche_best_sellers = {};
      state.best_sellers_to_process = [];
    },
    initBrand: (state) => {
      state.brand = {};
      state.brandLoading = false;
      state.hasErrors = false;
      state.errorMessage = null;
    },
  },
});

// Three actions generated from the slice
const {
  getBrand,
  // getBestSellerNicheSuccess,
  // getBestSellerNicheFailure,
  getBrandSuccess,
  getBrandFailure,
  initBrand,
} = brandSlice.actions;

// A selector
export const brandSelector = (state) => state.brand;

// The reducer
export default brandSlice.reducer;

// Asynchronous thunk action
// export function fetchBrand(textInput, override_results) {
//   return async (dispatch, getState) => {
//     const accessToken = window.localStorage.getItem("accessToken");
//     const ws = websocket.getInstance(atomicConfig.brandScoreCardServiceWSUrl);

//     const apiCall = {
//       db: "1",
//       brand_url: textInput,
//       authorization: "Bearer " + accessToken,
//     };

//     // add brand_name if it is not empty
//     if (override_results) {
//       apiCall.db = "0";
//     }

//     ws.onopen = () => {
//       ws.send(JSON.stringify(apiCall));
//       dispatch(getBrand());
//       dispatch(clearNiche());
//     };

//     ws.onmessage = function (event) {
//       const response = JSON.parse(event.data);
//       try {
//         if (response.message === "heartbeat") {
//           // Heartbeat
//           console.log("heartbeat");
//         } else if (response.statusCode === 200) {
//           if (
//             response?.result?.type === "brand_data" ||
//             response?.result?.type === "brand"
//           ) {
//             dispatch(getBrandSuccess(response?.result));
//             const niches_list = response?.result?.data?.niches;
//             if (niches_list.length !== 0) {
//               const niches = Object.assign(
//                 {},
//                 ...niches_list
//                   .map((item) => item["niche_name"])
//                   .map((n, i) => ({ [`${i + 1}`]: n }))
//               );
//               dispatch(fetchNiche(niches, response?.result?.data?.brand_name));
//             }
//           } else if (response?.result?.type === "best_seller_niche") {
//             dispatch(getBestSellerNicheSuccess(response?.result));
//           }
//           if (!getState().brand.best_sellers_loading) {
//             ws.close();
//           }
//         } else if (response.statusCode === 400) {
//           if (response?.result?.type === "brand") {
//             dispatch(getBrandFailure(response.message));
//             ws.close();
//           } else if (response?.result?.type === "best_seller_niche") {
//             dispatch(getBestSellerNicheFailure(response?.result));
//             if (!getState().brand.best_sellers_loading) {
//               ws.close();
//             }
//           }
//         } else if (response.statusCode === 403) {
//           // todo: navigate to the sign-in page
//           dispatch(getBrandFailure(response.message));
//           ws.close();
//         } else {
//           dispatch(getBrandFailure(response.message));
//           ws.close();
//         }
//       } catch (err) {
//         console.log(err);
//         dispatch(getBrandFailure("Something went wrong"));
//         ws.close();
//       }
//     };

//     ws.onerror = (err) => {
//       console.error(
//         "Socket encountered error: ",
//         err.message,
//         "Closing socket"
//       );
//       ws.close();
//     };
//   };
// }

export function saveBrand(results, fieldChanges) {
  return async (dispatch) => {
    dispatch(getBrand());

    try {
      const brand_name = results.brand_name;

      const json_body = JSON.stringify({
        start_date: results.start_date,
        end_date: results.end_date,
        changes: fieldChanges,
      });
      let result = await call_api_auth(
        `${atomicConfig.brandScoreCardServiceUrl}/update/${brand_name}`,
        "POST",
        json_body
      );
      result = result.data;
      if (result.message !== undefined) {
        dispatch(getBrandFailure(result.message));
      } else {
        dispatch(getBrandSuccess(result));
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      dispatch(getBrandFailure(message));
    }
  };
}

export function resetBrand() {
  return async (dispatch) => {
    dispatch(initBrand());
  };
}
