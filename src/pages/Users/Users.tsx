/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, {
  useEffect,
  useState,
  FunctionComponent,
  useContext,
  useRef,
  useCallback,
} from "react";
import { Wrapper } from "styled";

import CONSTANTS from "common/constants";
import Modal from "components/Modal";
import {
  IPagination,
  UserListProps,
  formatDataForMultiSelectFilter,
  getActionModalTitleMessage,
  getStatusAction,
  rotateMeatBalls,
  updateModalContent,
  usersTableColumns,
} from "pages/Users/util";
import {
  passAuiObject,
  getMainIcon,
  toggleModalStyles,
  getErrorMessage,
} from "common/utils";
import store from "app/store";
import { setHeaderTitleText } from "components/Header/header.slice";
import { getUsers } from "services/api/user.api";
import { showToast } from "components/Toast/toast.slice";
import { ClientListService } from "services/api/clients.api";
import { UserStatusChanger, userDelete } from "services/api/userDelete";
import { getRoles } from "services/api/settings.api";
import Restricted from "services/PermissionManager/Restricted";
import PermissionContext from "services/PermissionManager/PermissionContext";
import { useSelector } from "react-redux";
import { reInviteUserService } from "services/api/inviteUser.api";
import NoDataComp from "components/NoData";
import { useWindowDimensionOnPageResize } from "pages/_layouts/componentUtil";
import Chips from "components/Chips";
import debounce from "lodash/debounce";
import { UserWrapperStyles } from "./Styled";
import UserFilters from "./Filters/Filters";
import CustomisedTable from "./CustomisedTable/CustomisedTable";
import InviteUserModal from "./InviteUser/InviteUserModal";
import PageSizeSelector from "./PageSizeSelector/PageSizeSelector";
import UsersFiltersMobile from "./Filters/UsersFiltersMobile";

const defaultValues: IPagination = {
  pageNumber: 1,
  pageOffset: 0,
  pageSize: 20,
  totalCount: 0,
  totalPages: 0,
  isFirst: 0,
  isLast: 0,
};
const UsersComp: FunctionComponent = (props: any) => {
  const { loggedInUserObjectContext } = useContext(PermissionContext);

  const [imageLoading, setImageLoading] = useState(true);

  const [isShown, setIsShown] = useState<boolean>(false);
  const [popover] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState("");
  const [userData, setUserData] = useState<UserListProps[]>([]);
  const [isTableLoading, setTableLoading] = useState<boolean>();
  const [pagination, setPagination] = useState(defaultValues);
  const [pageSize, setPageSize] = useState<number>(20);
  const [pageSizeRange] = useState<any[]>([20, 50, 100]);
  const [actionModalTitle, setActionModalTitle] = useState("");
  const [mainIcon, setMainIcon] = useState("Lock");
  const [toggleStatus, setToggleStatus] = useState(false);
  const [apiStatus, setApiStatus] = useState("");
  const [userId, setUserId] = useState(0);
  const [userRoles, setUserRoles] = useState<any>([]);
  const [userStatus, setUserStatus] = useState("");
  const [searchText, setSearchText] = useState("");

  const [rolesFilterData, setRolesFilterData] = useState([]);
  const [clientsFilterData, setClientsFilterData] = useState([]);

  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [defaultParams] = useState<any>({
    pageSize: 20,
    pageNumber: 1,
    q: "",
    clientId: "",
    roleCode: "",
  });
  const [pageNumber, setPageNumber] = useState<number>(1);

  const [toggleModal, setToggleModal] = useState(false);
  const [refreshWithPageNumber, setRefreshWithPageNumber] =
    useState<boolean>(false);
  const [clearFilter, setClearFilter] = useState<boolean>(false);

  // showModal filter
  const [showModal, setShowModal] = useState<boolean>(false);

  // For Accessibility
  const RefFocus = useRef<any>();
  useEffect(() => {
    if (toggleModal && RefFocus.current && !imageLoading)
      RefFocus.current.focus();
  }, [toggleModal, imageLoading]);

  const stateObject = useSelector((state: any) => {
    const { user } = state.user;
    return {
      role: user?.roleName,
      clientId: user?.clientId,
      clientName: user?.clientName,
    };
  });

  const toggle = useCallback(() => {
    document.querySelector(".modal-backdrop")?.classList.toggle("show");
    document.querySelector("body")?.classList.toggle("modal-open");
    return setIsShown(!isShown);
  }, [isShown]);

  const paginationOnChange = (event: any) => {
    setPageNumber(event.detail);
    window.scrollTo(0, 0);
  };

  const togglePopverOnWrapperClick = (e: any) => {
    e.target.parentNode.parentNode.classList.toggle("d-none");
    rotateMeatBalls(e);
  };

  // API request for user status update (Activate, deactivate)
  const handleUserStatusUpdate = useCallback(
    async (id: number, status: string) => {
      try {
        let message = "";
        if (apiStatus === "status") {
          const response = await UserStatusChanger(id, status);
          if (response?.data?.message) {
            message = "Duplicate action - User role was already deactivated";
          } else {
            setToggleStatus(!toggleStatus);
            message =
              status === "ACTIVE"
                ? "User activated successfully"
                : "User deactivated successfully";
          }
        } else if (apiStatus === "delete") {
          await userDelete(id);
          setToggleStatus(!toggleStatus);
          message = "User deleted successfully";
        }

        store.dispatch(
          showToast({
            type: "success",
            title: "Success",
            message,
          })
        );
        setRefreshWithPageNumber(!refreshWithPageNumber);
      } catch (error) {
        store.dispatch(
          showToast({
            title: "Error Occurred.",
            message: getErrorMessage(error),
          })
        );
      }
    },
    [apiStatus, refreshWithPageNumber]
  );

  const [apiRespFlag, setApiRespFlag] = useState(false);

  const getUserList = debounce(async (paramsObj: any) => {
    setTableLoading(true);

    try {
      const response = await getUsers({ paramsData: paramsObj });
      if (response.data.users.length === 0 || response.data.users === null) {
        setPagination(defaultValues);
        setUserData([]);
      } else {
        const paginationRes = {
          ...response._pagination,
          isFirst: Boolean(response._pagination.isFirst),
          isLast: Boolean(response._pagination.isLast),
        };
        setUserData(response.data.users);
        setApiRespFlag(true);
        setPagination(paginationRes);
      }
    } catch (error) {
      store.dispatch(
        showToast({
          type: "danger",
          title: "Error Occurred",
          message: getErrorMessage(error),
        })
      );
    } finally {
      setTableLoading(false);
    }
  }, 100);

  const statusButtonHandler = (status: string, id: number, name: string) => {
    setUserStatus(
      status === CONSTANTS.USER_STATUS.INACTIVE
        ? CONSTANTS.USER_STATUS.ACTIVE
        : CONSTANTS.USER_STATUS.INACTIVE
    );
    setUserId(id);
    setModalContent(
      updateModalContent(getStatusAction(status ? "active" : "inactive"), name)
    );
    toggle();
  };

  const reInviteUserAction = async (userId: string, event: any) => {
    try {
      event.persist();
      await reInviteUserService(userId);
      const successToast = {
        type: "success",
        title: "Success",
        message: "User has been re-invited successfully",
      };
      handleToast(successToast, event);
    } catch (err) {
      const errorToast = {
        type: "danger",
        title: "Error",
        message: getErrorMessage(err),
      };
      handleToast(errorToast, event);
    }
  };

  const handleToast = (toast: any, event: any) => {
    store.dispatch(showToast(toast));
    togglePopverOnWrapperClick(event);
  };

  const formRolesQeryParams = (roles: any) =>
    roles.map((role: any) => role.value).join(",");

  const formClientsQeryParams = (clients: any) => {
    const clientIdArr: any = [];
    clients.forEach((client: any) => {
      clientsFilterData
        .filter((item: any) => item.code === client.value)
        .forEach((element: any) => clientIdArr.push(element.id));
    });
    return clientIdArr.join(",");
  };

  useEffect(() => {
    // api call

    getUserList({
      ...defaultParams,
      roleCode: formRolesQeryParams(selectedRoles),
      clientId: formClientsQeryParams(selectedClients),
      pageSize,
      pageNumber: searchText.length > 0 ? 1 : pageNumber,
      q: searchText,
    });
    document.querySelector(".visible_cls")?.classList.toggle("visible_cls");
    document.querySelector(".rotateArrow")?.classList.toggle("rotateArrow");
    // Clean up debounce on component unmount
    return () => {
      getUserList.cancel(); // Cancel any pending debounced calls
    };
  }, [
    selectedRoles,
    selectedClients,
    pageSize,
    pageNumber,
    searchText,
    refreshWithPageNumber,
  ]);

  const getClientFilterRecords = ({ pageSizeParam, pageNumParam }: any) => {
    ClientListService({
      pageSize: pageSizeParam,
      pageNumber: pageNumParam,
    })
      .then((response: any) => {
        if (response && response.data.clients === null) {
          setClientsFilterData([]);
        } else {
          setClientsFilterData(response.data.clients);
        }
        return { ...response._pagination };
      })
      .catch((error) => {
        store.dispatch(
          showToast({
            type: "danger",
            title: "Error Occurred",
            message: getErrorMessage(error),
          })
        );
      });
  };

  const getRoleFilterRecords = () => {
    getRoles({
      isActive: true,
      level: `gte,${loggedInUserObjectContext?.roleLevel}`,
    })
      .then((response: any) => {
        if (response && response.data.roles === null) {
          setRolesFilterData([]);
        } else {
          setRolesFilterData(response.data.roles);
        }
        return { ...response._pagination };
      })
      .catch((error) => {
        store.dispatch(
          showToast({
            type: "danger",
            title: "Error Occurred",
            message: getErrorMessage(error),
          })
        );
      });
  };

  const onSuccessFullInviteHandler = useCallback(
    (data: any) => {
      getUserList(defaultParams);
    },
    [defaultParams]
  );

  useEffect(() => {
    store.dispatch(
      setHeaderTitleText({
        headerTitle: "",
      })
    );

    getUserList(defaultParams);
    window.addEventListener(
      CONSTANTS.AUI_CUSTOM_EVENTS.PAGINATION_CHANGE,
      paginationOnChange
    );

    getRoleFilterRecords();

    (loggedInUserObjectContext?.roleCode === CONSTANTS.USER_ROLES.SUPER_ADMIN ||
      loggedInUserObjectContext?.roleCode ===
        CONSTANTS.USER_ROLES.SUPER_USER) &&
      getClientFilterRecords({
        pageSizeParam: CONSTANTS.MAX_RECORDS,
        pageNumParam: 1,
      });
    return () =>
      window.removeEventListener(
        CONSTANTS.AUI_CUSTOM_EVENTS.PAGINATION_CHANGE,

        paginationOnChange
      );
  }, []);

  const [mobileDropDownToggle, setMobileDropdownToggle] =
    useState<boolean>(false);

  const handleActionEvent = useCallback(async (actionData: any) => {
    const { user, event } = actionData;
    const lowerCaseStatus = user.status.toLocaleLowerCase();
    const innerText = event.currentTarget.innerText.toLowerCase();

    if (lowerCaseStatus === "active" || lowerCaseStatus === "inactive") {
      const statusAction = getStatusAction(lowerCaseStatus);
      setApiStatus("status");
      setUserId(user.id);
      setUserRoles(user.roles);
      setMainIcon(getMainIcon(statusAction));
      setActionModalTitle(getActionModalTitleMessage(statusAction));
      statusButtonHandler(user.status, user.id, user.name);
      setModalContent(updateModalContent(statusAction, user.name));
      togglePopverOnWrapperClick(event);
    }

    if (lowerCaseStatus === "pending" && innerText === "re invite") {
      await reInviteUserAction(user.id, event);
    }

    if (innerText === "delete") {
      setApiStatus("delete");
      setMainIcon(getMainIcon(getStatusAction("")));
      setUserId(user.id);
      setUserRoles(user.roles);
      setModalContent(updateModalContent(getStatusAction(""), user.name));
      setActionModalTitle(getActionModalTitleMessage(getStatusAction("")));
      toggle();
    }
  }, []);

  const pageSizeChangeHandler = useCallback((event: any, size: number) => {
    if (
      event.keyCode === CONSTANTS.KEY_ENTER ||
      event.keyCode === CONSTANTS.KEY_SPACEBAR
    ) {
      setPageSize(size);
      setPageNumber(1);
      event.currentTarget.classList.toggle("active");
    }
  }, []);

  const isSuperAdminOrSuperUserFunc = (roleCode: any) =>
    roleCode === CONSTANTS.USER_ROLES.SUPER_ADMIN ||
    roleCode === CONSTANTS.USER_ROLES.SUPER_USER;

  const [isSuperAdminOrSuperUser] = useState(
    isSuperAdminOrSuperUserFunc(loggedInUserObjectContext?.roleCode)
  );

  const zoomedWindowWidth = useWindowDimensionOnPageResize();
  const [appliedFilters, setAppliedFilters] = useState<any>({});

  useEffect(() => {
    if (
      Object.prototype.hasOwnProperty.call(appliedFilters, "inputFilters") &&
      appliedFilters.inputFilters.length > 0
    ) {
      const searchFieldValue = appliedFilters.inputFilters[0].data[0] || "";
      setSearchText(searchFieldValue);
    }
    if (
      Object.prototype.hasOwnProperty.call(
        appliedFilters,
        "multiSelectDropdownFilters"
      ) &&
      appliedFilters.multiSelectDropdownFilters.length > 0
    ) {
      if (
        appliedFilters.multiSelectDropdownFilters.some(
          (item: any) => item.id === "multiselect-roles"
        )
      ) {
        const rolesSelected = appliedFilters.multiSelectDropdownFilters.filter(
          (item: any) => item.id === "multiselect-roles"
        );
        setSelectedRoles(rolesSelected[0]?.data || []);
      }
      if (
        appliedFilters.multiSelectDropdownFilters.some(
          (item: any) => item.id === "multiselect-clients"
        )
      ) {
        const clientsSelected =
          appliedFilters.multiSelectDropdownFilters.filter(
            (item: any) => item.id === "multiselect-clients"
          );
        setSelectedClients(clientsSelected[0]?.data || []);
      }
    }
  }, [appliedFilters]);

  // Clear Chip
  const [clearChipData, setClearChipData] = useState<any>({});
  // Initial state for chipDataArray
  const [chipDataArray, setChipDataArray] = useState<any>([]);

  const [showClearAll, setShowClearAll] = useState(false);
  // Use useEffect to update chipDataArray when underlying state variables change
  useEffect(() => {
    const updatedChipDataArray = [
      { label: "Search", value: searchText, id: "search-filter" },
      {
        label: "Roles",
        value: selectedRoles.map((item: any) => item.label).join(","),
        id: "roles-multiselect",
      },
      {
        label: "Clients",
        value: selectedClients.map((item: any) => item.label).join(","),
        id: "clients-multiselect",
      },
    ];

    // Set the updated chipDataArray
    setChipDataArray(updatedChipDataArray);
    if (searchText || selectedRoles.length > 0 || selectedClients.length > 0) {
      setShowClearAll(true);
    } else {
      setShowClearAll(false);
    }
  }, [searchText, selectedRoles, selectedClients]);

  useEffect(() => {
    if (Object.keys(clearChipData).length > 0) {
      if (clearChipData.id === "search-filter") {
        setSearchText("");
      }
      if (clearChipData.id === "roles-multiselect") {
        setSelectedRoles([]);
      }
      if (clearChipData.id === "clients-multiselect") {
        setSelectedClients([]);
      }
    }
  }, [clearChipData]);

  const roleClass = `roleStyles-${loggedInUserObjectContext?.roleId}`;
  const dataSpacingClass =
    !isTableLoading && userData.length > 0 ? "" : "no-data-spacing";

  const getUserHeading = () => {
    const isAdmin =
      loggedInUserObjectContext?.roleCode ===
        CONSTANTS.USER_ROLES.SUPER_ADMIN ||
      loggedInUserObjectContext?.roleCode === CONSTANTS.USER_ROLES.SUPER_USER;

    return isAdmin ? (
      "Users"
    ) : (
      <span className="clientText">
        <span className="UsersText">{stateObject.clientName || ""}</span>
        &nbsp;Users
      </span>
    );
  };

  return (
    <Wrapper className="d-flex flex-column w-100">
      <UserWrapperStyles>
        <div className="d-lg-flex mt-4">
          <div
            className={`container flex-grow-1 ${roleClass} ${dataSpacingClass}`}
          >
            <div className="d-sm-flex flex-grow-1 justify-content-between  align-items-baseline  header-bottom">
              <h1
                className="user-heading"
                aria-label="Users"
                data-testid="test-users"
              >
                {getUserHeading()}
              </h1>

              <div className="flex-grow-1 justify-content-between">
                <div
                  className="d-flex align-items-baseline justify-content-end pb-3"
                  data-testid="testInviteUser"
                >
                  <Restricted to="account.users.post">
                    <aui-button
                      buttonclass="invite-user-text"
                      id="test-inviteuser"
                      data-testid="testInviteUser"
                      variant="link-style-arrow"
                      buttontitle="Invite User"
                      onClick={(e: React.MouseEvent<HTMLAuiButtonElement>) => {
                        e.preventDefault();
                        setToggleModal(true);
                        toggleModalStyles();
                      }}
                    />
                  </Restricted>
                </div>
              </div>
            </div>

            <div className="align-items-center d-flex usersFilterSec">
              <div
                className={`d-lg-none d-md-none d-sm-none justify-content-end ml-auto mt-3 show-filter ${
                  showClearAll ? "bg-selected" : ""
                }`}
              >
                <button
                  type="button"
                  aria-label="Filter"
                  className="align-items-center d-flex font14 justify-content-center m-0 noBtnStyle pr-0"
                  onClick={(e) => {
                    e.currentTarget.focus();
                    setMobileDropdownToggle(!mobileDropDownToggle);
                    setShowModal(true);
                  }}
                >
                  <aui-icon
                    block
                    svgclass="aui-icon-filter"
                    pathclass="aui-path-filter"
                    icon="filter"
                    svgwidth="12"
                    svgheight="12"
                  />
                  <span className="filter-label">Filter</span>
                </button>
                {showClearAll ? (
                  <button
                    type="button"
                    className="noBtnStyle p-0"
                    onClick={() => {
                      setSelectedRoles([]);
                      setSearchText("");
                      setSelectedClients([]);
                    }}
                  >
                    <img src="./images/clear-all-icon.svg" alt="filterIcon" />
                  </button>
                ) : null}
              </div>
            </div>
            {+zoomedWindowWidth < 576 ? (
              <UsersFiltersMobile
                showModal={showModal}
                setShowModal={setShowModal}
                searchError={popover}
                filters={[
                  {
                    type: "input",
                    filterParams: {
                      id: "user-search-field",
                      placeholder: "Search Mail / Name / ID",
                      label: "Search",
                      name: "Search",
                      labelgrid: "col-sm-3",
                      inputgrid: "col-sm-9",
                      direction: "column",
                      clearable: true,
                      errormessage: "User / Email id not found",
                      value: searchText,
                    },
                  },
                  {
                    type: "multiSelectDropdown",
                    filterParams: {
                      id: "roles",
                      name: "Select Roles",
                      placeholder: "Select Roles",
                      label: "Select Roles",
                      labelgrid: "col-sm-3",
                      dropdowngrid: "col-sm-9",
                      direction: "column",
                      options: passAuiObject(
                        formatDataForMultiSelectFilter(rolesFilterData)
                      ),
                      value: JSON.stringify(selectedRoles),
                      iconbackground: true,
                      searchable: true,
                    },
                  },
                  {
                    type: "multiSelectDropdown",
                    filterParams: {
                      id: "clients",
                      show: isSuperAdminOrSuperUser,
                      placeholder: "Select Client",
                      name: "Select Client",
                      label: "Select Client",
                      labelgrid: "col-sm-3",
                      dropdowngrid: "col-sm-9",
                      direction: "column",
                      options: passAuiObject(
                        formatDataForMultiSelectFilter(clientsFilterData)
                      ),
                      value: JSON.stringify(selectedClients),
                      iconbackground: true,
                      searchable: true,
                    },
                  },
                ]}
                appliedFilters={appliedFilters}
                setAppliedFilters={setAppliedFilters}
              />
            ) : (
              <UserFilters
                rolesFilterData={rolesFilterData}
                clientsFilterData={clientsFilterData}
                setSearchText={setSearchText}
                setSelectedRoles={setSelectedRoles}
                setSelectedClients={setSelectedClients}
                clearMultiSelectFilters={clearFilter}
                searchError={popover}
              />
            )}
            {+zoomedWindowWidth < 576 && (
              <div className="d-flex flex-wrap mt-3">
                {chipDataArray.map((chipData: any) => (
                  <Chips
                    setClearChipData={setClearChipData}
                    key={chipData.label}
                    chipData={chipData}
                  />
                ))}
              </div>
            )}

            <div className="project-table mt-2">
              {isTableLoading && (
                <table
                  className="aui-responsive-table aui-table-cols aui-table-loader w-100"
                  role="alert"
                  aria-live="assertive"
                  aria-label="Table is Loading"
                >
                  <thead className="d-none">
                    <tr>
                      <th className="sr-only">Loading...</th>
                    </tr>
                  </thead>
                  <tbody className="d-none">
                    <tr>
                      <td className="sr-only">Loading...</td>
                    </tr>
                  </tbody>
                </table>
              )}

              {!isTableLoading && userData && userData.length > 0 ? (
                <CustomisedTable
                  columnFields={usersTableColumns}
                  tableData={userData}
                  loader={isTableLoading}
                  onActionEvent={handleActionEvent}
                />
              ) : undefined}

              {apiRespFlag && userData.length === 0 && !isTableLoading && (
                <>
                  <NoDataComp DataList={userData} Filter />
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <p>Change the filter options or</p>
                    <button
                      aria-label="Reload"
                      type="button"
                      className="reload-btn"
                      onClick={() => {
                        setClearFilter(!clearFilter);
                        setSearchText("");
                        if (window.outerWidth < 576) {
                          setSelectedRoles([]);
                          setSelectedClients([]);
                        }
                      }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter" || e.key === "Spacebar") {
                          setClearFilter(!clearFilter);
                          setSearchText("");
                          if (window.outerWidth < 576) {
                            setSelectedRoles([]);
                            setSelectedClients([]);
                          }
                        }
                      }}
                    >
                      <i className="aha-icon-reload" />
                      Reload
                    </button>
                  </div>
                </>
              )}
              {!isTableLoading && (userData.length > 0 || searchText !== "") ? (
                <div className="row mt-4 justify-content-between filterhead">
                  <div
                    className={`col-sm-6 mr-auto mr-sm-0 mt-3 mt-lg-0 mt-md-0 page-number filterHeaderChildElement filterheadchild ${
                      userData.length > 0 || searchText !== "" ? "" : "d-none"
                    }`}
                  >
                    {userData.length > 0 ? (
                      <PageSizeSelector
                        pageSize={pageSize}
                        setPageSize={setPageSize}
                        setPageNumber={setPageNumber}
                        pageSizeRange={pageSizeRange}
                        pageSizeChangeHandler={pageSizeChangeHandler}
                        pagination={pagination}
                      />
                    ) : undefined}
                  </div>
                  <div className="col-sm-6 mr-2 mr-md-0 mr-sm-0 filterchild">
                    {/* AUI v2 Pagination Component */}
                    <aui-pagination
                      inputdata={passAuiObject(pagination)}
                      alignment="end"
                    />
                  </div>
                </div>
              ) : undefined}
              <Modal
                isShown={isShown}
                hide={toggle}
                id={userId}
                action={handleUserStatusUpdate}
                status={userStatus}
                modalContent={modalContent}
                roles={userRoles}
                message={actionModalTitle}
                mainIcon={mainIcon}
              />
            </div>
          </div>
        </div>
        <InviteUserModal
          toggleModal={toggleModal}
          setToggleModal={setToggleModal}
          imageLoading={imageLoading}
          setImageLoading={setImageLoading}
          stateObject={stateObject}
          setRefreshWithPageNumber={setRefreshWithPageNumber}
          refreshWithPageNumber={refreshWithPageNumber}
          onSuccessfulInvite={onSuccessFullInviteHandler}
        />
      </UserWrapperStyles>
    </Wrapper>
  );
};

export default UsersComp;
