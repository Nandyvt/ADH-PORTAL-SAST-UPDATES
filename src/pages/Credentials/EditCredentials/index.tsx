/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from "react";
import { isEqual } from "lodash";
import { useParams, useNavigate } from "react-router-dom";
import {
  EditCredentialGet,
  EditCredentialPatch,
} from "services/api/credentials.api";
import { getErrorMessage } from "common/utils";
import store from "app/store";
import { showToast } from "components/Toast/toast.slice";
import CONSTANTS from "common/constants";
import { EditCredentialsParam } from "./util";
import { EditCredentialsWrapper } from "./style";
import ParentCheckboxes from "./ParentCheckboxes";

const EditCredentials = () => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [credentialName, setCredentialName] = React.useState<string>("");

  const [, setCredentialData] = React.useState<any>({});

  const [permissions, setPermissions] = useState<any>({});
  const [defaultSelectedPermission, setDefaultSelectedPermission] =
    useState<any>({});
  const [apiCredentialName, setApiCredentialName] = useState<any>("");
  const [, setApiChannel] = useState<any>("");

  const [tobeDeleted, setTobeDeleted] = useState<any>({});

  const [allPermssions] = useState<any>(
    JSON.parse(localStorage.getItem("apiPermission") ?? "{}")
  );

  const navigate = useNavigate();
  const { id } = useParams<EditCredentialsParam>();
  const handleCredentialsOnChange = (event: any) => {
    setCredentialName(event.target.value);
  };

  useEffect(() => {
    if (id) {
      EditCredentialGet(Number(id)).then((response: any) => {
        setCredentialData(response.data.credential);
        setDefaultSelectedPermission(response.data.credential?.apiPermissions);
        setApiCredentialName(response.data.credential?.name);
        setApiChannel(response.data.credential?.channel);
      });
    }
  }, []);
  const isPermissionSelected = () => {
    return (
      JSON.stringify(permissions).search(/"get"|"post"|"patch"|"delete"/) > -1
    );
  };

  useEffect(() => {
    // common check if any permission is selected or credential name is changed or channel is changed use apiChannel and apiCredentialName to check
    const commonCheck =
      (!isEqual(credentialName, apiCredentialName) && credentialName) ||
      (!isEqual(permissions, defaultSelectedPermission) &&
        isPermissionSelected());

    if (commonCheck) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [credentialName, permissions]);

  useEffect(() => {
    apiCredentialName
      ? setCredentialName(apiCredentialName)
      : setCredentialName("");
  }, [apiCredentialName]);

  // handle submit form
  const handleSubmitForm = async () => {
    try {
      await EditCredentialPatch(id, {
        name: credentialName.trim(),
        channel: CONSTANTS.FORM_PAYLOAD_API_CHANNEL,
        permissions,
      });

      store.dispatch(
        showToast({
          type: "success",
          title: "Success",
          message: "Credential Edited Successfully",
        })
      );

      navigate("/credentials");
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
  };

  return (
    <EditCredentialsWrapper>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="title-border mt-4">
              <h1 className="header-title">
                {CONSTANTS.EDIT_CREDENTIAL_PERMISSION_HEADING}
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
                      value={credentialName || ""}
                    />
                  </div>
                </div>
              </div>
              <ParentCheckboxes
                setPermissions={setPermissions}
                permissions={permissions}
                allPermssions={allPermssions}
                setTobeDeleted={setTobeDeleted}
                tobeDeleted={tobeDeleted}
                defaultSelectedPermission={defaultSelectedPermission}
              />
              <div className="row">
                <div className="col-lg-8 col-sm-12 ">
                  <div className="align-items-center btnbottom d-flex justify-content-end mt-3">
                    <aui-button
                      variant="link-style"
                      buttonclass="p-0 mr-4"
                      buttontitle="Cancel"
                      size="medium"
                      onClick={() => {
                        navigate("/credentials");
                      }}
                    />
                    <aui-button
                      id="update-permission"
                      aria-label="update permission"
                      aria-describedby="Update"
                      aria-live="polite"
                      aria-atomic="true"
                      variant="primary"
                      size="medium"
                      buttontitle="Update"
                      onClick={(e: any) => {
                        return !buttonDisabled ? handleSubmitForm() : undefined;
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
    </EditCredentialsWrapper>
  );
};

export default EditCredentials;
