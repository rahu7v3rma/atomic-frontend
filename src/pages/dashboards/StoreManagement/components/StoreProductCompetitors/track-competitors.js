// import { Box, MenuItem, Select, Typography, styled } from "@mui/material";
import { Box, Typography, styled } from "@mui/material";
// import { useCallback, useState } from "react";

// import DatePicker from "../shared/Datepicker";

const TrackCompetitorsContainer = styled(Box)`
  margin-top: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TrackCompetitorsTitle = styled(Typography)`
  font: 600 24px "Inter", sans-serif;
`;

// const ActionsContainer = styled(Box)`
//   display: flex;
//   align-items: center;
// `;

// const MetricsSelect = styled(Select)`
//   height: 41px;
//   color: black;
//   font-weight: 600;
//   font-family: "Inter", sans-serif;
//   border-radius: 10px;
//   margin-left: 10px;
//   &:hover {
//     border-color: black;
//   }
//   .MuiOutlinedInput-notchedOutline {
//     border: 2px solid #c4c4c4;
//   }
//   background-color: white;
// `;

const TrackCompetitors = () => {
  // const [currentMetric, setCurrentMetric] = useState("Keyword");
  // const handleMetricChange = useCallback((event) => {
  //   setCurrentMetric(event.target.value);
  // }, []);
  return (
    <TrackCompetitorsContainer>
      <TrackCompetitorsTitle>Recent Alerts</TrackCompetitorsTitle>
      {/*<ActionsContainer>*/}
      {/*  <DatePicker*/}
      {/*    title={"This Month"}*/}
      {/*    pickerContainerStyle={{ width: "800px", left: "unset" }}*/}
      {/*  />*/}
      {/*  <MetricsSelect value={currentMetric} onChange={handleMetricChange}>*/}
      {/*    <MenuItem selected={true} value="Keyword">*/}
      {/*      Keyword*/}
      {/*    </MenuItem>*/}
      {/*  </MetricsSelect>*/}
      {/*</ActionsContainer>*/}
    </TrackCompetitorsContainer>
  );
};

export default TrackCompetitors;
