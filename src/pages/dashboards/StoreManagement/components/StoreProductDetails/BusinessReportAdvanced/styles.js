import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CopyAll from "@mui/icons-material/CopyAll";
import DownloadIcon from "@mui/icons-material/Download";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import TodayIcon from "@mui/icons-material/Today";
import { Checkbox, FormControlLabel, Select, Typography } from "@mui/material";
import { Box } from "@mui/system";
import styled from "styled-components";

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

const Icons = {
  DownArrow: styled(KeyboardArrowDownIcon)`
    color: #64748b;
  `,
};

export const Gap = (width, height) => <Box sx={{ width, height }} />;

// export const Navigation = {
//   Container: styled(Box)`
//     display: flex;
//     flex-direction: row;
//     box-shadow: inset 0px -1px 0px #e2e8f0;
//   `,
//   Link: styled(Typography)`
//     font-family: Inter, sans-serif;
//     font-size: 14px;
//     font-weight: 600;
//     color: ${(params) => (params?.active ? "#215EE4" : "#64748B")};
//     border-bottom: 1px solid
//       ${(params) => (params?.active ? "#215EE4" : "transparent")};
//     padding: 15px 0;
//     && {
//       margin-left: ${(params) => (params?.active ? "" : 20)}px;
//     }
//   `,
// };

export const Header = {
  Container: styled(Box)`
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: end;
  `,
  TOP_TITLE: styled(Box)`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,

  BackArrow: {
    Container: styled(Box)`
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      padding: 5px;
      display: flex;
      align-items: center;
      width: max-content;
    `,
    Icon: styled(ArrowBackIosNewIcon)`
      color: #64748b;
    `,
  },
  Title: {
    Container: styled(Box)`
      display: flex;
      flex-direction: row;
      align-items: center;
    `,
    Text: styled(Inter[600])`
      margin-left: 15px !important;
      font-size: 24px;
    `,
  },
  Actions: {
    Container: styled(Box)`
      display: flex;
      flex-direction: row;
      align-items: center;
    `,
    MonthSelector: {
      Container: Container.MonthSelector,
      Icons: {
        Calendar: styled(TodayIcon)`
          color: #64748b;
        `,
        DownArrow: Icons.DownArrow,
      },
      Text: Text.MonthSelector,
    },
    DownloadCSV: {
      Container: styled(Container.MonthSelector)`
        margin-left: 14px;
        border: 2px solid ${(p) => (p.disabled ? "#bcbcbd" : "#3f73e5")};
        padding: 8px 21px 6px;
        border-radius: 12px;
        cursor: pointer;
        background-color: white;
      `,
      Icons: {
        Download: styled(DownloadIcon)`
          width: 20px;
          height: 20px;
          color: ${(p) => (p.disabled ? "#bcbcbd" : "#3f73e5")};
        `,
        Copy: styled(CopyAll)`
          width: 20px;
          height: 20px;
          color: ${(p) => (p.disabled ? "#bcbcbd" : "#3f73e5")};
        `,
      },
    },
  },
};

export const Body = {
  Container: styled(Box)`
    margin-top: 20px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background-color: white;
    border: 1px solid #e2e8f0;
    padding: 15px;
    padding-bottom: 50px;
  `,
  Chart: {
    Header: {
      Container: styled(Box)`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      `,
      Text: {
        Dates: styled(Inter[400])`
          font-size: 14;
          color: #64748b;
        `,
      },
      Identifiers: {
        Container: styled(Box)`
          display: flex;
          flex-direction: row;
          align-items: center;
        `,
        Text: styled(Inter[400])`
          font-size: 14;
          color: #475569;
        `,
        Icons: {
          Price: styled(HorizontalRuleIcon)`
            color: #ec4899;
            margin-right: 8px;
            border-radius: 2px;
            font-size: 30px;
          `,
          CTR: styled(LinearScaleIcon)`
            color: #0891b2;
            margin-right: 8px;
            margin-left: 24px;
            font-size: 30px;
          `,
          Item: styled(LinearScaleIcon)`
            color: #1ce30e;
            margin-right: 8px;
            margin-left: 24px;
            font-size: 30px;
          `,
          Session: styled(LinearScaleIcon)`
            color: #e35f0e;
            margin-right: 8px;
            margin-left: 24px;
            font-size: 30px;
          `,
        },
      },
    },
  },
  Festivals: {
    Container: styled(Box)`
      margin: 20px 0;
      display: flex;
      flex-direction: row;
    `,
    Text: styled(Inter[500])`
      font-size: 12;
      color: #475569;
      width: 31%;
      background-color: #f1f5f9;
      height: 40px;
      border-radius: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
      margin-left: 40px;
    `,
  },
};

export const AllSKUsSelect = styled(Select)`
  height: 41px;
  color: black;
  font-weight: 600;
  border-radius: 10px;
  margin-left: 10px;
  &:hover {
    border-color: black;
  }
  .MuiOutlinedInput-notchedOutline {
    border: 2px solid #c4c4c4;
  }
  .MuiSelect-select {
    max-width: 500px;
    overflow-x: auto;
    text-overflow: unset;
    margin-right: 10px;
  }
  .MuiSelect-icon {
    background-color: white;
  }
  background-color: white;
`;

// Metrics Select Dropdown
export const MetricsSelect = styled(AllSKUsSelect)`
  margin-left: 14px;
  margin-right: 14px;
`;

export const GraphIndicators = {
  Container: styled(Box)`
    display: flex;
    justify-content: flex-end;
  `,
  Wrapper: styled(Box)`
    display: flex;
    align-items: center;
    margin-left: 20px;
  `,
  Line: styled.hr`
    width: 15px;
    height: 3px;
    border-color: ${(p) => p.color};
    margin-right: 5px;
    position: relative;
    top: 1px;
  `,
  Text: styled(Typography)`
    font-family: "Inter", sans-serif;
  `,
};

export const GraphContainer = styled(Box)`
  height: ${(p) => p.height};
`;

export const Level2DropdownImage = styled.img`
  height: 50px;
  width: 50px;
  margin-right: 10px;
`;

export const StyledImageNotSupportedIcon = styled(ImageNotSupportedIcon)`
  font-size: 50px;
  color: #5b5b5b;
  margin-right: 10px;
`;

export const Level2DropdownAsin = styled.span`
  margin-right: 5px;
  color: #5b5b5b;
  font-weight: 500;
`;

export const Level2DropdownSku = styled.span`
  margin-left: 5px;
  color: #5b5b5b;
  font-weight: 500;
`;

export const Level2DropdownProductName = styled.span`
  font-weight: 500;
`;

export const DropdownProgressDiv = styled.div`
  display: flex;
  justify-content: center;
`;

export const CustomCheckbox = styled(Checkbox)`
  & .MuiSvgIcon-root {
    font-size: 22px;
  }
`;

export const CustomInput = styled(FormControlLabel)`
  margin-left: 5px;
  & .MuiFormControlLabel-label {
    font: 300 12px "Inter", sans-serif;
  }
`;
