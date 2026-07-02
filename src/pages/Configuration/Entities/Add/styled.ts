import styled from "styled-components";

export const AddEntityStylesWrapper = styled.div`
  .menuheading {
    margin-bottom: 0;
  }
  .note {
    font-size: 14px;
    line-height: 22px;
    color: #707070;
  }

  .mt-minus2 {
    margin-top: -2px;
  }

  .editor-title-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #e3e3e3;
    padding: 1rem 1.5rem;
  }
  .editor-title {
    font: normal normal 600 18px/27px Montserrat;
    color: #222328;
  }
  .editor-wrapper {
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #e3e3e3;
    padding-left: 1.5rem;
    margin-top: 0.5rem;
  }
  .editor-wrapper * {
    font: normal normal normal 16px/27px Montserrat !important;
  }

  .active-btn {
    background: #c10e21 0% 0% no-repeat padding-box;
    border: 2px solid #c10e21;
    color: white;
  }
  .json-buttons {
    padding: 0.5rem 1.75rem;
  }

  .Addbtn:disabled {
    color: #fff !important;
    background-color: #949494 !important;
    border-color: #949494 !important;
    box-shadow: none !important;
    opacity: 1 !important;
    text-decoration: none !important;
    pointer-events: none !important;
  }
  .Addbtn {
    padding: 6px 26px !important;
  }

  .config-required {
    &:after {
      content: "*";
      color: rgb(255, 0, 0);
      margin-left: 0.125rem;
      font-size: 16px;
      font-weight: 400;
    }
  }

  .auiclose {
    display: none !important;
  }
`;
