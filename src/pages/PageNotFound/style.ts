import styled from "styled-components";

const PageNotFoundStyle = styled.div`
  .notfound-content {
    margin-top: 1rem;
  }
  .img-404 {
    width: 100%;
  }
  .errmsg {
    color: #c10e21;
    font-size: 24px;
    text-align: center;
    font-weight: 500;
    @media screen and (max-width: 576px) {
      font-size: 22px;
    }
    @media screen and (max-width: 412px) {
      font-size: 18px;
    }
  }
  .message {
    text-align: center;
    font-size: 18px;
    color: #555555;
    font-weight: 500;
    @media screen and (max-width: 576px) {
      font-size: 16px;
    }
    @media screen and (max-width: 412px) {
      font-size: 14px;
    }
  }
  .dashbord-btn {
    @media screen and (max-width: 576px) {
      font-size: 16px;
    }
    @media screen and (max-width: 412px) {
      font-size: 14px;
    }
  }

  .notfoundcontent {
    margin-top: 5rem;
    @media screen and (max-width: 576px) {
      margin-top: 3rem;
    }
  }
`;
export default PageNotFoundStyle;
