import styled from "styled-components";

export const PieChartGraphWrapper = styled.div`
  .font-change {
    color: "#222328";
    font-size: 18px;
    font-weight: 500;
    line-height: 27px;
    font-family: Montserrat;
    @media (min-width: 320px) and (max-width: 374px) {
      font-size: 16px;
      padding-left: 0px !important;
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
  .echarts-wrapper {
    width: 100%;
    height: 100%;
  }
  .left-float {
    float: left;
    @media screen and (min-width: 320px) and (max-width: 575px) {
      padding-left: 15px !important;
      padding-right: 15px !important;
    }
    @media screen and (min-width: 576px) and (max-width: 767px) {
      padding-left: 20px !important;
      padding-right: 20px !important;
    }
  }
`;
