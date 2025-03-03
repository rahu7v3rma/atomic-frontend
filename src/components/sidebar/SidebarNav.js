import { Alert, Grid, List } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useState } from "react";
// import { BsFillTrashFill } from "react-icons/bs";
import ReactPerfectScrollbar from "react-perfect-scrollbar";
// import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";

// import { brandsSelector, fetchBrands } from "../../redux/slices/brands";

import Logout from "./Logout";
import SidebarNavSection from "./SidebarNavSection";

// import the useDispatch Redux hook

// import our fetchBrands thunk

import "../../vendor/perfect-scrollbar.css";

const baseScrollbar = css`
  background-color: ${(props) => props.theme.sidebar.background};
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  flex-grow: 1;
`;

const Scrollbar = styled.div`
  ${baseScrollbar}
`;

const PerfectScrollbar = styled(ReactPerfectScrollbar)`
  ${baseScrollbar}
`;

const Items = styled.div`
  padding-top: ${(props) => props.theme.spacing(2.5)};
  padding-bottom: ${(props) => props.theme.spacing(2.5)};
`;

const SidebarNav = ({ items, expanded }) => {
  const [navItems] = useState(items);
  // const [prevLoading, setPrevLoading] = useState(false);
  const [errors] = useState("");

  // initialize the redux hook
  // const dispatch = useDispatch();
  // const { brands, brandsLoading, brandsHasErrors, brandsErrorMessage } =
  //   // useSelector(brandsSelector);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const ScrollbarComponent = matches ? PerfectScrollbar : Scrollbar;

  // useEffect(() => {
  //   dispatch(fetchBrands());
  // }, [dispatch]);

  /* watch the brands state*/
  // if (brandsLoading) {
  //   if (!prevLoading) {
  //     setPrevLoading(true);
  //   }
  // } else {
  //   if (prevLoading) {
  //     if (brandsHasErrors) {
  //       const message = brandsErrorMessage || "Something went wrong";
  //       setErrors(message);
  //     } else {
  //       const navItemsList = [...navItems];
  //       navItemsList.filter((elem) => {
  //         return elem.title === "Pages";
  //       })[0].pages[2].children = [
  //         ...[
  //           items.filter((elem) => {
  //             return elem.title === "Pages";
  //           })[0].pages[2].children[0],
  //         ],
  //         ...brands.map((elem) => ({
  //           title: elem?.name,
  //           url: elem?.url,
  //           href: "/brand",
  //           icon: BsFillTrashFill,
  //           type: "brand",
  //         })),
  //       ];
  //       setErrors(null);
  //     }
  //     setPrevLoading(false);
  //   }
  // }

  return (
    <React.Fragment>
      <ScrollbarComponent>
        <List disablePadding sx={!expanded && { mt: 10 }}>
          <Items>
            {navItems &&
              navItems.map((item) => (
                <SidebarNavSection
                  component="div"
                  key={item.title}
                  pages={item.pages}
                  title={item.title}
                  expanded={expanded}
                />
              ))}
          </Items>

          <Grid item xs>
            {errors && (
              <Alert mt={2} mb={3} severity="warning">
                {errors}
              </Alert>
            )}
          </Grid>
        </List>
      </ScrollbarComponent>
      <Grid container justifyContent={"center"} alignItems={"center"}>
        <Logout expanded={expanded} />
      </Grid>
    </React.Fragment>
  );
};

export default SidebarNav;
