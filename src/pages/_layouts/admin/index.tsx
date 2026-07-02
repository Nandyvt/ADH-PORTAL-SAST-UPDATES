/* eslint-disable no-debugger */
import React, { ReactNode, useEffect, useState } from "react";
import PropTypes from "prop-types";
import AdminFooter from "components/AdminFooter";
import { Wrapper } from "styled";
import Loader from "components/Loader";
import ScrollToTop from "components/scrollToTop";
import Toast from "components/Toast";
import { AHAMenu } from "components/SideMenu/AHASideMenu";
import Header from "components/Header";
import LoginHeader from "pages/Login/LoginHeader";
import { useSelector } from "react-redux";
import RouteLinks from "common/routePaths";
import { getSideMenuToggleStatus } from "common/utils";
import { logger } from "common/utils/logger.utils";
import { setSideMenuState } from "app/user.slice";
import store from "app/store";
import { useLocation } from "react-router-dom";
import {
  setClearFilter,
  setReserveStreamListFilterState,
} from "pages/Configuration/common/StreamList.slice";

interface Props {
  children: ReactNode;
}
const pathName = window?.location?.pathname;

export default function AdminLayout({ children }: Props) {
  const locationObj = useLocation();
  const natsConfigurationPages = locationObj.pathname.includes("configuration");
  const natsStreamDetailsPage = locationObj.search?.includes("stream-details");
  const natsConsumersListingPage =
    locationObj.search?.includes("consumers-listing");
  const natsStreamPage = locationObj.pathname?.includes(
    "configuration/nats-streams"
  );
  const pathNameExpiry = useSelector((state: any) => {
    if (state.user.expiryPath) {
      return state.user.expiryPath;
    }

    return "";
  });

  const userStateAuthed = useSelector((state: any) => {
    return state?.authed?.userToken;
  });

  RouteLinks.routePaths.forEach((routeItem: any) => {
    if (window?.location?.pathname === routeItem?.path) {
      document.title = `American Heart Association | Data Hub - ${routeItem.pageTitle} Page`;
    }
  });

  useEffect(() => {
    const removeOverlay = () => {
      debugger;
      document
        .querySelector<any>(".modal-backdrop")
        ?.classList.remove("d-none");

      document.querySelector<any>(".modal-backdrop")?.classList.remove("show");

      document.querySelector<any>("body").classList.remove("modal-open");
      document.querySelector<any>("body").setAttribute("style", "");
    };
    window.addEventListener("popstate", () => removeOverlay(), false);

    /* Reset state persistance for pages other than stream-details */
    if (
      (natsConfigurationPages &&
        (natsStreamDetailsPage || natsConsumersListingPage)) ||
      natsStreamPage
    ) {
      store.dispatch(setReserveStreamListFilterState(true));
    } else {
      store.dispatch(setReserveStreamListFilterState(false));
      store.dispatch(setClearFilter());
    }

    // cleanup
    return () => window.removeEventListener("popstate", () => removeOverlay());
  }, []);
  const [buttonClick, setButtonClick] = useState(false);

  useEffect(() => {
    try {
      if (window.outerWidth > 992) {
        if (getSideMenuToggleStatus() === "true") {
          setButtonClick(true);
          store.dispatch(setSideMenuState(true));
        } else {
          setButtonClick(false);
          store.dispatch(setSideMenuState(false));
        }
      }
    } catch (error) {
      logger("error response in admin Layout mount : ", error);
    }
  }, [buttonClick]);

  const snapshotDemoPageRoute = () => {
    return userStateAuthed !== "" ? (
      <Header buttonClick={buttonClick} setButtonClick={setButtonClick} />
    ) : (
      <LoginHeader />
    );
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <a href="#maincontent" className="aui-skip-content">
        Skip to main content
      </a>
      <div className="d-flex flex-row sideMenuMobPosRelative flex-fill">
        {userStateAuthed !== "" ? (
          <AHAMenu buttonClick={buttonClick} setButtonClick={setButtonClick} />
        ) : null}
        <Wrapper
          buttonClick={buttonClick}
          notFoundWrapperFlag={userStateAuthed === ""}
          className="container d-flex flex-column padding-left-0"
        >
          {pathName === pathNameExpiry ? (
            <LoginHeader />
          ) : (
            snapshotDemoPageRoute()
          )}
          <ScrollToTop
            buttonClick={buttonClick}
            setButtonClick={setButtonClick}
          />
          <Toast />
          <main
            className="d-flex flex-column flex-grow-1 bgcolor"
            id="maincontent"
          >
            <div
              className={`mt-4 m-sm-2 p-sm-2 pl-sm-3 pr-sm-3 maxscreen${
                natsConfigurationPages ? " padding-nats-pages" : ""
              }`}
            >
              {children}
            </div>
          </main>
          <Loader />
        </Wrapper>
      </div>
      <AdminFooter
        buttonClick={buttonClick}
        isLoginPage={userStateAuthed === ""}
      />
    </div>
  );
}
AdminLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
