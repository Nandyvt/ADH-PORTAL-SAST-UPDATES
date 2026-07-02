import React, { useEffect, useState, useContext, useCallback } from "react";
import { Wrapper } from "styled";
import { useNavigate } from "react-router-dom";
import CONSTANTS from "common/constants";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Modal from "components/Modal";
import store from "app/store";
import { showToast } from "components/Toast/toast.slice";
import {
  passAuiObject,
  getErrorMessage,
  getMainIcon,
  lowerCaseAllWordsExceptFirstLetters,
  toggleModalStyles,
  toggleAriaExpandedElipses,
  closeActionPopoverOnFocusOut,
} from "common/utils";
import { setHeaderTitleText } from "components/Header/header.slice";
import {
  ClientListService,
  ClientStatusChanger,
  ClientDelete,
} from "services/api/clients.api";
import { setPageLoadingStatus } from "components/Loader/loader.slice";
import { useDispatch } from "react-redux";
import Restricted from "services/PermissionManager/Restricted";
import PermissionContext from "services/PermissionManager/PermissionContext";
import NoDataComp from "components/NoData";
import CustomTooltip from "components/CustomTooltip";
import {
  getMessage,
  getStatusAction,
  updateModalContent,
} from "../../components/Modal/util";
import { ClientStyles } from "./styled";
import AddClientsModalComp from "./AddClients";

interface IPagination {
  pageNumber: number;
  pageOffset: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  isFirst: number;
  isLast: number;
}
const defaultValues: IPagination = {
  pageNumber: 1,
  pageOffset: 0,
  pageSize: 20,
  totalCount: 0,
  totalPages: 0,
  isFirst: 0,
  isLast: 0,
};
interface ClientListData {
  id: number;
  name: string;
  code: string;
  description: string;
  isActive: boolean;
}

const ClientListComp = () => {
  const [clientsData, setClientData] = useState<ClientListData[]>([]);
  const [clientId, setClientId] = useState(0);
  const [clientStatus, setClientStatus] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [isShown, setIsShown] = useState<boolean>(false);
  const [isTableLoading, setTableLoading] = useState<boolean>();
  const [pagination, setPagination] = useState(defaultValues);
  const [rangeArr] = useState<any[]>([20, 50, 100]);
  const [pageSize, setPageSize] = useState<number>(20);
  const [apiRespFlag, setApiRespFlag] = useState(false);
  const [pageNumberState, setPageNumberState] = useState<number>(1);
  const [defaultParams] = useState<any>({
    pageSize: 20,
    pageNumber: 1,
  });
  const [toggleStatus, setToggleStatus] = useState(false);
  const [addClientCompChange, setAddClientCompChange] =
    useState<boolean>(false);
  const [mainIcon, setMainIcon] = useState("Lock");
  const [message, setMessage] = useState("");
  const [apiStatus, setApiStatus] = useState("");
  const [togglePopoverAria] = useState<boolean>(false);
  const { loggedInUserObjectContext } = useContext(PermissionContext);
  const [isSuperAdminOrClientAdmin, setIsSuperAdminOrClientAdmin] =
    useState(false);

  useEffect(() => {
    if (
      loggedInUserObjectContext.roleCode === CONSTANTS.USER_ROLES.SUPER_ADMIN ||
      loggedInUserObjectContext.roleCode === CONSTANTS.USER_ROLES.CLIENT_ADMIN
    ) {
      setIsSuperAdminOrClientAdmin(true);
    }
  }, [loggedInUserObjectContext]);

  const [toggleModal, setToggleModal] = useState(false);

  const toggle = useCallback(() => {
    document.querySelector(".modal-backdrop")?.classList.toggle("show");
    document.querySelector("body")?.classList.toggle("modal-open");
    return setIsShown(!isShown);
  }, [isShown]);
  const keydownToggleNoOfRecordTableFilter = (e: any) => {
    if (
      e.keyCode === CONSTANTS.KEY_ENTER ||
      e.keyCode === CONSTANTS.KEY_SPACEBAR
    ) {
      e.stopPropagation();
      e.preventDefault();
      e.currentTarget.nextSibling.classList.toggle("visible_cls");
      e.currentTarget.nextSibling.classList.contains("visible_cls") === true
        ? e.currentTarget.setAttribute("aria-expanded", "true")
        : e.currentTarget.setAttribute("aria-expanded", "false");
    }
  };

  const getClientRecords = (paramsObj: any) => {
    setTableLoading(true);

    ClientListService(paramsObj)
      .then((response) => {
        if (response && response.data.clients === null) {
          setPagination(defaultValues);
          setClientData([]);
        } else {
          const paginations = {
            ...response._pagination,
            isFirst: Boolean(response._pagination.isFirst),
            isLast: Boolean(response._pagination.isLast),
          };
          setClientData(response.data.clients);
          setApiRespFlag(true);
          setPagination(paginations);
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
        setTableLoading(false);
      });
  };
  const paginationOnChange = (event: any) => {
    setPageNumberState(event.detail);
    window.scrollTo(0, 0);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // <ToggleComponent id status ClientStatusChanger message
  const ApiCaller = useCallback(
    (id: number, status: string) => {
      if (apiStatus === "status") {
        ClientStatusChanger(id, status)
          .then(() => {
            setToggleStatus(!toggleStatus);
            if (status === "ACTIVE") {
              store.dispatch(
                showToast({
                  type: "success",
                  title: "Success",
                  message: "Client activated successfully",
                })
              );
            } else {
              store.dispatch(
                showToast({
                  type: "success",
                  title: "Success",
                  message: "Client deactivated successfully",
                })
              );
            }
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
        ClientDelete(id)
          .then(() => {
            setToggleStatus(!toggleStatus);
            store.dispatch(
              showToast({
                type: "success",
                title: "Success",
                message: "Client deleted successfully",
              })
            );
          })
          .catch((errors) => {
            store.dispatch(
              showToast({
                title: "Error",
                message: getErrorMessage(errors),
              })
            );
            setToggleModal(false);
            toggleModalStyles();
          });
      }
    },
    [apiStatus, toggleStatus]
  );

  const statusButtonHandler = (status: boolean, id: number, name: string) => {
    setClientStatus(
      status ? CONSTANTS.CLIENT_STATUS.INACTIVE : CONSTANTS.CLIENT_STATUS.ACTIVE
    );
    setClientId(id);
    setModalContent(
      updateModalContent(getStatusAction(status ? "active" : "inactive"), name)
    );
    toggle();
  };

  useEffect(() => {
    dispatch(setPageLoadingStatus({ isPageLoading: false }));
    store.dispatch(
      setHeaderTitleText({
        headerTitle: "",
      })
    );

    getClientRecords({
      ...defaultParams,
      pageSize,
      pageNumber: pageNumberState,
    });

    document.querySelector(".visible_cls")?.classList.toggle("visible_cls");
    document.querySelector(".rotateArrow")?.classList.toggle("rotateArrow");
  }, [toggleStatus, pageSize, addClientCompChange, pageNumberState]);

  useEffect(() => {
    setPagination({
      ...pagination,
      pageNumber: pageNumberState,
    });
  }, [pageNumberState, pageSize]);

  const columnHeaders = [
    { name: "Client Name", id: 1 },
    { name: "Description", id: 2 },
    { name: "Status", id: 3 },
    { name: "Action", id: 4 },
  ];

  const togglePopover = (e: any) => {
    Array.from(document.querySelectorAll(".connection-td-wrapper")).forEach(
      (el) => {
        if (e.currentTarget?.nextSibling !== el) {
          el.classList.remove("d-flex", "d-none");
          el.classList.add("d-none");
        }
      }
    );

    /* Accessiility fix */
    toggleAriaExpandedElipses(e.currentTarget); // toggle aria-expanded
    closeActionPopoverOnFocusOut(e);
  };

  const toggleNoOfRecordTableFilter = (e: any) => {
    e.currentTarget.nextSibling.classList.toggle("visible_cls");
    e.currentTarget.classList.toggle("rotateArrow");
  };

  let prevScrollposBtnSec = window.scrollY;

  const makeBtnSectionStickyMobile = () => {
    const elBtn = document.getElementsByClassName("btn-background");
    window.addEventListener("scroll", () => {
      const currentScrollPosBtnSec = window.scrollY;

      if (prevScrollposBtnSec > currentScrollPosBtnSec) {
        // showing the ui element - scroll up
        Array.from(elBtn).forEach((item) => {
          item.classList.remove("bottom-70");
          item.classList.add("bottom-0");
        });
      } else {
        // hiding the fixed element - scroll down
        Array.from(elBtn).forEach((item) => {
          item.classList.remove("bottom-0");
          item.classList.add("bottom-70");
        });
      }

      prevScrollposBtnSec = currentScrollPosBtnSec;
    });
  };

  useEffect(() => {
    window.innerWidth < 576 && makeBtnSectionStickyMobile();
  }, [prevScrollposBtnSec]);

  useEffect(() => {
    window.addEventListener(
      CONSTANTS.AUI_CUSTOM_EVENTS.PAGINATION_CHANGE,
      paginationOnChange
    );
    return () =>
      /* cleanup */
      window.removeEventListener(
        CONSTANTS.AUI_CUSTOM_EVENTS.PAGINATION_CHANGE,
        paginationOnChange
      );
  }, []);

  const UISchemaAddClient = yup.object().shape({
    name: yup
      .string()
      .required("Client Name is Required")
      .matches(
        CONSTANTS.REGEX.ATLEAST_ONE_ALPHANUMERIC,
        "Please Enter Valid Client Name"
      )
      .min(2, "Client Name should be atleast 2 characters")
      .test({
        name: "validCharacters",
        message:
          "Please enter valid client name. Special characters are not allowed, except - and space",
        test: (value: string | undefined) => {
          if (!value) return true;

          // Check if the name contains any disallowed characters
          const disallowedCharactersRegex = /^[a-zA-Z0-9\s-]+$/;
          return disallowedCharactersRegex.test(value);
        },
      })
      .test({
        name: "startsAndEndsWithAlphanumeric",
        message:
          "Please enter valid client name. Do not start or end with - or space",
        test: (value: string | undefined) => {
          if (!value) return true;

          // Check if the name contains any disallowed characters
          const disallowedCharactersRegex = /^[^\W_][\w\s-]*[^\W_]$/i;
          return disallowedCharactersRegex.test(value);
        },
      })
      .test({
        name: "hasOnlyOneHyphen",
        message:
          "Please enter valid client name. Do not use more than one hyphen or space in a row",
        test: (value: string | undefined) => {
          if (!value) return true;

          // Check if the name contains any disallowed characters
          const disallowedCharactersRegex =
            /^[a-zA-Z0-9]+(?:[- ][a-zA-Z0-9]+)*$/; /* sonarqube catastrophic backtracking security fix */

          return disallowedCharactersRegex.test(value);
        },
      })
      .max(64, "Maximum 64 characters allowed"),
    email: yup
      .string()
      .matches(CONSTANTS.REGEX.EMAIL, "Please enter a valid email address"),
    description: yup.string().max(255, "Maximum 255 characters allowed"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(UISchemaAddClient),
  });

  const [autoSuggestValue, setAutoSuggestValue] = useState<any>("");

  return (
    <Wrapper className="d-flex flex-column loader-baseWidth w-100">
      <ClientStyles>
        <div className="d-lg-flex mt-xs-4 box">
          <div
            className={`container flex-grow-1 pl-3 content-bkp ${
              !isTableLoading && clientsData.length > 0 ? "" : "no-data-spacing"
            } `}
          >
            <div className="d-sm-flex flex-grow-1 justify-content-between  align-items-baseline  mt-3  header-bottom">
              <h1
                className="client-heading"
                aria-label="Clients"
                data-testid="test-client"
              >
                Clients
              </h1>

              <div className="flex-grow-1 justify-content-between">
                <div className="d-flex align-items-baseline justify-content-end pb-3">
                  <Restricted to="account.clients.post">
                    <aui-button
                      variant="link-style-arrow"
                      buttontitle="Add Client"
                      onClick={(e: React.MouseEvent<HTMLAuiButtonElement>) => {
                        e.preventDefault();
                        reset();
                        setAutoSuggestValue("");
                        toggleModalStyles();
                        setToggleModal(true);
                      }}
                    />
                  </Restricted>
                </div>
              </div>
            </div>
            <div className="project-table">
              {isTableLoading && (
                <table
                  className="aui-responsive-table aui-table-cols aui-table-loader"
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
              {apiRespFlag && clientsData.length === 0 && !isTableLoading ? (
                <NoDataComp DataList={clientsData} />
              ) : (
                ""
              )}
              {!isTableLoading && clientsData?.length !== 0 && (
                <aui-table
                  type="status"
                  loader={isTableLoading}
                  loadertype="content"
                >
                  <table className="aui-responsive-status-table">
                    <thead>
                      <tr>
                        {columnHeaders?.map((colHeader) => {
                          return (
                            <th key={colHeader.id} scope="col">
                              <div className="aui-th">{colHeader.name}</div>
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {clientsData?.map((client) => {
                        return (
                          <tr
                            key={client.id}
                            className={
                              client.isActive
                                ? "aui-tr-success"
                                : "aui-tr-deactivated"
                            }
                          >
                            <td data-title="Client Name">
                              <div className="aui-td clientName-column">
                                <button
                                  type="button"
                                  className="adh-anchorStyle text-left mb-0 noBtnStyle pl-0"
                                  onClick={() => {
                                    navigate(
                                      `${CONSTANTS.PAGE_ROUTES.CLIENTS}/${client.id}`
                                    );
                                  }}
                                >
                                  <span
                                    className="clientnameellipse"
                                    title={client.name}
                                  >
                                    {client.name}
                                  </span>
                                </button>
                                <p className="mb-0 codestyle">
                                  Code : {client.code}
                                </p>
                              </div>
                            </td>
                            <td data-title="Description">
                              <div className="aui-td">
                                <p
                                  className={
                                    client.description
                                      ? "mb-0"
                                      : "mb-0 sr-only-bkp noDataDesc"
                                  }
                                  aria-label={
                                    client.description
                                      ? client.description
                                      : "No Data"
                                  }
                                >
                                  {client.description
                                    ? client.description
                                    : "-"}
                                </p>
                              </div>
                            </td>
                            <td data-title="Status">
                              <div className="aui-td">
                                {client.isActive
                                  ? lowerCaseAllWordsExceptFirstLetters(
                                      CONSTANTS.CLIENT_STATUS.ACTIVE
                                    )
                                  : lowerCaseAllWordsExceptFirstLetters(
                                      CONSTANTS.CLIENT_STATUS.INACTIVE
                                    )}
                              </div>
                            </td>
                            <td data-title="Action">
                              <div className="aui-td actions-column position-relative client-action pb-4">
                                <CustomTooltip
                                  content="View More"
                                  tooltipid={client.name}
                                  styleProps={{
                                    marginBottom: "8px",
                                  }}
                                >
                                  <>
                                    <button
                                      type="button"
                                      data-toggle="collapse"
                                      aria-label={`View More for ${client.name}`}
                                      aria-expanded={togglePopoverAria}
                                      className="ellipses noBtnStyle btnEllipses "
                                      onClick={(e) => {
                                        togglePopover(e);
                                      }}
                                    >
                                      <aui-icon
                                        block={false}
                                        icon="ellipsis"
                                        svgwidth="20"
                                        svgheight="20"
                                      />
                                    </button>
                                    <div className="d-none connection-td-wrapper">
                                      <div className="d-flex flex-column align-items-start popoverWrapper">
                                        <button
                                          type="button"
                                          className={`noBtnStyle ${
                                            isSuperAdminOrClientAdmin
                                              ? " mb-3"
                                              : ""
                                          }`}
                                          onClick={() => {
                                            navigate(
                                              `${CONSTANTS.PAGE_ROUTES.CLIENTS}/${client.id}`
                                            );
                                          }}
                                        >
                                          View
                                        </button>
                                        {isSuperAdminOrClientAdmin ? (
                                          <>
                                            <button
                                              type="button"
                                              className="noBtnStyle mb-3"
                                              onClick={() => {
                                                setApiStatus("status");
                                                statusButtonHandler(
                                                  client.isActive,
                                                  client.id,
                                                  client.name
                                                );
                                                setMainIcon(
                                                  getMainIcon(
                                                    getStatusAction(
                                                      client.isActive
                                                        ? "active"
                                                        : "inactive"
                                                    )
                                                  )
                                                );
                                                setMessage(
                                                  getMessage(
                                                    getStatusAction(
                                                      client.isActive
                                                        ? "active"
                                                        : "inactive"
                                                    )
                                                  )
                                                );
                                              }}
                                            >
                                              {getStatusAction(
                                                client.isActive
                                                  ? "active"
                                                  : "inactive"
                                              )}
                                            </button>
                                            <button
                                              type="button"
                                              className="noBtnStyle"
                                              onClick={() => {
                                                setApiStatus("delete");
                                                setClientId(client.id);
                                                setModalContent(
                                                  updateModalContent(
                                                    getStatusAction(""),
                                                    client.name
                                                  )
                                                );
                                                setMainIcon(
                                                  getMainIcon(
                                                    getStatusAction("")
                                                  )
                                                );
                                                getMessage(getStatusAction(""));
                                                toggle();
                                              }}
                                            >
                                              Delete
                                            </button>
                                          </>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                    </div>
                                  </>
                                </CustomTooltip>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </aui-table>
              )}
              <div className="row justify-content-center filterhead">
                {!isTableLoading && clientsData.length > 0 && (
                  <>
                    <div className="col-sm-5 mr-auto page-number filterHeaderChildElement filterheadchild">
                      Show &nbsp;<span className="boldCount">{pageSize}</span>
                      <div className="svg-parent position-relative">
                        <label
                          htmlFor="pagenumberitems"
                          className="position-absolute invisible-cls"
                        >
                          pagenumberitems
                          <input
                            type="text"
                            id="pagenumberitems"
                            className="position-absolute invisible-cls"
                            data-testid="pagenumberitems"
                            tabIndex={-1}
                          />
                        </label>
                        <div
                          className="keydown-recordfilter d-inline-block"
                          onKeyDown={keydownToggleNoOfRecordTableFilter}
                          tabIndex={0}
                          onClick={toggleNoOfRecordTableFilter}
                          aria-label={`${pageSize} number of items is displayed in one page`}
                          role="combobox"
                          aria-controls="pagelistitems"
                          aria-expanded="false"
                          aria-haspopup="listbox"
                        >
                          <i className="aha-icon-down-arrow-thin" />
                        </div>
                        <div
                          className="page-sort position-absolute m-0 d-none pagecontent-filter"
                          id="pagelistitems"
                          role="listbox"
                          aria-label="filter"
                        >
                          {rangeArr.map((item, index) => {
                            const key = `${index}_${item}`;
                            return (
                              <div
                                key={key}
                                role="option"
                                tabIndex={0}
                                aria-selected="true"
                                className={pageSize === item ? "active" : ""}
                                onKeyUp={(e: any) => {
                                  if (
                                    e.keyCode === CONSTANTS.KEY_ENTER ||
                                    e.keyCode === CONSTANTS.KEY_SPACEBAR
                                  ) {
                                    setPageSize(item);
                                    setPageNumberState(1);
                                    e.currentTarget.classList.toggle("active");
                                  }
                                }}
                                onClick={(e) => {
                                  setPageSize(item);
                                  setPageNumberState(1);
                                  e.currentTarget.classList.toggle("active");
                                }}
                              >
                                {item}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      items of {pagination.totalCount}
                    </div>
                    <div className="mr-2 mr-xs-1">
                      <aui-pagination
                        inputdata={passAuiObject(pagination)}
                        alignment="end"
                      />
                    </div>
                  </>
                )}
              </div>
              <Modal
                isShown={isShown}
                hide={toggle}
                id={clientId}
                action={ApiCaller}
                status={clientStatus}
                modalContent={modalContent}
                roles={[]}
                message={message}
                mainIcon={mainIcon}
              />
            </div>
          </div>
        </div>
        <AddClientsModalComp
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          setAddClientCompChange={setAddClientCompChange}
          addClientCompChange={addClientCompChange}
          autoSuggestValue={autoSuggestValue}
          setAutoSuggestValue={setAutoSuggestValue}
          setToggleModal={setToggleModal}
          toggleModal={toggleModal}
        />
      </ClientStyles>
    </Wrapper>
  );
};

export default ClientListComp;
