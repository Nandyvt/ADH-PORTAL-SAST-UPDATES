import React, { useCallback, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  addEmailConfigService,
  GetServiceProviderEmailAPI,
} from "services/api/notification.api";
import store from "app/store";
import { showToast } from "components/Toast/toast.slice";
import PermissionContext from "services/PermissionManager/PermissionContext";
import { AddEventListenerToElement } from "common/utils";
import EmailConfigureWrapper from "./styled";
import { formatDropDownData } from "./utils";
import InputForm from "./InputForm";
import EditServiceProviderConfiguration from "./EditProvider";

export interface IEmailConfig {
  provider: string;
  domain: string;
  privateKey: string;
  serviceProviderId: number;
  serviceProviderName: string;
}

const ServiceProviderConfiguration: React.FunctionComponent<any> = ({
  setTabViewState,
  tabView,
  apiStatus,
  setApiStatus,
  setLoading,
  emailClientConfig,
}: any) => {
  const [showInputFields, setShowInputFields] = useState<boolean>(false);
  const [dynamicFormModel, setDynamicFormModel] = useState<any>([]);
  const [disabledButton, setDisabledButton] = useState(true);

  const [serviceProviderId, setServiceProviderId] = useState<number>(0);
  const [inputFormData, setInputFormData] = useState<any>({});
  const [dynamicFormData, setDynamicFormData] = useState<any>({});

  const [isValidForm, setIsValidForm] = useState<boolean>(false);

  const { handleSubmit } = useForm();

  const [, setEmailconfigData] = useState<IEmailConfig>({
    provider: "",
    domain: "",
    privateKey: "",
    serviceProviderId: 0,
    serviceProviderName: "",
  });

  const [emailServiceProviderData, setEmailServiceProviderData] = useState<any>(
    []
  );
  const { loggedInUserObjectContext } = useContext(PermissionContext);

  const submitForm = () => {
    const formDataApiCall = {
      clientId: parseInt(loggedInUserObjectContext.clientId, 10),
      config: { ...dynamicFormData },
      serviceProviderId: Number(serviceProviderId),
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
            message: error.response.data.error.message,
          })
        );
        setTabViewState(tabView.configView);
      })
      .finally(() => {
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
            message: error?.response?.data?.error?.message,
          })
        );
      })
      .finally(() => {});
  };

  useEffect(() => {
    // api Call for Service Provider
    GetServiceProviderEmail();
  }, []);

  const [prependLabelValue, setPrependLabelValue] = useState<string>("");

  const handleFormData = useCallback(async (event: any) => {
    const { detail } = event;
    const { inputid } = event.target;
    setInputFormData({
      ...(inputid === "mailgun-domain" && { domain: detail }),
      ...(inputid === "mailgun-api-key" && { privateKey: detail }),
    });
  }, []);

  useEffect(() => {
    if (inputFormData && Object.keys(inputFormData).length > 0) {
      setDynamicFormData({
        ...dynamicFormData,
        ...inputFormData,
      });
    }
  }, [inputFormData]);

  useEffect(() => {
    if (dynamicFormData && Object.keys(dynamicFormData)?.length > 0) {
      if (
        prependLabelValue &&
        prependLabelValue.toLocaleLowerCase() === "mailgun"
      ) {
        if (dynamicFormData.domain && dynamicFormData.privateKey) {
          setIsValidForm(true);
          setEmailconfigData({
            provider: prependLabelValue,
            ...dynamicFormData,
          });
        } else {
          setIsValidForm(false);
        }
      }
    }
  }, [dynamicFormData]);

  useEffect(() => {
    if (prependLabelValue && isValidForm) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [prependLabelValue, isValidForm]);

  const handleDropdownChange = async (event: any) => {
    setDynamicFormModel(
      emailServiceProviderData.filter(
        (item: any) => item.id === Number(event?.detail.value)
      )[0]
    );
    setShowInputFields(true);
    setPrependLabelValue(event?.detail.label);
    setServiceProviderId(event?.detail.value);
  };

  AddEventListenerToElement(
    document.querySelector("aui-dropdown"),
    "auiDropdownChange",
    handleDropdownChange
  );

  return (
    <EmailConfigureWrapper className="mb-sm-9 pb-sm-4">
      <div>
        {apiStatus === "post" && (
          // For Post component
          <form onSubmit={handleSubmit(submitForm)} className="form-margin-top">
            {/* col 12 for small and col-4 for large */}
            <div className="row">
              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <aui-dropdown
                      options={JSON.stringify(
                        formatDropDownData(emailServiceProviderData)
                      )}
                      dropdownid="service-provider-id"
                      label="Service Provider"
                      required
                      clearable
                      direction="column"
                      placeholder="Select"
                    />
                  </div>
                </div>
                {showInputFields && dynamicFormModel?.jsonForm ? (
                  <InputForm
                    model={dynamicFormModel.jsonForm}
                    onChange={handleFormData}
                    wrapperClass="row"
                  />
                ) : null}
              </div>
            </div>

            <div className="row margin-top-button">
              <div className="d-flex col-sm-12 align-items-center">
                <aui-button
                  buttonclass="pr-0 mr-3"
                  buttonid="cancel-config"
                  buttontitle="Cancel"
                  variant="link-style"
                  onClick={() => {
                    setTabViewState(tabView.NC);
                    setApiStatus("");
                  }}
                />
                <aui-button
                  data-testid="save-button"
                  buttonid="save-config"
                  buttontitle="Save"
                  variant="primary"
                  disabled={disabledButton}
                  onClick={(e: any) => {
                    e.preventDefault();
                    return isValidForm ? submitForm() : undefined;
                  }}
                />
              </div>
            </div>
          </form>
        )}
        {apiStatus === "edit" && (
          // For Edit Component
          <EditServiceProviderConfiguration
            setTabViewState={setTabViewState}
            tabView={tabView}
            setApiStatus={setApiStatus}
          />
        )}
      </div>
    </EmailConfigureWrapper>
  );
};

export default ServiceProviderConfiguration;
