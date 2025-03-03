import * as React from "react";
import styled from "styled-components/macro";

import DataTable from "./DataTable";

const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: 100vw;
`;

const createDataBrandProducts = (
  title,
  asin,
  count_of_reviews,
  rating_score,
  price,
  main_category_bsr,
  number_variants,
  main_category,
  sub_category,
  sub_category_bsr,
  first_launch_date,
  monthly_sales_units,
  monthly_sales_revenue,
  annual_sales_units,
  annual_sales_revenue,
  niches,
  product_clicks_in_niche,
  click_count_90_days,
  click_count_growth_90_days,
  average_referral_fees,
  average_fba_fees
) => {
  return {
    title,
    asin,
    count_of_reviews,
    rating_score,
    price,
    main_category_bsr,
    number_variants,
    main_category,
    sub_category,
    sub_category_bsr,
    first_launch_date,
    monthly_sales_units,
    monthly_sales_revenue,
    annual_sales_units,
    annual_sales_revenue,
    niches,
    product_clicks_in_niche,
    click_count_90_days,
    click_count_growth_90_days,
    average_referral_fees,
    average_fba_fees,
  };
};

export default function BrandProducts(props) {
  const { results } = props;
  console.log(results);

  const headCells = [
    {
      id: "title",
      numeric: false,
      disablePadding: false,
      label: "Title",
      tooltip: "source:Rainforest",
    },
    {
      id: "asin",
      numeric: false,
      disablePadding: false,
      label: "Asin",
      tooltip: "source:Rainforest",
    },
    {
      id: "count_of_reviews",
      numeric: true,
      disablePadding: false,
      label: "Review count",
      tooltip: "source:Rainforest",
    },
    {
      id: "rating_score",
      numeric: true,
      disablePadding: false,
      label: "Rating score",
      tooltip: "source:Rainforest",
    },
    {
      id: "price",
      numeric: true,
      disablePadding: false,
      label: "Price",
      tooltip: "average last 360 days, source:Keepa",
    },
    {
      id: "main_category_bsr",
      numeric: true,
      disablePadding: false,
      label: "Main Category BSR",
      tooltip: "source:Keepa",
    },
    {
      id: "number_variants",
      numeric: true,
      disablePadding: false,
      label: "Number of variants",
      tooltip: "source:Keepa",
    },
    {
      id: "main_category",
      numeric: false,
      disablePadding: false,
      label: "Main Category",
      tooltip: "source:Keepa",
    },
    {
      id: "sub_category",
      numeric: false,
      disablePadding: false,
      label: "Sub Category",
      tooltip: "source:Product Opportunity Explorer",
    },
    {
      id: "sub_category_bsr",
      numeric: false,
      disablePadding: false,
      label: "Sub Category BSR",
      tooltip: "source:Product Opportunity Explorer",
    },
    {
      id: "first_launch_date",
      numeric: false,
      disablePadding: false,
      label: "First Launch Date",
      tooltip: "source:Product Opportunity Explorer",
    },
    {
      id: "monthly_sales_units",
      numeric: true,
      disablePadding: false,
      label: "Estimated monthly unit sales",
      tooltip: "source:Rainforest",
    },
    {
      id: "monthly_sales_revenue",
      numeric: true,
      disablePadding: false,
      label: "Estimated monthly revenue sales",
      tooltip: "calculated, source:Rainforest",
    },
    {
      id: "annual_sales_units",
      numeric: true,
      disablePadding: false,
      label: "Estimated annual unit sales",
      tooltip: "calculated, source:Rainforest",
    },
    {
      id: "annual_sales_revenue",
      numeric: true,
      disablePadding: false,
      label: "Estimated annual revenue sales",
      tooltip: "calculate, source:Rainforest",
    },
    {
      id: "niches",
      numeric: false,
      disablePadding: false,
      label: "niches",
      tooltip: "source:Product Opportunity Explorer",
    },
    {
      id: "product_clicks_in_niche",
      numeric: true,
      disablePadding: false,
      label: "Product clicks in the niche",
      tooltip: "source:Product Opportunity Explorer",
    },
    {
      id: "click_count_90_days",
      numeric: true,
      disablePadding: false,
      label: "Click count in the past 90 days",
      tooltip: "source:Product Opportunity Explorer",
    },
    {
      id: "click_count_growth_90_days",
      numeric: true,
      disablePadding: false,
      label: "Click count growth in the past 90 days",
      tooltip: "source:Product Opportunity Explorer",
    },
    {
      id: "average_referral_fees",
      numeric: true,
      disablePadding: false,
      label: "Average referral fees",
      tooltip: "source:Product Opportunity Explorer",
    },
    {
      id: "average_fba_fees",
      numeric: true,
      disablePadding: false,
      label: "Average FBA fees",
      tooltip: "source:Product Opportunity Explorer",
    },
  ];

  const rows = Object.keys(
    results.best_sellers_competetive_position?.best_sellers
  ).map((el) => {
    return createDataBrandProducts(
      results.best_sellers_competetive_position?.best_sellers[el].product_data
        ?.name,
      results.best_sellers_competetive_position?.best_sellers[el].asin,
      parseInt(
        results.best_sellers_competetive_position?.best_sellers[el].reviews
      ),
      parseFloat(
        results.best_sellers_competetive_position?.best_sellers[el].rating_score
      ),
      parseFloat(
        results.best_sellers_competetive_position?.best_sellers[el]
          .average_price
      ),
      parseInt(
        results.best_sellers_competetive_position?.best_sellers[el]
          .main_category_bsr
      ),
      parseInt(
        results.best_sellers_competetive_position?.best_sellers[el]
          .number_of_variants
      ),
      results.best_sellers_competetive_position?.best_sellers[el].main_category,
      results.best_sellers_competetive_position?.best_sellers[el].subcategory,
      parseInt(
        results.best_sellers_competetive_position?.best_sellers[el]
          .subcategory_bsr
      ),
      results.best_sellers_competetive_position?.best_sellers[el].product_data
        ?.aoe_product?.first_available,
      parseInt(
        results.best_sellers_competetive_position?.best_sellers[el]
          .listings_monthly_sales_volume_units
      ),
      parseFloat(
        (
          results.best_sellers_competetive_position?.best_sellers[el]
            .listings_monthly_sales_volume_units *
          results.best_sellers_competetive_position?.best_sellers[el]
            .average_price
        ).toFixed(2)
      ),
      parseInt(
        results.best_sellers_competetive_position?.best_sellers[el]
          .listings_monthly_sales_volume_units * 12
      ),
      parseFloat(
        (
          results.best_sellers_competetive_position?.best_sellers[el]
            .listings_monthly_sales_volume_units *
          results.best_sellers_competetive_position?.best_sellers[el]
            .average_price *
          12
        ).toFixed(2)
      ),
      results.best_sellers_competetive_position?.best_sellers[el].product_data
        ?.aoe_product?.aoe_products_niche,
      parseInt(
        results.best_sellers_competetive_position?.best_sellers[el].product_data
          ?.aoe_product?.product_clicks_in_niche
      ),
      parseInt(
        results.best_sellers_competetive_position?.best_sellers[el].product_data
          ?.aoe_product?.click_count_90_days
      ),
      parseFloat(
        results.best_sellers_competetive_position?.best_sellers[el].product_data
          ?.aoe_product?.click_count_growth_90_days
      ),
      parseFloat(
        results.best_sellers_competetive_position?.best_sellers[el].product_data
          ?.aoe_product?.average_referral_fees
      ),
      parseFloat(
        results.best_sellers_competetive_position?.best_sellers[el].product_data
          ?.aoe_product?.average_fba_fees
      )
    );
  });

  return (
    <React.Fragment>
      <TableWrapper>
        <DataTable
          style={{ width: "100%" }}
          headCells={headCells}
          rows={rows}
        />
      </TableWrapper>
    </React.Fragment>
  );
}
