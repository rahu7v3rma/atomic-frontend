import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import DownloadIcon from "@mui/icons-material/Download";
import { TableContainer, Typography } from "@mui/material";
import { Box } from "@mui/system";
import styled from "styled-components";

const LastUpdatedText = styled(Typography)`
  font-size: 9px;
  color: #b8b8b8;
  font-family: "Inter", sans-serif;
`;

const Inter = {
  600: styled(Typography)`
    font-family: Inter, sans-serif;
    font-weight: 600;
  `,
  500: styled(Typography)`
    font-family: Inter, sans-serif;
    font-weight: 500;
  `,
  400: styled(Typography)`
    font-family: Inter, sans-serif;
    font-weight: 400;
  `,
};

const Container = {
  MonthSelector: styled(Box)`
    border: 1px solid #cbd5e1;
    display: flex;
    align-items: center;
    padding: 5px 15px;
    border-radius: 8px;
    justify-content: space-between;
  `,
};

const Text = {
  MonthSelector: styled(Inter[600])`
    color: #334155;
    font-size: 14px;
    margin: 0 7px;
  `,
};

// const DatesContainer = styled(Box)`
//   display: flex;
//   align-items: center;
//   margin-left: 10px;
//   border-bottom: 1px solid black;
//   padding: 0 5px;
// `;

const EmptyProductListMsg = styled.div`
  font-weight: 600;
  font-size: 16px;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  font-family: "Inter";
  color: #64748f;
`;

// const DatesSeperator = styled(Typography)`
//   font-family: "Inter", sans-serif;
//   font-weight: 500;
//   margin: 0 5px;
// `;

// const DateWrapper = styled(Typography)`
//   font-family: "Inter", sans-serif;
//   font-weight: 500;
// `;

export const StyledArrowDownwardIcon = styled(ArrowDownwardIcon)`
  font-size: 12px;
`;

export const StyledArrowUpwardIcon = styled(ArrowUpwardIcon)`
  font-size: 12px;
`;

export const ColumnTitle = styled.p`
  margin: 0px;
  cursor: pointer;
`;

export const TableStyled = styled(TableContainer)`
  border-radius: 8px;
  border: 1px solid #e2e8f0;
`;

export const ProductTitle = styled(Typography)`
  font: 700 14px "Inter", sans-serif;
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const ProductImage = {
  Container: styled(Container.MonthSelector)`
    border: 2px solid ${(p) => (p.disabled ? "#bcbcbd" : "#3f73e5")};
    border-radius: 12px;
    padding-right: 10px;
    padding-top: 10px;
    cursor: pointer;
    background-color: white;
    margin-bottom: 20px;
  `,
  Icon: styled(DownloadIcon)`
    width: 20px;
    height: 20px;
    color: ${(p) => (p.disabled ? "#bcbcbd" : "#3f73e5")};
  `,
  Text: styled(Text.MonthSelector)`
    color: ${(p) => (p.disabled ? "#bcbcbd" : "#3f73e5")};
    font-size: 13px;
    font-family: Inter, sans-serif;
  `,
};

export const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export { LastUpdatedText, EmptyProductListMsg };
