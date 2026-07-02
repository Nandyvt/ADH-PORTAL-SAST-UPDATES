import styled from "styled-components";

export const LoadingWrapper = styled.div`
  .loadingstyle {
    padding: 180px 150px;
    @media only screen and (min-width: 320px) and (max-width: 768px) {
      padding: 180px 50px;
    }
  }
  .aha-size {
    font-size: 48px;
    @media only screen and (min-width: 576px) and (max-width: 767px) {
      font-size: 30px;
    }
    @media only screen and (min-width: 320px) and (max-width: 575px) {
      font-size: 28px;
    }
  }
  .gifimage {
    width: 160px;
    @media only screen and (min-width: 320px) and (max-width: 576px) {
      width: 25%;
    }
  }

  .visib-shown {
    visibility: visible;
    opacity: 1;
  }

  .visib-hidden {
    visibility: hidden;
    opacity: 0;
  }
`;

export default "";
