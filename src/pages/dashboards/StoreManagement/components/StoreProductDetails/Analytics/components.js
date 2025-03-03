import AssessmentIcon from "@mui/icons-material/Assessment";
import AttachMoney from "@mui/icons-material/AttachMoney";
import Campaign from "@mui/icons-material/Campaign";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import FilterAlt from "@mui/icons-material/FilterAlt";
import InfoIcon from "@mui/icons-material/Info";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import SouthWestIcon from "@mui/icons-material/SouthWest";
import {
  Box,
  Divider,
  Grid,
  Typography as MuiTypography,
  Skeleton,
  Stack,
  Tooltip,
} from "@mui/material";
import styled from "styled-components/macro";

import s from "./styles";

const Typography = styled(MuiTypography)`
  text-decoration: ${(p) => (p.$strike ? "line-through" : "")};
`;
const getLogo = (e1, c1) => {
  if (e1 === "Sales") {
    return <AttachMoney sx={{ marginRight: 1, color: c1, fontSize: 30 }} />;
  } else if (e1 === "Orders") {
    return <ShoppingCart sx={{ marginRight: 1, color: c1, fontSize: 30 }} />;
  } else if (e1 === "Conversion Rate") {
    return <FilterAlt sx={{ marginRight: 1, color: c1, fontSize: 30 }} />;
  } else if (e1 === "Ads Spent") {
    return <Campaign sx={{ marginRight: 1, color: c1, fontSize: 30 }} />;
  } else {
    return <AssessmentIcon sx={{ marginRight: 1, color: c1, fontSize: 30 }} />;
  }
};
export const SectionFirstCard = ({
  e1,
  e2,
  e3,
  e4,
  e5,
  e6,
  e7,
  c1,
  active,
  decrease,
  content,
  strikeE2 = false,
  strikeE3 = false,
  strikeE5 = false,
  strikeE7 = false,
  isLoading = false,
}) => {
  return (
    <Grid
      container
      sx={{
        p: 4,
        borderRadius: 2,
        border: active ? "1px solid #3F73E5" : "1px solid #E2E8F0",
        width: "24%",
        ...s.flex({ d: "column" }),
      }}
    >
      <Grid item sx={{ mt: 2, ...s.flex({ d: "row", a: "center" }) }}>
        {getLogo(e1, c1)}

        <Box
          sx={{
            width: 155,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography sx={s.inter({ s: 16, w: 600, c: "#0F172A" })}>
            {e1}
          </Typography>
          <Tooltip
            placement="right"
            arrow
            title={
              <Box
                sx={{
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontSize: 12,
                  padding: 1,
                  width: "185px",
                }}
                data-testid="2nd_3rd_column_tooltip_menu"
              >
                <Typography>{content}</Typography>
              </Box>
            }
          >
            <InfoIcon
              sx={{
                width: "18px",
                height: "18px",
                color: "#CBD5E1",
                marginLeft: "5px",
              }}
              data-testid="2nd_3rd_columns_tooltip"
            />
          </Tooltip>
        </Box>
      </Grid>
      <Grid item sx={{ pt: 2 }}>
        <Typography
          $strike={strikeE2}
          sx={s.inter({ s: 24, w: 600, c: "#0F172A" })}
        >
          {isLoading ? <Skeleton variant="rectangular" height={15} /> : e2}
        </Typography>
      </Grid>
      <Grid item>
        {isLoading ? (
          <>
            <br />
            <Skeleton variant="rectangular" height={15} />
          </>
        ) : (
          <Stack
            sx={{
              px: 1,
              py: 0.2,
              borderRadius: 2,
              ...s.flex({ d: "row", a: "center" }),
              backgroundColor: decrease ? "#FEE2E2" : "#DCFCE7",
              width: "max-content",
            }}
          >
            {decrease ? (
              <SouthWestIcon
                sx={{ fontSize: 12, color: "#DC2626", marginRight: 0.5 }}
                data-testid={e1 + "_i2"}
              />
            ) : (
              <NorthEastIcon
                sx={{ fontSize: 12, color: "#16A34A", marginRight: 0.5 }}
                data-testid={e1 + "_i2"}
              />
            )}
            <Typography
              $strike={strikeE3}
              sx={{
                ...s.inter({
                  s: 12,
                  w: 600,
                  c: decrease ? "#DC2626" : "#16A34A",
                }),
              }}
            >
              {e3}
            </Typography>
          </Stack>
        )}
      </Grid>
      <Divider sx={{ mt: 5, mb: 2 }} />
      <Grid item sx={{ mt: 3, ...s.flex({ d: "row", j: "space-between" }) }}>
        <Typography sx={s.inter({ s: 14, c: "#64748B" })}>{e4}</Typography>
        <Typography
          $strike={strikeE5}
          sx={s.inter({ s: 14, w: 600, c: "#0F172A" })}
        >
          {isLoading ? (
            <Skeleton variant="rectangular" height={15} width={80} />
          ) : (
            e5
          )}
        </Typography>
      </Grid>
      <Grid
        item
        sx={{ mb: 2, mt: 2, ...s.flex({ d: "row", j: "space-between" }) }}
      >
        <Typography sx={s.inter({ s: 14, c: "#64748B" })}>{e6}</Typography>
        <Typography
          $strike={strikeE7}
          sx={s.inter({ s: 14, w: 600, c: "#0F172A" })}
        >
          {isLoading ? (
            <Skeleton variant="rectangular" height={15} width={80} />
          ) : (
            e7
          )}
        </Typography>
      </Grid>
    </Grid>
  );
};

export const SectionLastCard = ({ e1, e2, e3, c1, active, date }) => (
  <Box
    sx={{
      width: "32%",
      border: active ? "2px solid #3F73E5" : "2px solid #E2E8F0",
      p: 5,
      borderRadius: 2,
    }}
  >
    <Stack sx={s.flex({ d: "row", j: "space-between", a: "center" })}>
      <Typography sx={s.inter({ s: 16, w: 600 })}>{e1}</Typography>
      {date}

      <FiberManualRecordIcon
        sx={{ fontSize: 15, color: c1 }}
        data-testid={e1 + "_i1"}
      />
    </Stack>
    <Typography
      sx={{ ...s.inter({ s: 24, w: 600, c: "#0F172A" }), marginTop: 2 }}
    >
      {e2}
    </Typography>
    <Typography
      sx={{
        ...s.inter({ s: 14, c: "#475569" }),
        marginTop: 0.5,
        marginBottom: 1,
      }}
    >
      {e3}
    </Typography>
  </Box>
);
