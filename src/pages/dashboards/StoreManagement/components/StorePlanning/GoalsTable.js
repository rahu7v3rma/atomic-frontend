import { makeStyles } from "@material-ui/core/styles";
import { CalendarMonthOutlined } from "@mui/icons-material";
import {
  MenuItem,
  Select,
  Skeleton,
  Snackbar,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import { styled as muistyled } from "@mui/system";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import {
  fetchGoalsData,
  productDetailSelector,
} from "../../../../../redux/slices/product_detail";
import {
  createOrUpdateMonthlyGoal,
  fetchStoreMonthlyBreakdown,
  fetchStorePlannings,
  storeAnalyticsSelector,
} from "../../../../../redux/slices/store_analytics";
import { columns, months } from "../../constants";

import GoalsTableRow from "./GoalsTableRow";

const GoalsTableContainer = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 24px;
`;

const YearContainer = styled.div`
  margin-bottom: 11px;
  display: flex;
  justify-content: flex-start;
`;

const StyledTableContainer = styled(TableContainer)`
  // max-height: 280px;
  height: 100%;
`;

const TableFooterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 13px;
`;

const GoalTable = muistyled(Table)({
  overflow: "hidden",
});

const useStyles = makeStyles({
  selectStoreStyle: {
    borderRadius: "10px",
    height: "40px",
    fontWeight: "bold",
    margin: "4px",
    "& fieldset": {
      borderWidth: "2px",
    },
  },
  customStyle: {},
  selectedMenuItem: {
    backgroundColor: "#ffffff !important",
  },
});

const GoalsTable = ({ value }) => {
  const dispatch = useDispatch();
  const {
    storePlanningsData,
    storePlanningsLoading,
    storeMonthlyBreakdownLoading,
  } = useSelector(storeAnalyticsSelector);
  const { goalsAndPlanningLoading } = useSelector(productDetailSelector);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [expendedRow, setExpendedRow] = useState("");
  const [selectedRow, setSelectedRow] = useState("");
  const [editableRow, setEditableRow] = useState("");
  const [activeRowGoal, setActiveRowGoal] = useState(0);
  const [isEditModeOn, setIsEditModeOn] = useState(false);
  const [prevSelectedMonth, setPrevSelectedMonth] = useState("");
  const [prevSelectedYear, setPrevSelectedYear] = useState("");
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
  });

  const { state } = useLocation();

  const displayChart = useCallback(
    (rowData) => {
      let month = rowData.month;
      month = months.indexOf(month);
      month = month + 1;
      dispatch(
        fetchGoalsData({
          store: value,
          month: month,
          target: rowData.goal,
          year: selectedYear,
        })
      );

      myRef.current.scrollIntoView();
    },
    [dispatch, selectedYear, value]
  );

  const onClickRow = useCallback(
    (rowData) => {
      if (rowData.store !== "all") {
        if (!goalsAndPlanningLoading) {
          setSelectedRow(rowData.month);
          setActiveRowGoal(rowData.goal);
          setPrevSelectedMonth(rowData.month);
          setPrevSelectedYear(selectedYear);
          if (
            prevSelectedMonth.toLowerCase() !== rowData.month.toLowerCase() ||
            prevSelectedYear.toString() !== selectedYear.toString()
          ) {
            displayChart(rowData);
          }
        }
      } else {
        setSelectedRow(rowData.month);
      }
    },
    [
      goalsAndPlanningLoading,
      prevSelectedMonth,
      prevSelectedYear,
      selectedYear,
      displayChart,
    ]
  );

  const onChangeGoal = (event) => {
    const value = event.target.value;
    if (!isNaN(Number(value))) {
      setActiveRowGoal(value);
    }
  };

  const onChangeYear = (event) => {
    const value = event.target.value;
    setSelectedYear(value);
  };

  const onEdit = () => {
    setEditableRow(selectedRow);
    setIsEditModeOn(true);
  };

  const onCancel = () => {
    setEditableRow("");
    setIsEditModeOn(false);
  };

  const get_aggregated_sum = useCallback((planningData) => {
    const goal = planningData?.goals
      ?.map((el) => el.goal)
      ?.reduce((a, b) => a + b, 0);
    const last_year_same_month = planningData?.goals
      ?.map((el) => el.last_year_same_month)
      ?.reduce((a, b) => a + b, 0);
    const sales_to_date = planningData?.goals
      ?.map((el) => el.sales_to_date)
      ?.reduce((a, b) => a + b, 0);
    const days_left = planningData?.goals
      ?.map((el) => el.days_left)
      ?.reduce((a, b) => a + b, 0);
    return {
      month_: 13,
      month: "Total",
      goal: goal,
      last_year_same_month: last_year_same_month,
      sales_to_date: sales_to_date,
      days_left: days_left,
      actual_vs_goal: (sales_to_date / goal) * 100,
      store: planningData.store,
      year: planningData.year,
    };
  }, []);

  const onSave = useCallback(() => {
    var goal = activeRowGoal;
    if (activeRowGoal === "") {
      setActiveRowGoal("0");
      goal = "0";
    }
    goal = goal.replace(/[, ]+/g, "").trim();
    setEditableRow("");
    setIsEditModeOn(false);
    const payload = {
      year: parseInt(selectedYear),
      month: selectedRow,
      store: value,
      goal: parseInt(goal),
    };

    dispatch(
      createOrUpdateMonthlyGoal(payload, () => {
        setSnackbarState({
          open: true,
          message: `Goals value for the month of ${selectedRow}, ${selectedYear} is updated!`,
        });
      })
    );

    const chartPara = { month: selectedRow, goal: parseInt(goal) };
    displayChart(chartPara);
  }, [dispatch, activeRowGoal, selectedRow, selectedYear, value, displayChart]);
  const handleSnackbarClose = () => {
    setSnackbarState({ open: false, message: "" });
  };

  useEffect(() => {
    dispatch(
      fetchStorePlannings({
        year: selectedYear,
        store: value,
      })
    );
    if (state?.showCurrMonthBreakdown) {
      setExpendedRow(true);
      setSelectedRow(months[new Date().getMonth()]);
      setInterval(function () {
        dispatch(
          fetchStoreMonthlyBreakdown({
            month: new Date().getMonth() + 1,
            year: selectedYear,
          })
        );
      }, 300000);
    }
  }, [dispatch, selectedYear, value, state]);

  const myRef = useRef(null);

  return (
    <GoalsTableContainer>
      <YearContainer>
        <CalendarMonthOutlined
          sx={{ marginRight: "9px", marginTop: "12px", fontSize: 20 }}
        />
        <Select
          className={`${useStyles().selectStoreStyle} 
                      ${useStyles().customStyle}`}
          labelId=""
          id="YearSelector"
          value={selectedYear}
          onChange={onChangeYear}
          MenuProps={{
            PaperProps: {
              sx: {
                "& .MuiMenuItem-root.Mui-selected": {
                  backgroundColor: "rgba(55,111,208,0.08) !important",
                },
                "& .MuiMenuItem-root:hover": {
                  backgroundColor: "rgba(0,0,0,0.04) !important",
                },
              },
            },
          }}
        >
          <MenuItem value={2023}>2023</MenuItem>
          <MenuItem value={2024}>2024</MenuItem>
        </Select>
      </YearContainer>

      {storePlanningsLoading ? (
        <>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <Skeleton
              key={item}
              width={"95%"}
              sx={{ mt: 5, ml: 5 }}
              variant="rectangular"
              height={15}
            />
          ))}
        </>
      ) : (
        <>
          <StyledTableContainer component={Paper}>
            <GoalTable stickyHeader>
              <TableHead
                sx={{
                  background: "#F8FAFC",
                }}
              >
                <TableRow>
                  {[...columns, " "]?.map((column, index) => (
                    <TableCell key={index} style={{ padding: "13px" }}>
                      <div
                        style={{
                          fontFamily: "Inter",
                          fontWeight: 600,
                          fontSize: 14,
                          color: "#000000",
                        }}
                        data-testid="goal_table_header_cell"
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <p style={{ margin: "0px" }}>{column}</p>
                        </div>
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody
                sx={{
                  pointerEvents: storeMonthlyBreakdownLoading ? "none" : "auto",
                }}
              >
                {storePlanningsData?.goals?.map((item, index) => (
                  <GoalsTableRow
                    key={index}
                    data={item}
                    onClick={() => (isEditModeOn ? () => {} : onClickRow(item))}
                    onAddGoal={() => setEditableRow(item.month)}
                    activeRowGoal={activeRowGoal}
                    onChangeGoal={onChangeGoal}
                    selected={selectedRow}
                    editableRow={editableRow}
                    expendedRow={expendedRow}
                  />
                ))}
                {storePlanningsData?.goals?.length && (
                  <GoalsTableRow
                    key={storePlanningsData?.goals?.length}
                    data={get_aggregated_sum(storePlanningsData)}
                    onClick={() =>
                      onClickRow(get_aggregated_sum(storePlanningsData))
                    }
                    selected={selectedRow}
                  />
                )}
              </TableBody>
            </GoalTable>
          </StyledTableContainer>

          <TableFooterContainer ref={myRef}>
            {isEditModeOn ? (
              <>
                <Button
                  variant="contained"
                  sx={{
                    background: "#5FAFFE",
                    borderRadius: "8px",
                    height: "28px",
                    marginRight: 2,
                  }}
                  onClick={onSave}
                >
                  {" "}
                  Save
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    background: "#8f9499",
                    borderRadius: "8px",
                    height: "28px",
                    marginRight: 2,
                  }}
                  onClick={onCancel}
                >
                  {" "}
                  Cancel
                </Button>
              </>
            ) : value !== "all" ? (
              <Button
                variant="contained"
                sx={{
                  background: !selectedRow ? "#D4D8DD" : "#5FAFFE",
                  borderRadius: "8px",
                  height: "28px",
                }}
                onClick={() => onEdit()}
                disabled={!selectedRow}
              >
                Edit
              </Button>
            ) : null}
          </TableFooterContainer>
        </>
      )}

      <Snackbar
        open={snackbarState.open}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message={snackbarState.message}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </GoalsTableContainer>
  );
};

export default GoalsTable;
