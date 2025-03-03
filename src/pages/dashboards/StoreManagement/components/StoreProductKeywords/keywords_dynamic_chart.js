import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";

import ChartKeywords from "./Chart";

const useStyles = makeStyles({
  performanceStyle: {
    // marginRight: "40px",
    "& canvas": {
      maxHeight: "400px",
    },
  },
  chartWrapper: {
    maxWidth: "100%",
    overflowX: "scroll",
  },
  spanStyle: {
    width: "16px",
    height: "4px",
    marginTop: "auto",
    marginBottom: "auto",
    marginRight: "8px",
    marginLeft: "8px",
    borderRadius: "10px",
  },
  textStyle: {
    color: "#64748B",
  },
  xlabelStyle: {
    width: `${window.innerWidth * 0.7}px`,
    display: "flex",
    justifyContent: "center",
    fontFamily: "Inter",
  },
  searchVolumeStyle: {
    display: "flex",
  },
});

function KeywordsDynamicChart({
  dates,
  keywords,
  data_type,
  data1,
  data2,
  data3 = [],
  cpc = [],
  cost = [],
  cpc2 = [],
  cost2 = [],
}) {
  const [hideVolume, setHideVolume] = useState(false);
  const classes = useStyles();
  return (
    <React.Fragment>
      <div style={{ display: "flex" }}>
        <p className={classes.textStyle}>
          {dates[0].toDateString()} - {dates[1].toDateString()}
        </p>
        <div style={{ display: "flex", marginLeft: "auto" }}>
          <span
            className={classes.spanStyle}
            style={{ backgroundColor: "#6D28D9" }}
          />
          <p className={classes.textStyle}>This period</p>
          <span
            className={classes.spanStyle}
            style={{ backgroundColor: "#C4B5FD" }}
          />
          <p className={classes.textStyle}>Compared period</p>
          {data_type === "keyword_sales" && (
            <div
              className={classes.searchVolumeStyle}
              onClick={() => {
                setHideVolume(!hideVolume);
              }}
            >
              <span
                className={classes.spanStyle}
                style={{ backgroundColor: !hideVolume ? "#5EBA7D" : "#447958" }}
              />
              <p className={classes.textStyle}>Search volume</p>
            </div>
          )}
        </div>
      </div>
      <p>{data_type === "keyword_sales" ? "Sales" : "Clicks"}</p>
      <div className={classes.chartWrapper}>
        <div
          className={classes.performanceStyle}
          style={{ width: `${90 * keywords.length}px`, minWidth: "100%" }}
        >
          <ChartKeywords
            dates={dates}
            keywords={keywords}
            data1={data1}
            data2={data2}
            data3={data3}
            cpc={cpc}
            cost={cost}
            cpc2={cpc2}
            cost2={cost2}
            data_type={data_type}
            hide_volume={hideVolume}
          />
        </div>
      </div>
      <div className={classes.xlabelStyle}>
        <p>Keywords</p>
      </div>
    </React.Fragment>
  );
}

export default KeywordsDynamicChart;
