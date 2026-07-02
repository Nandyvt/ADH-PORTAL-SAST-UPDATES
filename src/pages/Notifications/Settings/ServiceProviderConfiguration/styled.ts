import styled from "styled-components";

const EmailConfigureWrapper = styled.div`
  .min-height {
    min-height: 50vh;
    @media screen and (min-width: 576px) and (max-width: 819px) {
      min-height: 60vh;
    }
    @media screen and (min-width: 820px) and (max-width: 991px) {
      min-height: 70vh;
    }
  }
  .btn.btn-primary:disabled {
    box-shadow: none;
    border: 2px solid rgb(170, 170, 170);
    background-color: rgb(170, 170, 170) !important;
    color: rgb(255, 255, 255) !important;
  }
  select.form-control {
    appearance: none;
    background-image: none;
    background-repeat: no-repeat;
    cursor: pointer;
  }
  .forModal {
    font-size: 45%;
  }
  .form-group {
    margin-bottom: 1.875rem;
  }
  .cancel-btn {
    font-size: 16px;
    @media screen and (min-width: 320px) and (max-width: 767px) {
      font-size: 14px;
    }
  }

  .instruction {
    color: #555;
    font-size: 14px;
    font-weight: 500;
  }
  @media screen and (max-width: 575px) {
    .instruction {
      font-size: 12px;
      margin-bottom: 0px;
      margin-top: 1rem;
    }
  }
  .margin-top-button {
    margin-top: 32px !important;
    @media screen and (min-width: 320px) and (max-width: 575px) {
      margin-top: 24px !important;
    }
  }
  .form-margin-top {
    margin-top: 24px;
    @media screen and (min-width: 320px) and (max-width: 575px) {
      margin-top: 16px;
    }
  }
  button#cancel-config {
    margin-right: 30px !important;
    padding-right: 0 !important;
    @media screen and (min-width: 320px) and (max-width: 575px) {
      margin-right: 18px !important;
    }
  }
  button#update-config {
    padding: 10px 30px !important;
    font-size: 1rem !important;
  }
`;

export default EmailConfigureWrapper;

export const InputFormWrapper = styled.div`
  .margin-top-form-field {
    margin-top: 24px;
    @media screen and (min-width: 320px) and (max-width: 575px) {
      margin-top: 16px;
    }
  }
`;
