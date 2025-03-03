export const options = {
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "left",
      beginAtZero: true,
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
};

const randomColor = () =>
  "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");

export const generateDataset = (data) =>
  Object.keys(data)
    .filter((k) => k !== "date")
    .map((k) => {
      return {
        label: k,
        data: data[k],
        borderColor: randomColor(),
        borderWidth: 2,
        backgroundColor: "transparent",
      };
    });

export const isNonEmptyObject = (object) =>
  Boolean(
    object &&
      object.constructor.name === "Object" &&
      Object.keys(object).length > 0
  );
