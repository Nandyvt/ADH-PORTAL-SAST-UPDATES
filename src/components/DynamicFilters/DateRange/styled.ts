import styled from "styled-components";

const DateRangeWrapper = styled.div`
  .calendar-icon {
    position: absolute;
    right: 1px;
    top: 36px;
    z-index: 99;
    padding: 5.32px 4px;
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

export default DateRangeWrapper;
