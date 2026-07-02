/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useRef, useContext } from "react";
import { FocusTrap } from "focus-trap-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import store from "app/store";

import CONSTANTS from "common/constants";
import { getErrorMessage, toggleModalStyles } from "common/utils";
import { showToast } from "components/Toast/toast.slice";
import AutoSuggestComp from "components/AutoSuggest";
import Restricted from "services/PermissionManager/Restricted";
import PermissionContext from "services/PermissionManager/PermissionContext";
import { fetchPermission } from "services/PermissionManager/Types";
import { getRoles } from "services/api/settings.api";
import { inviteUserService } from "services/api/inviteUser.api";
import { ClientListService } from "services/api/clients.api";

import { checkCommonConditions, clientArr } from "./util";

import { dropDownDefaultState, dropDownToggler, isClientAdmin } from "../util";
import { getValidationSchema } from "./ValidationSchema";

const imageUrl = "../images/Close.svg";

// Extracted components for cleaner structure
const ModalHeader = ({
  stateObject,
  toggleModal,
  setToggleModal,
  setShowClientDropDown,
  setSelectClientValue,
}: any) => (
  <div className="modal-header">
    <h2
      className="modal-title font-600 d-flex"
      aria-label="Invite User"
      data-testid="test-addtenant"
      id="modal-heading"
    >
      <span
        className="d-block d-sm-none rotateInverse mr-2"
        onClick={() => {
          toggleModalStyles();
          setToggleModal(false);
          setShowClientDropDown(false);
          setSelectClientValue("select client");
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === "Spacebar") {
            e.preventDefault();
            toggleModalStyles();
            setToggleModal(false);
            setShowClientDropDown(false);
            setSelectClientValue("select client");
          }
        }}
        role="button"
        tabIndex={0}
      >
        <i className="aha-icon-right-arrow-thick" />
      </span>
      <span className={stateObject.role === "Super Admin" ? "" : "invite-text"}>
        Invite User
        {stateObject.role !== "Super Admin" && (
          <span className="tenantText font-600 modal-title">
            {stateObject.clientName ? ` - ${stateObject.clientName}` : ""}
          </span>
        )}
      </span>
    </h2>
  </div>
);

const EmailField = ({
  register,
  errors,
  setIsError,
  setSelectedUserLookup,
  autoSuggestValue,
  setAutoSuggestValue,
  onChangeHandler,
}: any) => (
  <div className="form-group row required mb-4">
    <label
      htmlFor="emailid"
      className="col-sm-4 col-form-label"
      aria-label="Email"
    >
      Email ID
    </label>
    <div className="col-sm-8">
      <AutoSuggestComp
        onChangeHandler={onChangeHandler}
        setIsError={setIsError}
        setSelectedUserLookup={setSelectedUserLookup}
        autoSuggestValue={autoSuggestValue}
        setAutoSuggestValue={setAutoSuggestValue}
        register={register}
        id="emailid"
      />
      {errors.email?.message && (
        <p role="alert" className="form-error-msg mb-0">
          {errors.email?.message}
        </p>
      )}
    </div>
  </div>
);

const ClientDropdown = ({
  register,
  activeClientsData,
  stateObject,
  selectClientValue,
  setSelectClientValue,
  onChangeHandler,
  errors,
}: any) => {
  const getClientsDataBasedOnRole = () => {
    let clientsDropdownData: any[] = [];

    if (fetchPermission()("account.clients.get", "")) {
      // Super Admin
      clientsDropdownData = [...activeClientsData];
    } else if (stateObject.role === "Client Admin") {
      // Client Admin
      clientsDropdownData = [
        {
          id: stateObject.clientId,
          name: stateObject.clientName,
        },
      ];
    }

    return clientsDropdownData.map((item: any) => (
      <option key={item.id} value={item.id}>
        {item.name}
      </option>
    ));
  };

  return (
    <Restricted to="account.clients.get">
      <div className="form-group row required mb-3">
        <label
          htmlFor="selectClient"
          className="col-sm-4 col-form-label"
          aria-label="select-client"
        >
          Select Client
        </label>
        <div className="col-sm-8 tooltip-role">
          <div className="select-client" id="Client-tooltip">
            <select
              className="form-control dropdown"
              ref={register}
              name="clientId"
              id="selectClient"
              data-testid="selectClient"
              aria-required="true"
              onClick={dropDownToggler}
              onBlur={dropDownDefaultState}
              onChange={(e) => {
                onChangeHandler(e);
                setSelectClientValue(
                  e.target.options[e.target.selectedIndex].text
                );
              }}
            >
              <option value="0" disabled hidden selected>
                Select
              </option>
              {getClientsDataBasedOnRole()}
            </select>
            <i className="aha-icon-arrow-down forModal" />
            <span className="tooltiptext">
              {selectClientValue === "" ? "select client" : selectClientValue}
            </span>
          </div>
          {errors.clientId?.message && (
            <p role="alert" className="form-error-msg mb-0">
              {errors.clientId?.message}
            </p>
          )}
        </div>
      </div>
    </Restricted>
  );
};

const UserInfoFields = ({ register, errors, onChangeHandler }: any) => (
  <>
    <div className="form-group row required mb-4">
      <label
        htmlFor="firstName"
        className="col-sm-4 col-form-label"
        aria-label="First name"
      >
        First Name
      </label>
      <div className="col-sm-8">
        <input
          type="text"
          className="form-control"
          id="firstName"
          required
          name="firstName"
          aria-required="true"
          ref={register}
          onChange={onChangeHandler}
        />
        {errors.firstName?.message && (
          <p role="alert" className="form-error-msg mb-0">
            {errors.firstName?.message}
          </p>
        )}
      </div>
    </div>

    <div className="form-group row required mb-4">
      <label
        htmlFor="lastName"
        className="col-sm-4 col-form-label"
        aria-label="Last name"
      >
        Last Name
      </label>
      <div className="col-sm-8">
        <input
          type="text"
          required
          className="form-control"
          id="lastName"
          name="lastName"
          aria-required="true"
          ref={register}
          onChange={onChangeHandler}
        />
        {errors.lastName?.message && (
          <p role="alert" className="form-error-msg mb-0">
            {errors.lastName?.message}
          </p>
        )}
      </div>
    </div>
  </>
);

const RoleDropdown = ({
  register,
  inviteUserRoleData,
  onChangeHandler,
  errors,
}: any) => (
  <div className="form-group row required mb-4">
    <label
      htmlFor="selectRole"
      className="col-sm-4 col-form-label"
      aria-label="Select role"
    >
      Select Role
    </label>
    <div className="col-sm-8">
      <select
        className="form-control dropdown"
        defaultValue=""
        ref={register}
        onChange={onChangeHandler}
        name="role"
        id="selectRole"
        required
        aria-required="true"
        onClick={dropDownToggler}
        onBlur={dropDownDefaultState}
      >
        <option value="" disabled hidden selected>
          Select
        </option>
        {inviteUserRoleData.map((item: any) => (
          <option key={item.id} value={item.code}>
            {item.name}
          </option>
        ))}
      </select>
      <i className="aha-icon-arrow-down forModal" />
      {errors.role?.message && (
        <p role="alert" className="form-error-msg mb-0">
          {errors.role?.message}
        </p>
      )}
    </div>
  </div>
);

const ErrorMessage = () => (
  <div className="form-group row required mb-3 marginAlign-errorMsg">
    <div className="col-sm-4" />
    <div className="col-sm-8">
      <div className="error-block d-flex align-items-center">
        <i className="aha-icon-warning warning-icon p-2" />
        <div>
          <h4 role="alert" className="error-message m-0 pt-2 pb-2 pr-3">
            Email ID already exists, Please choose a different one
          </h4>
        </div>
      </div>
    </div>
  </div>
);

const ModalFooter = ({
  isError,
  buttonDisabled,
  closeModal,
  selectedUserLookup,
  navigate,
}: any) => {
  const buttonText = isError ? "Edit User" : "Invite";
  const largeScreenAriaLabel = isError ? "Edit User" : "Invite User";
  const smallScreenAriaLabel = isError ? "Edit User" : "save";
  const dismissData = isError ? "modal" : null;
  const disabledValue = isError ? false : buttonDisabled;
  const onClickHandler = isError
    ? () => navigate(`${CONSTANTS.PAGE_ROUTES.USERS}/${selectedUserLookup}`)
    : undefined;

  return (
    <>
      <div className="modal-footer pt-1 d-flex btnGrp-addTanant justify-content-end">
        <button
          type="button"
          aria-label="cancel"
          className="btn btn-round btn-secondary mr-4 btnwidth cancel-btn"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          disabled={disabledValue}
          type={isError ? "button" : "submit"}
          aria-label={largeScreenAriaLabel}
          className="btn btn-round btn-primary btnwidth invite-btn"
          data-dismiss={dismissData}
          onClick={onClickHandler}
        >
          {buttonText}
        </button>
      </div>
      <div className="modal-footer d-block d-sm-none mt-0 pt-0">
        <div className="btn-block btnbottom btnGrp-add">
          <button
            disabled={disabledValue}
            data-testid="submitbtn"
            type={isError ? "button" : "submit"}
            aria-label={smallScreenAriaLabel}
            className="btn btn-round btn-primary btnwidth invite-sm-btn"
            data-dismiss={dismissData}
            onClick={onClickHandler}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </>
  );
};

// Helper functions moved outside component
const handleApiError = (title: string, error: any) => {
  store.dispatch(
    showToast({
      type: "danger",
      title,
      message: getErrorMessage(error),
    })
  );
};

const fetchRoleDataHelper = (
  setInviteUserRoleData: any,
  loggedInUserObjectContext: any
) => {
  getRoles({
    isActive: true,
    level: "gte".concat(",", `${loggedInUserObjectContext?.roleLevel}`),
  })
    .then((response) => {
      const { roles } = response.data;
      setInviteUserRoleData(roles === null ? [] : roles);
    })
    .catch((error) => {
      handleApiError("Error Occurred", error);
    });
};

const fetchClientDataHelper = (setActiveClientsData: any) => {
  ClientListService({
    pageSize: CONSTANTS.MAX_RECORDS,
    pageNumber: 1,
    isActive: true,
  })
    .then((response) => {
      const { clients } = response.data;
      setActiveClientsData(clients || []);
    })
    .catch((error) => {
      handleApiError("Error Occurred", error);
    });
};

// Main component
const InviteUserModal = ({
  toggleModal,
  setToggleModal,
  imageLoading,
  setImageLoading,
  stateObject,
  setRefreshWithPageNumber,
  refreshWithPageNumber,
}: any) => {
  // Navigation and context
  const navigate = useNavigate();
  const refFocus: any = useRef(null);
  const { loggedInUserObjectContext } = useContext(PermissionContext);

  // State management - grouped related state
  const [formUI, setFormUI] = useState({
    selectClientValue: "select client",
    showClientDropDown: false,
    isError: false,
    autoSuggestValue: "",
    buttonDisabled: true,
  });

  const [formData, setFormData] = useState({
    roleSelected: "",
    selectedUserLookup: "",
    defaultClientId: "",
    inviteUserRoleData: [],
    activeClientsData: [],
    userInviteFormData: {
      firstName: "",
      lastName: "",
      email: "",
      clientId: "0",
      role: "",
      roleCode: "",
    },
  });

  // Form validation schema
  const validationSchema = getValidationSchema(
    loggedInUserObjectContext,
    formData.roleSelected
  );

  // Setup form with validation
  const { register, handleSubmit, reset, errors, getValues } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // Effect for modal focus
  useEffect(() => {
    if (toggleModal && refFocus.current && !imageLoading) {
      refFocus.current.focus();
    }
  }, [toggleModal, imageLoading]);

  // Effect for button disabled state
  useEffect(() => {
    const commonCheck = checkCommonConditions(
      formData.userInviteFormData,
      formUI.autoSuggestValue,
      formUI.isError,
      loggedInUserObjectContext,
      formUI.showClientDropDown,
      formData.defaultClientId
    );

    setFormUI((prev) => ({
      ...prev,
      buttonDisabled: !commonCheck,
    }));
  }, [
    formData.userInviteFormData,
    formUI.showClientDropDown,
    formUI.autoSuggestValue,
    formUI.isError,
    formData.defaultClientId,
  ]);

  // Data fetching effects
  useEffect(() => {
    fetchRoleDataHelper(
      (data: any) =>
        setFormData((prev) => ({ ...prev, inviteUserRoleData: data })),
      loggedInUserObjectContext
    );
  }, []);

  useEffect(() => {
    const isClientRole = clientArr.includes(formData.roleSelected);
    const hasPermission = fetchPermission()("account.clients.get", "");

    if (isClientRole && hasPermission) {
      fetchClientDataHelper((data: any) =>
        setFormData((prev) => ({ ...prev, activeClientsData: data }))
      );
      setFormUI((prev) => ({ ...prev, showClientDropDown: true }));
    } else {
      setFormUI((prev) => ({ ...prev, showClientDropDown: false }));
    }
  }, [formData.roleSelected]);

  // Form state handlers
  const resetModalState = () => {
    reset({
      errors: 0,
      roleCode: "",
      clientId: "0",
      email: "",
      firstName: "",
      lastName: "",
    });

    setFormData((prev) => ({
      ...prev,
      roleSelected: "",
      selectedUserLookup: "",
      defaultClientId: "",
      userInviteFormData: {
        firstName: "",
        lastName: "",
        email: "",
        clientId: "0",
        role: "",
        roleCode: "",
      },
    }));

    setFormUI({
      selectClientValue: "select client",
      showClientDropDown: false,
      isError: false,
      autoSuggestValue: "",
      buttonDisabled: true,
    });
  };

  const handleRoleChange = (value: any) => {
    setFormData((prev) => ({
      ...prev,
      roleSelected: value,
    }));

    if (!formUI.showClientDropDown) {
      setFormData((prev) => ({
        ...prev,
        defaultClientId: "",
      }));
    }

    return value;
  };

  // Event handlers
  const onChangeHandler = (event: any) => {
    const { name, value } = event.target;

    if (name === "clientId") {
      setFormData((prev) => ({
        ...prev,
        defaultClientId: value,
      }));
    }

    const updatedFormData = {
      ...formData.userInviteFormData,
      ...getValues(),
    };

    if (name === "role") {
      const roleCode = handleRoleChange(value);
      setFormData((prev) => ({
        ...prev,
        userInviteFormData: {
          ...updatedFormData,
          roleCode,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        userInviteFormData: updatedFormData,
      }));
    }
  };

  const closeModal = () => {
    toggleModalStyles();
    setToggleModal(false);
    setImageLoading(true);
    resetModalState();
  };

  const imageLoaded = () => {
    setImageLoading(false);
  };

  // Form submission
  const submitForm = async () => {
    const { roleCode, firstName, lastName, clientId } =
      formData.userInviteFormData;
    const clntId = isClientAdmin(stateObject.role)
      ? stateObject.clientId.toString()
      : clientId;

    inviteUserService(
      firstName,
      lastName,
      formUI.autoSuggestValue,
      roleCode,
      clntId
    )
      .then(() => {
        store.dispatch(
          showToast({
            type: "success",
            title: "Success",
            message: "User has been invited successfully!",
          })
        );

        setRefreshWithPageNumber(!refreshWithPageNumber);
        closeModal();
      })
      .catch((error) => {
        if (
          error.response?.data?.error?.message ===
          "Email-id already exists under the tenant"
        ) {
          setFormUI((prev) => ({ ...prev, isError: true }));
        } else {
          handleApiError("Error", error);
        }
      });
  };

  // Update setters for nested state
  const setIsError = (value: any) => {
    setFormUI((prev) => ({ ...prev, isError: value }));
  };

  const setSelectedUserLookup = (value: any) => {
    setFormData((prev) => ({ ...prev, selectedUserLookup: value }));
  };

  const setAutoSuggestValue = (value: any) => {
    setFormUI((prev) => ({ ...prev, autoSuggestValue: value }));
  };

  const setSelectClientValue = (value: any) => {
    setFormUI((prev) => ({ ...prev, selectClientValue: value }));
  };

  const setShowClientDropDown = (value: any) => {
    setFormUI((prev) => ({ ...prev, showClientDropDown: value }));
  };

  if (!toggleModal) {
    return null;
  }

  // Rendering
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
        id="InviteUser"
        tabIndex={-1}
        aria-label="Invite User Modal Window"
        aria-modal="true"
        role="dialog"
        aria-hidden={!toggleModal}
      >
        <div className="modal-dialog modal-dialog-md modal-md modal-dialog-centered inviteuser-modal modal-popup-inviteUser margin-sm modalwidth">
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
                ref={refFocus}
                type="button"
                className="close d-none d-sm-block"
                onClick={closeModal}
                aria-label="Close"
              >
                <img
                  src={imageUrl}
                  data-testid="crossbtn"
                  onLoad={imageLoaded}
                  alt="icon"
                  className="position-relative closestyle"
                />
              </button>

              <ModalHeader
                stateObject={stateObject}
                toggleModal={toggleModal}
                setToggleModal={setToggleModal}
                setShowClientDropDown={setShowClientDropDown}
                setSelectClientValue={setSelectClientValue}
              />

              <p className="instruction">{CONSTANTS.MODAL_INSTRUCTION_TEXT}</p>

              <form onSubmit={handleSubmit(submitForm)}>
                <div className="modal-body p-0 pt-3">
                  <EmailField
                    register={register}
                    errors={errors}
                    setIsError={setIsError}
                    setSelectedUserLookup={setSelectedUserLookup}
                    autoSuggestValue={formUI.autoSuggestValue}
                    setAutoSuggestValue={setAutoSuggestValue}
                    onChangeHandler={onChangeHandler}
                  />

                  {formUI.isError ? (
                    <ErrorMessage />
                  ) : (
                    <>
                      <UserInfoFields
                        register={register}
                        errors={errors}
                        onChangeHandler={onChangeHandler}
                      />

                      <RoleDropdown
                        register={register}
                        inviteUserRoleData={formData.inviteUserRoleData}
                        onChangeHandler={onChangeHandler}
                        errors={errors}
                      />

                      {formUI.showClientDropDown && (
                        <ClientDropdown
                          register={register}
                          activeClientsData={formData.activeClientsData}
                          stateObject={stateObject}
                          selectClientValue={formUI.selectClientValue}
                          setSelectClientValue={setSelectClientValue}
                          onChangeHandler={onChangeHandler}
                          errors={errors}
                        />
                      )}
                    </>
                  )}

                  <ModalFooter
                    isError={formUI.isError}
                    buttonDisabled={formUI.buttonDisabled}
                    closeModal={closeModal}
                    selectedUserLookup={formData.selectedUserLookup}
                    navigate={navigate}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
};

export default InviteUserModal;
