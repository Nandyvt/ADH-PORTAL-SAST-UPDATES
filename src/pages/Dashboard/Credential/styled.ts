import styled from "styled-components";

export const BarGraphWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-bottom: 20px;
  padding-left: 0px;
  padding-top: 12px;
  /* @media only screen and (min-width: 576px) {
    padding-left: 10px;
  } */
  .font-change {
    color: "#222328";
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 27px;
    font-family: Montserrat;
    @media only screen and (min-width: 768px) {
      font-size: 1.125rem;
    }
    @media only screen and (max-width: 767px) {
      font-size: 1rem;
    }
  }
  .credential-bar {
    height: 400px !important;
  }
`;
