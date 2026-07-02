import CONSTANTS from "common/constants";
import { HeaderWrapper } from "components/Header/styled";
import React, { useEffect } from "react";

let prevScrollpos = window.scrollY;

const LoginHeader = () => {
  useEffect(() => {
    const el = document.getElementsByClassName("header-fixed");
    window.onscroll = () => {
      const currentScrollPos = window.scrollY;
      if (prevScrollpos > currentScrollPos) {
        Array.from(el).forEach((item) => {
          item.classList.remove("top-103");
          item.classList.add("top-0");
        });
      } else {
        Array.from(el).forEach((item) => {
          item.classList.remove("top-0");
          item.classList.add("top-103");
        });
      }
      prevScrollpos = currentScrollPos;
    };
  }, [prevScrollpos]);
  return (
    <HeaderWrapper
      id="aha-header"
      className="aui-main-header aui-pri-header header-fixed login-header"
    >
      <a href="#maincontent" className="aui-skip-content">
        Skip to main content
      </a>
      <div className="container pt-2 pb-2 logo-pos">
        <img
          className="logo-image"
          src={CONSTANTS.HEADER_LOGO.LOGO_WITH_ADH}
          alt="AHA home"
        />
      </div>
    </HeaderWrapper>
  );
};
export default LoginHeader;
