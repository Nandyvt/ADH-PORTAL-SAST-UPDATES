/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import CONSTANTS from "common/constants";
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import {
  ClientEditor,
  ClientStatusChanger,
  DeleteClientService,
  GetClientService,
} from "services/api/clients.api";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Modal from "components/Modal";
import {
  getErrorMessage,
  getMainIcon,
  isEllipsisActive,
  toggleModalStyles,
} from "common/utils";
import store from "app/store";
import { showToast } from "components/Toast/toast.slice";
import PermissionContext from "services/PermissionManager/PermissionContext";
import { FocusTrap } from "focus-trap-react";
import {
  getMessage,
  getStatusAction,
  updateModalContent,
} from "../../components/Modal/util";
import { ViewClientStyles } from "./styled";

// Schema moved outside of component to reduce complexity
const UIschema = yup.object().shape({
  clientName: yup
    .string()
    .required("Client Name is Required")
    .min(2, "Client Name should be atleast 2 characters")
    .matches(
      CONSTANTS.REGEX.ATLEAST_TWO_ALPHANUMERIC,
      "Client Name should be atleast two characters long & should contain valid special characters"
    )
    .test({
      name: "validCharacters",
      message:
        "Please enter valid client name. Special characters are not allowed, except - and space",
      test: (value: string | undefined) => {
        if (!value) return true;
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
        const disallowedCharactersRegex =
          /^[a-zA-Z0-9]+(?:[-\s][a-zA-Z0-9]+)*$/;
        return disallowedCharactersRegex.test(value);
      },
    })
    .max(64, "Maximum 64 characters allowed"),
  description: yup.string(),
});

export interface IClient {
  client: {
    ID: number;
    Name: string;
    Description: string;
    Code: string;
    IsActive: boolean;
  };
}

// Client Details Display Component
const ClientDetailsDisplay = ({
  clientDetails,
}: {
  clientDetails: IClient;
}) => (
  <>
    <div className="row">
      <div className="col-lg-3 col-sm-6">
        <label htmlFor="clientName">Name</label>
        <div>
          <p id="clientName">{clientDetails.client.Name || "-"}</p>
        </div>
      </div>
      <div className="col-lg-3 col-sm-6">
        <label htmlFor="clientCode">Code</label>
        <div>
          <p id="clientCode">{clientDetails.client.Code || "-"}</p>
        </div>
      </div>
    </div>
    <div className="row mt-2">
      <div className="col-lg-8 col-md-12 col-sm-12">
        <label htmlFor="clientDescription">Details</label>
        <div>
          <p id="clientDescription">
            {clientDetails.client.Description || "-"}
          </p>
        </div>
      </div>
    </div>
  </>
);

// Action Buttons Component
const ActionButtons = ({
  clientDetails,
  onEditClick,
  onStatusClick,
  onDeleteClick,
  navigate,
  isSuperAdminOrClientAdmin,
  reset,
}: any) => (
  <div className="row mt-2 d-flex gap-24 pl-15 pr-15 align-items-center">
    <div className="screenBtn">
      <aui-button
        variant="secondary"
        size="small"
        onClick={() => navigate("/clients")}
        buttontitle="Back"
        buttonid="back-button"
      />
    </div>

    {isSuperAdminOrClientAdmin && (
      <>
        <button
          type="button"
          aria-label="Edit"
          className="editbtn primary-color"
          data-testid="edit-tenant"
          onClick={onEditClick}
        >
          <img className="pr-2" src="/images/Icons-Edit.svg" alt="" />
          <span>Edit</span>
        </button>
        <button
          type="button"
          className="editbtn primary-color statusBtn"
          tabIndex={0}
          data-testid="status-tenant"
          onClick={onStatusClick}
        >
          {clientDetails.client.IsActive ? (
            <div className="deactivate-button">
              <i className="aha-icon-stop pr-1" />
              <span className="text-deactivate">Deactivate</span>
            </div>
          ) : (
            <div className="activate-button">
              <img
                className="pr-1"
                src="/images/view-client-activate-tick.svg"
                alt=""
              />
              <span className="text-activate">Activate</span>
            </div>
          )}
        </button>
        <button
          type="button"
          className="editbtn primary-color deleteBtn"
          aria-label="Delete"
          data-testid="delete-tenant"
          onClick={onDeleteClick}
        >
          <img className="pr-2" src="/images/Icons-Delete.svg" alt="" />
          <span>Delete</span>
        </button>
      </>
    )}
  </div>
);

// Edit Client Modal Component
const EditClientModal = ({
  toggleModal,
  clientDetails,
  onClose,
  register,
  errors,
  handleSubmit,
  submitForm,
  disableEditBtn,
  setDisableEditBtn,
  imageLoading,
  imageLoaded,
  RefFocus,
  imageUrl,
}: any) => {
  if (!toggleModal) return null;

  return (
    <FocusTrap
      focusTrapOptions={{
        initialFocus: false,
        fallbackFocus: `.modal`,
        escapeDeactivates: false,
        clickOutsideDeactivates: false,
      }}
    >
      <div
        className="modal fade show aui-org-modal aui-new-org aui-modal"
        id="EditClient"
        tabIndex={-1}
        aria-label={`Edit Client ${clientDetails.client.Name} Modal Window`}
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered modal-md editclient-modal modalwidth">
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
                onClick={onClose}
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
              <div className="modal-header justify-content-start">
                <span
                  className="d-block d-sm-none rotateInverse"
                  onClick={onClose}
                  role="button"
                  onKeyUp={onClose}
                  tabIndex={0}
                >
                  <i className="aha-icon-right-arrow-thick" />
                </span>
                <h2
                  className="editClientHeading modal-title font-600"
                  aria-label="Edit Client"
                  data-testid="test-editclient"
                >
                  Edit Client -
                </h2>

                <div className="col-8 col-md-9 tooltip-role headingWrapperTooltip modalElipses">
                  <span className="primary-color headingTooltipEle header-title refff pl-1">
                    {clientDetails.client.Name}
                  </span>
                </div>
              </div>
              <p className="instruction">{CONSTANTS.MODAL_INSTRUCTION_TEXT}</p>
              <form onSubmit={handleSubmit(submitForm)}>
                <div className="modal-body pt-3">
                  <div className="form-group row required mb-1">
                    <label
                      htmlFor="name"
                      className="col-sm-3 col-form-label label-text"
                      aria-label="name"
                    >
                      Name
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        required
                        className="form-control"
                        id="name"
                        name="clientName"
                        aria-required="true"
                        defaultValue={clientDetails.client.Name}
                        ref={register}
                        onChange={(event: any) => {
                          if (event.target.value.trim().length === 0)
                            setDisableEditBtn(true);
                          else if (Object.keys(errors).length > 0) {
                            setDisableEditBtn(true);
                          } else {
                            setDisableEditBtn(false);
                          }
                        }}
                        autoComplete="off"
                      />
                      <p role="alert" className="form-error-msg">
                        {errors.clientName?.message}
                      </p>
                    </div>
                  </div>
                  <div className="form-group row mb-1">
                    <label
                      htmlFor="description"
                      className="col-sm-3 col-form-label label-text"
                    >
                      Description
                    </label>
                    <div className="col-sm-9">
                      <textarea
                        className="form-control"
                        id="description"
                        rows={3}
                        name="description"
                        defaultValue={clientDetails.client.Description}
                        ref={register}
                        onChange={() => {
                          setDisableEditBtn(false);
                        }}
                        maxLength={CONSTANTS.CHARACTERS_COUNT_DESCRIPTION}
                      />
                      <p className="form-error-msg">
                        {errors.description?.message}
                      </p>
                    </div>
                  </div>
                  <div className="d-none d-sm-block">
                    <div className="btnbottom d-flex btnGrp-editTanant">
                      <button
                        type="button"
                        aria-label="cancel"
                        className="btn btn-round d-none d-sm-block btn-secondary mr-4 btnwidth"
                        onClick={onClose}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        aria-label="save"
                        className="btn btn-round btn-primary btnwidth"
                        disabled={disableEditBtn}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                  <div className="d-block d-sm-none">
                    <div className="btn-background btnbottom d-flex btnGrp-editTanant">
                      <button
                        type="button"
                        aria-label="cancel"
                        className="btn btn-round d-none d-sm-block btn-secondary mr-4 btnwidth"
                        onClick={onClose}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        aria-label="save"
                        className="btn btn-round btn-primary btnwidth"
                        disabled={disableEditBtn}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
};

const ViewClient: FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [clientDetails, setClientDetails] = useState<IClient>({
    client: {
      ID: 0,
      Name: "",
      Description: "",
      Code: "",
      IsActive: false,
    },
  });

  const [mainIcon, setMainIcon] = useState("Lock");
  const [message, setMessage] = useState("");
  const [action, setAction] = useState<any>("");
  const [modalContent, setModalContent] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [isShown, setIsShown] = useState<boolean>(false);
  const [toggleModal, setToggleModal] = useState(false);
  const [pageRefresh, setPageRefresh] = useState(false);
  const [disableEditBtn, setDisableEditBtn] = useState(true);
  const [isSuperAdminOrClientAdmin, setIsSuperAdminOrClientAdmin] =
    useState(false);

  const imageUrl = "../images/Close.svg";
  const [imageLoading, setImageLoading] = useState(true);

  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(UIschema),
    mode: "onChange",
  });

  const { loggedInUserObjectContext } = useContext(PermissionContext);
  const RefFocus = useRef<any>();

  // Check user permissions
  useEffect(() => {
    if (
      loggedInUserObjectContext.roleCode === CONSTANTS.USER_ROLES.SUPER_ADMIN ||
      loggedInUserObjectContext.roleCode === CONSTANTS.USER_ROLES.CLIENT_ADMIN
    ) {
      setIsSuperAdminOrClientAdmin(true);
    }
  }, [loggedInUserObjectContext]);

  // Toggle confirmation modal
  const toggle = useCallback(() => {
    document.querySelector(".modal-backdrop")?.classList.toggle("show");
    document.querySelector("body")?.classList.toggle("modal-open");
    return setIsShown(!isShown);
  }, [isShown]);

  // Handle image loading
  const imageLoaded = () => {
    setImageLoading(false);
  };

  // Focus management for modal
  useEffect(() => {
    if (toggleModal && RefFocus.current && !imageLoading)
      RefFocus.current.focus();
  }, [toggleModal, imageLoading]);

  // Handle form submission
  const submitForm = (event: any) => {
    const data = {
      name: event.clientName?.trim(),
      description: event.description?.trim(),
    };

    ClientEditor(clientDetails.client.ID, data)
      .then(() => {
        store.dispatch(
          showToast({
            type: "success",
            title: "Success",
            message: "Client updated successfully",
          })
        );
        toggleModalStyles();
        setToggleModal(false);
        setPageRefresh(!pageRefresh);
        setImageLoading(true);
      })
      .catch((error) => {
        store.dispatch(
          showToast({
            title: "Error Occured.",
            message: getErrorMessage(error),
          })
        );
      });
  };

  // Handle confirmation modal actions
  const onConfirmationModalSelection = useCallback(
    (status: boolean) => {
      if (status) {
        if (action === "Activate") {
          store.dispatch(
            showToast({
              type: "success",
              title: "Success",
              message: "Client activated successfully",
            })
          );
        } else if (action === "Deactivate") {
          store.dispatch(
            showToast({
              type: "success",
              title: "Success",
              message: "Client deactivated successfully",
            })
          );
        } else if (action === "Delete") {
          store.dispatch(
            showToast({
              type: "success",
              title: "Success",
              message: "Client is deleted successfully",
            })
          );
          navigate("/clients");
        }
      }
      setAction("");
      setPageRefresh(!pageRefresh);
    },
    [action, navigate]
  );

  // Fetch client details
  useEffect(() => {
    GetClientService(Number(id))
      .then((response) => {
        setClientDetails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        store.dispatch(
          showToast({
            title: "Error Occurred.",
            message: getErrorMessage(error),
          })
        );
        setLoading(false);
      });
  }, [id, pageRefresh]);

  // Modal action handlers
  const handleEditClick = () => {
    reset();
    toggleModalStyles();
    setToggleModal(true);
    setDisableEditBtn(true);
  };

  const handleStatusClick = () => {
    reset();
    const statusAction = getStatusAction(
      clientDetails.client.IsActive ? "Active" : "Inactive"
    );
    setModalContent(
      updateModalContent(statusAction, clientDetails.client.Name)
    );
    setMainIcon(getMainIcon(statusAction));
    setMessage(getMessage(statusAction));
    setAction(statusAction);
    toggle();
  };

  const handleDeleteClick = () => {
    reset();
    const statusAction = getStatusAction("");
    setModalContent(
      updateModalContent(statusAction, clientDetails.client.Name)
    );
    setMainIcon(getMainIcon(statusAction));
    setMessage(getMessage(statusAction));
    setAction("Delete");
    toggle();
  };

  const handleCloseModal = () => {
    toggleModalStyles();
    setToggleModal(false);
    setDisableEditBtn(true);
    setImageLoading(true);
  };

  // Loading state
  if (loading) {
    return (
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
    );
  }

  // Main component rendering
  return (
    <ViewClientStyles>
      <div className="project-form mb-3 mt-md-3 mt-sm-3">
        <Modal
          id={clientDetails.client.ID}
          status={clientDetails.client.IsActive ? "INACTIVE" : "ACTIVE"}
          action={
            action === "Delete" ? DeleteClientService : ClientStatusChanger
          }
          isShown={isShown}
          hide={toggle}
          modalContent={modalContent}
          roles={[]}
          message={message}
          mainIcon={mainIcon}
          callback={onConfirmationModalSelection}
        />
        <div className="container">
          <h1
            className="client-heading align-items-center"
            aria-label="View Client"
            data-testid="test-client"
          >
            <span
              title={`Client : ${clientDetails.client.Name || "-"}`}
              className="client-label"
            >{`Client : ${clientDetails.client.Name || "-"}`}</span>
          </h1>
        </div>

        <div className="container">
          <div className="mt-4">
            <ClientDetailsDisplay clientDetails={clientDetails} />

            <ActionButtons
              clientDetails={clientDetails}
              onEditClick={handleEditClick}
              onStatusClick={handleStatusClick}
              onDeleteClick={handleDeleteClick}
              navigate={navigate}
              isSuperAdminOrClientAdmin={isSuperAdminOrClientAdmin}
              reset={reset}
            />
          </div>
        </div>

        <EditClientModal
          toggleModal={toggleModal}
          clientDetails={clientDetails}
          onClose={handleCloseModal}
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          submitForm={submitForm}
          disableEditBtn={disableEditBtn}
          setDisableEditBtn={setDisableEditBtn}
          imageLoading={imageLoading}
          imageLoaded={imageLoaded}
          RefFocus={RefFocus}
          imageUrl={imageUrl}
        />
      </div>
    </ViewClientStyles>
  );
};

export default ViewClient;
