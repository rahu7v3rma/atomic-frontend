import { CssBaseline } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components/macro";

import GlobalStyle from "../components/GlobalStyle";
import Settings from "../components/Settings";

const Root = styled.div`
  max-width: 520px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

const Auth = ({ children }) => {
  return (
    <Root>
      <CssBaseline />
      <GlobalStyle />
      {children}
      <Outlet />
      <Settings />
    </Root>
  );
};

export default Auth;
