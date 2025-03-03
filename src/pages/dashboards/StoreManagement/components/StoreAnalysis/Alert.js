import InfoIcon from "@mui/icons-material/Info";
import { Link, Stack, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components/macro";

const AlertMainBox = styled(Stack)`
  background: #fef2f2;
  width: 100%;
  border: 1px solid #ef4444;
  margin: 5px 0;
  border-radius: 4px;
  box-shadow: inset 3px 0px 0px #ef4444;
`;
const AlertBox = styled(Stack)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 22px;
  margin-top: 16px;
`;
const AlertHeading = styled(Typography)`
  color: #0f172a;
  font-size: 14px;
  font-family: Inter;
  font-style: Semi Bold;
  font-weight: 600;
  line-height: 24px;
  margin-left: 13px;
`;
const AlertDescription = styled(Typography)`
  font-family: Inter;
  font-style: Regular;
  font-size: 14px;
  line-height: 24px;
  color: #475569;
  font-weight: 400;
  margin-left: 48px;
`;
const ReviewLink = styled(Link)`
  color: #215ee4;
  font-size: 14px;
  font-family: Inter;
  font-style: Semi Bold;
  font-weight: 600;
  line-height: 24px;
  margin-left: 48px;
  margin-top: 13px;
  margin-bottom: 16px;
`;

function Alerts(props) {
  const { type, message, listing_link } = props.alertsDetails;
  return (
    <AlertMainBox>
      <AlertBox>
        <InfoIcon fontSize="inherit" sx={{ color: "red", fontSize: 14 }} />
        <AlertHeading>{type}</AlertHeading>
      </AlertBox>
      <AlertDescription>{message}</AlertDescription>
      <ReviewLink href={listing_link} target="_blank">
        Review listing
      </ReviewLink>
    </AlertMainBox>
  );
}

export default Alerts;
