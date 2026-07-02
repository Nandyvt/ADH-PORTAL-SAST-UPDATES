import styled from "styled-components";

const NotificationsListWrapper = styled.div`
  .notifications {
    font-size: 30px;
    line-height: 37px;
    font-family: Montserrat;
    font-weight: 400;
    color: #222328;
    @media screen and (min-width: 320px) and (max-width: 576px) {
      font-size: 22px;
      line-height: 27px;
    }
    @media screen and (min-width: 576px) and (max-width: 767px) {
      font-size: 22px;
      line-height: 29px;
    }
    @media screen and (min-width: 768px) and (max-width: 991px) {
      font-size: 24px;
      line-height: 29px;
    }
  }
  .header-bottom {
    border-bottom: 1px solid var(--cecece);
    margin-bottom: 12px;
  }
  .tagSpacing {
    margin-top: 32px;
  }
  .disabled-icon {
    display: inline-block;
    font-size: 12px;
    line-height: 18px;
    background-color: var(--inactiveRole-bgColor) !important;
    color: var(--inactiveRole-color) !important;
    border-radius: 4px;
    margin: 0.35rem;
    padding: 0.35rem 0.5rem 0.25rem 0.5rem;
    font-weight: 500;
    list-style: none;
    @media screen and (max-width: 991px) {
      margin: 0;
    }
  }
  .default-color {
    background-color: var(--gray-lighter) !important;
    color: #343a40 !important;
  }
  .button-text {
    font-size: 14px;
    line-height: 18px;
    font-family: Montserrat;
    text-align: center;
    display: inline-block;
    padding: 6px 10px;
    border-radius: 4px;
    border: none;
    font-weight: 500;
  }
  .selected-filter {
    background-color: var(--gray-dark) !important;
    color: var(--white) !important;
  }
  .aui-responsive-status-table tbody.aui-td {
    justify-content: flex-start;
    line-height: 18px;
  }
  .status-col {
  }
  .name-col {
    font-size: 14px;
    font-family: Montserrat;
    line-height: 27px;
  }
  .type-col {
    > li:not(.disabled-icon) {
      display: inline-block;
      font-size: 12px;
      line-height: 18px;
      background-color: var(--notificationType-bgColor) !important;
      color: var(--notificationType-color) !important;
      border-radius: 4px;
      /* margin: 0.35rem; */
      padding: 0.35rem 0.5rem 0.25rem 0.5rem;
      font-weight: 500;
      list-style: none;
      @media screen and (min-width: 993px) {
        margin: 0.35rem;
      }
    }
    > li {
      margin-right: 0.625rem;
      @media screen and (max-width: 991px) {
        font-size: 12px !important;
      }
    }
  }
  thead {
    @media only screen and (min-width: 1200px) {
      th:nth-child(1) {
        width: 35%;
      }
      th:nth-child(2) {
        width: 50%;
      }
      th:nth-child(4) {
        width: 15%;
      }
    }
  }
  .aui-responsive-status-table {
    table {
      th {
        font-size: 0.875rem;
        .aui-th {
          &::before {
            height: calc(100% - 2px);
            border-left: 1px solid #e3e3e3;
            top: 0px;
          }
          @media screen and (max-width: 991px) {
            border-left: none;
          }
        }
      }
      tbody {
        tr.aui-table-status-red {
          background-color: #fff;
          @media screen and (max-width: 993px) {
            border-left: 4px solid #0d8200;
          }

          > td:first-child {
            .aui-td {
              @media screen and (min-width: 993px) {
                border-left: 4px solid #0d8200;
              }
            }
          }
        }

        tr.aui-table-status-grey {
          @media screen and (max-width: 993px) {
            border-left: 4px solid #343a40;
          }
          > td:first-child {
            .aui-td {
              @media screen and (min-width: 993px) {
                border-left: 4px solid #343a40;
              }
            }
          }
        }
        tr {
          td {
            &::before {
              @media screen and (min-width: 576px) {
                padding-bottom: 10px;
              }
            }
          }
        }
      }
    }
  }
  .aui-responsive-status-table .tooltiptext {
    pointer-events: none;
    visibility: hidden;
    width: 5.5rem;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0px;
    position: absolute;
    z-index: 1;
    bottom: 3.5rem;
    left: 0.75rem;
    margin-left: 0.1rem;
    opacity: 0;
    -webkit-transition: opacity 1s ease 0s;
    transition: opacity 1s ease 0s;
    font-size: 12px;
    line-height: 20px;
    @media only screen and (min-width: 360px) {
      bottom: 2.5rem;
      left: 0rem;
    }
    @media only screen and (min-width: 575px) and (max-width: 991px) {
      margin-left: -10%;
      bottom: 2.5rem;
    }
    @media only screen and (min-width: 1200px) {
      margin-left: 0;
      bottom: 2.5rem;
      left: 0.5rem;
    }
  }
  .aui-responsive-status-table {
    tbody {
      .ellipses {
        @media screen and (min-width: 320px) and (max-width: 767px) {
          left: 1.75rem;
        }

        @media screen and (min-width: 768px) and (max-width: 991px) {
          left: 6%;
        }
      }
    }
  }

  .ellipses {
    font-weight: bold;
    text-align: center;
    font-size: 1.5rem;
    letter-spacing: 0.4rem;
    cursor: pointer;
    color: rgb(52, 58, 64);
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%) !important;
    margin: 0;
    padding: 0.25rem 0.25rem 0.25rem 0.5rem !important;
  }
  .aui-responsive-status-table .tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 7px;
    border-style: solid;
    border-color: black transparent transparent;
  }
  .ellipses:hover ~ span.tooltiptext {
    visibility: visible;
    opacity: 1;
    display: block;
  }
  .noBtnStyle {
    background: none;
    border: none;
  }

  .connection-td-wrapper {
    position: relative;
    .popoverWrapper {
      position: absolute;
      top: 1.5rem;
      left: -5rem;
      width: 9.4rem;
      background: #fff;
      padding: 20px;
      box-shadow: 0px 3px 6px #00000029;
      border: 1px solid #e3e3e3;
      z-index: 6;
      border: 1px solid rgb(109, 110, 113);
      border-top: 4px solid var(--primary) !important;

      @media screen and (min-width: 576px) and (max-width: 767px) {
        left: -3rem;
      }
      @media screen and (min-width: 320px) and (max-width: 575px) {
        left: -1rem;
      }

      > p {
        cursor: pointer;
      }
      > button {
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 18px;
        font-family: Montserrat;
        color: #343a40;
        padding: 0;
        width: 100%;
        text-align: left;
      }
    }
  }

  button.rotate-90:hover ~ span.tooltiptext {
    visibility: hidden !important;
    opacity: 0 !important;
  }
  .tooltip-role .helpTextStyles:hover + span.tooltiptext {
    visibility: visible;
    opacity: 1;
  }

  .helpTextStyles {
    padding-left: 3px;
    margin-top: -1px;
    cursor: pointer;
  }

  .tooltiptext.viewMoreKebab {
    left: 1.1rem;
    bottom: 3rem;
    margin-left: 0px;
    @media screen and (max-width: 991px) {
      left: -1rem;
      bottom: 2.275rem;
      margin-left: 0px;
    }
  }

  .aui-responsive-status-table thead th .aui-th {
    padding: 1rem 0.625rem;
    background: #f8f8f8;
    color: rgb(34, 35, 40);
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 25px;
    font-family: Montserrat;
  }
  .tooltip-role {
    position: relative;
    display: inline-block;
  }
  .filterhead {
    margin-top: 32px !important;
    @media screen and (max-width: 767px) {
      margin-top: 24px !important;
    }
    @media screen and (max-width: 575px) {
      text-align: center;
      margin: 0 !important;
      justify-content: center;
      margin-top: 10px !important;
    }
    .filterheadchild {
      padding-top: 6px;
      @media screen and (min-width: 576px) and (max-width: 767px) {
        justify-content: between;
        margin-top: 10px;
      }
      @media screen and (max-width: 575px) {
        text-align: center;
        padding-bottom: 10px;
      }
    }
  }

  @media screen and (max-width: 991px) {
    .showItemsSpacing {
      padding: 0 !important;
      .page-number {
        padding-bottom: 0 !important;
      }
    }
  }

  @media screen and (max-width: 767px) {
    .showItemsSpacing {
      .page-number {
        font-size: 14px;
      }
    }
  }
`;

export default NotificationsListWrapper;
