import CONSTANTS from "common/constants";
import axiosObject from "./ApiServices";

export const inviteUserService = async (
  firstName: string,
  lastName: string,
  email: string,
  roleCode: string,
  clientId: string
): Promise<any> => {
  const client = Number(clientId);
  return axiosObject.post(
    `${CONSTANTS.API_SERVICE_ENDPOINT.ACCOUNT_V1}/users`,
    { firstName, lastName, email, roleCode, clientId: client }
  );
};

export const reInviteUserService = async (userId: string): Promise<any> => {
  return axiosObject.post(
    `${CONSTANTS.API_SERVICE_ENDPOINT.ACCOUNT_V1}/users/${userId}/reinvite`
  );
};
