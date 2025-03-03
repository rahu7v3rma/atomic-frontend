import {
  Box,
  Skeleton,
  Table,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import {
  fetchStoreMonthlyBreakdown,
  storeAnalyticsSelector,
} from "../../../../../redux/slices/store_analytics";
import { months } from "../../constants";

const TableRowStyled = styled(TableRow)`
  &.Mui-selected {
    background-color: #d3e9ff !important;
  }
`;

const TableCellStyled = styled(TableCell)`
  font-family: Inter;
  font-weight: 600;
  font-size: 14px;
  color: #000000;
  padding: 21px 16px;
`;

const InnerTableCellStyled = styled(TableCell)`
  font-family: Inter;
  font-weight: 400;
  font-size: 14px;
  color: #000000;
  width: 6.6%;
  // padding: 0px 30px;
  // max-width: 50px;
`;

const GoalText = styled.p`
  padding: 0;
  margin: 0;
`;

const InputStyled = styled.input`
  width: 60px;
`;

const PredictedChart = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const BorderLinearProgress = styled(LinearProgress)(({ goalColor }) => ({
  height: 10,
  width: "150px",
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#eeeeee",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: goalColor,
  },
}));

const GoalsTableRow = ({
  data,
  onClick,
  selected,
  editableRow,
  onChangeGoal,
  activeRowGoal,
  expendedRow,
}) => {
  const [lineExpended, setLineExpended] = useState(expendedRow);
  const dispatch = useDispatch();

  const onExpand = (shouldFetch = false) => {
    setLineExpended(!lineExpended);
    if (shouldFetch && !storeMonthlyBreakdownLoading && !lineExpended) {
      dispatch(
        fetchStoreMonthlyBreakdown({
          month: data.month_,
          year: data.year,
        })
      );
    }
  };

  const showTodayPrecentage = () => {
    return data.month_ && data.month === months[new Date().getMonth()];
  };

  const precentageGoalToday = () => {
    let monthDays = new Date(
      data.year,
      data.month_ ? data.month_ : new Date().getMonth() + 1,
      0
    ).getDate();
    let res =
      Math.round(
        ((monthDays - data.days_left - 0) / monthDays) * 100
      ).toString() + "%";
    return res;
  };

  const calcRelativeGoal = () => {
    let monthDays = new Date(
      data.year,
      data.month_ ? data.month_ : new Date().getMonth() + 1,
      0
    ).getDate();
    let daysPassed =
      data.month === new Date().toLocaleString("default", { month: "long" })
        ? monthDays - data.days_left - 0 //no need for compensation, server returns in us pacific time
        : monthDays - data.days_left;
    let PrecentageMonthPassed = daysPassed / monthDays;
    return data.actual_vs_goal / PrecentageMonthPassed;
  };

  const progressColor = (light) => {
    let relativeGoal = Math.round(calcRelativeGoal());
    if (relativeGoal > 99) {
      return light ? "LightGreen" : "green";
    } else if (relativeGoal < 50 && relativeGoal > 0) {
      return light ? "LightCoral" : "red";
    } else if (relativeGoal === 0) {
      return "lightblue";
    } else {
      return light ? "LightBlue" : "#6495ed";
    }
  };

  const { storeMonthlyBreakdownData, storeMonthlyBreakdownLoading } =
    useSelector(storeAnalyticsSelector);

  const innerTable = data.month_ ? false : true;
  return (
    <>
      <TableRowStyled
        style={{ padding: 0, borderWidth: 1, width: "500px" }}
        onClick={onClick}
        selected={selected === data.month ? true : false}
      >
        {innerTable ? (
          <InnerTableCellStyled>{data.store}</InnerTableCellStyled>
        ) : (
          <TableCellStyled>{data.month}</TableCellStyled>
        )}
        <TableCell style={innerTable ? { width: "7.0%" } : {}}>
          {editableRow !== data.month ? (
            <GoalText>{`$${new Intl.NumberFormat().format(
              Math.floor(parseInt(data.goal))
            )}`}</GoalText>
          ) : null}
          {editableRow === data.month ? (
            <InputStyled
              defaultValue={new Intl.NumberFormat().format(
                Math.floor(parseInt(data.goal))
              )}
              value={activeRowGoal}
              onChange={onChangeGoal}
            />
          ) : null}
        </TableCell>
        <TableCell style={innerTable ? { width: "7.0%" } : {}}>
          {`$${new Intl.NumberFormat().format(Math.floor(data.sales_to_date))}`}
        </TableCell>
        <TableCell style={innerTable ? { width: "8.1%" } : {}}>
          {`$${new Intl.NumberFormat().format(
            Math.floor(data.last_year_same_month)
          )}`}
        </TableCell>
        <TableCell style={innerTable ? { width: "4.3%" } : {}}>
          {data.days_left}
        </TableCell>
        <TableCell>
          <PredictedChart>
            <div>
              <Typography
                style={{
                  display: "inline-block",
                  width: "40px",
                  color: progressColor(false),
                }}
              >
                {`${Math.round(data.actual_vs_goal)}%`}
              </Typography>
              <Typography
                style={{
                  display: "inline-block",
                  position: "relative",
                  marginLeft: showTodayPrecentage() ? -10 : 0,
                  fontSize: 10,
                  color: "gray",
                }}
              >
                {showTodayPrecentage() ? `/ ${precentageGoalToday()}` : ""}
              </Typography>
            </div>
            <BorderLinearProgress
              variant="determinate"
              value={
                data.actual_vs_goal !== undefined
                  ? data.actual_vs_goal > 100
                    ? 100
                    : data.actual_vs_goal
                  : 0
              }
              style={{
                opacity: data.actual_vs_goal === 0 ? 0.5 : 1,
              }}
              goalColor={progressColor(true)}
            />
          </PredictedChart>
        </TableCell>
        {data.store === "all" ? (
          <TableCell align="center">
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => {
                onExpand(true);
              }}
            >
              <div
                style={{
                  transform:
                    lineExpended && selected === data.month
                      ? "rotate(90deg)"
                      : null,
                }}
              >
                <img
                  src="/static/img/random/arrow-forward.svg"
                  alt="arrow-forward"
                />
              </div>
            </IconButton>
          </TableCell>
        ) : (
          <TableCell style={innerTable ? { width: "10%" } : {}}>
            {data.profit_to_date && data.profit_to_date !== ""
              ? `$${new Intl.NumberFormat().format(
                  Math.floor(parseInt(data.profit_to_date))
                )}`
              : null}
          </TableCell>
        )}
      </TableRowStyled>
      <TableRowStyled>
        <TableCell
          align="right"
          style={{ padding: 0, borderBottom: 0 }}
          colSpan={10}
        >
          <Collapse
            in={lineExpended && selected === data.month}
            timeout="auto"
            unmountOnExit
            style={{ padding: 0, borderBottom: 0 }}
          >
            <Box sx={{ margin: 1 }}>
              {storeMonthlyBreakdownLoading ? (
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
                <Table
                  size="small"
                  aria-label="purchases"
                  style={{ tableLayout: "fixed", width: "186%" }}
                >
                  <TableHead style={{ backgroundColor: "#F5F5F5" }}>
                    {storeMonthlyBreakdownData?.goals?.map((item, index) => (
                      <GoalsTableRow
                        key={index}
                        data={item}
                        onClick={null}
                        onAddGoal={null}
                        activeRowGoal={null}
                        onChangeGoal={null}
                        selected={null}
                        editableRow={false}
                        breakdownData={null}
                      />
                    ))}
                  </TableHead>
                </Table>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRowStyled>
    </>
  );
};
export default GoalsTableRow;
