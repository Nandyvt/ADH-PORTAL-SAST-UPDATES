import styled from "styled-components";

export const LoadingWrapper = styled.div`
  .accessbg {
    background-color: #f8f8f8;
    border: 1px solid #bdc3c9;
    padding: 4rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media screen and (min-width: 1200px) {
      width: 1140px;
      margin: 0 auto;
      min-height: 60vh;
    }
  }
  .accessimg {
    width: 120px;
  }
  .font26 {
    font-size: 26px;
  }
  .header-title,
  .signout-link {
    display: none !important;
  }
  .container {
    max-width: 100%;
  }
  .navbar-expand-lg {
    padding-left: 0;
  }
  .aui-main-header {
    max-width: 100%;
  }
  .aui-header-content {
    width: 75rem !important;
    padding-left: 0 !important;
  }
  .errorInfo {
    font-size: 18px;
  }

  @media screen and (max-width: 768px) {
    .font26 {
      font-size: 20px;
      line-height: 1.5;
    }
    .errorInfo {
      font-size: 16px;
    }
  }
  @media screen and (max-width: 1200px) {
    .accessbg {
      margin-right: 1.5rem;
      margin-left: 1.5rem;
    }
  }
`;

export const AnotherWraper = styled.div``;
