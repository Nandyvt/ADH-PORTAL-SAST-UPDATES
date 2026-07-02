import React from "react";
import SignInTitleWrapper from "./styled";

const SignInTitle = () => {
  return (
    <SignInTitleWrapper>
      <div className="admin-signin-title justify-content-between align-items-center">
        <h1
          className="signin p-md-0 p-sm-0 mb-sm-0 mb-md-0"
          data-testid="test-heading"
        >
          Welcome to ADH
        </h1>
        <p
          className="signin-text  p-md-0 p-sm-0 mb-sm-0 mb-md-0"
          data-testid="test-text"
        >
          Authorized users of the AHA Data Hub (ADH) platform can use this
          portal to access diagnostic tools, documentation, and access controls
          for their client platform. If you require access to ADH and do not
          have it, please contact the ADH support team.
        </p>
      </div>
    </SignInTitleWrapper>
  );
};
export default SignInTitle;
