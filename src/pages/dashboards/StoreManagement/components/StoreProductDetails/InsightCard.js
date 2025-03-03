import { Box, Button } from "@mui/material";
import React from "react";
import styled from "styled-components/macro";

const InsightCard = ({ insight }) => {
  const Card = styled.div`
    padding: 24px;
    width: 100%;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
  `;

  const Header = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
  `;

  const Logo = styled.img`
    width: 24px;
    height: 24px;
    background: #a855f7;
    border-radius: 4.8px;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const FooterBtn = styled.div`
    display: flex;
    margin-top: 52px;
  `;

  const Title = styled.h1`
    width: 100%;
    height: 24px;
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #0f172a;
    padding-left: 12px;
  `;

  const Heading = styled.h1`
    width: 100%;
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #0f172a;
    margin-top: 24px;
    text-decoration: ${(p) => (p.strike ? "line-through" : "")};
  `;

  const Description = styled.p`
    font-family: Inter;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: #475569;
    margin-top: 8px;
  `;

  const ActionBtn = styled(Button)`
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
    color: #334155;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
  `;

  const DismissBtn = styled(Button)`
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
    color: #334155;
    border-radius: 8px;
    margin-left: 12px;
  `;

  return (
    <React.Fragment>
      <Card>
        <Box sx={{ marginLeft: 2 }}>
          <Header>
            <Logo src="/assets/Icon.png" alt="trolley" />
            <Title>Insight</Title>
          </Header>
          <Heading strike={true}>{insight.heading}</Heading>
          <Description>{insight.Desc}</Description>
          <FooterBtn>
            <ActionBtn variant="outlined">Take action</ActionBtn>
            <DismissBtn variant="text">Dismiss</DismissBtn>
          </FooterBtn>
        </Box>
      </Card>
    </React.Fragment>
  );
};

export default InsightCard;
