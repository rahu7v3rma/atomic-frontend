import { Button, Switch } from "@mui/material";
import styled from "styled-components";

export const Gap = styled.div`
  width: ${(p) => p.width}px;
  height: ${(p) => p.height}px;
`;

export const Title = styled.div`
  font: 600 24px/32px "Inter", sans-serif;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const DaysSpan = styled.span`
  font: 500 14px "Inter", sans-serif;
  margin-right: 10px;
`;

export const DaysSelectorDiv = styled.div``;

export const ButtonDays7 = styled(Button)`
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  background-color: ${(p) => p.active !== 7 && "gray"};
`;

export const ButtonDays30 = styled(Button)`
  background-color: ${(p) => p.active !== 30 && "gray"};
`;

export const ButtonDays90 = styled(Button)`
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: ${(p) => p.active !== 90 && "gray"};
`;

export const PriceChartSwitch = styled(Switch)`
  & .MuiSwitch-thumb {
    background-color: #4782da;
  }
  & .MuiSwitch-track {
    background-color: gray;
  }
  & .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track {
    background-color: gray;
  }
`;

export const ListPriceSpan = styled.span`
  font-family: "Inter", sans-serif;
  margin-right: 5px;
`;

export const MarketplacePriceSpan = styled.span`
  font-family: "Inter", sans-serif;
  margin-left: 5px;
`;

export const PriceChartSwitchDiv = styled.div`
  float: right;
  margin-bottom: 10px;
`;
