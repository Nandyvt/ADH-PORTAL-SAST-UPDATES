import styled from "styled-components";

export const TransactionalTable = styled.div`
  .transactional-box {
    width: 100%;
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #d1d8de;
    border-radius: 4px;
    opacity: 1;
    @media screen and (max-width: 991px) {
      border: none;
    }
    @media screen and (min-width: 577px) {
      padding: 1rem;
    }
  }
  .heading {
    text-align: left;
    font: normal normal 500 18px/27px Montserrat;
    letter-spacing: 0px;
    color: #222328;
    opacity: 1;
    @media screen and (max-width: 360px) {
      font: normal normal 600 16px/27px Montserrat;
    }
  }
  .view-all {
    text-align: center;
    text-decoration: underline;
    font: normal normal 600 12px/17px Montserrat;
    letter-spacing: 0px;
    color: #c10e21;
    opacity: 1;
    vertical-align: middle;
  }
  .noBtnStyle {
    background: none;
    border: none;
    padding: 0;
  }
  .adh-anchorStyle {
    text-decoration: underline;
    color: #c10e21;
    cursor: pointer;
    font-weight: bold;
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
          font-size: 14px;
          line-height: 10px;
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
  }
`;
