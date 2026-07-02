import CONSTANTS from "common/constants";
import axiosAccount from "./ApiServices";

export const AddCredentials = async (data: any): Promise<any> => {
  return axiosAccount.post(
    `${CONSTANTS.API_SERVICE_ENDPOINT.ACCOUNT_V1}/credentials`,
    data
  );
};
export const CredentialStatusChanger = async (
  id: any,
  credStatus: string
): Promise<any> => {
  return axiosAccount.patch(
    `${CONSTANTS.API_SERVICE_ENDPOINT.ACCOUNT_V1}/credentials/${id}/status`,
    {
      status: credStatus,
    }
  );
};

export const CredentialsListService = async ({
  pageSize,
  pageNumber,
  channel,
  clientId,
  status,
}: any): Promise<any> => {
  return axiosAccount.get(
    `${CONSTANTS.API_SERVICE_ENDPOINT.ACCOUNT_V1}/credentials`,
    {
      params: {
        pageSize,
        pageNumber,
        channel,
        clientId,
        status,
        pageOrder: "updatedAt DESC",
      },
    }
  );
};

export const CredentialDelete = async (id: number): Promise<any> => {
  return axiosAccount.delete(
    `${CONSTANTS.API_SERVICE_ENDPOINT.ACCOUNT_V1}/credentials/${id}`
  );
};

export const EditCredentialGet = async (id: number): Promise<any> => {
  return axiosAccount.get(
    `${CONSTANTS.API_SERVICE_ENDPOINT.ACCOUNT_V1}/credentials/${id}`
  );
};

export const EditCredentialPatch = async (
  id: any,
  credEditData: any
): Promise<any> => {
  return axiosAccount.patch(
    `${CONSTANTS.API_SERVICE_ENDPOINT.ACCOUNT_V1}/credentials/${id}`,
    credEditData
  );
};

export const credentialStatusSummary = async (
  pageNumber: number,
  pageSize: number
): Promise<any> => {
  return axiosAccount.get(
    `${CONSTANTS.API_SERVICE_ENDPOINT.ACCOUNT_V1}/credentialStatusSummary`,
    {
      params: {
        pageNumber,
        pageSize,
      },
    }
  );
};
