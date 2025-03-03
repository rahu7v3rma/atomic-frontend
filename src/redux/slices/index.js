import { combineReducers } from "redux";

import advanceBusinessReportReducer from "./advance_business_report";
import brandReducer from "./brand";
import brandsReducer from "./brands";
import businessReportReducer from "./business_report";
import counterReducer from "./counter";
import insightsReducer from "./insights";
import keywordsReducer from "./keywords";
import nicheReducer from "./niche";
import notificationsReducer from "./notifications";
import productDetailReducer from "./product_detail";
import reviewsReducer from "./reviews";
import storeAnalyticsReducer from "./store_analytics";

const rootReducer = combineReducers({
  brand: brandReducer,
  counter: counterReducer,
  brands: brandsReducer,
  niche: nicheReducer,
  reviews: reviewsReducer,
  store_analytics: storeAnalyticsReducer,
  insights: insightsReducer,
  product_detail: productDetailReducer,
  business_report: businessReportReducer,
  advance_business_report: advanceBusinessReportReducer,
  notifications: notificationsReducer,
  keywords: keywordsReducer,
});

export default rootReducer;
