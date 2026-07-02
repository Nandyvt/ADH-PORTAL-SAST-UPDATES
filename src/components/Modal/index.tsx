/* eslint-disable react/require-default-props */
import React, { FunctionComponent, useEffect, useRef } from "react";
import { FocusTrap } from "focus-trap-react";
import ModalWrapper from "./styled";

export interface ModalProps {
  isShown: boolean;
  hide: () => void;
  id?: number;
  action?: (id: number, status: string) => any;
  status: string;
  modalContent: string;
  message?: string;
  roles: {
    roleId: string;
    roleName: string;
    clientName: string;
    clientId: number; // added to maintain unique key for roles list
  }[];
  mainIcon: string;
  callback?: (status: boolean) => void;
}

function getClassName(roleObj: any) {
  let className = "";
  switch (roleObj.roleName.toLowerCase()) {
    case "super admin":
      className = "super-admin";
      break;
    case "super user":
      className = "super-admin";
      break;
    case "aha - admin":
      className = "aha-admin";
      break;
    case "client admin":
      className = "client-admin";
      break;
    case "client user":
      className = "client-user";
      break;
    default:
      break;
  }
  return roleObj.userRoleStatus === "INACTIVE"
    ? `roleColorCodeINACTIVE ${className}`
    : className;
}

const generateHelpIcons = (roleObj: any) => {
  // super admin
  if (roleObj.roleId === 1) {
    return (
      <span className="tooltip-role">
        <img
          className="helpTextStyles helpTextStylesImg"
          src="../images/UserSetting.svg"
          alt="admin"
        />
        <span className="tooltiptext">Admin</span>
      </span>
    );
  }
  // super user
  if (roleObj.roleId === 6) {
    return (
      <span className="tooltip-role">
        <img
          className="helpTextStyles helpTextStylesImg"
          src="../images/UserShield.svg"
          alt="View Only"
        />
        <span className="tooltiptext">View Only</span>
      </span>
    );
  }
  // client admin
  if (roleObj.roleId === 4) {
    return (
      <span className="tooltip-role">
        <img
          className="helpTextStyles helpTextStylesImg"
          src="../images/UserPen.svg"
          alt="View & Edit"
        />
        <span className="tooltiptext">View & Edit</span>
      </span>
    );
  }
  // client user
  if (roleObj.roleId === 5) {
    return (
      <span className="tooltip-role">
        <img
          className="helpTextStyles helpTextStylesImg"
          src="../images/UserPen-Slash.svg"
          alt="View Only"
        />
        <span className="tooltiptext">View Only</span>
      </span>
    );
  }

  return "";
};
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
const generateBadgeContent = (roleDetailsObj: any) => {
  const returnJsx = (clientName: string, roleName: string) => {
    return (
      <>
        <span className="roleClientName">{roleName}</span> (
        <span>{clientName}</span>)
      </>
    );
  };
  const returnRoleName = (roleName: string) => {
    return <span className="roleName">{roleName}</span>;
  };
  let roleBadgeContent: any = "";
  // check for rolename and client Name mapping
  if (roleDetailsObj.clientId === null) {
    roleBadgeContent = returnRoleName(roleDetailsObj.roleName);
  } else if (roleDetailsObj.clientId !== null)
    roleBadgeContent = returnJsx(
      roleDetailsObj.clientName,
      roleDetailsObj.roleName
    );

  return roleBadgeContent;
};
const Modal: FunctionComponent<ModalProps> = ({
  isShown,
  hide,
  id,
  action,
  modalContent,
  message,
  status,
  roles,
  mainIcon,
  callback,
}) => {
  const RefFocus = useRef<any>();
  useEffect(() => {
    if (isShown && RefFocus.current) RefFocus.current.focus();
    if (isShown) {
      document.querySelector(".modal-backdrop")?.classList.add("show");
      document.querySelector("body")?.classList.add("modal-open");
    }
  }, [isShown]);
  const modal = (
    <FocusTrap
      focusTrapOptions={{
        initialFocus: false,
        fallbackFocus: `.modal`,
      }}
    >
      <ModalWrapper>
        <div
          className="modal fade show aui-modal"
          tabIndex={-1}
          aria-labelledby="modal-title"
          aria-describedby="modal-content"
          aria-modal="true"
          ref={RefFocus}
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered modal-md inviteuser-modal modalwidth">
            <div className="modal-content pl-0 pr-0 pb-40 d-flex flex-column justify-content-end">
              <div className="d-flex justify-content-center align-items-center">
                <img
                  src={`/images/${mainIcon}.svg`}
                  className="lockimg"
                  alt=""
                />
              </div>
              <p id="modal-title" className="visuallyhidden" aria-hidden="true">
                Confirmation modal
              </p>
              <div className="text-center">
                <p
                  id="modal-content"
                  data-testid="modal-content"
                  className="modal-text mb-0"
                >
                  {modalContent}
                </p>
                {message ? <p className="warning-msg mb-0">{message}</p> : ""}
                {roles && roles.length > 0 ? (
                  <div className="container">
                    <div
                      role="list"
                      className="row align-items-center justify-content-center pl-5 pr-5 pad-styles-sml"
                    >
                      {roles.map((role) => {
                        return (
                          <div
                            role="listitem"
                            key={`${role.roleId}-${role.clientId}`}
                            className="pr-2 pt-1"
                          >
                            <div
                              className={`${getClassName(
                                role
                              )} role-text d-flex justify-content-center`}
                            >
                              {generateHelpIcons(role)}
                              <p className="mb-0">
                                {generateBadgeContent(role)}
                              </p>
                              {roleInactive(role)}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="mt-4 mb-4 d-flex flex-row justify-content-center">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      hide();
                      callback?.(false);
                    }}
                    className="btn btn-secondary btn-round btn-sm mx-3 cnf-btn"
                    data-dismiss="modal"
                    aria-label="No"
                    data-testid="no-button"
                  >
                    No
                  </button>
                  <button
                    type="button"
                    onClick={async (e) => {
                      if (id) {
                        await action?.(id, status);
                      }
                      if (callback) {
                        callback?.(true);
                      }
                      hide();
                    }}
                    className="btn btn-primary btn-round btn-sm mx-2 cnf-btn"
                    data-testid="yes-button"
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalWrapper>
    </FocusTrap>
  );
  return isShown ? modal : null;
};

export default Modal;
