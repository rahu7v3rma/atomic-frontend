import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { ListItemButton, Drawer as MuiDrawer } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";

import { ReactComponent as Logo2 } from "../../vendor/atomic-logo.svg";
import { ReactComponent as Logo } from "../../vendor/logo.svg";

import Footer from "./SidebarFooter";
import SidebarNav from "./SidebarNav";

const drawerWidth = 268;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflow: "visible",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflow: "hidden",
  width: "50px",
});

const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
  borderRight: 0,

  width: `${drawerWidth}px`,
  overflow: "hidden",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const DrawerIconButton = styled(IconButton)`
  color: ${(props) => props.theme.sidebar.background};
  background-color: ${"#F6F9FC"};
  position: absolute;
  right: ${(props) => (props.open ? "-20px" : "5px")};
  top: 70px;
  z-index: 1;

  &:hover {
    color: ${"#F6F9FC"};
    background-color: ${(props) => props.theme.sidebar.background};
  }
`;

const Brand = styled(ListItemButton)`
  font-size: ${(props) => props.theme.typography.h5.fontSize};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
  color: ${(props) => props.theme.sidebar.header.color};
  background-color: ${(props) => props.theme.sidebar.header.background};
  font-family: ${(props) => props.theme.typography.fontFamily};
  min-height: 56px;
  padding: 0;
  padding-top: ${(props) => props.theme.spacing(6)};
  padding-bottom: ${(props) => props.theme.spacing(6)};
  justify-content: center;
  cursor: pointer;
  flex-grow: 0;

  ${(props) => props.theme.breakpoints.up("sm")} {
    min-height: 64px;
  }

  &:hover {
    background-color: ${(props) => props.theme.sidebar.header.background};
  }
`;

const BrandIcon = styled(Logo)`
  margin-right: ${(props) => props.theme.spacing(2)};
  color: ${(props) => props.theme.sidebar.header.brand.color};
  fill: ${(props) => props.theme.sidebar.header.brand.color};
  width: 134px;
  height: auto;
`;

const AtomicIcon = styled(Logo2)`
  height: 30;
  width: 30;
`;

const Sidebar = ({ items, showFooter = false, ...rest }) => {
  const [open, setOpen] = useState(true);

  return (
    <Drawer variant="permanent" open={open} {...rest}>
      <Brand component={NavLink} to="/">
        {open && <BrandIcon />}
        {!open && <AtomicIcon height={30} width={30} />}
      </Brand>
      <DrawerIconButton open={open}>
        {open && <KeyboardDoubleArrowLeftIcon onClick={() => setOpen(false)} />}
        {!open && (
          <KeyboardDoubleArrowRightIcon onClick={() => setOpen(true)} />
        )}
      </DrawerIconButton>
      <SidebarNav items={items} expanded={open} />
      {!!showFooter && <Footer />}
    </Drawer>
  );
};

export default Sidebar;
