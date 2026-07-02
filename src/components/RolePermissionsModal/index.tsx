/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
import store from "app/store";
import CONSTANTS from "common/constants";
import {
  firstLetterCaps,
  getErrorMessage,
  removeAllSpecialChar,
  toggleModalStyles,
  toggleServiceCheckboxForAllHttpCheckBoxes,
} from "common/utils";
import { showToast } from "components/Toast/toast.slice";
import { FocusTrap } from "focus-trap-react";
import React, { useEffect, useRef, useState } from "react";
import { EditCredentialPatch } from "services/api/credentials.api";
import RolePermissionWrapper from "./Styled";

export default function RolePermissionsModal({
  editCredentialData,
  checkBoxState,
  setCheckBoxState,
  credentialName,
  setPermission,
  permission,
  setCredName,
  setToggleRolePermissionModal,
  toggleRolePermissionModal,
  toggleStatus,
  setToggleStatus,
}: any) {
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const onChangeCheckBoxHandler = (
    httpMethod: string,
    resource: string,
    service: string,
    event: any
  ) => {
    // check if the checkbox is checked or unchecked
    const cb = document.querySelector(
      `#editCred_${removeAllSpecialChar(resource + httpMethod + service)}`
    ) as HTMLInputElement;

    // collect all the existing values
    const existingValues = Object.values(
      permission?.[service as keyof typeof permission]?.[
        resource as keyof (typeof permission)[typeof service]
      ] || {}
    );

    let updatedValue = existingValues;
    if (cb?.checked) {
      updatedValue = [httpMethod, ...updatedValue];
    } else {
      updatedValue = updatedValue.filter((item) => item !== httpMethod);
      // uncheck the service checkbox if the resource checkbox is unchecked
      const serviceCheckBox = document.querySelector(
        `#editCred_${service}`
      ) as HTMLInputElement;
      serviceCheckBox.checked = false;
    }

    // remove from prepopulate state variable
    let prePopulateArr: any = checkBoxState;

    if (event.target.checked) {
      prePopulateArr.push(
        removeAllSpecialChar(resource + httpMethod + service)
      );
    } else {
      prePopulateArr = prePopulateArr.filter((item: any) => {
        return item !== removeAllSpecialChar(resource + httpMethod + service);
      });
    }

    setCheckBoxState([...prePopulateArr]);

    toggleServiceCheckboxForAllHttpCheckBoxes(
      `editCred_${service}`,
      "borderbtm"
    );

    setPermission({
      ...permission,
      [service]: {
        ...permission[service as keyof Object],
        [resource]: updatedValue,
      },
    });
  };

  const onChangeServiceCheckbox = (serviceName: string, inputJSON: any) => {
    const cb = document.querySelector(`#${serviceName}`) as HTMLInputElement;
    const children = document.querySelectorAll(
      `.${serviceName}-sub-checkbox`
    ) as NodeListOf<HTMLInputElement>;

    // remove from prepopulate state variable
    let prePopulateArr: any = checkBoxState;

    if (cb.checked) {
      children.forEach((child) => {
        child.checked = true;
        prePopulateArr.push(child?.getAttribute("name")?.split("_")[1]);
      });

      setCheckBoxState([...checkBoxState, ...prePopulateArr]);

      setPermission({
        ...permission,
        [serviceName.split("_")[1]]: inputJSON[serviceName.split("_")[1]],
      });
    } else {
      children.forEach((child) => {
        child.checked = false;
        prePopulateArr = prePopulateArr.filter(
          (item: any) => item !== child?.getAttribute("name")?.split("_")[1]
        );
      });
      const updatedPermission: any = JSON.parse(JSON.stringify(permission));
      delete updatedPermission[serviceName.split("_")[1]];

      setCheckBoxState([...prePopulateArr]);

      setPermission(updatedPermission);
    }
  };

  const isPermissionSelected = () => {
    return (
      JSON.stringify(permission).search(/"get"|"post"|"patch"|"delete"/) > -1
    );
  };
  const imageUrl = "../images/Close.svg";
  const [imageLoading, setImageLoading] = useState(true);
  const imageLoaded = () => {
    setImageLoading(false);
  };
  const submitEditPermission = () => {
    const formData: any = {
      name: credentialName,
      channel: "API",
    };

    if (isPermissionSelected()) {
      formData.permissions = permission;
    }

    EditCredentialPatch(editCredentialData?.id, formData)
      .then(() => {
        store.dispatch(
          showToast({
            type: "success",
            title: "Success",
            message: "Credential Edited Successfully",
          })
        );
        toggleModalStyles();
        setToggleRolePermissionModal(false);
        setToggleStatus(!toggleStatus);
        setImageLoading(true);
      })
      .catch((error: any) => {
        store.dispatch(
          showToast({
            type: "danger",
            title: "Error",
            message: getErrorMessage(error),
          })
        );
      });
  };

  // For Accessibility
  const RefFocus = useRef<any>();
  useEffect(() => {
    if (toggleRolePermissionModal && RefFocus.current && !imageLoading)
      RefFocus.current.focus();
  }, [toggleRolePermissionModal, imageLoading]);

  useEffect(() => {
    if (credentialName?.trim().length > 0 && checkBoxState.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [credentialName, checkBoxState]);

  const serviceCheckboxArr: any = [];

  const resetServiceCheckbox = () => {
    serviceCheckboxArr.forEach((item: any) => {
      document.querySelector<any>(`#${item}`).checked = false;
    });
  };

  /* start */

  // Types
  type HttpMethod = string;
  type ResourceMethods = Record<string, HttpMethod[]>;
  type ServiceResources = Record<string, ResourceMethods>;

  // Component for rendering a single HTTP method checkbox
  const HttpMethodCheckbox = ({
    httpMethod,
    resourceName,
    service,
    isChecked,
    onChangeCheckBox,
  }: {
    httpMethod: string;
    resourceName: string;
    service: string;
    isChecked: boolean;
    onChangeCheckBox: (
      httpMethod: string,
      resourceName: string,
      service: string,
      e: React.ChangeEvent<HTMLInputElement>
    ) => void;
  }) => {
    const checkboxId = `editCred_${removeAllSpecialChar(
      resourceName + httpMethod + service
    )}`;

    return (
      <div className="form-group form-check-bordered">
        <input
          type="checkbox"
          value={httpMethod}
          aria-label={`${removeAllSpecialChar(httpMethod)} api of ${service}`}
          id={checkboxId}
          name={checkboxId}
          className={`editCred_${service}-sub-checkbox`}
          checked={isChecked}
          onChange={(e) =>
            onChangeCheckBox(httpMethod, resourceName, service, e)
          }
        />

        <label htmlFor={checkboxId}> {firstLetterCaps(httpMethod)}</label>
      </div>
    );
  };

  // Component for rendering the resource with its HTTP methods
  const ResourceRow = ({
    resourceName,
    methods,
    service,
    checkBoxState,
    onChangeCheckBox,
  }: {
    resourceName: string;
    methods: HttpMethod[];
    service: string;
    checkBoxState: string[];
    onChangeCheckBox: (
      httpMethod: string,
      resourceName: string,
      service: string,
      e: React.ChangeEvent<HTMLInputElement>
    ) => void;
  }) => {
    const labelId = removeAllSpecialChar(
      `${resourceName}-label-${service}-edit`
    );

    return (
      <fieldset className="col-12 d-md-flex m-0 p-0" aria-labelledby={labelId}>
        <label
          htmlFor="checkbox"
          key={resourceName}
          className="col-sm-6 col-md-4 col-form-label"
          id={labelId}
        >
          {resourceName}
        </label>
        <div className="col-12 col-md-8 col-sm-6 alignCheckboxes d-sm-flex d-block justify-content-start pt-2">
          {methods.map((httpMethod) => (
            <HttpMethodCheckbox
              key={`${resourceName}-${httpMethod}`}
              httpMethod={httpMethod}
              resourceName={resourceName}
              service={service}
              isChecked={checkBoxState.includes(
                removeAllSpecialChar(resourceName + httpMethod + service)
              )}
              onChangeCheckBox={onChangeCheckBox}
            />
          ))}
        </div>
      </fieldset>
    );
  };

  // Component for rendering a service with its resources
  const ServiceSection = ({
    service,
    resources,
    checkBoxState,
    onChangeServiceCheckbox,
    onChangeCheckBox,
  }: {
    service: string;
    resources: ResourceMethods;
    checkBoxState: string[];
    onChangeServiceCheckbox: (
      serviceId: string,
      inputJSON: ServiceResources
    ) => void;
    onChangeCheckBox: (
      httpMethod: string,
      resourceName: string,
      service: string,
      e: React.ChangeEvent<HTMLInputElement>
    ) => void;
  }) => {
    const serviceId = `editCred_${service}`;

    return (
      <>
        <div className="borderbtm">
          <div
            className="h6 font-bold font16 d-flex flex-row"
            id={`editCredModalTitleAccountsLast-${service}`}
          >
            <div className="form-group form-check-bordered mb-0 pr-0">
              <input
                type="checkbox"
                aria-label={`${service} Select All`}
                id={serviceId}
                name={serviceId}
                onChange={() =>
                  onChangeServiceCheckbox(serviceId, { [service]: resources })
                }
              />
              <label
                htmlFor={serviceId}
                id={`${serviceId}_label`}
                className="fontnormal"
              >
                &nbsp;
              </label>
            </div>
            <button
              type="button"
              className="btn btn-block p-0 text-left aui-accordion-btn"
              id={`editcreds_${service}`}
              aria-label={`${service} accordian`}
              aria-controls={`editcreds${service}`}
              data-toggle="collapse"
              data-target={`#editcreds${service}`}
              aria-expanded="true"
            >
              {firstLetterCaps(service)}
              <i className="acc-btn-arrow aha-icon-arrow-down" />
            </button>
          </div>
        </div>
        <div
          id={`editcreds${service}`}
          role="region"
          aria-labelledby={`editcreds_${service}`}
          data-parent="#editCredAccordionExample"
          className={`form-group row ${service}-checkboxes collapse show`}
        >
          {Object.entries(resources).map(([resourceName, methods]) => (
            <ResourceRow
              key={`${service}-${resourceName}`}
              resourceName={resourceName}
              methods={methods}
              service={service}
              checkBoxState={checkBoxState}
              onChangeCheckBox={onChangeCheckBox}
            />
          ))}
        </div>
      </>
    );
  };

  // Main component for rendering API permissions
  const renderAPIPermission = (inputJSON: ServiceResources) => {
    return (
      <div
        className="aui-nav-accordion collapse show"
        id="collapseAccOne"
        data-parent="#categories"
      >
        <div className="card mb-0">
          <div className="card-header" id="editCredHeadingOneCategories">
            <div className="card-body pt-2 pb-0 px-3 mx-2">
              <div className="accordion" id="editCredAccordionExample">
                {Object.keys(inputJSON).map((service) => {
                  serviceCheckboxArr.push(`editCred_${service}`);
                  return (
                    <ServiceSection
                      key={service}
                      service={service}
                      resources={inputJSON[service]}
                      checkBoxState={checkBoxState}
                      onChangeServiceCheckbox={onChangeServiceCheckbox}
                      onChangeCheckBox={onChangeCheckBoxHandler}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  /* end */
  return (
    <RolePermissionWrapper>
      {toggleRolePermissionModal ? (
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
            id="rolepermission"
            tabIndex={-1}
            aria-label="rolepermissionModal"
            aria-modal="true"
            role="dialog"
            aria-labelledby="rolepermissionHeading"
          >
            <div className="modal-dialog modal-md modal-dialog-centered">
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
                      setToggleRolePermissionModal(false);
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
                  <div className="form-scroll">
                    <div className="modal-header">
                      <div className="d-flex flex-row flex-nowrap justify-content-center align-items-center">
                        <span
                          className="d-inline-block d-sm-none rotateInverse mb-2 mr-2"
                          role="button"
                          tabIndex={0}
                          aria-label="Close"
                          onClick={() => {
                            toggleModalStyles();
                            setToggleRolePermissionModal(false);
                          }}
                          onKeyUp={(e) => {
                            if (e.key === "Enter") {
                              toggleModalStyles();
                              setToggleRolePermissionModal(false);
                            }
                          }}
                        >
                          <i
                            className="aha-icon-right-arrow-thick"
                            data-dismiss="modal"
                          />
                        </span>
                        <h2
                          className="h6 mainHeading"
                          id="rolepermissionHeading"
                        >
                          Edit Permission
                        </h2>
                      </div>
                    </div>
                    <p className="instruction">
                      {CONSTANTS.MODAL_INSTRUCTION_TEXT}
                    </p>
                    <form>
                      <div className="modal-body p-0">
                        <div className="form-group row required pt-4 mb-4 px-sm-3">
                          <label
                            className="col-sm-5 col-form-label tooltip-role"
                            htmlFor="enterCredentialName"
                            aria-label="Credential Name"
                          >
                            Credential Name
                            <i className=" aha-icon-alert red" />
                            <span className="tooltiptext">
                              Authentication token_when interacting with ADH
                              systems
                            </span>
                          </label>
                          <div className="col-sm-6">
                            <input
                              type="text"
                              aria-required="true"
                              className="form-control"
                              id="enterCredentialName"
                              name="editCredName"
                              value={credentialName}
                              onChange={(e: any) => {
                                setCredName(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="navbar-expand-lg">
                          <button
                            className="d-none navbar-toggler mb-3"
                            type="button"
                            id="categories"
                            aria-label="Toggle navigation"
                          />
                          <div
                            className="aui-nav-accordion"
                            id="rolePermissionCategories"
                          >
                            <div className="card mb-0">
                              <div
                                className="card-header"
                                id="headingOnePermissionModal"
                              >
                                <h3 className="mb-0 h7">
                                  <button
                                    type="button"
                                    className="btn btn-text aui-accordion-btn bgcolor borderbtm"
                                    data-toggle="collapse"
                                    data-target="#collapseAccOne"
                                    data-aria-controls="collapseAccOne"
                                    aria-expanded="true"
                                    aria-label="API accordion"
                                  >
                                    <div className="form-group form-check-bkp mb-0">
                                      <label
                                        className="labelHeading"
                                        htmlFor="check0"
                                      >
                                        API
                                      </label>
                                    </div>
                                    <i className="acc-btn-arrow aha-icon-arrow-down" />
                                  </button>
                                </h3>
                                {renderAPIPermission(
                                  JSON.parse(
                                    localStorage.getItem("apiPermission") ??
                                      "{}"
                                  )
                                )}
                              </div>

                              <div className="card mb-0">
                                <div className="card-header" id="headingTwo">
                                  <h3 className="mb-0 h7">
                                    <button
                                      type="button"
                                      className="btn btn-text aui-accordion-btn bgcolor collapsed borderbtm"
                                      data-toggle="collapse"
                                      data-target="#collapseAccTwo"
                                      aria-controls="collapseAccTwo"
                                      aria-label="NATS accordion"
                                    >
                                      <div className="form-group form-check-bkp mb-0">
                                        <label
                                          className="labelHeading"
                                          htmlFor="checkNats"
                                        >
                                          NATS
                                        </label>
                                      </div>
                                      <i className="acc-btn-arrow aha-icon-arrow-down" />
                                    </button>
                                  </h3>
                                </div>
                                <div
                                  id="collapseAccTwo"
                                  className="collapse"
                                  data-parent="#categories"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="modal-footer mt-0 pt-4 d-flex justify-content-center d-none d-sm-block">
                        <div className="btnbottom d-flex btnGrp-add justify-content-sm-end">
                          <button
                            type="button"
                            aria-label="cancel"
                            className="btn btn-round btn-secondary mr-4 btnwidth"
                            onClick={() => {
                              resetServiceCheckbox();
                              setCheckBoxState([]);
                              toggleModalStyles();
                              setToggleRolePermissionModal(false);
                              setImageLoading(true);
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={submitEditPermission}
                            disabled={buttonDisabled}
                            aria-label="save"
                            className="btn btn-round btn-primary btnwidth"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                      <div className="d-block d-sm-none modal-footer mt-0 justify-content-center justify-content-sm-end btn-background">
                        <div className="btnbottom saveCredsBtn">
                          <button
                            type="button"
                            onClick={submitEditPermission}
                            aria-label="save"
                            disabled={buttonDisabled}
                            className="btn btn-round btn-primary btn-block btnwidth  plus-icon p2 fxdbtn"
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
          </div>
        </FocusTrap>
      ) : null}
    </RolePermissionWrapper>
  );
}
