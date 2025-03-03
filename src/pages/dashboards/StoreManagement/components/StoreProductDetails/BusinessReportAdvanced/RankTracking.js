import { Box, MenuItem, Select, Tooltip, Typography } from "@mui/material";
import { DataGridPro, useGridApiRef } from "@mui/x-data-grid-pro";
import { eachDayOfInterval, format, parseISO } from "date-fns";
import moment from "moment";
import * as React from "react";
import styled from "styled-components";

const CompText = styled(Typography)`
  font-family: "Inter", sans-serif;
  border: none;
  align-items: center;
  margin-left: 10px;
  color: #171717;
  padding-right: 20px;
  display: inline;
  flex-wrap: wrap;
  .text {
    color: #000000;
    font-weight: bold;
  }
`;

const CompImageItem = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  vertical-align: bottom;
`;

const DataTable = styled(DataGridPro)({
  ".MuiDataGrid-main>div:nth-child(3)": {
    display: "none",
  },
  "& .MuiDataGrid-cell": {
    padding: "0 !important",
  },
  "& .MuiDataGrid-columnHeader .MuiDataGrid-iconButtonContainer": {
    display: "none",
  },
  "& .MuiDataGrid-columnHeadersInner .MuiDataGrid-columnHeaderDraggableContainer":
    {
      position: "absolute",
      left: "-5px",
    },
  "& .MuiDataGrid-pinnedColumns": {
    backgroundColor: "white",
  },
});

const getBackgroundColor = (position) => {
  if (position >= 1 && position <= 5) return "rgba(76, 175, 80, 0.5)"; // Strong Green
  if (position >= 6 && position <= 10) return "rgba(76, 175, 80, 0.2)"; // Light Green
  if (position >= 11 && position <= 20) return "rgba(255, 235, 59, 0.2)"; // Yellow
  if (position >= 21 && position <= 29) return "rgba(255, 152, 0, 0.2)"; // Orange
  if (position >= 30) return "rgba(244, 67, 54, 0.2)"; // Red
  return "transparent";
};

const RankTracking = ({
  type,
  data,
  uk_data,
  currentPeriodicity,
  marketPlace,
}) => {
  const [competitorAsin, setCompetitorAsin] = React.useState(
    marketPlace === "us"
      ? Object.keys(data?.ranks?.competitors_ranks?.ranks)[0] || []
      : []
  );
  const ranks =
    type === "competitors"
      ? marketPlace === "us"
        ? data.ranks?.competitors_ranks?.ranks[competitorAsin] || []
        : []
      : marketPlace === "us"
      ? data?.ranks?.ranks || []
      : uk_data?.ranks?.ranks;
  var uniqueSearchTerms = [
    ...new Set(
      ranks?.map((rank) => rank?.search_term),
      ranks?.map((rank) => rank?.search_term)
    ),
  ];
  uniqueSearchTerms = uniqueSearchTerms.map((searchTerm) => [
    searchTerm,
    ranks?.find((rank) => rank?.search_term === searchTerm)?.search_volume_1w ||
      "-",
  ]);

  uniqueSearchTerms.sort((a, b) => b[1] - a[1]);

  const apiRef = useGridApiRef();

  const startDate = data ? parseISO(data.start_date) : new Date();
  if (!data) {
    startDate.setDate(startDate.getDate() - 30);
  }
  const endDate = data ? parseISO(data.end_date) : new Date();

  let allDates = [];
  if (currentPeriodicity === "day") {
    allDates = eachDayOfInterval({ start: startDate, end: endDate });
  }
  if (currentPeriodicity === "week") {
    allDates = Array.from(
      { length: moment(endDate).diff(moment(startDate), "weeks") + 1 },
      (_, i) => [
        moment(startDate).add(i, "week"),
        moment(startDate)
          .add(i + 1, "week")
          .subtract(1, "day"),
      ]
    );
  }
  if (currentPeriodicity === "month") {
    allDates = Array.from(
      { length: moment(endDate).diff(moment(startDate), "months") + 1 },
      (_, i) => [
        moment(startDate).add(i, "month"),
        moment(startDate).add(i + 1, "month"),
      ]
    );
  }

  const columns = [
    {
      field: "keywords",
      headerName: `Keywords (${uniqueSearchTerms.length})`,
      minWidth: 250,
      renderCell: (params) => {
        const value = params.value;
        return (
          <div
            style={{
              padding: "5px 10px",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              fontWeight: "600",
            }}
          >
            {value}
          </div>
        );
      },
    },
    {
      field: "sv1w",
      headerName: "SV (1w)",
      minWidth: 50,
      renderCell: (params) => {
        const value = params.value ? params.value : "-";
        return (
          <div
            style={{
              padding: "0px 10px",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            {value}
          </div>
        );
      },
    },
    ...allDates.map((date, index) => ({
      field: `date_${index}`,
      headerName:
        currentPeriodicity === "day"
          ? format(date, "d MMM")
          : currentPeriodicity === "week"
          ? `${date[0].format("DD MMM")} - ${date[1].format("DD MMM")}`
          : currentPeriodicity === "month"
          ? `${date[0].format("MMM")} ${date[0].format("YYYY")}`
          : "",
      type: "number",
      headerClassName: "position-header",
      width: currentPeriodicity === "day" ? 70 : 140,
      headerAlign: "center",
      renderCell: (params) => {
        const value = params.value.position;
        const backgroundColor = getBackgroundColor(value);
        return (
          <Tooltip
            disableHoverListener={
              currentPeriodicity !== "day" || params.value.tooltip.length === 0
            }
            title={
              <Box>
                {params.value.tooltip.map((positions, index) => (
                  <Box key={index} sx={{ display: "flex" }}>
                    <Typography sx={{ width: 50 }}>
                      {moment(positions.last_updated_date).format("hh A")}
                    </Typography>
                    <Typography sx={{ width: 20 }}>-</Typography>
                    <Typography>{positions.overall_position}</Typography>
                  </Box>
                ))}
              </Box>
            }
            arrow
          >
            <div
              style={{
                padding: 5,
                background: backgroundColor,
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "600",
                borderLeft: "1px solid #e0e0e0",
              }}
            >
              {value}
            </div>
          </Tooltip>
        );
      },
    })),
  ];

  let rows = [];
  if (currentPeriodicity === "day") {
    rows = uniqueSearchTerms.map((searchTerm, rowIndex) => {
      const row = {
        id: rowIndex,
        keywords: searchTerm[0],
        sv1w: searchTerm[1],
      };
      allDates.forEach((date, colIndex) => {
        const matchingRank = ranks?.find(
          (r) =>
            r.search_term === searchTerm[0] &&
            (r.date === format(date, "dd-MMM") ||
              r.date === format(date, "d-MMM"))
        );
        row[`date_${colIndex}`] = {
          position: matchingRank?.position || "-",
          tooltip: matchingRank?.tooltip || [],
        };
      });
      return row;
    });
  }
  if (currentPeriodicity === "week") {
    rows = uniqueSearchTerms.map((searchTerm, rowIndex) => {
      const row = {
        id: rowIndex,
        keywords: searchTerm[0],
        sv1w: searchTerm[1],
      };
      allDates.forEach((date, colIndex) => {
        const matchingRank = ranks?.find(
          (r) =>
            r.search_term === searchTerm[0] &&
            r.date ===
              `${date[0].format("DD MMM")} - ${date[1].format("DD MMM")}`
        );
        row[`date_${colIndex}`] = {
          position: matchingRank?.position || "-",
          tooltip: [],
        };
      });
      return row;
    });
  }
  if (currentPeriodicity === "month") {
    rows = uniqueSearchTerms.map((searchTerm, rowIndex) => {
      const row = {
        id: rowIndex,
        keywords: searchTerm[0],
        sv1w: searchTerm[1],
      };
      allDates.forEach((date, colIndex) => {
        const matchingRank = ranks?.find(
          (r) =>
            r.search_term === searchTerm[0] &&
            r.date === `${date[0].format("MMM")}`
        );
        row[`date_${colIndex}`] = {
          position: matchingRank?.position || "-",
          tooltip: [],
        };
      });
      return row;
    });
  }

  setTimeout(() => {
    if (
      apiRef &&
      apiRef.current &&
      apiRef.current.scrollToIndexes &&
      apiRef.current.getAllColumns
    ) {
      apiRef.current.scrollToIndexes({
        colIndex: apiRef.current.getAllColumns
          ? apiRef.current.getAllColumns().length - 1
          : 0,
      });
    }
  }, 100);
  return (
    <div style={{ height: 400, width: "100%" }}>
      {type === "competitors" && marketPlace === "us" && (
        <div>
          <Select
            value={competitorAsin}
            onChange={(e) => setCompetitorAsin(e.target.value)}
            disabled={!competitorAsin}
          >
            {marketPlace === "us"
              ? Object.keys(data?.ranks?.competitors_ranks?.ranks)?.map(
                  (asin, index) => (
                    <MenuItem key={index} value={asin}>
                      {asin}
                    </MenuItem>
                  )
                )
              : Object.keys(uk_data?.ranks?.competitors_ranks?.ranks)?.map(
                  (asin, index) => (
                    <MenuItem key={index} value={asin}>
                      {asin}
                    </MenuItem>
                  )
                )}
          </Select>
          <CompText>
            <CompImageItem
              src={
                `https://images-na.ssl-images-amazon.com/images/I/` +
                (marketPlace === "us"
                  ? data?.ranks?.competitors_ranks?.competitors_asin
                      .filter((comp) => comp.asin === competitorAsin)[0]
                      ?.["images_csv"]?.split(",")[0]
                  : uk_data?.ranks?.competitors_ranks?.competitors_asin
                      .filter((comp) => comp.asin === competitorAsin)[0]
                      ?.["images_csv"]?.split(",")[0])
              }
            />

            <a
              href={`https://www.amazon.com/dp/${competitorAsin}?th=1`}
              target="_blank"
              rel="noreferrer"
            >
              <span>
                {marketPlace === "us"
                  ? data?.ranks?.competitors_ranks?.competitors_asin.filter(
                      (comp) => comp.asin === competitorAsin
                    )[0]?.["brand"]
                  : uk_data?.ranks?.competitors_ranks?.competitors_asin.filter(
                      (comp) => comp.asin === competitorAsin
                    )[0]?.["brand"]}
              </span>
            </a>
            {` brand at a current price of $`}
            <span className="text">
              {marketPlace === "us"
                ? data?.ranks?.competitors_ranks?.competitors_asin.filter(
                    (comp) => comp.asin === competitorAsin
                  )[0]?.["stats"]?.["current"]?.["Marketplace price"]
                : uk_data?.ranks?.competitors_ranks?.competitors_asin.filter(
                    (comp) => comp.asin === competitorAsin
                  )[0]?.["stats"]?.["current"]?.["Marketplace price"]}
            </span>
            {` sold around `}
            <span className="text">
              {marketPlace === "us"
                ? Intl.NumberFormat("en", { notation: "compact" }).format(
                    data?.ranks?.competitors_ranks?.competitors_asin.filter(
                      (comp) => comp.asin === competitorAsin
                    )[0]?.["monthly_sold"] || "x"
                  )
                : Intl.NumberFormat("en", { notation: "compact" }).format(
                    uk_data?.ranks?.competitors_ranks?.competitors_asin.filter(
                      (comp) => comp.asin === competitorAsin
                    )[0]?.["monthly_sold"] || "x"
                  )}
            </span>
            {` units last month.`}
          </CompText>
        </div>
      )}
      <Box height={20} />
      <DataTable
        disableSelectionOnClick
        disableColumnMenu
        apiRef={apiRef}
        rows={rows}
        columns={columns}
        initialState={{
          pinnedColumns: { left: ["keywords", "sv1w"], right: ["actions"] },
        }}
        rowsPerPageOptions={[5, 10, 15]}
        sx={{
          "& .position-header .MuiDataGrid-columnHeaderTitle": {
            marginLeft: 4,
          },
        }}
      />
    </div>
  );
};

export default RankTracking;
