import moment from "moment";

export const excludeDateIntervals = () => {
  const start = new Date();
  const end = new Date(moment().set({ year: start.getFullYear() + 1 }));
  return [{ start, end }];
};

export const handlePreset = (preset) => {
  let start,
    end = null;
  switch (preset) {
    case "Today":
      start = new Date();
      end = start;
      break;
    case "Yesterday":
      start = new Date(moment().subtract(1, "days"));
      end = start;
      break;
    case "Last 7 days":
    case "Last 30 days":
    case "Last 90 days":
      const days = Number(preset.split(" ")[1]);
      start = new Date(moment().subtract(days - 1, "days"));
      end = new Date();
      break;
    case "Last month":
      start = new Date(moment().subtract(1, "month").set({ date: 1 }));
      end = new Date(moment().set({ date: 0 }));
      break;
    case "Last year":
      start = new Date(moment().subtract(1, "year").set({ month: 0, date: 1 }));
      end = new Date(moment().set({ month: 0, date: 0 }));
      break;
    case "Week to date":
      start = new Date(moment().set({ weekday: 1 }));
      end = new Date();
      break;
    default:
      break;
  }
  return [start, end];
};

export const calculateComparePeriod = (start, end, comparePeriod) => {
  let compareStart,
    compareEnd = null;
  if (comparePeriod === "last-period") {
    compareStart = new Date(
      moment(start).subtract({ days: moment(end).diff(start, "days") + 1 })
    );
    compareEnd = new Date(moment(start).subtract({ days: 1 }));
  } else if (comparePeriod === "last-year") {
    compareStart = new Date(
      moment(start).set({ year: moment(start).get("year") - 1 })
    );
    compareEnd = new Date(
      moment(end).set({ year: moment(end).get("year") - 1 })
    );
  }
  return [compareStart, compareEnd];
};

export const formatSelectorText = (datesFinal) =>
  `${moment(datesFinal.startDate).format("DD/MM/YYYY")} - ${moment(
    datesFinal.endDate
  ).format("DD/MM/YYYY")} ${
    datesFinal.compareStartDate instanceof Date &&
    datesFinal.compareEndDate instanceof Date &&
    datesFinal.compareStartDate.getDate() &&
    datesFinal.compareEndDate.getDate()
      ? " compared to " +
        moment(datesFinal.compareStartDate).format("DD/MM/YYYY") +
        " - " +
        moment(datesFinal.compareEndDate).format("DD/MM/YYYY")
      : ""
  }`;

export const getDatesBetween = (start, end) => {
  const datesArray = [];
  while (end >= start) {
    datesArray.push(start);
    start = new Date(moment(start).add(1, "day"));
  }
  return datesArray;
};
