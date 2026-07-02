import styled from "styled-components";

const BreadCrumbsStyled = styled.div`
  .breadcrumb {
    margin: 0;
    padding-top: 6px;
    padding-bottom: 0px;
    padding-left: 0px;
    background: none;
    margin: 0;
    line-height: 1.5;
    font: normal normal normal 16px/23px Montserrat;
    letter-spacing: 0px;
    @media only screen and (max-width: 768px) {
      display: none;
    }
    .inactive-breadcrumb {
      color: #222328;
      font: normal normal 500 16px/23px Montserrat;
      pointer-events: none;
      cursor: not-allowed;
    }
    .active-breadcrumb {
      color: #c10e21;
    }
    .separator {
      padding-inline: 0.6rem;
    }
  }
`;
export default BreadCrumbsStyled;
