import { Box, CssBaseline, Paper as MuiPaper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { spacing } from "@mui/system";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components/macro";

import Footer from "../components/Footer";
import GlobalStyle from "../components/GlobalStyle";
import Settings from "../components/Settings";
import Sidebar from "../components/sidebar/Sidebar";
import dashboardItems from "../components/sidebar/dashboardItems";
import { ResultsProvider } from "../contexts/ResultsContext";

const Root = styled.div`
  display: flex;
  min-height: 100vh;
`;

const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  overflow: hidden;
`;

const Paper = styled(MuiPaper)(spacing);

const MainContent = styled(Paper)`
  flex: 1;
  background: ${(props) => props.theme.palette.background.default};

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }

  .MuiPaper-root .MuiPaper-root {
    box-shadow: none;
  }
`;

const Dashboard = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Root>
      <ResultsProvider>
        <CssBaseline />
        <GlobalStyle />
        <Box sx={{ display: { xs: "block", lg: "none" } }}>
          <Sidebar
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            items={dashboardItems}
          />
        </Box>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Sidebar items={dashboardItems} />
        </Box>
        <AppContent>
          <MainContent p={isLgUp ? 12 : 5}>
            {children}
            <Outlet />
          </MainContent>
          <Footer />
        </AppContent>
        <Settings />
      </ResultsProvider>
    </Root>
  );
};

export default Dashboard;
