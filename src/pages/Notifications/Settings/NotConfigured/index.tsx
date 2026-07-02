import React from "react";
import NotConfiguredWrapper from "./styled";

const NotConfigured: React.FunctionComponent<any> = ({ setApiStatus }: any) => {
  return (
    <NotConfiguredWrapper>
      <div className="d-flex flex-column align-items-center justify-content-center min-height">
        <img
          src="/images/config.gif"
          alt="notification config"
          className="image"
        />
        <h3 className="title">Not configured yet</h3>
        <p className="sub-title text-center">
          You are not configured notification service Would you like to
          configure one?
        </p>
        <button
          type="button"
          className="btn btn-round btn-primary button-text"
          onClick={() => {
            setApiStatus("notConfig");
          }}
        >
          Configure
        </button>
      </div>
    </NotConfiguredWrapper>
  );
};

export default NotConfigured;
