import styled from "styled-components";

export const TransactionalLogsStyled = styled.div`
  /* .modal {
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
    }
  }

  .modal-dialog {
    margin: 0 !important;
  }
  .modal-fullscreen-sm-down .modal-content {
    @media (max-width: 575.98px) {
      height: 100vh;
      border: 0;
      border-radius: 0;
      padding: 0 !important;
    }
  } */
  .transactional-logs-main {
    padding-right: 15px;
    padding-left: 15px;
    .heading-border {
      border-bottom: 1px solid #cecece;
    }
  }
  .proj-heading {
    color: #222328;
    font-size: 30px;
    opacity: 1;
    @media screen and (min-width: 320px) and (max-width: 640px) {
      font-size: 22px;
    }
    @media screen and (max-width: 991px) {
      padding-bottom: 0;
    }
  }
  .project-table {
    thead {
      @media only screen and (min-width: 1200px) {
        th:nth-child(1) {
          width: 16% !important;
        }
        th:nth-child(3) {
          width: 14%;
        }
        th:nth-child(4) {
          width: 14%;
        }
      }
    }
  }
  .aui-responsive-status-table {
    thead {
      th {
        width: 12% !important;
        @media screen and (max-width: 1400px) {
          width: 11% !important;
        }
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
      th.optionalColumnErrorCode,
      th.optionalColumnEventType {
        width: 10% !important;
        @media screen and (max-width: 1400px) {
          width: 7% !important;
        }
      }
    }
    tbody {
      tr.aui-table-status-success {
        background-color: #ffffff00;
      }
    }
  }

  aui-responsive-status-table tbody tr.aui-table-status-success {
    background-color: red;
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
  }

  .connection-td-wrapper {
    position: relative;
    .popoverWrapper {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: self-start;
      padding: 0.5rem 1rem;
      top: -1.3rem;
      left: 52.5rem;
      width: 10.813rem;
      height: 5.688rem;
      background: #ffffff 0% 0% no-repeat padding-box;
      border: 1px solid #e3e3e3;
      opacity: 1;
      @media only screen and (max-width: 425px) {
        left: 11.1rem;
      }
      @media only screen and (min-width: 768px) {
        left: 28rem;
      }
      @media only screen and (min-width: 992px) {
        left: 31rem;
      }
      @media only screen and (min-width: 1024px) {
        left: 32.7rem;
      }
      @media only screen and (min-width: 1200px) {
        left: 52.3rem;
      }
      @media only screen and (min-width: 1440px) {
        left: 57rem;
      }
      @media only screen and (min-width: 1920px) {
        left: 57.7rem;
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
        color: #222328;
        background: none;
        border: none;
      }
    }
  }
  .visible_cls {
    display: block !important;
    z-index: 3 !important;
  }
  .svg-parent.position-relative {
    display: inline-block;
    margin: 0px 0px;
    .invisible-cls {
      opacity: 0;
      z-index: -5;
      left: -9999px;
    }

    svg.position-relative {
      margin: 0px 4px;
    }
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
    z-index: 202 !important;

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
  .filterHeaderChildElement {
    margin-bottom: 0.75rem;
  }
  @media screen and (min-width: 992px) {
    .filterSec {
      position: absolute;

      .multiSelectWrapper {
        position: relative;
        width: 14rem;
        background: #fff;
        padding: 30px 0px 0 0;
        box-shadow: 0px 3px 15px #00000029;
        border: 1px solid #bdc3c9;
        top: -26px;
        left: -10px;
        z-index: 99;
        line-height: 1.75;
        text-align: left;
        height: 15rem;
        overflow-y: auto;
        font-size: 14px;
        .form-check {
          padding-bottom: 0.5rem;
          padding-top: 0.5rem;
          padding-left: 2.75rem;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;

          &:hover {
            background: #2223280d;
            color: #222328;
          }
        }
        input[type="checkbox"] {
          left: 10px;
          width: 20px;
          height: 20px;
          top: 7px;
        }
        input[type="checkbox"]:checked + label:before {
          background-color: #fff;
          border: 2px solid #c10e21;
        }
        input[type="checkbox"]:checked + label:after {
          border: 2px solid #c10e21;
          border-top: none;
          border-right: none;
          height: 0.375rem;
          -webkit-transform: rotate(-45deg);
          -ms-transform: rotate(-45deg);
          transform: rotate(-45deg);
          width: 12px;
          top: 12px;
          left: 14px;
        }
        label {
          word-break: break-word;
          margin-bottom: 0;
          &::before {
            width: 20px;
            height: 20px;
            left: 10px;
            top: 7px;
          }
        }
      }
    }
  }

  .filterIconStyles .filterIconSmallScreen {
    cursor: pointer;
    z-index: 200;
    position: relative;
  }

  .filterIconStyles:hover {
    color: #c10e21;
  }
  .rotateArrow {
    transform: rotateZ(180deg);
  }

  div.project-table {
    table {
      thead {
        tr {
          th {
            &:nth-child(1) {
              .multiSelectWrapper {
                width: 13rem;
              }
              .placeHolderStyles {
                width: 10rem;
              }
              button.clearFilter.noBtnStyle {
                margin-left: 19%;
              }
            }
            &:nth-child(2) {
              .multiSelectWrapper {
                width: 9rem;
              }
              .placeHolderStyles {
                width: 7rem;
              }
              button.clearFilter.noBtnStyle {
                margin-left: 26%;
              }
            }
            &:nth-child(3),
            &:nth-child(4),
            &:nth-child(5) {
              .multiSelectWrapper {
                width: 9rem;
                height: auto;
              }
              button.clearFilter.noBtnStyle {
                margin-left: 25%;
              }
            }
          }
        }
      }
    }
    table.optCol-3 {
      thead {
        tr {
          th {
            &:nth-child(1) {
              .multiSelectWrapper {
                width: 12rem;
              }
            }
          }
        }
      }
    }
  }

  .placeHolderWrapper {
    position: relative;
    /* width: 77%; */
    border: 1px solid transparent;
    .placeHolderStyles {
      z-index: 200;
      display: inline-block;
      position: absolute;
      /* width: 100%; */
      height: 30px;
      background: #fff;
      top: -2px;
    }
  }

  .custTableWrapper {
    .multiSelectWrapper {
      top: 10px;
      left: -12.25rem;
      padding: 10px 0px 0 0;

      @media screen and (max-width: 991px) {
        background: #ffffff 0% 0% no-repeat padding-box;
        box-shadow: 0px 3px 15px #00000029;
        border: 1px solid #e3e3e3;
        width: 12rem;
        right: 0px;
        left: auto;
        top: 36px;
      }

      @media screen and (max-width: 575px) {
        top: 250px;
        right: 10px;
      }

      @media screen and (min-width: 576px) and (max-width: 991px) {
        right: -1rem;
        left: auto;
        top: 0;
      }

      .form-check {
        @media screen and (max-width: 991px) {
          margin: 0 10px 0 10px;
        }
        label::before {
          border: 2px solid #bdc3c9;
        }
        input[type="checkbox"]:disabled:checked + label:before {
          background-color: #fff !important;
          border: 2px solid #aaaaaa !important;
          opacity: 0.7;
        }
        input[type="checkbox"]:disabled:checked + label:after {
          border: 2px solid #aaaaaa;
          opacity: 0.7;
          border-top: none;
          border-right: none;
        }
      }
    }
    > img {
      cursor: pointer;
    }

    @media screen and (min-width: 576px) {
      .filterSec {
        position: relative;
        .multiSelectWrapper {
          position: absolute;
        }
      }
    }
    @media screen and (max-width: 991px) {
      .filterSec {
        .multiSelectWrapper {
          position: absolute;
          z-index: 99;
          .form-check {
            padding: 0.5rem 0.5rem 0.5rem 2.75rem;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;

            &:hover {
              background: #2223280d;
              color: #222328;
            }
          }
          input[type="checkbox"] {
            left: 10px;
            width: 20px;
            height: 20px;
            top: 7px;
          }
          input[type="checkbox"]:checked + label:before {
            background-color: #fff;
            border: 2px solid #c10e21;
          }
          input[type="checkbox"]:checked + label:after {
            border: 2px solid #c10e21;
            border-top: none !important;
            border-right: none !important;
            height: 0.375rem;
            -webkit-transform: rotate(-45deg);
            -ms-transform: rotate(-45deg);
            transform: rotate(-45deg);
            width: 12px;
            top: 12px;
            left: 14px;
          }
          label {
            word-break: break-word;
            margin-bottom: 0;
            &::before {
              width: 20px;
              height: 20px;
              left: 10px;
              top: 7px;
            }
          }
        }
      }
    }
  }

  .imgWrapper {
    cursor: pointer;
    > img {
      transition: all 1s ease;
    }

    .clickAnimate {
      transition: all 1s ease;
      transform: rotateZ(180deg);
    }
  }

  .tooltip-role {
    .tooltiptext {
      visibility: hidden;
      width: 5rem;
      background-color: black;
      color: #fff;
      text-align: center;
      border-radius: 6px;
      padding: 5px 0;
      position: absolute;
      z-index: 1;
      bottom: 1.75rem;
      left: -27px;
      opacity: 0;
      -webkit-transition: opacity 1s;
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
    i:hover ~ span.tooltiptext {
      visibility: visible;
      opacity: 1;
    }
    i.filterSecOpen:hover ~ span.tooltiptext {
      visibility: hidden;
      opacity: 0;
    }
  }

  .custTableWrapper.tooltip-role {
    position: relative;
    .tooltiptext {
      width: 7.2rem;
      bottom: 1.95rem;
      right: -2.75rem;
      left: auto;
      z-index: 1001;
    }
  }
  .custTableWrapper button:hover ~ span.tooltiptext,
  .custTableWrapper button:focus ~ span.tooltiptext {
    visibility: visible;
    opacity: 1;
    bottom: 2.4rem;
  }
  .boldCount {
    font-weight: 500;
  }

  .keydown-recordfilter {
    cursor: pointer;
  }

  .form-check {
    label::before {
      border: 2px solid #bdc3c9;
    }
  }
  [class^="aha-icon-"]:before,
  [class*=" aha-icon-"]:before {
    font-family: "fontello";
    font-style: normal;
    font-weight: normal;
    display: inline-block;
    text-decoration: inherit;
    /* width: 2em; */
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
  .red {
    color: #c10e21;
  }
  .aha-icon-down-arrow-thin:hover {
    cursor: pointer;
  }
  .noBtnStyle {
    background: none;
    border: none;
  }
  button.clearFilter.noBtnStyle {
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-size: 14px;
    margin-left: 15%;
    color: #222328;
    font-weight: 500;
    margin-top: 5px;
    line-height: 1.75;
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
      }
    }
    .filterchild {
      @media screen and (max-width: 575px) {
        margin-left: 10px;
      }
    }
  }

  @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
    .project-table table thead tr th:nth-child(1) .placeHolderStyles {
      width: 8rem !important;
    }
    div.project-table table thead tr th:nth-child(1) .multiSelectWrapper {
      width: 9rem;
    }
  }
  @media screen and (min-width: 992px) {
    .FST-grid {
      display: none;
    }
  }
  @media screen and (max-width: 576px) {
    .pageno-blocks {
      flex-direction: column;
    }
    .FST-block {
      justify-content: space-around !important;
      border: 1px solid #e3e3e3 !important;
    }
    .nav-menu-active {
      top: 201px !important;
    }
  }
  @media screen and (min-width: 417px) and (max-width: 576px) {
    .FST-block-sort {
      padding: 5px 40px 5px 40px !important;
    }
  }
  @media screen and (min-width: 357px) and (max-width: 416px) {
    .FST-block-sort {
      width: 33%;
      text-align: center;
      padding: 6px 0 !important;
    }
    .FST-block-filter,
    .FST-block-table {
      padding: 0 !important;
    }
  }
  @media screen and (min-width: 320px) and (max-width: 356px) {
    .FST-block-filter,
    .FST-block-table {
      padding: 0 !important;
    }
    .FST-block-sort {
      width: 33%;
      text-align: center;
      padding: 6px 0 !important;
    }
  }
  @media screen and (min-width: 992px) {
    .nav-menu {
      display: none;
    }
  }

  @media screen and (max-width: 991px) {
    .aui-responsive-status-table {
      tbody {
        tr {
          td {
            &:before {
              display: flex;
              flex-direction: row;
              align-items: center;
              padding: 0.75rem 0.625rem;
              font-weight: 600;
            }
          }
        }
      }
    }
    .table-img {
      display: none;
    }
    .FST-grid {
      display: block;
    }
    .FST-block {
      justify-content: center;
      align-items: center;
      border: 1px solid #e3e3e3;
      position: relative !important;
    }
    .FST-block-filter,
    .FST-block-sort,
    .FST-block-table {
      padding: 0.3rem 1rem;
    }
    .FST-block-filter {
      border: none;
    }
    .FST-block-sort {
      position: relative;
      border-left: 1px solid #e3e3e3;
      border-right: 1px solid #e3e3e3;
    }
    .FST-block-table {
      border: none;
      img {
        width: 1rem;
        margin-right: 3px;
        padding: 1px;
      }
    }
    .sort-drop,
    .filter-bar,
    .column-table {
      border: none;
      background: none;
      box-shadow: none !important;
      outline: none !important;
    }
    .sort-drop-menu {
      position: absolute;
      padding: 5px 5px;
      top: 37px;
      right: -1px;
      margin: 0;
      list-style: none;
      width: max-content;
      background: #ffffff 0% 0% no-repeat padding-box;
      box-shadow: 0px 3px 6px #00000029;
      border: 1px solid #e3e3e3;
    }
    .sort-menu-item {
      font: normal normal normal 14px/27px Montserrat;
      margin: 0px 5px;
    }
    .nav-menu {
      position: absolute;
      left: -116% !important;
      transition: 850ms;
    }
    .nav-menu-active {
      background: #ffffff;
      width: 298px !important;
      transition: 350ms;
    }
    .nav-menu-items {
      list-style: none;
      margin-bottom: 5px;
    }
    .navbar-toggle {
      text-align: end;
      > i {
        background: #c10e21 0% 0% no-repeat padding-box;
        color: white;
        padding: 2px 0px 7px 0px;
        margin-top: 3px;
      }
    }
    .sidebar-heading {
      text-align: left;
      font: normal normal 600 20px/27px Montserrat;
      padding-left: 18px;
    }
    .clr-btn {
      margin-right: 2.5rem;
      text-decoration: underline;
      color: rgb(193, 14, 33);
      cursor: pointer;
      font-weight: bold;
      font-size: 12px;
    }
    .nav-menu-content {
      list-style: none;
      padding-left: 18px;
      padding-bottom: 2rem;
    }
    .header-name {
      font: normal normal 600 16px/18px Montserrat;
      margin-bottom: 20px;
    }
    .form-check {
      margin-top: 20px;
    }
    .aui-th {
      margin-top: 20px;
    }
    .nav-menu-active [class*="optionalColumn"] {
      display: none;
    }
    .filter-popover-open {
      background: rgb(34 35 40 / 70%);
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      overflow: scroll;
      z-index: 1041;
    }

    .placeHolderWrapper {
      .multiSelectWrapper {
        .form-check {
          padding: 0.5rem 0.75rem 0.5rem 2.75rem;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;

          &:hover {
            background: #2223280d;
            color: #222328;
          }
          .labelHeading {
            font: 0.875rem;
            word-break: break-all;
          }
        }
        input[type="checkbox"] {
          left: 10px;
          width: 20px;
          height: 20px;
          top: 7px;
        }
        input[type="checkbox"]:checked + label:before {
          background-color: #fff;
          border: 2px solid #c10e21;
        }
        input[type="checkbox"]:checked + label:after {
          border: 2px solid #c10e21;
          border-top: none !important;
          border-right: none !important;
          height: 0.375rem;
          -webkit-transform: rotate(-45deg);
          -ms-transform: rotate(-45deg);
          transform: rotate(-45deg);
          width: 12px;
          top: 12px;
          left: 14px;
        }
        label {
          word-break: break-all;
          margin-bottom: 0;
          &::before {
            width: 20px;
            height: 20px;
            left: 10px;
            top: 7px;
          }
        }
        button .fst-title {
          font: 14px Montserrat !important;
        }
      }
    }
  }
  @media screen and (min-width: 576px) and (max-width: 991px) {
    button .fst-title {
      font: 14px Montserrat !important;
    }
  }
  @media screen and (min-width: 991px) {
    .no-data-comp {
      width: 86vw;
    }
  }
  .reload-btn {
    background: #c10e21;
    border: #c10e21;
    color: white;
    border-radius: 50px;
    padding: 4px 16px 4px 11px;
  }
  .aha-icon-filter-outline:before {
    position: relative;
    z-index: 201;
  }
  .aha-icon-filter:before {
    position: relative;
    z-index: 201;
  }
  table {
    td {
      * {
        user-select: text;
      }
    }
  }
  .optionalColumnTransactionID .optinalcolumn {
    width: calc(100% - 7px);
    max-height: 3.85rem;
    display: -webkit-box !important;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
  }

  .aui-input-search-icon {
    right: 1px;
    top: 41px;
    height: 38px;
    width: 38px;
    border: none;
    z-index: 201;
  }

  .export-Sort-Sec {
    margin: 1.5rem 0;
  }

  @media screen and (min-width: 320px) and (max-width: 575px) {
    .pagination-sec {
      flex-direction: column;
      align-items: center;
      justify-content: flex-start !important;

      .count-range-wrapper {
        padding-left: 0 !important;
      }

      .ml-mob-paginationwrapper {
        margin-left: -3rem;
      }

      .aui-pagination li.page-item > button {
        padding: 0.25rem 0.35rem;
      }
    }
  }
`;

export const SearchFieldStylesWrapper = styled.div`
  .searchWrapper {
    border: 1px solid #bcc3ca;
    border-radius: 0px;
    padding: 0px;
    min-height: 22px;
    position: relative;
    background: #fff;
    cursor: pointer;

    .searchField {
      font-size: 16px;
      line-height: 27px;
      position: relative;
      color: #222328;
      border: none;
      padding-right: 2.25rem;
    }

    .searchIcon {
      cursor: pointer;
      margin-left: 6px;
      border-radius: 2px;
    }
  }
`;
