import { Container, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";

import {
  fetchInsights,
  insightsSelector,
} from "../../../../../redux/slices/insights";

import DetailsCard from "./../shared/DetailsCard";
import InsightCard from "./InsightCard";

const Insights = () => {
  const dispatch = useDispatch();
  const { insightsData } = useSelector(insightsSelector);

  useEffect(() => {
    dispatch(fetchInsights());
  }, [dispatch]);

  const Details = styled.div`
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
  `;

  const AmazonText = styled.div`
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
    color: #334155;
    margin-left: 9px;
  `;

  const AmazonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 4px 16px;
    height: 32px;
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
  `;

  const AmazonIcon = styled.img`
    width: 15px;
    height: 15px;
    margin-left: 8px;
  `;

  const ProductDetails = styled(Container)`
    display: flex;
    justify-content: space-between;
    max-width: inherit;
    padding: 0;
  `;

  return (
    <React.Fragment>
      <ProductDetails>
        <Details>Insights</Details>
        <AmazonContainer>
          <AmazonText>Competitors</AmazonText>
          <AmazonIcon src="/static/img/random/arrow-forward.svg" />
        </AmazonContainer>
      </ProductDetails>

      <Grid container spacing={6} sx={{ marginTop: 2 }}>
        {insightsData?.insights?.map((insight, key) => (
          <Grid item sm={6} md={4} key={key}>
            <InsightCard insight={insight} />
          </Grid>
        ))}
      </Grid>

      <Grid sx={{ marginTop: 6 }} container spacing={6}>
        <Grid item sm={12} md={6}>
          <DetailsCard
            title="Reviews"
            reviews={{
              average: "4.78",
              new: "3",
              total: "total",
              strikeReviews: true,
            }}
            firstWarningTitle="Average rating"
            firstWarningValue="3.2 based on all reviews"
            firstWarningDetails="3.2 based on all reviews"
            strikeFirstWarning={true}
            secondWarningTitle="Reviews require attention"
            secondWarningValue="3 reviews lower than average"
            secondWarningDetails="3 reviews lower than average"
            strikeSecondWarning={true}
            isCheck={true}
            showLearnMore={true}
          />
        </Grid>
        <Grid item sm={12} md={6}>
          <DetailsCard
            title="Trending Q&A"
            questionList={insightsData?.questions || []}
            showLearnMore={true}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Insights;
