import styled from "styled-components";

const SignInTitleWrapper = styled.div`
  .admin-signin-title {
    @media only screen and (min-width: 992px) {
      padding-top: 17px;
    }
  }

  .signin {
    font-size: 28px;
    font-weight: 600;
    line-height: 52px;
    color: #222328;
    @media only screen and (min-width: 576px) {
      font-size: 36px;
    }
    @media screen and (max-width: 575px) {
      line-height: 46px;
    }
    @media screen and (min-width: 576px) and (max-width: 767px) {
      font-size: 28px;
    }
    @media only screen and (min-width: 768px) and (max-width: 992px) {
      font-size: 30px;
    }
    @media only screen and (min-width: 320px) and (max-width: 575px) {
      font-size: 28px;
    }
  }
  .signin-text {
    color: #555555;
    font-size: 18px;
    padding-top: 11px;
    line-height: 34px;
    @media screen and (min-width: 992px) {
      width: 85%;
      text-align: justify;
    }
    @media screen and (max-width: 575px) {
      font-size: 14px;
      line-height: 25px;
      color: #222328;
    }
    @media only screen and (min-width: 576px) {
      font-size: 18px;
    }
    @media only screen and (min-width: 320px) and (max-width: 991px) {
      font-size: 16px;
    }
  }

  .admin-helptext {
    font-size: 12px;
    @media only screen and (min-width: 576px) {
      font-size: 14px;
    }
  }
`;

export default SignInTitleWrapper;
