import styled from "styled-components";

const ActionElipsesWrapperStyle = styled.div`
  .tooltip-role {
    position: relative;
    display: inline-block;
    cursor: pointer;

    .noBtnStyle {
      background: none;
      border: 0px;
      line-height: 1;
      cursor: pointer;
      width: 24px;
      height: 24px;
      margin-right: 20px;
      background-color: #fff;
      i {
        &::before {
          margin-right: 0;
          margin-left: 0;
        }
      }
    }

    .tooltiptext {
      visibility: hidden;
      width: 8rem;
      background-color: black;
      color: var(--white-ffffff);
      text-align: center;
      border-radius: 6px;
      padding: 5px 2px;
      position: absolute;
      z-index: 1;
      bottom: 3rem;
      right: -3rem;
      opacity: 0;
      transition: opacity 1s ease 0s;
      font-size: 11px;
      line-height: 20px;

      &::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 7px;
        border-style: solid;
        border-color: black transparent transparent;
      }
    }
  }
  .rotate-90 {
    transition: all 0.3s ease 0s;
    color: var(--primary-c10e21) !important;
    transform: translate(0%, 0%) rotateZ(90deg) !important;
    padding-left: 4px !important;
  }

  .connection-td-wrapper {
    position: relative;
    .popoverWrapper {
      position: absolute;
      overflow: hidden;
      width: 9.4rem;
      background: #fff;
      padding: 0.5rem 1rem;
      top: 1rem;
      left: -8rem;
      z-index: 99;
      border-left: 1px solid var(--bread-crumbs-6d6e71);
      border-right: 1px solid var(--bread-crumbs-6d6e71);
      border-bottom: 1px solid var(--bread-crumbs-6d6e71);
      box-shadow: 0px 3px 6px var(--aui-header-boxshadow);
      border-top: 0.2rem solid var(--primary-c10e21);
      @media screen and (max-width: 767px) {
        //mobile and tablet
        left: 0;
      }

      > button {
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 18px;
        color: var(--bgcolor-343a40);
        width: 100%;
        text-align: left;
      }
    }
  }
`;
export default ActionElipsesWrapperStyle;
