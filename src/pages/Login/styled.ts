import styled from "styled-components";

const LoginWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .form-wrapper {
    width: 100%;
  }
  .home-image {
    width: 100%;
    @media only screen and (min-width: 768px) {
      padding-left: 20px;
      padding-right: 20px;
    }
    @media only screen and (min-width: 1200px) {
      height: 360px;
      width: 80%;
      padding: 0;
    }
  }
  .home-wrapper {
    display: flex;
    flex-grow: 1;
    width: 100%;
    position: relative;
    margin-bottom: 440px;
    @media only screen and (min-width: 320px) and (max-width: 374px) {
      /* margin-bottom: 650px; */
    }
    @media only screen and (min-width: 375px) and (max-width: 575px) {
      margin-bottom: 300px;
    }
    @media only screen and (min-width: 768px) {
      margin-bottom: 140px;
    }
    @media only screen and (min-width: 992px) {
      display: flex;
      padding-top: 90px;
    }
    @media only screen and (min-width: 1361px) {
      margin-bottom: 150px;
    }
  }

  .home-wrapper-left {
    width: 100%;
    padding: 0px 15px 0px opx;

    @media only screen and (min-width: 992px) {
      width: 55%;
      height: auto;
      display: flex;

      justify-content: flex-end;

      align-items: center;
      margin-bottom: 0px;
    }
    @media only screen and (min-width: 768px) {
      margin-bottom: 378px;
    }

    @media only screen and (min-width: 576px) {
      margin-bottom: 40px;
    }
    @media only screen and (min-width: 1200px) {
      margin-bottom: 0px;
    }
  }

  .home-wrapper-right {
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    background: 0% 0% no-repeat padding-box padding-box rgb(255, 255, 255);
    box-shadow: rgb(0 0 0 / 16%) 0px 3px 6px;
    border-radius: 11px;
    opacity: 1;
    display: flex;
    padding: 36px 24px;
    align-items: flex-start;
    position: absolute;
    top: 120px;
    left: 15px;
    right: 15px;
    @media only screen and (min-width: 768px) {
      padding: 36px;
      top: 160px;
      left: 30px;
      right: 30px;
    }
    @media only screen and (min-width: 992px) {
      width: 50%;
      position: static;
      border-radius: 0px;
      box-shadow: none;
    }
    @media only screen and (min-width: 1200px) {
      width: 50%;
      position: static;
      border-radius: 0px;
      box-shadow: none;
      padding: 0px 30px;
    }
  }
  .signout-link {
    display: none;
  }

  @media screen and (min-width: 576px) and (max-width: 767px) {
    .buttonstyle {
      .align-self-end.text-right {
        text-align: center !important;
      }
    }
    .home-wrapper {
      padding-inline: 20px;
      margin-top: 30px;
      margin-bottom: 22rem;
    }
  }
  @media screen and (min-width: 768px) and (max-width: 991px) {
    .home-wrapper {
      margin-top: 50px;
      margin-bottom: 0px;
    }
    .home-wrapper-left {
      max-height: 340px;
      overflow: hidden;
    }
  }
  /* Ipad Styles */
  @media screen and (min-width: 576px) and (max-width: 767px) {
    .home-wrapper-right {
      position: absolute;
      top: 98%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 86vw;
    }
    .aha-org-text {
      font-size: 18px;
      line-height: 26px;
    }
    .signin {
      line-height: 42px;
    }
  }
  @media screen and (min-width: 768px) and (max-width: 991px) {
    .home-wrapper-right {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 86vw;
    }
  }

  @media screen and (min-width: 576px) and (max-width: 600px) {
    .home-wrapper-right {
      width: 88vw;
    }
  }

  .logo-pos {
    width: 100%;
    @media only screen and (min-width: 768px) {
      padding-left: 20px;
      padding-right: 20px;
    }
    @media screen and (min-width: 992px) {
      width: 82%;
    }
  }
`;
export default LoginWrapper;
