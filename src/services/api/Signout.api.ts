import CONSTANTS from "common/constants";
import axiosAccount from "./ApiServices";

const SignOutApi = async ({ accessToken }: any): Promise<any> => {
  return axiosAccount.delete(
    `${CONSTANTS.API_SERVICE_ENDPOINT.ACCOUNT_V1}/signout`,
    {
      data: { accessToken },
    }
  );
};
export default SignOutApi;
