export const atomicConfig = {
  userServiceUrl: process.env.REACT_APP_USER_SERVICE_URL,
  brandScoreCardServiceUrl: process.env.REACT_APP_BRAND_SCORECARD_SERVICE_URL,
  brandScoreCardServiceWSUrl:
    process.env.REACT_APP_BRAND_SCORECARD_SERVICE_WS_URL,
  nicheExplorerServiceUrl: process.env.REACT_APP_NICHE_EXPLORER_SERVICE_URL,
  storeManagementServiceUrl: process.env.REACT_APP_STORE_MANAGEMENT_SERVICE_URL,
  storeManagementServiceWSUrl: process.env.REACT_APP_STORE_MANAGEMENT_WS_URL,
  nicheExplorerServiceApiUrl: process.env.REACT_APP_NICHE_EXPLORER_SERVICE_URL,
  // nicheExplorerMaxRetries: 3,
  // nicheExplorerRefreshIntervalMilliseconds: 45000,
};

export const appConfig = {
  max_niches: 5,
  max_asins: 3,
};
