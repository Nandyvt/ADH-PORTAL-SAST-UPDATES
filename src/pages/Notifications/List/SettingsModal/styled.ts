import styled from "styled-components";

const SettingModalWrapper = styled.div`
  .form-check-bordered {
    position: relative;
    padding-left: 1.9rem !important;
    padding-right: 12px !important;
  }
  .subtitle {
    color: #222328;
    font-size: 18px;
    opacity: 1;
    font-weight: 600;
    line-height: 27px;
  }
  @media (min-width: 576px) {
    .col-sm-3 {
      flex: 0 0 30%;
      max-width: 30%;
    }
    .col-sm-9 {
      flex: 0 0 70%;
      max-width: 75%;
    }
  }
  .btn.btn-primary:disabled {
    box-shadow: none;
    background-color: #aaaaaa !important;
    border: 2px solid #aaaaaa;
    color: #ffffff !important;
  }

  label.col-form-label {
    line-height: 27px;
  }
  @media screen and (max-width: 991px) {
    .aui-modal .modal-header {
      border-bottom: 1px solid #bcc3ca;
      margin-bottom: 2rem;
    }
    .form-control {
      font-size: 1rem;
    }
  }

  @media screen and (min-width: 768px) and (max-width: 991px) {
    /* Ipad */
  }

  @media screen and (min-width: 576px) and (max-width: 767px) {
    /* small Tablet */
    .modal-content {
      padding: 1.875rem;
    }
    button {
      > .btn {
        font-size: 0.875rem;
        line-height: 17px;
        padding: 0.5rem 1.5rem;
        font-weight: 500;
        border-radius: 3.125rem;
      }
      > .btn-secondary {
        margin-right: 20px !important;
      }
    }
    .aui-modal .modal-header {
      padding-bottom: 0.75rem;
      margin-bottom: 1.5rem;
    }
  }

  @media screen and (min-width: 320px) and (max-width: 575px) {
    /* Mobile */
    .modal.show .modal-dialog {
      max-width: calc(100vw - 0px);
      min-height: calc(100% - 0rem);
      align-items: flex-end;
      margin: 0;
      .modal-content {
        height: auto;
        border: 0;
      }
      .modal-header {
        justify-content: flex-start;
        border-bottom: 0;
        padding-bottom: 0.75rem;
        margin-bottom: 1.5rem;
        &::after {
          content: "";
          border-bottom: 1px solid #bcc3ca;
          width: 100%;
          display: block;
          position: absolute;
          left: 0;
          top: 3.5rem;
        }
      }
    }
    .btn {
      font-size: 14px !important;
    }
    .buttons {
      padding-bottom: 0.9375rem;
    }
    .form-control:not(textarea) {
      height: 40px;
    }
    .rotateInverse {
      transform: rotateZ(-180deg);
    }
    .proj-heading {
      padding-left: 0.75rem;
      font-size: 16px;
    }
    .modal-body {
      .form-group.mb-2 {
        margin-bottom: 0.75rem !important;
      }
    }
  }
  @media screen and (min-width: 768px) {
    .form-group {
      margin-bottom: 20px !important;
    }
  }
  .aui-modal.show {
    display: inline-block;
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
`;
export default SettingModalWrapper;
