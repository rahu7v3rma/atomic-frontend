import { makeStyles } from "@material-ui/core/styles";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
} from "@mui/material";
import moment from "moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import {
  fetchKeywordsReports,
  keywordsSelector,
} from "../../../../../redux/slices/keywords";
import LoaderDiv from "../../../../components/LoaderDiv";
import SummaryCard from "../StoreAnalysis/SummaryCard";
import s from "../StoreProductDetails/Analytics/styles";
import DatePicker from "../shared/DatePicker";

import KeywordsSalesChart from "./keywords_sales_chart";

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
    backgroundColor: "white",
  },
  gridStyle: {
    flex: "1",
    marginTop: "20px",
    marginBottom: "40px",
    width: "100%",
    // paddingRight: "40px",
  },
  gridContainer: {
    flex: "1",
    // marginTop: "20px",
    // marginBottom: "40px",
    // width: "100%",
    // paddingRight: "40px",
  },
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
  typographyStyle: {
    minWidth: "200px",
    fontFamily: "Inter",
    marginTop: "auto",
    marginBottom: "auto",
  },
  settingsPaperStyle: {
    width: "40px",
    height: "40px",
    marginTop: "auto",
    marginBottom: "auto",
    borderRadius: "10px",
    marginLeft: "4px",
    border: "solid",
    borderWidth: "2px",
    borderColor: "#CBD5E1",
    display: "flex",
    justifyContent: "center",
    "&:hover, &:focus": {
      borderColor: "black",
    },
  },
  settingsIconStyle: {
    marginTop: "auto",
    marginBottom: "auto",
    width: "25px",
    height: "25px",
    color: "#64748B",
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
});

function KeywordsBarchart() {
  const dispatch = useDispatch();
  const { keywordsData, keywordsLoading, keywordsErrorMessage } =
    useSelector(keywordsSelector);
  const [cardsDates, setCardsDates] = React.useState({
    startDate: moment().subtract(6, "d").format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
    comparedStartDate: null,
    comparedEndDate: null,
  });
  const [isValidDateRange, setIsValidDateRange] = React.useState(true);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = React.useState(false);
  const [searchParams] = useSearchParams();
  const selectedSku = searchParams.get("sku")
    ? searchParams.get("sku")
    : "select";
  const selectedStore = searchParams.get("store")
    ? searchParams.get("store")
    : "all";
  //chart data

  const handleCloseDialog = () => {
    setIsAlertDialogOpen(false);
  };

  const onDatesSelected = (
    startDate,
    endDate,
    comparedStartDate,
    comparedEndDate
  ) => {
    const startDateAsMoment = moment(startDate);
    const endDateAsMoment = moment(endDate);
    const startAndEndDateDiff =
      Math.abs(startDateAsMoment.diff(endDateAsMoment, "d")) + 1;
    let isValid =
      !isNaN(startAndEndDateDiff) &&
      startAndEndDateDiff % 7 === 0 &&
      startAndEndDateDiff > 0;
    isValid = isValid && startDateAsMoment.toDate().getDay() === 0;
    if (comparedStartDate && comparedEndDate) {
      const comparedStartDateAsMoment = moment(comparedStartDate);
      const comparedEndDateAsMoment = moment(comparedEndDate);
      const compareStartAndEndDateDiff =
        Math.abs(comparedStartDateAsMoment.diff(comparedEndDateAsMoment, "d")) +
        1;
      isValid =
        isValid &&
        !isNaN(compareStartAndEndDateDiff) &&
        compareStartAndEndDateDiff % 7 === 0 &&
        compareStartAndEndDateDiff > 0;
      isValid = isValid && comparedStartDateAsMoment.toDate().getDay() === 0;
    }
    if (isValid) {
      setIsValidDateRange(true);
      setCardsDates({
        startDate,
        endDate,
        comparedStartDate,
        comparedEndDate,
      });
    } else {
      setIsValidDateRange(false);
      setIsAlertDialogOpen(true);
    }
  };

  React.useEffect(() => {
    if (cardsDates?.startDate && cardsDates?.endDate && isValidDateRange) {
      dispatch(
        fetchKeywordsReports(
          selectedStore,
          selectedSku,
          moment(cardsDates.startDate).format("YYYY-MM-DD"),
          moment(cardsDates.endDate).format("YYYY-MM-DD"),
          moment(cardsDates?.comparedStartDate).format("YYYY-MM-DD"),
          moment(cardsDates?.comparedEndDate).format("YYYY-MM-DD")
        )
      );
    }
  }, [cardsDates, dispatch, selectedStore, selectedSku, isValidDateRange]);
  const classes = useStyles();
  return (
    <React.Fragment>
      <Dialog open={isAlertDialogOpen} onClose={handleCloseDialog}>
        <DialogContent>
          The selected time frame won't be picked. You need to choose full
          week/weeks from Sunday to Saturday
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCloseDialog}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Grid container spacing={0}>
        <Grid item xs={2} style={{ display: "flex" }}>
          <Typography
            sx={{ ...s.inter({ s: 24, w: 600, c: "#0F172A" }) }}
            data-testid="heading"
          >
            {"Keywords & Metrics"}
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <DatePicker
            onDatesSelected={onDatesSelected}
            defaultDates={cardsDates}
            warningMessage={"Choose full week/weeks from Sunday to Saturday"}
          />
        </Grid>
      </Grid>
      {keywordsErrorMessage && (
        <Alert mt={2} mb={3} severity="warning">
          {keywordsErrorMessage}
        </Alert>
      )}
      {keywordsLoading ? (
        <LoaderDiv />
      ) : (
        <Grid className={classes.gridStyle} container spacing={4}>
          <Grid item className={classes.gridContainer}>
            <SummaryCard
              title="Impressions"
              value={keywordsData?.impressions?.current.toLocaleString() || "0"}
              percentage={
                keywordsData?.impressions?.comparison.toString() || "0"
              }
              subTitleOne="Click Share(Top 3)"
              totalValueOne={`${
                keywordsData?.impressions?.click_share || "0"
              }%`}
              subTitleTwo="Click Share Compariso"
              totalValueTwo={`${
                keywordsData?.impressions?.click_share_comparison || "0"
              }%`}
            />
          </Grid>

          <Grid item className={classes.gridContainer}>
            <SummaryCard
              title="Total Clicks"
              value={
                keywordsData?.total_clicks?.current.toLocaleString() || "0"
              }
              percentage={
                keywordsData?.total_clicks?.comparison.toString() || "0"
              }
              subTitleOne="Sponsored Clicks"
              totalValueOne={`${
                keywordsData?.total_clicks?.sponsored_clicks || "0"
              }`}
              subTitleTwo="Avg.CPC"
              totalValueTwo={`${keywordsData?.total_clicks?.avg_cpc || "0"}`}
            />
          </Grid>

          <Grid item className={classes.gridContainer}>
            <SummaryCard
              title="Add To Cart"
              value={`${
                keywordsData?.add_to_cart?.current.toLocaleString() || "0"
              }`}
              percentage={
                keywordsData?.add_to_cart?.comparison.toString() || "0"
              }
              subTitleOne="Weighted Position (Top 3)"
              totalValueOne={`${
                keywordsData?.add_to_cart?.weighted_position || "0"
              }`}
              subTitleTwo="Weighted Position comparison (Top 3)"
              totalValueTwo={`${
                keywordsData?.add_to_cart?.weighted_position_comparison || "0"
              }`}
            />
          </Grid>
          <Grid item className={classes.gridContainer}>
            <SummaryCard
              title="Purchases"
              value={`${
                keywordsData?.purchases?.current.toLocaleString() || "0"
              }`}
              percentage={keywordsData?.purchases?.comparison.toString() || "0"}
              subTitleOne="CTR"
              totalValueOne={keywordsData?.purchases?.ctr.toString() || "0"}
              subTitleTwo="CVR"
              totalValueTwo={`${
                keywordsData?.purchases?.cvr.toString() || "0"
              }%`}
            />
          </Grid>
        </Grid>
      )}
      <KeywordsSalesChart
        cardsDates={cardsDates}
        isValidDateRange={isValidDateRange}
      />
    </React.Fragment>
  );
}

export default KeywordsBarchart;
