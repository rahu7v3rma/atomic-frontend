import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { ButtonGroup, CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Collapse from "@mui/material/Collapse";
import { useState } from "react";
import { Line } from "react-chartjs-2";

import { options } from "./helpers";
import {
  ButtonDays30,
  ButtonDays7,
  ButtonDays90,
  DaysSelectorDiv,
  DaysSpan,
  ListPriceSpan,
  MarketplacePriceSpan,
  PriceChartSwitch,
  PriceChartSwitchDiv,
} from "./styles";

export const ChartCard = ({ title, data, open, setOpen }) => (
  <Card>
    <CardActionArea onClick={() => setOpen(!open)}>
      <CardHeader
        title={title}
        action={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      />
    </CardActionArea>
    <Collapse in={open}>
      <CardContent>
        <Line options={options} data={data} height={90} />
      </CardContent>
    </Collapse>
  </Card>
);

export const PriceChartCard = ({ listPriceData, marketplacePriceData }) => {
  const [open, setOpen] = useState(false);
  const [switchCheck, setSwitchCheck] = useState(false);
  const handleSwitch = () => setSwitchCheck(!switchCheck);
  return (
    <Card>
      <CardActionArea onClick={() => setOpen(!open)}>
        <CardHeader
          title="Price"
          action={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        />
      </CardActionArea>
      <Collapse in={open}>
        <CardContent>
          <PriceChartSwitchDiv>
            <ListPriceSpan>List Price</ListPriceSpan>
            <PriceChartSwitch
              checked={switchCheck}
              onChange={handleSwitch}
              inputProps={{ "aria-label": "controlled" }}
              color="secondary"
            />
            <MarketplacePriceSpan>Marketplace Price</MarketplacePriceSpan>
          </PriceChartSwitchDiv>
          <Line
            options={options}
            data={switchCheck ? marketplacePriceData : listPriceData}
            height={90}
          />
        </CardContent>
      </Collapse>
    </Card>
  );
};

export const DaysSelector = ({ active, setActive }) => (
  <DaysSelectorDiv>
    <DaysSpan>Days</DaysSpan>
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <ButtonDays7 onClick={() => setActive(7)} active={active}>
        7
      </ButtonDays7>
      <ButtonDays30 onClick={() => setActive(30)} active={active}>
        30
      </ButtonDays30>
      <ButtonDays90 onClick={() => setActive(90)} active={active}>
        90
      </ButtonDays90>
    </ButtonGroup>
  </DaysSelectorDiv>
);
