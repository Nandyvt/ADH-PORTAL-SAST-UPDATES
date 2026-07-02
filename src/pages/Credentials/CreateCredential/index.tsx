/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  AddEventListenerToElement,
  firstLetterCaps,
  getErrorMessage,
  removeAllSpecialChar,
} from "common/utils";
import { fetchPermission } from "services/PermissionManager/Types";
import CONSTANTS from "common/constants";
import { ClientListService } from "services/api/clients.api";
import store from "app/store";
import { showToast } from "components/Toast/toast.slice";
import PermissionContext from "services/PermissionManager/PermissionContext";
import { AddCredentials } from "services/api/credentials.api";
import Restricted from "services/PermissionManager/Restricted";
import { useNavigate } from "react-router-dom";
import {
  formatClientsData,
  mergeObjects,
  radioButtons,
  removeEmpty,
} from "./utils";
import { CreateCredentialWrapper } from "./style";
// Create credentials page

const CreateCredential = () => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [clientsFilterData, setClientsFilterData] = React.useState<any>([]);
  const { loggedInUserObjectContext } = useContext(PermissionContext);
  const clientsFilterRef: any = useRef(null);
  const checkboxRef: any = useRef(null);
  const [permission, setPermission] = useState<any>({});

  const [selectedClient, setSelectedClient] = React.useState<number>(0);
  const [credentialName, setCredentialName] = React.useState<string>("");
  const [checkBoxState, setCheckBoxState] = React.useState<any>({});
  const [toBeDeleted, setTobeDeleted] = useState<any>({});

  const navigate = useNavigate();
  const serviceChkBoxRef: any = useRef([]);
  serviceChkBoxRef.current = [];

  const serviceChildChkBoxRef: any = useRef([]);
  serviceChildChkBoxRef.current = [];

  async function getClientFilterRecords({ pageSizeParam, pageNumParam }: any) {
    try {
      const response = await ClientListService({
        pageSize: pageSizeParam,
        pageNumber: pageNumParam,
        isActive: "true",
      });

      setClientsFilterData(response?.data?.clients || []);
      return { ...response?._pagination };
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      store.dispatch(
        showToast({
          type: "danger",
          title: "Error Occurred",
          message: errorMessage,
        })
      );
    }
  }

  useEffect(() => {
    // load Filter Data
    if (fetchPermission()("account.clients.get", "")) {
      getClientFilterRecords({
        pageSizeParam: CONSTANTS.MAX_RECORDS,
        pageNumParam: 1,
      });
    }
  }, []);

  useEffect(() => {
    const allApiPermissions = JSON.parse(
      localStorage.getItem("apiPermission") ?? "{}"
    );

    if (Object.keys(permission).length > 0) {
      Object.keys(allApiPermissions).forEach((service) => {
        const childCheckboxes: any = Array.from(
          document.querySelectorAll(`[checkboxid^="child-${service}"]`)
        );
        const parentCheckBox: any = document.querySelector(
          `[id^="parent-${service}-checkbox"]`
        );
        if (parentCheckBox) {
          let allChecked = true;
          for (let i = 0; i < childCheckboxes.length; i += 1) {
            if (!childCheckboxes[i].value) {
              allChecked = false;
              break;
            }
          }
          parentCheckBox.checked = allChecked;
        }
      });
    }
  }, [permission]);

  const isPermissionSelected = () => {
    return (
      JSON.stringify(permission).search(/"get"|"post"|"patch"|"delete"/) > -1
    );
  };

  const handleSubmitForm = async (event: any) => {
    const formData = {
      channel: CONSTANTS.FORM_PAYLOAD_API_CHANNEL,
      name: credentialName.trim(),
      clientId: selectedClient,
      permissions: removeEmpty(permission),
    };
    if (
      loggedInUserObjectContext?.roleCode === CONSTANTS.USER_ROLES.CLIENT_ADMIN
    ) {
      formData.clientId = parseInt(loggedInUserObjectContext.clientId, 10);
    }
    try {
      await AddCredentials(formData);
      store.dispatch(
        showToast({
          type: "success",
          title: "Success",
          message: "Credential created successfully",
        })
      );
      navigate("/credentials");
    } catch (error) {
      store.dispatch(
        showToast({
          type: "danger",
          title: "Error",
          message: getErrorMessage(error),
        })
      );
    }
  };

  const handleCredentialsOnChange = (event: any) => {
    setCredentialName(event.target.value);
  };

  /** save button enable/disable */
  useEffect(() => {
    const commonCheck = credentialName && isPermissionSelected();

    if (commonCheck) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [credentialName, permission]);

  const parentCheckboxHandler = (event: any) => {
    const service = event.target.id.split("-")[1];
    const childCheckboxes: any = Array.from(
      document.querySelectorAll(`[checkboxid^="child-${service}"]`)
    );
    const map = new Map();

    childCheckboxes.forEach((child: any) => {
      const childSplitArr = child.checkboxid.split("-");
      const method = childSplitArr[2];
      const endpoint = childSplitArr[3];
      child.value = event.target.checked;
      if (event.target.checked) {
        if (map.has(service)) {
          const serviceData = map.get(service);
          if (serviceData[endpoint]) {
            serviceData[endpoint].push(method);
          } else {
            serviceData[endpoint] = [method];
          }
        } else {
          map.set(service, { [endpoint]: [method] });
        }
        setTobeDeleted({});
      } else {
        setTobeDeleted({ [service]: {} });
      }
    });
    setCheckBoxState(Object.fromEntries(Array.from(map.entries())));
  };

  const renderAPIPermission = (inputJSON: any) => {
    return (
      <div className="aui-nav-accordion" id="categories">
        <div className="card mb-0">
          <div className="card-header" id="headingOneCategories">
            <div className="card-body pt-2 pb-0 ml-1">
              <div className="accordion" id="accordionExample">
                {Object.keys(inputJSON).map((service) => {
                  return (
                    <>
                      <div className="borderbtm col-lg-8 px-0">
                        <div
                          className="h6 font-bold font16 d-flex flex-row "
                          id={`modalTitleAccountsLast-${service}`}
                        >
                          <div className="form-group form-check-bordered mb-0 pr-0">
                            <input
                              data-testid="selectall"
                              type="checkbox"
                              aria-label={`${service} Select All`}
                              id={`parent-${service}-checkbox`}
                              name={`parent-${service}-checkbox`}
                              className="serviceChkBoxes"
                              ref={serviceChkBoxRef}
                              onChange={parentCheckboxHandler}
                            />
                            <label
                              htmlFor={`parent-${service}-checkbox`}
                              id={`parent-${service}-checkbox-label`}
                              className="fontnormal parent-checkbox"
                            >
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
                      <div
                        id={`createcreds${service}`}
                        role="region"
                        aria-labelledby={`${service}_accordian_button`}
                        data-parent="#accordionExample"
                        className={`col-lg-10 px-lg-3 form-group row ${service}-checkboxes collapse show `}
                      >
                        {Object.entries(inputJSON[service]).map(
                          (resource): any => {
                            return (
                              <fieldset
                                className="col-12 d-md-flex m-0 p-0 spacing-httpmethods"
                                aria-labelledby={removeAllSpecialChar(
                                  `${resource[0]}-label-${service}` as string
                                )}
                                key={removeAllSpecialChar(
                                  `${resource[0]}-label-${service}` as string
                                )}
                              >
                                <label
                                  htmlFor="checkbox"
                                  key={resource[0]}
                                  className="col-sm-12 col-md-4 col-form-label px-0"
                                  id={removeAllSpecialChar(
                                    `${resource[0]}-label-${service}` as string
                                  )}
                                >
                                  {resource[0]}
                                </label>
                                <div className="col-12 col-md-8 col-sm-12 col-lg-6 px-0 alignCheckboxes d-sm-flex d-flex flex-wrap justify-content-start pt-2 pos-relative">
                                  {Object.values(
                                    inputJSON[service][resource[0]]
                                  ).map((httpMethods): any => {
                                    return (
                                      <div
                                        className={`form-group col-4 col-sm-3 ${httpMethods}-cls`}
                                        key={`${resource[0]}-${httpMethods}-${service}`}
                                      >
                                        <aui-checkbox
                                          checkboxid={`child-${service}-${httpMethods}-${resource[0]}`}
                                          label={firstLetterCaps(
                                            httpMethods as string
                                          )}
                                          ref={checkboxRef}
                                        />
                                      </div>
                                    );
                                  })}
                                </div>
                              </fieldset>
                            );
                          }
                        )}
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const handleSelectClientFilterChange = async (e: any) => {
    const client = await clientsFilterRef.current?.getCurrentValue();
    setSelectedClient(client?.value?.length === 0 ? 0 : client?.value);
  };

  AddEventListenerToElement(
    document.querySelector("aui-dropdown"),
    "auiDropdownChange",
    handleSelectClientFilterChange
  );

  useEffect(() => {
    const handleChildAuiCheckboxChange = async (event: any) => {
      const splitArray = event.detail.id.split("-");
      const service = splitArray[1];
      const endpoint = splitArray[3];
      const method = splitArray[2];
      if (event.detail.value) {
        setTobeDeleted({});
      } else {
        setTobeDeleted({
          [service]: { [endpoint]: [method] },
        });
      }
      setCheckBoxState({
        [service]: { [endpoint]: [method] },
      });
    };

    const childCheckboxes: any = Array.from(
      document.querySelectorAll(`[checkboxid^="child-"]`)
    );
    childCheckboxes.forEach((checkbox: any) => {
      checkbox?.addEventListener(
        "auiCheckboxChange",
        handleChildAuiCheckboxChange
      );
    });
    return () =>
      childCheckboxes.forEach((checkbox: any) => {
        checkbox?.removeEventListener(
          "auiCheckboxChange",
          handleChildAuiCheckboxChange
        );
      });
  }, []);

  useEffect(() => {
    setPermission((prev: any) => {
      return mergeObjects(prev, checkBoxState, toBeDeleted);
    });
  }, [checkBoxState]);

  return (
    <CreateCredentialWrapper>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="title-border mt-4">
              <h1 className="header-title">
                {CONSTANTS.CREATE_CREDENTIALS_HEADING}
              </h1>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="mt-2 mb-4-bkp">
              <p className="note m-0">
                Field marked with an asterisk (*) are mandatory
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <form>
              <div>
                <div className="form-group row required my-4 row-gap-24">
                  <div className="col-sm-6 col-lg-4 col-md-6">
                    <label
                      className="col-form-label tooltip-role"
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
                        <i className=" aha-icon-alert" />
                      </button>
                      <span
                        className="tooltiptext"
                        id="credential-tooltip"
                        aria-labelledby="#CredentialTooltip"
                        aria-live="polite"
                      >
                        Authentication token_when interacting with ADH systems
                      </span>
                    </label>
                    <input
                      type="text"
                      className="form-control credential-name"
                      aria-label="Credential Name"
                      name="name"
                      required
                      onChange={handleCredentialsOnChange}
                      placeholder="Enter Credential Name"
                    />
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6 mt-lg-0 mt-md-0 ">
                    <Restricted to="account.clients.get">
                      <aui-dropdown
                        options={JSON.stringify(
                          formatClientsData(clientsFilterData)
                        )}
                        dropdownid="selectClient"
                        className="form-control"
                        aria-label="Select Client"
                        ref={clientsFilterRef}
                        clearable
                        direction="column"
                        label="Select Client"
                        placeholder="Select Client"
                      />
                    </Restricted>
                  </div>
                </div>
              </div>
              {renderAPIPermission(
                JSON.parse(localStorage.getItem("apiPermission") ?? "{}")
              )}
              <div className="row">
                <div className="col-lg-8 col-sm-12 ">
                  <div className="align-items-center btnbottom d-flex justify-content-end mt-3">
                    <aui-button
                      variant="link-style"
                      buttontitle="Cancel"
                      buttonclass="p-0 mr-4"
                      size="medium"
                      onClick={(e: any) => {
                        e.preventDefault();
                        setSelectedClient(0);
                        setButtonDisabled(true);
                        setCredentialName("");
                        setPermission({});
                        setTobeDeleted({});
                        setCheckBoxState({});

                        navigate("/credentials");
                      }}
                    />
                    <aui-button
                      buttonid="createCredential"
                      aria-label="Create Credential"
                      aria-describedby="createCredential"
                      aria-live="polite"
                      aria-atomic="true"
                      variant="primary"
                      size="medium"
                      buttontitle="Create"
                      onClick={(e: any) => {
                        return !buttonDisabled
                          ? handleSubmitForm(e)
                          : undefined;
                      }}
                      disabled={buttonDisabled}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </CreateCredentialWrapper>
  );
};

export default CreateCredential;
