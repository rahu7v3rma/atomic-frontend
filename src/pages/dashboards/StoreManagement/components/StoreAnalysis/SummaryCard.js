import AssessmentIcon from "@mui/icons-material/Assessment";
import AttachMoney from "@mui/icons-material/AttachMoney";
import Campaign from "@mui/icons-material/Campaign";
import FilterAlt from "@mui/icons-material/FilterAlt";
import InfoIcon from "@mui/icons-material/Info";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import {
  CardContent,
  Collapse,
  IconButton,
  Typography as MuiTypography,
  Skeleton,
  Tooltip,
} from "@mui/material";
import Box from "@mui/material/Box";
import React, { useCallback, useState } from "react";
import styled from "styled-components/macro";

import Changeicon from "../../../../components/Changeicon";
import { ReactComponent as DownSvg } from "../../../../icons/down.svg";
import { ReactComponent as UpSvg } from "../../../../icons/up.svg";

const Typography = styled(MuiTypography)`
  @media (max-width: 1200px) {
    font-size: 14px;
  }
`;

const CollapseIconButton = styled(IconButton)`
  height: 10px;
  width: 10px;
  margin-top: 2px;
  margin-right: 5px;
  margin-left: -8px;
`;

const CollapseCardContent = styled(CardContent)`
  height: 150px;
  padding: inherit;
`;

const Card = styled.div`
  width: 100%;
  height: 100%;
  padding: 6%;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  margin-right: 20px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 8px;
`;

const Value = styled.h1`
  width: 100%;
  height: 32px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #0f172a;
  padding-top: 5px;
  margin: 0px;
  text-decoration: ${(p) => (p.strike ? "line-through" : "")};
`;

const Description = styled.p`
  width: 100%;
  height: 16px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  color: #475569;
  margin-top: 6px;
  margin-bottom: 16px;
`;

const Percentage = styled.span`
  color: #16a34a;
  border-radius: 10px;
  padding-left: 6px;
  padding-right: 6px;
  text-decoration: ${(p) => (p.strike ? "line-through" : "")};
`;

const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  background: #f1f5f9;
  margin-bottom: 16px;
`;
// height: 24px;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 4px;
  text-decoration: ${(p) => (p.strike ? "line-through" : "")};
`;

const SubTitle = styled.h3`
  @media (max-width: 1200px) {
    font-size: 12px;
  }
  width: 100%;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #64748b;
  padding: 0px;
  margin: 0px;
  margin-right: 2px;
  line-height: 22px;
`;

const TotalValue = styled.h3`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  text-align: right;
  color: #0f172a;
  padding: 0px;
  margin: 0px;
  margin-left: 3px;
`;

const SummaryCard = ({
  title,
  value,
  percentage,
  subTitleOne,
  totalValueOne,
  subTitleTwo,
  totalValueTwo,
  content,
  strikeHeaderOne = false,
  strikeHeaderTwo = false,
  strikeValueOne = false,
  strikeValueTwo = false,
  showCollapseValueOne = false,
  valueOneExpended = "",
  isLoading = false,
}) => {
  const getLogoBg = useCallback(() => {
    if (title === "Sales") {
      return "#84CC16";
    } else if (title === "Orders") {
      return "#06B6D4";
    } else if (title === "Conversion rate") {
      return "#14B8A6";
    } else if (title === "Total Clicks") {
      return "#84CC16";
    } else if (title === "Impressions") {
      return "#06B6D4";
    } else if (title === "Cost") {
      return "#14B8A6";
    } else if (title === "CTR") {
      return "#6366F1";
    } else {
      return "#6366F1";
    }
  }, [title]);

  const [openKey, setOpenKey] = useState();
  const handleToggle = () => setOpenKey(!openKey);

  const getLogo = () => {
    if (title === "Sales") {
      return (
        <AttachMoney
          sx={{ marginRight: 1, color: getLogoBg(), fontSize: 30 }}
        />
      );
    } else if (title === "Orders") {
      return (
        <ShoppingCart
          sx={{ marginRight: 1, color: getLogoBg(), fontSize: 30 }}
        />
      );
    } else if (title === "Conversion rate") {
      return (
        <FilterAlt sx={{ marginRight: 1, color: getLogoBg(), fontSize: 30 }} />
      );
    } else if (title === "Ads spent") {
      return (
        <Campaign sx={{ marginRight: 1, color: getLogoBg(), fontSize: 30 }} />
      );
    } else if (title === "Impressions") {
      return (
        <Changeicon
          path="static/img/changeicon/Impression.png"
          sx={{ marginRight: 1, color: getLogoBg(), fontSize: 30 }}
        />
      );
    } else if (title === "Total Clicks") {
      return (
        <Changeicon
          path="static/img/changeicon/clicks.svg"
          sx={{ marginRight: 1, color: getLogoBg(), fontSize: 30 }}
        />
      );
    } else if (title === "Add To Cart") {
      return (
        <Changeicon
          path="static/img/changeicon/add_to_cart.svg"
          sx={{ marginRight: 1, color: getLogoBg(), fontSize: 30 }}
        />
      );
    } else if (title === "Purchases") {
      return (
        <Changeicon
          path="static/img/changeicon/purchases.svg"
          sx={{ marginRight: 1, color: getLogoBg(), fontSize: 30 }}
        />
      );
    } else {
      return (
        <AssessmentIcon
          sx={{ marginRight: 1, color: getLogoBg(), fontSize: 30 }}
        />
      );
    }
  };

  const getPercentageColor = useCallback(() => {
    if (Math.sign(percentage) === -1) {
      return ["#DC2626", "#FEE2E2", <DownSvg />];
    } else {
      return ["#16A34A", "#DCFCE7", <UpSvg />];
    }
  }, [percentage]);

  return (
    <Card>
      <Header>
        {getLogo()}
        <Typography
          sx={{
            fontFamily: "Inter",
            fontWeight: 600,
            fontSize: 16,
            padding: 1,
            color: "#0F172A",
            marginRight: 1,
          }}
        >
          {title}
        </Typography>
        {content && (
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
                <MuiTypography>{content}</MuiTypography>
              </Box>
            }
          >
            <InfoIcon
              sx={{
                width: "18px",
                height: "18px",
                color: "#CBD5E1",
              }}
              data-testid="2nd_3rd_columns_tooltip"
            />
          </Tooltip>
        )}
      </Header>
      <Value strike={strikeHeaderOne}>
        {!isLoading ? value : <Skeleton variant="rectangular" height={15} />}
      </Value>
      {isLoading ? (
        <Skeleton variant="rectangular" height={15} />
      ) : (
        <Description>
          <Percentage
            style={{
              color: getPercentageColor()[0],
              backgroundColor: getPercentageColor()[1],
            }}
            strike={strikeHeaderTwo}
          >
            {getPercentageColor()[2]}
            {` ${percentage.replace("-", "")}`}%
          </Percentage>{" "}
        </Description>
      )}
      <HorizontalLine />
      {showCollapseValueOne && !isLoading ? (
        <Collapse in={openKey} timeout="auto" unmountOnExit>
          <CollapseCardContent
            dangerouslySetInnerHTML={{ __html: valueOneExpended }}
          />
        </Collapse>
      ) : (
        <div />
      )}
      <Footer strike={strikeValueOne}>
        {showCollapseValueOne ? (
          <CollapseIconButton
            aria-label="expand"
            size="medium"
            onClick={() => handleToggle()}
          >
            {openKey ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </CollapseIconButton>
        ) : (
          <div />
        )}
        <SubTitle>{subTitleOne}</SubTitle>
        {isLoading ? (
          <Skeleton variant="rectangular" width={80} height={15} />
        ) : (
          <TotalValue>{totalValueOne}</TotalValue>
        )}
      </Footer>
      <Footer strike={strikeValueTwo}>
        <SubTitle>{subTitleTwo}</SubTitle>
        {isLoading ? (
          <Skeleton variant="rectangular" width={80} height={15} />
        ) : (
          <TotalValue>{totalValueTwo}</TotalValue>
        )}
      </Footer>
    </Card>
  );
};

export default SummaryCard;
