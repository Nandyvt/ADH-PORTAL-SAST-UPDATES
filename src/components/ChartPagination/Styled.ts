import styled from "styled-components";

const ChartPaginationStyleWrapper = styled.div`
  width: 100%;
  font-size: 14px;
  line-height: 27px;

  .numberSections {
    margin-right: 10px;
    letter-spacing: 1px;
  }

  .noBtnStyle {
    background: none;
    border: 0px;
    line-height: 1;
    cursor: pointer;
    width: 24px;
    height: 24px;
    margin-right: 20px;
    background-color: #fff;
    i {
      &::before {
        margin-right: 0;
        margin-left: 0;
      }
    }
  }

  .noBtnStyle.firstBtn {
    margin-right: 6px;
  }

  button.noBtnStyle:disabled {
    cursor: not-allowed;
  }
  .arrow-style {
    font-size: 16px;
  }
  .inverseArrow {
    &::before {
      transform: rotate(-180deg);
    }
  }
`;

export default ChartPaginationStyleWrapper;
