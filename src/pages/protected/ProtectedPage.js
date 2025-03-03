import { Alert as MuiAlert } from "@mui/material";
import { spacing } from "@mui/system";
import React from "react";
import styled from "styled-components/macro";

import Default from "../dashboards/Default";

const Alert = styled(MuiAlert)(spacing);

function ProtectedPage() {
  return (
    <React.Fragment>
      <Alert mb={4} severity="info">
        This page is only visible by authenticated users.
      </Alert>

      <Default />
    </React.Fragment>
  );
}

export default ProtectedPage;
