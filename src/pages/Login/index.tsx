import store from "app/store";
import AdminFooter from "components/AdminFooter";
import Header from "components/Header";
import { setHeaderTitleText } from "components/Header/header.slice";
import Toast from "components/Toast";
import { hideToast } from "components/Toast/toast.slice";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import LoginForm from "./Form";
import LoginHeader from "./LoginHeader";

import LoginWrapper from "./styled";

const pathName = window?.location?.pathname;

const Login = () => {
  const pathNameExpiry = useSelector((state: any) => {
    if (state.user.expiryPath) {
      return state.user.expiryPath;
    }

    return "";
  });
  useEffect(() => {
    store.dispatch(hideToast());
  }, []);
  useEffect(() => {
    if (pathName === "/") {
      store.dispatch(
        setHeaderTitleText({
          headerTitle: "",
        })
      );
    }
  }, [pathName]);
  return (
    <LoginWrapper>
      {pathNameExpiry === "" ||
      pathNameExpiry === "/location" ||
      pathName === pathNameExpiry ? (
        <LoginHeader />
      ) : (
        <Header />
      )}
      <Toast />
      <div className="home-wrapper">
        <div className="home-wrapper-left" role="presentation">
          <img
            className="home-image"
            src="../images/login-home.png"
            alt="AHA home"
          />
        </div>
        <div className="home-wrapper-right">
          <div className="form-wrapper">
            <LoginForm />
          </div>
        </div>
      </div>
      <AdminFooter isLoginPage />
    </LoginWrapper>
  );
};
export default Login;
