import styled from "styled-components";

const CredentialsModalWrapper = styled.div`
  * {
    word-break: normal !important;
  }
  .close {
    position: absolute;
    right: -5px;
    top: -5px;
  }
  .close:not(:disabled):not(.disabled):hover,
  .close:not(:disabled):not(.disabled):focus {
    opacity: 1;
  }

  .aui-modal {
    .modal-header {
      margin-bottom: 1rem;
      border-bottom: 1px solid #e3e3e3;
      padding-bottom: 0.25rem;
    }
  }
  .modal-md {
    @media screen and (min-width: 320px) and (max-width: 575px) {
      margin: 0;
      max-width: calc(100vw - -1px);
    }
  }
  .modal-content {
    @media screen and (min-width: 320px) and (max-width: 575px) {
      border: none;
    }
  }
  .modal-md.modal-content {
    padding: 0 !important;
  }
  .aui-nav-accordion {
    .card {
      .aui-accordion-btn {
        padding: 0.75rem 0.75rem;
        padding: 0.9rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
      .form-check {
        padding-left: 16px;
        padding-right: 35px;
        flex-grow: 1;
        @media screen and (min-width: 375px) and (max-width: 575px) {
          padding: 0 0.99rem;
        }
        @media screen and (min-width: 320px) and (max-width: 574px) {
          padding: 0 1.5rem;
          display: inline-block;
          width: 50%;
        }
      }
      .form-check-bordered {
        position: relative;
        padding-left: 2.25rem;
        padding-right: 1rem;
      }
      .card-header {
        .form-check {
          flex-grow: 0;
        }
      }
    }
  }
  .h6 {
    font-size: 16px;
    margin: 0 0 0.875rem;
    line-height: 23px;
    margin-bottom: 0.5rem;
    margin-top: 0rem;
    font-weight: 600 !important;
  }
  select + i {
    float: right;
    margin-top: -26px;
    margin-right: 7px;
    pointer-events: none;
    background-color: #fff;
    padding-right: 5px;
  }
  .forModal {
    font-size: 43%;
  }
  .borderbtm {
    border-bottom: 1px solid #e3e3e3;
    margin-bottom: 1.25rem;
  }
  select.form-control {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-image: none;
    background-repeat: no-repeat;
  }
  .form-control,
  .form-radio [type="radio"]:not(:checked) + label:before,
  select.form-control {
    border: 1px solid #bcc3ca;
  }
  .rotate {
    transform: rotate(180deg);
  }
  .h6.mainHeading {
    border-bottom: 0;
    padding-bottom: 0;
    font-size: 16px;
    line-height: 27px;
    letter-spacing: 0px;
    @media screen and (min-width: 576px) {
      font-size: 18px;
    }
    @media screen and (min-width: 320px) and (max-width: 575px) {
      padding-left: 0.75rem;
    }
    .tenant-name {
      color: #c10e21;
      margin-left: 5px;
    }
  }
  .form-group {
    margin-bottom: 1rem;
  }
  .form-check {
    label {
      cursor: pointer;
      font-size: 14px;
      line-height: 25px;
      margin-top: -3px;
      font-style: italic;
      color: #222328;
      margin-bottom: 0;
      padding-left: 15px;

      &::before {
        border: 1px solid #bcc3ca;
      }
    }
    .labelHeading {
      font-size: 20px;
      font-style: normal;
      line-height: 10px;
      color: #222328;
    }
    label.labelHeading {
      &:after {
        top: 3px;
      }
      &:before {
        top: -3px;
      }
    }
  }

  label.col-sm-4.col-form-label {
    @media screen and (min-width: 320px) and (max-width: 575px) {
      font-weight: 600;
    }
  }
  h2 {
    .form-check {
      label {
        font-size: 16px;
        @media screen and (min-width: 320px) and (max-width: 575px) {
          font-size: 14px;
        }
      }
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
  .form-check label:after {
    border: 2px solid #c10e21 !important;
    border-top: none;
    border-right: none;
    content: "";
    height: 0.375rem;
    opacity: 0;
    position: absolute;
    top: 0.375rem;
    left: 0.3125rem;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    width: 0.75rem;
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

  .aui-nav-accordion {
    .card {
      .flex-grow0 {
        flex-grow: 0;
      }
    }
  }
  .btn.btn-primary:disabled {
    box-shadow: none;
    background-color: #aaaaaa !important;
    border: 2px solid #aaaaaa;
    color: #ffffff !important;
  }
  .fontnormal {
    font-style: normal !important;
  }
  .form-radio [type="radio"]:checked + label,
  .form-radio [type="radio"]:not(:checked) + label {
    position: relative;
    padding-left: 2rem;
  }
  .modalwidth {
    width: 100%;
  }
  .mleft {
    margin-left: 310px;
  }
  .rotateInverse {
    @media screen and (min-width: 320px) and (max-width: 575px) {
      transform: rotateZ(-180deg);
    }
  }
  .bottom-70 {
    bottom: -70px;
  }
  .bottom-0 {
    bottom: 0;
    box-shadow: 0px -4px 6px #00000029;
  }
  @media screen and (min-width: 320px) and (max-width: 575px) {
    .modal.show .modal-dialog .modal-content {
      min-height: 100vh;
      height: auto;
      border: 0;
    }
  }
  .red {
    color: #c10e21;
  }
  .d-none {
    @media screen and (min-width: 320px) and (max-width: 575px) {
      display: none !important ;
    }
  }
  .btn-background {
    height: 45px;
    background: rgb(255, 255, 255);
    position: fixed;
    bottom: 0rem;
    width: 100%;
    right: 0rem;
    box-shadow: rgb(0 0 0 / 16%) 0px -4px 6px;
  }
  .saveCredsBtn {
    font-size: 14px;
    line-height: 1rem;
    border-radius: 50px;
    border: none;
  }
  .fxdbtn {
    position: relative;
    bottom: 0.5rem;
    right: 0rem;
    margin: 4px 15px;
    width: 92%;
    padding: 5px;
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
      right: -3rem;
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

  @media screen and (min-width: 576px) and (max-width: 767px) {
    .alignCheckboxes {
      flex-direction: row;
      flex-wrap: wrap;
    }
  }

  .form-scroll {
    overflow-y: auto;
    overflow-x: clip;
    @media screen and (min-width: 576px) {
      max-height: 530px;
    }
    width: 100%;
    z-index: 100;
    position: relative;
    left: 12px;
    top: 30px;
    margin-bottom: 30px;
    padding-right: 20px;
    scrollbar-color: #222328 #aaaaaa;
    scrollbar-width: thin;
  }

  /* WebKit Fallback Browsers */

  .form-scroll::-webkit-scrollbar {
    width: 0.375rem;
    padding-left: 10px;
  }

  .form-scroll::-webkit-scrollbar-track {
    background-color: #aaaaaa;
    background: #aaaaaa 0% 0% no-repeat padding-box;
    border-radius: 10px;
  }

  .form-scroll::-webkit-scrollbar-thumb {
    background: #222328 0% 0% no-repeat padding-box;
    outline: 1px solid black;
    border-radius: 10px;
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
  .aui-modal.show {
    display: inline-block;
  }
  .aui-nav-accordion
    .card
    .aui-accordion-btn
    span[data-toggle="collapse"][aria-expanded="true"]
    .acc-btn-arrow {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
    display: inline-flex;
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
`;

export default CredentialsModalWrapper;
