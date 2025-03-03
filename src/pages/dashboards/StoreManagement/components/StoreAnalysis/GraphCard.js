import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import {
  Box,
  CircularProgress,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import styled from "styled-components";

const Container = styled(Box)`
  width: 32%;
  border: 2px solid ${(p) => (p.active === "true" ? "#3F73E5" : "#E2E8F0")};
  padding: 20px;
  border-radius: 8px;
`;

const TitleContainer = styled(Stack)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled(Typography)`
  font: 600 16px "Inter", sans-serif;
`;

const TitleIcon = styled(FiberManualRecordIcon)`
  font-size: 15px;
  color: ${(p) => p.color};
`;

const Amount = styled(Typography)`
  font: 600 24px "Inter", sans-serif;
  color: #0f172a;
  margin-top: 8px;
`;

const Units = styled(Typography)`
  font: 14px "Inter", sans-serif;
  color: #475569;
  margin: 4px 0;
`;

const GraphCard = ({
  title,
  amount,
  units,
  accentColor,
  active,
  date,
  isLoading,
}) => (
  <Container active={active}>
    <TitleContainer>
      <Title>{title}</Title>
      {date}
      <TitleIcon color={accentColor} />
    </TitleContainer>
    <Amount>
      {!isLoading ? (
        `$ ${amount}`
      ) : (
        <Skeleton width={150} variant="rectangular" height={15} />
      )}
    </Amount>
    <Units>
      {" "}
      {!isLoading ? (
        `${units} units`
      ) : (
        <Skeleton width={150} variant="rectangular" height={15} />
      )}{" "}
    </Units>
  </Container>
);

<CircularProgress size={20} />;

export default GraphCard;
