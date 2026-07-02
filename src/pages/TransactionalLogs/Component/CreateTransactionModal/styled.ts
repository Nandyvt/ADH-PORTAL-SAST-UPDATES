import styled from "styled-components";

export const CreateTransactionModalStyles = styled.div`
  .aui-modal.show {
    display: inline-block;
  }
  .proj-heading {
    color: #222328;
    font-size: 18px;
    opacity: 1;
    font-weight: 600;
    line-height: 27px;
  }
  .btn.btn-primary:disabled {
    box-shadow: none;
    background-color: #aaaaaa !important;
    border: 2px solid #aaaaaa;
    color: #ffffff !important;
  }
  .modal-body {
    max-height: 60vh;
    overflow-y: auto;
  }
  @media (min-width: 576px) {
    .col-sm-3 {
      flex: 0 0 35%;
      max-width: 35%;
    }
    .col-sm-9 {
      flex: 0 0 65%;
      max-width: 65%;
    }
  }
`;

export default CreateTransactionModalStyles;
