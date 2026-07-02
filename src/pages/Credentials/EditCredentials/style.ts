import styled from "styled-components";

export const EditCredentialsWrapper = styled.div`
  .btn {
    line-height: 1.75rem !important;
  }
  .header-title {
    font-size: 30px;
    font-weight: 400;
    line-height: 37px;
    color: #222328;
    font-family: "Montserrat";
    margin-bottom: 8px !important;

    @media screen and (min-width: 320px) and (max-width: 767px) {
      font-size: 22px;
      line-height: 27px;
    }
    @media screen and (min-width: 768px) and (max-width: 991px) {
      font-size: 24px;
      line-height: 29px;
    }
  }
  .title-border {
    border-bottom: 1px solid #cecece;
  }
  .note {
    font-size: 14px;
    line-height: 22px;
    color: #707070;
  }
  * {
    word-break: normal !important;
  }
  .row-gap-24 {
    row-gap: 24px;
  }
  .tooltip-role {
    position: relative;
    display: inline-block;
    cursor: pointer;

    > img {
      cursor: pointer;
    }

    .tooltiptext {
      visibility: hidden;
      width: 10rem;
      background-color: black;
      color: #fff;
      text-align: center;
      border-radius: 6px;
      padding: 5px 2px;
      position: absolute;
      z-index: 1;
      bottom: 3rem;
      left: 4.2rem;
      opacity: 0;
      -webkit-transition: opacity 1s;
      transition: opacity 1s;
      font-size: 12px;
      line-height: 20px;
      @media screen and (min-width: 320px) and (max-width: 575px) {
        right: 0;
      }
      &::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 7px;
        border-style: solid;
        border-color: black transparent transparent transparent;
      }
    }
  }
  .tooltip-role {
    button:hover + span.tooltiptext {
      visibility: visible;
      opacity: 1;
      right: 3.5rem;
      bottom: 2.5rem;
      @media screen and (min-width: 320px) and (max-width: 575px) {
        right: 11.75rem;
      }
      @media screen and (min-width: 576px) and (max-width: 767px) {
        right: -1.75rem;
      }
      @media screen and (min-width: 768px) and (max-width: 991px) {
        right: 2.5rem;
      }
    }
  }
  .tooltip-role {
    button:focus + span.tooltiptext {
      visibility: visible;
      opacity: 1;
      right: 3.5rem;
      bottom: 2.5rem;
      @media screen and (min-width: 320px) and (max-width: 575px) {
        right: 11.75rem;
      }
      @media screen and (min-width: 576px) and (max-width: 767px) {
        right: -1.75rem;
      }
      @media screen and (min-width: 768px) and (max-width: 991px) {
        right: 2.5rem;
      }
    }
  }
  .tooltip-role i:hover + span.tooltiptext {
    visibility: visible;
    opacity: 1;
    right: 3.5rem;
    bottom: 2.5rem;
    @media screen and (min-width: 320px) and (max-width: 575px) {
      right: 11.75rem;
    }
    @media screen and (min-width: 576px) and (max-width: 767px) {
      right: -1.75rem;
    }
    @media screen and (min-width: 768px) and (max-width: 991px) {
      right: 2.5rem;
    }
  }
  .noBtnStyle {
    background: none;
    border: 0px;
    line-height: 1;
    cursor: pointer;
    width: 24px;
    height: 24px;
    margin-right: 20px;
    background-color: #fff;
    i {
      &::before {
        margin-right: 0;
        margin-left: 0;
      }
    }
  }
  .credential-name::placeholder {
    color: rgb(34, 35, 40);
  }

  .btn.btn-primary:disabled {
    box-shadow: none;
    background-color: #aaaaaa !important;
    border: 1px solid #aaaaaa !important;
    color: #ffffff !important;
  }
  @media screen and (min-width: 576px) and (max-width: 767px) {
    .alignCheckboxes {
      flex-direction: row;
      flex-wrap: wrap;
    }
  }
  @media screen and (max-width: 767px) {
    .alignCheckboxes > .col-4 {
      padding-left: 0;
    }
  }
  .form-check input[type="checkbox"]:checked + label:before {
    background-color: #fff !important;
    border-color: #c10e21;
  }
  .form-check input[type="checkbox"]:checked + label:after {
    background-color: #fff;
    border-color: #c10e21;
  }
  .form-check input[type="checkbox"]:disabled + label:before {
    border: 1px solid #aaaaaa;
  }
  .form-check-bordered input[type="checkbox"] {
    position: absolute;
    left: 0px;
    width: 1.125rem;
    height: 1.125rem;
    z-index: 0;
    margin: 0px;
    background: transparent;
    color: transparent;
    appearance: none;
    top: 7px;
  }
  // check box height and width
  .form-check-bordered input[type="checkbox"] + label:before {
    width: 1.125rem !important;
    height: 1.125rem !important;
  }
  .form-check-bordered input[type="checkbox"]:checked + label:before {
    border-color: rgb(145, 145, 145) !important;
  }

  .form-check label:after {
    border-bottom: 2px solid rgb(255, 255, 255);
    border-left: 2px solid rgb(255, 255, 255);
    border-image: initial;
    border-top: none;
    border-right: none;
    content: "";
    height: 0.34375rem;
    opacity: 0;
    position: absolute;
    top: 10px;
    left: 0.21875rem;
    transform: rotate(-45deg);
    width: 0.65625rem;
  }

  .form-check label::before {
    background-color: rgb(255, 255, 255);
    border: 1px solid rgb(145, 145, 145);
    border-radius: 2px;
    cursor: pointer;
    width: 1.125rem;
    height: 1.125rem;
    left: 0px;
    position: absolute;
    top: 9px;
    content: "";
  }
  .borderbtm {
    border-bottom: 1px solid #e3e3e3;
    margin-bottom: 1.25rem;
  }
  .btn.btn-link-style {
    padding: 0 !important;
  }

  .form-check input[type="checkbox"]:disabled + label:after {
    border: 2px solid #aaaaaa;
    opacity: 1;
    border-top: none;
    border-right: none;
    content: "";
    position: absolute;
    transform: rotate(-45deg);
    width: 0.75rem;
  }
  .form-check-bordered label:after {
    border: 2px solid #fff;
    border-top: none;
    border-right: none;
    content: "" !important;
    height: 0.375rem;
    position: absolute;
    top: 11px;
    left: 0.2rem;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    width: 0.75rem;
    margin: 0;
  }
  .parent-checkbox {
    width: 0;
  }
  .form-check-bordered label:before {
    background-color: #fff;
    border: 1px solid #777979;
    border-radius: 2px;
    cursor: pointer;
    width: 1.375rem;
    height: 1.375rem;
    left: 0;
    position: absolute;
    top: 7px;
    content: "";
  }
  .child-checkbox {
    width: 0;
  }

  @media screen and (min-width: 768px) {
    .spacing-httpmethods {
      padding: 0.5rem 0 !important;
    }
    .pos-relative {
      position: relative;

      .get-cls,
      .post-cls,
      .patch-cls,
      .delete-cls {
        position: absolute;
      }

      .get-cls {
        left: 0;
      }
      .post-cls {
        left: 25%;
      }
      .patch-cls {
        right: 26%;
      }
      .delete-cls {
        right: 0;
      }
    }
  }
`;
