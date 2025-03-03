import moment from "moment/moment";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import RDP from "react-datepicker";

import { defaultPeriodicity, presets } from "../../../constants";

import { CalendarHeader, RightArrow } from "./components";
import {
  calculateComparePeriod,
  excludeDateIntervals,
  formatSelectorText,
  getDatesBetween,
  handlePreset,
} from "./helpers";
import * as S from "./styles";

import "react-datepicker/dist/react-datepicker.css";

const DatePicker = (props) => {
  const {
    onDatesSelected = () => {},
    defaultDates = {
      startDate: new Date(),
      endDate: new Date(),
      compareStartDate: new Date(),
      compareEndDate: new Date(),
    },
    defaultPreset = "Today",
    defaultComparePeriod = "last-year",
    disabled = false,
    showPeriodicity = false,
    periodicity = defaultPeriodicity,
  } = props;
  if (!defaultDates.compareStartDate || !defaultDates.compareEndDate) {
    [defaultDates.compareStartDate, defaultDates.compareEndDate] =
      calculateComparePeriod(
        defaultDates.startDate,
        defaultDates.endDate,
        defaultComparePeriod
      );
  }

  const [pickerDisplay, setPickerDisplay] = useState("none");

  const [tempStartDate, setTempStartDate] = useState(defaultDates.startDate);
  const [tempEndDate, setTempEndDate] = useState(defaultDates.endDate);
  const [startDate, setStartDate] = useState(defaultDates.startDate);
  const [endDate, setEndDate] = useState(defaultDates.endDate);
  const onChange = (dates) => {
    const [start, end] = dates;
    setTempStartDate(start);
    setTempEndDate(end);
  };

  const [tempPreset, setTempPreset] = useState(defaultPreset);
  const [selectedPreset, setSelectedPreset] = useState(defaultPreset);
  const onClickPreset = (preset) => {
    setTempPreset(preset);
    const [start, end] = handlePreset(preset);
    setTempStartDate(start);
    setTempEndDate(end);
  };

  const [tempComparePeriod, setTempComparePeriod] =
    useState(defaultComparePeriod);
  const [comparePeriod, setComparePeriod] = useState(defaultComparePeriod);
  const onChangeComparePeriod = (type) => {
    setTempComparePeriod(type);
    setTempCompareStartDate(tempStartDate);
    setTempCompareEndDate(tempEndDate);
  };

  const [tempPeriodicity, setTempPeriodicity] = useState(periodicity);
  const [selectedPeriodicity, setSelectedPeriodicity] = useState(periodicity);
  const onChangePeriodicity = (periodicity) => {
    setTempPeriodicity(periodicity);
  };

  const onClickCancel = () => {
    setTempPreset(selectedPreset);
    setTempStartDate(startDate);
    setTempEndDate(endDate);
    setTempPeriodicity(selectedPeriodicity);
    setTempComparePeriod(comparePeriod);
    setTempCompareStartDate(compareStartDate);
    setTempCompareEndDate(compareEndDate);
    setPickerDisplay("none");
  };

  const onClickApply = () => {
    let _tempEndDate = tempEndDate;
    if (tempEndDate == null) {
      _tempEndDate = tempStartDate;
    }
    if (
      ((tempCompareStartDate === null && tempCompareEndDate === null) ||
        (tempCompareStartDate.getDate() && tempCompareEndDate.getDate())) &&
      tempStartDate !== null
    ) {
      setSelectorButtonDates({
        startDate: tempStartDate,
        endDate: _tempEndDate,
        compareStartDate: tempCompareStartDate,
        compareEndDate: tempCompareEndDate,
      });
      onDatesSelected(
        tempStartDate,
        _tempEndDate,
        tempCompareStartDate,
        tempCompareEndDate,
        tempPeriodicity
      );
      setSelectedPreset(tempPreset);
      setStartDate(tempStartDate);
      setEndDate(_tempEndDate);
      setSelectedPeriodicity(tempPeriodicity);
      setComparePeriod(tempComparePeriod);
      setCompareStartDate(tempCompareStartDate);
      setCompareEndDate(tempCompareEndDate);
      setPickerDisplay("none");
    }
  };

  const handleSelectorClick = () => {
    setPickerDisplay(pickerDisplay === "none" ? "flex" : "none");
  };

  const [tempCompareStartDate, setTempCompareStartDate] = useState(
    defaultDates.compareStartDate
  );
  const [compareStartDate, setCompareStartDate] = useState(
    defaultDates.compareStartDate
  );

  const [tempCompareEndDate, setTempCompareEndDate] = useState(
    defaultDates.compareEndDate
  );
  const [compareEndDate, setCompareEndDate] = useState(
    defaultDates.compareEndDate
  );

  const [selectorButtonDates, setSelectorButtonDates] = useState({
    startDate: tempStartDate,
    endDate: tempEndDate,
    compareStartDate: tempCompareStartDate,
    compareEndDate: tempCompareEndDate,
  });

  useEffect(() => {
    if (
      tempComparePeriod === "last-period" ||
      tempComparePeriod === "last-year"
    ) {
      const [compareStartDate, compareEndDate] = calculateComparePeriod(
        tempStartDate,
        tempEndDate,
        tempComparePeriod
      );
      setTempCompareStartDate(compareStartDate);
      setTempCompareEndDate(compareEndDate);
    }
    if (tempComparePeriod === "nothing") {
      setTempCompareStartDate(null);
      setTempCompareEndDate(null);
    }
    if (tempComparePeriod === "custom-period") {
      if (tempCompareStartDate) {
        const newTempCompareEndDate = moment(
          new Date(tempCompareStartDate)
        ).add(moment(tempEndDate).diff(tempStartDate, "days"), "days");
        const differenceDaysCountFromToday = moment().diff(
          newTempCompareEndDate,
          "d"
        );
        if (differenceDaysCountFromToday < 0) {
          setTempCompareEndDate(new Date());
          const endDateDiffFromToday = moment(tempEndDate).diff(moment(), "d");
          if (endDateDiffFromToday !== 0) {
            setTempEndDate(new Date());
          }
        } else {
          setTempCompareEndDate(new Date(newTempCompareEndDate));
        }
      }
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps*/
  }, [tempStartDate, tempEndDate, tempComparePeriod]);

  const onChangeCustomCompareStartDate = (event) => {
    const differenceToBeMade = moment(tempEndDate).diff(tempStartDate, "days");
    const newEndDate = moment(new Date(event.target.value)).add(
      differenceToBeMade,
      "days"
    );
    const differenceDaysCountFromToday = moment().diff(newEndDate, "d");
    console.log({ differenceDaysCountFromToday });
    if (differenceDaysCountFromToday <= 0) {
      const newStartDateFixed = new Date(
        moment().subtract(differenceToBeMade, "d")
      );
      const newEndDateFixed = new Date();
      setTempCompareStartDate(newStartDateFixed);
      setTempCompareEndDate(newEndDateFixed);
    } else {
      setTempCompareStartDate(new Date(event.target.value));
      setTempCompareEndDate(new Date(newEndDate));
    }
  };

  const onChangeCustomCompareEndDate = (event) => {
    setTempCompareEndDate(new Date(event.target.value));
    setTempCompareStartDate(
      new Date(
        moment(new Date(event.target.value)).subtract(
          moment(tempEndDate).diff(tempStartDate, "days"),
          "days"
        )
      )
    );
  };

  useEffect(() => {
    if (defaultDates) {
      setTempStartDate(defaultDates.startDate);
      setTempEndDate(defaultDates.endDate);
      setTempCompareStartDate(defaultDates.compareStartDate);
      setTempCompareEndDate(defaultDates.compareEndDate);

      setSelectorButtonDates({
        startDate: tempStartDate,
        endDate: tempEndDate,
        compareStartDate: tempCompareStartDate,
        compareEndDate: tempCompareEndDate,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultDates]);

  return (
    <S.Root>
      <S.SelectorContainer
        disabled={disabled}
        onClick={disabled ? () => {} : handleSelectorClick}
      >
        <S.StyledCalendarTodayIcon disabled={disabled} />
        <S.SelectorText disabled={disabled}>
          {formatSelectorText(selectorButtonDates)}
        </S.SelectorText>
      </S.SelectorContainer>
      <S.PickerElements display={pickerDisplay}>
        {showPeriodicity ? (
          <S.ActionsContainer>
            <S.PeriodicityContainer>
              <S.PeriodicityText>Periodicity</S.PeriodicityText>
              <S.CompareActions>
                <S.CompareActionInput
                  type="radio"
                  id="periodicity-day"
                  checked={tempPeriodicity === "day"}
                  onChange={() => onChangePeriodicity("day")}
                  readOnly
                />
                <S.CompareActionLabel htmlFor="periodicity-day">
                  Day
                </S.CompareActionLabel>
                <S.CompareActionInput
                  type="radio"
                  id="periodicity-week"
                  checked={tempPeriodicity === "week"}
                  onChange={() => onChangePeriodicity("week")}
                  readOnly
                />
                <S.CompareActionLabel htmlFor="periodicity-week">
                  Week
                </S.CompareActionLabel>
                <S.CompareActionInput
                  type="radio"
                  id="periodicity-month"
                  checked={tempPeriodicity === "month"}
                  onChange={() => onChangePeriodicity("month")}
                  readOnly
                />
                <S.CompareActionLabel htmlFor="periodicity-month">
                  Month
                </S.CompareActionLabel>
              </S.CompareActions>
            </S.PeriodicityContainer>
          </S.ActionsContainer>
        ) : null}
        <S.PickerContainer>
          <S.PresetsContainer>
            {presets.map((preset) => (
              <S.Preset
                key={preset}
                onClick={() => onClickPreset(preset)}
                highlight={preset === tempPreset}
              >
                <S.PresetIndicator highlight={preset === tempPreset} />
                {preset}
              </S.Preset>
            ))}
          </S.PresetsContainer>
          <S.CalendarContainer>
            <S.DatesInputContainer>
              <S.DateInput
                value={`  ${moment(tempStartDate).format("DD MMMM YYYY")}`}
                readOnly
              />
              <RightArrow />
              <S.DateInput
                value={`  ${moment(tempEndDate ?? tempStartDate).format(
                  "DD MMMM YYYY"
                )}`}
                readOnly
              />
            </S.DatesInputContainer>
            <RDP
              selected={tempStartDate}
              onChange={onChange}
              startDate={tempStartDate}
              endDate={tempEndDate}
              selectsRange
              monthsShown={2}
              open={true}
              inline
              excludeDateIntervals={excludeDateIntervals()}
              renderCustomHeader={CalendarHeader}
              calendarContainer={S.CalendarWrapper}
              highlightDates={
                tempCompareStartDate && tempCompareEndDate
                  ? getDatesBetween(tempCompareStartDate, tempCompareEndDate)
                  : []
              }
            />
          </S.CalendarContainer>
        </S.PickerContainer>
        <S.ActionsContainer>
          <S.CompareContainer>
            <S.CompareToText>Compare to</S.CompareToText>
            <S.CompareActions>
              <S.CompareActionInput
                type="radio"
                id="compare-nothing"
                checked={tempComparePeriod === "nothing"}
                onChange={() => onChangeComparePeriod("nothing")}
                readOnly
              />
              <S.CompareActionLabel htmlFor="compare-nothing">
                Nothing
              </S.CompareActionLabel>
              <S.CompareActionInput
                type="radio"
                id="compare-last-period"
                checked={tempComparePeriod === "last-period"}
                onClick={() => onChangeComparePeriod("last-period")}
                readOnly
              />
              <S.CompareActionLabel htmlFor="compare-last-period">
                Last period
              </S.CompareActionLabel>
              <S.CompareActionInput
                type="radio"
                id="compare-last-year"
                checked={tempComparePeriod === "last-year"}
                onClick={() => onChangeComparePeriod("last-year")}
                readOnly
              />
              <S.CompareActionLabel htmlFor="compare-last-year">
                Last year
              </S.CompareActionLabel>
              <S.CompareActionInput
                type="radio"
                id="compare-custom-period"
                checked={tempComparePeriod === "custom-period"}
                onClick={() => onChangeComparePeriod("custom-period")}
                readOnly
              />
              <S.CompareActionLabel htmlFor="compare-custom-period">
                Custom
              </S.CompareActionLabel>
            </S.CompareActions>
            {tempComparePeriod === "custom-period" && (
              <S.CustomCompareInputs>
                <S.DatesInputContainer>
                  <S.DateInput
                    value={moment(tempCompareStartDate).format("YYYY-MM-DD")}
                    type="date"
                    onChange={onChangeCustomCompareStartDate}
                    max={moment().format("YYYY-MM-DD")}
                    width={"max-content"}
                    error={!moment(tempCompareStartDate).isValid()}
                  />
                  <S.RightArrowWrapper>
                    <RightArrow />
                  </S.RightArrowWrapper>
                  <S.DateInput
                    value={moment(tempCompareEndDate).format("YYYY-MM-DD")}
                    type="date"
                    onChange={onChangeCustomCompareEndDate}
                    max={moment().format("YYYY-MM-DD")}
                    width={"110px"}
                    error={!moment(tempCompareEndDate).isValid()}
                  />
                </S.DatesInputContainer>
                {(!moment(tempCompareStartDate).isValid() ||
                  !moment(tempCompareEndDate).isValid()) && (
                  <S.AlertStyled severity="error">Invalid Date!</S.AlertStyled>
                )}
              </S.CustomCompareInputs>
            )}
          </S.CompareContainer>
          <S.CalendarActionsContainer>
            <S.CancelButton onClick={onClickCancel}>Cancel</S.CancelButton>
            <S.ApplyButton onClick={onClickApply}>Apply</S.ApplyButton>
          </S.CalendarActionsContainer>
        </S.ActionsContainer>
      </S.PickerElements>
    </S.Root>
  );
};

export default DatePicker;

DatePicker.propTypes = {
  onDatesSelected: PropTypes.func,
  defaultDates: PropTypes.shape({
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
    compareStartDate: PropTypes.instanceOf(Date),
    compareEndDate: PropTypes.instanceOf(Date),
  }),
  defaultPreset: PropTypes.oneOf([
    "Today",
    "Yesterday",
    "Last 7 days",
    "Last 30 days",
    "Last 90 days",
    "Last month",
    "Last year",
  ]),
  defaultComparePeriod: PropTypes.oneOf([
    "last-period",
    "last-year",
    "custom-period",
    "nothing",
  ]),
  disabled: PropTypes.bool,
  periodicity: PropTypes.oneOf(["day", "week", "month"]),
};
