import styled from "styled-components";

export const EntitiesStyled = styled.div`
  @media only screen and (max-width: 768px) {
    margin-left: 16px;
    margin-right: 16px;
    .container {
      padding: 0;
    }
  }
  opacity: 1;
  font: normal normal normal 16px/19px Montserrat;
  letter-spacing: 0px;
  color: #222328;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    font: normal normal normal 24px/29px Montserrat;
    margin-top: 30px;
    border-bottom: 1px solid #e5e5e5;
    @media only screen and (max-width: 576px) {
      flex-direction: column;
      align-items: flex-start;
      #add-nats-Credentials-btn {
        align-self: flex-end;
        padding-right: 10px;
        @media only screen and (max-width: 576px) {
          padding-right: 0;
        }
      }
    }
    h1 {
      text-align: left;
      font: normal normal normal 30px/37px Montserrat;
      letter-spacing: 0px;
      color: #222328;
      opacity: 1;
      white-space: nowrap;
    }
  }
  .cards {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 0;
    margin: 0;
    .col-lg-3 {
      width: max-content;
      @media only screen and (max-width: 576px) {
        width: 100%;
      }
    }
    .col-lg-3:first-child {
      padding: 0;
    }
    .col-lg-3:nth-child(4n + 1) {
      padding: 0;
    }
    @media only screen and (max-width: 992.5px) {
      .col-lg-3:nth-child(2n + 1) {
        padding: 0;
      }
    }
    @media only screen and (max-width: 576px) {
      .col-lg-3:nth-child(n) {
        padding: 0 !important;
      }
    }
    .col-lg-3:nth-child(4n) .card {
      margin-right: 0px;
      .popoverWrapper {
        left: -8rem;
      }
      span.tooltiptext {
        bottom: 0rem !important;
        right: 3rem !important;
        &::after {
          top: 27%;
          left: 104%;
          border-color: transparent transparent transparent black;
        }
      }
    }
    @media only screen and (max-width: 992.5px) {
      .col-lg-3:nth-child(2n) .card {
        margin-right: 0px;
        .popoverWrapper {
          left: -8rem;
        }
        span.tooltiptext {
          bottom: 0rem !important;
          right: 3rem !important;
          &::after {
            top: 27%;
            left: 104%;
            border-color: transparent transparent transparent black;
          }
        }
      }
    }
    @media only screen and (max-width: 576px) {
      .col-lg-3:nth-child(n) .card {
        margin-right: 0px;
        .popoverWrapper {
          left: -8rem;
        }
        span.tooltiptext {
          bottom: 0rem !important;
          right: 3rem !important;
          &::after {
            top: 27%;
            left: 104%;
            border-color: transparent transparent transparent black;
          }
        }
      }
    }
    .card {
      cursor: pointer;
      position: relative;
      margin-bottom: 15px;
      min-height: 166px;
      .noBtnStyle:focus {
        outline: 2px solid #d6700a !important;
        -webkit-box-shadow: 0 0 4px 4px #d6700a !important;
        box-shadow: 0 0 4px 4px #d6700a !important;
      }
      .noBtnStyle:focus-visible {
        outline: none;
      }
      aui-tooltip {
        height: fit-content;
      }
      .tooltip-role {
        position: relative;
        cursor: pointer;
        height: fit-content;

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
          bottom: 2rem;
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
      .tooltip-role .tooltip-right span.tooltiptext {
        bottom: 1rem;
        &::after {
          top: 27%;
          left: 104%;
          border-color: transparent transparent transparent black;
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
      .tooltip-role img.helpTextStyles:hover + span.tooltiptext {
        visibility: visible;
        opacity: 1;
        right: 1.75rem;
        @media screen and (min-width: 320px) and (max-width: 575px) {
          display: none;
          right: 0;
        }
      }
      .tooltip-role .tooltip-right:focus span.tooltiptext {
        visibility: visible;
        opacity: 1;
        right: 1.75rem;
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
      button.rotate-90:hover ~ span.tooltiptext {
        visibility: hidden !important;
        opacity: 0 !important;
      }
      .connection-td-wrapper {
        position: relative;
        .popoverWrapper {
          position: absolute;
          width: 9.4rem;
          background: #fff;
          padding: 0.5rem;
          box-shadow: 0px 3px 6px #00000029;
          border: 1px solid #e3e3e3;
          top: 1rem;
          left: -7rem;
          z-index: 99;
          border-top: 4px solid var(--primary) !important;
          border: 1px solid var(--gray);
          @media screen and (min-width: 320px) and (max-width: 575px) {
            left: -7rem;
          }
          @media screen and (min-width: 576px) and (max-width: 767px) {
            /* small Tablet */
            width: 7.25rem;
          }

          > p {
            cursor: pointer;
          }
          > button {
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 18px;
            font-family: Montserrat;
            color: #343a40;
            width: 100%;
            text-align: left;
          }
        }
      }
      .noBtnStyle {
        background: none;
        border: none;
        height: fit-content;
      }
      .consumer-name {
        font: normal normal 600 14px/18px Montserrat;
        letter-spacing: 0px;
        color: #222328;
        opacity: 1;
        padding-left: 18px;
      }
      .card-body {
        display: flex;
        flex-direction: column;
        padding: 16px 12px 13px 14px;
        margin: 0;
        justify-content: space-between;
        p {
          padding: 0px 0px 10px 0px;
          margin: 0;
          white-space: nowrap;
          width: auto;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .name {
          text-align: left;
          font: normal normal 500 14px Montserrat;
          letter-spacing: 0px;
          max-width: 100px;
          white-space: nowrap;
          width: auto;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .subject {
          color: #777979;
          text-align: left;
          font: normal normal normal 12px/18px Montserrat;
          letter-spacing: 0px;
          color: #222328;
          opacity: 1;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
        .btn-view-config {
          width: 100%;
          display: flex;
          justify-content: flex-end;
        }
        .view-config {
          align-self: flex-end;
          padding: 0;
          text-align: left;
          font: normal normal normal 12px/15px Montserrat;
          letter-spacing: 0px;
          color: #c10e21;
          opacity: 1;
          word-wrap: break-word;
          width: 100%;
        }
      }
    }
  }
  td:nth-child(1) * {
    user-select: text;
  }
  .reportingSubject-header {
    width: 25%;
  }

  th.subscription-header {
    width: 28%;
  }
  .reportingSubject > p {
    max-width: 250px;
  }
  .search-btn {
    display: flex;
    justify-content: center;
    width: 100%;
    align-self: center;
    max-width: 106px;
    margin-right: 60px;
  }

  .btn-link-style {
    padding-right: 0 !important;
    bottom: 10px;
    position: relative;
  }

  .search-clear {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-end;
  }
`;
