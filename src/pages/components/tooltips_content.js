const tooltipContent = {
  store_management_dashboard: {
    sales:
      "Sales data pulled from the business report for the dates selected. Profit and margin are pulled from NetSuite",
    orders:
      "Number of orders, returns and units pulled from the orders report, includes uncancelled orders on Amazon.com sales channel.",
    conversion_rate:
      "Units Ordered / Sessions rate from the business report. You might see a small gap between the ratio you will calculate manually.",
    ads_spent:
      "Total Ads spend including sponsored products, brand and display. All performance metrics are based on 30 days attribution.",
  },
  store_management_product_list: {
    "3PL Quantity":
      "Number of units on all 3PL warehouses, pulled from NetSuite",
    "FBA Quantity": "Number of units in FBA warehouses",
    "1 Month Forecast": "One month forecast",
    "3 Months Forecast": "Three months forecast",
    "6 Months Forecast": "Six months forecast",
    "Days of Supply":
      "Number of days untill supply is over, based on the forecasting model",
    conversion_rate:
      "Units ordered/sessions rate pulled from the business report.",
    units_sold:
      "The number of units sold for the selected time frame (7 or 30 days)/ Data is pulled from the business report",
    reviews_velocity: "Number of new reviews gathered over the time selected",
    bsr: "Daily BSR snapshot pulled from Keepa",
  },
  business_report: {
    buy_box_percentage: "Buy box ownership",
  },
  advance_business_report: {
    metric_dropdown: {
      spend_sp: "Sponsored Products campaign spend",
      cpc_sp: "Sponsored Products campaign daily CPC",
      impressions_sp: "Sponsored Products campaign impressions",
      clicks_sp: "Sponsored Products campaign clicks",
      ctr_sp: "Sponsored Products campaign Clicks/ Impressions rate",
      cvr_sp: "Sponsored Product campaign attributed sales for 14 days/clicks",
      purchases_sp: "Sponsored Products 14 days of attributed sales.",
      spend_display_ads: "Display Campaign spend",
      cpc_display_ads: "Display Campaign CPC",
      impressions_display_ads: "Display campaign impressions",
      clicks_display_ads: "Display campaign clicks",
      ctr_display_ads: "Display Campaign Clicks/impressions",
      rate_display_ads:
        "Display Campaign CVR, calculated by attributed sales for 14 days/clicks",
      purchase_display_ads: "Display campaign attributed sales for 14 days",
    },
  },
};
export default tooltipContent;
