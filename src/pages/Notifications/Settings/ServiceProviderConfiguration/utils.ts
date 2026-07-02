export const getConfigPayload = (data: any, provider: string) => {
  const config: any = {};
  if (provider.toLowerCase() === "mailgun") {
    config.domain = data[0].value;
    config.privateKey = data[1].value;
  }

  return config;
};

export const getServiceProvider = (data: any) => {
  return data?.[0]?.config?.provider;
};

export const formatDropDownData = (data: any) => {
  return data?.map((item: any) => {
    return {
      label: item.name,
      value: item.id,
    };
  });
};

export const formatDefaultSelectedProvider = (data: any) => {
  return {
    label: data[0]?.serviceProviderName,
    value: data[0]?.serviceProviderId,
  };
};

export interface IFormInterface {
  model: any;
  wrapperClass: string;
  defaultValue?: any;
  onChange: (data: any) => void;
}

export const getDynamicFormByProvider = (provider: any, data: any) => {
  let arr = [];
  if (data && data.length > 0) {
    arr = data.filter((item: any) => item.id === provider.value);
  }
  return arr[0].jsonForm;
};

export interface IEditServiceProvider {
  setTabViewState: any;
  tabView: any;
  setApiStatus: any;
}
