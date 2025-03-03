import {
  Cached as CachedIcon,
  InsertChart as InsertChartIcon,
} from "@mui/icons-material";
import { Grid, Toolbar } from "@mui/material";
import Paper from "@mui/material/Paper";
import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";

import ResultsContext from "../../../../../contexts/ResultsContext";
// import the useDispatch Redux hook
// import our fetchAsinReviewsReport thunk
import { fetchAsinReviewsReport } from "../../../../../redux/slices/reviews";
import LoaderDiv from "../../../../components/LoaderDiv";

const TablesRecords = styled("div")`
  padding: 20px;
`;

const MuiPaper = styled(Paper)`
  color: rgba(0, 0, 0, 0.87);
  font-size: 16px;
  margin-left: auto;
  margin-right: auto;
`;

const Img = styled("img")`
  width: 40px;
`;

const GridImg = styled(Grid)`
  text-align: center;
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 20px;
`;

const GridText = styled(Grid)`
  margin-top: 5px;
  margin-bottom: 5px;
`;

const GridTitleText = styled(Grid)`
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 5rem !important;
`;

const GridIcons = styled(Grid)`
  display: grid;
  margin-left: auto;
`;

const InsertChart = styled(InsertChartIcon)`
  width: 40px;
  height: 40px;
  color: black;
  &:hover,
  &:focus {
    color: blue;
  }
`;

const Cached = styled(CachedIcon)`
  width: 40px;
  height: 40px;
  color: black;
  &:hover,
  &:focus {
    color: blue;
  }
`;

function ReviewsReportCard() {
  const navigate = useNavigate();
  const {
    reviewsLoading,
    reviews,
    handleReviewsAsinChange,
    handleReviewsCompetingAsinsChange,
    reviewsCompetingAsins,
  } = useContext(ResultsContext);

  const redirectToDetailedReport = (reviewReport) => {
    navigate("/review-report", { state: reviewReport });
    handleReviewsAsinChange(reviewReport.asin);
    handleReviewsCompetingAsinsChange(reviewReport.competingAsins); // TODO: report should have the competing asins part of the response from backend
  };

  const dispatch = useDispatch();
  const refreshReportData = (asin, competing_asins) => {
    dispatch(fetchAsinReviewsReport(asin, competing_asins, true));
  };

  return (
    <TablesRecords>
      {reviewsLoading ? (
        <div>
          <LoaderDiv />
        </div>
      ) : reviews.length ? (
        reviews.map((reviewReport, idx) => {
          return reviewReport && reviewReport.reviews.length ? (
            <React.Fragment key={reviewReport.product_title + idx}>
              <MuiPaper
                position="sticky"
                elevation={0}
                variant="outlined"
                onClick={() => redirectToDetailedReport(reviewReport)}
              >
                <Toolbar>
                  <Grid container spacing={0}>
                    <GridImg item xs={1}>
                      <Img src={reviewReport?.product_image} />
                    </GridImg>
                    <GridTitleText item xs={2}>
                      {reviewReport?.product_title}
                      <br />
                      {reviewReport?.asin}
                    </GridTitleText>
                    <GridText item xs={2}>
                      {reviewReport?.ratings_total}
                      <br />
                      {reviewReport?.rating}
                      <br />
                      {reviewReport?.reviews_total}
                    </GridText>
                    <GridText item xs={3}>
                      {reviewReport?.time_created?.replace("T", " ")}
                    </GridText>
                    <GridIcons item xs={true} justifyContent="flex-end">
                      <InsertChart
                        onClick={() => {
                          redirectToDetailedReport(reviewReport);
                        }}
                      />
                      <Cached
                        onClick={() => {
                          refreshReportData(
                            reviewReport?.asin,
                            reviewsCompetingAsins
                          );
                        }}
                      />
                    </GridIcons>
                  </Grid>
                </Toolbar>
              </MuiPaper>
              <br />
            </React.Fragment>
          ) : null;
        })
      ) : null}
    </TablesRecords>
  );
}
export default ReviewsReportCard;
