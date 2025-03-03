import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import React from "react";

import BrandBreakdown, { BrandBreakdownChartType } from "./BrandBreakdown";
import CustomerRating, { CustomerRatingChartType } from "./CustomerRating";
import NicheCardContent from "./NicheCardContent";
import SearchtermPerformance from "./SearchtermPerformance";

export default function NicheSection(props) {
  const { data, brand, idx } = props;
  return data ? (
    <Grid key={idx} item xs>
      <Card key={"key: " + idx}>
        <NicheCardContent data={data} key={"nc: " + idx} />
      </Card>
      <Grid container spacing={3}>
        <Grid item xs>
          <Card>
            <BrandBreakdown
              nicheData={data}
              type={BrandBreakdownChartType.BRAND}
            />
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs>
          <Card>
            <BrandBreakdown
              nicheData={data}
              type={BrandBreakdownChartType.PRODUCT}
            />
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs>
          <Card>
            <CustomerRating
              nicheData={data}
              brand={brand ? brand.brand_name : ""}
              type={CustomerRatingChartType.BRAND}
            />
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs>
          <Card>
            <CustomerRating
              nicheData={data}
              brand={brand ? brand.brand_name : ""}
              type={CustomerRatingChartType.PRODUCT}
            />
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs>
          <Card>
            <SearchtermPerformance data={data} />
          </Card>
        </Grid>
      </Grid>
    </Grid>
  ) : (
    <React.Fragment>
      <Card>
        <div>No data found!</div>
      </Card>
    </React.Fragment>
  );
}
