/**
 * LOCAL DEV ONLY bypass login.
 *
 * The real login flow (ahaSsoLogin / adhLogin in authManager.ts) redirects to AHA's
 * hosted SSO portal and is untouched by this file. This module exists purely so the
 * app can be exercised against the local backend (backend/services/auth-service via
 * the local api-gateway) without a real SSO environment available.
 *
 * It deliberately mirrors updateStoreOnLogin/updateLocalStore from authManager.ts so
 * that downstream code (PrivateRoute's localStorage.getItem("userToken") check, the
 * axiosAccount interceptor, role lookups off state.user.user) keeps working exactly
 * the same regardless of which login path was used.
 */
import axios from "axios";
import store from "app/store";
import { setErrorOnLogin, setUser } from "app/user.slice";
import config from "config";
import { getErrorMessage } from "common/utils";
import { logger } from "common/utils/logger.utils";
import { setToken } from "./auth.slice";

export interface LocalLoginCredentials {
  username: string;
  password: string;
}

// Plain axios instance (NOT axiosAccount) because axiosAccount's request
// interceptor requires an existing userToken in localStorage for every call
// except ssoSignUp - there is no token yet at the point we're logging in.
const localAuthClient = axios.create({
  baseURL: `${config[config.env].gatewayURL}`,
});

// "aws" is included so the bypass login can be used to smoke-test the AWS
// (EKS + CloudFront) deployment before real AHA SSO redirect URIs are registered
// for that environment. Remove "aws" once real SSO is wired up there.
export const isLocalLoginAvailable = () =>
  config.env === "local" || config.env === "aws";

export const localLogin = async ({
  username,
  password,
}: LocalLoginCredentials) => {
  try {
    const response: any = await localAuthClient.post("account/v1/login", {
      username,
      password,
    });

    const { token, user } = response.data.data;

    const loggedInUserCtx = {
      ...user,
      roleCode: user.role,
      token: { accessToken: token },
      permission: { menus: [] },
      apiPermission: [],
    };

    store.dispatch(setUser({ user: loggedInUserCtx }));
    store.dispatch(setToken({ userToken: token }));
    store.dispatch(
      setErrorOnLogin({ errorObj: { errorFlag: false, errMsg: "" } })
    );

    localStorage.setItem("userToken", token);

    return { success: true, redirectPath: "/dashboard" };
  } catch (err) {
    logger("LOCAL LOGIN ERROR::", err);
    return { success: false, errorMessage: getErrorMessage(err) };
  }
};
