import CONSTANTS from "common/constants";
import { ICredentialsFilter } from "pages/Configuration/common/Credentials.slice";
import { ICredentialCreateAPI } from "pages/Configuration/models";
import axiosAccount from "./ApiServices";

export const ListNatsCredentials = async (
  paramsData: ICredentialsFilter
): Promise<any> => {
  return axiosAccount.get(
    `${CONSTANTS.API_SERVICE_ENDPOINT.HUB_V1}/natscredentials`,
    {
      params: {
        ...paramsData,
      },
    }
  );
};

export const CreateNatsCredentials = async (
  credentialCreatePayload: ICredentialCreateAPI
): Promise<any> => {
  return axiosAccount.post(
    `${CONSTANTS.API_SERVICE_ENDPOINT.HUB_V1}/natscredentials`,
    credentialCreatePayload
  );
};

export const GetCredentialsDetailsByID = async (id: number): Promise<any> => {
  return axiosAccount.get(
    `${CONSTANTS.API_SERVICE_ENDPOINT.HUB_V1}/natscredentials/${id}`,
    {}
  );
};
