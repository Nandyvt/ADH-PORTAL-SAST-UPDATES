import CONSTANTS from "common/constants";
import axiosObject from "./ApiServices";

export const GetClientConfigEmailAPI = async (): Promise<any> => {
  return axiosObject.get(
    `${CONSTANTS.API_SERVICE_ENDPOINT.NOTIFICATION_V1}/clientConfigsAll`
  );
};

export const GetServiceProviderEmailAPI = async (): Promise<any> => {
  return axiosObject.get(
    `${CONSTANTS.API_SERVICE_ENDPOINT.NOTIFICATION_V1}/serviceProviders`
  );
};
export const ListServiceProviderEmailAPI = async ({
  pageSize,
  pageNumber,
}: any): Promise<any> => {
  return axiosObject.get(
    `${CONSTANTS.API_SERVICE_ENDPOINT.NOTIFICATION_V1}/serviceProviders`,
    {
      params: {
        pageSize,
        pageNumber,
      },
    }
  );
};
export const addEmailConfigService = async (formData: any): Promise<any> => {
  return axiosObject.post(
    `${CONSTANTS.API_SERVICE_ENDPOINT.NOTIFICATION_V1}/clientConfig`,
    formData
  );
};

export const patchEmailConfigService = async (
  id: number,
  formData: any
): Promise<any> => {
  return axiosObject.patch(
    `${CONSTANTS.API_SERVICE_ENDPOINT.NOTIFICATION_V1}/clientConfigs/${id}`,
    formData
  );
};

export const deleteEmailConfigService = async (id: number): Promise<any> => {
  return axiosObject.delete(
    `${CONSTANTS.API_SERVICE_ENDPOINT.NOTIFICATION_V1}/clientConfigs/${id}`
  );
};

export const NotificationsListService = async ({
  pageSize,
  pageNumber,
  type,
}: any): Promise<any> => {
  return axiosObject.get(
    `${CONSTANTS.API_SERVICE_ENDPOINT.NOTIFICATION_V1}/clientConfigs`,
    {
      params: {
        pageSize,
        pageNumber,
        type,
      },
    }
  );
};

export const UpdateClientNotificationTypeService = async (
  types: any
): Promise<any> => {
  return axiosObject.patch(
    `${CONSTANTS.API_SERVICE_ENDPOINT.NOTIFICATION_V1}/clientConfigs`,
    types
  );
};

export const getClientConfigsSummary = async (): Promise<any> => {
  return axiosObject.get(
    `${CONSTANTS.API_SERVICE_ENDPOINT.NOTIFICATION_V1}/clientConfigsSummary`
  );
};
