import CONSTANTS from "common/constants";
import config from "config";
import axiosObject from "./ApiServices";

export const getRoles = async (paramsData: any): Promise<any> => {
  return axiosObject.get(`${CONSTANTS.API_SERVICE_ENDPOINT.ACCOUNT_V1}/roles`, {
    params: {
      ...paramsData,
    },
  });
};

export const getRolesMenu = async (roleId: string): Promise<any> => {
  return axiosObject.get(
    `${CONSTANTS.API_SERVICE_ENDPOINT.ACCOUNT_V1}/roles/${roleId}/menus`
  );
};

export const getSchema = async (code: string): Promise<any> => {
  return axiosObject.get(
    `${CONSTANTS.API_SERVICE_ENDPOINT.ACCOUNT_V1}/jsonschema/${code}`
  );
};

export const patchMenu = async (id: any, menu: object): Promise<any> => {
  return axiosObject.patch(
    `${CONSTANTS.API_SERVICE_ENDPOINT.ACCOUNT_V1}/roles/${id}`,
    {
      permission: menu,
    }
  );
};

export const getSchemaUrl = (): string => {
  const baseUrl = `${config[config.env].gatewayURL}`;
  return `${baseUrl}${CONSTANTS.API_SERVICE_ENDPOINT.ACCOUNT_V1}/schema?code=ROLE_MENUS`;
};
