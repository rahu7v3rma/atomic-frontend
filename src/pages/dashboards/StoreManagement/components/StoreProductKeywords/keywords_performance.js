import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, { useState } from "react";
import { Line } from "react-chartjs-2";

const labels = [
  ["S", "01"],
  ["S", "02"],
  ["M", "03"],
  ["T", "04"],
  ["W", "05"],
  ["T", "06"],
  ["F", "07"],
  ["S", "08"],
  ["S", "09"],
  ["M", "10"],
  ["T", "11"],
  ["W", "12"],
  ["T", "13"],
  ["F", "14"],
  ["S", "15"],
  ["S", "16"],
  ["M", "17"],
  ["T", "18"],
  ["W", "19"],
  ["T", "20"],
  ["F", "21"],
  ["S", "22"],
  ["S", "23"],
  ["M", "24"],
  ["T", "25"],
  ["W", "26"],
  ["T", "27"],
  ["F", "28"],
  ["S", "29"],
  ["S", "30"],
  ["M", "31"],
];
const actualData = [
  2451, 2474, 5988, 10116, 10214, 1722, 6897, 4172, 380, 7659, 2741, 1188, 6012,
  3027, 11051, 2896, 10249, 605, 9298, 7192, 7212, 11454, 293, 5096, 4691, 404,
  5655, 459, 9313, 1796, 8066,
];
// const forecastData = [
//   11399, 3439, 10635, 4267, 6304, 4275, 233, 2186, 1971, 8390, 7669, 7562, 4903,
//   6804, 8407, 7653, 917, 4234, 7867, 4065, 722, 10095, 1691, 6337, 8122, 8088,
//   27, 8896, 10889, 5147, 8821,
// ];
const goalData = [
  43710, 22399, 28040, 33015, 68504, 10286, 15650, 8878, 39325, 68217, 78723,
  69610, 73202, 79861, 45481, 3957, 46834, 38512, 5587, 65721, 8329, 9743,
  61070, 63521, 62933, 30036, 24062, 13745, 33050, 52925, 13279,
];
// const dates = [
//   "2022-09-30T18:30:00.000Z",
//   "2022-10-01T18:30:00.000Z",
//   "2022-10-02T18:30:00.000Z",
//   "2022-10-03T18:30:00.000Z",
//   "2022-10-04T18:30:00.000Z",
//   "2022-10-05T18:30:00.000Z",
//   "2022-10-06T18:30:00.000Z",
//   "2022-10-07T18:30:00.000Z",
//   "2022-10-08T18:30:00.000Z",
//   "2022-10-09T18:30:00.000Z",
//   "2022-10-10T18:30:00.000Z",
//   "2022-10-11T18:30:00.000Z",
//   "2022-10-12T18:30:00.000Z",
//   "2022-10-13T18:30:00.000Z",
//   "2022-10-14T18:30:00.000Z",
//   "2022-10-15T18:30:00.000Z",
//   "2022-10-16T18:30:00.000Z",
//   "2022-10-17T18:30:00.000Z",
//   "2022-10-18T18:30:00.000Z",
//   "2022-10-19T18:30:00.000Z",
//   "2022-10-20T18:30:00.000Z",
//   "2022-10-21T18:30:00.000Z",
//   "2022-10-22T18:30:00.000Z",
//   "2022-10-23T18:30:00.000Z",
//   "2022-10-24T18:30:00.000Z",
//   "2022-10-25T18:30:00.000Z",
//   "2022-10-26T18:30:00.000Z",
//   "2022-10-27T18:30:00.000Z",
//   "2022-10-28T18:30:00.000Z",
//   "2022-10-29T18:30:00.000Z",
//   "2022-10-30T18:30:00.000Z",
// ];

const KeywordsPerformance = () => {
  //   const colors = dates.map((el) =>
  //     el.toDateString() === new Date().toDateString() ? "white" : "black"
  //   );
  //   const backdropColors = dates.map((el) =>
  //     el.toDateString() === new Date().toDateString() ? "red" : "white"
  //   );

  //   const showBackdrop = dates.map((el) =>
  //     el.toDateString() === new Date().toDateString() ? true : false
  //   );
  const [store, setStore] = useState(1);
  const [purchase, setPurchase] = useState(1);
  const [ctr, setCtr] = useState(1);

  const handleStoreChange = (event) => {
    setStore(event.target.value);
  };

  const purchases = [
    {
      value: 1,
      label: "Purchases",
    },
    {
      value: 2,
      label: "store1",
    },
  ];
  const CtrData = [
    {
      value: 1,
      label: "CTR",
    },
    {
      value: 2,
      label: "store1",
    },
  ];
  const keywords = [
    {
      value: 1,
      label: "All keywords",
    },
    {
      value: 2,
      label: "store1",
    },
  ];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "CTR",
        yAxisID: "y1",
        backgroundColor: "#0891B2",
        borderWidth: 2,
        borderColor: "#0891B2",
        data: actualData,
        borderRadius: 20,
        order: 2,
        borderDash: [5, 2],
      },

      {
        type: "line",
        label: "Purchase",
        yAxisID: "y2",
        backgroundColor: "#EC4899",
        borderColor: "#EC4899",
        borderWidth: 2,
        borderRadius: 20,
        data: goalData,
        order: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: "gray",
          backdropColor: "white",
          showLabelBackdrop: "red",
          backdropPadding: 10,
          padding: 20,
          font: {
            size: 14,
            family: "'Georgia', 'serif'",
          },
        },
        grid: { display: false },
      },
      y1: {
        position: "left",
        id: "y-axis-1",
        ticks: {
          callback: function (label, _index, _labels) {
            return "$" + label / 1000 + "k";
          },
        },
      },
      y2: {
        position: "right",
        id: "y-axis-2",
        ticks: {
          callback: function (label, _index, _labels) {
            return label / 10000 + "%";
          },
        },
        grid: { display: false },
      },
    },
  };

  const useStyles = makeStyles({
    styleRangeButton: {
      justifyContent: "end",
    },
    selectStoreStyle: {
      borderRadius: "10px",
      height: "40px",
      fontWeight: "bold",
      marginTop: "4px",
      "& fieldset": {
        borderWidth: "2px",
      },
    },
    gridStyle: {
      marginTop: "20px",
      marginBottom: "40px",
    },
    performanceStyle: {
      marginRight: "40px",
    },
  });

  const classes = useStyles();
  return (
    <>
      <Box
        sx={{
          padding: "20px 24px",
          width: "100%",
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          marginTop: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className="chart-top"
        >
          <Typography
            sx={{
              fontSize: "16px",
              lineHeight: "24px",
              color: "#0F172A",
              fontWeight: "600",
            }}
          >
            Keywords Performance
          </Typography>
          <Box className="keywords-dropdown">
            <Select
              className={classes.selectStoreStyle}
              //   labelId="store-to-select-label"
              //   id="store-to-select"
              placeholder="235"
              onChange={handleStoreChange}
              value={store}
            >
              {keywords.map((option, index) => (
                <MenuItem
                  key={`${option.value} + ${index}`}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "24px 0",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontStyle: "normal",
                fontWeight: "400",
                fontSize: "14px",
                lineHeight: "24px",
                color: "#64748B",
              }}
            >
              Mon, Oct 1 – Tue, Oct 30
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginRight: "24px",
              }}
            >
              <Typography
                variant="span"
                sx={{
                  display: "block",
                  width: "16px",
                  height: "8px",
                  backgroundColor: "#EC4899",
                  borderRadius: "2px",
                }}
              />{" "}
              <Typography
                sx={{
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: "14px",
                  lineHeight: "24px",
                  color: "#475569",
                  marginLeft: "8px",
                }}
              >
                Purchases
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="span"
                sx={{
                  display: "block",
                  width: "20px",
                  height: "4px",
                  border: "4px dotted #0891B2",
                }}
              />
              <Typography
                sx={{
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: "14px",
                  lineHeight: "24px",
                  color: "#475569",
                  marginLeft: "8px",
                }}
              >
                CTR
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "24px",
          }}
        >
          <Box>
            <Select
              className={classes.selectStoreStyle}
              labelId="store-to-select-label"
              id="store-to-select"
              placeholder="235"
              value={purchase}
              onChange={(e) => setPurchase(e.target.value)}
            >
              {purchases.map((option, index) => (
                <MenuItem
                  key={`${option.value} + ${index}`}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box>
            <Select
              className={classes.selectStoreStyle}
              labelId="store-to-select-label"
              id="store-to-select"
              placeholder="235"
              value={ctr}
              onChange={(e) => setCtr(e.target.value)}
            >
              {CtrData.map((option, index) => (
                <MenuItem
                  key={`${option.value} + ${index}`}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
        <Box>
          <Line type="line" options={options} data={data} />
        </Box>
      </Box>
    </>
  );
};

export default KeywordsPerformance;
