import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import { AppRouter } from "./AppRouter";

export const NavBar = props => {
  const [currentPath] = AppRouter.useCurrentPath();
  return (
    <Nav tabs {...props}>
      {AppRouter.pathList
        .filter(route => route.path !== "/")
        .map((route, index) => (
          <NavItem key={index}>
            <NavLink
              active={currentPath === route.path}
              onClick={() => AppRouter.ReRoute(route.path)}
            >
              {route.name}
            </NavLink>
          </NavItem>
        ))}
    </Nav>
  );
};
