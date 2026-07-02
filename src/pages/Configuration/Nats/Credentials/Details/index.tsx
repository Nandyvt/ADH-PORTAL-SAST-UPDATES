import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { HeadingLabelWrapper } from "pages/Configuration/utils";
import { GetCredentialsDetailsByID } from "services/api/natsCredentials.api";
import CONSTANTS from "common/constants";
import CredentialsDetailsStyled from "./styled";

const CredentialsDetailsComp = () => {
  const { id } = useParams<{ id: string }>();
  const [passwordType, setPasswordType] = useState("password");
  const navigate = useNavigate();

  const { data: credentialsDetailsData, isLoading: loading } = useQuery(
    ["credentials-details-by-id", id],
    () => GetCredentialsDetailsByID(Number(id)),
    {
      select: (data) => data?.data?.data,
      enabled: !!id,
    }
  );

  const formattedSubjects = (subjects: any) =>
    subjects?.list && subjects.list.length > 0
      ? subjects.list.join(", ")
      : "No subjects available";

  return (
    <CredentialsDetailsStyled>
      <HeadingLabelWrapper>
        <h1 className="menuheading">{`View Credential: ${
          loading ? "-" : credentialsDetailsData?.username
        }`}</h1>
      </HeadingLabelWrapper>

      <div className="credentials-details">
        <div className="row">
          <div className="credentials-field col-lg-4 col-md-4">
            <span className="label">Client:</span>
            <span className="value">
              {credentialsDetailsData?.clientName || "N/A"}
            </span>
          </div>

          <div className="credentials-field col-lg-4 col-md-4">
            <span className="label">Username:</span>
            <span className="value">
              {credentialsDetailsData?.username || "N/A"}
            </span>
          </div>

          <div className="credentials-field col-lg-4 col-md-4">
            <span className="label">Password:</span>
            <span className="value">
              <span>
                {passwordType === "password"
                  ? "************"
                  : credentialsDetailsData?.password}
              </span>
              <button
                type="button"
                className="noBtnStyle password-toggle"
                aria-label="View Password"
                onClick={() => {
                  setPasswordType(
                    passwordType === "password" ? "text" : "password"
                  );
                }}
              >
                <aui-icon
                  block
                  icon={passwordType === "password" ? "eye" : "eyeCPNT"}
                  svgwidth="20"
                  svgheight="20"
                  fillcolor="#777979"
                  hovercolor="#777979"
                />
              </button>
            </span>
          </div>
        </div>
        <div className="row">
          <div className="credentials-field col-lg-4 col-md-4">
            <span className="label">Reporting Subject:</span>
            <span className="value">
              {credentialsDetailsData?.reportingSubject || "N/A"}
            </span>
          </div>

          <div className="credentials-field col-lg-4 col-md-4">
            <span className="label">Subscribe Subjects:</span>
            <span className="value">
              {formattedSubjects(credentialsDetailsData?.subscribeSubjects)}
            </span>
          </div>

          <div className="credentials-field col-lg-4 col-md-4">
            <span className="label">Publish Subjects:</span>
            <span className="value">
              {formattedSubjects(credentialsDetailsData?.publishSubjects)}
            </span>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="back-button-div">
        <aui-button
          variant="secondary"
          size="small"
          onClick={() => {
            navigate(CONSTANTS.PAGE_ROUTES.NATS_CREDENTIALS_LISTING);
          }}
          buttontitle="Back"
          buttonid="back-button"
        />
      </div>
    </CredentialsDetailsStyled>
  );
};

export default CredentialsDetailsComp;
