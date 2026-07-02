import styled from "styled-components";

const ModalFilterStyled = styled.div`
  .aui-modal-custombackdrop {
    background-color: rgba(0, 0, 0, 1);
  }
  .auiTestModal {
    width: 100vw;
  }
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1050;
    display: inline-block;
    width: 100%;
    height: 100%;
    overflow: hidden;
    outline: 0;
    @media screen and (max-width: 993px) {
      left: 0;
      overflow-y: auto;
    }
  }
  .filters-padding {
    padding-left: 15px;
    padding-right: 15px;
  }
  .horizontal-line {
    margin-bottom: 7px !important;
  }
  .modal-content {
    min-height: 100vh !important;
    padding-top: 1rem !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .modal-dialog {
    margin: 0 !important;
  }
  .btn-link-style {
    margin-right: 20px !important;
    padding: 0 !important;
  }
  .btn-primary {
    padding: 6px 20px !important;
  }
  .aui-uploaddocumentmodal .aui-modalclose aui-icon::part(icon) {
    @media only screen and (max-width: 576.5px) {
      width: 11px !important;
      height: 11px !important;
    }
  }
  .aui-modalclose {
    top: 11.5px;
    @media only screen and (max-width: 576.5px) {
      right: 17px !important;
    }
  }
  .filter-title {
    color: var(--primary-black);
    font-size: 18px;
    line-height: 27px;
  }

  @media only screen and (max-width: 576.5px) {
    .mob-padding-btn {
      padding-top: 1rem;
    }
  }
`;

export default ModalFilterStyled;
