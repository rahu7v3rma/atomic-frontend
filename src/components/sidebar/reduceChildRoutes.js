import React from "react";
import { matchPath } from "react-router-dom";

import SidebarNavList from "./SidebarNavList";
import SidebarNavListItem from "./SidebarNavListItem";

const reduceChildRoutes = (props) => {
  const { items, page, depth, currentRoute, expanded } = props;

  if (page.children) {
    const open = page.href
      ? !!matchPath(
          {
            path: page.href,
            end: false,
          },
          currentRoute
        )
      : false;

    items.push(
      <SidebarNavListItem
        depth={depth}
        icon={page.icon}
        key={page.title}
        badge={page.badge}
        open={!!open}
        title={page.title}
        url={page.url}
        href={page.href}
        type={page.type}
        expanded={expanded}
      >
        <SidebarNavList depth={depth + 1} pages={page.children} />
      </SidebarNavListItem>
    );
  } else {
    items.push(
      <SidebarNavListItem
        depth={depth}
        href={page.href}
        icon={page.icon}
        key={page.title}
        badge={page.badge}
        title={page.title}
        url={page.url}
        type={page.type}
        expanded={expanded}
      />
    );
  }

  return items;
};

export default reduceChildRoutes;
