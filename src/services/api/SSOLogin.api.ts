import CONSTANTS from "common/constants";
import axiosAccount from "./ApiServices";

const ssoSignUpApi = async ({
  idToken,
  roleCode,
  clientId,
}: any): Promise<any> => {
  const response = axiosAccount.post(
    `${CONSTANTS.API_SERVICE_ENDPOINT.ACCOUNT_V1}/ssoSignUp`,
    { idToken },
    {
      params: { permissionData: true, roleCode, clientId },
    }
  );

  return response
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return Promise.reject(new Error(err.response?.data?.error?.message));
    });
};

export default ssoSignUpApi;
