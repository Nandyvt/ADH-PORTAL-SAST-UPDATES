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
  select + i {
    float: right;
    margin-top: -26px;
    position: relative;
    margin-right: 7px;
    pointer-events: none;
    background-color: rgb(255, 255, 255);
    padding-right: 5px;
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
  .save-btn {
    font-size: 16px;
    @media screen and (min-width: 320px) and (max-width: 767px) {
      font-size: 14px;
    }
  }
  @media screen and (min-width: 992px) {
    .alignContent {
      margin-left: 10rem;
    }
  }
`;

export default EmailConfigureWrapper;
