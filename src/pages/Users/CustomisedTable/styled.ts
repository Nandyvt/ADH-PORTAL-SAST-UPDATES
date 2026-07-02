import styled from "styled-components";

export const CustomTableWrapper = styled.div`
  aui-table.aui-responsive-status-table {
    thead {
      background-color: #e3e3e3;
      .action-col {
        width: 13% !important;
      }
      .status-col {
        width: 12% !important;
      }
      th {
        .aui-th {
          background: #f8f8f8;
          color: var(--primary-black);
          font-weight: 500;
          font-size: 1rem;
          line-height: 1.5rem;
          font-family: Montserrat;
          /* padding: 0 0.75rem; */
          &::before {
            height: calc(100%);
            border-left: 1px solid #e3e3e3;
            top: 0px;
            @media screen and (max-width: 991px) {
              border-left: none;
            }
          }
          .placeHolderWrapper {
            position: relative;
            border: 1px solid transparent;
          }
        }
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
      tr {
        td:before {
          font-size: 1rem;
          line-height: 24px;
          @media screen and (min-width: 320px) and (max-width: 768px) {
            font-size: 14px;
            padding: 0.75rem 0.75rem 0 !important;
          }
          @media screen and (min-width: 769px) and (max-width: 991px) {
            padding: 0.75rem 0.75rem 0.75rem 0.6875rem !important;
          }
        }
        td:first-child {
          :before {
            line-height: 30px;
          }
        }
        td:last-child {
          :before {
            line-height: 28px;
          }
        }

        td:last-child {
          .aui-td {
            justify-content: left;
            padding-left: 2px !important;
            @media screen and (min-width: 992px) {
              justify-content: center;
            }
          }
        }
      }
    }
  }
`;
