import React from "react";
import FormHeaderWrapper from "./styled";

const FormHeader = () => {
  return (
    <FormHeaderWrapper>
      <div className="d-flex align-items-center">
        <img
          src="../images/AHA-loginlogo.svg"
          alt="aha logo"
          className="img-fluid"
        />
        <p className="font-bold aha-org-text pt-3" data-testid="test-heading">
          American Heart Association
        </p>
      </div>
    </FormHeaderWrapper>
  );
};

export default FormHeader;
