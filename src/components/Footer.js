import {
  Grid,
  List,
  ListItemButton as MuiListItemButton,
  ListItemText as MuiListItemText,
} from "@mui/material";
import * as React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";

const Wrapper = styled.div`
  padding: ${(props) => props.theme.spacing(0.25)}
    ${(props) => props.theme.spacing(4)};
  background: ${(props) => props.theme.footer.background};
  position: relative;
`;

const ListItemButton = styled(MuiListItemButton)`
  display: inline-block;
  width: auto;
  padding-left: ${(props) => props.theme.spacing(2)};
  padding-right: ${(props) => props.theme.spacing(2)};

  &,
  &:hover,
  &:active {
    color: #ff0000;
  }
`;

const ListItemText = styled(MuiListItemText)`
  span {
    color: ${(props) => props.theme.footer.color};
  }
`;

function Footer() {
  return (
    <Wrapper>
      <Grid container spacing={0}>
        <Grid
          sx={{ display: { xs: "none", md: "block" } }}
          container
          item
          xs={12}
          md={6}
        />
        <Grid container item xs={12} md={6} justifyContent="flex-end">
          <List>
            <ListItemButton component={NavLink} to="/store-management">
              <ListItemText
                primary={`© ${new Date().getFullYear()} - Atomic Growth Dashboard`}
              />
            </ListItemButton>
          </List>
        </Grid>
      </Grid>
    </Wrapper>
  );
}

export default Footer;
