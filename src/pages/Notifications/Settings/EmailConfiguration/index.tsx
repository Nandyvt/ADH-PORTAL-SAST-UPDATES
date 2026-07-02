/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import {
  addEmailConfigService,
  GetServiceProviderEmailAPI,
  patchEmailConfigService,
} from "services/api/notification.api";
import store from "app/store";
import { showToast } from "components/Toast/toast.slice";
import PermissionContext from "services/PermissionManager/PermissionContext";
import { getErrorMessage } from "common/utils";
import EmailConfigureWrapper from "./styled";

export interface IEmailConfig {
  provider: string;
  domain: string;
  privateKey: string;
}

const EmailConfigure: React.FunctionComponent<any> = ({
  setTabViewState,
  tabView,
  apiStatus,
  setApiStatus,
  GetClientConfigEmail,
  emailClientConfig,
  setLoading,
}: any) => {
  const UIEmailconfigureSchema = yup.object().shape({
    provider: yup.string().required("Service Provider is Required"),
    domain: yup.string().required("Domain is Required"),
    privateKey: yup.string().required("API Key is Required"),
  });

  const [showInputFields, setshowInputFields] = useState<boolean>(false);

  const [dropDownOne, setDropDownOne] = useState(false);

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(UIEmailconfigureSchema),
  });

  const shouldEnableSubmitButton = (data: IEmailConfig) => {
    const { provider, domain, privateKey } = data;
    if (provider && domain && privateKey) {
      return false;
    }
    return true;
  };

  const [emailconfigData, setEmailconfigData] = useState<IEmailConfig>({
    provider: "",
    domain: "",
    privateKey: "",
  });

  const [emailServiceProviderData, setEmailServiceProviderData] = useState<any>(
    []
  );
  const { loggedInUserObjectContext } = useContext(PermissionContext);

  const submitForm = (formData: any) => {
    const CreateServProviderVal = document.querySelector<any>(
      "#createServiceProvider"
    ).value;
    formData.provider = document.querySelector<any>(
      "#createServiceProvider"
    )?.selectedOptions[0].text;
    const formDataApiCall = {
      clientId: parseInt(loggedInUserObjectContext.clientId, 10),
      config: formData,
      serviceProviderId: Number(CreateServProviderVal),
    };
    setLoading(true);
    addEmailConfigService(formDataApiCall)
      .then((response: any) => {
        if (response.status === 200) {
          store.dispatch(
            showToast({
              type: "success",
              title: "Success",
              message: "Email Configured Successfully",
            })
          );
          setApiStatus("config");
        }
      })
      .catch((error) => {
        store.dispatch(
          showToast({
            title: "Error Occured.",
            message: getErrorMessage(error),
          })
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const submitEditForm = (formData: any) => {
    const { id } = emailClientConfig[0];
    const servProviderVal =
      document.querySelector<any>("#serviceProvider").value;
    formData.provider =
      document.querySelector<any>("#serviceProvider")?.selectedOptions[0].text;
    const formDataApiCall = {
      clientId: parseInt(loggedInUserObjectContext.clientId, 10),
      config: formData,
      serviceProviderId: Number(servProviderVal),
    };
    setLoading(true);
    patchEmailConfigService(id, formDataApiCall)
      .then((response: any) => {
        if (response.status === 200) {
          store.dispatch(
            showToast({
              type: "success",
              title: "Success",
              message: "Email Configured Successfully",
            })
          );
        }
      })
      .catch((error) => {
        store.dispatch(
          showToast({
            title: "Error Occured.",
            message: getErrorMessage(error),
          })
        );
      })
      .finally(() => {
        setApiStatus("config");
        setLoading(false);
      });
  };

  const GetServiceProviderEmail = () => {
    GetServiceProviderEmailAPI()
      .then((response: any) => {
        if (response && response.data?.serviceProviders === null) {
          setEmailServiceProviderData([]);
        } else {
          setEmailServiceProviderData(response.data.serviceProviders);
        }
        return { ...response._pagination };
      })
      .catch((error) => {
        store.dispatch(
          showToast({
            type: "danger",
            title: "Error Occured",
            message: getErrorMessage(error),
          })
        );
      })
      .finally(() => {});
  };

  useEffect(() => {
    setButtonDisabled(shouldEnableSubmitButton(emailconfigData));

    // check for edit scenario

    apiStatus === "edit" &&
      (document.querySelector<any>("#serviceProvider").value =
        emailClientConfig[0]?.serviceProviderId);
  }, [emailconfigData]);
  useEffect(() => {
    // api Call for Service Provider
    GetServiceProviderEmail();
  }, []);

  useEffect(() => {
    if (apiStatus === "edit") {
      GetClientConfigEmail();
      setEmailconfigData({
        ...emailconfigData,
        provider: emailClientConfig[0]?.config.provider,
        domain: emailClientConfig[0]?.config.domain,
        privateKey: emailClientConfig[0]?.config.privateKey,
      });
    }
  }, [apiStatus]);

  const [prependLabelValue, setPrependLabelValue] = useState<string>("");

  const [editSelect, setEditSelect] = useState(
    emailClientConfig[0]?.serviceProviderId
  );
  const [createSelect, setCreateSelect] = useState("");

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    if (name === "provider" && value !== "") {
      setPrependLabelValue(event.target.selectedOptions[0].text);
      setshowInputFields(true);
      if (event.target.id === "createServiceProvider") {
        setCreateSelect(value);
      } else {
        setEditSelect(value);
      }
    }
    setEmailconfigData({ ...emailconfigData, [name]: value });
  };

  return (
    <EmailConfigureWrapper className="mb-sm-9 pb-sm-4">
      <div className="d-flex align-items-center justify-content-start alignContent mt-5">
        <div className="col-md-12 col-lg-8">
          {apiStatus === "post" && (
            // For Post component
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="form-group row required">
                <label
                  htmlFor="createServiceProvider"
                  className="col-md-4 col-form-label aui-label"
                >
                  Service Provider
                </label>

                <div className="col-md-8">
                  <select
                    className="form-control dropdown"
                    id="createServiceProvider"
                    value={createSelect}
                    ref={register}
                    onChange={handleChange}
                    onClick={() => {
                      setDropDownOne(!dropDownOne);
                    }}
                    onBlur={() => {
                      setDropDownOne(false);
                    }}
                    name="provider"
                    required
                  >
                    <option value="" disabled>
                      Select
                    </option>

                    {emailServiceProviderData.map((item: any) => {
                      return (
                        <option
                          key={`createConfig_${item.code}_${item.id}`}
                          value={item.id}
                        >
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                  <i
                    className={
                      dropDownOne
                        ? "aha-icon-arrow-down forModal rotate"
                        : "aha-icon-arrow-down forModal"
                    }
                  />
                </div>
              </div>

              {showInputFields && (
                <>
                  <div className="form-group row required">
                    <label htmlFor="domain" className="col-md-4 col-form-label">
                      {prependLabelValue} Domain
                    </label>
                    <div className="col-md-8">
                      <input
                        type="text"
                        name="domain"
                        id="domain"
                        className="form-control"
                        defaultValue=""
                        ref={register}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row required">
                    <label
                      htmlFor="privateKey"
                      className="col-md-4 col-form-label"
                    >
                      {prependLabelValue} API Key
                    </label>
                    <div className="col-md-8">
                      <input
                        type="text"
                        name="privateKey"
                        id="privateKey"
                        className="form-control"
                        defaultValue=""
                        ref={register}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-round btn-secondary mr-4 btnwidth cancel-btn"
                  onClick={() => {
                    setTabViewState(tabView.NC);
                    setApiStatus("");
                  }}
                >
                  Cancel
                </button>
                <button
                  disabled={buttonDisabled}
                  type="submit"
                  className="btn btn-round btn-primary btnwidth save-btn"
                >
                  Save
                </button>
              </div>
            </form>
          )}
          {apiStatus === "edit" && (
            // For Edit Component
            <form onSubmit={handleSubmit(submitEditForm)}>
              <div className="form-group row required">
                <label
                  htmlFor="serviceProvider"
                  className="col-md-4 col-form-label aui-label"
                >
                  Service Provider
                </label>

                <div className="col-md-8">
                  <select
                    className="form-control dropdown"
                    id="serviceProvider"
                    value={editSelect}
                    ref={register}
                    onChange={handleChange}
                    onClick={() => {
                      setDropDownOne(!dropDownOne);
                    }}
                    onBlur={() => {
                      setDropDownOne(false);
                    }}
                    name="provider"
                    required
                  >
                    <option value="" disabled>
                      Select
                    </option>

                    {emailServiceProviderData.map((item: any) => {
                      return (
                        <option
                          key={`editConfig_${item.code}_${item.id}`}
                          value={item.id}
                        >
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                  <i
                    className={
                      dropDownOne
                        ? "aha-icon-arrow-down forModal rotate"
                        : "aha-icon-arrow-down forModal"
                    }
                  />
                </div>
              </div>
              <div className="form-group row required">
                <label htmlFor="domain" className="col-md-4 col-form-label">
                  {emailClientConfig[0]?.config.provider} Domain
                </label>
                <div className="col-md-8">
                  <input
                    type="text"
                    name="domain"
                    id="domain"
                    className="form-control"
                    defaultValue={emailClientConfig[0]?.config.domain}
                    ref={register}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group row required">
                <label htmlFor="privateKey" className="col-md-4 col-form-label">
                  {emailClientConfig[0]?.config.provider} API Key
                </label>
                <div className="col-md-8">
                  <input
                    type="text"
                    name="privateKey"
                    id="privateKey"
                    className="form-control"
                    defaultValue={emailClientConfig[0]?.config.privateKey}
                    ref={register}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-round btn-secondary mr-4 btnwidth cancel-btn"
                  onClick={() => {
                    setTabViewState(tabView.detailsView);
                    setApiStatus("");
                  }}
                >
                  Cancel
                </button>
                <button
                  disabled={buttonDisabled}
                  type="submit"
                  className="btn btn-round btn-primary btnwidth save-btn"
                >
                  Save
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </EmailConfigureWrapper>
  );
};

export default EmailConfigure;
