/* eslint-disable import/no-named-as-default */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, {
  useContext,
  useEffect,
  useState,
  FunctionComponent,
  useCallback,
} from "react";
import Multiselect from "multiselect-react-dropdown";
import { Wrapper } from "styled";
import CredentialsModal from "components/CredentialsModal";
import { setHeaderTitleText } from "components/Header/header.slice";
import store from "app/store";
import RolePermissionsModal from "components/RolePermissionsModal";
import Restricted from "services/PermissionManager/Restricted";
import { toggleModalStyles } from "common/utils";
import PermissionContext from "services/PermissionManager/PermissionContext";
import CredentialsWrapperStyles from "./styled";

import CardList from "./CardList";
import useClientsList from "./hooks/clientsListHook";
import { resetAddCredetialsForm } from "./utils";

const CredentialsComp: FunctionComponent = (props: any) => {
  const [channelName, setChannelName] = useState<string>("");
  const [clientId, setClientId] = useState("");

  const { clients } = useClientsList(1);
  const [multiSelectCountClient, setMultiSelectCountClient] = useState("");
  const clientRef: any = React.createRef();

  const resetMultiSelectClient = () => {
    setClientId("");
    clientRef.current.resetSelectedValues();
    setMultiSelectCountClient("");
  };

  const handleChannelSelection = (event: any) => {
    const { value } = event.target;

    if (value && value === channelName) {
      const el = document.getElementsByClassName("api-text");
      Array.from(el).forEach((item) => item.classList.remove("api-text-focus"));
      const elm = document.getElementsByClassName("nats-text");
      Array.from(elm).forEach((item) =>
        item.classList.remove("nats-text-focus")
      );
      setChannelName("");
    } else {
      if (event.currentTarget.classList.contains("api-text")) {
        const el = document.getElementsByClassName("api-text");
        Array.from(el).forEach((item) => item.classList.add("api-text-focus"));
        const elm = document.getElementsByClassName("nats-text");
        Array.from(elm).forEach((item) =>
          item.classList.remove("nats-text-focus")
        );
      } else {
        const el = document.getElementsByClassName("nats-text");
        Array.from(el).forEach((item) => item.classList.add("nats-text-focus"));
        const elm = document.getElementsByClassName("api-text");
        Array.from(elm).forEach((item) =>
          item.classList.remove("api-text-focus")
        );
      }
      setChannelName(value);
    }
  };

  let prevScrollpos = window.scrollY;
  useEffect(() => {
    const el = document.getElementsByClassName("button-fixed");
    window.onscroll = () => {
      const currentScrollPos = window.scrollY;
      if (prevScrollpos > currentScrollPos) {
        Array.from(el).forEach((item) => {
          item.classList.remove("bottom-70");
          item.classList.add("bottom-0");
        });
      } else {
        Array.from(el).forEach((item) => {
          item.classList.remove("bottom-0");
          item.classList.add("bottom-70");
        });
      }

      prevScrollpos = currentScrollPos;
    };
  }, [prevScrollpos]);

  const formatSelectedItems = (selectedItems: any) => {
    return selectedItems
      .reduce((prev: any, curr: any) => [...prev, curr.id], [])
      .join(",");
  };

  const multiSelectCallBackClient = useCallback(
    (selectedList: any, removedItem: any) => {
      setClientId(formatSelectedItems(selectedList));
      if (selectedList.length === 0) {
        setMultiSelectCountClient("");
      } else if (selectedList.length === 1) {
        setMultiSelectCountClient(selectedList[0].name.trim());
      } else {
        setMultiSelectCountClient(`${selectedList.length} Selected`);
      }
    },
    []
  );
  const toggleFilter = (e: any) => {
    Array.from(document.querySelectorAll(".d-md-flex")).forEach((el) => {
      el.classList.toggle("d-none");
      e.currentTarget.childNodes[0].classList.toggle("filter-clicked");
      e.currentTarget.childNodes[1].classList.toggle("filter-clicked");
    });
  };

  useEffect(() => {
    store.dispatch(
      setHeaderTitleText({
        headerTitle: "",
      })
    );
  });

  const [editCredentialData, setEditCredentialData] = useState<any>({});
  const [checkBoxState, setCheckBoxState] = useState<any[]>([]);
  const [credentialName, setCredName] = useState<any>("");
  const [permission, setPermission] = useState({});
  const [toggleModal, setToggleModal] = useState(false);
  const [toggleStatus, setToggleStatus] = useState(false);
  const [toggleRolePermissionModal, setToggleRolePermissionModal] =
    useState(false);
  const { loggedInUserObjectContext } = useContext(PermissionContext);
  return (
    <Wrapper className="d-flex flex-column loader-baseWidth w-100">
      <CredentialsWrapperStyles>
        <div className="mt-4 m-sm-2 pl-lg-3 p-sm-2">
          <div className="container flex-grow-1 pl-3">
            <h1
              className="cred-heading"
              aria-label="Credentials"
              data-testid="test-client"
            >
              <span className="clientText">
                {loggedInUserObjectContext.clientName}
              </span>
              &nbsp;Credentials
            </h1>
            <div className="align-items-center d-flex justify-content-between mb-3 mt-3">
              <div className="d-flex align-items-center" role="tablist">
                <div className="pr-3">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={channelName === "API"}
                    className="font14 card-title-text api-text"
                    data-target="#data"
                    data-testid="apibutton"
                    onClick={handleChannelSelection}
                    value="API"
                  >
                    API
                  </button>
                </div>
                <div className="">
                  <button
                    type="button"
                    role="tab"
                    data-target="#data"
                    aria-selected={channelName === "NATS"}
                    className="font14 card-title-text nats-text"
                    data-testid="natsbutton"
                    onClick={handleChannelSelection}
                    value="NATS"
                  >
                    NATS
                  </button>
                </div>
              </div>
              <div className="d-none d-sm-flex">
                <button
                  type="button"
                  data-testid="credentialsPg_createCredentialBtn"
                  id="credentialsPg_createCredentialBtn"
                  className="btn btn-md btn-round btn-primary create-credentials"
                  onClick={() => {
                    toggleModal && resetAddCredetialsForm();
                    toggleModalStyles();
                    setToggleModal(true);
                  }}
                >
                  Create Credential
                </button>
              </div>
              <Restricted to="account.clients.get">
                <div
                  data-testid="filtertoggle"
                  className="ml-auto align-items-center show-filter"
                  onClick={toggleFilter}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === "Spacebar") {
                      e.preventDefault();
                      toggleFilter(e);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label="Toggle filter options"
                >
                  <i className="aha-icon-filter-outline" />
                  <p className="m-0 font14">Filter</p>
                </div>
              </Restricted>
            </div>
            <div className="flex-container justify-content-lg-start d-none d-md-flex d-sm-flex">
              <Restricted to="account.clients.get">
                <div
                  className={`clientFilterWrapper multiSelectContainer filter-width ${
                    multiSelectCountClient === "" ? "multiCntNone" : ""
                  }`}
                >
                  <label htmlFor="client_input">
                    <span className="superAdminCircle" /> Select Client
                  </label>
                  <p className="multiSelectCntWrapper">
                    <span className="multiSelectCnt">
                      {multiSelectCountClient}
                    </span>
                  </p>
                  <p className="clearMultiSelectWrapper">
                    <button
                      type="button"
                      className="clearMultiSelect noBtnStyle"
                      aria-label="Clear Button"
                      onClick={resetMultiSelectClient}
                    >
                      <i className="aha-icon-cancel-icon" />
                    </button>
                  </p>
                  <Multiselect
                    options={clients}
                    displayValue="name"
                    showCheckbox
                    placeholder="Select"
                    emptyRecordMsg="No Records"
                    id="client"
                    showArrow
                    avoidHighlightFirstOption
                    closeIcon="cancel"
                    onSelect={multiSelectCallBackClient}
                    onRemove={multiSelectCallBackClient}
                    ref={clientRef as React.LegacyRef<Multiselect>}
                    customArrow={<i className="aha-icon-arrow-down" />}
                  />
                </div>
              </Restricted>
            </div>

            <div id="data" className="cardwrapper">
              <CardList
                channelName={channelName}
                clientId={clientId}
                setEditCredentialData={setEditCredentialData}
                checkBoxState={checkBoxState}
                setCheckBoxState={setCheckBoxState}
                setCredName={setCredName}
                setPermission={setPermission}
                setToggleModal={setToggleModal}
                toggleModal={toggleModal}
                toggleStatus={toggleStatus}
                setToggleStatus={setToggleStatus}
                setToggleRolePermissionModal={setToggleRolePermissionModal}
              />
            </div>
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
        setCredName={setCredName}
        setToggleRolePermissionModal={setToggleRolePermissionModal}
        toggleRolePermissionModal={toggleRolePermissionModal}
        toggleStatus={toggleStatus}
        setToggleStatus={setToggleStatus}
      />
    </Wrapper>
  );
};

export default CredentialsComp;
