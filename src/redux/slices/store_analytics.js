import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moment from "moment";

import { atomicConfig } from "../../config";
import { call_api_auth } from "../../utils/services";

const initialState = {
  store: null,
  start_date: null,
  end_date: null,
  compare_to_period: null,
  storeHasErrors: false,
  storeAnalyticsData: {},
  storeAnalyticsLoading: false,
  storeAnalyticsErrorMessage: null,
  storeSalesChartData: {},
  storeSalesChartLoading: false,
  storeSalesChartErrorMessage: null,
  storePerformanceData: {},
  storePerformanceLoading: false,
  storePerformanceErrorMessage: null,
  productListData: {},
  productListLoading: false,
  productListErrorMessage: null,
  storeBusinessReportData: [],
  storeBusinessReportLoading: false,
  storeBusinessReportErrorMessage: null,
  storePlanningsData: {},
  storePlanningsLoading: false,
  storePlanningsErrorMessage: null,
  monthlyGoalsLoading: false,
  monthlyGoalsErrorMessage: null,
  weeklyInsightData: [],
  weeklyInsightLoading: false,
  weeklyInsightErrorMessage: null,
  goalsLoading: false,
  goalsHasErrors: false,
  goals: {},
  goalsErrorMessage: null,
  notificationCountList: {},
  notificationCountLoading: false,
  notificationCountErrorMessage: null,
};

export const getStoreGoals = createAsyncThunk(
  "store/monthlyGoals",
  async (store, { rejectWithValue }) => {
    try {
      if (store === "all" || store === null) {
        return rejectWithValue(err);
      }
      const monthlyGoal = await get_store_monthly_goal(store);
      return monthlyGoal;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// A slice for recipes with our 3 reducers
const storeAnalyticsSlice = createSlice({
  name: "storeAnalytics",
  initialState,
  reducers: {
    resetAllState: (state) => {
      Object.keys(initialState).forEach((key) => {
        state[key] = initialState[key];
      });
    },
    getStoreAnalytics: (state, { payload }) => {
      state.storeAnalyticsLoading = true;
      state.storeAnalyticsErrorMessage = null;
      state.store = payload.store;
      state.start_date = payload.start_date;
      state.end_date = payload.end_date;
      state.compare_to_period = payload.compare_to_period;
    },
    getStoreAnalyticsSuccess: (state, { payload }) => {
      state.storeAnalyticsData = payload;
      state.storeAnalyticsLoading = false;
      state.storeHasErrors = false;
      state.storeAnalyticsErrorMessage = null;
    },
    getStoreAnalyticsFailure: (state, { payload }) => {
      state.storeAnalyticsLoading = false;
      state.storeHasErrors = true;
      state.storeAnalyticsErrorMessage = payload;
    },
    initStoreAnalytics: (state) => {
      state.storeAnalyticsData = {};
      state.storeAnalyticsLoading = false;
      state.storeHasErrors = false;
      state.storeAnalyticsErrorMessage = null;
      state.start_date = null;
      state.end_date = null;
      state.compare_to_period = null;
    },
    getStorePerformance: (state) => {
      state.storePerformanceLoading = true;
      state.storePerformanceErrorMessage = null;
    },
    getStorePerformanceSuccess: (state, { payload }) => {
      state.storePerformanceData = payload;
      state.storePerformanceLoading = false;
      state.storePerformanceErrorMessage = null;
    },
    getStorePerformanceFailure: (state, { payload }) => {
      state.storePerformanceLoading = false;
      state.storePerformanceErrorMessage = payload;
    },
    getProductList: (state) => {
      state.productListLoading = true;
      state.productListErrorMessage = null;
    },
    getProductListSuccess: (state, { payload }) => {
      state.productListData = payload;
      state.productListLoading = false;
      state.productListErrorMessage = null;
    },
    getProductListFailure: (state, { payload }) => {
      state.productListLoading = false;
      state.productListErrorMessage = payload;
    },
    getStoreBusinessReport: (state) => {
      state.storeBusinessReportLoading = true;
      state.storeBusinessReportErrorMessage = null;
    },
    getStoreBusinessReportSuccess: (state, { payload }) => {
      state.storeBusinessReportData = payload;
      state.storeBusinessReportLoading = false;
      state.storeBusinessReportErrorMessage = null;
    },
    getStoreBusinessReportFailure: (state, { payload }) => {
      state.storeBusinessReportLoading = false;
      state.storeBusinessReportErrorMessage = payload;
    },
    getStoreSalesChartData: (state, { payload }) => {
      state.storeSalesChartLoading = true;
      state.storeSalesChartErrorMessage = null;
      state.store = payload.store;
      state.start_date = payload.start_date;
      state.end_date = payload.end_date;
      state.compare_to_period = payload.compare_to_period;
    },
    getStoreSalesChartDataSuccess: (state, { payload }) => {
      state.storeSalesChartData = payload;
      state.storeSalesChartLoading = false;
      state.storeSalesChartErrorMessage = null;
    },
    getStoreSalesChartDataFailure: (state, { payload }) => {
      state.storeSalesChartData = {};
      state.storeSalesChartLoading = false;
      state.storeSalesChartErrorMessage = payload;
    },
    getStorePlannings: (state) => {
      state.storePlanningsLoading = true;
      state.storePlanningsErrorMessage = null;
    },
    getStorePlanningsSuccess: (state, { payload }) => {
      state.storePlanningsData = payload;
      state.storePlanningsLoading = false;
      state.storePlanningsErrorMessage = null;
    },
    getStorePlanningsFailure: (state, { payload }) => {
      state.storePlanningsLoading = false;
      state.storePlanningsErrorMessage = payload;
    },
    getStoreMonthlyBreakdown: (state) => {
      state.storeMonthlyBreakdownData = {};
      state.storeMonthlyBreakdownLoading = true;
      state.storeMonthlyBreakdownErrorMessage = null;
    },
    getStoreMonthlyBreakdownSuccess: (state, { payload }) => {
      state.storeMonthlyBreakdownData = payload;
      state.storeMonthlyBreakdownLoading = false;
      state.storeMonthlyBreakdownErrorMessage = null;
    },
    getStoreMonthlyBreakdownFailure: (state, { payload }) => {
      state.storeMonthlyBreakdownData = {};
      state.storeMonthlyBreakdownLoading = false;
      state.storeMonthlyBreakdownErrorMessage = payload;
    },
    updateMonthlyGoal: (state, { payload }) => {
      state.monthlyGoalsErrorMessage = null;
      const currentGoals = [...state.storePlanningsData.goals];
      const updatedGoalIndex = currentGoals.findIndex(
        (item) =>
          item.month === payload.month &&
          item.year.toString() === payload.year.toString()
      );
      if (updatedGoalIndex !== -1) {
        currentGoals[updatedGoalIndex].goal = payload.goal;
        state.storePlanningsData = {
          ...state.storePlanningsData,
          goals: [...currentGoals],
        };
      }
    },
    updateMonthlyGoalSuccess: (state) => {
      state.monthlyGoalsErrorMessage = null;
    },
    updateMonthlyGoalFailure: (state, { payload }) => {
      state.monthlyGoalsErrorMessage = payload;
    },
    getWeeklyInsight: (state) => {
      state.weeklyInsightLoading = true;
      state.weeklyInsightErrorMessage = null;
    },
    getWeeklyInsightSuccess: (state, { payload }) => {
      state.weeklyInsightData = payload;
      state.weeklyInsightLoading = false;
      state.weeklyInsightErrorMessage = null;
    },
    getWeeklyInsightFailure: (state, { payload }) => {
      state.weeklyInsightData = [];
      state.weeklyInsightLoading = false;
      state.weeklyInsightErrorMessage = payload;
    },
    setStoreSuccess: (state, { payload }) => {
      state.store = payload;
    },
    getNotificationCount: (state) => {
      state.notificationCountList = {};
      state.notificationCountLoading = true;
      state.notificationCountErrorMessage = null;
    },
    getNotificationCountSuccess: (state, { payload }) => {
      state.notificationCountList = payload;
      state.notificationCountLoading = false;
      state.notificationCountErrorMessage = null;
    },
    getNotificationCountFailure: (state, { payload }) => {
      state.notificationCountList = {};
      state.notificationCountLoading = false;
      state.notificationCountErrorMessage = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getStoreGoals.pending, (state) => {
      state.goalsLoading = true;
    });
    builder.addCase(getStoreGoals.fulfilled, (state, action) => {
      state.goalsLoading = false;
      state.goals = action.payload.data;
    });
    builder.addCase(getStoreGoals.rejected, (state) => {
      state.goalsLoading = false;
      state.goals = {};
    });
  },
});

// Three actions generated from the slice
const {
  resetAllState,
  getStoreAnalytics,
  getStoreAnalyticsSuccess,
  getStoreAnalyticsFailure,
  getStorePerformanceSuccess,
  getProductList,
  getProductListSuccess,
  getProductListFailure,
  getStoreBusinessReport,
  getStoreBusinessReportSuccess,
  getStoreBusinessReportFailure,
  getStoreSalesChartData,
  getStoreSalesChartDataSuccess,
  getStoreSalesChartDataFailure,
  getStorePlannings,
  getStorePlanningsSuccess,
  getStorePlanningsFailure,
  getStoreMonthlyBreakdown,
  getStoreMonthlyBreakdownSuccess,
  getStoreMonthlyBreakdownFailure,
  updateMonthlyGoal,
  updateMonthlyGoalSuccess,
  updateMonthlyGoalFailure,
  getWeeklyInsight,
  getWeeklyInsightSuccess,
  getWeeklyInsightFailure,
  setStoreSuccess,
  getNotificationCount,
  getNotificationCountSuccess,
  getNotificationCountFailure,
} = storeAnalyticsSlice.actions;

// A selector
export const storeAnalyticsSelector = (state) => state.store_analytics;

// The reducer
export default storeAnalyticsSlice.reducer;

// Asynchronous thunk action
function _fetchStoreAnalytics(payload) {
  return async (dispatch) => {
    dispatch(getStoreAnalytics(payload));

    let url = `${atomicConfig.storeManagementServiceUrl}/analytics/${payload.store}?start_date=${payload.start_date}&end_date=${payload.end_date}&compare_to_period=${payload.compare_to_period}`;
    try {
      let result = await call_api_auth(url, "GET");

      // let result = brand_data; // for local testing
      result = result.data;

      if (result.message !== undefined) {
        dispatch(getStoreAnalyticsFailure(result.message));
      } else {
        dispatch(getStoreAnalyticsSuccess(result));
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      dispatch(getStoreAnalyticsFailure(message));
    }
  };
}

export function resetAnalyticsState() {
  return async (dispatch) => {
    dispatch(resetAllState());
  };
}

// Asynchronous thunk action
export function fetchProductList(payload) {
  return async (dispatch) => {
    dispatch(getProductList(payload));

    const date = new Date();
    const three_days_before = date.setDate(date.getDate() - 3);
    const converted_date = new Date(three_days_before);
    var end_date = moment(converted_date);
    var start_date = end_date.clone().subtract(payload.duration - 1, "d");
    if (payload.duration) {
      start_date = moment(payload.duration.start_date);
      end_date = moment(payload.duration.end_date);
    }

    var compare_end_date =
      payload.compare === "last_period"
        ? start_date.clone().subtract(1, "d")
        : end_date.clone().subtract(1, "y");
    var compare_start_date =
      payload.compare === "last_period"
        ? start_date.clone().subtract(payload.duration, "d")
        : start_date.clone().subtract(1, "y");
    if (
      payload.compare &&
      payload.compare.start_date &&
      payload.compare.end_date
    ) {
      compare_start_date = moment(payload.compare.start_date);
      compare_end_date = moment(payload.compare.end_date);
    }

    let results = {};
    let url = `${atomicConfig.storeManagementServiceUrl}/product-list`;

    const json_body = JSON.stringify({
      store: payload.store,
      current: {
        start_date: start_date.format("YYYY-MM-DD"),
        end_date: end_date.format("YYYY-MM-DD"),
      },
      compare: {
        start_date: compare_start_date.format("YYYY-MM-DD"),
        end_date: compare_end_date.format("YYYY-MM-DD"),
      },
      product: payload.product ? payload.product : null,
    });

    try {
      let result = await call_api_auth(url, "POST", json_body);

      result = result.data;

      if (result.message !== undefined) {
        dispatch(getProductListFailure(result.message));
      } else {
        Object.keys(result).forEach((key) => {
          result[key]["store"] = payload.store;
        });
        results = Object.assign({}, results, result);

        dispatch(getProductListSuccess(results));
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      dispatch(getProductListFailure(message));
    }
  };
}

function _fetchStoreBusinessReport(payload) {
  return async (dispatch) => {
    dispatch(getStoreBusinessReport(payload));

    let url = `${atomicConfig.storeManagementServiceUrl}/business-report/${payload.store}?start_date=${payload.start_date}&end_date=${payload.end_date}`;
    try {
      let result = await call_api_auth(url, "GET");
      // let result = brand_data; // for local testing
      result = result.data;

      if (result.message !== undefined) {
        dispatch(getStoreBusinessReportFailure(result.message));
      } else {
        dispatch(getStoreBusinessReportSuccess(result));
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      dispatch(getStoreBusinessReportFailure(message));
    }
  };
}

export function fetchPerformanceData(payload = {}) {
  return async (dispatch) => {
    dispatch(getStorePerformanceSuccess(payload));
  };
}
export function clearStoreSalesChartData() {
  return async (dispatch) => {
    dispatch(getStoreSalesChartDataFailure(""));
  };
}

export function fetchStoreSalesChartData(payload) {
  return async (dispatch) => {
    dispatch(getStoreSalesChartData(payload));

    if (payload.store === "all" || payload.store === null) {
      dispatch(getStoreSalesChartDataFailure("No store selected"));
      return;
    }

    let url = `${atomicConfig.storeManagementServiceUrl}/sales-chart-data/${payload.store}?start_date=${payload.start_date}&end_date=${payload.end_date}`;
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
        dispatch(getStoreSalesChartDataFailure(result.message));
      } else {
        dispatch(getStoreSalesChartDataSuccess(result));
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      dispatch(getStoreSalesChartDataFailure(message));
    }
  };
}

export function fetchStoreMonthlyBreakdown(payload) {
  return async (dispatch) => {
    dispatch(getStoreMonthlyBreakdown());

    let url = `${atomicConfig.storeManagementServiceUrl}/fetch-breakdown-goals/${payload.year}?month=${payload.month}`;

    try {
      let result = await call_api_auth(url, "GET");
      result = result.data;
      if (result.message !== undefined) {
        dispatch(getStoreMonthlyBreakdownFailure(result.message));
      } else {
        result.goals.sort((a, b) => b.actual_vs_goal - a.actual_vs_goal);
        dispatch(getStoreMonthlyBreakdownSuccess(result));
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      dispatch(getStoreMonthlyBreakdownFailure(message));
    }
  };
}

export function fetchStorePlannings(payload) {
  return async (dispatch) => {
    dispatch(getStorePlannings());

    let url = `${atomicConfig.storeManagementServiceUrl}/fetch-monthly-goals/${payload.year}?store=${payload.store}`;

    try {
      let result = await call_api_auth(url, "GET");
      result = result.data;
      if (result.message !== undefined) {
        dispatch(getStorePlanningsFailure(result.message));
      } else {
        dispatch(getStorePlanningsSuccess(result));
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      dispatch(getStorePlanningsSuccess(message));
    }
  };
}

export function createOrUpdateMonthlyGoal(payload, callback) {
  return async (dispatch) => {
    dispatch(updateMonthlyGoal(payload));
    let url = `${atomicConfig.storeManagementServiceUrl}/create-or-update-monthly-goals`;
    let json_body = {};

    json_body = JSON.stringify({
      year: payload.year,
      month: payload.month,
      store: payload.store,
      goal: payload.goal,
    });

    try {
      let result = await call_api_auth(url, "POST", json_body);
      result = result.data;

      if (result.message) {
        dispatch(updateMonthlyGoalSuccess());
        callback && callback();
      }
    } catch (result) {
      const message = result || "Something went wrong";
      dispatch(updateMonthlyGoalFailure(message));
    }
  };
}

export function getWeeklyInsights(payload) {
  return async (dispatch) => {
    dispatch(getWeeklyInsight(payload));
    let url = `${atomicConfig.storeManagementServiceUrl}/weekly-asin-insights/${payload}`;
    try {
      let result = await call_api_auth(url, "GET");
      result = result.data;

      if (result.message !== undefined) {
        dispatch(getWeeklyInsightFailure(result.message));
      } else {
        dispatch(getWeeklyInsightSuccess(result));
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      dispatch(getWeeklyInsightFailure(message));
    }
  };
}

export function setStore(store) {
  return (dispatch) => {
    dispatch(setStoreSuccess(store));
  };
}
export function fetchActiveNotificationsCount(store) {
  return async (dispatch) => {
    dispatch(getNotificationCount());

    let url;
    url = `${atomicConfig.storeManagementServiceUrl}/fetch-asin-notifications/${store}`;

    try {
      let result = await call_api_auth(url, "GET");
      //Showing only last week's alerts
      let lastWeekDate = new Date().getTime() - 7 * 24 * 60 * 60 * 1000;
      var lastWeekNotifications = result.data.notifications.filter(
        (item) => new Date(item.create_date).getTime() > lastWeekDate
      );
      var lastWeekDeals = result.data.lightning_deals.filter(
        (item) => item.end_date * 1000 > lastWeekDate
      );
      result = JSON.parse(
        `{"alerts_count": {"${store}": ${
          lastWeekNotifications.length + lastWeekDeals.length
        }}}`
      );
      if (result.message !== undefined) {
        dispatch(getNotificationCountFailure(result.message));
      } else {
        dispatch(getNotificationCountSuccess(result));
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      dispatch(getNotificationCountFailure(message));
    }
  };
}

async function get_store_monthly_goal(store) {
  let url = `${atomicConfig.storeManagementServiceUrl}/current-month-summary-goals/${store}`;
  let result = await call_api_auth(url, "GET");
  // return a promise
  return result;
}
