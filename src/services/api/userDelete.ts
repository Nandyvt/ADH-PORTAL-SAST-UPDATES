import CONSTANTS from "common/constants";
import axiosAccount from "./ApiServices";

export const userDelete = async (id: any): Promise<any> => {
  return axiosAccount.delete(
    `${CONSTANTS.API_SERVICE_ENDPOINT.ACCOUNT_V1}/users/${id}`
  );
};

export const UserStatusChanger = async (
  id: any,
  userStatus: string
): Promise<any> => {
  return axiosAccount.patch(
    `${CONSTANTS.API_SERVICE_ENDPOINT.ACCOUNT_V1}/users/${id}/status`,
    {
      status: userStatus,
    }
  );
};
