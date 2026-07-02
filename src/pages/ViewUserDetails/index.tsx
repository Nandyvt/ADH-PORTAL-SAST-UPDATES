/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { Wrapper } from "styled";
import store from "app/store";
import Modal from "components/Modal";
import {
  addRolePostService,
  getUserByID,
  userRoleDeleteService,
  userRoleStatusChangeService,
} from "services/api/user.api";
import { reInviteUserService } from "services/api/inviteUser.api";
import { hideToast, showToast } from "components/Toast/toast.slice";
import { useDispatch } from "react-redux";
import { setPageLoadingStatus } from "components/Loader/loader.slice";
import { getRoles } from "services/api/settings.api";
import PermissionContext from "services/PermissionManager/PermissionContext";
import { ClientListService } from "services/api/clients.api";
import { UserStatusChanger, userDelete } from "services/api/userDelete";
import { FocusTrap } from "focus-trap-react";
import CustomTooltip from "components/CustomTooltip";
import {
  getErrorMessage,
  getMainIcon,
  isEllipsisActive,
  lowerCaseAllWordsExceptFirstLetters,
  ssouserProfile,
  toggleModalStyles,
} from "common/utils";
import CONSTANTS from "common/constants";
import {
  getStatusAction,
  updateModalContent,
} from "../../components/Modal/util";
import { ViewUserDetailsWrapperStyles } from "./Styled";
import { roleInfo } from "./util";

/* -----------------------  Helper Functions  ----------------------- */

/** Return role code based on role ID. */
function getRoleCodeFromRoleId(roleId: number): string {
  switch (roleId) {
    case 1:
      return "SUPER_ADMIN";
    case 2:
      return "ADMIN";
    case 3:
      return "ADMIN_VIEW";
    case 4:
      return "CLIENT_ADMIN";
    case 5:
      return "CLIENT_USER";
    case 6:
      return "SUPER_USER";
    default:
      return "";
  }
}

/** Get style classes and textual name based on role object. */
function getColorCodenCatName(roleObj: any) {
  const roleDetails = { roleName: "", roleStyleCls: "", containerCls: "" };
  let combinedCls = "";
  if (roleObj.userRoleStatus === "INACTIVE") {
    combinedCls = "roleColorCodeINACTIVE";
  }

  // Evaluate role
  switch (roleObj.roleId) {
    case 1:
      roleDetails.roleName = "Super Admin";
      roleDetails.roleStyleCls = `roleColorCodeSA ${combinedCls}`;
      roleDetails.containerCls =
        roleObj.userRoleStatus.trim().toLowerCase() === "active"
          ? "containerSA"
          : "containerTN";
      return roleDetails;

    case 4:
      roleDetails.roleName = "Vendors";
      roleDetails.roleStyleCls = `roleColorCodeCL ${combinedCls}`;
      roleDetails.containerCls =
        roleObj.userRoleStatus.trim().toLowerCase() === "active"
          ? "containerSA"
          : "containerTN";
      return roleDetails;

    case 5:
      roleDetails.roleName = "Client User";
      roleDetails.roleStyleCls = `roleColorCodeEU ${combinedCls}`;
      roleDetails.containerCls =
        roleObj.userRoleStatus.trim().toLowerCase() === "active"
          ? "containerSA"
          : "containerTN";
      return roleDetails;

    case 6:
      roleDetails.roleName = "Super User";
      roleDetails.roleStyleCls = `roleColorCodeSA ${combinedCls}`;
      roleDetails.containerCls =
        roleObj.userRoleStatus.trim().toLowerCase() === "active"
          ? "containerSA"
          : "containerTN";
      return roleDetails;

    default:
      return roleDetails;
  }
}

/** Render help icons for a given role. */
function generateHelpIcons(roleObj: { roleId: number }) {
  const info = roleInfo[roleObj.roleId];
  if (!info) return null;

  return (
    <span className="Img-tooltip">
      <img
        className="helpTextStyles helpTextStylesImg"
        src={info.src}
        alt={info.alt}
      />
    </span>
  );
}

/** Show "Inactive" icon if userRoleStatus is INACTIVE. */
function roleInactive(roleObj: any) {
  if (roleObj.userRoleStatus === "INACTIVE") {
    return (
      <span className="tooltip-role">
        <CustomTooltip tooltipid="inactive-role" content="Inactive">
          <i className="helpTextStyles aha-icon-stop" />
        </CustomTooltip>
      </span>
    );
  }
  return null;
}

/** For the "Are you sure you want to x?" modals. */
function getMessage(action: string) {
  const lower = action.toLocaleLowerCase();
  if (lower === "activate") {
    return "Activating user will associate following roles";
  }
  if (lower === "deactivate") {
    return "Deactivating user will disassociate following roles";
  }
  if (lower === "delete") {
    return `Deleting user will disassociate following roles \n You won’t be able to revert this`;
  }
  return "";
}

/** Build final text shown in modals for role-based actions. */
function generateModalContent(roleDetailsObj: any) {
  // check for role name and client name mapping
  if (!roleDetailsObj) return "";
  if (roleDetailsObj.clientId === null) return roleDetailsObj.roleName || "";
  return `${roleDetailsObj.clientName}-${roleDetailsObj.roleName}`;
}

/** Build the main badge label for a role. */
function generateBadgeContent(roleDetailsObj: any) {
  const { roleName, clientName, clientId } = roleDetailsObj;
  if (clientId === null) {
    return <span className="roleName">{roleName}</span>;
  }
  return (
    <>
      <span className="roleClientName">{roleName}</span> (
      <span title={clientName}>{clientName}</span>)
    </>
  );
}

/** Render role cards. */
function renderGroupedRoleCards(
  groupRoleArr: any[],
  isSuperAdminOrClientAdmin: boolean,
  openPopoverId: number | null,
  popoverRefs: React.MutableRefObject<{ [key: number]: HTMLDivElement | null }>,
  restrictAccessForStatusChange: (email: string) => boolean,
  togglePopoverRef: (userRoleId: number) => void,
  getColorCodenCatNameFn: typeof getColorCodenCatName
) {
  return groupRoleArr?.map((item: any, index: number) => {
    const roleClsData = getColorCodenCatNameFn(item);
    return (
      <div key={`${item.roleId}_${item.userRoleId}_${item.clientName}`}>
        <div className={`containerSection ${roleClsData.containerCls}`}>
          <div className="helpTextWrapper justify-content-between">
            <div>
              <span className="roleText">Role</span>
            </div>
            {isSuperAdminOrClientAdmin && (
              <div className="ml-3 text-right mb-1 role-ellipse tooltip-role">
                {restrictAccessForStatusChange(item.email) && (
                  <div className="d-flex">
                    {roleInfo[item.roleId].tooltip === "View Only" && (
                      <div>
                        <CustomTooltip
                          tooltipid="adminclient-viewonly"
                          content="View Only"
                        >
                          <aui-icon
                            icon="penciluneditable"
                            svgwidth="14"
                            svgheight="14"
                          />
                        </CustomTooltip>
                      </div>
                    )}
                    <button
                      type="button"
                      aria-label="View More Option"
                      className={`noBtnStyle btnEllipses  ${
                        openPopoverId === item.userRoleId
                          ? "rotate-90"
                          : "rotate-90-anti"
                      }`}
                      tabIndex={0}
                      aria-expanded={false}
                      onClick={() => togglePopoverRef(item.userRoleId)}
                    >
                      <CustomTooltip content="View More" tooltipid="viewmore">
                        <i className="aha-icon-meat-balls" />
                      </CustomTooltip>
                    </button>

                    <div
                      className={`connection-td-wrapper ${
                        openPopoverId === item.userRoleId ? "d-block" : "d-none"
                      }`}
                      ref={(ref) => {
                        popoverRefs.current[item.userRoleId] = ref;
                      }}
                    >
                      <div className="popoverWrapper">
                        {/* Popover content rendered in main code */}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="no-gutters  mb-2 roleContainer">
            <div className="roleSec">
              <div className="groupedRoleStyle">
                <p className={`roleStylesMin pl-0 ${roleClsData.roleStyleCls}`}>
                  {generateHelpIcons(item)}
                  {generateBadgeContent(item)}
                  {roleInactive(item)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
}

/** Check if we can change user or role status. */
function userRestrictAccessForStatusChange(
  userEmail: string | undefined,
  currentUserEmail: string
) {
  if (typeof userEmail === "undefined") return false;
  return currentUserEmail !== userEmail;
}

/** Decide className for user status. */
function getClassNameUserStatus(status: string) {
  if (status === "ACTIVE") return "user-status-activate";
  if (status === "INACTIVE") return "user-status-inactivate";
  if (status === "PENDING") return "user-status-pending";
  return "";
}

// Extract tooltip into its own component
const TextWithTooltip = ({ text, className }: any) => {
  const textRef = React.useRef(null);
  const [showTooltip, setShowTooltip] = React.useState(false);

  React.useEffect(() => {
    const checkEllipsis = () => {
      const element: any = textRef.current;
      if (element) {
        setShowTooltip(element.offsetWidth < element.scrollWidth);
      }
    };

    checkEllipsis();
    window.addEventListener("resize", checkEllipsis);
    return () => window.removeEventListener("resize", checkEllipsis);
  }, [text]);

  return (
    <div
      className={`tooltip-role ${className} ${
        showTooltip ? "cursPointer" : ""
      }`}
    >
      <span ref={textRef} className="headingTooltipEle header-title">
        {text}
      </span>
      {showTooltip && <span className="tooltiptext">{text}</span>}
    </div>
  );
};

const UserHeading = ({ selectedUserObject }: any) => {
  const fullName = `${selectedUserObject?.firstName ?? ""} ${
    selectedUserObject?.lastName ?? ""
  }`.trim();
  const headingText = `Roles of ${fullName}`;

  return (
    <h1
      className="user-heading"
      aria-label={`Users ${fullName}`}
      data-testid="test-viewUser"
    >
      <TextWithTooltip
        text={headingText}
        className="headingWrapperTooltip ml-0"
      />
    </h1>
  );
};

/* -----------------------  Main Component  ----------------------- */

const ViewUserDetailsComp: FunctionComponent<any> = () => {
  const { id } = useParams<{ id: string }>();
  const userProfile = ssouserProfile();
  const { loggedInUserObjectContext } = useContext(PermissionContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [toggleStatus, setToggleStatus] = useState(false);
  const [shouldShowAddRole, setShouldShowAddRole] = useState(true);
  const [isSuperAdminOrClientAdmin, setIsSuperAdminOrClientAdmin] =
    useState(false);

  const [selectedUserObject, setUserObject] = useState<any>({});
  const [openPopoverId, setOpenPopoverId] = useState<number | null>(null);
  const popoverRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  // For the add/edit role modals
  const [toggleAddRoleModal, setToggleAddRoleModal] = useState(false);
  const [toggleEditAccessModal, setToggleEditAccessModal] = useState(false);
  const [roleAdded, setRoleAdded] = useState(false);
  const [viewClientSelect, setViewClientSelect] = useState(false);
  const [clientAdded, setClientAdded] = useState(false);
  const [editRole, setEditRole] = useState(false);

  const [mainIcon, setMainIcon] = useState<string>("Lock");
  const [message, setMessageState] = useState<string>("");
  const [apiStatus, setApiStatus] = useState<string>("");
  const [roleStatusModal] = useState<string>("");
  const [roleCodeApi, setRoleCodeApi] = useState<string>("");
  const [modalApiId] = useState<any>(null);

  const [apiReqClientId] = useState<any>({});
  const [addRoleDropDownData, setAddRoleDropDownData] = useState<any>([]);
  const [AddRoleClientData, setAddRoleClientData] = useState<any>([]);

  // Refs for accessibility/focus
  const RefFocus = useRef<any>();
  const [imageLoading, setImageLoading] = useState(true);
  const imageUrl = "../images/Close.svg";
  const imageLoaded = () => setImageLoading(false);

  // Roles grouping in UI
  const [roleCardStateSA, setRoleCardStateSA] = useState<any>([]);
  const [roleCardStateCL, setRoleCardStateCL] = useState<any>([]);

  // For "Edit Access" - switching roles
  const [levelDropDownData, setLevelDropdownData] = useState<any>([]);
  const [roleObjSwitchAccess] = useState<any>({});

  // For user-level statuses
  const [userStatus, setUserStatus] = useState("");
  const [userId, setUserId] = useState(0);
  const [roleName, setRoleName] = useState<any>([]);
  const [userEllipsesPopover, setUserEllipsesPopover] = useState(false);

  /* ------ Form Setup (Add Role) ------ */
  const UIschema = yup.object().shape({
    roleCode: yup.string().required("Role required"),
    clientId: yup.string(),
  });
  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(UIschema),
  });

  /* -----------------------  Utility Functions  ----------------------- */

  const [isShown, setIsShown] = useState<boolean>(false);
  const toggle = useCallback(() => {
    // eslint-disable-next-line no-debugger
    debugger;
    document.querySelector(".modal-backdrop")?.classList.toggle("show");
    document.querySelector("body")?.classList.toggle("modal-open");
    return setIsShown((prev) => !prev);
  }, [isShown]);

  function setMessage(action: string) {
    setMessageState(getMessage(action));
    setMainIcon(getMainIcon(action));
  }

  // Set role states when user roles are fetched
  function resetRoleCards(rolesArrObj: any) {
    setRoleCardStateSA([]);
    setRoleCardStateCL([]);
    if (!rolesArrObj || rolesArrObj.length === 0) return;

    rolesArrObj.forEach((roleItem: any) => {
      if (roleItem.roleId === 1 || roleItem.roleId === 6) {
        setRoleCardStateSA((prevState: any) => [...prevState, roleItem]);
      } else if (roleItem.roleId === 4 || roleItem.roleId === 5) {
        setRoleCardStateCL((prevState: any) => [...prevState, roleItem]);
      }
    });
  }

  function fetchUserDetailsAPI(pageloadStatus: boolean) {
    getUserByID(Number(id))
      .then((userObj) => {
        if (userObj?.data?.user) {
          const newUser = userObj.data?.user;
          setUserObject(newUser);
          resetRoleCards(newUser.roles);
          dispatch(setPageLoadingStatus({ isPageLoading: false }));
        }
      })
      .catch((error) => {
        store.dispatch(
          showToast({
            title: "Error Occurred.",
            message: getErrorMessage(error),
          })
        );
        navigate("/users");
        dispatch(setPageLoadingStatus({ isPageLoading: false }));
      });
  }

  // Popover toggling
  const togglePopover = () => {
    setOpenPopoverId(null);
    const popover = document.getElementById(
      "user-action-popover"
    ) as HTMLElement;
    popover.classList.toggle("d-none");
    popover.classList.toggle("d-flex");

    const userActionBtn = document.getElementById(
      "user-action-btn"
    ) as HTMLElement;
    userActionBtn.classList.toggle("rotate-90");
    userActionBtn.classList.toggle("rotate-90-anti");
  };

  // Function to toggle popover for a specific user
  const togglePopoverRef = (userRoleId: number) => {
    const popover = document.getElementById(
      "user-action-popover"
    ) as HTMLElement;
    popover.classList.add("d-none");
    popover.classList.remove("d-flex");
    const userActionBtn = document.getElementById(
      "user-action-btn"
    ) as HTMLElement;
    userActionBtn.classList.remove("rotate-90");
    userActionBtn.classList.add("rotate-90-anti");

    setOpenPopoverId((prevOpenId) =>
      prevOpenId === userRoleId ? null : userRoleId
    );
  };

  // Called inside "Add Role" flow
  const getActiveClientData = () => {
    ClientListService({
      isActive: true,
      pageSize: CONSTANTS.MAX_RECORDS,
    })
      .then((response: any) => {
        if (response?.data?.clients) {
          setAddRoleClientData(response?.data?.clients);
        } else {
          setAddRoleClientData([]);
        }
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
        setRoleAdded(true);
      });
  };

  function dropDownDecider(e: any) {
    const { value: roleSelected } = e.target;
    if (roleSelected === "CLIENT_USER" || roleSelected === "CLIENT_ADMIN") {
      getActiveClientData();
      setViewClientSelect(true);
      return;
    }
    setViewClientSelect(false);
  }

  function resetAddRoleInitialView() {
    reset();
    setViewClientSelect(false);
    setRoleAdded(false);
    setClientAdded(false);
    const roleInput = document.querySelector<any>("#selectRole");
    const clientInput = document.querySelector<any>("#selectClient");
    if (roleInput) roleInput.value = "";
    if (clientInput) clientInput.value = "";
  }

  // "Add Role" form submission
  const submitFormAddRoleModal = (formdata: any) => {
    dispatch(setPageLoadingStatus({ isPageLoading: true }));
    formdata.clientId =
      !viewClientSelect || !formdata.clientId?.trim() ? "0" : formdata.clientId;

    addRolePostService({
      userId: id,
      postData: formdata,
    })
      .then(() => {
        store.dispatch(
          showToast({
            type: "success",
            title: "Success",
            message: "Roles added successfully",
          })
        );
      })
      .catch((error: any) => {
        store.dispatch(
          showToast({
            type: "danger",
            title: "Error",
            message: getErrorMessage(error),
          })
        );
      })
      .finally(() => {
        fetchUserDetailsAPI(false);
        toggleModalStyles();
        setToggleAddRoleModal(false);
        dispatch(setPageLoadingStatus({ isPageLoading: false }));
        setImageLoading(true);
      });
  };

  // "Edit Access" flow: roles at the same level
  function getSameLevelRolesAPI(selectedUserRoleId: number) {
    const generateLevelsFromRoleId = (roleId: number) => {
      if (roleId === 1 || roleId === 6) return 0;
      if (roleId === 2 || roleId === 3) return 1;
      if (roleId === 4 || roleId === 5) return 2;
      return null;
    };

    const level = generateLevelsFromRoleId(selectedUserRoleId);
    if (level === null) return;

    getRoles({
      isActive: true,
      level: "eq".concat(",", `${level}`),
    })
      .then((response: any) => {
        if (response?.data?.roles) {
          setLevelDropdownData(response.data.roles);
        } else {
          setLevelDropdownData([]);
        }
      })
      .catch((error) => {
        store.dispatch(
          showToast({
            type: "danger",
            title: "Error Occured",
            message: getErrorMessage(error),
          })
        );
      });
  }

  // "Add Role" flow: roles data
  const getAddRolesDataAPI = () => {
    getRoles({
      isActive: true,
      level: `gte,${loggedInUserObjectContext?.roleLevel}`,
    })
      .then((response: any) => {
        if (response?.data?.roles) {
          setAddRoleDropDownData(response.data.roles);
        } else {
          setAddRoleDropDownData([]);
        }
      })
      .catch((error) => {
        store.dispatch(
          showToast({
            type: "danger",
            title: "Error Occured",
            message: getErrorMessage(error),
          })
        );
      });
  };

  // Combined form states for toggling
  function buttonStatusSetter() {
    if (!roleAdded) return true;
    if (viewClientSelect && !clientAdded) return true;
    return false;
  }

  // Central "ApiCaller" for role-based actions
  const ApiCaller = (idapi: number, roleStatus: string) => {
    if (apiStatus === "roleSwitch") {
      userRoleStatusChangeService(
        idapi,
        roleStatus,
        roleCodeApi,
        apiReqClientId.clientId
      )
        .then(() => {
          setToggleStatus(!toggleStatus);
          store.dispatch(
            showToast({
              type: "success",
              title: "Success",
              message: "User role has been switched successfully",
            })
          );
          fetchUserDetailsAPI(false);
          toggleModalStyles();
          setToggleEditAccessModal(false);
          setImageLoading(true);
        })
        .catch((errors) => {
          store.dispatch(
            showToast({
              title: "Error",
              message: getErrorMessage(errors),
            })
          );
        });
    } else if (apiStatus === "status") {
      userRoleStatusChangeService(
        idapi,
        roleStatus,
        roleCodeApi,
        apiReqClientId.clientId
      )
        .then(() => {
          setToggleStatus(!toggleStatus);
          const successMsg =
            roleStatus === "ACTIVE"
              ? "User role activated successfully"
              : "User role deactivated successfully";
          store.dispatch(
            showToast({
              type: "success",
              title: "Success",
              message: successMsg,
            })
          );
          fetchUserDetailsAPI(false);
          togglePopoverRef(idapi);
        })
        .catch((error) => {
          store.dispatch(
            showToast({
              title: "Error Occurred.",
              message: getErrorMessage(error),
            })
          );
        });
    } else if (apiStatus === "delete") {
      userRoleDeleteService(idapi)
        .then(() => {
          setToggleStatus(!toggleStatus);
          store.dispatch(
            showToast({
              type: "success",
              title: "Success",
              message: "User role deleted successfully",
            })
          );
          if (roleCardStateSA.length + roleCardStateCL.length <= 1) {
            navigate("/users");
          } else {
            fetchUserDetailsAPI(false);
          }
          togglePopoverRef(idapi);
        })
        .catch((errors) => {
          store.dispatch(
            showToast({
              title: "Error",
              message: getErrorMessage(errors),
            })
          );
        });
    }
  };

  // For user-level actions
  const UserApiCaller = (idNumber: number, status: string) => {
    if (apiStatus === "status") {
      UserStatusChanger(idNumber, status)
        .then((response) => {
          // If user is already in that state:
          if (response?.data?.message) {
            store.dispatch(
              showToast({
                type: "success",
                title: "Success",
                message: "Duplicate action - User role was already deactivated",
              })
            );
            setUserEllipsesPopover(false);
            return;
          }
          setToggleStatus(!toggleStatus);
          const successMsg =
            status === "ACTIVE"
              ? "User activated successfully"
              : "User deactivated successfully";
          store.dispatch(
            showToast({
              type: "success",
              title: "Success",
              message: successMsg,
            })
          );
          fetchUserDetailsAPI(false);
          setUserEllipsesPopover(false);
        })
        .catch((error) => {
          store.dispatch(
            showToast({
              title: "Error Occurred.",
              message: getErrorMessage(error),
            })
          );
        });
      togglePopover();
    } else if (apiStatus === "delete") {
      userDelete(idNumber)
        .then(() => {
          setToggleStatus(!toggleStatus);
          store.dispatch(
            showToast({
              type: "success",
              title: "Success",
              message: "User deleted successfully",
            })
          );
          navigate("/users");
        })
        .catch((errors) => {
          store.dispatch(
            showToast({
              title: "Error",
              message: getErrorMessage(errors),
            })
          );
        });
    }
  };

  function setModalContent(content: string) {
    // wrapper to match usage
    setMessageState(content);
  }

  // For "Activate/Deactivate" user
  function userStatusButtonHandler(
    status: string,
    userID: number,
    name: string
  ) {
    setUserStatus(
      status === CONSTANTS.USER_STATUS.INACTIVE
        ? CONSTANTS.USER_STATUS.ACTIVE
        : CONSTANTS.USER_STATUS.INACTIVE
    );
    setUserId(userID);
    setModalContent(
      updateModalContent(getStatusAction(status ? "active" : "inactive"), name)
    );
    toggle();
  }

  // Re-Invite user if they are in "PENDING" status
  const reInviteUserAction = async (
    userIdParam: string,
    toggler: any,
    event: any
  ) => {
    event.persist();
    reInviteUserService(userIdParam)
      .then(() => {
        store.dispatch(
          showToast({
            type: "success",
            title: "Success",
            message: "User has been re-invited successfully",
          })
        );
        toggler(event);
      })
      .catch((err: any) => {
        store.dispatch(
          showToast({
            type: "danger",
            title: "Error occured while re-inviting user",
            message: getErrorMessage(err),
          })
        );
        toggler(event);
      });
  };

  // Toggles
  function dropDownToggler(e: any) {
    e.currentTarget.nextSibling.classList.toggle("rotate");
  }
  function dropDownDefaultState(e: any) {
    if (e.currentTarget.nextSibling.classList.contains("rotate")) {
      e.currentTarget.nextSibling.classList.remove("rotate");
    }
  }
  function closeActionPopover(event: any) {
    if (event.target.id !== "aha-setting-icon") {
      const popover = document.getElementById("popover");
      popover?.classList.remove("d-flex");
      popover?.classList.add("d-none");
    }
  }

  // Lifecycle
  useEffect(() => {
    document.body.addEventListener("click", closeActionPopover);
    dispatch(setPageLoadingStatus({ isPageLoading: true }));
    fetchUserDetailsAPI(true);
    store.dispatch(hideToast());

    // Clean up
    return () => {
      document.body.removeEventListener("click", closeActionPopover);
    };
  }, []);

  // Evaluate what roles can do
  useEffect(() => {
    if (!loggedInUserObjectContext) return;

    const { roleCode } = loggedInUserObjectContext;
    const { status } = selectedUserObject;
    if (roleCode === CONSTANTS.USER_ROLES.SUPER_ADMIN) {
      // Only show "Add Role" if user is ACTIVE
      setShouldShowAddRole(status === CONSTANTS.ROLE_STATUS.ACTIVE);
      setIsSuperAdminOrClientAdmin(status === CONSTANTS.ROLE_STATUS.ACTIVE);
    } else if (roleCode === CONSTANTS.USER_ROLES.CLIENT_ADMIN) {
      setShouldShowAddRole(false);
      setIsSuperAdminOrClientAdmin(status === CONSTANTS.ROLE_STATUS.ACTIVE);
    } else if (
      roleCode === CONSTANTS.USER_ROLES.CLIENT_USER ||
      roleCode === CONSTANTS.USER_ROLES.SUPER_USER
    ) {
      setShouldShowAddRole(false);
      setIsSuperAdminOrClientAdmin(false);
    }
  }, [loggedInUserObjectContext, selectedUserObject]);

  // Handle focus for modals
  useEffect(() => {
    if (toggleAddRoleModal && RefFocus.current && !imageLoading) {
      RefFocus.current.focus();
    }
  }, [toggleAddRoleModal, imageLoading]);
  useEffect(() => {
    if (toggleEditAccessModal && RefFocus.current && !imageLoading) {
      RefFocus.current.focus();
    }
  }, [toggleEditAccessModal, imageLoading]);

  // Some sticky mobile behavior
  let prevScrollposBtnSec = window.scrollY;
  const makeBtnSectionStickyMobile = () => {
    const elBtn = document.getElementsByClassName("btn-background");
    window.addEventListener("scroll", () => {
      const currentScrollPosBtnSec = window.scrollY;
      if (prevScrollposBtnSec > currentScrollPosBtnSec) {
        Array.from(elBtn).forEach((item) => {
          item.classList.remove("bottom-70");
          item.classList.add("bottom-0");
        });
      } else {
        Array.from(elBtn).forEach((item) => {
          item.classList.remove("bottom-0");
          item.classList.add("bottom-70");
        });
      }
      prevScrollposBtnSec = currentScrollPosBtnSec;
    });
  };
  useEffect(() => {
    if (window.innerWidth < 576) {
      makeBtnSectionStickyMobile();
    }
  }, []);

  // Main component with reduced complexity

  return (
    <Wrapper className="d-flex flex-column w-100">
      <ViewUserDetailsWrapperStyles className="respStylesWrapper">
        <div className="d-lg-flex mt-md-4 m-sm-2 respStylesHeadingWrapper">
          <div className="container flex-grow-1">
            {/* --------- Page Heading Section --------- */}
            <div className="mt-lg-1 row no-gutters">
              <div className="col-lg-12 col-md-12 user-details-block">
                {/* ------- */}
                <UserHeading selectedUserObject={selectedUserObject} />
                {/* ------- */}
                <div className="esa-block border-bottom-email align-items-lg-center">
                  <div className="align-items-center mb-lg-2 mb-md-2 user-email">
                    <div className="align-self-auto mt-1 mt-md-1 mt-sm-0">
                      <aui-icon icon="email" svgwidth="20" svgheight="16" />
                    </div>
                    <div className="pl-2 mb-2 mb-lg-0 mb-md-0  pl-2">
                      {selectedUserObject.email}
                    </div>
                  </div>

                  {/* User status block */}
                  <div className="user-status d-flex mb-2 ">
                    <div>
                      <p
                        className={`user-status-adp mb-0 ${getClassNameUserStatus(
                          selectedUserObject.status
                        )}`}
                      >
                        {selectedUserObject.status &&
                          lowerCaseAllWordsExceptFirstLetters(
                            selectedUserObject.status
                          )}
                      </p>
                    </div>

                    {/* Ellipsis Button if needed */}
                    <div className="user-action">
                      <div className="text-right  ml-0">
                        {userRestrictAccessForStatusChange(
                          selectedUserObject.email,
                          userProfile.email
                        ) &&
                        (loggedInUserObjectContext?.roleCode ===
                          CONSTANTS.USER_ROLES.SUPER_ADMIN ||
                          loggedInUserObjectContext?.roleCode ===
                            CONSTANTS.USER_ROLES.CLIENT_ADMIN) ? (
                          <>
                            <button
                              id="user-action-btn"
                              type="button"
                              data-testid="View More Option"
                              aria-label="View More Option"
                              className="noBtnStyle actionBtnEllipses rotate-90-anti p-0"
                              tabIndex={0}
                              aria-expanded={false}
                              onClick={togglePopover}
                            >
                              <CustomTooltip
                                tooltipid="useraction-viewmore"
                                content="View More"
                              >
                                <i className="aha-icon-meat-balls" />
                              </CustomTooltip>
                            </button>

                            {/* Popover */}
                            <div
                              id="user-action-popover"
                              className="d-none connection-td-wrapper"
                            >
                              <div className="popoverWrapper">
                                <aui-button
                                  id="user-activate-deactivate-btn"
                                  buttonid="activate-deactivate-btn"
                                  size="medium"
                                  variant="button-text-styled"
                                  buttontitle={getStatusAction(
                                    selectedUserObject.status
                                  )}
                                  onClick={async (
                                    e: React.MouseEvent<HTMLAuiButtonElement>
                                  ) => {
                                    e.preventDefault();
                                    setUserEllipsesPopover(true);
                                    setApiStatus("status");
                                    setUserId(selectedUserObject.id);
                                    setRoleName(selectedUserObject.roles);
                                    setMainIcon(
                                      getMainIcon(
                                        getStatusAction(
                                          selectedUserObject.status
                                        )
                                      )
                                    );
                                    setMessage(
                                      getStatusAction(selectedUserObject.status)
                                    );

                                    if (
                                      selectedUserObject.status?.toLocaleLowerCase() ===
                                      "pending"
                                    ) {
                                      await reInviteUserAction(
                                        `${selectedUserObject.id}`,
                                        togglePopover,
                                        e
                                      );
                                    } else {
                                      userStatusButtonHandler(
                                        selectedUserObject.status,
                                        selectedUserObject.id,
                                        selectedUserObject.name
                                      );
                                      setModalContent(
                                        updateModalContent(
                                          getStatusAction(
                                            selectedUserObject.status
                                          ),
                                          selectedUserObject.name
                                        )
                                      );
                                    }
                                  }}
                                />
                                <aui-button
                                  id="user-delete-btn"
                                  buttonid="delete-btn"
                                  size="medium"
                                  variant="button-text-styled"
                                  buttontitle="Delete"
                                  onClick={(
                                    e: React.MouseEvent<HTMLAuiButtonElement>
                                  ) => {
                                    e.preventDefault();
                                    setUserEllipsesPopover(true);
                                    setApiStatus("delete");
                                    setMainIcon(
                                      getMainIcon(getStatusAction(""))
                                    );
                                    setUserId(selectedUserObject.id);
                                    setRoleName(selectedUserObject.roles);
                                    setModalContent(
                                      updateModalContent(
                                        getStatusAction(""),
                                        selectedUserObject.name
                                      )
                                    );
                                    setMessage(getStatusAction(""));
                                    toggle();
                                  }}
                                />
                              </div>
                            </div>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* --------- End Heading Section --------- */}

            {/* "Add Role" Button */}
            {shouldShowAddRole &&
              userRestrictAccessForStatusChange(
                selectedUserObject.email,
                userProfile.email
              ) && (
                <div className="row no-gutters">
                  <div className="col-lg-12 col-md-12">
                    <div className="container-grid mt-32px">
                      <div
                        role="button"
                        tabIndex={0}
                        className="addRoleBox addRoleWrapper"
                        data-testid="addRoleBox"
                        onClick={() => {
                          resetAddRoleInitialView();
                          getAddRolesDataAPI();
                          toggleModalStyles();
                          setToggleAddRoleModal(true);
                        }}
                        onKeyDown={(e: any) => {
                          if (e.key === "Enter" || e.key === " ") {
                            resetAddRoleInitialView();
                            getAddRolesDataAPI();
                            toggleModalStyles();
                            setToggleAddRoleModal(true);
                          }
                        }}
                      >
                        <div className="editbtn" data-testid="add-role-btn">
                          <img alt="" src="../images/IconPlusCircle.svg" />
                        </div>
                        <p className="addRoleHeading">Add Role</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            {/* Role Cards for SA or Super Users */}
            {roleCardStateSA.length > 0 && (
              <div className="row mt-40px cardSecWrapper no-gutters">
                <div className="col-md-12 col-lg-12">
                  <div className="col-md-12 col-lg-12 p-0 responsiveBadgeStyle">
                    <p className="super-admin-label">Super Admin</p>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12">
                  <div className="container-grid">
                    {renderGroupedRoleCards(
                      roleCardStateSA,
                      isSuperAdminOrClientAdmin,
                      openPopoverId,
                      popoverRefs,
                      (email: string) =>
                        userRestrictAccessForStatusChange(
                          email,
                          userProfile.email
                        ),
                      togglePopoverRef,
                      getColorCodenCatName
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Role Cards for Clients */}
            {roleCardStateCL.length > 0 && (
              <div className="row mt-40px cardSecWrapper no-gutters">
                <div className="col-md-12">
                  <div className="col-md-12 col-lg-12 p-0 responsiveBadgeStyle">
                    <p className="client-label">Clients</p>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 d-flex-bkp flex-wrap-bkp">
                  <div className="container-grid">
                    {renderGroupedRoleCards(
                      roleCardStateCL,
                      isSuperAdminOrClientAdmin,
                      openPopoverId,
                      popoverRefs,
                      (email: string) =>
                        userRestrictAccessForStatusChange(
                          email,
                          userProfile.email
                        ),
                      togglePopoverRef,
                      getColorCodenCatName
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ------------------ "Add Role" Modal ------------------ */}
        {toggleAddRoleModal && (
          <FocusTrap
            focusTrapOptions={{
              initialFocus: false,
              fallbackFocus: `.modal`,
              escapeDeactivates: false,
              clickOutsideDeactivates: false,
            }}
          >
            <div
              className="modal addRoleModal show aui-org-modal aui-new-org aui-modal"
              id="org9"
              tabIndex={-1}
              aria-modal="true"
              aria-label="Add new role details modal window"
              role="dialog"
            >
              <div className="modal-dialog modal-md editaccess-modal modalwidth">
                <div className="modal-content">
                  <div
                    className={`aui-block-loader ${
                      imageLoading ? "d-flex" : "d-none"
                    }`}
                    role="alert"
                    aria-live="assertive"
                    aria-label="Modal Content Loading"
                  />
                  <div
                    className={`modal-content-wrapper ${
                      imageLoading ? "d-none" : "d-block"
                    }`}
                  >
                    <button
                      ref={RefFocus}
                      type="button"
                      className="close d-none d-sm-block"
                      onClick={() => {
                        toggleModalStyles();
                        resetAddRoleInitialView();
                        setToggleAddRoleModal(false);
                        setImageLoading(true);
                      }}
                      aria-label="Close"
                    >
                      <img
                        src={imageUrl}
                        data-testid="crossbtn"
                        onLoad={imageLoaded}
                        alt=""
                        className="position-relative closestyle"
                      />
                    </button>
                    <div className="modal-header">
                      <h2
                        className="add-heading font-600 d-flex"
                        aria-label="Add Role"
                        data-testid="test-addrole"
                      >
                        <span
                          className="d-block d-sm-none rotateInverse mr-2"
                          onClick={() => {
                            toggleModalStyles();
                            resetAddRoleInitialView();
                            setToggleAddRoleModal(false);
                            setImageLoading(true);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === "Spacebar") {
                              toggleModalStyles();
                              resetAddRoleInitialView();
                              setToggleAddRoleModal(false);
                              setImageLoading(true);
                            }
                          }}
                          tabIndex={0}
                          role="button"
                          aria-label="Close modal"
                        >
                          <i className="aha-icon-right-arrow-thick" />
                        </span>
                        Add Role
                      </h2>
                    </div>
                    <p className="instruction">
                      {CONSTANTS.MODAL_INSTRUCTION_TEXT}
                    </p>
                    <form onSubmit={handleSubmit(submitFormAddRoleModal)}>
                      <div className="modal-body add-role pt-3">
                        <div className="form-group row required mb-4">
                          <label
                            htmlFor="selectRole"
                            className="col-sm-4 col-form-label"
                            aria-label="Select Role"
                          >
                            Select Role
                          </label>
                          <div className="col-sm-8">
                            <select
                              className="form-control dropdown "
                              defaultValue=""
                              onChange={dropDownDecider}
                              id="selectRole"
                              name="roleCode"
                              aria-required="true"
                              onClick={dropDownToggler}
                              onBlur={dropDownDefaultState}
                              ref={register}
                            >
                              <option value="" disabled hidden>
                                Select
                              </option>
                              {addRoleDropDownData.map((item: any) => (
                                <option key={item.id} value={item.code}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                            <i className="aha-icon-arrow-down forModal" />
                          </div>
                        </div>

                        <div
                          className={
                            viewClientSelect
                              ? "form-group row required mb-4 select-client-section"
                              : "d-none"
                          }
                        >
                          <label
                            htmlFor="selectClient"
                            className="col-sm-4 col-form-label"
                            aria-label="Select Client"
                          >
                            Select Client
                          </label>
                          <div className="col-sm-8 tooltip-role">
                            <div className="select-client" id="Client-tooltip">
                              <select
                                className="form-control dropdown "
                                defaultValue=""
                                onChange={() => setClientAdded(true)}
                                name="clientId"
                                aria-label="Select Client"
                                aria-required="true"
                                id="selectClient"
                                onClick={dropDownToggler}
                                onBlur={dropDownDefaultState}
                                ref={register}
                              >
                                <option value="" disabled hidden>
                                  Select
                                </option>
                                {AddRoleClientData.map((client: any) => (
                                  <option key={client.id} value={client.id}>
                                    {client.name}
                                  </option>
                                ))}
                              </select>
                              <i className="aha-icon-arrow-down forModal" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer d-none d-sm-block mt-0 pt-0">
                        <div className="justify-content-end d-flex btnGrp-add">
                          <button
                            type="button"
                            aria-label="cancel"
                            className="btn btn-round btn-secondary mr-4 btnwidth"
                            onClick={() => {
                              toggleModalStyles();
                              resetAddRoleInitialView();
                              setToggleAddRoleModal(false);
                              setImageLoading(true);
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            aria-label="Add Role"
                            className="btn btn-round  btn-primary btnwidth"
                            disabled={buttonStatusSetter()}
                          >
                            Add Role
                          </button>
                        </div>
                      </div>
                      <div className="modal-footer d-block d-sm-none mt-0 pt-0">
                        <div className="btn-block btnbottom position-absolute btnGrp-add">
                          <button
                            type="submit"
                            aria-label="save"
                            className="btn btn-round btn-block btn-primary btnwidth"
                            disabled={buttonStatusSetter()}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </FocusTrap>
        )}

        {/* ------------------ "Edit Access" Modal ------------------ */}
        {toggleEditAccessModal && (
          <FocusTrap
            focusTrapOptions={{
              initialFocus: false,
              fallbackFocus: `#org10`,
              escapeDeactivates: false,
              clickOutsideDeactivates: false,
            }}
          >
            <div
              className="modal show editRoleModal aui-org-modal aui-new-org aui-modal"
              id="org10"
              tabIndex={-1}
              aria-modal="true"
              aria-labelledby="edit-access-title"
              role="dialog"
            >
              <div className="modal-dialog modal-md editaccess-modal modalwidth">
                <div className="modal-content">
                  <div
                    className={`aui-block-loader ${
                      imageLoading ? "d-flex" : "d-none"
                    }`}
                    role="alert"
                    aria-live="assertive"
                    aria-label="Modal Content Loading"
                  />
                  <div
                    className={`modal-content-wrapper ${
                      imageLoading ? "d-none" : "d-block"
                    }`}
                  >
                    <button
                      ref={RefFocus}
                      type="button"
                      className="close d-none d-sm-block"
                      onClick={() => {
                        toggleModalStyles();
                        setToggleEditAccessModal(false);
                        document.querySelector<any>("#editRole").value =
                          "selected";
                        setImageLoading(true);
                      }}
                      aria-label="Close"
                    >
                      <img
                        src={imageUrl}
                        data-testid="crossbtn"
                        onLoad={imageLoaded}
                        alt=""
                        className="position-relative closestyle"
                      />
                    </button>
                    <div className="modal-header">
                      <h2
                        className="add-heading font-600 d-flex"
                        id="edit-access-title"
                        aria-label="Edit Access"
                        data-testid="test-addrole"
                      >
                        <span
                          className="d-block d-sm-none rotateInverse mr-2"
                          onClick={() => {
                            toggleModalStyles();
                            setToggleEditAccessModal(false);
                            document.querySelector<any>("#editRole").value =
                              "selected";
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === "Spacebar") {
                              toggleModalStyles();
                              setToggleEditAccessModal(false);
                              document.querySelector<any>("#editRole").value =
                                "selected";
                            }
                          }}
                        >
                          <i className="aha-icon-right-arrow-thick" />
                        </span>
                        Edit Access
                      </h2>
                      <div className="ml-2 groupedRoleStyle">
                        <p
                          className={`roleStylesMin ${
                            getColorCodenCatName(roleObjSwitchAccess)
                              .roleStyleCls
                          }`}
                        >
                          {roleObjSwitchAccess.roleName}
                        </p>
                      </div>
                    </div>
                    <p className="instruction">
                      {CONSTANTS.MODAL_INSTRUCTION_TEXT}
                    </p>
                    <form>
                      <div className="modal-body pt-3">
                        <div className="form-group row mb-4">
                          <label
                            htmlFor="editRole"
                            className="col-sm-9 col-form-label"
                          >
                            Are you sure you want to change access?
                          </label>
                        </div>
                        <div className="form-group row required mb-4">
                          <label
                            htmlFor="editRole"
                            aria-label="Update role"
                            className="col-sm-4 col-form-label"
                          >
                            Update Role
                          </label>
                          <div className="col-sm-8">
                            <select
                              className="form-control dropdown "
                              defaultValue="selected"
                              aria-required="true"
                              onChange={(e) => {
                                if (e.target.value === "selected") {
                                  setEditRole(false);
                                  setRoleAdded(false);
                                } else {
                                  setRoleCodeApi(e.target.value);
                                  setRoleAdded(true);
                                  setEditRole(true);
                                }
                              }}
                              name="role"
                              id="editRole"
                              onClick={dropDownToggler}
                              onBlur={dropDownDefaultState}
                            >
                              <option value="selected" disabled hidden>
                                Select
                              </option>
                              {levelDropDownData
                                .filter(
                                  (filteredObj: any) =>
                                    filteredObj.name !==
                                    roleObjSwitchAccess.roleName
                                )
                                .map((item: any) => (
                                  <option key={item.id} value={item.code}>
                                    {item.name}
                                  </option>
                                ))}
                            </select>
                            <i className="aha-icon-arrow-down forModal" />
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer d-none d-sm-block mt-0 pt-0">
                        <div className="justify-content-end d-flex btnGrp-add">
                          <button
                            type="button"
                            aria-label="cancel"
                            className="btn btn-round btn-secondary mr-4 btnwidth"
                            data-dismiss="modal"
                            onClick={() => {
                              toggleModalStyles();
                              setToggleEditAccessModal(false);
                              document.querySelector<any>("#editRole").value =
                                "selected";
                              setImageLoading(true);
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            aria-label="save"
                            className="btn btn-round btn-primary btnwidth"
                            disabled={!editRole}
                            data-dismiss="modal"
                            onClick={() => {
                              ApiCaller(modalApiId, roleStatusModal);
                              toggleModalStyles();
                              setToggleEditAccessModal(false);
                              document.querySelector<any>("#editRole").value =
                                "selected";
                              setImageLoading(true);
                            }}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                      <div className="modal-footer d-block d-sm-none mt-0 pt-0">
                        <div className="btn-block btnbottom position-absolute btnGrp-add">
                          <button
                            type="button"
                            aria-label="save"
                            className="btn btn-round btn-block btn-primary btnwidth"
                            disabled={!roleAdded}
                            data-dismiss="modal"
                            onClick={() => {
                              ApiCaller(modalApiId, roleStatusModal);
                            }}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </FocusTrap>
        )}

        {/* ------------------ Confirmation Modal (User OR Role) ------------------ */}
        <Modal
          isShown={isShown}
          hide={toggle}
          id={userEllipsesPopover ? userId : modalApiId}
          action={userEllipsesPopover ? UserApiCaller : ApiCaller}
          status={userEllipsesPopover ? userStatus : roleStatusModal}
          modalContent={message} // reusing `message` for modal content
          roles={userEllipsesPopover ? roleName : []}
          message={userEllipsesPopover ? message : ""}
          mainIcon={mainIcon}
        />
      </ViewUserDetailsWrapperStyles>
    </Wrapper>
  );
};

export default ViewUserDetailsComp;
