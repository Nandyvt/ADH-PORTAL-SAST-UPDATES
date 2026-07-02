import CONSTANTS from "common/constants";
import axiosObject from "./ApiServices";

export const getUsers = async ({ paramsData }: any): Promise<any> => {
  return axiosObject.get(`${CONSTANTS.API_SERVICE_ENDPOINT.ACCOUNT_V1}/users`, {
    params: {
      ...paramsData,
    },
  });
};

export const getUserByID = async (id: any): Promise<any> => {
  return axiosObject.get(
    `${CONSTANTS.API_SERVICE_ENDPOINT.ACCOUNT_V1}/users/${id}`
  );
};

export const userRoleStatusChangeService = async (
  id: any,
  roleStatus: string,
  roleCode: string,
  clientId: number
): Promise<any> => {
  return axiosObject.patch(
    `${CONSTANTS.API_SERVICE_ENDPOINT.ACCOUNT_V1}/users/${id}/roles`,
    {
      roleCode,
      status: roleStatus,
      clientId,
    }
  );
};

export const userRoleDeleteService = async (id: any): Promise<any> => {
  return axiosObject.delete(
    `${CONSTANTS.API_SERVICE_ENDPOINT.ACCOUNT_V1}/userRole/${id}`
  );
};

export const addRolePostService = async ({
  userId,
  postData,
}: any): Promise<any> => {
  return axiosObject.post(
    `${CONSTANTS.API_SERVICE_ENDPOINT.ACCOUNT_V1}/users/${userId}/roles`,
    postData
  );
};

export const clientUsersSummary = async (
  pageNumber: number,
  pageSize: number
): Promise<any> => {
  return axiosObject.get(
    `${CONSTANTS.API_SERVICE_ENDPOINT.ACCOUNT_V1}/clientUsersSummary`,
    {
      params: {
        pageNumber,
        pageSize,
      },
    }
  );
};
