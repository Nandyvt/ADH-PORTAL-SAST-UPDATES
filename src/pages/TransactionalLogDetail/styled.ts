import styled from "styled-components";

export const TransactionalLogDetailStyled = styled.div`
  .editor-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border: 1px solid #e3e3e3;
    padding: 1rem 1.5rem;
  }
  .editor-title {
    text-align: left;
    font: normal normal 600 18px/27px Montserrat;
    letter-spacing: 0px;
    color: #222328;
    opacity: 1;
  }
  .sub-title {
    text-align: left;
    font: normal normal normal 16px/27px Montserrat;
    letter-spacing: 0px;
    color: #222328;
    opacity: 1;
    margin-bottom: 3.313rem;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    @media (max-width: 767px) {
      margin-bottom: 1rem;
    }
  }
  .title {
    text-align: left;
    font: normal normal normal 30px/37px Montserrat;
    letter-spacing: 0px;
    opacity: 1;
    margin-bottom: 3rem;
  }
  .success {
    text-align: left;
    font: normal normal normal 30px/37px Montserrat;
    letter-spacing: 0px;
    color: #2e8104;
    opacity: 1;
  }
  .failure {
    text-align: left;
    font: normal normal normal 30px/37px Montserrat;
    letter-spacing: 0px;
    color: #c10e21;
    opacity: 1;
  }
  .icon {
    color: #c10e21;
  }
  .editor-wrapper .editor-title {
    text-align: left;
    font: normal normal 600 18px/27px Montserrat !important;
    letter-spacing: 0px;
    color: #222328;
    opacity: 1;
  }
  .editor-wrapper {
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #e3e3e3;
    padding-left: 1.5rem;
  }
  .editor-wrapper * {
    font: normal normal normal 16px/27px Montserrat !important;
  }
  .title-font-weight {
    text-align: left;
    font: normal normal 500 16px/25px Montserrat;
    letter-spacing: 0px;
    color: #222328;
    opacity: 1;
  }
  .sectionclass {
    word-break: break-word;
  }
  .consumerimage {
    font-size: 1.2rem;
  }

  @media only screen and (min-width: 576px) and (max-width: 767px) {
    .title {
      font: normal normal normal 22px/35px Montserrat;
    }
    .success {
      font: normal normal normal 22px/35px Montserrat;
    }
    .failure {
      font: normal normal normal 22px/35px Montserrat;
    }
  }
  @media only screen and (min-width: 768px) and (max-width: 991px) {
    .title {
      font: normal normal normal 24px/29px Montserrat;
    }
    .success {
      font: normal normal normal 24px/29px Montserrat;
    }
    .failure {
      font: normal normal normal 24px/29px Montserrat;
    }
  }

  @media only screen and (max-width: 575px) {
    .title {
      font: normal normal normal 22px/35px Montserrat;
    }
    .success {
      font: normal normal normal 22px/35px Montserrat;
    }
    .failure {
      font: normal normal normal 22px/35px Montserrat;
    }
  }
  .tx-id {
    margin-right: 0.5rem;
  }
  .noBtnStyle {
    background: none;
    border: none;
    padding: 0;
    margin-left: 8px;
  }
  .copy-icon {
    width: 1rem;
    height: 1rem;
    cursor: pointer;
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
      width: 8rem;
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
      font-size: 11px;
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

  .tooltip-role.viewOnly {
    .tooltiptext {
      bottom: 1.95rem;
    }
  }
  .helpTextWrapper {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
  }
  .tooltip-role .cardwrapper-ellipses:hover + span.tooltiptext {
    visibility: visible;
    opacity: 1;
    right: 3rem;
  }
  .tooltip-role img:hover + span.tooltiptext {
    visibility: visible;
    opacity: 1;
    right: -3.25rem;
    @media screen and (min-width: 320px) and (max-width: 575px) {
      display: none;
      right: 0;
    }
  }
  button:focus .tooltip-role img + span.tooltiptext {
    visibility: visible;
    opacity: 1;
    right: -3.25rem;
    @media screen and (min-width: 320px) and (max-width: 575px) {
      display: none;
      right: 0;
    }
  }
  .tooltip-role button:focus + .tooltiptext {
    visibility: visible;
    opacity: 1;
    @media screen and (min-width: 320px) and (max-width: 575px) {
      display: none;
      right: 0;
    }
  }
  .tooltip-role button:hover + .tooltiptext {
    visibility: visible;
    opacity: 1;
    @media screen and (min-width: 320px) and (max-width: 575px) {
      display: none;
      right: 0;
    }
  }
`;
