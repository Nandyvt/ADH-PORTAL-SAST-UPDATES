import AdminFooter from "components/AdminFooter";
import Header from "components/Header";
import React from "react";
import { useSelector } from "react-redux";
import { Wrapper } from "styled";
import { LoadingWrapper } from "./styled";

const AccessDenied = () => {
  const errorOnLoadObj = useSelector((state: any) => {
    return state?.user?.errorObj;
  });
  return (
    <LoadingWrapper>
      <Wrapper className="container d-flex flex-column minHeightStyle">
        <Header showMyAccountMenu={false} />

        <div className="my-5 accessbg">
          <div className="d-flex justify-content-center align-items-center">
            <img
              src="/images/Mail.svg"
              className="accessimg"
              alt="AccessDenied"
            />
          </div>
          <h4
            className="font-600 text-center pt-5 font26"
            data-testid="test-loadingtitle"
          >
            <span className="font-red">Sorry, </span>
            <span className="font-normal">
              we couldn’t find logged in user with active roles,
            </span>
            <p className="pt-2">
              <span className="font-normal">Please contact your </span>
              <span className="font-600">Administrator</span>
            </p>
            {errorOnLoadObj?.errorFlag && (
              <p className="errorInfo">
                (<span className="font-red">Error Info:</span>{" "}
                {errorOnLoadObj?.errMsg})
              </p>
            )}
          </h4>
        </div>
      </Wrapper>
      <AdminFooter />
    </LoadingWrapper>
  );
};

export default AccessDenied;
