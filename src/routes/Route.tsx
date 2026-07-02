/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/require-default-props */
import React, { useEffect } from "react";
import { RouteProps, useNavigate } from "react-router-dom";
import DefaultLayout from "pages/_layouts/default";
import AdminLayout from "pages/_layouts/admin";
import CONSTANTS from "common/constants";
import { logger } from "common/utils/logger.utils";
import { getParamsFromURL, onUserLoaded } from "common/utils";
import { ahaSsoLogout } from "app/hooks/auth/authManager";
import { useSelector } from "react-redux";
import store from "app/store";
import { showToast } from "components/Toast/toast.slice";
import Breadcrumbs from "components/BreadCrumbs";

interface PrivateRouteProps extends Omit<RouteProps, "component"> {
  component: any;
  roles?: any;
  adminRoute?: boolean;
  hideHeaderAndFooter?: boolean;
  pageTitle?: string;
}

/* const userManager = new UserManager(OidcSettings);
userManager.events.addUserLoaded(onUserLoaded);
userManager.events.addUserUnloaded(onUserUnloaded);
CONSTANTS.WINDOW.userManager = userManager; */

export default function RouteWrapper({
  component: Component,
  adminRoute = false,
  hideHeaderAndFooter = false,
  pageTitle = "",
  roles,
  path,
  ...rest
}: PrivateRouteProps) {
  const Layout =
    adminRoute && !hideHeaderAndFooter ? AdminLayout : DefaultLayout;

  const reduxStoreRoleCode = useSelector((state: any) => state?.user.user);

  const localStoreSelectedRole =
    localStorage.getItem(CONSTANTS.ROLE_SWITCH_SEL_VALUE) ??
    reduxStoreRoleCode?.roleCode;

  logger("roleSwitch Initial Value :: ", localStoreSelectedRole);

  const navigate = useNavigate();

  const saveUrlParams = () => {
    const { pathName, params, searchParamsUrl } = getParamsFromURL();
    localStorage.setItem("TransLogAutoFillPath", pathName ?? "");
    localStorage.setItem("TransLogAutoFillParams", JSON.stringify(params));
    localStorage.setItem("RedirectUrlParams", JSON.stringify(searchParamsUrl));
  };

  const handleLoggedOutUser = () => {
    if (localStorage.getItem("userToken")) return;

    if (isInvalidRoleAccess() || isNotFoundPage()) return;

    saveUrlParams();
    window.location.href = "/";
  };

  const handleSignInCallback = () => {
    CONSTANTS.WINDOW.userManager
      .signinRedirectCallback()
      .then((user: any) => {
        handleLoggedInUser(user);
      })
      .catch((err: any) => {
        logger(err);
      });
  };

  const hasAccessRole = () => {
    if (!roles) return true;
    return (
      typeof roles !== "undefined" && roles.includes(localStoreSelectedRole)
    );
  };

  const showAccessDeniedToast = () => {
    store.dispatch(
      showToast({
        type: "danger",
        title: " ",
        message: "Access Denied, You Don’t Have Permission To Access this URL",
      })
    );
  };

  const isInvalidRoleAccess = () =>
    roles?.includes(localStoreSelectedRole) ||
    window?.location?.pathname === "/NotFound";

  const isNotFoundPage = () => window?.location?.pathname === "/NotFound";

  const handleLoggedInUser = (userObjAuth: any) => {
    onUserLoaded(userObjAuth);
    saveUrlParams();

    if (!hasAccessRole()) {
      showAccessDeniedToast();
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    const checkAuthRoleAccessNRoute = async () => {
      try {
        const userObjAuth = await CONSTANTS.WINDOW.userManager.getUser();

        if (userObjAuth) {
          handleLoggedInUser(userObjAuth);
        } else if (window.location.href.includes("#id_token")) {
          handleSignInCallback();
        } else {
          handleLoggedOutUser();
        }
      } catch (error) {
        logger("Error inside catch block:", error);
        ahaSsoLogout();
      }
    };

    checkAuthRoleAccessNRoute();
  }, [pageTitle]);

  return (
    <Layout>
      <div>
        <Breadcrumbs routePath={path} />
        <Component />
      </div>
    </Layout>
  );
}
