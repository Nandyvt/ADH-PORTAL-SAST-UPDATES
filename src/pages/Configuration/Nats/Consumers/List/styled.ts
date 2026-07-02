import styled from "styled-components";

export const NatsConsumerStyles = styled.div`
  min-width: 75vw;
  @media screen and (min-width: 1700px) {
    min-width: 65vw;
  }

  .nats-consumers-heading {
    color: #222328;
    font: normal normal normal 30px/37px Montserrat;
    @media only screen and (max-width: 576px) {
      font-size: 22px;
    }
  }

  .no-data-spacing {
    margin-bottom: 150px;
    @media only screen and (min-width: 576px) {
      margin-bottom: 0px;
    }
  }

  .header-bottom {
    border-bottom: 1px solid var(--cecece);
    margin-bottom: 12px;
  }

  .adh-anchorStyle {
    width: 100%;
    text-decoration: underline;
    color: #c10e21;
    cursor: pointer;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 23px;
    font-family: Montserrat;
  }

  .project-table {
    margin-top: 32px;
    @media screen and (max-width: 991px) {
      margin-top: 24px;
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
              @media screen and (max-width: 991px) {
                border-left: none;
              }
            }
          }
        }

        th:nth-child(1) {
          width: 30%;
        }
        th:nth-child(3) {
          width: 15%;
        }
        th:nth-child(4) {
          width: 14%;
        }
      }

      tbody {
        tr.aui-tr-deactivated {
          @media screen and (max-width: 991px) {
            border-left: 4px solid var(--dark) !important;
          }

          td:first-child {
            .aui-td {
              position: relative;
              @media screen and (min-width: 992px) {
                border-left: 4px solid var(--dark) !important;
              }
            }
          }
        }
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
            border-left: 4px solid #eb0f25;
          }
          > td:first-child {
            .aui-td {
              @media screen and (min-width: 993px) {
                border-left: 4px solid #eb0f25;
              }
            }
          }
        }

        .connection-td-wrapper {
          justify-content: flex-start;

          > i {
            font-size: 1.5rem;
            @media only screen and (min-width: 1200px) {
              justify-content: space-evenly;
            }
          }

          > img {
            width: 18px;
            height: 18px;
            cursor: pointer;
            margin-right: 10px;
            @media only screen and (min-width: 1200px) {
              margin-right: auto;
            }
          }
        }
        .clientName-column {
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
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
          transform: translate(-50%, -50%);
          margin: 0;
          padding: 0.7rem 0.5rem 0 0.5rem;
        }
        [class^="aha-icon-meat-balls"]:before {
          font-family: "fontello";
          font-style: normal;
          font-weight: normal;
          display: inline-block;
          -webkit-text-decoration: inherit;
          text-decoration: inherit;
          text-align: center;
          font-size: 24px;
          font-variant: normal;
          text-transform: none;
          line-height: 1em;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .actions-column {
          flex-direction: row;
          justify-content: center;
        }

        > tr {
          @media screen and (min-width: 576px) and (max-width: 992px) {
            margin-bottom: 1.5rem;
          }
        }

        .noDataDesc {
          padding-left: 0.25rem;
        }
      }

      thead {
        th {
          .aui-th {
            background: #f8f8f8;
            color: #222328;
            font-style: normal;
            font-weight: 500;
            font-size: 16px;
            line-height: 23px;
            font-family: Montserrat;
          }
        }
      }
    }

    .line {
      border-bottom: 1px solid #bcc3ca;
    }
    .project-form .form-control {
      border: 1px solid #bcc3ca;
    }
    .btnbottom {
      padding-bottom: 80px;
      @media only screen and (min-width: 1200px) {
        padding-bottom: 180px;
      }
    }

    .table-analytics {
      tbody {
        background: #fff;
      }
    }

    .adh-anchorStyle {
      width: 100%;
      text-decoration: underline;
      color: #c10e21;
      cursor: pointer;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 23px;
      font-family: Montserrat;
    }
    .clientnameellipse {
      display: block;
      width: calc(100% - 15px);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .codestyle {
      display: inline-block;
      width: calc(100% - 15px);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .aui-responsive-status-table tbody .ellipses {
      @media screen and (min-width: 320px) and (max-width: 411px) {
        left: 10%;
      }
    }
    .aui-responsive-status-table tbody .ellipses {
      @media screen and (min-width: 412px) and (max-width: 767px) {
        left: 8%;
      }
    }
    .aui-responsive-status-table tbody .ellipses {
      @media screen and (min-width: 768px) and (max-width: 991px) {
        left: 6%;
      }
    }
    .aui-responsive-table {
      tbody {
        td {
          vertical-align: middle;
        }
        td:nth-child(1) {
          width: 12%;
        }
        td:nth-child(3),
        td:nth-child(4),
        td:nth-child(5),
        td:nth-child(6) {
          width: 15%;
        }
      }
      .chart-container {
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;

        .legends {
          > p {
            &::before {
              content: "";
              width: 20px;
              height: 10px;
              border: 1px solid transparent;
              float: left;
              margin-top: 5px;
              margin-right: 5px;
            }
          }
          .purchase-clr {
            &::before {
              background-color: #ff9100;
            }
          }
          .course-clr {
            &::before {
              background-color: #ffce00;
            }
          }
          .learner-clr {
            &::before {
              background-color: #ff5c9e;
            }
          }
          .option4-clr {
            &::before {
              background-color: #dd004a;
            }
          }
        }
      }

      .chart-detail {
        flex-direction: row;
        width: 100%;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;

        > p {
          &:nth-child(1) {
            width: 100%;
          }
          &:nth-child(2) {
            width: 50%;
            font-size: 1.2rem;
          }
        }
        .chart-detail-arrow {
          position: relative;
          color: green;
          font-size: 14px;
          font-weight: bold;
          &::after {
            content: "";
            background: url(../images/up-arrow.png) no-repeat 0 0px;
            width: 20px;
            height: 40px;
            background-repeat: no-repeat;
            display: flex;
            top: -1.5rem;
            position: absolute;
            left: 6px;
            background-size: 60%;
          }
        }
      }

      .chart-detail.down {
        .chart-detail-arrow {
          color: #eb0f25;
          font-weight: bold;
          &::after {
            background: url(../images/down-arrow.png) no-repeat 0 0px;
            background-size: 60%;
          }
        }
      }
    }

    .nats-subscp-section {
      > .inner-subscp-section {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        padding-right: 20px;
      }

      > .inner-subscp-section.monitoring {
        border: 1px solid #fff;
        border-radius: 10px;
        justify-content: space-between;
        border-right-width: 3px;
        border-radius: 5rem;
        background: #fff;
      }

      > .inner-subscp-section.subscription {
        border-right-width: 3px;
        border-radius: 5rem;
        background: #fff;
      }

      .monitoring-wrapper {
        display: flex;
        width: 35%;
        height: 100%;
        background-color: #0084ce;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-weight: bold;
        border-top-left-radius: 1rem;
        border-bottom-left-radius: 1rem;
      }

      .subscription-wrapper {
        display: flex;
        width: 35%;
        height: 100%;
        background-color: #343a40;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-weight: bold;
        border-top-left-radius: 1rem;
        border-bottom-left-radius: 1rem;
      }
    }

    .noBtnStyle {
      background: none;
      border: none;
    }

    .connection-td-wrapper {
      position: relative;
      .popoverWrapper {
        position: absolute;
        top: 2.2rem;
        left: -5rem;
        width: 9.4rem;
        background: #fff;
        padding: 20px;
        box-shadow: 0px 3px 6px #00000029;
        border: 1px solid #e3e3e3;
        z-index: 6;

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

    .svg-parent.position-relative {
      display: inline-block;
      margin: 0px 4px;
      .invisible-cls {
        opacity: 0;
        z-index: -5;
        left: -9999px;
      }

      svg.position-relative {
        margin: 0px 4px;
      }
    }

    .addClientsBtn {
      font-size: 14px;
      padding: 0.75rem 2rem;
      line-height: 1rem;
      @media only screen and (min-width: 1200px) {
        font-size: 16px;
      }
    }
    .visible_cls {
      display: block !important;
      z-index: 3 !important;
    }

    .page-sort {
      list-style-type: none;
      border: 1px solid rgb(227, 227, 227);
      padding: 0px;
      background: rgb(255, 255, 255);
      font-size: 12px;
      top: 19px;
      left: -37px;
      width: 4rem;

      > div {
        padding: 7px 9px 5px;
        border-bottom: 1px solid #e3e3e3;
      }
      > div.active,
      div:hover {
        color: #c10e21;
      }
    }

    .btnGrp-addTanant {
      justify-content: flex-end;
    }
    /* Ipad styles */
    @media screen and (min-width: 576px) and (max-width: 767px) {
      .form-group {
        .col-form-label,
        .col-form-label + div {
          -webkit-box-flex: 0;
          -ms-flex: 0 0 100%;
          flex: 0 0 100%;
          max-width: 100%;
        }
      }

      .btnGrp-addTanant {
        justify-content: center;
      }
    }

    .aui-responsive-status-table .tooltiptext {
      pointer-events: none;
      visibility: hidden;
      width: 7rem;
      background-color: black;
      color: rgb(255, 255, 255);
      text-align: center;
      border-radius: 6px;
      padding: 9px 0px;
      position: absolute;
      z-index: 1;
      bottom: 3.75rem;
      left: 0px;
      margin-left: 0.1rem;
      opacity: 0;
      transition: opacity 1s ease 0s;
      font-size: 12px;
      line-height: 20px;
      @media only screen and (min-width: 768px) {
        margin-left: -1.7rem;
      }
      @media only screen and (min-width: 375px) {
        margin-left: -1.89rem;
      }
      @media only screen and (min-width: 1200px) {
        margin-left: 0.81rem;
      }
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
    .boldCount {
      font-weight: 500;
    }
    .page-sort {
      list-style-type: none;
      border: 1px solid rgb(227, 227, 227);
      padding: 0px;
      background: #fff;
      font-size: 14px;
      top: 23px;
      left: -27px;
      width: 54px;

      > div {
        text-align: center;
        border-bottom: 1px solid #e3e3e3;
        line-height: 2.2;
      }
      > div.active,
      div:hover {
        color: #c10e21;
      }
    }
    .rotateArrow {
      transform: rotateZ(180deg);
    }
    .modalwidth {
      width: 583px;
    }
    @media only screen and (min-width: 1200px) {
    }
    [class^="aha-icon-"]:before,
    [class*=" aha-icon-"]:before {
      font-family: "fontello";
      font-style: normal;
      font-weight: normal;
      speak: never;
      display: inline-block;
      text-decoration: inherit;
      width: 1em;
      margin-right: 0.2em;
      text-align: center;
      font-size: 13px;
      /* opacity: .8; */
      font-variant: normal;
      text-transform: none;
      line-height: 1em;
      margin-left: 0.2em;
      /* font-size: 120%; */
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      /* text-shadow: 1px 1px 1px rgb(127 127 127 / 30%); */
    }
    .aha-icon-down-arrow-thin:hover {
      cursor: pointer;
    }
    button.rotate-90:hover ~ span.tooltiptext {
      visibility: hidden !important;
      opacity: 0 !important;
    }
    select + i {
      float: right;
      margin-top: -26px;
      position: relative;
      margin-right: 13px;
      pointer-events: none;
      background-color: #fff;
      padding-right: 5px;
      @media screen and (min-width: 320px) and (max-width: 576px) {
        margin-top: -20px;
      }
    }
    .forModal {
      font-size: 45%;
    }
    select.form-control {
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
      background-image: none;
      background-repeat: no-repeat;
    }
    .rotate {
      transform: rotate(180deg);
    }
    .box {
      position: relative;
    }

    .content {
      overflow: auto;
      width: 100%;
      height: 100%;
      @media only screen and (max-width: 1200px) {
        overflow: hidden;
      }
    }
    .fxdbtn {
      position: relative;
      bottom: 0rem;
      right: 0rem;
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
      z-index: 99;
    }
    i.aha-icon-arrow-down.forModal:before {
      font-size: 6px;
    }
    .filterhead {
      @media screen and (min-width: 992px) {
        margin-top: 24px;
      }
      @media screen and (max-width: 575px) {
        margin-top: 0 !important;
        padding-bottom: 24px;
      }
      .filterheadchild {
        padding-top: 10px;

        @media screen and (min-width: 576px) and (max-width: 767px) {
          justify-content: between;
        }
        @media screen and (max-width: 575px) {
          text-align: center;
          padding-bottom: 1rem;
          margin-right: 15px !important;
        }
      }
    }
  }

  .aui-modal.show {
    display: inline-block;
  }

  select + i {
    float: right;
    margin-top: -17px;
    position: relative;
    margin-right: 19px;
    pointer-events: none;
    background-color: rgb(255, 255, 255);
    padding-right: 5px;
  }

  .aha-icon-arrow-down::before {
    width: 10px;
    margin-right: 0.2em;
    text-align: center;
    font-variant: normal;
    text-transform: none;
    line-height: 1em;
    margin-left: 0.2em;
    font-size: 43%;
    font-weight: normal;
    top: -3px;
    position: absolute;
  }

  i.aha-icon-arrow-down.forModal::before {
    font-size: 6px;
  }

  select.form-control {
    appearance: none;
    background-image: none;
    background-repeat: no-repeat;
  }

  .modal-md {
    max-width: 36.5rem;
    @media screen and (min-width: 576px) and (max-width: 767px) {
      max-width: 497px;
    }
  }
`;
