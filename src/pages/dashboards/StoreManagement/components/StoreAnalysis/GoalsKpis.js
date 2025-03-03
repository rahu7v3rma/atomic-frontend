import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { storeAnalyticsSelector } from "../../../../../redux/slices/store_analytics";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  width: "150px",
  borderRadius: 5,
  border: "solid #FFC0CB",
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#FFC0CB",
  },
}));

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 6px;
`;

const GoalsChartWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CircleWrapper = styled.div`
  position: relative;
`;
const CircleTextWrapper = styled.div`
  width: 100px;
  height: 100px;
`;

const GoalsText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PredictedWrapper = styled.div`
  width: 400px;
  height: 50px;
  border-radius: 10px;
  border: solid #dcdcdc;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const PredictedChart = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  color: #ffc0cb;
`;

const GoalsKpis = () => {
  const { goals, goalsLoading } = useSelector(storeAnalyticsSelector);

  return (
    <>
      <Typography variant="h3" gutterBottom>
        {`Goals and KPIs for ${moment().format("MMMM")}`}
      </Typography>

      <>
        <Container>
          <GoalsChartWrapper>
            <CircleWrapper>
              <CircularProgress
                variant="determinate"
                value={100}
                size={100}
                sx={{
                  position: "absolute",
                  color: "#00FF00",
                  top: 0,
                  left: 0,
                }}
              />
              <CircularProgress
                variant="determinate"
                value={goals.actual_vs_goal > 100 ? 100 : goals.actual_vs_goal}
                size={100}
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  color: "#008000",
                }}
              />
              <CircleTextWrapper>
                <Typography
                  sx={{
                    position: "absolute",
                    top: "50%",
                    right: "50%",
                    transform: "translate(50%, -50%)",
                  }}
                >
                  {`${goals.actual_vs_goal ? goals.actual_vs_goal : "0 "} %`}
                </Typography>
              </CircleTextWrapper>
            </CircleWrapper>
          </GoalsChartWrapper>
          {goalsLoading ? (
            <div style={{ align: "left" }}>
              <Skeleton
                width={200}
                sx={{ mb: 5 }}
                variant="rectangular"
                height={15}
              />
              <Skeleton
                width={200}
                sx={{ mb: 5 }}
                variant="rectangular"
                height={15}
              />
              <Skeleton
                width={200}
                sx={{ mb: 5 }}
                variant="rectangular"
                height={15}
              />
              <Skeleton
                width={200}
                sx={{ mb: 5 }}
                variant="rectangular"
                height={15}
              />
            </div>
          ) : (
            <GoalsText>
              <Typography variant="body1" gutterBottom>
                {`You've made `}
                {goals.sales_to_date !== undefined ? (
                  <strong>${goals.sales_to_date.toLocaleString()}</strong>
                ) : (
                  "- "
                )}
                {` out of `}
                {goals.monthly_goal !== undefined ? (
                  <strong>${goals.monthly_goal.toLocaleString()}</strong>
                ) : (
                  "- "
                )}
                {` monthly goal. `}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {`To hit your goal your daily target should be `}
                {goals.daily_goal !== undefined ? (
                  <strong>${goals.daily_goal.toLocaleString()}</strong>
                ) : (
                  "- "
                )}
              </Typography>
              <Typography variant="body3" gutterBottom>
                {`There are `}
                {goals.days_left !== undefined ? (
                  <strong>{goals.days_left}</strong>
                ) : (
                  "- "
                )}
                {` days left to get it done!`}
              </Typography>
            </GoalsText>
          )}
        </Container>
        <PredictedWrapper>
          <Typography>
            {`End of month forecast `}
            {goals.predicted_pace !== undefined ? (
              <strong>${goals.predicted_pace.toLocaleString()}</strong>
            ) : (
              "-"
            )}{" "}
          </Typography>
          <PredictedChart>
            <Typography>
              {`${goals.pace_bar !== undefined ? goals.pace_bar : "- "}%`}{" "}
            </Typography>
            <BorderLinearProgress
              variant="determinate"
              value={
                goals.pace_bar !== undefined
                  ? goals.pace_bar > 100
                    ? 100
                    : goals.pace_bar
                  : 0
              }
            />
          </PredictedChart>
        </PredictedWrapper>
      </>
    </>
  );
};

export default GoalsKpis;
