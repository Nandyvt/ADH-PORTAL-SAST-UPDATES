import React, { ReactNode, useEffect } from "react";
import PropTypes from "prop-types";
import RouteLinks from "common/routePaths";

interface Props {
  children: ReactNode;
}
export default function DefaultLayout({ children }: Props) {
  RouteLinks.routePaths.forEach((routeItem: any) => {
    if (window.location.pathname === routeItem.path) {
      document.title = `American Heart Association | Data Hub - ${routeItem.pageTitle} Page`;
    }
  });
  useEffect(() => {
    if (window.location.pathname === "/") {
      document.querySelector<any>("body").classList.add("loginPageStickySec");
    }
  }, []);
  return (
    <>
      <div>{children}</div>
    </>
  );
}
DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
