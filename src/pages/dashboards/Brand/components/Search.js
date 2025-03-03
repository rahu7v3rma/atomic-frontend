import {
  CloudSync as CloudSyncIcon,
  Menu as MenuIcon,
  QueryStats as QueryStatsIcon,
  Save as SaveIcon,
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
import React, { useContext /*, useState*/ } from "react";
import { Search as SearchIcon } from "react-feather";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import styled from "styled-components/macro";

import NavbarUserDropdown from "../../../../components/navbar/NavbarUserDropdown";
import ResultsContext from "../../../../contexts/ResultsContext";
import { /*fetchBrand,*/ saveBrand } from "../../../../redux/slices/brand";

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
    width: 100%;
  }
`;
const Brands = styled.div`
  color: "#000";
  padding-left: 20;
`;

const Search = () => {
  // const navigate = useNavigate();
  // const [textInput, setTextInput] = useState("");
  const { handleDrawerToggle, brand, errorMessage, fieldChanges } =
    useContext(ResultsContext);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  // async function search(e, override_results) {
  //   e.preventDefault();
  //   // dispatch(fetchBrand(textInput, override_results));
  // }

  // const handleTextInputChange = useCallback((event) => {
  //   setTextInput(event.target.value);
  // }, []);

  const handleSave = () => {
    console.log("saving");
    console.log(fieldChanges);
    dispatch(saveBrand(brand, fieldChanges));
  };

  // const handleDownload = () => {
  //   console.log("downloading file");
  //   console.log(fieldChanges);
  // };

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar>
        <Grid
          container
          // alignItems="center"
          spacing={0}
          // justifyContent="center"
        >
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
            <form /*onSubmit={(e) => search(e, false)}*/>
              <SearchBox>
                <SearchIconWrapper>
                  <QueryStatsIcon />
                </SearchIconWrapper>
                <Input
                  placeholder={t("Search Storefront url...")}
                  // name="search_data"
                  // ref={search_data}
                  // onChange={handleTextInputChange}
                />
              </SearchBox>
            </form>
            <div>
              <Brands />
            </div>
          </Grid>
          <Grid item xs alignItems="center">
            <Tooltip title="Load brand report">
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                // onClick={(e) => search(e, false)}
                size="large"
              >
                <SearchIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Refresh database data">
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                // onClick={(e) => search(e, true)}
                size="large"
              >
                <CloudSyncIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Save to database">
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={handleSave}
                size="large"
              >
                <SaveIcon />
              </IconButton>
            </Tooltip>
            {/* <Tooltip title="Export DISABLED TEMP">
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={handleDownload}
                size="large"
              >
                <FileDownloadIcon />
              </IconButton>
            </Tooltip> */}
          </Grid>
          <Grid item xs>
            {errorMessage && (
              <Alert mt={2} mb={3} severity="warning">
                {errorMessage}
              </Alert>
            )}
          </Grid>
          <Grid item>
            {/* <NavbarMessagesDropdown />
              <NavbarNotificationsDropdown />
              <NavbarLanguagesDropdown /> */}
            <NavbarUserDropdown />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Search;
