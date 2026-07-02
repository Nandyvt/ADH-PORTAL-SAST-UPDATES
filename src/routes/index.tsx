import React from "react";
import { Route, Routes } from "react-router-dom";
import RouteLinks from "common/routePaths";
import PrivateRoute from "./Route";

export default function AppRoutes() {
  return (
    <Routes>
      {RouteLinks?.routePaths?.map((routeItem) => {
        if (!routeItem.adminRoute) {
          return (
            <Route
              key={`${routeItem.path}-${routeItem.pageTitle}`}
              path={routeItem.path}
              element={<routeItem.component />}
            />
          );
        }
        return (
          <Route
            key={`${routeItem.path}-${routeItem.pageTitle}`}
            path={routeItem.path}
            element={
              <PrivateRoute
                component={routeItem.component}
                adminRoute={routeItem.adminRoute}
                hideHeaderAndFooter={routeItem.hideHeaderAndFooter}
                pageTitle={routeItem.pageTitle}
                roles={routeItem.roles}
                path={routeItem.path}
              />
            }
          />
        );
      })}
    </Routes>
  );
}
