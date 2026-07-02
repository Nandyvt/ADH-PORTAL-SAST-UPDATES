/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useEffect, useRef, useState } from "react";

import store from "app/store";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { showToast } from "components/Toast/toast.slice";
import { ClientListService } from "services/api/clients.api";
import { useForm } from "react-hook-form";
import {
  firstLetterCaps,
  getErrorMessage,
  removeAllSpecialChar,
  toggleModalStyles,
  toggleServiceCheckboxForAllHttpCheckBoxes,
} from "common/utils";
import { fetchPermission } from "services/PermissionManager/Types";
import PermissionContext from "services/PermissionManager/PermissionContext";
import Restricted from "services/PermissionManager/Restricted";
import CONSTANTS from "common/constants";
import { FocusTrap } from "focus-trap-react";
import CredentialsModalWrapper from "./styled";
import { AddCredentials } from "../../services/api/credentials.api";

export interface ICredentials {
  name: string;
  permissions?: object;
  clientId: number;
  channel: string;
}

// Resource fieldset component
const ResourceFieldset = ({
  service,
  resourceName,
  httpMethods,
  renderHttpMethodCheckboxes,
}: {
  service: string;
  resourceName: string;
  httpMethods: any;
  renderHttpMethodCheckboxes: any;
}) => {
  const fieldsetId = removeAllSpecialChar(`${resourceName}-label-${service}`);

  return (
    <fieldset className="col-12 d-md-flex m-0 p-0" aria-labelledby={fieldsetId}>
      <label
        htmlFor="checkbox"
        key={resourceName}
        className="col-sm-6 col-md-4 col-form-label"
        id={fieldsetId}
      >
        {resourceName}
      </label>
      <div className="col-12 col-md-8 col-sm-6 alignCheckboxes d-sm-flex d-block justify-content-start pt-2">
        {renderHttpMethodCheckboxes(service, resourceName, httpMethods)}
      </div>
    </fieldset>
  );
};

export default function CredentialsModal({
  setToggleModal,
  toggleModal,
  toggleStatus,
  setToggleStatus,
}: any) {
  const [clientsFilterData, setClientsFilterData] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [permission, setPermission] = useState({});
  const { loggedInUserObjectContext } = useContext(PermissionContext);
  const [credentialsData, setCredentialsData] = useState<ICredentials>({
    name: "",
    permissions: {},
    clientId: 0,
    channel: "",
  });

  const isPermissionSelected = () => {
    return (
      JSON.stringify(permission).search(/"get"|"post"|"patch"|"delete"/) > -1
    );
  };

  const defaultCredential = {
    name: "",
    permissions: {},
    clientId: 0,
    channel: "",
  };

  const serviceChkBoxRef: any = useRef([]);
  serviceChkBoxRef.current = [];

  const serviceChildChkBoxRef: any = useRef([]);
  serviceChildChkBoxRef.current = [];

  const onChangeServiceCheckbox = (serviceName: string, inputJSON: any) => {
    const cb = document.querySelector(`#${serviceName}`) as HTMLInputElement;
    const children = document.querySelectorAll(
      `.${serviceName}-sub-checkbox`
    ) as NodeListOf<HTMLInputElement>;

    if (cb.checked) {
      children.forEach((child) => {
        child.checked = true;
      });

      setPermission({
        ...permission,
        [serviceName]: inputJSON[serviceName],
      });
    } else {
      children.forEach((child) => {
        child.checked = false;
      });
      const updatedPermission: any = JSON.parse(JSON.stringify(permission));
      delete updatedPermission[serviceName];

      setPermission(updatedPermission);
    }
  };
  const imageUrl = "../images/Close.svg";
  const [imageLoading, setImageLoading] = useState(true);
  const imageLoaded = () => {
    setImageLoading(false);
  };

  /** save button enable/disable */
  useEffect(() => {
    const { name, channel } = credentialsData;
    const commonCheck = name && channel && isPermissionSelected();
    if (commonCheck) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [credentialsData, permission]);

  const dropDownToggler = (e: any) => {
    e.currentTarget.nextSibling.classList.toggle("rotate");
  };

  const dropDownDefaultState = (e: any) => {
    if (e.currentTarget.nextSibling.classList.contains("rotate") === true) {
      e.currentTarget.nextSibling.classList.remove("rotate");
    }
  };

  const formSchema = yup.object().shape({
    name: yup.string().required("Name is Required"),
  });

  const { register, handleSubmit, getValues, reset } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onChangeCheckBoxHandler = (
    httpMethod: string,
    resource: string,
    service: string
  ) => {
    // check if the checkbox is checked or unchecked
    const cb = document.querySelector(
      `#${removeAllSpecialChar(resource + httpMethod + service)}`
    ) as HTMLInputElement;

    // collect all the existing values
    const existingValues = Object.values(
      permission?.[service as keyof Object]?.[resource as keyof Object] ?? {}
    );

    let updatedValue = existingValues;
    if (cb?.checked) {
      updatedValue = [httpMethod, ...updatedValue];
    } else {
      updatedValue = updatedValue.filter((item) => item !== httpMethod);
      // uncheck the service checkbox if the resource checkbox is unchecked
      const serviceCheckBox = document.querySelector(
        `#${service}`
      ) as HTMLInputElement;
      serviceCheckBox.checked = false;
    }

    toggleServiceCheckboxForAllHttpCheckBoxes(service, "borderbtm");

    setPermission({
      ...permission,
      [service]: {
        ...permission[service as keyof Object],
        [resource]: updatedValue,
      },
    });
  };

  let prevScrollposBtnSec = window.scrollY;

  const makeBtnSectionStickyMobile = () => {
    const elBtn = document.getElementsByClassName("btn-background");
    window.addEventListener("scroll", () => {
      const currentScrollPosBtnSec = window.scrollY;
      if (prevScrollposBtnSec > currentScrollPosBtnSec) {
        Array.from(elBtn).forEach((item) => {
          item.classList.remove("bottom-70");
          return item.classList.add("bottom-0");
        });
      } else {
        Array.from(elBtn).forEach((item) => {
          item.classList.remove("bottom-0");
          return item.classList.add("bottom-70");
        });
      }

      prevScrollposBtnSec = currentScrollPosBtnSec;
    });
  };
  useEffect(() => {
    window.innerWidth < 576 && makeBtnSectionStickyMobile();
  }, [prevScrollposBtnSec]);

  /**
   * Client drop down
   * @param data
   */
  const getClientFilterRecords = ({ pageSizeParam, pageNumParam }: any) => {
    ClientListService({
      pageSize: pageSizeParam,
      pageNumber: pageNumParam,
      isActive: "true",
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

  // handler for onchange form
  const onChangeHandler = (event: any) => {
    setCredentialsData({ ...credentialsData, ...getValues() });
  };
  // For Accessibility
  const RefFocus = useRef<any>();
  useEffect(() => {
    if (toggleModal && RefFocus.current && !imageLoading)
      RefFocus.current.focus();
  }, [toggleModal, imageLoading]);

  /* Start - demo */

  // Render HTTP method checkboxes
  const renderHttpMethodCheckboxes = (
    service: string,
    resourceName: string,
    httpMethods: any
  ) => {
    return Object.values(httpMethods).map((method: any) => {
      const checkboxId = removeAllSpecialChar(
        `${resourceName}${method}${service}`
      );

      return (
        <div key={checkboxId} className="form-group form-check-bordered">
          <input
            type="checkbox"
            value={method}
            aria-label={`${removeAllSpecialChar(method)} api of ${service}`}
            id={checkboxId}
            name={checkboxId}
            className={`${service}-sub-checkbox`}
            onChange={() =>
              onChangeCheckBoxHandler(method, resourceName, service)
            }
            ref={(el) => {
              if (el && !serviceChildChkBoxRef.current.includes(el)) {
                serviceChildChkBoxRef.current.push(el);
              }
            }}
          />
          <label htmlFor={checkboxId}> {firstLetterCaps(method)}</label>
        </div>
      );
    });
  };

  // Render resources for a service
  const renderResources = (service: string, resources: any) => {
    return Object.entries(resources).map(([resourceName, httpMethods]) => (
      <ResourceFieldset
        key={resourceName}
        service={service}
        resourceName={resourceName}
        httpMethods={httpMethods}
        renderHttpMethodCheckboxes={renderHttpMethodCheckboxes}
      />
    ));
  };

  // Render the service header with checkbox
  const renderServiceHeader = (service: string, inputJSON: any) => {
    return (
      <div className="borderbtm">
        <div
          className="h6 font-bold font16 d-flex flex-row"
          id={`modalTitleAccountsLast-${service}`}
        >
          <div className="form-group form-check-bordered mb-0 pr-0">
            <label id={`${service}_label`} className="fontnormal">
              <input
                data-testid="selectall"
                type="checkbox"
                aria-label={`${service} Select All`}
                id={service}
                name={service}
                onChange={() => onChangeServiceCheckbox(service, inputJSON)}
                className="serviceChkBoxes"
                ref={(el) => {
                  if (el && !serviceChkBoxRef.current.includes(el)) {
                    serviceChkBoxRef.current.push(el);
                  }
                }}
              />
              &nbsp;
            </label>
          </div>
          <button
            type="button"
            id={`${service}_accordian_button`}
            className="btn btn-block p-0 text-left aui-accordion-btn"
            aria-label={`${service} accordian`}
            aria-controls={`createcreds${service}`}
            data-toggle="collapse"
            data-target={`#createcreds${service}`}
            aria-expanded="true"
          >
            {firstLetterCaps(service)}
            <i className="acc-btn-arrow aha-icon-arrow-down" />
          </button>
        </div>
      </div>
    );
  };

  // Render service content (collapsible part)
  const renderServiceContent = (service: string, inputJSON: any) => {
    return (
      <div
        id={`createcreds${service}`}
        role="region"
        aria-labelledby={`${service}_accordian_button`}
        data-parent="#accordionExample"
        className={`form-group row ${service}-checkboxes collapse show`}
      >
        {renderResources(service, inputJSON[service])}
      </div>
    );
  };

  // Render all services
  const renderServices = (inputJSON: any) => {
    return Object.keys(inputJSON).map((service) => (
      <React.Fragment key={service}>
        {renderServiceHeader(service, inputJSON)}
        {renderServiceContent(service, inputJSON)}
      </React.Fragment>
    ));
  };

  const renderAPIPermission = (inputJSON: any) => {
    return (
      <div className="aui-nav-accordion" id="categories">
        <div className="card mb-0">
          <div className="card-header" id="headingOneCategories">
            <div className="card-body pt-2 pb-0 px-sm-3 mx-2">
              <div className="accordion" id="accordionExample">
                {renderServices(inputJSON)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const onSubmit = (formData: any) => {
    if (isPermissionSelected()) {
      formData.permissions = permission;
    }

    formData.clientId = parseInt(
      formData.clientId === "select" ? 0 : formData.clientId,
      10
    );

    formData.name = formData.name.trim();
    if (
      loggedInUserObjectContext?.roleCode === CONSTANTS.USER_ROLES.CLIENT_ADMIN
    ) {
      formData.clientId = parseInt(loggedInUserObjectContext.clientId, 10);
    }
    AddCredentials(formData)
      .then(() => {
        store.dispatch(
          showToast({
            type: "success",
            title: "Success",
            message: "Credential created successfully",
          })
        );
        toggleModalStyles();
        setToggleModal(false);
        setToggleStatus(!toggleStatus);
        setImageLoading(true);
      })
      .catch((error) => {
        store.dispatch(
          showToast({
            type: "danger",
            title: "Error",
            message: getErrorMessage(error),
          })
        );
      })
      .finally(() => {
        setCredentialsData(defaultCredential);
        setPermission({});
        reset(defaultCredential, permission);

        serviceChkBoxRef.current.forEach((serviceChkEle: any) => {
          serviceChkEle.checked = false;
        });

        serviceChildChkBoxRef.current.forEach((serviceChildEle: any) => {
          serviceChildEle.checked = false;
        });
      });
  };

  useEffect(() => {
    // load Filter Data
    if (fetchPermission()("account.clients.get", "")) {
      getClientFilterRecords({
        pageSizeParam: CONSTANTS.MAX_RECORDS,
        pageNumParam: 1,
      });
    }
    setCredentialsData({
      ...credentialsData,
    });
  }, []);

  return (
    <CredentialsModalWrapper>
      {toggleModal ? (
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
            id="modal1"
            tabIndex={-1}
            aria-labelledby="CredentialModal"
            aria-label="Add Credentail Modal Window"
            aria-modal="true"
            role="dialog"
          >
            <div className="modal-dialog modal-md modal-dialog-centered">
              <div className="modal-content modalwidth px-3 py-3 p-sm-3">
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
                      setToggleModal(false);
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
                          className="d-block d-sm-none rotateInverse mb-2"
                          role="button"
                          tabIndex={0}
                          aria-label="Close"
                          onClick={() => {
                            toggleModalStyles();
                            setToggleModal(false);
                          }}
                          /* Sast issue fix */
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === "Spacebar") {
                              e.preventDefault();
                              toggleModalStyles();
                              setToggleModal(false);
                            }
                          }}
                        >
                          <i
                            className="aha-icon-right-arrow-thick"
                            data-dismiss="modal"
                          />
                        </span>
                        <h2
                          className="h6 mainHeading d-flex"
                          id="CredentialModal"
                          data-testid="test-title"
                        >
                          Add Credential
                          {loggedInUserObjectContext.roleLevel !== 0 && (
                            <span className="d-flex flex-row ml-1">
                              {" "}
                              <span className="d-block tenant-name">
                                - {loggedInUserObjectContext.clientName}
                              </span>
                            </span>
                          )}
                        </h2>
                      </div>
                    </div>
                    <p className="instruction">
                      {CONSTANTS.MODAL_INSTRUCTION_TEXT}
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="modal-body p-0">
                        <div className="navbar-expand-lg">
                          <fieldset
                            className="form-group row required pt-4 px-sm-3"
                            aria-labelledby="legendLabel"
                          >
                            <label
                              id="legendLabel"
                              htmlFor="checkbox"
                              className="col-sm-5 col-form-label"
                              aria-label="Select Channel"
                            >
                              Select Channel
                            </label>
                            <div
                              className="col-sm-6 d-flex justify-content-start pt-2"
                              role="radiogroup"
                            >
                              <div className="form-group form-radio mr-5 mb-0">
                                <input
                                  type="radio"
                                  name="channel"
                                  id="selectAPIChannel"
                                  value="API"
                                  ref={register}
                                  onChange={onChangeHandler}
                                  required
                                />
                                <label htmlFor="selectAPIChannel">API</label>
                              </div>
                              <div className="form-group form-radio mb-0">
                                <input
                                  type="radio"
                                  name="channel"
                                  id="selectNATSChannel"
                                  value="NATS"
                                  ref={register}
                                  onChange={onChangeHandler}
                                  required
                                />
                                <label htmlFor="selectNATSChannel">NATS</label>
                              </div>
                            </div>
                          </fieldset>
                          <div className="form-group row required mb-4 px-sm-3">
                            <label
                              className="col-sm-5 col-form-label tooltip-role"
                              htmlFor="Credential Name"
                              id="#Credential_Name"
                              aria-describedby="credential-tooltip"
                              aria-label="Credential Name"
                            >
                              Credential Name
                              <button
                                type="button"
                                className="noBtnStyle border-0 m-0"
                                aria-label="Credential Tooltip"
                                id="CredentialTooltip"
                              >
                                <i className=" aha-icon-alert red" />
                              </button>
                              <span
                                className="tooltiptext"
                                id="credential-tooltip"
                                aria-labelledby="#CredentialTooltip"
                                aria-live="polite"
                              >
                                Authentication token_when interacting with ADH
                                systems
                              </span>
                            </label>
                            <div className="col-sm-6">
                              <input
                                type="text"
                                className="form-control"
                                aria-label="Credential Name"
                                name="name"
                                required
                                ref={register}
                                onChange={onChangeHandler}
                              />
                            </div>
                          </div>
                          <div className="form-group row px-sm-3 mb-4">
                            <Restricted to="account.clients.get">
                              <label
                                htmlFor="selectClient"
                                className="col-sm-5 col-form-label"
                              >
                                Select Client
                              </label>
                              <div className="col-sm-6">
                                <select
                                  className="form-control"
                                  id="selectClient"
                                  ref={register}
                                  name="clientId"
                                  onClick={(e) => {
                                    dropDownToggler(e);
                                  }}
                                  onBlur={(e) => {
                                    dropDownDefaultState(e);
                                  }}
                                  onChange={onChangeHandler}
                                  defaultValue="select"
                                >
                                  <option value="select">Select</option>
                                  {clientsFilterData.map((item: any) => {
                                    return (
                                      <option key={item.id} value={item.id}>
                                        {item.name}
                                      </option>
                                    );
                                  })}
                                </select>
                                <i className="aha-icon-arrow-down forModal" />
                              </div>
                            </Restricted>
                          </div>
                        </div>
                      </div>
                      {renderAPIPermission(
                        JSON.parse(
                          localStorage.getItem("apiPermission") ?? "{}"
                        )
                      )}
                      <div className="modal-footer mt-0 pb-2 d-flex justify-content-center d-none d-sm-block">
                        <div className="btnbottom d-flex btnGrp-add justify-content-sm-end">
                          <button
                            type="button"
                            aria-label="cancel"
                            className="btn btn-round btn-secondary mr-4 btnwidth"
                            onClick={() => {
                              toggleModalStyles();
                              setToggleModal(false);
                              setImageLoading(true);
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            disabled={buttonDisabled}
                            type="submit"
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
                            disabled={buttonDisabled}
                            type="submit"
                            aria-label="save"
                            className="btn btn-round btn-primary btn-block btnwidth cursorpointer plus-icon p2 fxdbtn"
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
    </CredentialsModalWrapper>
  );
}
