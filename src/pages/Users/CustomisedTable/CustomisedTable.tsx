import React, { useState, useEffect, useContext, useRef } from "react";
import CONSTANTS from "common/constants";
import {
  closeActionPopoverOnFocusOut,
  lowerCaseAllWordsExceptFirstLetters,
  ssouserProfile,
  toggleAriaExpandedElipses,
} from "common/utils";
import { useNavigate } from "react-router-dom";
import PermissionContext from "services/PermissionManager/PermissionContext";
import CustomTooltip from "components/CustomTooltip";
import { getStatusAction } from "../util";
import { CustomTableWrapper } from "./styled";
import {
  CustomisedTableProps,
  TableColumnsInterface,
  getColorCode,
  getRowClass,
  toggleRolePopover,
} from "./util";

// Main Component
const CustomisedTable: React.FC<CustomisedTableProps> = ({
  columnFields,
  tableData,
  loader,
  onActionEvent,
}) => {
  // State and context setup
  const [columns] = useState<TableColumnsInterface[]>(columnFields);
  const { loggedInUserObjectContext } = useContext(PermissionContext);
  const [records, setRecord] = useState(tableData);
  const [togglePopoverAria] = useState<boolean>(false);

  const navigate = useNavigate();
  const userProfile = ssouserProfile();
  const [isSuperAdminOrClientAdmin, setIsSuperAdminOrClientAdmin] =
    useState(false);
  const [openPopoverId, setOpenPopoverId] = useState<number | null>(null);
  const popoverRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  // Function to toggle the popover for a specific user
  const togglePopover = (userId: number) =>
    setOpenPopoverId((prevOpenId) => (prevOpenId === userId ? null : userId));

  // Effect to set up click outside event listener
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Element;
      const popoverRefsArray = Object.values(popoverRefs.current);
      if (
        target &&
        !target?.classList.contains("circleCount") &&
        !target?.classList.contains("circleWrapper")
      ) {
        popoverRefsArray.forEach((ref: any) => {
          if (ref && ref !== event.target && !ref.contains(event.target)) {
            setOpenPopoverId(null);
          }
        });
      }
    };

    // Attach the event listener to the document
    document.addEventListener("mousedown", handleOutsideClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  // Effect to check user role for super admin or client admin
  useEffect(() => {
    const isUserSuperAdminOrClientAdmin =
      loggedInUserObjectContext?.roleCode ===
        CONSTANTS.USER_ROLES.SUPER_ADMIN ||
      loggedInUserObjectContext?.roleCode === CONSTANTS.USER_ROLES.CLIENT_ADMIN;

    setIsSuperAdminOrClientAdmin(isUserSuperAdminOrClientAdmin);
  }, [loggedInUserObjectContext]);

  // Helper function to restrict access based on user profile
  const restrictAccessForStatusChange = (userEmail: any) => {
    return userProfile.email !== userEmail;
  };

  useEffect(() => {
    setRecord(tableData);
  }, [tableData]);

  // Helper function to generate role icons and tooltips
  const generateHelpIcons = (roleObj: {
    roleId: number;
  }): React.JSX.Element | string => {
    const roleMap: Record<number, { icon: string; tooltip: string }> = {
      1: { icon: "UserSetting.svg", tooltip: "Admin" },
      6: { icon: "UserShield.svg", tooltip: "View Only" },
      4: { icon: "UserPen.svg", tooltip: "View & Edit" },
      5: { icon: "UserPen-Slash.svg", tooltip: "View Only" },
    };

    const roleData = roleMap[roleObj.roleId];
    if (roleData) {
      return (
        <span className="tooltip-role">
          <img
            className="helpTextStyles helpTextStylesImg"
            src={`../images/${roleData.icon}`}
            alt={roleData.tooltip}
          />
          <span className="tooltiptext">{roleData.tooltip}</span>
        </span>
      );
    }

    return "";
  };

  // Helper function to generate inactive role indicator
  const roleInactive = (roleObj: any) => {
    if (roleObj.userRoleStatus === "INACTIVE") {
      return (
        <span className="tooltip-role">
          <i className="helpTextStyles aha-icon-stop" />
          <span className="tooltiptext">Inactive</span>
        </span>
      );
    }
    return "";
  };

  // Helper function to generate badge content based on role details
  const generateBadgeContent = (roleDetailsObj: any) => {
    const returnJsx = (clntName: string, rolename: string) => {
      return (
        <>
          <span className="roleClientName">{rolename}</span>(
          <span>{clntName}</span>)
        </>
      );
    };
    const returnRoleName = (rolename: string) => {
      return <span className="roleName">{rolename}</span>;
    };
    // Check for rolename and client Name mapping
    let roleBadgeContent: React.JSX.Element | null = null;
    if (roleDetailsObj.clientId === null) {
      roleBadgeContent = returnRoleName(roleDetailsObj.roleName);
    } else if (roleDetailsObj.clientId !== null) {
      roleBadgeContent = returnJsx(
        roleDetailsObj.clientName,
        roleDetailsObj.roleName
      );
    }

    return (
      <div
        key={roleDetailsObj.userRoleId}
        className={`roleStylesMin ${getColorCode(roleDetailsObj)}`}
      >
        <p
          title={`${roleDetailsObj.roleName} ${
            roleDetailsObj.clientName ? `(${roleDetailsObj.clientName})` : ""
          }`}
        >
          {generateHelpIcons(roleDetailsObj)}
          {roleBadgeContent}
          {roleInactive(roleDetailsObj)}
        </p>
      </div>
    );
  };

  // Helper function to generate role content
  const generateRoleContent = (userRoleArr: any) => {
    return userRoleArr.length > 0
      ? userRoleArr
          .slice(0, CONSTANTS.ROLE_STATUS.SLICE_COUNT)
          .map(generateBadgeContent)
      : null;
  };

  // Helper function to toggle popover
  const togglePopver = (e: any) => {
    const connectionWrappers = document.querySelectorAll(
      ".connection-td-wrapper"
    );
    const { nextSibling } = e.currentTarget;

    Array.from(connectionWrappers).forEach((el) => {
      if (nextSibling !== el) {
        el.classList.remove("d-flex");
        el.classList.add("d-none");
      }
    });

    /* Accessiility fix */
    toggleAriaExpandedElipses(e.currentTarget);
    closeActionPopoverOnFocusOut(e);
  };

  // Helper function to load user details page
  const loadUserDetails = (userObj: any) => {
    navigate(`${CONSTANTS.PAGE_ROUTES.USERS}/${userObj.id}`);
  };

  // Helper function to generate table columns
  const generateTableCols = (data: any, column: TableColumnsInterface) => {
    const { propertyName } = column;

    if (propertyName === "roles") {
      return (
        <div
          className="aui-td roleColumnWrapper d-flex align-items-center"
          data-title={propertyName}
        >
          {generateRoleContent(data.roles)}
          {data.roles.length > CONSTANTS.ROLE_STATUS.SLICE_COUNT && (
            <div className="circleSec tooltip-role-bkp">
              <button
                type="button"
                onClick={(e) => {
                  toggleRolePopover(e);
                  togglePopover(data.id);
                }}
                className={`${
                  openPopoverId === data.id ? "z-index-6" : ""
                } circleWrapper`}
              >
                <span className="circleCount">
                  +{data.roles.length - CONSTANTS.ROLE_STATUS.SLICE_COUNT}
                </span>
              </button>
              <div
                className={`roleSec ${
                  openPopoverId === data.id ? "d-block" : "d-none"
                }`}
                ref={(ref) => {
                  popoverRefs.current[data.id] = ref;
                }}
              >
                {data.roles
                  .slice(
                    CONSTANTS.ROLE_STATUS.SLICE_COUNT,
                    data.roles.length + 1
                  )
                  .map((roleData: any) => generateBadgeContent(roleData))}
              </div>
            </div>
          )}
        </div>
      );
    }

    if (propertyName === "status") {
      return (
        <div className="aui-td" data-title={propertyName}>
          <span>{lowerCaseAllWordsExceptFirstLetters(data[propertyName])}</span>
        </div>
      );
    }

    if (propertyName === "name") {
      return (
        <div className="aui-td userNameColumn">
          <button
            title={
              data.firstName.length > 0
                ? `${data.firstName} ${data.lastName}`
                : `${data.name}`
            }
            data-testid="userdetail"
            type="button"
            className="adh-anchorStyle mb-0 noBtnStyle pl-0"
            onClick={() => loadUserDetails(data)}
          >
            <span className="name-ellipsis">
              {data.firstName.length > 0
                ? `${data.firstName} ${data.lastName}`
                : `${data.name}`}
            </span>
          </button>
        </div>
      );
    }

    return (
      <div className="aui-td" data-title={propertyName}>
        <span>{data[propertyName]}</span>
      </div>
    );
  };

  // Helper function to send data to parent component
  const sendDataToParent = async (event: any, data: any) => {
    onActionEvent({ event, user: data });
  };

  return (
    <CustomTableWrapper>
      <aui-table
        type="status"
        loader={loader}
        headerbackground
        loadertype="content"
      >
        <table className="aui-responsive-status-table">
          <thead>
            <tr>
              {columns?.map((column) => (
                <th key={column.name} scope="col" className={column.class}>
                  <div className="aui-th">
                    <div className="placeHolderWrapper">{column.name}</div>
                  </div>
                </th>
              ))}

              {/* Action Column Table Header */}
              <th scope="col" className="action-col">
                <div className="aui-th">Action</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {records?.map((user: any) => (
              <tr
                key={user.id + user.name}
                className={getRowClass(user.status)}
              >
                {columns?.map((column: TableColumnsInterface) => (
                  <td
                    key={column.propertyName + user.id}
                    data-title={column.name}
                  >
                    {generateTableCols(user, column)}
                  </td>
                ))}
                {/* Action Column Table Body */}
                <td data-title="Actions">
                  <div className="aui-td actions-column">
                    <div className="tooltip-role">
                      <button
                        data-testid="View more"
                        type="button"
                        aria-label={`View More for ${user.name}`}
                        className="noBtnStyle btnEllipses rotate-90-anti pb-1"
                        tabIndex={0}
                        aria-expanded={togglePopoverAria}
                        onClick={(e) => togglePopver(e)}
                      >
                        <CustomTooltip
                          content=" View More"
                          tooltipid="customisedtbl-viewmore"
                        >
                          <i className="aha-icon-meat-balls" />
                        </CustomTooltip>
                      </button>
                      <div className="d-none connection-td-wrapper">
                        <div className="popoverWrapper">
                          <button
                            type="button"
                            className="noBtnStyle mb-2"
                            onClick={() => loadUserDetails(user)}
                          >
                            View
                          </button>
                          {restrictAccessForStatusChange(user.email) &&
                          isSuperAdminOrClientAdmin ? (
                            <>
                              <button
                                type="button"
                                className="noBtnStyle mb-2"
                                onClick={(e: any) => {
                                  sendDataToParent(e, user);
                                }}
                              >
                                {getStatusAction(user.status)}
                              </button>
                              <button
                                type="button"
                                className="noBtnStyle mb-2"
                                onClick={(e: any) => {
                                  sendDataToParent(e, user);
                                }}
                              >
                                Delete
                              </button>
                            </>
                          ) : null}
                        </div>
                      </div>
                      {/* <span className="tooltiptext viewMoreKebab">
                        View More
                      </span> */}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </aui-table>
    </CustomTableWrapper>
  );
};

export default CustomisedTable;
