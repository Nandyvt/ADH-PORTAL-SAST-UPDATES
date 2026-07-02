import styled from "styled-components";

export const SchemaContentWrapper = styled.div`
  .drop-down-wrapper {
    margin-bottom: 2rem;
  }
  .menuheading {
    color: #222328;
    font-size: 30px;
    opacity: 1;
    padding-bottom: 1.75rem;
    font-weight: 400;
  }
  .title-buttons{
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    outline: none;
  }
  .editor-title-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #e3e3e3;
    padding: 1rem 1.5rem;
  }
  .editor-title {
    font: normal normal 600 18px/27px Montserrat;
    color: #222328;
  }
  .editor-wrapper{
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #e3e3e3;
    padding-left: 1.5rem;
  }
  .editor-wrapper *{
    font: normal normal normal 16px/27px Montserrat !important;
  }
  .disabled-btn {
    background: #aaaaaa 0% 0% no-repeat padding-box;
    border: 2px solid #aaaaaa;
    color: white;
  }
  .active-btn {
    background: #C10E21 0% 0% no-repeat padding-box;
    border: 2px solid #C10E21;
    color: white;
  }
  .json-buttons {
    padding: .5rem 1.75rem
  }
  .copy-url {
    background-color: transparent;
    font-size: 16px;
    justify-content: center;
    align-items: center;
    display: flex;
    font-weight: 500;
  }
}`;

export const HeaderWrapper = styled.header`
  .json-content {
    max-width: 80rem;
  }
  .logo-image {
    width: 30px;
  }
`;

export const SchemaWrapper = styled.div`
  border-top: 1px solid #e3e3e3;
  padding-top: 40px;
  padding-bottom: 40px;
  .json-content {
    max-width: 80rem;
  }
`;
