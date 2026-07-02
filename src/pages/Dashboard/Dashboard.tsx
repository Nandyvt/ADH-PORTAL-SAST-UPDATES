import React, { useContext, useEffect, useState } from "react";
import { Wrapper } from "styled";
import store from "app/store";
import { setHeaderTitleText } from "components/Header/header.slice";
import { SummaryService } from "services/api/summary.api";
import PermissionContext from "services/PermissionManager/PermissionContext";
import CONSTANTS from "common/constants";
import Restricted from "services/PermissionManager/Restricted";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TransactionalStatus from "./Datahub/TransactionalStatus";
import { SignInWrapper } from "./styled";
import { intToString } from "../../common/utils";
import TransactionalChannel from "./Datahub/TransactionalChannel";
import ClientLeaderboard from "./ClientLeaderboard";
import TransactionalLogs from "./Datahub/TransactionalLogs";
import ClientsGraph from "./Client/ClientsRole";
import UsersGraph from "./User";
import ChannelCredentials from "./AccountService/Credentials/ChannelCredentials";
import UsersSummaryPieChart from "./AccountService/Users";
import CredentialsStatusSummary from "./AccountService/CredentialsStatusSummary";
import CredentialsGraph from "./Credential";
import NotificationType from "./Notification/NotificationTypes";

export interface Summary {
  credentials: {
    total: number;
    active: number;
    inactive: number;
  };
  clients: {
    total: number;
    active: number;
    inactive: number;
  };
  users: {
    total: number;
    active: number;
    inactive: number;
    pending: number;
  };
}

const Dashboard = () => {
  const [, setShowButton] = useState(false);
  const { loggedInUserObjectContext } = useContext(PermissionContext);
  const [isSuperAdminOrSuperUser, setIsSuperAdminOrSuperUser] = useState(false);
  const [isClientAdmin, setIsClientAdmin] = useState(false);
  const [, setIsSuperAdmin] = useState(false);

  useEffect(() => {
    const { roleCode } = loggedInUserObjectContext;
    if (
      roleCode === CONSTANTS.USER_ROLES.SUPER_ADMIN ||
      roleCode === CONSTANTS.USER_ROLES.SUPER_USER
    ) {
      setIsSuperAdminOrSuperUser(true);
    }
    if (roleCode === CONSTANTS.USER_ROLES.CLIENT_ADMIN) {
      setIsClientAdmin(true);
    }
    if (roleCode === CONSTANTS.USER_ROLES.SUPER_ADMIN) {
      setIsSuperAdmin(true);
    }
  }, [loggedInUserObjectContext]);
  const [summary, setSummary] = useState<Summary>({
    credentials: {
      total: 0,
      active: 0,
      inactive: 0,
    },
    clients: {
      total: 0,
      active: 0,
      inactive: 0,
    },
    users: {
      total: 0,
      active: 0,
      inactive: 0,
      pending: 0,
    },
  });

  const formatCount = (value: number) => `0${value}`;

  useEffect(() => {
    store.dispatch(
      setHeaderTitleText({
        headerTitle: "",
      })
    );
  });
  useEffect(() => {
    SummaryService().then((res) => {
      setSummary(res.data.summary);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  const navigateToSection = (event: any, sectionID: string) => {
    event.preventDefault();
    const section = document.getElementById(sectionID);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Wrapper className="d-flex flex-column">
      <SignInWrapper
        sideMenuState={useSelector((state: any) => {
          return state.user.sideMenuState;
        })}
      >
        <div className="container flex-grow-1">
          <h1
            className="project-heading font-400"
            aria-label="Dashboard"
            data-testid="test-client"
          >
            Dashboard
          </h1>
          <div className="row d-flex card-wrapper mb-3 justify-content-lg-start card-spacing">
            {/* <div className="cardwidth mb-3 pl-3 pr-2 pr-sm-1 p-lg-0 mobstyle">
              <a href="#datahub">
                <div className="card p-0 p-sm-3 aha-card-sm card-one">
                  <div className="row no-gutters position-relative align-items-center">
                    <div className="col-6 col-md-6 p-lg-0 p-sm-0 card-head-img">
                      <div className="card-detail">
                        <div className="dash-style my-2 mb-sm-0 d-block d-sm-inline font-600">
                          128
                        </div>
                      </div>
                    </div>
                    <div className="col-6 col-md-6 p-lg-0 p-sm-0 card-head-img">
                      <div className="card-detail text-right">
                        <i className="aha-icon-data imageIcons" />
                      </div>
                    </div>
                  </div>
                  <div className="card-one-style my-2">Data Hub</div>
                  <div className="d-md-flex justify-content-between">
                    <p className="mb-0">Topic 96</p>
                    <p className="mb-0">Clients 32</p>
                  </div>
                </div>
              </a>
            </div> */}
            {isSuperAdminOrSuperUser && (
              <div className="cardwidth pl-2 pr-3 mb-3 pr-sm-1 p-lg-0">
                <a
                  href="#clients"
                  onClick={(e) => {
                    navigateToSection(e, "clients");
                  }}
                >
                  <div className="card p-0 p-sm-3 aha-card-sm card-two">
                    <div className="row no-gutters align-items-center">
                      <div className="col-6 col-md-6 p-lg-0 p-sm-0 card-head-img">
                        <div className="card-detail">
                          <div className="dash-style pr-sm-4 my-2 mb-sm-0 d-block d-sm-inline font-600">
                            {summary.clients.total.toString().length < 2
                              ? formatCount(summary.clients.total)
                              : intToString(summary.clients.total)}
                          </div>
                        </div>
                      </div>
                      <div className="col-6 col-md-6 p-lg-0 p-sm-0 card-head-img">
                        <div className="card-detail text-right">
                          <i className="aha-icon-clients" />
                        </div>
                      </div>
                    </div>
                    <div className="card-one-style my-2">Clients</div>
                    <div className="d-md-flex justify-content-between">
                      <p className="mb-0">
                        Active{" "}
                        {summary.clients.active.toString().length < 2
                          ? formatCount(summary.clients.active)
                          : intToString(summary.clients.active)}
                      </p>
                      <p className="mb-0">
                        Inactive{" "}
                        {summary.clients.inactive.toString().length < 2
                          ? formatCount(summary.clients.inactive)
                          : intToString(summary.clients.inactive)}
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            )}

            <div className="cardwidth mb-3 mobstyle pl-3 pr-2 pl-sm-2 p-lg-0">
              <a
                href="#users"
                onClick={(e) => {
                  navigateToSection(e, "users");
                }}
              >
                <div className="card p-0 p-sm-3 aha-card-sm card-three">
                  <div className="row no-gutters align-items-center">
                    <div className="col-7 col-md-6 p-lg-0 p-sm-0 card-head-img">
                      <div className="card-detail">
                        <div className="dash-style my-2 pr-sm-4 mb-2 mb-sm-0 d-block d-sm-inline pr-lg-0 font-600">
                          {summary.users.total.toString().length < 2
                            ? formatCount(summary.users.total)
                            : intToString(summary.users.total)}
                        </div>
                      </div>
                    </div>
                    <div className="col-4 col-md-5 p-sm-0 card-head-img">
                      <div className="card-detail text-right">
                        <i className="aha-icon-users users redIcon" />
                      </div>
                    </div>
                  </div>
                  <div className="card-one-style my-2">Users</div>
                  <div className="d-block d-md-flex justify-content-between">
                    <p className="mb-0">
                      Active{" "}
                      {summary.users.active.toString().length < 2
                        ? formatCount(summary.users.active)
                        : intToString(summary.users.active)}
                    </p>
                    <p className="mb-0">
                      Inactive{" "}
                      {summary.users.inactive.toString().length < 2
                        ? formatCount(summary.users.inactive)
                        : intToString(summary.users.inactive)}
                    </p>
                  </div>
                </div>
              </a>
            </div>
            <div className="cardwidth mb-3 pr-sm-1 pl-2 pl-sm-3 pr-3 p-lg-0">
              <a
                href="#credentials"
                onClick={(e) => navigateToSection(e, "credentials")}
              >
                <div className="card p-0 p-sm-3 aha-card-sm card-four">
                  <div className="row no-gutters align-items-center">
                    <div className="col-6 col-md-7 p-lg-0 p-sm-0 card-head-img">
                      <div className="card-detail">
                        <div className="dash-style my-2 pr-sm-4 mb-2 mb-sm-0 d-block d-sm-inline font-600">
                          {summary.credentials.total.toString().length < 2
                            ? formatCount(summary.credentials.total)
                            : intToString(summary.credentials.total)}
                        </div>
                      </div>
                    </div>
                    <div className="col-6 col-md-5 p-lg-0 p-sm-0 card-head-img">
                      <div className="card-detail text-right">
                        <i className="demo-icon aha-icon-padlock-thick" />
                      </div>
                    </div>
                  </div>
                  <div className="card-one-style my-2">Credentials</div>
                  <div className="d-md-flex justify-content-between">
                    <p className="mb-0">
                      Active{" "}
                      {summary.credentials.active.toString().length < 2
                        ? formatCount(summary.credentials.active)
                        : intToString(summary.credentials.active)}
                    </p>
                    <p className="mb-0">
                      Inactive{" "}
                      {summary.credentials.inactive.toString().length < 2
                        ? formatCount(summary.credentials.inactive)
                        : intToString(summary.credentials.inactive)}
                    </p>
                  </div>
                </div>
              </a>
            </div>
            {/* <div className="cardwidth mb-3 p-lg-0 px-3">
              <a href="#notifications">
                <div className="card p-0 p-sm-3 aha-card-sm card-five">
                  <div className="row no-gutters align-items-center">
                    <div className="col-6 col-md-6 p-lg-0 p-sm-0 card-head-img">
                      <div className="card-detail">
                        <div className="dash-style my-2 mb-2 mb-sm-0 d-block d-sm-inline font-600">
                          128
                        </div>
                      </div>
                    </div>
                    <div className="col-6 col-md-6 p-lg-0 p-sm-0 card-head-img">
                      <div className="card-detail text-right">
                        <i className="aha-icon-bell" />
                      </div>
                    </div>
                  </div>
                  <div className="d-sm-block justify-content-between align-items-center">
                    <div className="card-one-style my-2">Notifications</div>
                    <div className="d-block d-md-flex d-lg-flex d-sm-block justify-content-between">
                      <p className="mb-0">Active 96</p>
                      <p className="mb-0"> Inactive 32</p>
                    </div>
                  </div>
                </div>
              </a>
            </div> */}
          </div>
          <div
            className="scrollspy-example"
            data-spy="scroll"
            data-target="#spy"
          >
            <div id="datahub">
              <div className="flex-grow-1 mt-4">
                <div className="d-flex justify-content-between">
                  <h2 className="font-500 h4 mt-2 mb-0">Data Hub </h2>
                </div>
                <hr className="mb-0 mt-2" />
                <div className="container justify-content-between p-0">
                  <div
                    className="row m-0 align-items-start"
                    data-testid="Client-Test"
                  >
                    <Restricted to="hub.transactionLogChannelSummary.get">
                      <div className="col-lg-8 channel-pd visibility p-0 pr-lg-3">
                        <TransactionalChannel />
                      </div>
                    </Restricted>
                    <Restricted to="hub.transactionStatusSummary.get">
                      <div className="col-lg-4 pr-lg-0 pr-md-1 pl-lg-0 piechart-bg ">
                        <div className="container p-0 px-lg-3">
                          <TransactionalStatus />
                        </div>
                      </div>
                    </Restricted>
                  </div>
                </div>
                <Restricted to="hub.transactionLogs.get">
                  <TransactionalLogs />
                </Restricted>
              </div>
            </div>

            {isSuperAdminOrSuperUser && (
              <div id="clients">
                <div className="flex-grow-1 mt-5 w-100">
                  <div className="d-flex justify-content-between">
                    <h2 className="font-500 mb-0 h4">Clients</h2>
                  </div>
                  <hr className="mb-0" />
                  <div className="container p-0 pl-sm-0 pl-lg-0 justify-content-between">
                    <div className="row m-0 align-items-start">
                      <Restricted to="account.clientRolesSummary.get">
                        <div className="col-lg-7 p-0 text-center mobPad0">
                          <ClientsGraph />
                        </div>
                      </Restricted>

                      <Restricted to="account.clientLeaderboard.get">
                        <div className="col-lg-5 pr-0 piechart-bg">
                          <ClientLeaderboard />
                        </div>
                      </Restricted>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div id="users">
              <div className="flex-grow-1 mt-5">
                <h2 className="font-500 mb-0 h4 border-headings">
                  Users from each client
                </h2>
                <div className="justify-content-between p-0 px-md-3">
                  <div className="row">
                    {isSuperAdminOrSuperUser ? (
                      <Restricted to="account.clientUsersSummary.get">
                        <div className="col-lg-8 text-center mobPad0 p-sm-0">
                          <UsersGraph />
                        </div>
                        <div className="col-lg-4 text-center mobPad0 pr-lg-0 col-sm-12 col-md-12 large-tab">
                          <NotificationType />
                        </div>
                      </Restricted>
                    ) : (
                      ""
                    )}

                    {isClientAdmin ? (
                      <Restricted to="account.dashboardSummary.get">
                        <div className="col-lg-5 p-0 px-lg-3 users-piechart-bg ">
                          <UsersSummaryPieChart usersSummary={summary.users} />
                        </div>
                      </Restricted>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div id="credentials">
              <div className="flex-grow-1 mt-5">
                <h2 className="font-500 mb-0 h4 sub-heading-styles">
                  Credentials
                </h2>
                <hr className="mb-0" />
                {isClientAdmin ? (
                  <div className="container justify-content-between p-0">
                    <div className="row m-0 align-items-start">
                      <Restricted to="account.dashboardSummary.get">
                        <div className="col-lg-5 p-0 cred-status-bg">
                          <div className="container p-0">
                            <CredentialsStatusSummary
                              credentialsSummary={summary.credentials}
                            />
                          </div>
                        </div>
                      </Restricted>
                      {/* <Restricted to="account.credentialsChannelSummary.get">
                        <div className="col-lg-6 pr-lg-0 pr-md-1 pl-lg-0 cred-pie-bg ">
                          <div className="container p-0 px-lg-3">
                            <ChannelCredentials />
                          </div>
                        </div>
                      </Restricted> */}
                    </div>
                  </div>
                ) : (
                  <div className="container p-0 pr-lg-0 ">
                    <div className="row justify-content-between m-0">
                      <Restricted to="account.credentialStatusSummary.get">
                        <div className="col-lg-12 col-sm-12 p-0 pr-lg-1">
                          <CredentialsGraph />
                        </div>
                      </Restricted>
                      {/* <Restricted to="account.credentialsChannelSummary.get">
                        <div className="col-lg-5 pr-lg-0 pr-md-1 pl-lg-0 cred-pie-bg ">
                          <div className="container p-0 pr-lg-0 pl-lg-3">
                            <ChannelCredentials />
                          </div>
                        </div>
                      </Restricted> */}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* <div id="notifications">
              <div className="flex-grow-1 mt-5">
                <h2 className="font-600 mb-0 h4">Notifications</h2>
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <img
                      src="../images/notifications.png"
                      alt="Notifications"
                      className="w-100"
                    />
                  </div>
                  <div>
                    {showButton && (
                      <button
                        type="button"
                        className="btn btn-danger topbtn"
                        id="btn-back-to-top"
                        onClick={scrollToTop}
                      >
                        <span className="sr-only">Move to top</span>
                        <i className="demo-icon aha-icon-dash-arrow-right" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </SignInWrapper>
    </Wrapper>
  );
};

export default Dashboard;
