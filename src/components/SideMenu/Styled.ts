import styled from "styled-components";

interface IProps {
  size?: any;
  buttonClick?: any;
}
export const SideMenuWrapper = styled.div<IProps>`
  @media screen and (min-width: 992px) {
    /* width:21%; */
    transition: 0.5s;
    /*  z-index: 999; */
    /*  padding-right:0 !important; */
  }
  input[type="checkbox"] {
    outline: 2px solid #c00;
  }
  .aui-sidenav {
    background-color: #f8f8f8;
    width: 100%;
    margin-bottom: 1rem;
    display: none;
    @media only screen and (min-width: 992px) {
      margin-bottom: 3rem;
      height: 100%;
      display: block;
    }
  }
  .ADHlogo {
    width: 9.125rem !important;
  }
  .AHAlogo {
    width: 100%;
    margin-left: 10px;
    margin-top: 10.5px;
    display: flex;
    align-content: stretch;
    justify-content: flex-start;
  }
  .navbar-collapse {
    margin-top: 5px;
  }
  .expandButton {
    justify-content: flex-end;
    margin-top: 5px;
  }
  .ul-list {
    max-height: calc(100vh - 100px);
    overflow-y: auto;
    overflow-x: hidden;
  }
  .ul-list li {
    border-radius: 4px;
    margin-left: 0px;
    margin-bottom: 0px;
  }
  .expandButton button {
    display: flex;
    justify-content: center;
    right: -13px;
    top: 61px;
    width: 28px;
    height: 28px;
    margin-top: 5px;
    position: absolute;
    border: 1px solid #70707066;
    border-radius: 6px;
  }
  .expandButton button:hover {
    color: white;
    background-color: #c32c2c;
  }
  #sideNavbar span {
    width: 17%;
    margin-right: 9px;
  }
  #sideNavbar ul li a span {
    margin-right: 9px;
  }
  .aui-sidenav .aui-sidenav-acc-header:not(:has(span)) {
    justify-content: space-between;
  }
  .aui-sidenav .aui-sidenav-acc-header .acc-btn-arrow {
    font-size: 0.5rem;
    margin: 0.3rem 0.3125rem 0;
  }
  .aui-sidenav ul {
    padding: 0;
    list-style-type: none;
    margin-top: 30px;
  }
  .expandButton button:hover::before,
  .expandButton button:focus::before,
  .expandButton button:hover::after,
  .expandButton button:focus::after {
    visibility: visible;
    opacity: 1;
  }
  /*  .expandButton button:hover::after {
    visibility: visible;
    opacity: 1;
  } */
  .subMenuArrow {
    margin-left: 9px !important;
  }
  .expandButton button::after {
    visibility: hidden;
    opacity: 0;
    content: "";
    position: absolute;
    transform: rotateZ(90deg);
    top: 26%;
    left: 116%;
    margin-left: -5px;
    border-width: 7px;
    border-style: solid;
    border-color: black transparent transparent transparent;
  }
  .expandButton button::before {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    width: 10rem;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    left: 2.42rem;
    font-size: 12px;
    bottom: -2px;
  }
  .ul-list li {
    border-radius: 4px;
    position: relative;
  }
  .aui-sidenav ul li a {
    color: #343a40;
    font-size: 16px;
    padding: 11px 30px;
    display: flex;
    flex-direction: row;
    justify-content: start;
  }
  .aui-sidenav ul li button p {
    margin-bottom: 0;
    width: 65%;
    margin-right: 1rem;
    height: 20px;
    overflow: hidden;
    /* @media screen and (max-width: 991px) {
      padding-left: 0.25rem;
    } */
  }
  .aui-sidenav ul li a p {
    margin: 0;
  }
  .aui-sidenav ul li a img {
    margin-right: 6%;
  }
  .aui-sidenav-acc-body li a {
    padding-right: 0 !important;
    padding: 0.875rem 0.875rem 0.875rem 3.125rem;
  }
  .aui-sidenav-acc-body li {
    margin-bottom: 0;
    margin-top: 4px;
  }

  sidenavHeadingOne {
    color: #343a40;
    font-size: 16px;
    padding: 11px 18px;
  }

  button.btn[aria-expanded="true"] {
    background-color: #f8f8f8;
    color: #c10e21 !important;
    border-radius: 4px;
  }
  .nav-sidebar:hover,
  button.btn:hover {
    color: #c10e21 !important;
  }
  .aui-sidenav .aui-sidenav-acc-body {
    padding: 0;
    padding-left: 32px !important;
  }
  .active-menu {
    border-bottom: 3px solid #c10e21 !important;
    color: #c10e21 !important;
  }
  .ul-list li:first-child {
    margin: 15px 0px 0px 0px;
  }
  .aui-sidenav-acc-body li:first-child {
    margin-top: 4px !important;
    margin-bottom: 0 !important;
  }
  .aui-sidenav-acc-body li:last-child {
    margin-bottom: 18px !important;
  }

  .directionRight {
    font-size: 0.5rem;
    padding-top: 3px;
    padding-right: 2px;
  }
  .newPageWrapper {
    padding-top: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 12px;
  }
  .newPage {
    height: 12.21px;
  }
  .directionRight::before {
    transform: rotateZ(90deg);
  }
  .directionLeft {
    font-size: 0.5rem;
    padding-top: 7px;
    padding-left: 2px;
  }
  .aui-sidenav-acc-body li a {
    height: 45px;
    line-height: 2;
    overflow: hidden;
  }
  .directionLeft::before {
    transform: rotateZ(270deg);
  }
  bgcolor {
    background-color: rgb(241, 244, 249);
  }
  .nav-sidebar-active {
    color: #c10e21 !important;
  }
  .subMenu-active {
    color: #c10e21 !important;
  }
  .aui-sidenav .aui-sidenav-acc-body {
    padding: 0;
    padding-left: 17% !important;
    margin-top: 0;
    @media screen and (max-width: 768px) {
      padding-left: 18.5% !important;
    }
  }
  .users {
    font-size: 13px;
  }
  .redIcon {
    color: rgb(193, 14, 33) !important;
  }
  .nav-sidebar-active::before {
    background-color: #c10e21;
    width: 4px;
    position: absolute;
    top: -2px;
    left: 0;
    height: 109%;
    content: "";
    border-radius: 0px 4px 4px 0px;
    border-left: 4px solid #c10e21;
  }
  .sideMenuBorder::before {
    background-color: #c10e21;
    width: 4px;
    position: absolute;
    top: -2px;
    left: 0;
    height: 49px;
    content: "";
    border-radius: 0px 4px 4px 0px;
    border-left: 4px solid #c10e21;
  }
  .aui-sidenav-acc-header[aria-expanded="true"] .acc-btn-arrow {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
    -webkit-transition: all 0.3s ease;
    margin-right: 0px !important;
    margin-left: 13px !important;
    transition: all 0.3s ease;
  }
  .fadeIn {
    animation: 0.2s ease 0s normal forwards 1 fadein;
    -webkit-animation: 0.2s ease 0s normal forwards 1 fadein;
    opacity: 1;
  }
  .nav-sidebar-child-active {
    color: var(--primary);
  }
  /* .nav-sidebar-child-active::before {
    background-color: #c10e21;
    width: 4px;
    position: absolute;
    top: -2px;
    left: 0;
    height: 109%;
    content: "";
    border-radius: 0px 4px 4px 0px;
    border-left: 4px solid #c10e21;
  } */

  @keyframes fadein {
    0% {
      opacity: 0;
    }
    80% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-webkit-keyframes fadein {
    0% {
      opacity: 0;
    }
    80% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @media screen and (min-width: 991px) {
    width: ${(props) => props.size};
    z-index: 1010;
    position: ${(props) => (props.buttonClick ? "relative" : "absolute")};
    height: ${(props) => (props.buttonClick ? "" : "100%")};
    transition: all 0.5s ease 0s;
  }

  .aui-sidenav .aui-sidenav-acc-header {
    color: #343a40;
    padding: 11px 16px 11px 30px;
    font-size: 16px;
  }

  .navbar-expand-lg .navbar-collapse {
    display: flex;
  }
  .aui-sidenav {
    margin-bottom: 3rem;
    height: 100%;
    display: block;
  }

  .aui-sidenav .aui-sidenav-acc-header {
    line-height: 1.5;
    justify-content: flex-start;
  }
  .ul-list li:first-child {
    margin-bottom: 0px;
  }

  @media screen and (max-width: 991px) {
    width: 303px;
    position: absolute;
    height: 100%;
    width: 100%;
    transition: all 0.5s ease 0s;

    .sideMenuMobArrowBtn {
      display: ${(props) =>
        props.buttonClick ? "flex !important" : "none !important"};
      z-index: 1080;
    }
    .sideMenuMobHide {
      display: none !important;
    }

    .aui-sidenav {
      .navbar-expand-lg {
        height: 100%;
        overflow-y: auto !important;
      }
    }
    @media screen and (max-width: 768px) {
      #sideNavbar {
        flex-direction: column;
      }
      .aha-icon-avatar-outline {
        width: 21%;
        display: inline-block;
        margin-right: 10px;
      }
      .signOutPadL {
        /* padding-left: 2rem !important; */
        color: #343a40;
        font-size: 16px;
      }
      .signOutPadL span {
        margin-left: 8px;
      }
      .aha-icon-logout {
        width: 21%;
        display: inline-block;
      }

      #sideNavbar {
        overflow: scroll;
        min-height: 100%;
        > ul:first-child {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
      }
    }
    #sideNavbar {
      .dropdown-item {
        font-size: 16px;
        color: inherit;
        font-weight: 500;
      }
    }
    .profileMobMenu {
      @media screen and (orientation: landscape) {
        position: relative;
      }
      display: ${(props) => (props.buttonClick ? "block" : "none ")};
      bottom: 0;
      margin-top: 0 !important;
    }

    .expandButton button {
      top: 20px;
    }

    .ul-list ul li a p {
      /* padding-left: 0.25rem; */
    }
  }

  #sidenavcollapseNotifications > li a[href="/notifications"] span {
    display: none;
  }
`;

export const WidthWrapperSec = styled.div<IProps>`
  z-index: 1001;
  position: fixed;
  height: 100%;
  width: ${(props) => (props.buttonClick ? "303px" : "80px")};
  @media screen and (min-width: 992px) and (max-width: 1250px) {
    width: ${(props) => (props.buttonClick ? "290px" : "80px")};
  }
  @media screen and (max-width: 991px) {
    z-index: 1050;
    position: fixed;
    height: 100%;
    width: ${(props) => (props.buttonClick ? "303px" : "0px")};
    transition: all 0.5s ease 0s;
  }
`;

export const Button = styled.button<IProps>`
  &:before {
    content: "${(props) =>
      props.buttonClick ? "Collapse the navigation" : "Expand the navigation"}";
  }
`;
