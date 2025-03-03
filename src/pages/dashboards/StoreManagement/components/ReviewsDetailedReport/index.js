import { Card, Grid, Rating, Typography } from "@mui/material";
import moment from "moment";
import React, { useContext } from "react";
import styled from "styled-components/macro";

import ResultsContext from "../../../../../contexts/ResultsContext";
import LoaderDiv from "../../../../components/LoaderDiv";

import AllReviews from "./AllReviews";
import BreakdownChart from "./BreakdownChart";
import KeyReviews from "./KeyReviews";
import LineChart from "./Velocity";

const Container = styled("div")`
  display: flex;
  align-items: center;
  margin: 0.5em 0;
`;

const CardContainer = styled(Card)`
  padding: 20px;
`;

const ReviewsDetailedReport = () => {
  const { reviews, reviewsAsin, reviewsCompetingAsins, reviewsLoading } =
    useContext(ResultsContext);

  const mainAsinReport = reviews.filter((el) => el.asin === reviewsAsin)[0];
  const competingAsinReports = reviews.filter((el) =>
    reviewsCompetingAsins?.includes(el.asin)
  );

  const mainAsinGroupedWeekly = mainAsinReport?.reviews.reduce((acc, el) => {
    const date = new Date(el.date_utc);
    const yearWeek = `${moment(date).year()}-week${moment(date).week()}`;

    // add this key as a property to the result object
    if (!acc[yearWeek]) {
      acc[yearWeek] = [];
    }

    // push the current date that belongs to the year-week calculated befor
    acc[yearWeek].push(el);

    return acc;
  }, {});

  const competingAsinGroupedWeekly = competingAsinReports
    .map((el) => el.reviews)
    .flat()
    .reduce((acc, el) => {
      const date = new Date(el.date_utc);
      const yearWeek = `${moment(date).year()}-week${moment(date).week()}`;

      // add this key as a property to the result object
      if (!acc[yearWeek]) {
        acc[yearWeek] = [];
      }

      // push the current date that belongs to the year-week calculated befor
      acc[yearWeek].push(el);

      return acc;
    }, {});

  const getRatingRatio = () => {
    return `${(
      (mainAsinReport.reviews_total / mainAsinReport.ratings_total) *
      100
    ).toFixed(2)}%`;
  };

  const getRatingsData = () => {
    const {
      ratings_five_star_count,
      ratings_four_star_count,
      ratings_three_star_count,
      ratings_two_star_count,
      ratings_one_star_count,
    } = mainAsinReport;
    return [
      ratings_five_star_count,
      ratings_four_star_count,
      ratings_three_star_count,
      ratings_two_star_count,
      ratings_one_star_count,
    ];
  };

  const getTopCritical = () => {
    const {
      top_critical_body,
      top_critical_date_utc,
      top_critical_date_raw,
      top_critical_helpful_votes,
      top_critical_id,
      top_critical_profile_img,
      top_critical_profile_link,
      top_critical_profile_name,
      top_critical_rating,
      top_critical_title,
    } = mainAsinReport;
    return {
      topBody: top_critical_body,
      topDateUtc: top_critical_date_utc,
      topDateRaw: top_critical_date_raw,
      topHelpfulVotes: top_critical_helpful_votes,
      topId: top_critical_id,
      topProfileImg: top_critical_profile_img,
      topProfileLink: top_critical_profile_link,
      topProfileName: top_critical_profile_name,
      topRating: top_critical_rating,
      topTitle: top_critical_title,
    };
  };

  const getTopPositive = () => {
    const {
      top_positive_body,
      top_positive_date_utc,
      top_positive_date_raw,
      top_positive_helpful_votes,
      top_positive_id,
      top_positive_profile_img,
      top_positive_profile_link,
      top_positive_profile_name,
      top_positive_rating,
      top_positive_title,
    } = mainAsinReport;
    return {
      topBody: top_positive_body,
      topDateUtc: top_positive_date_utc,
      topDateRaw: top_positive_date_raw,
      topHelpfulVotes: top_positive_helpful_votes,
      topId: top_positive_id,
      topProfileImg: top_positive_profile_img,
      topProfileLink: top_positive_profile_link,
      topProfileName: top_positive_profile_name,
      topRating: top_positive_rating,
      topTitle: top_positive_title,
    };
  };

  return (
    <React.Fragment>
      <div>
        {reviewsLoading ? (
          <div>
            <LoaderDiv />
          </div>
        ) : mainAsinReport ? (
          <React.Fragment>
            <CardContainer>
              <Typography variant="h2">
                <b>{mainAsinReport.product_title}</b> - Reviews and ratings
                snapshot
              </Typography>
              <Container>
                <Rating
                  name="half-rating"
                  value={mainAsinReport.rating}
                  precision={0.5}
                  size="large"
                  readOnly
                />
                <Typography ml={2} variant="h3">
                  {mainAsinReport.rating} out of 5
                </Typography>
              </Container>

              <Container>
                <Typography variant="subtitle2">
                  {mainAsinReport.ratings_total} Global Ratings
                </Typography>
                <Typography variant="subtitle2" ml={4}>
                  {mainAsinReport.reviews_total} Reviews
                </Typography>
                <Typography variant="subtitle2" ml={4}>
                  {getRatingRatio()} reviews to ratings ratio
                </Typography>
              </Container>

              <Grid mt={4} container spacing={4}>
                <Grid item xs={12} sm={12} md={6}>
                  <BreakdownChart
                    dataset_label="Review count"
                    title="Review breakdown"
                    sort={true}
                    data={mainAsinReport.reviews}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <BreakdownChart
                    dataset_label="Rating count"
                    data={getRatingsData()}
                    title="Rating breakdown"
                    sort={false}
                    useNumericAgg={true}
                  />
                </Grid>
              </Grid>
            </CardContainer>

            <LineChart
              report_groups_weekly={mainAsinGroupedWeekly}
              report_groups_weekly_competitors={competingAsinGroupedWeekly}
            />

            <CardContainer>
              <Typography mb={4} variant="h2">
                Top Reviews Snippet
              </Typography>
              <Grid container spacing={4}>
                <KeyReviews data={getTopPositive()} name="top_positive" />
                <KeyReviews data={getTopCritical()} name="top_critical" />
              </Grid>
            </CardContainer>

            <CardContainer>
              <AllReviews reviewsAsin={mainAsinReport} />
            </CardContainer>
          </React.Fragment>
        ) : (
          <div>No product data found</div>
        )}
      </div>
    </React.Fragment>
  );
};

export default ReviewsDetailedReport;
