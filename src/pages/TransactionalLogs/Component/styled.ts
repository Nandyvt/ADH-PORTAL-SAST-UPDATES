import styled from "styled-components";

export const TransactionalLogsFilterStyled = styled.div`
  .transactional-logs-filter-lg {
    .export-Sort-Sec {
      .export-button {
        color: #c10e21;
        .export-img {
          position: relative;
          bottom: 2px;
        }
      }
      display: flex;
      flex-wrap: wrap;
      .refresh-icon {
        cursor: pointer;
        margin-bottom: 2px;
      }
      .sort-icon-span {
        cursor: pointer;
        padding-inline: 10px;
        width: 25px;
        margin-bottom: 2px;
      }
      .rotate {
        transform: translateX(10px) rotateZ(90deg);
      }
    }
    .created-date {
      font-weight: 500;
      padding-left: 5px;
    }
  }

  .calendar-icon {
    position: absolute;
    right: 1px;
    top: 41px;
    z-index: 99;
    padding: 7px 10px;
    background-color: var(--datepicker-icon-bgColor) !important;
  }

  .noBtnStyle {
    background: none;
    border: 0px;
    line-height: 1;
    cursor: pointer;
    background-color: #fff;
  }
`;

export const TransactionalLogsFilterTabStyled = styled.div`
  .transactional-logs-filter-md {
    .multiSelectWrapper {
      top: auto;
      left: auto;
      margin-right: 20px;
    }
    .export-Sort-Sec {
      .export-button {
        color: #c10e21;
        .export-img {
          position: relative;
          bottom: 2px;
        }
      }
      display: flex;
      flex-wrap: wrap;
      .refresh-icon {
        cursor: pointer;
        margin-bottom: 2px;
      }
      .sort-icon-span {
        cursor: pointer;
        padding-inline: 10px;
        width: 25px;
        margin-bottom: 2px;
      }
      .rotate {
        transform: translateX(10px) rotateZ(90deg);
      }
    }
    .created-date {
      font-weight: 500;
      padding-left: 5px;
    }
    #select-all-mobile {
      left: -16px !important;
      top: 18px !important;
    }
    .form-check {
      padding: 0.5rem 0rem 0.5rem 1.75rem !important;
    }
    [type="checkbox"] {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      position: relative;
      padding: 0px;
      width: 20px;
      height: 20px;
      left: -18px !important;
      top: -4px !important;
    }
    [type="checkbox"]::before {
      width: 20px;
      height: 20px;
      border: solid 1px #777979;
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

  button.noBtnStyle.calendar-icon {
    position: absolute;
    right: 1px;
    top: 41px;
    z-index: 99;
    padding: 7px 10px;
    background-color: var(--datepicker-icon-bgColor) !important;
  }
`;

export const TransactionalLogsFilterMobileStyled = styled.div`
  .transactional-logs-filter-sm {
    .btn-transactionallog-mob {
      border: 1px solid #e5e5e5;
      border-radius: 0px;
      width: 100%;
      height: 38px;
      margin-bottom: 10px;
      padding: 0.5rem 2.5rem;
    }
    .filter-label {
      font-size: 14px;
      line-height: 23px;
      font-weight: 500;
      color: var(--primary-black);
      padding: 0 5px;
    }
    .bg-selected {
      background-color: #e8e8e9;
    }
    .export-img {
      position: relative;
      bottom: 2px;
    }
    .form-check {
      padding: 0.5rem 0rem 0.5rem 1.75rem !important;
    }
    .created-date {
      font-weight: 500;
      padding-left: 5px;
    }
    [type="checkbox"] {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      position: relative;
      padding: 0px;
      width: 20px;
      height: 20px;
      left: -14px !important;
      top: -1px !important;
    }
    [type="checkbox"]::before {
      width: 20px;
      height: 20px;
      border: solid 1px #777979;
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
`;
