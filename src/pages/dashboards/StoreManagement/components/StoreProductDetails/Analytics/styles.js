import { Grid } from "@mui/material";
import styled from "styled-components";

const s = {
  flex: ({ d, j, a }) => {
    return {
      display: "flex",
      flexDirection: d,
      justifyContent: j,
      alignItems: a,
    };
  },
  inter: ({ s, w, c }) => {
    return { fontFamily: "Inter", fontWeight: w, fontSize: s, color: c };
  },
};

export const DatePickerGrid = styled(Grid)`
  display: flex;
  justify-content: flex-end;
`;

export default s;
