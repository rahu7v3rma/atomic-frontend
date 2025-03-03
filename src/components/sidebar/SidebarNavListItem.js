import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Alert,
  Chip,
  Collapse,
  Grid,
  ListItemButton,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { darken, rgba } from "polished";
import React, { forwardRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";

import { atomicConfig } from "../../config";
import { /*fetchBrand,*/ resetBrand } from "../../redux/slices/brand";
// import { fetchBrands } from "../../redux/slices/brands";
import { call_api_auth } from "../../utils/services";
import ConfirmDialog from "../alerts/ConfirmDialog";

// import the useDispatch Redux hook

// import our fetchBrand thunk

// import our fetchBrands thunk

const CustomRouterLink = forwardRef((props, ref) => (
  <div ref={ref}>
    <NavLink {...props} />
  </div>
));

const Item = styled(ListItemButton)`
  padding-top: ${(props) =>
    props.theme.spacing(props.depth && props.depth > 0 ? 2 : 3)};
  padding-bottom: ${(props) =>
    props.theme.spacing(props.depth && props.depth > 0 ? 2 : 3)};
  padding-left: ${(props) =>
    props.sidebarExpanded &&
    props.theme.spacing(props.depth && props.depth > 0 ? 14 : 8)};
  padding-right: ${(props) =>
    props.sidebarExpanded &&
    props.theme.spacing(props.depth && props.depth > 0 ? 4 : 7)};
  font-weight: ${(props) => props.theme.typography.fontWeightRegular};
  svg {
    color: ${(props) => props.theme.sidebar.color};
    font-size: 20px;
    width: 20px;
    height: 20px;
    opacity: 0.5;
  }
  &:hover {
    background: rgba(0, 0, 0, 0.08);
    color: ${(props) => props.theme.sidebar.color};
  }
  &.${(props) => props.activeclassname} {
    background-color: ${(props) =>
      darken(0.03, props.theme.sidebar.background)};
    span {
      color: ${(props) => props.theme.sidebar.color};
    }
  }
`;

const Title = styled(ListItemText)`
  margin: 0;
  span {
    color: ${(props) =>
      rgba(
        props.theme.sidebar.color,
        props.depth && props.depth > 0 ? 0.7 : 1
      )};
    font-size: ${(props) => props.theme.typography.body1.fontSize}px;
    padding: 0 ${(props) => props.theme.spacing(4)};
  }
`;

const Badge = styled(Chip)`
  font-weight: ${(props) => props.theme.typography.fontWeightBold};
  height: 20px;
  position: absolute;
  right: 26px;
  top: 12px;
  background: ${(props) => props.theme.sidebar.badge.background};
  z-index: 1;
  span.MuiChip-label,
  span.MuiChip-label:hover {
    font-size: 11px;
    cursor: pointer;
    color: ${(props) => props.theme.sidebar.badge.color};
    padding-left: ${(props) => props.theme.spacing(2)};
    padding-right: ${(props) => props.theme.spacing(2)};
  }
`;

const ExpandLessIcon = styled(ExpandLess)`
  color: ${(props) => rgba(props.theme.sidebar.color, 0.5)};
`;

const ExpandMoreIcon = styled(ExpandMore)`
  color: ${(props) => rgba(props.theme.sidebar.color, 0.5)};
`;

const SidebarNavListItem = (props) => {
  const {
    title,
    /*url,*/
    href,
    depth = 0,
    children,
    icon: Icon,
    badge,
    type,
    open: openProp = false,
    expanded = true,
  } = props;

  const [open, setOpen] = React.useState(openProp);
  const [errors, setErrors] = React.useState("");
  const [confirmDialog, setConfirmDialog] = React.useState({
    isOpen: false,
    title: "",
    subtitle: "",
  });

  const handleToggle = () => {
    setOpen((state) => !state);
  };

  // initialize the redux hook
  const dispatch = useDispatch();

  // const getBrand = (name) => {
  //   dispatch(fetchBrand(name, false));
  // };

  const showDialog = (name) => {
    setConfirmDialog({
      isOpen: true,
      title: "Are you sure you want to delete " + name + "?",
      subtitle:
        "This action will remove all brand data from database and is not reversible",
      onConfirm: () => {
        deleteBrand(name);
      },
    });
  };

  const newReport = () => {
    dispatch(resetBrand());
  };

  async function deleteBrand(name) {
    console.log("deleting data for brand " + name);
    setConfirmDialog({ ...confirmDialog, isOpen: false });
    try {
      let result = await call_api_auth(
        `${atomicConfig.brandScoreCardServiceUrl}/delete/${name}`,
        "GET"
      );
      result = result.data;
      if (result.message !== undefined) {
        setErrors(result.message);
      } else {
        if (result.success) {
          // dispatch(fetchBrands());
          setErrors(null);
        }
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      setErrors(message);
    }
  }

  if (children) {
    return (
      <React.Fragment>
        <Item
          depth={depth}
          onClick={expanded ? handleToggle : null}
          sidebarExpanded={expanded}
        >
          {Icon && (
            <Tooltip title={title}>
              <Icon />
            </Tooltip>
          )}
          {expanded && (
            <Title depth={depth}>
              {title}
              {badge && <Badge label={badge} />}
            </Title>
          )}
          {expanded && (open ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
        </Item>
        <Collapse in={expanded && open}>{children}</Collapse>
      </React.Fragment>
    );
  }

  let path = href;
  if (type === "brand" || type === "new_report") {
    path += `/${title.replace(" ", "")}`;
  }

  return (
    <React.Fragment>
      <Item
        depth={depth}
        component={CustomRouterLink}
        to={path}
        activeclassname="active"
        sidebarExpanded={expanded}
      >
        {Icon && (
          <Icon
            onClick={
              expanded && type === "brand"
                ? () => showDialog(title)
                : type === "new_report"
                ? () => newReport()
                : undefined
            }
          />
        )}
        {expanded && (
          <Title
            depth={depth}
            onClick={
              // type === "brand" ? () => getBrand(url) :
              type === "new_report" ? () => newReport() : undefined
            }
          >
            {title}
            {badge && <Badge label={badge} />}
          </Title>
        )}
      </Item>

      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />

      <Grid item xs>
        {errors && (
          <Alert mt={2} mb={3} severity="warning">
            {errors}
          </Alert>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default SidebarNavListItem;
