import { Grid, AppBar as MuiAppBar, Tab, Tabs, Toolbar } from "@mui/material";
import React, { useContext } from "react";
import styled from "styled-components/macro";

import NavbarUserDropdown from "../../../../../components/navbar/NavbarUserDropdown";
import ResultsContext from "../../../../../contexts/ResultsContext";

const AppBar = styled(MuiAppBar)`
  background: ${(props) => props.theme.header.background};
  color: ${(props) => props.theme.header.color};
`;

const GridUdd = styled(Grid)`
  position: absolute;
  right: 0;
`;

const Navbar = () => {
  const { navValue, handleNavValueChange } = useContext(ResultsContext);

  return (
    <React.Fragment>
      <AppBar position="sticky" elevation={0}>
        <Toolbar>
          <Grid container alignItems="center">
            <Tabs
              value={navValue}
              indicatorColor="secondary"
              onChange={(e, value) => {
                handleNavValueChange(value);
              }}
            >
              <Tab label="STORE PERFORMANCE" />
              <Tab label="PPC" />
              <Tab label="REVIEW ANALYSIS" />
            </Tabs>
            <GridUdd item>
              {/* <NavbarMessagesDropdown />
              <NavbarNotificationsDropdown />
              <NavbarLanguagesDropdown /> */}
              <NavbarUserDropdown />
            </GridUdd>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;
