const getOrCreateTooltip = (chart) => {
  let tooltipEl = document.getElementById("chartjs-tooltip2");

  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.id = "chartjs-tooltip2";
    tooltipEl.style.background = "rgba(0, 0, 0, 0.7)";
    tooltipEl.style.borderRadius = "3px";
    tooltipEl.style.color = "white";
    tooltipEl.style.opacity = 1;
    tooltipEl.style.pointerEvents = "none";
    tooltipEl.style.position = "absolute";
    tooltipEl.style.transform = "translate(-50%, 0)";
    tooltipEl.style.transition = "all .1s ease";
    tooltipEl.style.zIndex = 1;

    const table = document.createElement("table");
    table.style.margin = "0px";

    tooltipEl.appendChild(table);
    chart.canvas.parentNode.appendChild(tooltipEl);
  }

  return tooltipEl;
};

export const externalTooltipHandler = (context) => {
  // Tooltip Element
  const { chart, tooltip } = context;
  const tooltipEl = getOrCreateTooltip(chart);

  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  // Set Text
  if (tooltip.body) {
    const titleLines = tooltip.title || [];
    const bodyLines = tooltip.body.map((b) => b.lines);

    const tableHead = document.createElement("thead");
    const tableHead2 = document.createElement("thead");

    const comparedExists = titleLines[0].split("#")[1] !== "undefined";

    titleLines.forEach((title) => {
      const tr = document.createElement("tr");
      tr.style.borderWidth = 0;

      const th = document.createElement("th");
      th.style.borderWidth = 0;
      th.style.textAlign = "left";
      const text = document.createTextNode(title.split("#")[0]);

      th.appendChild(text);
      tr.appendChild(th);
      tableHead.appendChild(tr);
    });

    if (comparedExists) {
      titleLines.forEach((title) => {
        const tr = document.createElement("tr");
        tr.style.borderWidth = 0;

        const th = document.createElement("th");
        th.style.borderWidth = 0;
        th.style.textAlign = "left";
        const text = document.createTextNode(title.split("#")[1]);

        th.appendChild(text);
        tr.appendChild(th);
        tableHead2.appendChild(tr);
      });
    }

    const tableBody = document.createElement("tbody");
    const tableBody2 = document.createElement("tbody");
    bodyLines.forEach((body, i) => {
      const colors = tooltip.labelColors[i];

      const span = document.createElement("span");
      span.style.background = colors.backgroundColor;
      // span.style.borderColor = colors.borderColor;
      // span.style.borderWidth = "2px";
      span.style.marginRight = "10px";
      span.style.border = `solid 2px ${colors.borderColor}`;
      span.style.height = "10px";
      span.style.width = "10px";
      span.style.display = "inline-block";

      const tr = document.createElement("tr");
      tr.style.backgroundColor = "inherit";
      tr.style.borderWidth = 0;

      const td = document.createElement("td");
      td.style.borderWidth = 0;

      const text = document.createTextNode(body);

      td.appendChild(span);
      td.appendChild(text);
      td.appendChild(document.createElement("br"));
      let text2;
      let text3;
      let text4;
      if (i === 0) {
        let _units =
          tooltip.dataPoints[0].dataset.units[tooltip.dataPoints[0].dataIndex];
        let _margins =
          tooltip.dataPoints[0].dataset.margins[
            tooltip.dataPoints[0].dataIndex
          ];
        let _profits =
          tooltip.dataPoints[0].dataset.profits[
            tooltip.dataPoints[0].dataIndex
          ];
        text2 = document.createTextNode(
          `Current Period Units Ordered : ${_units}`
        );
        if (_margins !== undefined && _profits !== undefined) {
          text3 = document.createTextNode(
            `Current Period Margin: ${_margins}%`
          );
          text4 = document.createTextNode(`Current Period Profit: ${_profits}`);
        }
      } else {
        let _units =
          tooltip.dataPoints[1].dataset.units[tooltip.dataPoints[1].dataIndex];
        let _margins =
          tooltip.dataPoints[1].dataset.margins[
            tooltip.dataPoints[1].dataIndex
          ];
        let _profits =
          tooltip.dataPoints[1].dataset.profits[
            tooltip.dataPoints[1].dataIndex
          ];
        text2 = document.createTextNode(
          `Compared Period Units Ordered : ${_units}`
        );
        if (_margins !== undefined && _profits !== undefined) {
          text3 = document.createTextNode(
            `Compared Period Margin: ${_margins}%`
          );
          text4 = document.createTextNode(
            `Compared Period Profit: ${_profits}`
          );
        }
      }
      td.appendChild(text2);
      if (text3 !== undefined && text4 !== undefined) {
        td.appendChild(document.createElement("br"));
        td.appendChild(text3);
        td.appendChild(document.createElement("br"));
        td.appendChild(text4);
      }
      tr.appendChild(td);
      if (i === 0) {
        tableBody.appendChild(tr);
      } else {
        tableBody2.appendChild(tr);
      }
    });

    const tableRoot = tooltipEl.querySelector("table");
    // Remove old children
    while (tableRoot.firstChild) {
      tableRoot.firstChild.remove();
    }

    // Add new children
    tableRoot.appendChild(tableHead);
    tableRoot.appendChild(tableBody);

    if (comparedExists) {
      tableRoot.appendChild(tableHead2);
      tableRoot.appendChild(tableBody2);
    }
  }

  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = positionX + tooltip.caretX + "px";
  tooltipEl.style.top = positionY + tooltip.caretY + "px";
  tooltipEl.style.font = tooltip.options.bodyFont.string;
  tooltipEl.style.padding =
    tooltip.options.padding + "px " + tooltip.options.padding + "px";
};
