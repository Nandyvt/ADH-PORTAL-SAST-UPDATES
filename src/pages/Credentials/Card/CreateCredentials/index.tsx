import CONSTANTS from "common/constants";
import React, { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

export const CreateCredentials: FunctionComponent = () => {
  const navigate = useNavigate();
  return (
    <div className="col-lg-3 padding-remove p-0 col-sm-6 col-md-6 d-flex m-0">
      <button
        className="aha-card-sm align-items-center card card-box card-common cursorpointer d-none d-sm-flex flex-grow-1 justify-content-center"
        type="button"
        onClick={() => {
          navigate("/credentials/create");
        }}
      >
        <div key="create-creds-card">
          <div className="row no-gutters align-items-start">
            <div className=" card-body text-center">
              <div className="text-center">
                <img
                  src="/images/icons-plus-circle.svg"
                  alt="plus-icon"
                  className="cursorpointer p2"
                />
                <p
                  className="create-credential font14 common-value"
                  data-testid="test-heading"
                >
                  {CONSTANTS.CREATE_CREDENTIALS_HEADING}
                </p>
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};
