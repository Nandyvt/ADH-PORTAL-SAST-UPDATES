import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "app/useAppSelector";
import { getAhaSsoToken } from "app/hooks/auth/auth.slice";
import store from "app/store";
import { showToast } from "components/Toast/toast.slice";
import {
  getErrorMessage,
  setSideMenuToggleStatus,
  signOut,
} from "common/utils";
import { adhLogin } from "app/hooks/auth/authManager";
import { logger } from "common/utils/logger.utils";
import CONSTANTS from "common/constants";
import { HeaderWrapper } from "./styled";
import { setRoleSwitchObj } from "./header.slice";

const Header = ({
  showMyAccountMenu = true,
  buttonClick,
  setButtonClick,
}: any) => {
  const ahaSsoUserState = useSelector((state: any) => {
    return state.user.ahaSsoUser;
  });

  const [hovered, setHovered] = useState(false);

  const [userName, setUserName] = useState("");

  const ahaSsoToken = useAppSelector(getAhaSsoToken) as any;

  const generateHelpIcons = (roleSwitchCode: string) => {
    // client admin
    if (CONSTANTS.USER_ROLES.CLIENT_ADMIN === roleSwitchCode) {
      return (
        <img
          className="helpTextStyles helpTextStylesImg"
          src="/images/UserPen.svg"
          alt="View & Edit"
        />
      );
    }
    // super admin
    if (CONSTANTS.USER_ROLES.SUPER_ADMIN === roleSwitchCode) {
      return (
        <img
          className="helpTextStyles helpTextStylesImg"
          src="/images/UserSetting.svg"
          alt="admin"
        />
      );
    }
    // super user
    if (CONSTANTS.USER_ROLES.SUPER_USER === roleSwitchCode) {
      return (
        <img
          className="helpTextStyles helpTextStylesImg"
          src="/images/UserShield.svg"
          alt="View Only"
        />
      );
    }
    // client user
    if (CONSTANTS.USER_ROLES.CLIENT_USER === roleSwitchCode) {
      return (
        <img
          className="helpTextStyles helpTextStylesImg"
          src="/images/UserPen-Slash.svg"
          alt="View Only"
        />
      );
    }

    return "";
  };

  const stateObject = useSelector((state: any) => {
    let roleName;
    let loggedInUserState;
    if (state?.user?.user) {
      roleName = state.user.user.roleName;
      loggedInUserState = state.user.user;
    }
    return {
      headerText: state.header.headerTitle,
      roleName,
      loggedInUserState,
    };
  });

  let prevScrollPos = window.scrollY;

  const { roleName, loggedInUserState = {} } = stateObject;

  const {
    roleName: roleNameLoggedInUser,
    roleCode: roleCodeLoggedInUser,
    clientName: clientNameLoggedInUser,
  } = loggedInUserState;

  const { otherRoles } = loggedInUserState;

  const getColorCode = (roleSwitchCode: string) => {
    if (CONSTANTS.USER_ROLES.CLIENT_ADMIN === roleSwitchCode) {
      return "roleColorCodeCL";
    }
    if (
      CONSTANTS.USER_ROLES.SUPER_ADMIN === roleSwitchCode ||
      CONSTANTS.USER_ROLES.SUPER_USER === roleSwitchCode
    ) {
      return "roleColorCodeSA";
    }
    if (CONSTANTS.USER_ROLES.CLIENT_USER === roleSwitchCode) {
      return "roleColorCodeEU";
    }
    return "";
  };

  const navigate = useNavigate();
  const reduxRoleSwitchObj = useSelector((state: any) => {
    return state.header.roleSwitchObj;
  });

  const generateRoleName = (otherRoleObj: any) => {
    const { clientName } = otherRoleObj;
    if (clientName?.trim() === "") {
      return "";
    }

    if (clientName?.trim() !== "") return `(${clientName})`;

    return null;
  };

  const roleSwitchHandler = (selectedRoleFromDropdown: any) => {
    const [roleCode, clientId, roleNameSelected, clientName] =
      selectedRoleFromDropdown.split("/");
    generateHelpIcons(roleCode);

    // setting selected rolecode to localstorage
    localStorage.setItem(CONSTANTS.ROLE_SWITCH_SEL_VALUE, roleCode);

    logger(`roleSwitch value  ::  ${roleCode} added in localstorage`);

    adhLogin(ahaSsoToken, roleCode, clientId)
      .then((response: any) => {
        if (response) {
          store.dispatch(
            showToast({
              type: "success",
              title: " ",
              message: `Successfully Changed Role `,
            })
          );

          store.dispatch(
            setRoleSwitchObj({
              roleSwitchObj: {
                isRoleSwitchDone: true,
                roleSwitchDetails: {
                  selectedRoleCode: roleCode,
                  selectedRoleClientId: clientId,
                  selectedRoleName: roleNameSelected,
                  selectedRoleClientName: clientName,
                },
              },
            })
          );

          window.location.reload();
        }
      })
      .catch((error) => {
        store.dispatch(
          showToast({
            title: "Error Occured.",
            message: getErrorMessage(error),
          })
        );
        store.dispatch(
          setRoleSwitchObj({
            // reset roleSwitch obj in redux store in case of any error
            roleSwitchObj: {
              isRoleSwitchDone: false,
              roleSwitchDetails: {
                selectedRoleCode: "",
                selectedRoleClientId: "",
                selectedRoleName: "",
                selectedRoleClientName: "",
              },
            },
          })
        );
      })
      .finally(() => {});
  };

  const generateSelectedOptionRoleSwitch = (reduxRoleSwitchObjParam: any) => {
    if (reduxRoleSwitchObjParam?.isRoleSwitchDone) {
      return `
      
       ${reduxRoleSwitchObjParam.roleSwitchDetails.selectedRoleName}
       ${generateRoleName({
         clientName:
           reduxRoleSwitchObjParam.roleSwitchDetails.selectedRoleClientName,
       })}`;
    }
    if (
      roleNameLoggedInUser === "Super Admin" ||
      roleNameLoggedInUser === "Super User"
    ) {
      return (
        <>
          <span className="roleName">{roleNameLoggedInUser}</span>
        </>
      );
    }
    return (
      <>
        <span className="roleClientName mr-1">{roleNameLoggedInUser}</span>(
        <span>{clientNameLoggedInUser}</span>)
      </>
    );
  };

  const initialPageLoadRoleSwitch = () => {
    if (localStorage.getItem("adhSelectedUserRole") === null) {
      return roleCodeLoggedInUser;
    }
    return localStorage.getItem("adhSelectedUserRole");
  };
  const generateUserRoleSwitchDropdown = () => {
    // No Role Switch Dropdown for super admin
    if (
      roleCodeLoggedInUser === "SUPER_ADMIN" ||
      typeof otherRoles === "undefined"
    )
      return (
        <li className="d-flex align-items-center nav-item-roleName">
          <p
            className={`${getColorCode(
              roleCodeLoggedInUser
            )} roleStylesMin mt-0 mb-0 user roleName`}
          >
            {generateHelpIcons(roleCodeLoggedInUser)}
            <span className="roleClientName mr-1">{roleName}</span>
            {roleCodeLoggedInUser === "CLIENT_ADMIN" ||
            roleCodeLoggedInUser === "CLIENT_USER" ? (
              <span>{`(${clientNameLoggedInUser})`}</span>
            ) : (
              ""
            )}
          </p>
        </li>
      );

    return (
      <li
        className={`d-flex align-items-center justify-content-end nav-item-roleName roleSwitcherWidth ${
          window?.location?.pathname === "/NotFound" && "d-style-NotFound"
        }`}
      >
        <div className="dropdown">
          <button
            type="button"
            className="btn role-dropdown noBtnStyle d-flex p-0"
            data-toggle="dropdown"
          >
            <span
              className={`${getColorCode(
                initialPageLoadRoleSwitch()
              )} roleStylesMin`}
            >
              {generateHelpIcons(initialPageLoadRoleSwitch())}
              {generateSelectedOptionRoleSwitch(reduxRoleSwitchObj)}
            </span>
            <span className="dropdown-arrow">
              <i className="aha-icon-arrow-down forModal" />
            </span>
          </button>
          <div className="dropdown-menu">
            {otherRoles?.map((item: any) => {
              return (
                <button
                  type="button"
                  className={`${getColorCode(
                    item.roleCode
                  )} roleStylesMin role-dropdown role-list noBtnStyle`}
                  onClick={(e: any) => {
                    roleSwitchHandler(
                      e.target.parentElement.getAttribute("data-value")
                    );
                  }}
                  onKeyDown={(e: any) => {
                    if (
                      e.keyCode === CONSTANTS.KEY_ENTER ||
                      e.keyCode === CONSTANTS.KEY_SPACEBAR
                    ) {
                      roleSwitchHandler(e.target.getAttribute("data-value"));
                    }
                  }}
                  key={`${item?.roleCode}/${item?.clientId}`}
                  data-value={`${item?.roleCode}/${item?.clientId}/${item?.roleName}/${item?.clientName}`}
                >
                  {generateHelpIcons(item.roleCode)}
                  <span className="roleClientName pr-1">{item.roleName}</span>
                  <span>{generateRoleName(item)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </li>
    );
  };

  useEffect(() => {
    const el = document.getElementsByClassName("header-fixed");
    window.addEventListener("scroll", () => {
      const currentScrollPos = window.scrollY;
      if (prevScrollPos > currentScrollPos) {
        Array.from(el).forEach((item) => {
          item.classList.remove("top-70");
          item.classList.add("top-0");
        });
      } else {
        Array.from(el).forEach((item) => {
          item.classList.remove("top-0");
          item.classList.add("top-70");
        });
      }
      prevScrollPos = currentScrollPos;
    });
  }, [prevScrollPos]);

  useEffect(() => {
    if (ahaSsoUserState) {
      const { firstName, lastName } = ahaSsoUserState;

      if (firstName && lastName) {
        setUserName(`${firstName} ${lastName}`);
      }
    }
  }, [ahaSsoUserState]);

  return (
    <HeaderWrapper
      id="aha-header"
      className="aui-main-header aui-pri-header header-fixed pb-2 pt-2"
    >
      <nav
        aria-label="TopHeaderMenu"
        className="navbar navbar-expand-lg justify-content-between mx-auto aui-header-content aui-pri-header-t"
      >
        <button
          className="navbar-toggler ml-2 px-0 signout-link"
          type="button"
          aria-controls="toggleNav"
          aria-expanded={buttonClick}
          aria-label="Toggle Navigation"
          onClick={() => {
            setButtonClick(!buttonClick);
            setSideMenuToggleStatus(!buttonClick);
          }}
        >
          <i className="aha-icon-hamburger" />
        </button>

        {window.innerWidth < 992 && showMyAccountMenu && (
          <div className="d-flex pl-4">
            <span className="AHAlogo">
              <img
                aria-label="A H A logo"
                src={CONSTANTS.HEADER_LOGO.LOGO_WITH_ADH}
                alt="A H A Logo"
                className="headerAHALogoMob"
              />
            </span>
          </div>
        )}

        {showMyAccountMenu && (
          <div
            className="justify-content-lg-end collapse navbar-collapse aui-pri-nav"
            id="toggleNav"
          >
            <ul className="navbar-nav username-spacing flex-lg-row flex-column">
              {generateUserRoleSwitchDropdown()}

              <li className="d-flex nav-item dropdown ml-4 mr-4 flex-column align-items-center focusProfileSec">
                <button
                  type="button"
                  className={`btn user hoverOpen btn-text dropdown-toggle nav-link signout-link ${
                    hovered ? "hover-open" : ""
                  }`}
                  aria-label="User Profile Dropdown"
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  /* onFocus={() => setHovered(true)} */
                  /* onBlur={() => setHovered(false)} */
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    src="../../images/Icons-Avatar.svg"
                    alt="Profile Icon"
                    className="profile-icon"
                  />
                  {userName}
                </button>
                <div
                  className={`dropdown-menu p-lg-0 aui-header-dropdown ${
                    hovered && "make-visible"
                  }`}
                  aria-label="navDropdown-signout"
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  /* onFocus={() => setHovered(true)} */
                  /* onBlur={() => setHovered(false)} */
                >
                  <div className="d-flex flex-column p-3 ">
                    <div className="border-0 mb-3">
                      <button
                        aria-label="Profile"
                        role="link"
                        type="button"
                        className="dropdown-item "
                        onClick={() => {
                          navigate("/profile");
                        }}
                        onKeyUp={(e) => {
                          if (e.key === "Enter" || e.key === "Spacebar") {
                            navigate("/profile");
                          }
                        }}
                      >
                        Profile
                      </button>
                    </div>
                    <div>
                      <button
                        role="link"
                        type="button"
                        onClick={signOut}
                        onKeyUp={(e) => {
                          if (e.key === "Enter" || e.key === "Spacebar") {
                            signOut();
                          }
                        }}
                        className="dropdown-item "
                        aria-label="Sign Out"
                        /* onBlur={() => setHovered(false)} */
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        )}

        {!showMyAccountMenu && (
          <>
            <div className="d-flex pl-4">
              <span className="AHAlogo">
                <img
                  className="logo-image"
                  src={CONSTANTS.HEADER_LOGO.LOGO_WITH_ADH}
                  alt="AHA home"
                />
              </span>
            </div>
            <div className="d-flex flex-column p-3">
              <div
                onClick={signOut}
                className="dropdown-item "
                role="button"
                onKeyUp={signOut}
                tabIndex={0}
                aria-label="Sign Out"
              >
                <i className="aha-icon-logout" /> Sign Out
              </div>
            </div>
          </>
        )}
      </nav>
    </HeaderWrapper>
  );
};
export default Header;
