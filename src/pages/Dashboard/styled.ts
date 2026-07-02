import styled from "styled-components";

interface IProps {
  sideMenuState?: any;
}

export const SignInWrapper = styled.div<IProps>`
  @media screen and (min-width: 900px) and (max-width: 1025px) {
    min-width: ${(props) => (props.sideMenuState ? "65vw" : "88vw")};
  }
  .cred-status-bg {
    background-color: #fff;
    @media screen and (min-width: 820px) and (max-width: 991px) {
      padding-left: 15px !important;
      padding-right: 15px !important;
    }
  }

  .aha-certification-flex-logo {
    margin-bottom: 32px;
    @media only screen and (min-width: 992px) {
      margin-bottom: 49px;
    }
  }
  .l-block {
    position: relative;
    min-height: 100vh;
    > div {
      min-height: auto;
      @media only screen and (min-width: 992px) {
        min-height: 100vh;
      }
    }
    .l-block-bg {
      height: 508px;
      @media only screen and (min-width: 768px) {
        height: 654px;
      }
      @media only screen and (min-width: 992px) {
        height: auto;
      }
    }
  }
  .l-form {
    width: 92%;
    padding-top: 43px;
    padding-bottom: 36px;
    margin-bottom: 40px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0px 0px 18px #00000029;
    p {
      font-size: 16px;
      color: #6d6e71;
    }
    > div {
      padding: 0 18px;
    }
    @media only screen and (min-width: 576px) {
      width: 88%;
      padding-top: 45px;
      padding-bottom: 45px;
      > div {
        padding: 0 32px;
      }
      p {
        font-size: 18px;
      }
    }
    @media only screen and (min-width: 768px) {
      width: 86%;
      padding-top: 77px;
      padding-bottom: 92px;
      margin-bottom: 70px;
      > div {
        padding: 0 40px;
      }
      p {
        font-size: 18px;
      }
    }
    @media only screen and (min-width: 992px) {
      width: 100%;
      padding: 20px 0;
      margin-bottom: 0;
      box-shadow: none;
      > div {
        padding: 16px;
      }
      p {
        font-size: 22px;
      }
    }
  }
  .l-container {
    position: absolute;
    left: 0;
    top: 120px;
    @media only screen and (min-width: 768px) {
      top: 180px;
    }
    @media only screen and (min-width: 992px) {
      position: static;
    }
  }
  .btn {
    width: 100%;
    @media only screen and (min-width: 768px) {
      width: auto;
    }
  }
  .project-heading {
    font-size: 30px;
    padding-bottom: 1.5rem;
  }
  .aui-sidenav {
    border-radius: 8px;
    background-color: #fff;
    width: 100%;
    margin-bottom: 1rem;
    @media only screen and (min-width: 1200px) {
      width: 25%;
      margin-bottom: 3rem;
    }
  }
  .ul-list li {
    background-color: #c10e21;
    border-radius: 4px;
    margin: 10px;
  }
  .aui-sidenav ul li a {
    color: #fff;
    font-size: 16px;
    padding: 11px 18px;
  }
  .nav-sidebar-active {
    background-color: #85000e;
    color: #fff;
    border-radius: 4px;
  }
  .border-headings {
    border-bottom: 1px solid #d1d8de;
    padding-bottom: 20px;
  }
  .sub-heading-styles {
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 27px;
    font-family: Montserrat;
    @media only screen and (min-width: 768px) {
      font-size: 1.375rem;
    }
    @media only screen and (max-width: 767px) {
      font-size: 1.25rem;
    }
  }
  .active-menu {
    border-bottom: 3px solid #c10e21 !important;
    color: #c10e21 !important;
  }
  .ul-list li:first-child {
    margin: 15px 10px 5px;
  }
  .aha-card-sm .card-head-img {
    background-color: transparent;
    border-radius: 0;
    overflow: visible;
  }
  .bgcolor {
    background-color: #f1f4f9;
  }
  .aha-card-sm .card-body {
    color: #ffffff;
  }
  .dash-style {
    font-size: 28px;
  }
  .card-one {
    background: #c54c72 0% 0% no-repeat padding-box;
    border-radius: 10px;
    opacity: 1;
  }
  .card-one p,
  .card-two p,
  .card-three p,
  .card-four p,
  .card-five p {
    font-size: 14px;
    color: #fff;
  }
  .card-one-style {
    font-size: 16px !important;
    font-weight: 600;
    color: #fff;
  }
  .card-two {
    background: #1978b2 0% 0% no-repeat padding-box;
  }
  .card-three {
    background: #9f6303 0% 0% no-repeat padding-box;
  }
  .card-four {
    background: #118388 0% 0% no-repeat padding-box;
  }
  .card-five {
    background: #8c51d0 0% 0% no-repeat padding-box;
  }
  .scrollspy-example {
    position: relative;
    overflow: visible;
  }
  a:hover,
  a:focus,
  a:active {
    color: none !important;
    text-decoration: none !important;
  }
  .card-detail i {
    opacity: 30%;
    font-size: 2rem;
  }
  .card-detail i:before {
    margin: 0;
  }
  .visibililty {
    text-overflow: ellipsis;
  }
  .echart-wrapper {
    width: 100%;
    height: 100%;
  }
  .users-piechart-bg {
    background-color: #f1f9f9;
  }
  .piechart-bg {
    background-color: #f1f9f9;
    @media screen and (min-width: 320px) and (max-width: 768px) {
      margin: 0 -15px;
      width: calc(100% + 30px) !important;
    }
    @media screen and (min-width: 820px) and (max-width: 991px) {
      padding-left: 15px !important;
      padding-right: 15px !important;
    }
  }

  .channel-padding {
    @media screen and (min-width: 320px) and (max-width: 575px) {
      padding-left: 15px !important;
      padding-right: 15px !important;
    }
  }

  .cred-pie-bg {
    background-color: #feeeee;
    @media screen and (min-width: 320px) and (max-width: 768px) {
      margin: 0 -15px;
      width: calc(100% + 30px) !important;
    }
    @media screen and (min-width: 820px) and (max-width: 991px) {
      padding-left: 15px !important;
      padding-right: 15px !important;
    }
  }
  .channel-pd {
    @media screen and (min-width: 820px) and (max-width: 991px) {
      /* padding-left: 15px !important; */
      padding-right: 15px !important;
    }
  }
  .chart-title-pd {
    @media screen and (min-width: 320px) and (max-width: 575px) {
      padding-left: 15px !important;
      padding-right: 15px;
    }
  }
  .leaderBoard-bg {
    background-color: rgb(10 187 176 / 5%);
  }
  #chart-container {
    width: 600px;
    height: 400px;
  }
  .card-wrapper {
    @media screen and (min-width: 992px) {
      margin: 0px;
    }
    @media screen and (min-width: 320px) and (max-width: 991px) {
      column-gap: 0px;
      padding: 0;
    }
    .card {
      padding: 0.75rem 0.75rem !important;
      @media screen and (max-width: 576px) {
        height: auto;
      }
      @media screen and (min-width: 768px) and (max-width: 991px) {
        height: auto;
      }
      @media screen and (max-width: 992px) {
        padding: 1rem 1rem !important;
      }
      .card-img {
        width: 30px;
      }
    }
  }
  .aha-icon-dash-arrow-right:before {
    transform: rotate(270deg);
  }
  .topbtn {
    width: 48px;
    height: 48px;
    padding: 0;
    position: fixed;
    bottom: 20px;
    right: 20px;
    border: none;
  }
  .cardwidth {
    width: calc(20% - 18px);
    @media screen and (min-width: 768px) and (max-width: 992px) {
      width: 33%;
      padding: 0 1rem;
    }
    @media screen and (min-width: 576px) and (max-width: 767px) {
      width: 33%;
      padding: 0 1rem;
    }
    @media screen and (min-width: 320px) and (max-width: 575px) {
      width: 50%;
    }
  }
  .cardwidth:nth-child(n + 3) {
    @media screen and (min-width: 576px) and (max-width: 992px) {
      padding: 0px 4px 0px 6px !important;
    }
  }
  .cardwidth:nth-child(n + 4) {
    @media screen and (min-width: 576px) and (max-width: 992px) {
      width: 50%;
      padding-left: 0.85rem !important;
    }
  }
  .cardwidth:nth-child(n + 5) {
    @media screen and (min-width: 576px) and (max-width: 992px) {
      width: 50%;
      padding-left: 0.875rem !important;
      padding-right: 0.75rem !important;
    }
    @media screen and (min-width: 320px) and (max-width: 575px) {
      padding-right: 0.5rem !important;
    }
  }
  .card-spacing {
    @media screen and (min-width: 576px) and (max-width: 992px) {
      .cardwidth {
        width: 50%;
      }
    }
    @media screen and (min-width: 992px) {
      margin-left: 2px;
      .cardwidth {
        width: calc(25% - 30px);
        margin-right: 1.5rem;
      }
      .cardwidth:nth-child(n + 4) {
        margin-right: 0px !important;
      }
    }
    @media screen and (min-width: 320px) and (max-width: 991px) {
      .cardwidth {
        padding: 0px 8px !important;
      }
    }
  }
  .w-100 img {
    width: 100%;
  }
  .search-client {
    margin-left: 110px;
    border-bottom: 1px solid #bcc3ca;
  }
  .aha-icon-search:before {
    color: #bcc3ca;
  }
  .aui-responsive-status-table {
    tbody {
      tr.aui-table-status-red {
        background-color: #fff;
      }

      .connection-td-wrapper {
        justify-content: space-evenly;

        > i {
          font-size: 1.5rem;
        }

        > img {
          width: 18px;
          height: 18px;
          cursor: pointer;
        }
      }
    }

    thead {
      th {
        .aui-th {
          background: #59646f;

          color: #fff;
        }

        &:first-child {
          > .aui-th {
            border-top-left-radius: 5px;
          }
        }

        &:last-child {
          > .aui-th {
            border-top-right-radius: 5px;
          }
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
    padding-bottom: 180px;
  }

  .table-analytics {
    tbody {
      background: #fff;
    }
  }

  .adh-anchorStyle {
    text-decoration: underline;
    color: #c10e21;
    cursor: pointer;
    font-weight: bold;
  }

  .aui-responsive-table {
    tbody {
      td {
        vertical-align: middle;
      }

      @media screen and (min-width: 992px) {
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
        margin-top: -1rem;
        margin-left: 1.5rem;
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
    justify-content: space-between;
    > .inner-subscp-section {
      width: 46%;
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      align-items: center;
      padding-right: 20px;
      @media screen and (max-width: 992px) {
        width: 100%;
      }
    }

    > .inner-subscp-section.monitoring {
      border: 1px solid #fff;
      border-radius: 10px;
      justify-content: space-between;
      border-right-width: 3px;
      border-radius: 1rem 5rem 5rem 1rem;
      background: #fff;
      @media screen and (max-width: 992px) {
        width: 100%;
      }
    }

    > .inner-subscp-section.subscription {
      border-right-width: 3px;
      border-radius: 1rem 5rem 5rem 1rem;
      background: #fff;
      @media screen and (max-width: 992px) {
        margin-top: 2rem;
      }
    }

    .monitoring-wrapper {
      display: flex;
      width: 35%;
      height: 100%;
      background-color: #0076b9;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-weight: bold;
      border-top-left-radius: 1rem;
      border-bottom-left-radius: 1rem;
    }

    .subscription-wrapper {
      display: flex;
      width: 60%;
      height: 100%;
      background-color: #343a40;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-weight: bold;
      border-top-left-radius: 1rem;
      border-bottom-left-radius: 1rem;
      @media screen and (min-width: 992px) {
        margin-left: -1rem;
        width: 35%;
      }
    }
  }

  .AddClients-btn {
    padding: 0.75rem 1rem;
  }

  .card-detail {
    font-size: 1.25rem;
    color: #fff;
  }
  .font-14p {
    font-size: 14px;
  }

  .aui-responsive-table {
    tbody {
      tr {
        &:nth-child(even) {
          background-color: #fff;
        }
      }
    }
  }
  @media (min-width: 320px) and (max-width: 374px) {
    .chart-heading {
      display: inline-block;
      width: 70%;
    }
    .chart-dropdown {
      display: inline-block;
      width: 30%;
    }
  }
  @media screen and (max-width: 768px) {
    .mobPad0 {
      padding: 0;
    }
  }

  .marginAlign {
    margin-bottom: 1rem;
    @media screen and (max-width: 430px) {
      margin-right: 1rem;
      width: 100%;
      text-align: right;
      .noBtnStyle.nextBtn {
        margin-right: 0;
      }
    }
  }
  .large-tab {
    @media screen and (min-width: 767px) and (max-width: 991px) {
      padding-left: 0px !important;
      padding-right: 0px !important;
    }
  }
`;
export const AnotherWraper = styled.div``;
