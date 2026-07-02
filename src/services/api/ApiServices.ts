import axios from "axios";
import config from "config";
import { ahaSsoLogout } from "app/hooks/auth/authManager";
import { logger } from "common/utils/logger.utils";

const axiosAccount = axios.create({
  baseURL: `${config[config.env].gatewayURL}`,
});
export default axiosAccount;

axiosAccount?.interceptors.request.use(async (request) => {
  if (request.url?.includes("ssoSignUp")) {
    return request;
  }

  const tokenResp = localStorage.getItem("userToken");
  if (tokenResp) {
    request.headers.Authorization = `Bearer ${tokenResp}`;
  } else throw new Error("Unauthorized");

  return request;
});

axiosAccount?.interceptors.response.use(
  (response) => {
    logger("RESPONSE Interceptor : ", response);
    return response.data;
  },
  async (error) => {
    // route to login page, if api status is 401
    if (error.response?.status === 401) {
      ahaSsoLogout();
    }
    return Promise.reject(error);
  }
);
