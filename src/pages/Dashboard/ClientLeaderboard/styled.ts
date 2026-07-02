import styled from "styled-components";

export const LeaderBoardBarGraphWrapper = styled.div`
  width: 100%;
  height: 100%;
  i.aha-icon-arrow-down.forModal:before {
    font-size: 6px;
  }
  select + i {
    float: right;
    margin-top: -33px;
    position: relative;
    margin-right: -3px;
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
    margin-top: -30px !important;
    margin-right: -3px !important;
  }
  .font-change {
    color: #222328;
    font-size: 18px;
    font-weight: 500;
    line-height: 27px;
    font-family: Montserrat;
  }
  .clientsbar {
    height: 370px !important;
  }
`;
