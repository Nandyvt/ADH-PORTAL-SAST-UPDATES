/* eslint-disable no-nested-ternary */
import "wicg-inert";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

import CONSTANTS from "common/constants";
import { useWindowDimensionOnPageResize } from "pages/_layouts/componentUtil";
import {
  getSideMenuToggleStatus,
  setSideMenuToggleStatus,
  signOut,
} from "common/utils";
import { Button, SideMenuWrapper, WidthWrapperSec } from "./Styled";

interface IMenu {
  title: string;
  path: string;
  url: string;
  icon: string;
  description: string;
  child: Array<IMenu>;
}
export const AHAMenu = ({ buttonClick, setButtonClick }: any) => {
  const [menu, setMenu] = useState<IMenu[]>([]);
  const [showBox, setShowBox] = useState(false);
  const [hoverButton, setHoverButton] = useState(false);
  const [hoverMenu, setHoverMenu] = useState(false);
  const [redIcon, setRedIcon] = useState("");
  const [size, setSize] = useState("100%");
  const [iconSelected, setIconSelected] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const getRedirectionRoute = (routeData: any) => {
    if (routeData.url) {
      return { pathname: routeData.url };
    }
    if (routeData?.path === "/") return "/location";

    return routeData.path ?? "/dashboard";
  };
  useEffect(() => {
    const data = localStorage.getItem("Menus");
    if (data) {
      setMenu(JSON.parse(data));
    }
    if (window.outerWidth > 991) {
      if (getSideMenuToggleStatus()) {
        setButtonClick(true);
      } else {
        setButtonClick(false);
      }
    }
  }, []);
  useEffect(() => {
    if (menu) {
      menu.forEach((data) => {
        if (location?.pathname === data?.path) {
          if (!data.child) {
            setIconSelected(true);
            localStorage.setItem("selectedIcon", data.title);
          }
        }
      });
    }
  }, [menu]);

  const zoomedWindowWidth = useWindowDimensionOnPageResize();

  const iconNames = (icon: string) => {
    if (icon === "Dashboard") return CONSTANTS.SIDE_MENU_ICONS.DASHBOARD;
    if (icon === "Tenants") return CONSTANTS.SIDE_MENU_ICONS.TENANTS;
    if (icon === "Clients") return CONSTANTS.SIDE_MENU_ICONS.CLIENTS;
    if (icon === "Users") return `${CONSTANTS.SIDE_MENU_ICONS.USERS} users`;
    if (icon === "Credentials") return CONSTANTS.SIDE_MENU_ICONS.CREDENTIALS;
    if (icon === "Data Hub") return CONSTANTS.SIDE_MENU_ICONS.DATAHUB;
    if (icon === "Notifications") return CONSTANTS.SIDE_MENU_ICONS.NOTIFICATION;
    if (icon === "Settings") return CONSTANTS.SIDE_MENU_ICONS.SETTINGS;
    if (icon === "Documentation")
      return CONSTANTS.SIDE_MENU_ICONS.DOCUMENTATION;
    return "";
  };
  const iconColorChanger = (icon: string) => {
    const selIcon = localStorage.getItem("selectedIcon");
    if (redIcon === icon || selIcon === icon) {
      return `${iconNames(icon) || ""} redIcon`;
    }
    return iconNames(icon);
  };
  const selIconColorChanger = (icon: string) => {
    let iconColor = "";
    const selIcon = localStorage.getItem("selectedIcon");
    if (redIcon === icon || selIcon === icon) {
      iconColor = `redIcon`;
    }
    return iconColor;
  };
  const newPageIconShower = (menuItem: IMenu) => {
    if (menuItem.url) {
      return "newPageWrapper";
    }
    return "d-none";
  };
  const subMenuSetter = (titleName: string) => {
    localStorage.setItem("nestedSubMenu", "");
    if (titleName) localStorage.setItem("subMenu", titleName);
  };
  const nestedSubMenuSetter = (titleName: string) => {
    if (titleName) localStorage.setItem("nestedSubMenu", titleName);
  };

  const subMenuExpander = (titleName: string) => {
    if (iconSelected) {
      return false;
    }
    const subMenuTitle = localStorage.getItem("subMenu");
    const nestedSubMenu = localStorage.getItem("nestedSubMenu");
    if (nestedSubMenu) {
      if (titleName === nestedSubMenu) {
        return true;
      }
    }
    if (subMenuTitle === titleName) {
      return true;
    }
    return false;
  };
  useEffect(() => {
    if (hoverMenu && !buttonClick && !hoverButton) {
      setShowBox(true);
      window.outerWidth > 991 ? setSize("303px") : setSize("auto");
    } else if (!hoverMenu && !buttonClick) {
      setShowBox(false);
    }
  }, [hoverMenu, hoverButton]);
  useEffect(() => {
    if (showBox) {
      window.outerWidth > 991 ? setSize("303px") : setSize("auto");
    } else {
      setSize("100%");
    }
  }, [showBox]);

  const toggleModalBg = (openStatusFlag: string) => {
    if (openStatusFlag?.trim() === "openSideMenu") {
      document.querySelector("#backDropModal")?.classList.add("show");
      document.querySelector("body")?.classList.add("modal-open");
    } else if (openStatusFlag?.trim() === "closeSideMenu") {
      document.querySelector("#backDropModal")?.classList.remove("show");
      document.querySelector("body")?.classList.remove("modal-open");
    }
  };

  useEffect(() => {
    const el: any = document.querySelector(".sideMenuMobWrapper");
    if (parseFloat((window.outerWidth / window.innerWidth).toFixed(2)) === 2) {
      if (buttonClick) {
        el.inert = false;
      } else {
        el.inert = true;
      }
    }

    if (parseFloat((window.outerWidth / window.innerWidth).toFixed(2)) === 1) {
      el.inert = false;
    }

    if (buttonClick) {
      document.querySelector<any>(".sideMenuMobArrowBtn")?.focus();
    }
  }, [buttonClick, zoomedWindowWidth]);

  useEffect(() => {
    if (buttonClick) {
      setShowBox(true);
      window.outerWidth < 992 && toggleModalBg("openSideMenu");
    } else {
      setHoverButton(false);
      setHoverMenu(false);
      setShowBox(false);
      window.outerWidth < 992 && toggleModalBg("closeSideMenu");
    }
  }, [buttonClick]);

  // Define the function to generate the class name
  const getClassName = (isActive: boolean, index: number) => {
    return `nav-sidebar ${index > 2 ? "pl-0" : ""} ${
      isActive && index === 1 ? "nav-sidebar-active" : ""
    }`;
  };
  const mainMenu = (data: any, index: number) => {
    return (
      <li
        key={data.title}
        role="menuitem"
        onMouseOver={() => {
          setRedIcon(data.title);
        }}
        onKeyUp={(event: any) => {
          if (event.key === "Escape") {
            setButtonClick(false);
            setSideMenuToggleStatus(false);
            document.querySelectorAll<any>(".navbar-toggler")[0]?.focus();
          }
        }}
        onClick={() => {
          localStorage.setItem("selectedIcon", data.title);
        }}
        onMouseOut={() => {
          setRedIcon("");
        }}
        onFocus={() => undefined}
        onBlur={() => undefined}
      >
        {data.url ? (
          <NavLink
            aria-label={
              data.url ? `${data.title} opens in a new tab window` : data.title
            }
            to={getRedirectionRoute(data)}
            rel="noreferrer"
            className={({ isActive }) =>
              isActive ? (iconSelected ? "" : "subMenu-active") : "nav-sidebar"
            }
            onClick={(e) => {}}
            onTouchStart={(e) => {
              if (data.path === "/") {
                navigate("/location");
              } else if (data.url) {
                window.open(data.url);
              } else {
                navigate(data.path);
              }
            }}
            target={data.url ? "_blank" : "_self"}
          >
            <p className={showBox ? "d-block" : "d-none"}>{data.title}</p>
            <div className={newPageIconShower(data)}>
              <img
                src="/images/Icons-NewPage.svg"
                alt="icons"
                className="newPage"
              />
            </div>
          </NavLink>
        ) : (
          <NavLink
            to={data.path === "/" ? "/location" : data.path || "/"}
            className={({ isActive }) => getClassName(isActive, index)}
            aria-label={data.title}
            onClick={() => {
              if (index === 1 || index === 2) subMenuSetter("");
            }}
          >
            {iconColorChanger(data.title) &&
              iconNames(data.title) &&
              index < 2 && (
                <span>
                  <i className={`aha-icon-${iconColorChanger(data.title)}`} />
                </span>
              )}

            <p
              className={
                showBox
                  ? `${selIconColorChanger(data.title).trimLeft()} fadeIn`
                  : "d-none"
              }
            >
              {data.title}
            </p>
          </NavLink>
        )}
      </li>
    );
  };
  const subMenu = (menuTitle: any, subs: Array<IMenu>, lockNum: number) => {
    if (
      menuTitle.child[0]?.path?.trim().toLowerCase() === "/settings" &&
      window.outerWidth < 992
    )
      return null;
    return (
      <li
        key={menuTitle.title.replace(/\s/g, "")}
        id={`sidenav-accordion-dropdown${menuTitle.title.replace(/\s/g, "")}`}
        role="menuitem"
        onMouseOver={() => {
          setRedIcon(menuTitle.title);
        }}
        onMouseOut={() => {
          setRedIcon("");
        }}
        onFocus={() => undefined}
        onBlur={() => undefined}
        onKeyUp={(event: any) => {
          if (event.key === "Escape") {
            setButtonClick(false);
            setSideMenuToggleStatus(false);
            document.querySelectorAll<any>(".navbar-toggler")[0]?.focus();
          }
        }}
      >
        <button
          type="button"
          aria-label={menuTitle.title}
          className={
            subMenuExpander(menuTitle.title.replace(/\s/g, "")) && lockNum === 1
              ? "btn btn-text aui-sidenav-acc-header sideMenuBorder"
              : "btn btn-text aui-sidenav-acc-header"
          }
          id={`sidenavHeading${menuTitle.title.replace(/\s/g, "")}`}
          data-toggle="collapse"
          data-target={`#sidenavcollapse${menuTitle.title.replace(/\s/g, "")}`}
          aria-expanded={subMenuExpander(menuTitle.title.replace(/\s/g, ""))}
          aria-controls={`sidenavHeading${menuTitle.title.replace(/\s/g, "")}`}
          onClick={() => {
            lockNum > 1
              ? nestedSubMenuSetter(menuTitle.title.replace(/\s/g, ""))
              : subMenuSetter(menuTitle.title.replace(/\s/g, ""));
            localStorage.setItem("selectedIcon", menuTitle.title);
          }}
        >
          {iconColorChanger(menuTitle.title) &&
            iconNames(menuTitle.title) &&
            lockNum < 2 && (
              <span>
                <i
                  className={`aha-icon-${iconColorChanger(
                    menuTitle.title
                  )} imageIcons`}
                />
              </span>
            )}

          <p className={showBox ? "fadeIn" : "d-none"}>{menuTitle.title}</p>
          <i
            className={
              showBox
                ? "acc-btn-arrow aha-icon-arrow-down subMenuArrow"
                : "d-none"
            }
          />
        </button>
        <ul
          role="menu"
          id={`sidenavcollapse${menuTitle.title.replace(/\s/g, "")}`}
          className={
            subMenuExpander(menuTitle.title.replace(/\s/g, ""))
              ? "aui-sidenav-acc-body show"
              : "aui-sidenav-acc-body collapse"
          }
          aria-label="sidenavHeadingOne"
          data-parent={`#sidenav-accordion-dropdown${menuTitle.title.replace(
            /\s/g,
            ""
          )}`}
          // data-parent="#sideNavbar"
        >
          {subs.map((value, index) =>
            value.child && value.child.length > 0
              ? subMenu(value, value.child, lockNum + 1)
              : mainMenu(value, lockNum + 1)
          )}
        </ul>
      </li>
    );
  };
  return (
    <WidthWrapperSec className="d-flex" buttonClick={buttonClick}>
      <SideMenuWrapper
        className="sideMenuMobWrapper"
        size={size}
        buttonClick={buttonClick}
      >
        <div className="aui-sidenav" role="group">
          <nav
            className="navbar-expand-lg overflow-hidden"
            aria-label="SideMenu"
          >
            {/* <button
              className="navbar-toggler float-right m-3 sideMenuMobHide"
              type="button"
              data-toggle="collapse"
              data-target="#sideNavbar"
              aria-controls="sideNavbar"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="aha-icon-hamburger-round" />
            </button> */}
            {window.outerWidth > 991 && (
              <div className="d-flex">
                <span
                  className={`AHAlogo ${
                    buttonClick || hoverMenu ? "d-none" : "d-block"
                  }`}
                >
                  <img
                    aria-label={
                      buttonClick || hoverMenu ? "A D H logo" : "A H A logo"
                    }
                    src={CONSTANTS.HEADER_LOGO.LOGO_WITHOUT_ADH}
                    alt={buttonClick || hoverMenu ? "A D H Logo" : "A H A Logo"}
                  />
                </span>

                <span
                  className={`AHAlogo ADHlogo ${
                    buttonClick || hoverMenu ? "d-block" : "d-none"
                  }`}
                >
                  <img
                    aria-label={
                      buttonClick || hoverMenu ? "A D H logo" : "A H A logo"
                    }
                    src={CONSTANTS.HEADER_LOGO.LOGO_WITH_ADH}
                    alt={buttonClick || hoverMenu ? "A D H Logo" : "A H A Logo"}
                  />
                </span>
              </div>
            )}
            <div className="expandButton d-flex">
              <Button
                buttonClick={buttonClick}
                aria-label="Navigation Menu"
                aria-expanded={buttonClick ? "true" : "false"}
                type="button"
                className="sideMenuMobArrowBtn"
                onClick={() => {
                  setButtonClick(!buttonClick);
                  setSideMenuToggleStatus(!buttonClick);
                  setSize("100%");
                }}
                onMouseEnter={() => {
                  setHoverButton(true);
                }}
                onMouseLeave={() => {
                  setHoverButton(false);
                }}
                onFocus={() => undefined}
                onBlur={(event: any) => {
                  if (event.shiftKey) {
                    setButtonClick(true);
                    setSideMenuToggleStatus(true);
                    document
                      .querySelectorAll<any>(".navbar-toggler")[0]
                      ?.focus();
                  }
                }}
                tabIndex={0}
              >
                {buttonClick ? (
                  <i className="acc-btn-arrow aha-icon-arrow-down directionRight" />
                ) : (
                  <aui-icon
                    block={false}
                    icon="menubar"
                    svgwidth="15"
                    svgheight="15"
                  />
                )}
              </Button>
              {/* <div className="tooltip-role">
                <span className="tooltiptext">expand the navigation</span>
              </div> */}
            </div>
            <div className="collapse navbar-collapse" id="sideNavbar">
              <ul
                className="w-100 p-0 ul-list"
                role="menu"
                onMouseEnter={() => {
                  setHoverMenu(true);
                }}
                onMouseLeave={() => {
                  setHoverMenu(false);
                  setHoverButton(false);
                }}
                onFocus={() => undefined}
                onBlur={() => undefined}
              >
                {menu.map((value) =>
                  value.child
                    ? subMenu(value, value.child, 1)
                    : mainMenu(value, 1)
                )}
              </ul>
              {+zoomedWindowWidth < 769 && (
                <ul className="w-100 p-0 ul-list profileMobMenu" role="menu">
                  <li role="menuitem">
                    <button
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
                      <i className="aha-icon-avatar-outline" /> Profile
                    </button>
                  </li>
                  <li role="menuitem">
                    <button
                      role="link"
                      type="button"
                      onClick={signOut}
                      className="dropdown-item signOutPadL"
                      onKeyUp={(e: any) => {
                        if (
                          e.keyCode === CONSTANTS.KEY_ENTER ||
                          e.keyCode === CONSTANTS.KEY_SPACEBAR
                        ) {
                          signOut();
                        }
                      }}
                      onKeyDown={(event: any) => {
                        if (!event.shiftKey) {
                          setButtonClick(false);
                          setSideMenuToggleStatus(false);
                        }
                      }}
                      tabIndex={0}
                      aria-label="Sign Out"
                    >
                      <i className="aha-icon-logout" /> <span>Sign Out</span>
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </nav>
        </div>
      </SideMenuWrapper>
    </WidthWrapperSec>
  );
};

export default AHAMenu;
