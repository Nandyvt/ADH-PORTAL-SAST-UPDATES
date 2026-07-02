import styled from "styled-components";

interface IProps {
  buttonClick?: any;
  notFoundWrapperFlag?: any;
}

export const Wrapper = styled.div<IProps>`
  @media screen and (min-width: 1440px) {
    padding-right: 0;
    margin-right: 0;
    padding-left: 1px;
    max-width: ${(props) => (props.buttonClick ? "calc(100% - 300px)" : "")};
    min-width: ${(props) => {
      if (props.notFoundWrapperFlag) return "100%";
      return props.buttonClick ? "" : "calc(100% - 80px)";
    }};
  }
  @media screen and (min-width: 1300px) and (max-width: 1440px) {
    padding-right: 0;
    margin-right: 0;
    padding-left: 1px;
    max-width: ${(props) => (props.buttonClick ? "calc(100% - 300px)" : "")};
    min-width: ${(props) => {
      if (props.notFoundWrapperFlag) return "100%";
      return props.buttonClick ? "" : "calc(100% - 80px)";
    }};
  }
  @media screen and (min-width: 992px) and (max-width: 1299px) {
    padding-right: 0;
    margin-right: 0;
    padding-left: 1px;
    max-width: ${(props) => (props.buttonClick ? "calc(100% - 300px)" : "")};
    min-width: ${(props) => {
      if (props.notFoundWrapperFlag) return "100%";
      return props.buttonClick ? "" : "94%";
    }};
  }
  @media screen and (min-width: 992px) and (max-width: 1250px) {
    max-width: ${(props) => (props.buttonClick ? "calc(100% - 290px)" : "")};
    width: ${(props) => (props.buttonClick ? " " : "calc(100% - 80px)")};
    min-width: auto;
  }
  .bgcolor {
    background-color: #ffffff;
  }
  .container {
    max-width: 100%;
    @media screen and (min-width: 992px) {
      max-width: ${(props) => props.notFoundWrapperFlag && "73.125rem"};
    }
  }
  @media screen and (max-width: 991px) {
    padding-right: 0;
    padding-left: 0;
  }
  .stickToBottom {
    @media screen and (min-width: 400px) {
      position: fixed;
      bottom: 0;
    }
  }

  .padding-nats-pages {
    padding: 0 2rem !important;
  }
`;
export const CardWrapper = styled.div`
  background-color: #f8f8f8;
  @media only screen and (min-width: 768px) {
    .row {
      > div:only-child {
        max-width: 70%;
        flex: 0 0 70%;
      }
    }
  }
`;

export const CertificationWrapper = styled.div`
  .certification-steps {
    color: #000;
    font-size: 16px;
    list-style-type: none;
    padding: 0;
    li {
      border: 1px solid #c10e21;
      border-radius: 8px;
      margin-top: 32px;
      position: relative;
      background-color: #fff;
      &:before {
        width: 1px;
        height: 32px;
        content: "";
        position: absolute;
        bottom: -33px;
        left: 50%;
        background-color: #c10e21;
      }
    }
    li:last-child {
      &:before {
        display: none;
      }
    }
  }
  .certification-cols {
    column-count: 1;
    column-gap: 32px;
    > div {
      page-break-inside: avoid;
      break-inside: avoid;
    }
    > div:last-child {
      padding-bottom: 0;
    }
    @media only screen and (min-width: 992px) {
      column-count: 2;
      > div:last-child {
        padding-bottom: 40px;
      }
    }
  }
`;
export const BannerWrapper = styled.div`
  padding-top: 40px;
  padding-bottom: 53px;
  @media only screen and (min-width: 992px) {
    padding-top: 65px;
    padding-bottom: 80px;
  }
`;
export const HospitalDetail = styled.div`
  .pg-header {
    padding-top: 50px;
    border-bottom: 3px solid #c10e21;
  }
  .reg-btn {
    margin: 0;
    padding: 30px 0 150px;
    border-top: 0;
    button {
      width: 100%;
    }
    @media only screen and (min-width: 576px) {
      padding: 20px 0 93px;
    }
    @media only screen and (min-width: 768px) {
      padding: 47px 0;
      margin-top: 43px;
      border-top: 1px solid #e3e3e3;
      button {
        width: auto;
      }
    }
    @media only screen and (min-width: 1200px) {
      padding: 56px 0;
      margin-top: 62px;
    }
  }
  .st-field {
    width: 80px;
  }
  .ehr {
    border: 1px solid #e3e3e3;
    background-color: #f8f8f8;
    input {
      height: 34px;
    }
  }
  .download-wrapper {
    border: 1px solid #e3e3e3;
    background-color: #f8f8f8;
    padding: 10px 32px;
    margin-bottom: 36px;
    img {
      width: 52px;
      cursor: pointer;
    }
  }
  .agmt-title {
    color: #c10e21;
    text-transform: uppercase;
    cursor: pointer;
  }
  .font-black {
    color: #000;
  }
  .font-red-dark {
    color: #ff0000;
  }
`;
