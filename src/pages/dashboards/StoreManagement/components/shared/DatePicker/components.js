import moment from "moment";

import { MonthName, MonthNavigation } from "./styles";

export const RightArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
    />
  </svg>
);

const LeftArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
    />
  </svg>
);

export const CalendarHeader = ({
  monthDate,
  customHeaderCount,
  decreaseMonth,
  increaseMonth,
}) => (
  <div className={`react-datepicker__month-header`}>
    <MonthNavigation
      aria-label="Previous Month"
      className={
        "react-datepicker__navigation react-datepicker__navigation--previous"
      }
      hidden={customHeaderCount === 1}
      onClick={decreaseMonth}
    >
      <LeftArrow />
    </MonthNavigation>
    <MonthName
      className={`react-datepicker__month`}
      currentMonth={monthDate.getMonth() === new Date().getMonth()}
    >
      {moment(monthDate).format("MMMM YYYY")}
    </MonthName>
    <MonthNavigation
      aria-label="Next Month"
      className={
        "react-datepicker__navigation react-datepicker__navigation--next"
      }
      hidden={customHeaderCount === 0}
      onClick={increaseMonth}
    >
      <RightArrow />
    </MonthNavigation>
  </div>
);
