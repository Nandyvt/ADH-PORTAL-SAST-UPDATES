import styled from "styled-components";

export const CustomTableWrapper = styled.div`
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
    border: solid 1px #777979;
    margin-right: 8px;
    position: relative;
    content: "";
    display: inline-block;
  }
  [type="checkbox"]:checked::before {
    border: 2px solid #777979;
  }

  [type="checkbox"]:checked::after {
    content: "";
    position: absolute;
    top: 0.35rem;
    left: 0.25rem !important;
    border: 2px solid #777979;
    border-top: none;
    border-right: none;
    height: 0.375rem;
    transform: rotate(-45deg);
    width: 0.75rem;
    border-color: #c10e21;
  }

  aui-table.aui-responsive-status-table {
    table {
      thead {
        .entityNameTableHeader {
          width: 15% !important;
        }
        .sourceTableHeader,
        .statusTableHeader,
        .consumerTableHeader,
        .createdAtTableHeader {
          width: 8% !important;
        }

        th {
          font-size: 0.875rem;
          .aui-th {
            padding: 0.5rem 0.625rem;
            /* padding: 0 0.75rem; */
            &::before {
              height: calc(100% - 2px);
              border-left: 1px solid #e3e3e3;
              top: 0px;
              @media screen and (max-width: 991px) {
                border-left: none;
              }
            }
            .aui-checkbox {
              margin: 2px;
              margin-top: 10px;
              height: 20px;
              width: 20px;
              cursor: pointer;
              position: relative;
              top: 2px;
              margin-right: 5px;
            }
          }
        }
        th:last-child {
          .aui-th {
            justify-content: center;
          }
        }
      }
      tbody {
        tr {
          td:first-child {
            .aui-td {
              @media screen and (max-width: 992px) {
                font-size: 0.875rem;
              }
            }
          }

          td:last-child {
            /*  .aui-td {
              justify-content: center;
              align-items: center;
            } */
          }
          td {
            .aui-td.lbl-text {
              > span {
                font-size: 12px;
                background-color: var(--table-td-labeltext-bg);
                padding: 0.25rem 0.5rem;
                border-radius: 4px;
                color: var(--primary-black-222328);
                font-weight: 500;
              }
            }
            .aui-checkbox {
              margin: 2px;
              height: 20px;
              width: 20px;
              @media screen and (min-width: 992px) {
                top: 5px;
                position: relative;
                margin-right: 4px;
                cursor: pointer;
              }
            }
          }
          label.lblStyles {
            display: inline-flex;
          }
        }
        .createdDateColWrapper p {
          margin-bottom: 5px;
        }
        [type="checkbox"] {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          position: relative;
          margin-right: 2px;
          top: 5px;
          @media screen and (min-width: 992px) {
            top: 0px;
          }
        }
        [type="checkbox"]::before {
          width: 20px;
          height: 20px;
          border: solid 1px #777979;
          margin-right: 8px;
          position: relative;
          content: "";
          display: inline-block;
        }
        [type="checkbox"]:checked::before {
          border: 2px solid #777979;
        }

        [type="checkbox"]:checked::after {
          content: "";
          position: absolute;
          top: 0.35rem;
          left: 0.25rem !important;
          border: 2px solid #777979;
          border-top: none;
          border-right: none;
          height: 0.375rem;
          transform: rotate(-45deg);
          width: 0.75rem;
          border-color: #c10e21;
        }
      }
    }
  }
`;
