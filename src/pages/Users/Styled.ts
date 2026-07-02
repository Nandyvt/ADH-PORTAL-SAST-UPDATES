import styled from "styled-components";

export const UserWrapperStyles = styled.div`
  min-width: 75vw;
  @media screen and (min-width: 1700px) {
    min-width: 65vw;
  }

  .arrow-icon aui-icon {
    &::part(icon) {
      color: var(--primary);
    }
  }
  .invite-user-text {
    font-size: 1rem !important;
    color: var(--primary);
    line-height: 18px;
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

  .roleDepFont {
    font-size: 12px;
    line-height: 17px;
  }

  .visible_cls {
    display: block !important;
    z-index: 7 !important;
  }

  .page-sort {
    list-style-type: none;
    border: 1px solid rgb(227, 227, 227);
    padding: 0px;
    background: rgb(255, 255, 255);
    font-size: 14px;
    top: 23px;
    left: -30px;
    width: 52px;

    > div {
      padding: 0;
      border-bottom: 1px solid #e3e3e3;
      line-height: 38px;
      text-align: center;
      cursor: pointer;
    }
    > div.active,
    div:hover {
      color: #c10e21;
    }
  }

  .inviteUserStyles {
    font-size: 1rem;
    padding: 0.75rem 1.75rem;
    line-height: 1rem;
    margin-top: -1rem;
  }
  .aui-sidenav {
    border-radius: 8px;
    background-color: #fff;
    width: 100%;
    margin-bottom: 1rem;
    @media only screen and (min-width: 1200px) {
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
  }
  .bgcolor {
    /*  background-color: #f1f4f9; */
  }
  .aha-card-sm .card-body {
    color: #ffffff;
  }
  .w-100 img {
    width: 100%;
  }
  .horizontal-line {
    border-bottom: 1px var(--cecece) !important;
  }
  .proj-heading {
    color: var(--primary-black);
    font-size: 30px;
    opacity: 1;
    font-weight: 400;
  }
  .clientText {
    color: var(--primary-black);
    font-size: 30px;
    opacity: 1;
    font-weight: 400;
  }
  .UsersText {
    color: #c10e21;
    font-size: 30px;
    opacity: 1;
    font-weight: 400;
  }
  .modal-title {
    color: var(--primary-black);
    opacity: 1;
    font-size: 16px;
    @media screen and (min-width: 576px) {
      font-size: 18px;
    }
  }
  .project-table {
    thead {
      @media only screen and (min-width: 1200px) {
        th:nth-child(1) {
          width: 15%;
        }
        th:nth-child(3) {
          width: 33%;
        }
        th:nth-child(4) {
          width: 14%;
        }
        th:nth-child(5) {
          width: 14%;
        }
        th:nth-child(6) {
          width: 12%;
        }
      }
    }
  }
  .searchbox {
    float: left;
  }
  .searchbtn {
    padding: 6px;
    font-size: 16px;
    width: 200px;
    border: none;
    color: var(--primary-black);
    background-color: #f1f4f9;
    @media only screen and (min-width: 1200px) {
      width: 400px;
    }
  }
  .searchbox button {
    padding: 8px;
    margin-top: 10px;
    margin-left: 10px;
    background: orange;
    font-size: 20px;
    border: none;
    cursor: pointer;
  }
  .searchbox button:hover {
    background: blue;
  }
  .search-client {
    margin-left: auto;
    border-bottom: 1px solid #bcc3ca;
    @media only screen and (min-width: 1200px) {
      margin-left: 110px;
    }
  }
  .aha-icon-search:before {
    color: #bcc3ca;
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
  .active-band {
    border-top: 4px solid var(--active-band) !important;
  }
  .inactive-band {
    border-top: 4px solid var(--dark) !important;
  }
  .pending-band {
    border-top: 4px solid var(--pending-band) !important;
  }

  .adh-anchorStyle {
    text-decoration: underline;
    color: #c10e21;
    cursor: pointer;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 27px;
    font-family: Montserrat;
    @media screen and(min-width: 320px) and (min-width: 991px) {
      line-height: 1.5rem;
    }
  }
  .name-ellipsis {
    width: calc(100% - 0px);
    max-height: 3.85rem;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    display: -webkit-box !important;
  }

  /* .aui-responsive-table {
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
  } */

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
    text-align: left;
  }

  .connection-td-wrapper {
    position: relative;
    .popoverWrapper {
      position: absolute;
      width: 10rem;
      background: #fff;
      padding: 1rem;
      box-shadow: 0px 3px 6px #00000029;
      border: 1px solid #e3e3e3;
      top: 0.7rem !important;
      left: -6rem;
      z-index: 99;
      line-height: 2;
      border-top: 4px solid var(--primary) !important;
      border: 1px solid var(--gray);
      @media only screen and (max-width: 575px) {
        left: -0.4rem;
      }
      @media only screen and (min-width: 576px) {
        left: -3.3rem;
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
        margin-bottom: 0 !important;
        width: 100%;
        text-align: left;
      }
      .ellipses {
        font-weight: bold;
        font-size: 1.5rem;
        letter-spacing: 0.4rem;
        cursor: pointer;
        color: #343a40;
        margin-top: -10px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        margin: 0;
        padding: 0;
      }
    }
  }

  .form-error-msg {
    color: #c10e21;
    font-weight: 500;
    font-size: 15px;
    margin-top: 5px;
  }

  .roleColumnWrapper {
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;

    .roleStylesMin {
      /* background: #f8f8f8 0% 0% no-repeat padding-box;
      border: 1px solid #e3e3e3; */
      padding: 3px 5px;
      max-width: 100%;
      width: auto;
      margin: 5px 0;
      text-align: left;
      margin-right: 0.625rem;
      border-radius: 4px;
      > p {
        font-size: 12px;
        margin-bottom: 0;
        line-height: 1.5;
        font-weight: 500;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      p.highlightDep {
        letter-spacing: 0px;
        color: #c10e21;
        font-size: 10px;
      }
      .helpTextStyles {
        padding-left: 3px;
        margin-top: -1px;
        cursor: pointer;
      }
      .helpTextStylesImg {
        width: 14px;
        margin-right: 4px;
      }
    }
    .roleStylesMin.roleColorCodeSA {
      background: var(--superAdmin-superUser-bgColor);
      > p {
        color: var(--superAdmin-superUser-color);
      }
    }

    .roleStylesMin.roleColorCodeCPU {
      background-color: var(--clientAdmin-bgColor);

      > p {
        color: var(--clientAdmin-color);
      }
    }

    .roleStylesMin.roleColorCodeEU {
      background-color: var(--endUser-bgColor);

      > p {
        color: var(--endUser-color);
      }
    }

    .roleStylesMin.roleColorCodeINACTIVE {
      position: relative;
      background-color: #7070701a;
    }

    .circleSec {
      width: auto;
      /* padding-left: 0.25rem; 
      position: relative;*/
      .circleWrapper {
        height: 25px;
        /* width: 30px; */
        background: #c10e21 0% 0% no-repeat padding-box;
        border: 1px solid #c10e21;
        border-radius: 2px;
        color: #fff;
        font-size: 12px;
        display: flex;
        font-weight: 500;
        justify-content: center;
        align-items: center;
        position: relative;
        z-index: 4;
        /* top: -0.85rem;
        left: 0rem; */
      }

      .circleWrapper:hover::before {
        content: "View More Roles";
        display: block;
        width: 7.5rem;
        background-color: black;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 5px 0;
        position: absolute;
        top: -2.5rem;
      }

      .circleWrapper.popover-open:hover::before,
      .circleWrapper.popover-open:hover::after {
        content: none;
      }
      .z-index-6 {
        z-index: 6;
      }

      .circleWrapper:hover::after {
        content: "";
        position: absolute;
        top: -9px;
        left: 50%;
        margin-left: -5px;
        border-width: 7px;
        border-style: solid;
        border-color: black transparent transparent transparent;
      }

      .roleSec {
        position: absolute;
        /* bottom: -8.2rem;
        left: -0.75rem; */
        width: 23rem;
        background: #fff;
        padding: 0.75rem 0rem;
        padding-bottom: 0;
        box-shadow: 0px 3px 6px #00000029;
        border: 1px solid #e3e3e3;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        z-index: 5;
        padding: 0.625rem;
        padding-top: 2.5rem;
        padding-bottom: 5px;
        @media screen and (min-width: 320px) and (max-width: 991px) {
          width: 15rem;
        }
        .roleStylesMin {
          display: inline-block;
        }
        > p {
          border-bottom: 1px solid #e6e6e6;
          margin-bottom: 0.5rem;
          padding-left: 1rem;
          padding-bottom: 6px;
          line-height: 20px;
          &:last-child {
            border: none;
            padding-bottom: 0;
          }
        }
      }
    }
  }
  .tooltip-role {
    position: relative;
    display: inline-block;

    .tooltiptext {
      visibility: hidden;
      width: 5.5rem;
      background-color: black;
      color: #fff;
      text-align: center;
      border-radius: 6px;
      padding: 5px 0;
      position: absolute;
      z-index: 5;
      bottom: 1.75rem;
      left: 0;
      margin-left: -2.3rem;
      opacity: 0;
      -webkit-transition: opacity 1s;
      transition: opacity 1s;
      font-size: 12px;
      line-height: 20px;
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
    .tooltiptext.viewMoreKebab {
      left: -1.47rem;
      bottom: 1.7rem;
      margin-left: 0;
    }
  }
  .border-grey {
    border: 1px solid #bcc3ca;
  }
  /* .aui-responsive-status-table tbody tr.aui-table-status-normal {
    border-left: 4px solid #343a40;
  } */
  .rotate-90 {
    transition: all 0.3s ease 0s;
    color: rgb(193, 14, 33) !important;
    padding-left: 4px !important;
    /* padding-left: 10px !important; */
  }
  .rotate-90-anti {
    transition: 0.3s;
    transform: rotateZ(0deg);
  }
  .rotate-90-anti {
    transition: 0.3s;
    transform: rotateZ(0deg);
    /* padding-left: 10px !important; */
  }

  .tooltip-role .helpTextStyles:hover + span.tooltiptext {
    visibility: visible;
    opacity: 1;
  }
  .tooltip-role .circleWrapper ~ span.tooltiptext {
    width: 8rem;
    padding: 5px 10px;
    bottom: 2.25rem;
    margin-left: -3.15rem;
  }
  .tooltip-role .circleWrapper:hover ~ span.tooltiptext {
    visibility: visible;
    opacity: 1;
  }
  .actions-column .tooltip-role button:hover ~ span.tooltiptext {
    visibility: visible;
    opacity: 1;
  }
  .actions-column .tooltip-role button.rotate-90:hover ~ span.tooltiptext {
    visibility: hidden;
    opacity: 0;
  }
  .tooltip-role .select-client select:focus ~ span.tooltiptext,
  .tooltip-role .select-client select:hover ~ span.tooltiptext {
    visibility: visible;
    opacity: 1;
  }
  .select-client .tooltip-role {
    margin-left: 0px !important;
  }
  .select-client .tooltiptext {
    width: auto;
    padding: 5px 7px;
    bottom: 2.85rem;
    left: 10rem;
  }
  .inviteUserBtn {
    font-size: 16px;
    padding: 0.75rem 1.75rem;
    line-height: 15px;
    margin-left: 1.25rem;
  }

  .row-gap {
    row-gap: 1rem;
  }

  .searchField {
    font-size: 16px;
    line-height: 27px;
    position: relative;
    color: var(--primary-black);
    border: none;
    padding-right: 2.25rem;
  }
  .searchIcon {
    cursor: pointer;
    margin-left: 6px;
    border-radius: 2px;
    img {
      width: 24px;
      height: 24px;
      @media screen and (min-width: 767px) and (max-width: 576px) {
        top: 0.2rem;
      }
    }
  }

  [type="checkbox"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    position: relative;
    margin-right: 2px;
  }
  [type="checkbox"]::before {
    width: 20px;
    height: 20px;
    border: solid 1px #bdc3c9;
    margin-right: 15px;
    position: relative;
    content: "";
    display: inline-block;
    /* top: 4px; */
  }
  [type="checkbox"]:checked::before {
    border: 2px solid #c10e21;
  }

  [type="checkbox"]:checked::after {
    content: "";
    position: absolute;
    top: 0.357rem;
    left: 0.25rem !important;
    border: 2px solid #c10e21;
    border-top: none;
    border-right: none;
    height: 0.375rem;
    transform: rotate(-45deg);
    width: 0.75rem;
    border-color: #c10e21;
  }

  .clearMultiSelectWrapper {
    position: relative;
    .clearMultiSelect {
      position: absolute;
      z-index: 999;
      right: 1.2rem;
      top: 0.575rem;
    }
  }

  .aha-icon-cancel-icon {
    &::before {
      font-size: 1.2rem;
      left: -0.75rem;
      top: 0.2rem;
    }
  }

  .aha-icon-arrow-down {
    &::before {
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
  }

  .icon_down_dir:before {
    display: none;
  }

  .boldCount {
    font-weight: 500;
  }

  .keydown-recordfilter {
    svg {
      color: var(--primary-black);
    }
  }

  .page-link {
    border: 1.6px solid #dddddd;
  }

  .roleColumnWrapper {
    padding: 0.625rem;
  }

  .btnEllipses {
    cursor: pointer;
  }

  /* .aui-responsive-status-table tbody td[data-title="Role"] .aui-td p {
    margin-bottom: 0;
  } */

  .multiSelectContainer {
    li {
      word-break: break-all;
      display: inline-flex;
      flex-direction: row;
      width: 100%;
    }
  }
  .btnEllipses:focus {
    padding: 1px 4px;
  }
  .btn.btn-primary:disabled {
    box-shadow: none;
    background-color: #aaaaaa;
    border: 2px solid #aaaaaa;
    color: #ffffff !important;
  }
  label {
    pointer-events: none;
  }

  .modalwidth {
    max-width: 583px;
    @media screen and (min-width: 320px) and (max-width: 575px) {
      max-width: 36.5rem;
    }
  }

  .error-block {
    background-color: var(--error-box-color);
    background-clip: content-box;
    box-shadow: 0px 3px 6px var(--box-shadow-color);
  }
  .warning-icon {
    color: var(--warning-icon-color);
  }
  .error-message {
    color: var(--error-text-color);
    text-align: left;
    font-weight: 600;
    font-size: 0.8rem;
    line-height: 1.3rem;
  }
  .edit-user {
    color: #c10e21;
    font-size: 0.8rem;
    line-height: 1rem;
    text-decoration: underline;
    font-weight: 600;
  }

  select + i {
    float: right;
    margin-top: -17px;
    position: relative;
    margin-right: 19px;
    pointer-events: none;
    background-color: #fff;
    padding-right: 5px;
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
    margin-top: -20px !important;
    margin-right: 9px !important;
  }
  .pageNumber:before {
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
  [class^="aha-icon-meat-balls"]:before {
    font-family: "fontello";
    font-style: normal;
    font-weight: normal;
    speak: never;
    display: inline-block;
    -webkit-text-decoration: inherit;
    text-decoration: inherit;
    width: 1em;
    margin-right: 0.2em;
    text-align: center;
    font-size: 24px;
    font-variant: normal;
    margin-top: 0.2rem;
    text-transform: none;
    line-height: 1em;
    margin-left: 0.2em;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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
    transition: bottom 0.3s !important;
  }
  i.aha-icon-arrow-down.forModal:before {
    font-size: 6px;
  }
  .addClientsBtn {
    font-size: 14px;
    padding: 0.75rem 2rem;
    line-height: 1rem;
    @media only screen and (min-width: 1200px) {
      font-size: 16px;
    }
  }
  .fxdbtn {
    position: relative;
    bottom: 0;
    margin: 12px 15px;
    width: 92%;
    border-radius: 50px;
    font-size: 16px;
    line-height: 1.5;
    padding: 0.5rem 1.375rem;
  }

  .d-onlyMobile {
    display: none;
  }

  .search-onlyMobile {
    display: none;
  }

  @media screen and (min-width: 576px) and (max-width: 991px) {
    .roleStyles-2 .roleBasedStyle-dropdown > div:nth-child(2) {
      padding-top: 0rem !important;
    }
    /* .aui-responsive-status-table tbody tr td:before {
      display: flex;
      padding: 0.625rem 1rem 0.625rem;
      align-items: center;
    } */
  }

  @media screen and (min-width: 320px) and (max-width: 575px) {
    .roleStyles-2 .roleBasedStyle-dropdown > div:nth-child(2) {
      padding-top: 1rem !important;
    }
    .container .mobTableSec {
      margin-top: -2rem !important;
    }
    .roleBasedStyle-dropdown {
      display: none;
    }
    .roleBasedStyle-dropdown.toggleOpen {
      position: relative;
      background-color: white;
      display: flex;
      margin-bottom: 4rem !important;
    }

    .rotateInverse {
      transform: rotateZ(-180deg);
    }
    .search-onlyMobile {
      display: flex;
    }
    .d-onlyMobile {
      display: flex;
      align-items: flex-start;
      font-size: 14px;
      color: var(--primary-black);
      font-weight: 500;
      width: 100%;
      border: 1px solid #e3e3e3;
      justify-content: center;
      padding: 8px 0;
      margin-top: 1rem;
    }
    .redColorIcon {
      color: #c10e21;
    }
    .bg-selected {
      background-color: #e8e8e9;
    }
    .filter-label {
      font-size: 14px;
      line-height: 23px;
      font-weight: 500;
      color: var(--primary-black);
      padding: 0 5px;
    }
    .searchIcon::after {
      top: 0.2rem;
    }
    .tenantFilterWrapper .pt-2 {
      padding-top: 1rem !important;
      @media screen and (min-width: 576px) {
        margin-bottom: 30px;
        .modal-md {
          max-width: 32.5rem !important;
        }
      }
    }
  }
  .filterhead {
    @media screen and (max-width: 575px) {
      margin-top: 0 !important;
    }
    .filterheadchild {
      padding-top: 10px;
      @media screen and (min-width: 576px) and (max-width: 767px) {
        justify-content: between;
        margin-top: 20px;
      }
      @media screen and (max-width: 575px) {
        text-align: center;
        padding-bottom: 15px;
      }
    }
    .filterchild {
      @media screen and (max-width: 575px) {
        margin-left: 10px;
      }
    }
  }
  @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
    .project-table thead th:nth-child(5),
    .project-table thead th:nth-child(4) {
      width: 12%;
    }
    .project-table thead th:nth-child(3) {
      width: 40%;
    }
  }

  .modal-md {
    max-width: 36.5rem;
    @media screen and (min-width: 576px) and (max-width: 767px) {
      max-width: 497px;
    }
  }
  .modal-content {
    border: none;
    @media screen and (min-width: 576px) {
      height: auto;
    }
  }
  .modal-header {
    border-bottom: 0.0625rem solid #e3e3e3;
    margin-bottom: 1.25rem;
    padding-bottom: 1rem;
    justify-content: flex-start;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-bottom: 1rem;
  }
  .invite-text {
    font-size: 18px;
    @media screen and (min-width: 320px) and (max-width: 575px) {
      font-size: 16px;
    }
  }
  .modal-dialog {
    @media only screen and (max-height: 577px) and (max-width: 900px) and (orientation: landscape) {
      margin: 1.26rem auto;
    }
  }

  [aria-label="confirmation modal window"]
    .modal-dialog.modalwidth.inviteuser-modal
    .modal-content {
    height: inherit;
  }

  .modal-fullscreen-sm-down {
    width: 100vw;
    max-width: none;
    height: 100vh;
    margin: 0;
    @media screen and (min-width: 768px) {
      margin: 9.75rem auto;
      max-width: 36.5rem;
    }
  }
  .margin-sm {
    @media screen and (min-width: 320px) and (max-width: 575px) {
      margin: 0 !important;
    }
  }
  @media screen and (min-width: 320px) and (max-width: 576px) {
    .usersFilterSec {
      width: 100%;
      justify-content: center;
      .show-filter {
        border: 1px solid #e3e3e3;
        padding: 8px 0;
        width: 100%;
        display: flex;
        justify-content: center !important;
      }
    }
  }
  .modal-fullscreen-sm-down .modal-content {
    @media (max-width: 575.98px) {
      height: 100%;
      border: 0;
      border-radius: 0;
    }
  }
  .tenantText {
    color: var(--primary);
  }
  .cancel-btn {
    @media screen and (min-width: 320px) and (max-width: 575px) {
      display: none;
    }
  }
  .invite-btn {
    @media screen and (min-width: 320px) and (max-width: 575px) {
      display: none;
    }
  }
  .btnbottom {
    right: 0;
    bottom: 0;
  }
  .invite-sm-btn {
    @media screen and (min-width: 320px) and (max-width: 575px) {
      width: 92vw;
      position: fixed;
      margin-bottom: 20px;
      bottom: 0;
      justify-content: center;
    }
  }
  .modal-dialog.inviteuser-modal {
    @media all and (device-width: 1024px) and (device-height: 768px) and (orientation: landscape) {
      top: 0% !important;
    }
  }

  .inviteuser-modal .modal-content .pad-styles-sml {
    @media screen and (min-width: 320px) and (max-width: 575px) {
      padding: 1rem;
    }
  }

  .inviteuser-modal.modal-popup-inviteUser .modal-content {
    @media screen and (min-width: 320px) and (max-width: 575px) {
      min-height: 100vh;
    }
  }
  .search-label {
    margin-bottom: 0.5rem;
    > span {
      margin-right: 0.25rem;
    }
  }

  .no-data-popup {
    flex-direction: column;
    .search-popover {
      position: absolute;
      width: 100%;
      top: 4.6rem;
      z-index: 1;
      @media screen and (min-width: 320px) and (max-width: 576px) {
        top: 4rem;
      }
      .popoverWrapper {
        background: #ffeded;
        padding: 8px;
        box-shadow: 0px 3px 6px #00000029;
        border: 1px solid #f23a3c;
        left: -19.85rem;
        top: 1rem;
        z-index: 99;
        font-size: 14px;
        font-weight: 600;
        display: flex;
        margin-right: 30px;
        &::before {
          content: "";
          display: block;
          position: absolute;
          left: 32px;
          bottom: 100%;
          width: 0;
          height: 0;
          border: 9px solid transparent;
          border-bottom-color: #f23a3c;
        }
        &::after {
          content: "";
          display: block;
          position: absolute;
          left: 32px;
          bottom: 100%;
          width: 0;
          height: 0;
          border: 9px solid transparent;
          border-bottom-color: #ffeded;
          top: -1rem;
        }

        i {
          padding: 4px;
        }
      }
    }
  }

  .reload-btn {
    background: #c10e21;
    border: #c10e21;
    color: white;
    border-radius: 50px;
    padding: 4px 16px 4px 11px;
  }
  .aui-modal.show {
    display: inline-block;
  }
  .instruction {
    color: #555;
    font-size: 14px;
    font-weight: 500;
  }
  @media screen and (max-width: 575px) {
    .instruction {
      font-size: 12px;
      margin-bottom: 0px;
      margin-top: 1rem;
    }
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

  .aui-block-loader {
    @media screen and (max-width: 575px) {
      min-height: 100vh;
    }
  }
  .clientText {
    font-size: 30px;
    opacity: 1;
    font-weight: 400;
  }
  .roleName {
    font-weight: 600;
  }
  .roleClientName {
    font-weight: 600;
    padding-right: 4px;
  }
  .user-heading {
    color: #222328;
    font: normal normal normal 30px/37px Montserrat;
    @media only screen and (max-width: 576px) {
      font-size: 22px;
    }
  }
  .header-bottom {
    border-bottom: 1px solid var(--cecece);
  }
`;

export const AnotherWraper = styled.div``;
