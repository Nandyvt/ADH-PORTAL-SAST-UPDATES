import styled from "styled-components";

const EmailDetailsWrapper = styled.div`
  .min-height {
    min-height: 50vh;
    @media screen and (min-width: 576px) and (max-width: 819px) {
      min-height: 60vh;
    }
    @media screen and (min-width: 820px) and (max-width: 991px) {
      min-height: 70vh;
    }
  }
  .form-margin-top {
    margin-top: 32px;
    @media screen and (min-width: 320px) and (max-width: 575px) {
      margin-top: 22px;
    }
    @media screen and (min-width: 576px) and (max-width: 767px) {
      margin-top: 24px;
    }
  }
  .details-text {
    font-family: Montserrat;
    font-weight: 500;
    font-size: 16px;
    line-height: 25px;
    margin-top: 5px;
  }

  .line {
    border-bottom: 1px solid #bcc3ca;
  }
  .contents {
    justify-content: flex-end;
  }
  .pr-custom-5 {
    padding-right: 1.5rem;
  }
  .editbtn,
  .deletebtn {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 26px;
    font-family: Montserrat;
    color: var(--primary);
    background: none;
    border: none;
    -webkit-text-decoration: underline;
    text-decoration: underline;
  }

  .detailValue {
    word-break: break-all;
  }
  .column-padding {
    @media screen and (min-width: 320px) and (max-width: 575px) {
      padding-left: 15px;
      padding-right: 15px;
    }
  }

  .text-value {
    color: #222328;
    font-family: "Montserrat";
    @media screen and (min-width: 320px) and (max-width: 575px) {
      font-size: 14px;
      line-height: 25px;
    }
  }
  .label-text {
    color: #222328;
    font-family: "Montserrat";
    line-height: 26px;
    font-size: 16px;

    @media screen and (min-width: 320px) and (max-width: 575px) {
      font-size: 14px !important;
      line-height: 26px !important;
    }
  }

  @media screen and (min-width: 320px) and (max-width: 575px) {
    .show-colon {
      display: none !important;
    }

    .editbtn {
      font-size: 14px !important;
    }
  }

  @media screen and (min-width: 768px) {
    .padLeftStyles {
      padding-left: 1.25rem;
    }
  }

  @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
    .vertical-spacing.label-text {
      flex: 0 0 24.66667%;
      max-width: 24.66667%;
    }
  }
`;

export default EmailDetailsWrapper;
