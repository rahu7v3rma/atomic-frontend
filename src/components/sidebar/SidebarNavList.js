import React from "react";
import { useLocation } from "react-router-dom";

import reduceChildRoutes from "./reduceChildRoutes";

const SidebarNavList = (props) => {
  const { pages, depth, expanded } = props;
  const router = useLocation();
  const currentRoute = router.pathname;

  const childRoutes = pages.reduce(
    (items, page) =>
      reduceChildRoutes({
        items,
        page,
        currentRoute,
        depth,
        expanded,
      }),
    []
  );

  return <React.Fragment>{childRoutes}</React.Fragment>;
};

export default SidebarNavList;
