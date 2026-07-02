/* eslint-disable @typescript-eslint/no-shadow */
import store from "app/store";
import CONSTANTS from "common/constants";
import {
  getErrorMessage,
  getMainIcon,
  removeAllSpecialChar,
  toggleModalStyles,
  toggleServiceCheckboxForAllHttpCheckBoxes,
  toggleUserActionEllipses,
} from "common/utils";
import Modal from "components/Modal";
import { showToast } from "components/Toast/toast.slice";
import React, {
  useEffect,
  useState,
  FunctionComponent,
  useRef,
  useCallback,
  useContext,
} from "react";
import {
  CredentialDelete,
  CredentialStatusChanger,
  EditCredentialGet,
} from "services/api/credentials.api";
import PermissionContext from "services/PermissionManager/PermissionContext";
import useCredentialsList, { ICreds } from "./hooks/credentialsHook";
import {
  getMessage,
  getStatusAction,
  resetAddCredetialsForm,
  updateModalContent,
} from "./utils";

export interface ICardProps {
  channelName: string;
  clientId: string;
  setEditCredentialData: any;
  checkBoxState: any;
  setCheckBoxState: any;
  setCredName: any;
  setPermission: any;
  setToggleModal: any;
  toggleModal: any;
  toggleStatus: any;
  setToggleStatus: any;
  setToggleRolePermissionModal: any;
}
export const CardList: FunctionComponent<ICardProps> = ({
  channelName = "",
  clientId = "",
  setEditCredentialData = "",
  checkBoxState = "",
  setCheckBoxState = "",
  setCredName = "",
  setPermission = "",
  setToggleModal = "",
  toggleModal = "",
  toggleStatus = "",
  setToggleStatus = "",
  setToggleRolePermissionModal = "",
}) => {
  const observer = useRef<any>();

  const [pageNumber, setPageNumber] = useState(1);
  const [innerWidth, setInnerWidth] = useState(0);
  const [credentialsList, setCredentialsList] = useState<ICreds>([]);
  const [isShown, setIsShown] = useState<boolean>(false);
  const [userId, setUserId] = useState(0);
  const [apiStatus, setApiStatus] = useState("");
  const [credentialStatus, setCredentialStatus] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [roleName, setRoleName] = useState<any>([]);
  const [message, setMessage] = useState("");
  const [copyContent, setCopyContent] = useState("Copy");
  const [mainIcon, setMainIcon] = useState("Lock");
  const [togglePopoverAria, setTogglePopoverAria] = useState<boolean>(false);
  const { credentials, error, loading, hasMore } = useCredentialsList(
    pageNumber,
    channelName,
    clientId,
    toggleStatus
  );
  const { loggedInUserObjectContext } = useContext(PermissionContext);
  useEffect(() => {
    setPageNumber(1);
  }, [clientId, channelName]);
  useEffect(() => {
    setCredentialsList(credentials);
  }, [credentials]);
  const lastCardElement = useCallback(
    (node: HTMLElement | null) => {
      if (loading) return;
      if (observer.current) observer.current?.disconnect();

      observer.current = new IntersectionObserver(
        (_entries) => {
          if (_entries[0].isIntersecting && hasMore) {
            setPageNumber((prevPageNumber) => prevPageNumber + 1);
          }
        },
        { threshold: 0.25 }
      );
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore]
  );
  const copyToClipBoard = (value: any) => {
    const copyText = value;
    navigator.clipboard.writeText(copyText);
    setTimeout(() => {
      setCopyContent("Copy");
    }, 3000);
  };
  const [toolTipToggler, setToolTipToggler] = useState(false);
  const togglePopver = (e: any) => {
    Array.from(document.querySelectorAll(".connection-td-wrapper")).forEach(
      (el) => {
        if (e.currentTarget?.nextSibling?.nextSibling !== el) {
          el.classList.remove("d-flex", "d-none");
          el.classList.add("d-none");
        }
      }
    );
    setTogglePopoverAria(!togglePopoverAria);
    e.currentTarget.nextSibling?.nextSibling?.classList.toggle("d-none");
  };
  useEffect(() => {
    setInnerWidth(window.innerWidth);
  }, [window.innerWidth]);

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
    window.innerWidth < 576 && makeBtnSectionStickyMobile();
  }, [prevScrollposBtnSec]);
  const toggle = useCallback(() => {
    document.querySelector(".modal-backdrop")?.classList.toggle("show");
    document.querySelector("body")?.classList.toggle("modal-open");
    return setIsShown(!isShown);
  }, [isShown]);
  // update for deactivate here

  // here add the api request for user(Activate, deactivate)
  const ApiCaller = useCallback(
    (id: number, status: string) => {
      if (apiStatus === "status") {
        CredentialStatusChanger(id, status)
          .then((response) => {
            if (status === "ACTIVE") {
              store.dispatch(
                showToast({
                  type: "success",
                  title: "Success",
                  message: "Credential activated successfully",
                })
              );
            } else {
              store.dispatch(
                showToast({
                  type: "success",
                  title: "Success",
                  message: "Credential deactivated successfully",
                })
              );
            }
            setPageNumber(1);
            setToggleStatus(!toggleStatus);
            toggleUserActionEllipses();
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
        CredentialDelete(id)
          .then((response) => {
            setPageNumber(1);
            setToggleStatus(!toggleStatus);
            toggleUserActionEllipses();
            store.dispatch(
              showToast({
                type: "success",
                title: "Success",
                message: "Credential deleted successfully",
              })
            );
          })
          .catch((errors) => {
            store.dispatch(
              showToast({
                title: "Error",
                message: getErrorMessage(error),
              })
            );
          });
      }
    },
    [apiStatus, toggleStatus]
  );
  const statusButtonHandler = (status: boolean, id: number, name: string) => {
    setCredentialStatus(
      status
        ? CONSTANTS.CREDENTIAL_STATUS.INACTIVE
        : CONSTANTS.CREDENTIAL_STATUS.ACTIVE
    );
    setUserId(id);
    setModalContent(
      updateModalContent(getStatusAction(status ? "active" : "inactive"), name)
    );
    toggle();
  };

  const createCard: any =
    innerWidth >= 575 ? (
      <div
        key="create-creds-card"
        className="d-none d-sm-block card-box card aha-card-sm card-common justify-content-around"
      >
        <div className="row no-gutters align-items-start">
          <div className="col-12 col-sm-12 p-2 py-sm-0 card-body text-center">
            <button
              type="button"
              className="noBtnStyle"
              onClick={() => {
                toggleModal && resetAddCredetialsForm();
                toggleModalStyles();
                setToggleModal(true);
              }}
            >
              <div className="text-center">
                <img
                  src="/images/icons-plus-circle.svg"
                  alt="plus-icon"
                  className="cursorpointer p2"
                />
                <p
                  className="create-credential font14 common-value"
                  data-testid="test-heading"
                >
                  Create Credential
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    ) : (
      <div className="btn-background d-block d-sm-none">
        <button
          className="addCredsBtn btn-block btn-primary cursorpointer plus-icon p2 fxdbtn"
          type="button"
          onClick={() => {
            toggleModalStyles();
            setToggleModal(true);
          }}
        >
          Create Credential
        </button>
        <p className="create-credential font14 common-value" />
      </div>
    );
  const checkPermissionForEditCred = ({ isActive, type }: any) => {
    if (isActive === 1 && loggedInUserObjectContext?.roleCode === type) {
      return true;
    }
    return false;
  };

  const processHttpMethods = (
    service: any,
    resourceName: string,
    resourceMethods: any,
    prePopulateArr: any[]
  ) => {
    Object.values(resourceMethods).forEach((httpMethods: any) => {
      const checkboxId = removeAllSpecialChar(
        resourceName + httpMethods + service
      );
      prePopulateArr.push(checkboxId);
    });
  };

  const processServiceResources = (
    apiRespData: any,
    service: any,
    serviceData: any,
    prePopulateArr: any[]
  ) => {
    Object.entries(serviceData).forEach((resource: any) => {
      const resourceName = resource[0];
      const resourceMethods = apiRespData[service][resourceName];
      processHttpMethods(
        service,
        resourceName,
        resourceMethods,
        prePopulateArr
      );
    });
  };

  const processApiPermissions = (apiRespData: any) => {
    if (!apiRespData) return [];

    const prePopulateArr: any = [];

    Object.keys(apiRespData).forEach((service: any) => {
      const serviceData = apiRespData[service];
      processServiceResources(
        apiRespData,
        service,
        serviceData,
        prePopulateArr
      );
    });

    return prePopulateArr;
  };

  const handleSuccessResponse = (response: any) => {
    if (response.data.credential === null) {
      setEditCredentialData({});
      return;
    }

    setEditCredentialData(response.data.credential);

    const apiRespData = response.data.credential?.apiPermissions;
    setPermission(apiRespData);

    const prePopulateArr = processApiPermissions(apiRespData);
    setCheckBoxState([...checkBoxState, ...prePopulateArr]);

    Object.keys(apiRespData || {}).forEach((service: any) => {
      toggleServiceCheckboxForAllHttpCheckBoxes(
        `editCred_${service}`,
        "borderbtm"
      );
    });
  };

  const fetchEditPermissionCred = (credentialId: any) => {
    EditCredentialGet(credentialId)
      .then(handleSuccessResponse)
      .catch((error) => {
        store.dispatch(
          showToast({
            type: "danger",
            title: "Error Occurred",
            message: getErrorMessage(error),
          })
        );
      })
      .finally(() => {});
  };

  const onClickHandlerViewMoreWrapper = (credential: any) => {
    setApiStatus("status");
    statusButtonHandler(credential.isActive, credential.id, credential.name);
    setMainIcon(
      getMainIcon(getStatusAction(credential.isActive ? "active" : "inactive"))
    );
    setModalContent(
      updateModalContent(
        getStatusAction(credential.isActive ? "active" : "inactive"),
        credential.name
      )
    );
    setMessage(
      getMessage(getStatusAction(credential.isActive ? "active" : "inactive"))
    );
  };
  const generatePopoverButtons = (credential: any) => {
    return (
      <>
        <button
          type="button"
          className="noBtnStyle mb-3"
          onClick={async () => {
            onClickHandlerViewMoreWrapper(credential);
          }}
        >
          {getStatusAction(credential.isActive ? "active" : "inactive")}
        </button>
        <button
          type="button"
          className="noBtnStyle mb-2"
          onClick={() => {
            setApiStatus("delete");
            setMainIcon(getMainIcon(getStatusAction("")));
            setUserId(credential.id);
            setRoleName([]);
            setModalContent(
              updateModalContent(getStatusAction(""), credential.name)
            );
            setMessage(getMessage(getStatusAction("")));
            toggle();
          }}
        >
          Delete
        </button>
      </>
    );
  };

  const generateCardRowsCommon = (credential: any) => {
    return (
      <>
        <div className="card-row position-relative mt-1 mb-3">
          <div className="font-600 common-value">
            <div className="tooltip-role viewOnly">
              <div className="cardwrapper-ellipses">
                <span className="c1">
                  {" "}
                  {credential.clientName ? credential.clientName : ""}
                </span>
              </div>
              <span className="tooltiptext">
                {credential.clientName ? credential.clientName : ""}
              </span>
            </div>
          </div>
        </div>
        <div className="card-row position-relative">
          <div className="left-1">
            <p className="common-field">Code</p>
          </div>
          <div className="mid common-value">
            <span>:</span>
            <p>{credential.code}</p>
          </div>
          <button
            type="button"
            className="noBtnStyle d-flex"
            aria-label={`Copy ${credential.clientName}'s code`}
            onKeyUp={(e) => {
              if (e.key === "Enter" || e.key === "Spacebar") {
                copyToClipBoard(credential.code);
                setCopyContent("Copied");
              }
            }}
            onClick={() => {
              copyToClipBoard(credential.code);
              setCopyContent("Copied");
            }}
          >
            <div className="tooltip-role viewOnly">
              <img
                className="helpTextStyles"
                alt="CopyIcon"
                src="../images/Icons-copy.svg"
              />

              <span
                aria-hidden={copyContent === "Copy"}
                role="tooltip"
                className="tooltiptext"
                aria-live="polite"
              >
                {copyContent}
              </span>
            </div>
          </button>
        </div>
        <div className="card-row position-relative">
          <div className="left-1">
            <p className="common-field">Access Key</p>
          </div>
          <div className="mid common-value">
            <span>:</span>
            <p className="star-content">***************</p>
          </div>
          <button
            type="button"
            className="noBtnStyle d-flex"
            aria-label={`Copy ${credential.clientName}'s access key`}
            onKeyUp={(e) => {
              if (e.key === "Enter" || e.key === "Spacebar") {
                copyToClipBoard(credential.secret);
                setCopyContent("Copied");
              }
            }}
            onClick={() => {
              copyToClipBoard(credential.secret);
              setCopyContent("Copied");
            }}
          >
            <div className="tooltip-role viewOnly">
              <img
                className="helpTextStyles"
                alt="CopyIcon"
                src="../images/Icons-copy.svg"
              />
              <span
                aria-hidden={copyContent === "Copy"}
                role="tooltip"
                className="tooltiptext"
                aria-live="polite"
              >
                {copyContent}
              </span>
            </div>
          </button>
        </div>
      </>
    );
  };

  const generateCardList = (credential: any) => {
    return (
      <div
        key={credential.id}
        className={`d-flex card-box aha-card-sm card cardwidth card-active p-0 p-sm-3 card-common ${
          credential.isActive ? "card-active" : "card-inactive"
        }`}
      >
        <div className="card-row">
          <div
            className={`tags card-title-text font-12 pl-0 pr-0 ${
              credential.channel === "API" ? "api-card-text" : "nats-card-text"
            }`}
          >
            <p className="channel-text">{credential.channel}</p>
          </div>
          <div className="helpTextWrapper mt-2">
            {checkPermissionForEditCred(credential) && (
              <div className="tooltip-role edit">
                <button
                  type="button"
                  className="noBtnStyle tooltip-right"
                  onClick={() => {
                    fetchEditPermissionCred(credential.id);
                    setCredName(credential.name);
                    toggleModalStyles();
                    setToggleRolePermissionModal(true);
                  }}
                  aria-label={`Edit permission for ${credential.code} credential`}
                >
                  <img
                    className="helpTextStyles"
                    alt="EditPermissions"
                    src="../images/icons-view-permissions.svg"
                  />
                  <span className="tooltiptext">Edit Permissions</span>
                </button>
              </div>
            )}
            <div className="ml-2 text-right mb-1 pr-0 tooltip-role">
              <button
                type="button"
                className="noBtnStyle btnEllipses"
                aria-label={`View more for ${
                  credential.isActive ? "active" : "inactive"
                } ${credential.code} credential`}
                aria-expanded={togglePopoverAria}
                onClick={(e) => {
                  togglePopver(e);
                  setToolTipToggler(!toolTipToggler);
                }}
                onKeyUp={(e) => {
                  if (e.key === "Spacebar") {
                    togglePopver(e);
                  }
                }}
              >
                <i className="aha-icon-meat-balls" />
              </button>

              <span className="tooltiptext">View More</span>

              <div className="d-none connection-td-wrapper">
                <div className="popoverWrapper">
                  {generatePopoverButtons(credential)}
                </div>
              </div>
              <Modal
                isShown={isShown}
                hide={toggle}
                id={userId}
                action={ApiCaller}
                status={credentialStatus}
                modalContent={modalContent}
                roles={roleName}
                message={message}
                mainIcon={mainIcon}
              />
            </div>
          </div>
        </div>
        {generateCardRowsCommon(credential)}
      </div>
    );
  };

  const generateCardListSameLength = (credential: any) => {
    return (
      <div
        ref={lastCardElement}
        key={credential.id}
        className={`d-flex card-box aha-card-sm card cardwidth card-active p-0 p-sm-3 card-common ${
          credential.isActive ? "card-active" : "card-inactive"
        }`}
      >
        <div className="card-row">
          <div
            className={`tags card-title-text font-12 pl-0 pr-0 ${
              credential.channel === "API" ? "api-card-text" : "nats-card-text"
            }`}
          >
            <p>{credential.channel}</p>
          </div>
          <div className="helpTextWrapper mt-2">
            {checkPermissionForEditCred(credential) && (
              <div className="tooltip-role edit">
                <button
                  type="button"
                  className="noBtnStyle tooltip-right"
                  onClick={() => {
                    fetchEditPermissionCred(credential.id);
                    setCredName(credential.name);
                    toggleModalStyles();
                    setToggleRolePermissionModal(true);
                  }}
                  aria-label={`Edit permission for ${credential.code} credential`}
                >
                  <img
                    className="helpTextStyles"
                    alt="EditPermissions"
                    src="../images/icons-view-permissions.svg"
                  />
                  <span className="tooltiptext">Edit Permissions</span>
                </button>
              </div>
            )}
            <div className="ml-2 text-right mb-1 pr-0 tooltip-role">
              <button
                type="button"
                className="noBtnStyle btnEllipses"
                aria-label={`View more for ${
                  credential.isActive ? "active" : "inactive"
                } ${credential.code} credential`}
                aria-expanded={togglePopoverAria}
                onClick={(e) => {
                  togglePopver(e);
                  setToolTipToggler(!toolTipToggler);
                }}
                onKeyUp={(e) => {
                  if (e.key === "Spacebar") {
                    togglePopver(e);
                  }
                }}
              >
                <i className="aha-icon-meat-balls" />
              </button>

              <span className="tooltiptext">View More</span>

              <div className="d-none connection-td-wrapper">
                <div className="popoverWrapper">
                  {generatePopoverButtons(credential)}
                </div>
              </div>
              <Modal
                isShown={isShown}
                hide={toggle}
                id={userId}
                action={ApiCaller}
                status={credentialStatus}
                modalContent={modalContent}
                roles={roleName}
                message={message}
                mainIcon={mainIcon}
              />
            </div>
          </div>
        </div>
        {generateCardRowsCommon(credential)}
      </div>
    );
  };

  const cardList = credentialsList.map((credential, index) => {
    let card: any;
    if (credentialsList.length === index + 1) {
      /* Reduce CC(cognitive complexity - sonarqube guidelines)- create new Function */
      card = generateCardListSameLength(credential);
    } else {
      /* Reduce CC(cognitive complexity - sonarqube guidelines)- create new Function */
      card = generateCardList(credential);
    }
    return card;
  });
  const loadingEl = loading ? (
    <div
      className="aui-block-loader"
      role="alert"
      aria-live="assertive"
      aria-label="Page is Loading"
    />
  ) : (
    ""
  );

  cardList.unshift(createCard);
  cardList.push(loadingEl);

  return <>{cardList}</>;
};

export default CardList;
