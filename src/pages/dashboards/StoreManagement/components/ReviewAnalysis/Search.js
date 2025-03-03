import {
  Menu as MenuIcon,
  QueryStats as QueryStatsIcon,
} from "@mui/icons-material";
import {
  Alert,
  Grid,
  InputBase,
  AppBar as MuiAppBar,
  IconButton as MuiIconButton,
  Toolbar,
  Tooltip,
} from "@mui/material";
import { darken } from "polished";
import React, { useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Search as SearchIcon } from "react-feather";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import styled from "styled-components/macro";

import { appConfig } from "../../../../../config";
import ResultsContext from "../../../../../contexts/ResultsContext";
import {
  fetchAllReviewsReports,
  fetchAsinReviewsReport,
} from "../../../../../redux/slices/reviews";
import MultipleInputBoxes from "../../../../components/MultipleInputBoxes";
// import axios from "axios";
// import NavbarNotificationsDropdown from "./NavbarNotificationsDropdown";
// import NavbarMessagesDropdown from "./NavbarMessagesDropdown";
// import NavbarLanguagesDropdown from "./NavbarLanguagesDropdown";

// import the useDispatch Redux hook

// import our fetchBrand thunk

// for local testing
// import brand_data from "./new_brand.json";
// commenting unused
// const Cards = styled(Card)`
//   margin-top: -35px;
// `;
const AppBar = styled(MuiAppBar)`
  background: ${(props) => props.theme.header.background};
  color: ${(props) => props.theme.header.color};
  margin-left: auto;
  margin-right: auto;
  width: 97%;
`;

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

const SearchBox = styled.div`
  border-radius: 2px;
  background-color: ${(props) => props.theme.header.background};
  display: none;
  position: relative;
  width: 100%;

  &:hover {
    background-color: ${(props) => darken(0.05, props.theme.header.background)};
  }

  ${(props) => props.theme.breakpoints.up("md")} {
    display: block;
  }
`;

const SearchIconWrapper = styled.div`
  width: 50px;
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 22px;
    height: 22px;
  }
`;

const Input = styled(InputBase)`
  color: inherit;
  width: 100%;

  > input {
    color: ${(props) => props.theme.header.search.color};
    padding-top: ${(props) => props.theme.spacing(2.5)};
    padding-right: ${(props) => props.theme.spacing(2.5)};
    padding-bottom: ${(props) => props.theme.spacing(2.5)};
    padding-left: ${(props) => props.theme.spacing(12)};
    width: 160px;
  }
`;

const Search = () => {
  // const navigate = useNavigate();
  const [textInput, setTextInput] = useState("");
  const [asinsList, setAsinsList] = useState([{ asin: "" }]);
  const { handleDrawerToggle, reviewsErrorMessage } =
    useContext(ResultsContext);

  const max_asins = appConfig.max_asins;

  const dispatch = useDispatch();

  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchAllReviewsReports());
  }, [dispatch]);

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  };

  async function search(e) {
    e.preventDefault();
    dispatch(fetchAsinReviewsReport(textInput, asinsList));
  }

  return (
    <React.Fragment>
      <AppBar position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={0}>
            <Grid item sx={{ display: { xs: "block", md: "none" } }}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={handleDrawerToggle}
                size="large"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs={true}>
              <form onSubmit={(e) => search(e)}>
                <SearchBox>
                  <SearchIconWrapper>
                    <QueryStatsIcon />
                  </SearchIconWrapper>
                  <Input
                    placeholder={t("Search Asin...")}
                    // name="search_data"
                    // ref={search_data}
                    onChange={handleTextInputChange}
                  />
                </SearchBox>
              </form>
            </Grid>
            <Grid item xs alignItems="center">
              <Tooltip title="Load review analysis report">
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={(e) => search(e)}
                  size="large"
                >
                  <SearchIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item xs>
              {reviewsErrorMessage && (
                <Alert mt={2} mb={3} severity="warning">
                  {reviewsErrorMessage}
                </Alert>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <br />
      <MultipleInputBoxes
        onDrawerToggle={handleDrawerToggle}
        name="asin"
        search={search}
        max_inputs={max_asins}
        inputsList={asinsList}
        setInputsList={setAsinsList}
        placeholder="Search competing asin..."
        inputErrorMessage={null}
      />
    </React.Fragment>
  );
};

export default Search;
