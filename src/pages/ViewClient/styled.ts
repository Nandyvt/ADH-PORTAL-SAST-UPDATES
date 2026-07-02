import styled from "styled-components";

export const ViewClientStyles = styled.div`
  .editbtn,
  .deactivatebtn,
  .deletebtn {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 18px;
    font-family: Montserrat;
    color: #222328;
    background: none;
    border: none;
    text-decoration: underline;
    padding: 0 !important;
  }
  .pr-custom-5 {
    padding-right: 1.5rem;
    @media screen and (min-width: 320px) and (max-width: 575px) {
      padding-right: 0;
    }
  }
  .p-custom-5 {
    padding: 40px;
  }
  .modalwidth {
    width: 583px;
  }
  .form-error-msg {
    color: #c10e21;
    font-weight: 500;
    font-size: 15px;
    margin-top: 5px;
  }
  .modal-dialog.editclient-modal.modalwidth {
    @media screen and (min-width: 992px) {
      top: 45%;
      transform: translateY(-50%);
    }
  }
  .btnGrp-editTanant {
    justify-content: flex-end;
    @media screen and (min-width: 576px) and (max-width: 767px) {
      justify-content: center;
    }
    @media screen and (min-width: 320px) and (max-width: 575px) {
      flex-grow: 1;
      align-items: flex-end;
      .btn-secondary {
        display: none;
      }
      .btn-primary {
        width: 100%;
        justify-content: center;
      }
    }
  }
  .cnf-btn-non-focus {
    box-shadow: none !important;
    outline: none !important;
  }
  modal-backdrop-hide {
    opacity: 1;
  }
  /* [aria-label="Edit Client"]
    .modal-dialog.modalwidth.editclient-modal
    .modal-content {
    height: inherit;
  } */
  .modal.show .modal-dialog {
    @media screen and (min-width: 320px) and (max-width: 575px) {
      max-width: 100vw;
      align-items: flex-start;
      min-height: 100%;
      margin: 0px;
    }
  }
  .contents {
    justify-content: flex-end;
  }
  .vertical-spacing {
    margin-bottom: 0rem;
  }
  .modal-title {
    font-size: 18px;
    @media screen and (min-width: 320px) and (max-width: 576px) {
      font-size: 16px;
      padding-left: 10px;
    }
  }
  @media screen and (min-width: 320px) and (max-width: 575px) {
    .height-68 {
      height: 90vh !important;
    }
    .details-text {
      font-size: 14px !important;
      line-height: 23px !important;
    }
    .editbtn {
      font-size: 14px !important;
    }
    .label-text {
      font-size: 14px !important;
      line-height: 27px !important;
    }
    .contents {
      justify-content: space-between;
    }
    .vertical-spacing {
      margin-bottom: 0.5rem;
    }
    .client-heading {
      font-size: 22px !important;
      line-height: 27px !important;
      border-bottom: 1px solid #cecece;
    }
    .modal.show .modal-dialog .modal-content {
      border: 0px;
    }
    .rotateInverse {
      transform: rotateZ(-180deg);
    }
    .btnGrp-editTanant .btn-primary {
      position: fixed;
      bottom: 0rem;
      right: 0;
      margin: 12px 15px;
      width: 92%;
      border-radius: 50px;
      font-size: 16px;
      line-height: 1.5;
      padding: 0.5rem 1.375rem;
    }
    .btn-background {
      height: 66px;
      background: #fff;
      position: fixed;
      bottom: 0rem;
      width: 100%;
      right: 0rem;
      box-shadow: 0px -4px 6px #00000029;
    }
    .show-colon {
      display: none !important;
    }
  }
  .show-colon {
    display: inline-flex;
  }

  .line {
    border-bottom: 1px solid #bcc3ca;
  }

  .client-heading {
    font-size: 30px;
    line-height: 37px;
    font-weight: 400;
    border-bottom: 1px solid #cecece;
  }
  .primary-color {
    color: #c10e21;
  }
  @media screen and (min-width: 758px) and (max-width: 991px) {
    .pl-lg-20 {
      padding-left: 10px !important;
    }
  }
  @media screen and (min-width: 576px) and (max-width: 758px) {
    .client-heading {
      font-size: 22px !important;
      line-height: 27px !important;
      border-bottom: 1px solid #cecece;
    }
    .details-text {
      font-size: 14px !important;
      line-height: 23px !important;
    }
    .editbtn {
      font-size: 14px !important;
    }
    .height-68 {
      height: 52vh !important;
    }
  }
  @media screen and (min-width: 768px) and (max-width: 991px) {
    .client-heading {
      font-size: 24px !important;
      line-height: 29px !important;
      border-bottom: 1px solid #cecece;
    }
    .details-text {
      font-size: 16px !important;
      line-height: 25px !important;
    }
    .height-68 {
      height: 67 vh !important;
    }
  }
  .details-text {
    font-size: 16px;
    line-height: 27px;
    word-break: break-all;
  }
  .label-text {
    font-size: 16px;
    line-height: 27px;
  }

  .editbtn {
    font-size: 16px;
  }
  @media screen and (min-width: 992px) {
    .pl-lg-20 {
      padding-left: 20px !important;
    }
  }
  .height-68 {
    height: 73.7vh;
  }
  .editclient-modal .modal-content {
    @media screen and (min-width: 320px) and (max-width: 575px) {
      height: 100vh;
    }
  }

  .aui-modal.show {
    display: inline-block;
  }
  .editbtn span:hover {
    color: #c10e21 !important;
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
  .close {
    position: absolute;
    right: -4px;
    top: -5px;
  }
  .close:not(:disabled):not(.disabled):hover,
  .close:not(:disabled):not(.disabled):focus {
    opacity: 1;
  }

  .btn.btn-primary:disabled {
    color: #fff;
    background-color: #aaaaaa;
    border-color: #aaaaaa;
  }

  .tooltiptext {
    visibility: hidden;
    width: 5.5rem;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: 1.75rem;
    right: -2rem;
    opacity: 0;
    -webkit-transition: opacity 1s;
    transition: opacity 1s;
    font-size: 12px;
    line-height: 20px;
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

  .tooltip-role .headingTooltipEle:hover + span.tooltiptext,
  .tooltip-role .headingTooltipEle:focus + span.tooltiptext {
    visibility: visible;
    opacity: 1;
  }
  .cursPointer {
    cursor: pointer;
  }

  .headingWrapperTooltip {
    width: 100%;
    .headingTooltipEle {
      display: inline-block;
    }
    .tooltiptext {
      left: 4%;
      bottom: 3rem;
      width: auto;
      @media screen and (max-width: 767px) {
        width: 15rem;
      }
      @media screen and (min-width: 768px) {
        max-width: 30%;
      }
      padding: 0.5rem;
      word-break: break-all;
      z-index: 1001;
    }
  }

  .headingWrapperTooltip.modalElipses {
    .tooltiptext {
      bottom: 2.5rem;
      @media screen and (min-width: 768px) {
        max-width: 60%;
      }
      @media screen and (max-width: 767px) {
        bottom: -5rem;
        &::after {
          bottom: 100%;
          border-color: transparent transparent black transparent;
          top: initial;
        }
      }
    }
  }

  .tooltip-role {
    position: relative;
  }

  .header-title {
    max-width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    word-break: break-all;
    @media screen and (min-width: 768px) {
      max-width: calc(100%);
    }
  }

  .editClientHeading {
    width: 7rem;
  }
  .headingWrapperTooltip {
    padding: 0;
    top: 3px;
  }

  .client-label {
    display: inline-block;
    margin-bottom: 0.5rem !important;
    max-width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    word-break: break-all;
  }
  .container-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 24px;
  }
  @media screen and (max-width: 575px) {
    .container-grid {
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 20px;
    }
  }
  .row {
    > div {
      > div {
        > p {
          font-size: 1rem;
          line-height: 25px;
          font-weight: 500;
          font-family: Montserrat;
          word-break: break-all;
          @media screen and (min-width: 320px) and (max-width: 575px) {
            font-size: 14px;
          }
        }
      }
    }
  }
  .ellipsis-100 {
    max-width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    word-break: break-all;
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
  }
  .pl-15 {
    padding-left: 15px;
  }
  .pr-15 {
    padding-right: 15px;
  }
  .gap-24 {
    gap: 24px;
    justify-content: flex-start;
    @media screen and (min-width: 320px) and (max-width: 575px) {
      justify-content: space-between;
    }
  }
  .mobile-btn {
    display: none;
    @media screen and (min-width: 320px) and (max-width: 575px) {
      display: block;
    }
  }
  .screenBtn {
    display: block;
    @media screen and (min-width: 320px) and (max-width: 393px) {
      order: 4;
    }
    @media screen and (min-width: 394px) {
      order: 1;
    }
  }

  .editbtn {
    display: block;
    @media screen and (min-width: 320px) and (max-width: 393px) {
      order: 1;
    }
    @media screen and (min-width: 394px) {
      order: 2;
    }
  }

  .statusBtn {
    display: block;
    @media screen and (min-width: 320px) and (max-width: 393px) {
      order: 2;
    }
    @media screen and (min-width: 394px) {
      order: 3;
    }
  }
  .deleteBtn {
    display: block;
    @media screen and (min-width: 320px) and (max-width: 393px) {
      order: 3;
    }
    @media screen and (min-width: 394px) {
      order: 4;
    }
  }
`;
