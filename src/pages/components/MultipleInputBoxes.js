import {
  AddCircle as AddCircleIcon,
  Addchart as AddchartIcon,
  Menu as MenuIcon,
  RemoveCircle as RemoveCircleIcon,
} from "@mui/icons-material";
import WarningIcon from "@mui/icons-material/Warning";
import {
  Button,
  Grid,
  InputBase,
  AppBar as MuiAppBar,
  IconButton as MuiIconButton,
  Toolbar,
  Tooltip,
} from "@mui/material";
import { darken } from "polished";
import React from "react";
// import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components/macro";

const AppBar = styled(MuiAppBar)`
  background: transparent;
  color: ${(props) => props.theme.header.color};
  margin-left: 10px;
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
  width: 50%;
  margin-top: 5px;

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
    padding-top: ${(props) => props.theme.spacing(5)};
    padding-right: ${(props) => props.theme.spacing(2.5)};
    padding-bottom: ${(props) => props.theme.spacing(5)};
    padding-left: ${(props) => props.theme.spacing(12)};
    // width: 160px;
  }
`;

const InputControlsContainer = styled.div`
  display: flex;
`;

const FetchStatusButton = styled(Button)`
  height: 40px;
  align-self: center;
  margin-left: 5px;
`;

const FetchMessageDiv = styled.div`
  display: inline-flex;
  align-items: center;
  color: rgb(102, 60, 0);
  background-color: rgb(255, 244, 229);
  padding: 5px 10px;
  margin-left: 20px;
`;

const FetchMessageSpan = styled.span`
  margin-left: 10px;
`;

const MultipleInputBoxes = ({
  onDrawerToggle,
  name,
  max_inputs,
  inputsList,
  setInputsList,
  placeholder,
}) => {
  const { t } = useTranslation();

  const handleAddInputs = (_e, _idx) => {
    if (inputsList.length < max_inputs) {
      setInputsList([...inputsList, { [name]: "", status: null }]);
    }
  };

  const handleRemoveInput = (e, idx) => {
    const list = [...inputsList];
    list.splice(idx, 1);
    setInputsList(list);
  };

  const handleInputsChange = (e, idx) => {
    e.preventDefault();
    let list = [...inputsList];
    list[idx][name] = e.target.value;
    setInputsList(list);
  };

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
              onClick={onDrawerToggle}
              size="large"
            >
              <MenuIcon />
            </IconButton>
          </Grid>
          <Grid item xs={true}>
            {inputsList.map((input, idx) => (
              <InputControlsContainer>
                <SearchBox key={idx}>
                  <SearchIconWrapper>
                    <AddchartIcon />
                  </SearchIconWrapper>
                  <Input
                    placeholder={t(placeholder)}
                    // name="search_data"
                    // ref={search_data}
                    value={inputsList[idx][name]}
                    onChange={(e) => {
                      handleInputsChange(e, idx);
                    }}
                  />
                </SearchBox>
                {idx !== max_inputs - 1 ? (
                  <Tooltip title={`Add ${name} to report`}>
                    <IconButton
                      color="inherit"
                      aria-label="Open drawer"
                      onClick={(e) => handleAddInputs(e, idx)}
                      size="large"
                    >
                      <AddCircleIcon />
                    </IconButton>
                  </Tooltip>
                ) : null}
                {idx > 0 ? (
                  <Tooltip title={`Remove ${name} from report`}>
                    <IconButton
                      color="inherit"
                      aria-label="Open drawer"
                      onClick={(e) => handleRemoveInput(e, idx)}
                      size="large"
                    >
                      <RemoveCircleIcon />
                    </IconButton>
                  </Tooltip>
                ) : null}
                {input.status && (
                  <FetchStatusButton
                    color={
                      input.status === "Fetch Complete" ? "success" : "info"
                    }
                    variant="contained"
                  >
                    {input.status}
                  </FetchStatusButton>
                )}
                {input.message && (
                  <FetchMessageDiv>
                    <WarningIcon />
                    <FetchMessageSpan>{input.message}</FetchMessageSpan>
                  </FetchMessageDiv>
                )}
              </InputControlsContainer>
            ))}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default MultipleInputBoxes;
