import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Wrapper } from "styled";
import PermissionContext from "services/PermissionManager/PermissionContext";
import CredentialsModal from "components/CredentialsModal";
import {
  formatOptionsForMultiSelectFilter,
  getErrorMessage,
  passAuiObject,
  removeAllSpecialChar,
  toggleServiceCheckboxForAllHttpCheckBoxes,
} from "common/utils";
import RolePermissionsModal from "components/RolePermissionsModal";
import store from "app/store";
import { showToast } from "components/Toast/toast.slice";
import { EditCredentialGet } from "services/api/credentials.api";
import { useNavigate } from "react-router-dom";
import { useWindowDimensionOnPageResize } from "pages/_layouts/componentUtil";
import Chips from "components/Chips";
import CONSTANTS from "common/constants";
import CredentialsWrapperStyles from "./styled";
import { CredentialsFilters } from "./Filters";
import useClientsList from "./hooks/clientsListHook";
import useCredentialsList, { ICreds } from "./hooks/credentialsHook";
import CredentialsCard from "./Card/Card";
import CredentialsFiltersMobile from "./Filters/CredentialsFiltersMobile";
import { channelFilterOptions, statusFilterOptions } from "./Filters/util";

const Credentials: FunctionComponent = (prop: any) => {
  const { loggedInUserObjectContext } = useContext(PermissionContext);
  const [selectedClients, setSelectedClients] = React.useState<any>([]);
  const [status, setStatus] = React.useState<string>("");
  const [channelName, setChannelName] = React.useState<string>("");
  const [pageNumber, setPageNumber] = React.useState<number>(1);
  const [clientId, setClientId] = React.useState<string>("");
  const [credentialsList, setCredentialsList] = React.useState<ICreds>([]);
  const [toggleStatus, setToggleStatus] = React.useState<boolean>(false);
  const [toggleModal, setToggleModal] = React.useState<boolean>(false);
  //
  const [editCredentialData, setEditCredentialData] = React.useState<any>({});
  const [permission, setPermission] = React.useState({});
  const [checkBoxState, setCheckBoxState] = React.useState<any[]>([]);
  const [credentialName, setCredentialName] = React.useState<string>("");

  // mobile filter modal
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const zoomedWindowWidth = useWindowDimensionOnPageResize();
  const [appliedFilters, setAppliedFilters] = useState<any>({});

  // setToggleRolePermissionModal
  const [toggleRolePermissionModal, setToggleRolePermissionModal] =
    React.useState(false);
  const navigate = useNavigate();

  const { clients } = useClientsList(1);

  const { credentials, error, loading, hasMore } = useCredentialsList(
    pageNumber,
    CONSTANTS?.FORM_PAYLOAD_API_CHANNEL,
    clientId,
    status,
    toggleStatus
  );
  /* start */
  // Helper to process a single resource's HTTP methods
  const flattenResourceMethods = (
    service: string,
    resourceName: string,
    httpMethodsObj: any
  ): string[] => {
    return Object.values(httpMethodsObj).map((httpMethod: any) => {
      return removeAllSpecialChar(resourceName + httpMethod + service);
    });
  };

  // Helper to process a single service's data
  const flattenServiceData = (service: string, serviceData: any): string[] => {
    return Object.entries(serviceData).flatMap(
      ([resourceName, httpMethodsObj]: [string, any]) => {
        return flattenResourceMethods(service, resourceName, httpMethodsObj);
      }
    );
  };

  // Helper function to process API permissions and flatten the nested structure
  const processApiPermissions = (apiPermissions: any): string[] => {
    if (!apiPermissions) return [];

    // Flatten all services, resources, and methods into a single array of checkbox IDs
    return Object.entries(apiPermissions).flatMap(
      ([service, serviceData]: [string, any]) => {
        return flattenServiceData(service, serviceData);
      }
    );
  };

  const fetchEditPermissionCred = useCallback(
    (credentialId: any) => {
      EditCredentialGet(credentialId)
        .then((response) => {
          if (response.data.credential === null) {
            setEditCredentialData({});
            return;
          }

          // Handle successful response with data
          const { credential } = response.data;
          const apiRespData = credential?.apiPermissions;

          setEditCredentialData(credential);
          setPermission(apiRespData);

          // Early return if no API permissions
          if (!apiRespData) return;

          // Process API permissions outside of nested loops
          const prePopulateArr = processApiPermissions(apiRespData);

          // Update state
          setCheckBoxState([...checkBoxState, ...prePopulateArr]);

          // Toggle service checkboxes
          Object.keys(apiRespData).forEach((service: string) => {
            toggleServiceCheckboxForAllHttpCheckBoxes(
              `editCred_${service}`,
              "borderbtm"
            );
          });
        })
        .catch((err) => {
          store.dispatch(
            showToast({
              type: "danger",
              title: "Error Occurred",
              message: getErrorMessage(err),
            })
          );
        });
    },
    [checkBoxState]
  );
  /* end */

  useEffect(() => {
    setCredentialsList(credentials);
  }, [credentials]);

  useEffect(() => {
    setPageNumber(1);
  }, [clientId, status]);

  useEffect(() => {
    if (
      Object.prototype.hasOwnProperty.call(appliedFilters, "dropdownFilters") &&
      Object.keys(appliedFilters.dropdownFilters).length > 0
    ) {
      appliedFilters.dropdownFilters.forEach((item: any) => {
        if (item.id === "dropdown-status-filter") {
          setStatus(item.data[0].value);
        }
      });
    }
    if (
      Object.prototype.hasOwnProperty.call(
        appliedFilters,
        "multiSelectDropdownFilters"
      ) &&
      Object.keys(appliedFilters.multiSelectDropdownFilters).length > 0
    ) {
      setSelectedClients(appliedFilters.multiSelectDropdownFilters[0].data);
      const clientList = appliedFilters.multiSelectDropdownFilters[0].data
        .map((item: any) => item.value)
        .join(",");
      setClientId(clientList);
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
      { label: "Status", value: status, id: "dropdown-status-filter" },
      { label: "Channel", value: channelName, id: "dropdown-channel-filter" },
      {
        label: "Clients",
        value: selectedClients.map((item: any) => item.label).join(","),
        id: "multiSelect-dropdown-client-filter",
      },
    ];

    // Set the updated chipDataArray
    setChipDataArray(updatedChipDataArray);
    if (channelName || status || selectedClients.length > 0) {
      setShowClearAll(true);
    } else {
      setShowClearAll(false);
    }
    setClientId(selectedClients.map((item: any) => item.value).join(","));
  }, [status, channelName, selectedClients]);

  useEffect(() => {
    if (Object.keys(clearChipData).length > 0) {
      if (clearChipData.id === "dropdown-status-filter") {
        setStatus("");
      }
      if (clearChipData.id === "dropdown-channel-filter") {
        setChannelName("");
      }
      if (clearChipData.id === "multiSelect-dropdown-client-filter") {
        setSelectedClients([]);
      }
    }
  }, [clearChipData]);

  return (
    <Wrapper className="d-flex flex-column loader-baseWidth w-100">
      <CredentialsWrapperStyles>
        <div className="mt-4">
          <div className="container flex-grow-1 px-3 mx-45">
            <div className="align-items-center border-bottom justify-content-between justify-content-center no-gutters row">
              <h1
                className="cred-heading row no-gutters m-0 col-lg-6 col-sm-6 col-md-6"
                aria-label="Credentials"
                data-testid="test-client"
              >
                {loggedInUserObjectContext.clientName ? (
                  <span
                    className="clientText cred-heading"
                    title={loggedInUserObjectContext.clientName || ""}
                  >
                    {loggedInUserObjectContext.clientName}
                  </span>
                ) : undefined}

                <span className="credential-span">Credentials</span>
              </h1>
              <div className="col-lg-6 col-md-6 col-sm-6 d-flex justify-content-end">
                <div className="create-btn-sm">
                  <aui-button
                    type="button"
                    id="create-credentials-button"
                    data-testid="create-credentials-button"
                    variant="link-style-arrow"
                    buttontitle={CONSTANTS.CREATE_CREDENTIALS_HEADING}
                    onClick={(e: any) => {
                      e.preventDefault();
                      navigate("/credentials/create");
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="align-items-center d-flex credFilterSec">
              <div
                data-testid="filtertoggle"
                className={`d-lg-none d-md-none d-sm-none justify-content-end ml-auto mt-3 show-filter ${
                  showClearAll ? "bg-selected" : ""
                }`}
              >
                <button
                  type="button"
                  className="align-items-center d-flex font14 justify-content-center m-0 noBtnStyle pr-0"
                  onClick={() => {
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
                      setStatus("");
                      setChannelName("");
                      setSelectedClients([]);
                    }}
                  >
                    <img src="./images/clear-all-icon.svg" alt="filterIcon" />
                  </button>
                ) : null}
              </div>
            </div>
            {+zoomedWindowWidth < 576 ? (
              <CredentialsFiltersMobile
                clients={clients}
                filters={[
                  {
                    type: "multiSelectDropdown",
                    filterParams: {
                      id: "clients-multiselect",
                      placeholder: "Select Client",
                      label: "Select Client",
                      name: "Select Client",
                      labelgrid: "col-sm-3",
                      dropdowngrid: "col-sm-9",
                      direction: "column",
                      show:
                        loggedInUserObjectContext?.roleCode ===
                        CONSTANTS.USER_ROLES.SUPER_ADMIN,
                      options: passAuiObject(
                        formatOptionsForMultiSelectFilter(clients)
                      ),
                      restricted: "account.clients.get",
                      searchable: true,
                      iconbackground: true,
                      value: JSON.stringify(selectedClients),
                    },
                  },
                  {
                    type: "dropdown",
                    filterParams: {
                      id: "status-filter",
                      placeholder: "Select Status",
                      label: "Select Status",
                      name: "Select Status",
                      labelgrid: "col-sm-3",
                      dropdowngrid: "col-sm-9",
                      direction: "column",
                      options: passAuiObject(statusFilterOptions),
                      value: passAuiObject({ label: status, value: status }),
                      clearable: false,
                      iconbackground: true,
                    },
                  },
                  {
                    type: "dropdown",
                    filterParams: {
                      id: "channel-filter",
                      placeholder: "Select Channel",
                      label: "Select Channel",
                      name: "Select Channel",
                      labelgrid: "col-sm-3",
                      dropdowngrid: "col-sm-9",
                      direction: "column",
                      options: passAuiObject(channelFilterOptions),
                      value: passAuiObject({
                        label: channelName,
                        value: channelName,
                      }),
                      clearable: false,
                      iconbackground: true,
                    },
                  },
                ]}
                showModal={showModal}
                setShowModal={setShowModal}
                setAppliedFilters={setAppliedFilters}
                appliedFilters={appliedFilters}
              />
            ) : (
              <div className="row justify-content-start d-md-flex d-sm-flex">
                <CredentialsFilters
                  clearAllFilters={false}
                  setChannelName={setChannelName}
                  setStatus={setStatus}
                  status={status}
                  setSelectedClients={setSelectedClients}
                  clients={clients}
                  clientName={loggedInUserObjectContext.clientName}
                />
              </div>
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

            <CredentialsCard
              loading={loading}
              error={error}
              hasMore={hasMore}
              setPageNumber={setPageNumber}
              credentials={credentialsList}
              toggleStatus={toggleStatus}
              setToggleStatus={setToggleStatus}
              setCredentialName={setCredentialName}
              fetchEditPermissionCred={fetchEditPermissionCred}
              setToggleRolePermissionModal={setToggleRolePermissionModal}
              toggleModal={toggleModal}
              setToggleModal={setToggleModal}
            />
          </div>
        </div>
      </CredentialsWrapperStyles>
      <CredentialsModal
        setToggleModal={setToggleModal}
        toggleModal={toggleModal}
        toggleStatus={toggleStatus}
        setToggleStatus={setToggleStatus}
      />
      <RolePermissionsModal
        editCredentialData={editCredentialData}
        checkBoxState={checkBoxState}
        setCheckBoxState={setCheckBoxState}
        credentialName={credentialName}
        setPermission={setPermission}
        permission={permission}
        setCredName={setCredentialName}
        setToggleRolePermissionModal={setToggleRolePermissionModal}
        toggleRolePermissionModal={toggleRolePermissionModal}
        toggleStatus={toggleStatus}
        setToggleStatus={setToggleStatus}
      />
    </Wrapper>
  );
};

export default Credentials;
