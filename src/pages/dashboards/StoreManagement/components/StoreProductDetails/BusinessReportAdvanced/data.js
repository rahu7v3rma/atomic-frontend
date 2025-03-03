import { days } from "../../../constants";

let dates = [...Array(31).keys()];
dates.shift();
let labels = [];
let i = 0;
dates.forEach((d) => {
  if (i === days.length) i = 0;
  labels.push([days[i], d]);
  i++;
});
