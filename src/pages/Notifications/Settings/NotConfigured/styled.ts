import styled from "styled-components";

const NotConfiguredWrapper = styled.div`
  .min-height {
    min-height: 50vh;
    @media screen and (min-width: 576px) and (max-width: 819px) {
      min-height: 60vh;
    }
    @media screen and (min-width: 820px) and (max-width: 991px) {
      min-height: 70vh;
    }
  }
  .image {
    max-width: 124px;
    @media screen and (min-width: 320px) and (max-width: 575px) {
      max-width: 80px;
    }
  }
  .title {
    font-family: Montserrat;
    font-weight: 600;
    font-size: 22px;
    color: #222328;
    line-height: 27px;
    @media screen and (min-width: 320px) and (max-width: 575px) {
      font-size: 16px;
    }
  }
  .sub-title {
    width: 342px;
    word-wrap: break-word;
    font-size: 16px;
    font-family: Montserrat;
    font-weight: normal;
    line-height: 27px;
    color: #222328;
    @media screen and (min-width: 320px) and (max-width: 575px) {
      font-size: 14px;
    }
  }
  .button-text {
    line-height: 19px;
    font-size: 1rem;
  }
`;

export default NotConfiguredWrapper;
