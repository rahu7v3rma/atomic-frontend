import Box from "@mui/material/Box";

import { LOGOUT_ROUTE } from "./constants";

export function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export function LogoutFromDashboard(axios) {
  localStorage.removeItem("accessToken");
  delete axios.defaults.headers.common.Authorization;
  window.location.href = LOGOUT_ROUTE;
  return true;
}

export const roundNumber = (number) => {
  if (!number) {
    number = 0;
  }
  return Number(number.toFixed(1)).toLocaleString().replace(".0", "");
};

export function GetCalculatedReportsData(businessReportData) {
  let sumOfSales = 0;
  let salesComparison = 0;
  let salesChange = false;
  let netProfit = 0;
  let netMargin = 0;

  let pnlRevenue = 0;
  let pnlPPCSpend = 0;
  let pnlRefundCost = 0;
  let pnlPromotionCost = 0;
  let pnlEstimatedFees = 0;
  let pnlExtraFees = 0;
  let pnlCogs = 0;

  let sumOfOrders = 0;
  let ordersComparison = 0;
  let ordersChange = false;
  let returns = 0;
  let units = 0;

  let conversionRate = 0;
  let conversionRateComparison = 0;
  let conversionChange = false;
  let sumOfPageViews = 0;
  let sumOfSessions = 0;

  let sumOfSpent = 0;
  let adsSpentComparison = 0;
  let avgConversionRate = 0;
  let tacos = 0;
  let roas = 0;
  let acos = 0;
  let avg_cpc = 0;

  if (businessReportData.hasOwnProperty("sales")) {
    sumOfSales = businessReportData["sales"]["sum"];
    salesComparison = businessReportData["sales"]["selected_period_comparison"];
    salesChange = salesComparison < 0;
    netProfit = businessReportData["sales"]["net_profit"];
    netMargin = businessReportData["sales"]["net_margin"];
    if (
      businessReportData["sales"].hasOwnProperty("PNL") &&
      businessReportData["sales"]["PNL"] != null
    ) {
      pnlRevenue = businessReportData["sales"]["PNL"]["revenue"];
      pnlPPCSpend = businessReportData["sales"]["PNL"]["ppc_spend"];
      pnlRefundCost = businessReportData["sales"]["PNL"]["refund_cost"];
      pnlPromotionCost = businessReportData["sales"]["PNL"]["promotion_cost"];
      pnlEstimatedFees = businessReportData["sales"]["PNL"]["estimated_fees"];
      pnlCogs = businessReportData["sales"]["PNL"]["cogs"];
      pnlExtraFees = businessReportData["sales"]["PNL"]["extra_fees"];
    }
  }
  if (businessReportData.hasOwnProperty("orders")) {
    sumOfOrders = businessReportData["orders"]["sum"];
    ordersComparison =
      businessReportData["orders"]["selected_period_comparison"];
    ordersChange = ordersComparison < 0;
    units = businessReportData["orders"]["units"];
  }
  if (businessReportData.hasOwnProperty("conversion_rate")) {
    conversionRate = businessReportData["conversion_rate"]["sum"];
    conversionRateComparison =
      businessReportData["conversion_rate"]["selected_period_comparison"];
    conversionChange = conversionRateComparison < 0;
    sumOfSessions = businessReportData["conversion_rate"]["sessions"];
    sumOfPageViews = businessReportData["conversion_rate"]["page_views"];
  }
  if (businessReportData.hasOwnProperty("ads_spent")) {
    sumOfSpent = businessReportData["ads_spent"]["sum"];
    adsSpentComparison =
      businessReportData["ads_spent"]["selected_period_comparison"];
    avgConversionRate = businessReportData["ads_spent"]["avg_conversion_rate"];
    tacos = businessReportData["ads_spent"]["tacos"];
    roas = businessReportData["ads_spent"]["roas"];
    acos = businessReportData["ads_spent"]["acos"];
    avg_cpc = businessReportData["ads_spent"]["avg_cpc"];
  }

  return {
    sumOfSales,
    salesComparison,
    salesChange,
    netProfit,
    netMargin,
    pnlRevenue,
    pnlPPCSpend,
    pnlRefundCost,
    pnlPromotionCost,
    pnlEstimatedFees,
    pnlExtraFees,
    pnlCogs,
    sumOfOrders,
    ordersChange,
    ordersComparison,
    returns,
    units,
    conversionRate,
    conversionRateComparison,
    conversionChange,
    sumOfSessions,
    sumOfPageViews,
    sumOfSpent,
    adsSpentComparison,
    avgConversionRate,
    tacos,
    roas,
    acos,
    avg_cpc,
  };
}
