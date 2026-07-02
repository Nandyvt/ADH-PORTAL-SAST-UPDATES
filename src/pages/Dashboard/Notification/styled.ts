import styled from "styled-components";

export const NotificationContainer = styled.div`
  .title {
    color: #222328;
    font-size: 24px;
    line-height: 27px;
    font-weight: 500;
    font-family: "Montserrat";
    margin-bottom: 0 !important;
    @media screen and (min-width: 320px) and (max-width: 767px) {
      font-size: 20px !important;
      padding-left: 15px;
      padding-right: 15px;
    }
    @media screen and (min-width: 768px) and (max-width: 991px) {
      font-size: 22px !important;
    }
  }
`;
