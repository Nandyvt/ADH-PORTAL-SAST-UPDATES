import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import PermissionContext from "services/PermissionManager/PermissionContext";
import Modal from "components/Modal";
import store from "app/store";
import {
  closeActionPopoverOnFocusOut,
  getErrorMessage,
  toggleAriaExpandedElipses,
} from "common/utils";
import { showToast } from "components/Toast/toast.slice";
import {
  CredentialStatusChanger,
  CredentialDelete,
} from "services/api/credentials.api";
import CustomTooltip from "components/CustomTooltip";
import { CreateCredentials } from "./CreateCredentials";
import { getMessage, getStatusAction } from "../utils";
import { ICred } from "../hooks/credentialsHook";
import { ICredentialsCards } from "./util";

const CredentialsCard = ({
  credentials,
  loading,
  error,
  hasMore,
  setPageNumber,
  setToggleStatus,
  toggleStatus,
  fetchEditPermissionCred,
  setCredentialName,
  setToggleRolePermissionModal,
  toggleModal,
  setToggleModal,
}: ICredentialsCards) => {
  const { loggedInUserObjectContext } = useContext(PermissionContext);
  const [copySecret, setSecret] = useState("Copy");

  const [isShown, setIsShown] = useState<boolean>(false);
  const [credentialId, setCredentialId] = useState(0);
  const [credentialStatus, setCredentialStatus] = useState("");
  const [mainIcon, setMainIcon] = useState("Lock");
  const [actionModalContent, setActionModalContent] = useState("");
  const [actionModalMessage, setActionModalMessage] = useState("");
  const [togglePopoverAria, setTogglePopoverAria] = useState<boolean>(false);
  const [toolTipToggler, setToolTipToggler] = useState(false);
  const [credentialAction, setCredentialAction] = useState("");
  const [openPopoverId, setOpenPopoverId] = useState<number | null>(null);
  const [codeSelected, setCodeSelected] = useState("Copy");

  const observer = useRef<any>();
  const popoverRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const navigate = useNavigate();

  const copyToClipBoard = (value: any) => {
    const copyText = value;
    navigator.clipboard.writeText(copyText);
    setTimeout(() => {
      setCodeSelected("Copy");
      setSecret("Copy");
    }, 3000);
  };
  const toggleActionPopover = (credentialID: number) =>
    setOpenPopoverId((prevOpenId) =>
      prevOpenId === credentialID ? null : credentialID
    );

  const checkPermissionForEditCred = ({ isActive, type }: any) => {
    if (isActive === 1 && loggedInUserObjectContext?.roleCode === type) {
      return true;
    }
    return false;
  };
  const lastCardElement = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current?.disconnect();

      observer.current = new IntersectionObserver(
        (_entries: IntersectionObserverEntry[]) => {
          if (_entries[0].isIntersecting && hasMore) {
            setPageNumber((prevPageNumber: number) => prevPageNumber + 1);
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

  const togglePopver = (e: any) => {
    Array.from(document.querySelectorAll(".connection-td-wrapper")).forEach(
      (el) => {
        if (e.currentTarget?.nextSibling === el) {
          el.classList.toggle("d-none");
          el.classList.toggle("d-flex");
        } else {
          el.classList.remove("d-flex");
          el.classList.add("d-none");
        }
      }
    );
    setTogglePopoverAria(!togglePopoverAria);
    e.currentTarget.nextSibling?.nextSibling?.classList.toggle("d-none");

    /* Accessiility fix */
    toggleAriaExpandedElipses(e.currentTarget);
    closeActionPopoverOnFocusOut(e);
  };

  const performCredentialAction = useCallback(
    async (id: number, status: string) => {
      try {
        if (
          credentialAction === "activate" ||
          credentialAction === "deactivate"
        ) {
          await CredentialStatusChanger(id, status);

          const successMessage =
            status === "ACTIVE"
              ? "Credential activated successfully"
              : "Credential deactivated successfully";

          store.dispatch(
            showToast({
              type: "success",
              title: "Success",
              message: successMessage,
            })
          );

          setPageNumber(() => 1);
          setToggleStatus(!toggleStatus);
          toggleActionPopover(id);
        } else if (credentialAction === "delete") {
          await CredentialDelete(id);
          setPageNumber(() => 1);
          setToggleStatus(!toggleStatus);
          toggleActionPopover(id);
          store.dispatch(
            showToast({
              type: "success",
              title: "Success",
              message: "Credential deleted successfully",
            })
          );
        }
      } catch (err) {
        store.dispatch(
          showToast({
            title: "Error",
            message: getErrorMessage(err),
          })
        );
      }
    },
    [credentialAction, toggleStatus]
  );

  const toggle = useCallback(() => {
    document.querySelector(".modal-backdrop")?.classList.toggle("show");
    document.querySelector("body")?.classList.toggle("modal-open");
    return setIsShown(!isShown);
  }, [isShown]);
  const handleCredentialStatusChange = (credential: ICred) => {
    setCredentialAction(credential.isActive ? "deactivate" : "activate");
    setCredentialId(credential.id);
    setCredentialStatus(credential.isActive ? "INACTIVE" : "ACTIVE");
    setMainIcon(credential.isActive ? "Lock" : "Unlock");
    setActionModalMessage(
      `Are you sure you want to ${
        credential.isActive ? "deactivate" : "activate"
      } ${credential.code} credential?`
    );
    toggle();
  };
  const handleCredentialDelete = (credential: ICred) => {
    setCredentialAction("delete");
    setCredentialId(credential.id);
    setMainIcon("LockDelete");
    setActionModalContent(
      `Are you sure you want to delete ${credential.code} credential?`
    );
    setActionModalMessage(getMessage("delete"));
    toggle();
  };

  const createClientNameSec = (credential: any) => {
    return (
      <div className="card-row  position-relative">
        <div className="font-600 common-value tooltip-role viewOnly">
          <CustomTooltip
            content={credential.clientName}
            tooltipid={credential.id}
          >
            <div className="c1 d-block cardwrapper-ellipses">
              {credential.clientName || ""}
              <wbr />
            </div>
          </CustomTooltip>
        </div>
      </div>
    );
  };

  const createCodeSec = (credential: any) => {
    return (
      <div className="card-row  position-relative">
        <div className="left-1">
          <p className="common-field">Code </p>
        </div>
        <div className="mid common-value">
          <span>:</span>
          <p>{credential.code}</p>
        </div>
        <button
          type="button"
          className="noBtnStyle d-flex"
          aria-label={`Copy ${credential.code}`}
          onClick={() => {
            copyToClipBoard(credential.code);
            setCodeSelected("Copied");
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter" || e.key === "Spacebar") {
              copyToClipBoard(credential.code);
              setCodeSelected("Copied");
            }
          }}
        >
          <div className="tooltip-role viewOnly">
            <CustomTooltip tooltipid={credential.code} content={codeSelected}>
              <img
                className="helpTextStyles"
                alt="Copy Icon"
                src="../images/Icons-copy.svg"
              />
            </CustomTooltip>
          </div>
        </button>
      </div>
    );
  };

  const createAccessKeySec = (credential: any) => {
    return (
      <div className="card-row  position-relative">
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
          onClick={() => {
            copyToClipBoard(credential.secret);
            setSecret("Copied");
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter" || e.key === "Spacebar") {
              copyToClipBoard(credential.secret);
              setSecret("Copied");
            }
          }}
        >
          <div className="tooltip-role viewOnly">
            <CustomTooltip tooltipid={credential.secret} content={copySecret}>
              <img
                className="helpTextStyles"
                alt="Copy Icon"
                src="../images/Icons-copy.svg"
              />
            </CustomTooltip>
          </div>
        </button>
      </div>
    );
  };

  const createDataCards = (credentialsArray: any) =>
    credentialsArray.map((credential: ICred) => (
      <div
        key={`${credential.code}-${credential.id}`}
        className="col-lg-3 padding-remove p-0 col-sm-6 col-md-6 "
      >
        <div
          ref={lastCardElement}
          key={credential.id}
          className={`d-flex card-box aha-card-sm card flex-column card-active p-0  card-common ${
            credential.isActive ? "card-active" : "card-inactive"
          }`}
        >
          <div className="align-items-center card-row justify-content-center mt10px">
            <div className=" card-title-text font-12 pl-0 pr-0">
              <p
                className={
                  credential.channel === "API"
                    ? "api-card-text"
                    : "nats-card-text"
                }
              >
                {credential.channel}
              </p>
            </div>
            <div className="helpTextWrapper ">
              {checkPermissionForEditCred(credential) && (
                <div className="tooltip-role edit">
                  <button
                    type="button"
                    className="noBtnStyle tooltip-right"
                    onClick={() => {
                      navigate(`/credentials/edit/${credential.id}`);
                    }}
                    aria-label={`Edit permission for ${credential.code} credential`}
                  >
                    <CustomTooltip
                      tooltipid="edit-permissions"
                      content="Edit Permissions"
                    >
                      <img
                        className="helpTextStyles"
                        alt="EditPermissions"
                        src="../images/icons-view-permissions.svg"
                        width="16"
                        height="16"
                      />
                    </CustomTooltip>
                  </button>
                </div>
              )}
              <div className="ml-2 text-right mb-1 pr-0 tooltip-role">
                <button
                  type="button"
                  className="noBtnStyle btnEllipses pr-1"
                  aria-label={`View more for ${
                    credential.isActive ? "active" : "inactive"
                  } ${credential.code} credential`}
                  aria-expanded={togglePopoverAria}
                  onClick={(e) => {
                    toggleActionPopover(credential.id);
                    setToolTipToggler(!toolTipToggler);
                    togglePopver(e);
                  }}
                  onKeyUp={(e) => {
                    if (e.key === "Spacebar") {
                      toggleActionPopover(credential.id);
                      togglePopver(e);
                    }
                  }}
                >
                  <CustomTooltip
                    tooltipid={`edit-${credential.id}`}
                    content="View More"
                  >
                    <i className="aha-icon-meat-balls" />
                  </CustomTooltip>
                </button>

                <div
                  className={`connection-td-wrapper ${
                    openPopoverId === credential.id ? "d-block" : "d-none"
                  }`}
                  ref={(ref) => {
                    popoverRefs.current[credential.id] = ref;
                  }}
                >
                  <div className="popoverWrapper text-left">
                    <aui-button
                      id={`active-inactive-button-${credential.id}`}
                      onClick={async (e: any) => {
                        e.preventDefault();
                        handleCredentialStatusChange(credential);
                      }}
                      buttonid="active-inactive-button-id"
                      variant="button-text-styled"
                      size="medium"
                      buttontitle={getStatusAction(
                        credential.isActive ? "active" : "inactive"
                      )}
                    />
                    <br />
                    <aui-button
                      id={`delete-button-${credential.id}`}
                      buttonid="delete-button-id"
                      size="medium"
                      variant="button-text-styled"
                      buttontitle="Delete"
                      onClick={(e: any) => {
                        e.preventDefault();
                        handleCredentialDelete(credential);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Reduce CC(cognitive complexity - sonarqube guidelines)- create new Function  */}
          {createClientNameSec(credential)}
          {createCodeSec(credential)}
          {createAccessKeySec(credential)}
        </div>
      </div>
    ));

  const loadingEl = loading ? (
    <div className="col-lg-3 padding-remove p-0 col-sm-6 col-md-6 d-flex justify-content-center align-items-center">
      <div className="d-flex border-0 aha-card-sm card flex-column p-0  card-common justify-content-center align-items-center">
        <aui-loader type="content" />
      </div>
    </div>
  ) : undefined;

  const [cardList, setCardList] = useState<any>([]);

  useEffect(() => {
    const cards = createDataCards(credentials);
    if (credentials.length === 0) {
      cards.unshift(loadingEl);
    } else {
      cards.push(loadingEl);
    }
    setCardList(cards);
  }, [loading, credentials]);

  return (
    <div className="cardwrapper mt-3 mt-lg-0 mt-sm-0 ">
      <div className="row no-gutters" id="dynamic-row">
        <CreateCredentials />
        {cardList}
      </div>

      <Modal
        isShown={isShown}
        hide={toggle}
        id={credentialId}
        action={performCredentialAction}
        status={credentialStatus}
        modalContent={actionModalContent}
        roles={[]}
        message={actionModalMessage}
        mainIcon={mainIcon}
      />
    </div>
  );
};

export default CredentialsCard;
