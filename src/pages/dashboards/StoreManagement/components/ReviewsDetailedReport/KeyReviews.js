import { Avatar, Box, Grid, Rating, Typography } from "@mui/material";
import { format, isValid } from "date-fns";
import React from "react";
import styled from "styled-components/macro";

const Container = styled("div")`
  display: flex;
  align-items: center;
  margin: 0.5em 0;
  text-transform: capitalize;
`;

const KeyReviews = (props) => {
  const { data = {} } = props;
  const {
    topTitle,
    topBody,
    topDateRaw,
    topProfileImg,
    topProfileLink,
    topHelpfulVotes,
    topProfileName,
    topRating,
  } = data;

  const checkIfValidDate = () => {
    return isValid(topDateRaw)
      ? `Reviewed on  ${format(new Date(topDateRaw), "PPP")}`
      : topDateRaw;
  };

  return (
    <React.Fragment>
      <Grid item xs={12} sm={12} md={6}>
        <Container>
          <a href={topProfileLink} target="_blank" rel="noreferrer">
            <Avatar
              sx={{ bgcolor: "#233044" }}
              alt={topProfileName}
              src={topProfileImg}
            />
          </a>
          <Typography ml={2}>
            {topProfileName || "No Name Available"}
          </Typography>
        </Container>
        <Container>
          <Rating value={topRating} precision={0.5} readOnly />
          <Typography ml={2} sx={{ fontWeight: "bold" }}>
            {topTitle || "Untitled Review"}
          </Typography>
        </Container>
        <Box mt={2}>
          <Typography sx={{ color: "gray", fontWeight: "medium" }}>
            {checkIfValidDate()}
          </Typography>
          <Typography mt={1} sx={{ fontWeight: "medium" }}>
            {topBody}
          </Typography>
          <Typography mt={1} sx={{ color: "gray" }}>
            {topHelpfulVotes || 0} people found this helpful
          </Typography>
        </Box>
      </Grid>
    </React.Fragment>
  );
};

export default KeyReviews;
