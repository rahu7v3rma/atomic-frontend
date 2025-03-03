import DateFnsUtils from "@date-io/date-fns";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { CalendarPicker, PickersDay } from "@mui/x-date-pickers";
import moment from "moment";
import React, { useEffect, useReducer, useState } from "react";

import { compareToValues, dateRanges } from "../../constants";

const useStyles = makeStyles({
  dayContainer: {
    background: "white",
    color: "black",
  },
  daySelectedContainer: {
    "& .MuiPickersDay-day": {
      color: "#fff",
      fontWeight: 500,
      backgroundColor: "#3f51b5",
    },
  },
  daySelectedContainer2: {
    borderRadius: 0,
  },
  daySelectedContainer3: {
    borderRadius: "5rem 0 0 5rem",
  },
  daySelectedContainer4: {
    color: "#fff",
    backgroundColor: "#33ccff",
    borderRadius: 0,
  },
  daySelectedContainer5: {
    borderRadius: "0 5rem 5rem 0",
  },
  calendarContainer: {
    width: "100%",
  },
  rangeContainer: {
    display: "flex",
  },
  formContainer: {
    marginBottom: "20px",
  },
  formCheckBox: {
    marginTop: "20px",
    marginLeft: "20px",
    marginBottom: "20px",
  },
  pContainer: {
    marginTop: "auto",
    marginBottom: "auto",
    fontWeight: "bold",
  },
  analyticsContainer: {
    display: "flex",
    justifyContent: "end",
  },
  buttonStyle: {
    borderRadius: "8px",
    marginRight: "4px",
  },
  submitStyle: {
    textAlign: "right",
  },
  rangeButtonStyle: {
    borderRadius: "10px",
    height: "40px",
    fontWeight: "bold",
    "& fieldset": {
      borderWidth: "2px",
    },
    backgroundColor: "white",
  },
  TextFieldStyle: {
    "& input": {
      padding: "10px 10px",
      fontSize: window.innerWidth > 1300 ? "small" : "x-small",
    },
  },
  labelStyle: {
    "& label": {
      top: "-8px",
    },
  },
});

function sameDay(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

function getDiffDays(d1, d2) {
  const diffTime = Math.abs(d1 - d2);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

function getFormattedDate(date) {
  if (!date) {
    return "";
  }

  var year = date.getFullYear();

  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : "0" + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : "0" + day;

  return day + "/" + month + "/" + year;
}

function dateSettingReducer(state, action) {
  switch (action.type) {
    case "dateRange": {
      return {
        ...state,
        dateRange: action.dateRange,
      };
    }
    case "compareTo": {
      return {
        ...state,
        compareTo: action.compareTo,
      };
    }
    case "checked": {
      return {
        ...state,
        checked: action.checked,
      };
    }
    default:
      throw new Error("Unknown action: " + action.type);
  }
}

function DatePicker({
  title = "Analytics Range",
  onDatesSelected,
  pickerContainerStyle = {},
  defaultDates = {
    startDate: "",
    endDate: "",
    compareStartDate: "",
    compareEndDate: "",
  },
  warningMessage = "",
  maxDateRange = false,
}) {
  const date = new Date();
  const date2 = new Date();
  const dateNow = new Date();
  date2.setDate(0);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [comparedStartDate, setComparedStartDate] = useState(null);
  const [comparedEndDate, setComparedEndDate] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(date);
  const [selectedDate1, setSelectedDate1] = useState(date2);
  const [month2, setMonth2] = useState(date);
  const [month1, setMonth1] = useState(date2);
  const [dateRange, setDateRange] = useState(5);

  const [state, dispatch] = useReducer(dateSettingReducer, {
    dateRange: 5,
    compareTo: 1,
    checked: false,
  });

  const [compareTo, setCompareTo] = useState(1);
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [activityRange, setActivityRange] = useState(title);
  // const [comparedActivityRange, setComparedActivityRange] = useState("");
  useEffect(() => {
    if (open) {
      if (state.dateRange) setDateRange(state.dateRange);
      if (state.compareTo) setCompareTo(state.compareTo);
      setChecked(state.checked);

      if (defaultDates.startDate && defaultDates.endDate) {
        setSelectedStartDate(
          moment(defaultDates.startDate, "YYYY-MM-DD").toDate()
        );
        setSelectedEndDate(moment(defaultDates.endDate, "YYYY-MM-DD").toDate());
      }
    }
  }, [defaultDates, open, state]);

  useEffect(() => {
    if (selectedStartDate && selectedEndDate) {
      setActivityRange(
        moment(selectedStartDate).format("DD/MM/YYYY") +
          "-" +
          moment(selectedEndDate).format("DD/MM/YYYY")
      );
      if (checked) {
        const diffDays = getDiffDays(selectedEndDate, selectedStartDate);
        const compstart = new Date(selectedStartDate);
        const compend = new Date(selectedEndDate);
        if (compareTo === 1) {
          compstart.setDate(compstart.getDate() - diffDays - 1);
          compend.setDate(compend.getDate() - diffDays - 1);
        } else {
          compstart.setFullYear(compstart.getFullYear() - 1);
          compend.setFullYear(compend.getFullYear() - 1);
        }
        setComparedStartDate(compstart);
        setComparedEndDate(compend);
      } else {
        setComparedStartDate(null);
        setComparedEndDate(null);
        // setComparedActivityRange("");
      }
    } else {
      // defaultDates generates a render error
      //setActivityRange(
      //  defaultDates.startDate && defaultDates.endDate
      //    ? `${defaultDates.startDate} - ${defaultDates.endDate}`
      //    : title
      //);
      setComparedStartDate(null);
      setComparedEndDate(null);
      // setComparedActivityRange("");
    }
  }, [title, selectedStartDate, selectedEndDate, checked, compareTo]);

  // useEffect(() => {
  //   if (comparedStartDate && comparedEndDate) {
  //     setComparedActivityRange(
  //       `${comparedStartDate
  //         .toString()
  //         .toString()
  //         .split(" ")
  //         .slice(1, 4)
  //         .join(" ")}-${comparedEndDate
  //         .toString()
  //         .toString()
  //         .split(" ")
  //         .slice(1, 4)
  //         .join(" ")}`
  //     );
  //   }
  // }, [comparedStartDate, comparedEndDate]);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    // setOpen(false);
  };

  const styles = {
    position: "absolute",
    top: 60,
    right: 0,
    left: -600,
    zIndex: 1,
    p: 1,
    bgcolor: "background.paper",
  };

  const handleSelectedDate1Change = (date) => {
    const new_date = new Date(date.toDateString());
    setSelectedDate1(new_date);

    if (selectedStartDate && selectedEndDate) {
      setSelectedStartDate(new_date);
      setSelectedEndDate(null);
      return;
    }

    if (!selectedStartDate || new_date < selectedStartDate) {
      setSelectedStartDate(new_date);
    } else {
      setSelectedEndDate(new_date);
    }
  };
  const handleSelectedDate2Change = (date) => {
    const new_date = new Date(date.toDateString());
    setSelectedDate2(new_date);

    if (selectedStartDate && selectedEndDate) {
      setSelectedStartDate(new_date);
      setSelectedEndDate(null);
      return;
    }

    if (!selectedStartDate || new_date < selectedStartDate) {
      setSelectedStartDate(new_date);
    } else {
      setSelectedEndDate(new_date);
    }
  };

  const classes = useStyles({ dateRange });

  const renderDayInPicker = (date) => {
    if (selectedStartDate) {
      if (!selectedEndDate) {
        if (sameDay(selectedStartDate, date)) {
          return (
            <PickersDay
              key={date.toString()}
              day={date}
              outsideCurrentMonth={date.getMonth() !== month1.getMonth()}
              onDaySelect={handleSelectedDate1Change}
              selected={true}
              disableMargin={true}
              disabled={dateNow <= date || dateRange !== 1}
            />
          );
        } else {
          return (
            <PickersDay
              key={date.toString()}
              day={date}
              outsideCurrentMonth={date.getMonth() !== month1.getMonth()}
              onDaySelect={handleSelectedDate1Change}
              disabled={
                dateNow <= date ||
                dateRange !== 1 ||
                (maxDateRange &&
                  date > moment(selectedStartDate).add(30, "days").toDate())
              }
            />
          );
        }
      } else {
        if (sameDay(selectedStartDate, date)) {
          if (sameDay(selectedStartDate, selectedEndDate)) {
            return (
              <PickersDay
                key={date.toString()}
                day={date}
                outsideCurrentMonth={date.getMonth() !== month1.getMonth()}
                onDaySelect={handleSelectedDate1Change}
                selected={true}
                disableMargin={true}
                className={classes.daySelectedContainer2}
                disabled={dateNow <= date || dateRange !== 1}
              />
            );
          } else {
            return (
              <PickersDay
                key={date.toString()}
                day={date}
                outsideCurrentMonth={date.getMonth() !== month1.getMonth()}
                onDaySelect={handleSelectedDate1Change}
                selected={true}
                disableMargin={true}
                className={classes.daySelectedContainer3}
                disabled={dateNow <= date || dateRange !== 1}
              />
            );
          }
        } else if (date > selectedStartDate && date < selectedEndDate) {
          return (
            <PickersDay
              key={date.toString()}
              day={date}
              outsideCurrentMonth={date.getMonth() !== month1.getMonth()}
              onDaySelect={handleSelectedDate1Change}
              disableMargin={true}
              className={classes.daySelectedContainer4}
              disabled={dateNow <= date || dateRange !== 1}
            />
          );
        } else if (sameDay(date, selectedEndDate)) {
          return (
            <PickersDay
              key={date.toString()}
              day={date}
              outsideCurrentMonth={date.getMonth() !== month1.getMonth()}
              onDaySelect={handleSelectedDate1Change}
              disableMargin={true}
              selected={true}
              className={classes.daySelectedContainer5}
              disabled={dateNow <= date || dateRange !== 1}
            />
          );
        }
      }
    }
    return (
      <PickersDay
        key={date.toString()}
        day={date}
        outsideCurrentMonth={date.getMonth() !== month1.getMonth()}
        onDaySelect={handleSelectedDate1Change}
        disabled={dateNow <= date || dateRange !== 1}
      />
    );
  };

  const renderDayInPicker2 = (date) => {
    if (selectedStartDate) {
      if (!selectedEndDate) {
        if (sameDay(selectedStartDate, date)) {
          return (
            <PickersDay
              key={date.toString()}
              day={date}
              outsideCurrentMonth={date.getMonth() !== month2.getMonth()}
              onDaySelect={handleSelectedDate2Change}
              selected={true}
              disableMargin={true}
              disabled={dateNow <= date || dateRange !== 1}
            />
          );
        } else {
          return (
            <PickersDay
              key={date.toString()}
              day={date}
              outsideCurrentMonth={date.getMonth() !== month2.getMonth()}
              onDaySelect={handleSelectedDate2Change}
              disabled={
                dateNow <= date ||
                dateRange !== 1 ||
                (maxDateRange &&
                  date > moment(selectedStartDate).add(30, "days").toDate())
              }
            />
          );
        }
      } else {
        if (sameDay(selectedStartDate, date)) {
          if (sameDay(selectedStartDate, selectedEndDate)) {
            return (
              <PickersDay
                key={date.toString()}
                day={date}
                outsideCurrentMonth={date.getMonth() !== month2.getMonth()}
                onDaySelect={handleSelectedDate2Change}
                selected={true}
                disableMargin={true}
                className={classes.daySelectedContainer2}
                disabled={dateNow <= date || dateRange !== 1}
              />
            );
          } else {
            return (
              <PickersDay
                key={date.toString()}
                day={date}
                outsideCurrentMonth={date.getMonth() !== month2.getMonth()}
                onDaySelect={handleSelectedDate2Change}
                selected={true}
                disableMargin={true}
                className={classes.daySelectedContainer3}
                disabled={dateNow <= date || dateRange !== 1}
              />
            );
          }
        } else if (date > selectedStartDate && date < selectedEndDate) {
          return (
            <PickersDay
              key={date.toString()}
              day={date}
              outsideCurrentMonth={date.getMonth() !== month2.getMonth()}
              onDaySelect={handleSelectedDate2Change}
              disableMargin={true}
              className={classes.daySelectedContainer4}
              disabled={dateNow <= date || dateRange !== 1}
            />
          );
        } else if (sameDay(date, selectedEndDate)) {
          return (
            <PickersDay
              key={date.toString()}
              day={date}
              outsideCurrentMonth={date.getMonth() !== month2.getMonth()}
              onDaySelect={handleSelectedDate2Change}
              disableMargin={true}
              selected={true}
              className={classes.daySelectedContainer5}
              disabled={dateNow <= date || dateRange !== 1}
            />
          );
        }
      }
    }
    return (
      <PickersDay
        key={date.toString()}
        day={date}
        outsideCurrentMonth={date.getMonth() !== month2.getMonth()}
        onDaySelect={handleSelectedDate2Change}
        disabled={dateNow <= date || dateRange !== 1}
      />
    );
  };

  const handleStartingEndingValue = (e) => {
    const endDate = new Date(new Date(e.target.value).toDateString());
    setSelectedEndDate(endDate);
  };

  const [monthsChangeEffect, setMonthsChangeEffect] = useState(false);

  const handleMonthChange = (date) => {
    setMonth1(date);
    let date_cp = new Date(date.getTime());
    date_cp.setMonth(date_cp.getMonth() + 1);
    if (dateRange === 1) {
      setSelectedDate2(date_cp);
    }
  };

  const handleMonthChange2 = (date) => {
    setMonth2(date);
    let date_cp = new Date(date.getTime());
    date_cp.setMonth(date_cp.getMonth() - 1);
    if (dateRange === 1) {
      setSelectedDate1(date_cp);
    }
  };

  const handleDateRangeChange = (event) => {
    setMonthsChangeEffect(false);

    const today = new Date(new Date().toDateString());
    const day_last_month = new Date(new Date().toDateString());
    const day_last_year = new Date(new Date().toDateString());
    const last_seven_days = new Date(new Date().toDateString());
    const last_seven_days_last_month = new Date(new Date().toDateString());
    const last_fourteen_days = new Date(new Date().toDateString());
    const last_fourteen_days_last_month = new Date(new Date().toDateString());
    const last_ninety_days = new Date(new Date().toDateString());
    // const last_month = new Date(moment().subtract(1, "month"));

    day_last_month.setDate(day_last_month.getDate() - 30);
    day_last_year.setFullYear(day_last_year.getFullYear() - 1);
    last_seven_days.setDate(last_seven_days.getDate() - 6);
    last_seven_days_last_month.setDate(last_seven_days.getDate() - 36);
    last_fourteen_days.setDate(last_fourteen_days.getDate() - 13);
    last_fourteen_days_last_month.setDate(last_fourteen_days.getDate() - 43);
    last_ninety_days.setMonth(last_ninety_days.getMonth() - 3);
    setDateRange(event.target.value);
    switch (event.target.value) {
      case 1:
        break;
      case 2:
        setSelectedStartDate(today);
        setSelectedEndDate(today);
        setSelectedDate2(today);
        setSelectedDate1(day_last_month);
        break;
      case 3:
        setSelectedStartDate(day_last_month);
        setSelectedEndDate(today);
        setSelectedDate1(day_last_month);
        setSelectedDate2(today);
        break;
      case 4:
        setSelectedStartDate(day_last_year);
        setSelectedEndDate(today);
        setSelectedDate1(day_last_year);
        setSelectedDate2(today);
        break;
      case 5:
        setSelectedStartDate(last_seven_days);
        setSelectedEndDate(today);
        setSelectedDate1(last_seven_days_last_month);
        setSelectedDate2(today);
        break;
      case 6:
        setSelectedStartDate(last_fourteen_days);
        setSelectedEndDate(today);
        setSelectedDate1(last_fourteen_days_last_month);
        setSelectedDate2(today);
        break;
      case 7:
        setSelectedStartDate(last_ninety_days);
        setSelectedEndDate(today);
        setSelectedDate1(last_ninety_days);
        setSelectedDate2(today);
        break;
      default:
        setSelectedStartDate(null);
        setSelectedEndDate(null);
    }
  };

  const handleChangeCheck = (event) => {
    setChecked(event.target.checked);
  };

  const handleCompareToChange = (event) => {
    setCompareTo(event.target.value);
  };

  const handleCancel = () => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    setOpen(false);
  };

  const handleApply = () => {
    setOpen(false);

    dispatch({
      type: "dateRange",
      dateRange: dateRange,
    });
    dispatch({
      type: "compareTo",
      compareTo: compareTo,
    });
    dispatch({
      type: "checked",
      checked: checked,
    });

    onDatesSelected(
      selectedStartDate,
      selectedEndDate,
      comparedStartDate,
      comparedEndDate
    );
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ position: "relative" }}>
        <div className={classes.analyticsContainer}>
          <FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
            <OutlinedInput
              id="outlined-date-analytics"
              value={activityRange}
              onClick={handleClick}
              inputProps={{
                type: "button",
              }}
              className={classes.rangeButtonStyle}
              startAdornment={
                <InputAdornment position="start">
                  <CalendarTodayIcon />
                </InputAdornment>
              }
            />
          </FormControl>
          <p className={classes.pContainer}>
            {checked && comparedStartDate && comparedEndDate
              ? `compared to ${moment(comparedStartDate).format(
                  "DD/MM/YYYY"
                )}-${moment(comparedEndDate).format("DD/MM/YYYY")}`
              : null}
          </p>
        </div>
        {open ? (
          <Box sx={{ ...styles, ...pickerContainerStyle }}>
            {warningMessage && (
              <Alert mt={2} mb={3} severity="warning">
                {warningMessage}
              </Alert>
            )}
            <Grid container spacing={0.5}>
              <Grid key="grid1" item xs={4.5}>
                <MuiPickersUtilsProvider key="start-date" utils={DateFnsUtils}>
                  <Paper style={{ overflow: "hidden" }}>
                    <CalendarPicker
                      className={classes.calendarContainer}
                      rightArrowButtonProps={{
                        disabled: true,
                        style: { display: "none" },
                      }}
                      date={selectedDate1}
                      onChange={handleSelectedDate1Change}
                      onMonthChange={
                        monthsChangeEffect
                          ? handleMonthChange
                          : (date) => setMonth1(date)
                      }
                      views={["day"]}
                      renderDay={renderDayInPicker}
                    />
                  </Paper>
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid key="grid2" item xs={4.5}>
                <MuiPickersUtilsProvider key="end-date" utils={DateFnsUtils}>
                  <Paper style={{ overflow: "hidden" }}>
                    <CalendarPicker
                      className={classes.calendarContainer}
                      leftArrowButtonProps={{
                        disabled: true,
                        style: { display: "none" },
                      }}
                      date={selectedDate2}
                      onChange={handleSelectedDate2Change}
                      onMonthChange={
                        monthsChangeEffect
                          ? handleMonthChange2
                          : (date) => setMonth2(date)
                      }
                      views={["day"]}
                      renderDay={renderDayInPicker2}
                    />
                  </Paper>
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid key="grid3" item xs={3}>
                <FormControl className={classes.formContainer} fullWidth>
                  <InputLabel id="date-range-input-label">
                    Date Range
                  </InputLabel>
                  <Select
                    labelId="date-range-select-label"
                    id="date-range-select"
                    value={dateRange}
                    label="Date range"
                    onChange={handleDateRangeChange}
                  >
                    {dateRanges.map((option) => (
                      <MenuItem
                        key={option.value}
                        value={option.value}
                        className={classes.rangeContainer}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Grid container spacing={2}>
                  <Grid item className={classes.labelStyle} xs={6}>
                    <TextField
                      id="starting-input"
                      label={"Starting"}
                      value={getFormattedDate(selectedStartDate)}
                      className={classes.TextFieldStyle}
                      onChange={(e) =>
                        handleStartingEndingValue(e, "startDate")
                      }
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item className={classes.labelStyle} xs={6}>
                    <TextField
                      id="ending-input"
                      label="Ending"
                      value={getFormattedDate(selectedEndDate)}
                      className={classes.TextFieldStyle}
                      onChange={(e) => handleStartingEndingValue(e, "endDate")}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                </Grid>
                <FormGroup>
                  <FormControlLabel
                    className={classes.formCheckBox}
                    control={<Checkbox checked={checked} />}
                    label="Compare to previous dates"
                    onChange={handleChangeCheck}
                  />
                </FormGroup>
                <FormControl className={classes.formContainer} fullWidth>
                  <InputLabel id="compare-to-input-label">
                    Compare to
                  </InputLabel>
                  <Select
                    labelId="compare-to-select-label"
                    id="compare-to-select"
                    value={compareTo}
                    label="Compare to"
                    onChange={handleCompareToChange}
                  >
                    {compareToValues.map((option) => (
                      <MenuItem
                        key={option.value}
                        value={option.value}
                        className={classes.rangeContainer}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Grid container spacing={0.5}>
                  <Grid className={classes.submitStyle} item xs={12}>
                    <Button
                      variant="contained"
                      onClick={handleCancel}
                      className={classes.buttonStyle}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      disabled={!(selectedStartDate && selectedEndDate)}
                      className={classes.buttonStyle}
                      onClick={handleApply}
                    >
                      Apply
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        ) : null}
      </Box>
    </ClickAwayListener>
  );
}

//TODO: Will be used in future
DatePicker();
//export default DatePicker;
