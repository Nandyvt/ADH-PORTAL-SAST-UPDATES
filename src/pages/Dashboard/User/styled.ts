import styled from "styled-components";

export const BarGraphWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-left: 10px;
  padding-bottom: 20px;
  .marginAlign {
    align-self: flex-end;
  }
  .pagination {
    position: relative;
    left: 25px;
  }
  .font-change {
    color: "#222328";
    font-size: 18px;
    font-weight: 500;
    line-height: 27px;
    font-family: Montserrat;
  }
  .user-bar {
    height: 400px !important;
  }
`;
