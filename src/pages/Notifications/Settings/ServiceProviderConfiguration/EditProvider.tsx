import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import {
  GetServiceProviderEmailAPI,
  GetClientConfigEmailAPI,
  patchEmailConfigService,
} from "services/api/notification.api";
import { showToast } from "components/Toast/toast.slice";
import store from "app/store";
import PermissionContext from "services/PermissionManager/PermissionContext";
import InputForm from "./InputForm";
import {
  IEditServiceProvider,
  formatDefaultSelectedProvider,
  formatDropDownData,
  getDynamicFormByProvider,
} from "./utils";

const EditServiceProviderConfiguration = ({
  setTabViewState,
  tabView,
  setApiStatus,
}: IEditServiceProvider) => {
  const [serviceProviders, setServiceProviders] = useState<any>([]);
  const [editJsonForm, setEditJsonForm] = useState<any>([]);
  const [defaultSelectedInput, setDefaultSelectedInput] = useState<any>([]);
  const [notificationSettings, setNotificationSettings] = useState<any>([]);
  const [inputFormData, setInputFormData] = useState<any>({});
  const [isValidForm, setIsValidForm] = useState<boolean>(false);
  const editServiceProviderRef: any = useRef(null);
  const { handleSubmit } = useForm();
  const [defaultSericeProvider, setDefaultServiceProvider] = useState<any>({});
  const [serviceProvider, setServiceProvider] = useState<any>({});
  const [showInputFields, setshowInputFields] = useState<boolean>(false);
  const [dynamicFormData, setDynamicFormData] = useState<any>({});

  const { loggedInUserObjectContext } = useContext(PermissionContext);

  const handleFormData = useCallback((event: any) => {
    const { detail } = event;
    const { inputid } = event.target;
    setInputFormData({
      ...(inputid === "mailgun-domain" && { domain: detail }),
      ...(inputid === "mailgun-api-key" && { privateKey: detail }),
    });
  }, []);

  useEffect(() => {
    if (
      dynamicFormData &&
      Object.keys(dynamicFormData)?.length > 0 &&
      serviceProvider.label
    ) {
      if (
        serviceProvider.label &&
        serviceProvider.label.toLocaleLowerCase() === "mailgun"
      ) {
        if (
          dynamicFormData.domain &&
          dynamicFormData.privateKey &&
          (dynamicFormData.domain !== defaultSelectedInput[0] ||
            dynamicFormData.privateKey !== defaultSelectedInput[1])
        ) {
          setIsValidForm(true);
        } else {
          setIsValidForm(false);
        }
      }
    }
  }, [dynamicFormData, serviceProvider]);
  const submitEditForm = () => {
    const editForm = {
      clientId: parseInt(loggedInUserObjectContext.clientId, 10),
      config: { ...dynamicFormData },
      serviceProviderId: Number(serviceProvider.value),
    };
    patchEmailConfigService(notificationSettings[0].id, editForm)
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
      });
  };
  useEffect(() => {
    if (inputFormData && Object.keys(inputFormData).length > 0) {
      setDynamicFormData({
        ...dynamicFormData,
        ...inputFormData,
      });
    }
  }, [inputFormData]);

  useEffect(() => {
    if (serviceProvider?.value && serviceProviders.length > 0) {
      setshowInputFields(true);
      setEditJsonForm(
        getDynamicFormByProvider(serviceProvider, serviceProviders)
      );
    }
    if (serviceProvider?.value && notificationSettings.length > 0) {
      setDefaultServiceProvider(
        formatDefaultSelectedProvider(notificationSettings)
      );
      if (serviceProvider.value !== notificationSettings[0].serviceProviderId) {
        setDefaultSelectedInput([]);
        setDynamicFormData({
          domain: "",
          privateKey: "",
        });
      } else {
        setDefaultSelectedInput([
          notificationSettings[0].config.domain,
          notificationSettings[0].config.privateKey,
        ]);
        setDynamicFormData({
          domain: notificationSettings[0].config.domain,
          privateKey: notificationSettings[0].config.privateKey,
        });
        setInputFormData({
          domain: notificationSettings[0].config.domain,
          privateKey: notificationSettings[0].config.privateKey,
        });
      }
    }
  }, [serviceProvider, notificationSettings, serviceProviders]);

  useEffect(() => {
    GetServiceProviderEmailAPI()
      .then((response: any) => {
        if (response && response.data?.serviceProviders === null) {
          setServiceProviders([]);
        } else {
          setServiceProviders(response.data.serviceProviders);
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
      });
  }, []);

  useEffect(() => {
    GetClientConfigEmailAPI()
      .then((response: any) => {
        if (response && response.data?.clientConfigs === null) {
          setNotificationSettings([]);
        } else {
          setNotificationSettings(response.data?.clientConfigs);
          setServiceProvider({
            label: response.data?.clientConfigs[0].serviceProviderName,
            value: response.data?.clientConfigs[0].serviceProviderId,
          });
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
      });
  }, []);

  const handleDropDownChange = (event: any) => {
    if (event.detail.value) {
      setServiceProvider({
        label: event.detail.label,
        value: event.detail.value,
      });
      setshowInputFields(true);
    } else {
      setServiceProvider({
        label: "",
        value: "",
      });
      setshowInputFields(false);
      setEditJsonForm([]);
    }
  };

  useEffect(() => {
    editServiceProviderRef.current?.addEventListener(
      "auiDropdownChange",
      handleDropDownChange
    );
    return () => {
      editServiceProviderRef.current?.removeEventListener(
        "auiDropdownChange",
        handleDropDownChange
      );
    };
  }, [serviceProviders, notificationSettings]);

  return (
    <form onSubmit={handleSubmit(submitEditForm)} className="form-margin-top">
      <div className="row">
        <div className="col-lg-8">
          <div className="row">
            {serviceProviders.length > 0 && (
              <div className="col-lg-6 col-md-6 col-sm-6">
                <aui-dropdown
                  options={JSON.stringify(formatDropDownData(serviceProviders))}
                  dropdownid="service-provider-id-edit"
                  label="Service Provider"
                  required
                  clearable={false}
                  direction="column"
                  value={JSON.stringify(defaultSericeProvider)}
                  ref={editServiceProviderRef}
                />
              </div>
            )}
          </div>
          {showInputFields && editJsonForm.length > 0 && (
            <InputForm
              model={editJsonForm}
              onChange={handleFormData}
              defaultValue={defaultSelectedInput}
              wrapperClass="row"
            />
          )}
          <div className="row margin-top-button">
            <div className="d-flex col-sm-12 align-items-center">
              <aui-button
                buttonclass="pr-0 mr-3"
                buttonid="cancel-config"
                buttontitle="Cancel"
                variant="link-style"
                onClick={() => {
                  setTabViewState(tabView.detailsView);
                  setApiStatus("");
                }}
              />
              <aui-button
                data-testid="update-button"
                buttonid="update-config"
                buttontitle="Update"
                variant="primary"
                size="medium"
                disabled={!isValidForm}
                onClick={() => {
                  return isValidForm ? submitEditForm() : undefined;
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditServiceProviderConfiguration;
