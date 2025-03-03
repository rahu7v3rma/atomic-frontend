import InfoIcon from "@mui/icons-material/Info";
import { Box, Tooltip, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components/macro";

import tooltipContent from "../../../../components/tooltips_content";

const Card = styled.div`
  flex: 1;
  border-right: 1px solid #dce4ea;
  margin-top: 32px;
  width: 100%;
  height: 150px;
  display: flex;
  background-color: #ffffff;
  flex-direction: column;
`;

const NumberBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2px 8px;
  gap: 2px;
  height: 20px;
  background: #dcfce7;
  border-radius: 16px;
  margin-left: 4px;
`;

const Percent = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  margin-left: 4px;
`;

const Number = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #0f172a;
`;

const ArrowIcon = styled.img`
  width: 12px;
  height: 10px;
  object-fit: contain;
`;

const Span = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  color: #0f172a;
`;

const Title = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  color: #64748b;
  margin-left: 24px;
`;

const SubTitle = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const BusinessCard = ({ report, index }) => {
  return (
    <Card style={index === 0 ? { borderLeft: "1px solid #dce4ea" } : {}}>
      <Title>{report.title}</Title>
      <Box sx={{ display: "flex", marginLeft: 6, alignItems: "center" }}>
        <Number>{report.value?.toLocaleString()}</Number>
        <NumberBox
          style={{
            background: report.percentage > 0 ? "#DCFCE7" : "#FEE2E2",
          }}
        >
          <ArrowIcon
            src={
              report.percentage > 0 ? "./assets/gain.png" : "./assets/loss.png"
            }
          />
          <Percent
            style={
              report.percentage > 0
                ? { color: "#16A34A" }
                : { color: "#DC2626" }
            }
          >
            {report.percentage > 0
              ? report.percentage?.toLocaleString()
              : report.percentage?.toLocaleString() * -1}
            %
          </Percent>
        </NumberBox>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginLeft: 6,
          marginTop: 4,
        }}
      >
        <SubTitle>
          {report.subtitle}
          {report.subtitle === "Buy box percentage" && (
            <Tooltip
              placement="right"
              arrow
              title={
                <Box
                  sx={{
                    fontFamily: "Inter",
                    fontWeight: 400,
                    fontSize: 12,
                    padding: 1,
                    width: "185px",
                  }}
                  data-testid="2nd_3rd_column_tooltip_menu"
                >
                  <Typography>
                    {tooltipContent.business_report.buy_box_percentage}
                  </Typography>
                </Box>
              }
            >
              <InfoIcon
                sx={{
                  width: "18px",
                  height: "18px",
                  color: "#CBD5E1",
                  marginRight: "20px",
                }}
                data-testid="2nd_3rd_columns_tooltip"
              />
            </Tooltip>
          )}
        </SubTitle>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Span>{report.percentvalue?.toLocaleString()}%</Span>
          {report.session ? (
            <NumberBox
              style={{
                background:
                  report.sessionpercentage > 0 ? "#DCFCE7" : "#FEE2E2",
              }}
            >
              <ArrowIcon
                src={
                  report.sessionpercentage > 0
                    ? "./assets/gain.png"
                    : "./assets/loss.png"
                }
              />
              <Percent
                style={
                  report.sessionpercentage > 0
                    ? { color: "#16A34A" }
                    : { color: "#DC2626" }
                }
              >
                {report.sessionpercentage > 0
                  ? report.sessionpercentage?.toLocaleString()
                  : report.sessionpercentage?.toLocaleString() * -1}
                %
              </Percent>
            </NumberBox>
          ) : (
            ""
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default BusinessCard;
