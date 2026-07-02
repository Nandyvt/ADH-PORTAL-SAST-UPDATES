import React, { FunctionComponent, useContext } from "react";
import { NavLink } from "react-router-dom";
import RouteLinks from "common/routePaths";
import PermissionContext from "services/PermissionManager/PermissionContext";
import BreadCrumbsStyled from "./styled";

const generateBreadcrumbMap = (routeLinks: any[]) => {
  const crumbMap = new Map();
  const crumbRoleMap = new Map();

  routeLinks.forEach((route: any) => {
    const { path, pageTitle, breadcrumbDisabled, roles } = route;
    if (!breadcrumbDisabled) {
      crumbMap.set(path, pageTitle);
      crumbRoleMap.set(path, roles);
    }
  });
  return [crumbMap, crumbRoleMap];
};

const GenerateBreadcrumbs = (
  location: string[],
  crumbMap: Map<string, any>,
  crumbRoleMap: Map<string, any>
) => {
  // First breadcrumb is always dashboard
  const breadcrumbs = [
    {
      path: "/dashboard",
      title: "Dashboard",
    },
  ];

  const { loggedInUserObjectContext } = useContext(PermissionContext);

  if (!location.includes("dashboard")) {
    location.forEach((_: any, index: any) => {
      const routeTo = `/${location.slice(0, index + 1).join("/")}`;
      const title = crumbMap.get(routeTo);

      crumbRoleMap.get(routeTo)?.forEach((role: any) => {
        if (title && role === loggedInUserObjectContext?.roleCode) {
          breadcrumbs.push({
            path: routeTo,
            title,
          });
        }
      });

      // Roles if undefined means by default its super_admin role
      if (title && typeof crumbRoleMap.get(routeTo) === "undefined") {
        breadcrumbs.push({
          path: routeTo,
          title,
        });
      }
    });
  }

  return breadcrumbs;
};

const Breadcrumbs: FunctionComponent<any> = ({ routePath }) => {
  const location = routePath?.split("/")?.filter((x: any) => x);

  //   Skip breadcrumbs for dashboard and location page and invite page and menu settings page
  if (
    !location ||
    location[0] === "dashboard" ||
    location[0] === "location" ||
    location[0] === "invite" ||
    location[0] === "accessdenied" ||
    (location[0] === "settings" && location[1] === ":code") ||
    location[0] === "NotFound"
  ) {
    return null;
  }

  // Generic data to generate breadcrumbs
  const [crumbMap, crumbRoleMap] = generateBreadcrumbMap(RouteLinks.routePaths);

  const breadcrumbs = GenerateBreadcrumbs(location, crumbMap, crumbRoleMap);

  const isLast = breadcrumbs.length - 1;
  return (
    <BreadCrumbsStyled>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb aha-breadcrumb">
          {breadcrumbs.map(({ path, title }, index) =>
            title !== " " ? (
              <li key={path}>
                {isLast === index ? (
                  <NavLink
                    to="#"
                    className={({ isActive }) =>
                      isLast === index || isActive ? "inactive-breadcrumb" : ""
                    }
                  >
                    {title || location[isLast - 1]}
                  </NavLink>
                ) : (
                  <NavLink className="active-breadcrumb" to={path}>
                    {title}
                  </NavLink>
                )}
                {isLast !== index && <span className="separator">/</span>}
              </li>
            ) : null
          )}
        </ol>
      </nav>
    </BreadCrumbsStyled>
  );
};

export default Breadcrumbs;
