import store from "app/store";
import { setErrorOnLogin, setExpiryPath, setUser } from "app/user.slice";
import CONSTANTS from "common/constants";
import { getErrorMessage } from "common/utils";
import { logger } from "common/utils/logger.utils";
import { UserManager } from "oidc-client";
import OidcSettings from "routes/OidcSettings";
import ssoSignUpApi from "services/api/SSOLogin.api";
import { setToken } from "./auth.slice";

const userManager = new UserManager(OidcSettings) as any;
CONSTANTS.WINDOW.userManager = userManager;

function clearLocalStorage() {
  localStorage.removeItem("userToken");
  localStorage.removeItem("ButtonStatus");
  localStorage.removeItem("selectedIcon");
  localStorage.removeItem("Menus");
  localStorage.removeItem("apiPermission");
  localStorage.removeItem("subMenu");
  localStorage.removeItem("persist:root");
  localStorage.removeItem(CONSTANTS.ROLE_SWITCH_SEL_VALUE);
}

function updateStoreOnLogin(loggedInUserCtx: any) {
  store.dispatch(
    setUser({
      user: loggedInUserCtx,
    })
  );

  store.dispatch(
    setToken({
      userToken: loggedInUserCtx.token.accessToken,
    })
  );

  store.dispatch(
    setErrorOnLogin({
      errorObj: { errorFlag: false, errMsg: "" },
    })
  );
}

function updateLocalStore(loggedInUserCtx: any) {
  localStorage.setItem("userToken", loggedInUserCtx.token.accessToken);

  if (loggedInUserCtx.permission.menus) {
    localStorage.setItem(
      "Menus",
      JSON.stringify(loggedInUserCtx.permission.menus)
    );
  }

  if (loggedInUserCtx.apiPermission) {
    localStorage.setItem(
      "apiPermission",
      JSON.stringify(loggedInUserCtx.apiPermission)
    );
  }
}

export const ahaSsoLogin = (data?: any) => {
  clearLocalStorage();
  sessionStorage.clear();
  CONSTANTS.WINDOW.userManager.signinRedirect({ state: { path: data } });
};

export const ahaSsoLogout = () => {
  /* needed to make the document.body look invisible while page navigation on click of sign out */
  document
    .querySelector<any>("body")
    .setAttribute("style", "display:none !important");
  CONSTANTS.WINDOW.userManager.signoutRedirect();
  store.dispatch(setExpiryPath({ expiryPath: "/" }));
  store.dispatch({ type: "LOGGED_OUT" });
  CONSTANTS.WINDOW.userManager.clearStaleState();
  clearLocalStorage();
  localStorage.removeItem("TransLogAutoFillPath");
  localStorage.removeItem("TransLogAutoFillParams");
};

export const adhLogin = async (
  ahaSsoToken: any,
  roleCode: any,
  clientId: any
) => {
  try {
    const signupResponse = await ssoSignUpApi({
      idToken: ahaSsoToken,
      roleCode,
      clientId,
    });

    logger("STEP 1: call Adh login api:", signupResponse);

    logger("STEP 2: Update Store");
    updateStoreOnLogin(signupResponse.data.user);

    logger("STEP 3: update local storage:", signupResponse);
    updateLocalStore(signupResponse.data.user);

    const pathNameLocalStorage = localStorage.getItem("TransLogAutoFillPath");
    const transLogParamsLocalStorage = localStorage.getItem(
      "TransLogAutoFillParams"
    );

    if (
      pathNameLocalStorage &&
      JSON.parse(transLogParamsLocalStorage as string) !== null
    ) {
      const redirectUrlParams =
        localStorage.getItem("RedirectUrlParams") &&
        JSON.parse(localStorage.getItem("RedirectUrlParams") as string);
      /* Page redirection to transaction Logs page for Email Automation Task */
      return `${pathNameLocalStorage}${redirectUrlParams}`;
    }
    return "/dashboard";
  } catch (err) {
    logger("ERROR::", err);
    store.dispatch(
      setErrorOnLogin({
        errorObj: {
          errorFlag: true,
          errMsg: getErrorMessage(err),
        },
      })
    );
    return "/accessdenied";
  }
};
