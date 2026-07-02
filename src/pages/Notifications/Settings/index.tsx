import store from "app/store";
import { getErrorMessage } from "common/utils";
import { showToast } from "components/Toast/toast.slice";
import React, { useCallback, useEffect, useState } from "react";
import { GetClientConfigEmailAPI } from "services/api/notification.api";
import EmailDetails from "./EmailDetails";
import NotConfigured from "./NotConfigured";
import ServiceProviderConfiguration from "./ServiceProviderConfiguration";
import NotificationsSettingWrapper from "./styled";

const NotificationsSetting: React.FunctionComponent = () => {
  const tabView = {
    NC: "notConfigured",
    configView: "configureView",
    detailsView: "detailsView",
    noView: "noView",
  };

  const [emailClientConfig, setEmailClientConfig] = useState<any>([]);
  const [tabViewState, setTabViewState] = useState<any>(tabView.noView);
  const [apiStatus, setApiStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const GetClientConfigEmail = useCallback(() => {
    setLoading(true);
    GetClientConfigEmailAPI()
      .then((response: any) => {
        if (response && response.data?.clientConfigs === null) {
          setEmailClientConfig([]);
        } else {
          setEmailClientConfig(response.data?.clientConfigs);
        }
        return { ...response._pagination };
      })
      .catch((error) => {
        store.dispatch(
          showToast({
            type: "danger",
            title: "Error Occured",
            message: getErrorMessage(error),
          })
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // api Call for Client Config
    GetClientConfigEmail();
    setApiStatus("initial");
  }, []);

  useEffect(() => {
    if (apiStatus === "config") GetClientConfigEmail();
  }, [apiStatus]);

  useEffect(() => {
    if (
      apiStatus === "initial" &&
      loading === false &&
      emailClientConfig.length === 0
    )
      setTabViewState(tabView.NC);
    if (
      (apiStatus === "config" || apiStatus === "initial") &&
      emailClientConfig.length !== 0
    )
      setTabViewState(tabView.detailsView);
    if (apiStatus === "notConfig") {
      setApiStatus("post");
      setTabViewState(tabView.configView);
    }
    if (apiStatus === "edit") setTabViewState(tabView.configView);
    if (apiStatus === "delete") setTabViewState(tabView.NC);
  }, [apiStatus, loading, emailClientConfig]);

  const focusNextTab = (element: string) => {
    const tabs = document.querySelectorAll(element) as NodeListOf<HTMLElement>;
    const currentIndex = Array.from(tabs).findIndex(
      (tab) => document.activeElement === tab
    );

    const nextIndex = (currentIndex + 1) % tabs.length;
    tabs[nextIndex]?.focus();
  };

  const focusPreviousTab = (element: string) => {
    const tabs = document.querySelectorAll(element) as NodeListOf<HTMLElement>;
    const currentIndex = Array.from(tabs).findIndex(
      (tab) => document.activeElement === tab
    );

    const previousIndex =
      currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
    tabs[previousIndex]?.focus();
  };

  // Keyboard navigation support
  const handleKeyDown = (event: any) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      focusNextTab('a[role="tab"].nav-link');
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      focusPreviousTab('a[role="tab"].nav-link');
    }
  };

  return (
    <NotificationsSettingWrapper>
      <div className="container px-lg-3 px-md-0 px-sm-3">
        <div className="mb-4">
          <h1
            data-testid="test-heading"
            className="notifications header-bottom pt-3 pb-2 d-block"
          >
            Notification Setting
          </h1>
        </div>

        <div>
          <div className="navbar-expand">
            <button
              type="button"
              className="aui-navbar-toggler navbar-toggler btn btn-round btn-secondary w-sm-100"
              data-toggle="collapse"
              data-target="#navbarList"
              aria-controls="navbarList"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              Notifications Setting
            </button>
            <div className="aui-p-tabs">
              <div id="navbarList" className="collapse navbar-collapse">
                <ul className="nav nav-tabs" role="tablist">
                  <li
                    className="nav-item pr-4 pl-3 pr-lg-0"
                    role="presentation"
                  >
                    <a
                      className="nav-link active tab-item-font"
                      data-toggle="tab"
                      aria-selected="true"
                      aria-controls="ptab1"
                      id="ptab1-tab"
                      href="#ptab1"
                      role="tab"
                      onKeyDown={(e) => handleKeyDown(e)}
                      onClick={() => {
                        GetClientConfigEmail();
                        if (emailClientConfig.length === 0)
                          setTabViewState(tabView.NC);
                        if (emailClientConfig.length !== 0)
                          setTabViewState(tabView.detailsView);
                      }}
                    >
                      Email
                    </a>
                  </li>
                  <li className="nav-item pr-4 pr-lg-0" role="presentation">
                    <a
                      className="nav-link tab-item-font"
                      data-toggle="tab"
                      aria-controls="ptab2"
                      onKeyDown={(e) => handleKeyDown(e)}
                      href="#ptab2"
                      role="tab"
                      id="ptab2-tab"
                      aria-selected="false"
                    >
                      SMS
                    </a>
                  </li>
                  <li className="nav-item pr-4 pr-lg-0" role="presentation">
                    <a
                      className="nav-link tab-item-font"
                      data-toggle="tab"
                      aria-controls="ptab3"
                      onKeyDown={(e) => handleKeyDown(e)}
                      aria-selected="false"
                      href="#ptab3"
                      role="tab"
                      id="ptab3-tab"
                    >
                      HTTP
                    </a>
                  </li>
                </ul>
              </div>
              <div className="tab-content">
                <div
                  id="ptab1"
                  className="tab-pane active"
                  role="tabpanel"
                  aria-labelledby="ptab1-tab"
                >
                  {tabViewState === tabView.NC && (
                    <NotConfigured setApiStatus={setApiStatus} />
                  )}
                  {tabViewState === tabView.configView && (
                    <ServiceProviderConfiguration
                      setTabViewState={setTabViewState}
                      GetClientConfigEmail={GetClientConfigEmail}
                      emailClientConfig={emailClientConfig}
                      tabView={tabView}
                      apiStatus={apiStatus}
                      setApiStatus={setApiStatus}
                      setLoading={setLoading}
                    />
                  )}
                  {tabViewState === tabView.detailsView && (
                    <EmailDetails
                      emailClientConfig={emailClientConfig}
                      apiStatus={apiStatus}
                      setApiStatus={setApiStatus}
                    />
                  )}
                </div>
                <div
                  id="ptab2"
                  className="tab-pane fade"
                  role="tabpanel"
                  aria-labelledby="ptab2-tab"
                />
                <div
                  id="ptab3"
                  className="tab-pane fade"
                  role="tabpanel"
                  aria-labelledby="ptab3-tab"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </NotificationsSettingWrapper>
  );
};

export default NotificationsSetting;
