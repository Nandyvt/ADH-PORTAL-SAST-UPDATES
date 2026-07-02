import styled from "styled-components";

export const ToastWrapper = styled.div`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 1051;
  .alert {
    box-shadow: 0 0 1.125rem #00000029;
    @media screen and (max-width: 575px) {
      padding: 0.75rem 0.25rem;
      font-size: 12px;
      display: block;
    }
  }
  .alert-success {
    border: 1px solid #078643;
  }
  .alert-danger {
    border: 1px solid #c10e21;
  }
  @media screen and (max-width: 400px) {
    .alert-dismissible {
      padding-right: 2rem;
      padding-left: 0.75rem;
      @media screen and (max-width: 355px) {
        font-size: 12px;
      }
    }
  }
`;

export const AnotherWrapper = styled.div``;
