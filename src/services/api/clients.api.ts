import CONSTANTS from "common/constants";
import axiosAccount from "./ApiServices";

export const ClientDelete = async (id: any): Promise<any> => {
  return axiosAccount.delete(
    `${CONSTANTS.API_SERVICE_ENDPOINT.ACCOUNT_V1}/clients/${id}`
  );
};

export const ClientStatusChanger = async (
  id: any,
  clientStatus: string
): Promise<any> => {
  return axiosAccount.patch(
    `${CONSTANTS.API_SERVICE_ENDPOINT.ACCOUNT_V1}/clients/${id}/status`,
    {
      status: clientStatus,
    }
  );
};
export const ClientListService = async (paramsObj: any): Promise<any> => {
  return axiosAccount.get(
    `${CONSTANTS.API_SERVICE_ENDPOINT.ACCOUNT_V1}/clients`,
    {
      params: {
        ...paramsObj,
      },
    }
  );
};
export const GetClientService = async (id: number): Promise<any> => {
  return axiosAccount.get(
    `${CONSTANTS.API_SERVICE_ENDPOINT.ACCOUNT_V1}/clients/${id}`,
    {}
  );
};

export const ClientEditor = async (id: any, data: any): Promise<any> => {
  return axiosAccount.patch(
    `${CONSTANTS.API_SERVICE_ENDPOINT.ACCOUNT_V1}/clients/${id}`,
    data
  );
};

export const DeleteClientService = async (id: number): Promise<any> => {
  return axiosAccount.delete(
    `${CONSTANTS.API_SERVICE_ENDPOINT.ACCOUNT_V1}/clients/${id}`,
    {}
  );
};
export const addClientService = async (clientData: any): Promise<any> => {
  return axiosAccount.post(
    `${CONSTANTS.API_SERVICE_ENDPOINT.ACCOUNT_V1}/clients`,
    clientData
  );
};
