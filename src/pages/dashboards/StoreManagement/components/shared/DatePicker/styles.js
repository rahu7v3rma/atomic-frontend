import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Alert from "@mui/material/Alert";
import styled from "styled-components";

export const Root = styled.span`
  position: relative;
  z-index: 2;
`;

export const DatesInputContainer = styled.div`
  margin: 0px 10px 15px 10px;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
`;

export const DateInput = styled.input`
  width: ${(p) => p.width ?? "45%"};
  height: 30px;
  font-family: "Inter", sans-serif;
  border: none;
  border: 1px solid #7c899a;
  border-radius: 3px;
  background-color: ${(p) => (p.error ? "ivory" : null)};
  outline: ${(p) => (p.error ? "2px solid red" : null)};
`;

export const CalendarContainer = styled.div`
  flex: 1;
  display: inline-flex;
  flex-direction: column;
  padding-top: 20px;
  padding-left: 10px;
  background-color: #fff;
`;

export const PresetsContainer = styled.div`
  border-right: 1px solid #eaecef;
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const MonthName = styled.span`
  && {
    font-weight: ${(a) => a.currentMonth && 600};
  }
`;

export const MonthNavigation = styled.button`
  visibility: ${(a) => (a.hidden ? "hidden" : null)};
`;

export const Preset = styled.span`
  background-color: ${(a) => (a.highlight ? "#f1f5fc" : "#fff")};
  font: 13px "Inter", sans-serif;
  display: flex;
  align-items: center;
  flex: 1;
  && {
    cursor: pointer;
  }
`;

export const PresetIndicator = styled.span`
  background-color: ${(a) => (a.highlight ? "#416aba" : "#fff")};
  display: flex;
  height: 40px;
  width: 5px;
  margin-right: 5px;
`;

export const CalendarWrapper = styled.div`
  height: 260px;
  & .react-datepicker__month-container {
    width: 240px;
  }
  & .react-datepicker__month-container:first-of-type {
    margin-right: 5px;
  }
  & .react-datepicker__day-name,
  & .react-datepicker__day {
    width: 26px;
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  padding-bottom: 15px;
  background-color: #fff;
`;

export const PickerContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #eaecef;
`;

export const CompareContainer = styled.div``;

export const PeriodicityContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const CompareToText = styled.span`
  font: 600 15px "Inter", sans-serif;
  color: #7c899a;
`;

export const PeriodicityText = styled.span`
  font: 600 15px "Inter", sans-serif;
  color: #7c899a;
  margin-top: 10px;
`;

export const CompareActions = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-left: 5px;
`;

export const CompareActionLabel = styled.label`
  font: 500 13px "Inter", sans-serif;
  display: flex;
  align-items: center;
  margin-left: 5px;
  margin-right: 10px;
  cursor: pointer;
`;

export const CompareActionInput = styled.input`
  margin-top: 0;

  && {
    transform: scale(1.2);
  }
  &#compare-custom-period {
    accent-color: green;
  }
`;

export const CalendarActionsContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const CancelButton = styled.div`
  border: 1px solid #7c899a;
  height: 35px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-radius: 5px;
  font: 600 13px "Inter", sans-serif;
  cursor: pointer;
`;

export const ApplyButton = styled(CancelButton)`
  margin-left: 10px;
  background-color: #216ba5;
  color: #fff;
  border-color: transparent;
`;

export const PickerElements = styled.div`
  & .react-datepicker__header {
    background-color: white;
    border: none;
  }
  & .react-datepicker {
    border: none;
  }
  & .react-datepicker__month-header {
    margin-bottom: 16px;
    border: 1px solid transparent;
  }
  & .react-datepicker__month {
    font: 400 14px "Inter", sans-serif;
  }
  & .react-datepicker__day-name {
    font: 400 12px "Inter", sans-serif;
    margin-bottom: 5px;
  }
  & .react-datepicker__day {
    font: 400 12px "Inter", sans-serif;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  border: 1px solid #eaecef;
  & .react-datepicker__day--outside-month {
    visibility: hidden;
  }
  width: 700px;
  position: absolute;
  right: 0px;
  top: 50px;
  z-index: 1;
  flex-direction: column;
  display: ${(a) => a.display};
  & .react-datepicker__day--keyboard-selected {
    background-color: transparent;
  }
  & .react-datepicker__day--keyboard-selected.react-datepicker__day--in-range {
    background-color: #216ba5;
    color: white;
  }
  &
    .react-datepicker__day--keyboard-selected.react-datepicker__day--highlighted {
    background-color: #3dcc4a;
    color: white;
  }
`;

export const SelectorContainer = styled.span`
  border: 2px solid #c4c4c4;
  padding: 8px 10px;
  display: inline-flex;
  align-items: center;
  border-radius: 10px;
  background-color: #fff;
  cursor: pointer;
  :hover {
    border: 2px solid ${(p) => (p.disabled ? "#c4c4c4" : "black")};
  }
`;

export const SelectorText = styled.span`
  font: 600 13px "Inter", sans-serif;
  color: ${(p) => (p.disabled ? "#c4c4c4" : "black")};
  margin-left: 10px;
`;

export const ComparedToInline = styled.span`
  font-weight: bold;
`;

export const StyledCalendarTodayIcon = styled(CalendarTodayIcon)`
  color: ${(p) => (p.disabled ? "#c4c4c4" : "#757575")};
`;

export const CustomCompareInputs = styled.div`
  margin-top: 20px;
  margin-bottom: -15px;
`;

export const RightArrowWrapper = styled.span`
  margin: 0 10px;
  display: inline-flex;
  align-items: center;
`;

export const AlertStyled = styled(Alert)`
  position: absolute;
`;
