import { ahaSsoLogin } from "app/hooks/auth/authManager";
import { isLocalLoginAvailable } from "app/hooks/auth/localLoginManager";
import store from "app/store";
import { showToast } from "components/Toast/toast.slice";
import React from "react";
import { useSelector } from "react-redux";
import SignInTitle from "../SignInTitle";
import FormWrapper from "./styled";

const LoginForm = () => {
  function loginHandler() {
    ahaSsoLogin();
  }

  const errorOnLoadObj = useSelector((state: any) => {
    if (state.user?.errorObj) {
      return state.user?.errorObj;
    }

    return "";
  });

  if (errorOnLoadObj.errorFlag) {
    store.dispatch(
      showToast({
        type: "danger",
        title: "Error Occurred",
        message: errorOnLoadObj.errMsg,
      })
    );
  }

  return (
    <div>
      <SignInTitle />
      <FormWrapper>
        <form>
          <div className="row buttonstyle">
            <div className="col-sm-8 col-md-6 align-self-end">
              <button
                type="button"
                onClick={loginHandler}
                className="btn btn-round btn-primary btn-width"
              >
                Sign In
              </button>
            </div>
          </div>
        </form>

        {isLocalLoginAvailable() && (
          <p style={{ marginTop: 16, fontSize: 13 }}>
            <a href="/local-login">Local Dev Login (bypass SSO)</a>
          </p>
        )}
      </FormWrapper>
    </div>
  );
};

export default LoginForm;
