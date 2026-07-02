import styled from "styled-components";

export const HeaderWrapper = styled.header`
  .logo-image {
    width: 211px;
    @media screen and (min-width: 320px) and (max-width: 991px) {
      width: 180px;
    }
  }
  .nav-link {
    line-height: 19px !important;
    font-weight: normal !important;
  }

  .edit-icon {
    cursor: pointer;
    color: rgba(193, 14, 33, 1);
    background-color: rgba(177, 41, 42, 0.1);
  }

  .tooltiptext {
    pointer-events: none;
    visibility: hidden;
    width: 5.4rem;
    background-color: black;
    color: rgb(255, 255, 255);
    text-align: center;
    border-radius: 6px;
    padding: 9px 0px;
    position: absolute;
    z-index: 1;
    margin-left: -6rem;
    opacity: 0;
    transition: opacity 0.4s ease 0s;
    font-size: 12px;
    line-height: 20px;
  }
  .tooltiptext::after {
    content: "";
    position: absolute;
    top: 30%;
    left: 100%;
    margin-left: 0px;
    border-width: 7px;
    border-style: solid;
    border-color: black transparent transparent;
    transform: rotateZ(-90deg);
  }
  .edit-icon:hover ~ p.tooltiptext {
    visibility: visible;
    opacity: 1;
    display: block;
  }
  .aui-skip-content {
    padding: 16px;
    color: #c10e21;
    position: absolute;
    left: -9999px;
    width: 100%;
    top: 0;
    text-align: center;
    background-color: #fff;
    &:focus {
      left: 0;
      z-index: 500;
    }
  }

  .aui-pri-header-t {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 2.8rem !important;
  }

  .aha-logo img {
    width: 162px;
  }
  .logo-style {
    width: 200px;
  }

  .header-title {
    font-size: 1.625rem;
    line-height: 32px;
    font-weight: 400;
    color: #222328;
    margin-bottom: 0;
  }
  .user {
    font-size: 1rem;
    line-height: 27px;
    font-weight: 400;
    color: #222328;
  }
  .primary-color {
    color: #c10e21;
  }

  .navbar-expand-lg {
    .navbar-nav {
      .dropdown-menu {
        font-size: 14px;
      }
    }
  }

  .aui-header-dropdown {
    .dropdown-item {
      color: #222328;
      font-style: normal;
      font-size: 16px;
      font-family: Montserrat;
    }
  }
  .dropdown-menu {
    top: 37px;
    left: 0px;
    min-width: 100%;
  }
  .nav-show {
    display: block;
    @media only screen and (min-width: 992px) {
      display: none !important;
    }
  }
  .nav-show {
    li {
      border-bottom: 1px solid #bcc3ca;
      padding: 20px 0 !important;
      top: 0;
    }
  }

  .nav-show {
    .lastitem {
      border-bottom: none;
    }
  }

  .profile-icon {
    display: none;
  }
  @media only screen and (min-width: 1361px) {
    .aui-header-content {
      width: 88rem !important;
    }
  }
  @media only screen and (min-width: 992px) {
    .aui-header-content {
      padding-right: 0;
    }
  }
  @media screen and (min-width: 1440px) {
    .aui-header-content {
      width: auto !important;
    }
  }
  @media screen and (min-width: 360px) and (max-width: 768px) {
    .nav-item {
      .nav-link {
        padding-bottom: 1rem;
        border-bottom: 1px solid #bcc3ca;
        padding-top: 1rem;
      }
    }
    .aui-pri-nav {
      .navbar-nav {
        padding: 0;
        margin: 0;
      }
    }

    .nav-show {
      .nav-show {
        li {
          border-bottom: 0 !important;
          padding: 0 !important;
        }
      }
    }

    .nav-link.signout-link {
      border-bottom: 0;
      width: 10rem;
    }
    .aui-header-dropdown {
      position: absolute;
      left: 0;
      min-width: 10rem;
      background-color: #fff;
      background: #ffffff 0% 0% no-repeat padding-box;
      box-shadow: 0px 3px 6px #00000029;
      border: 1px solid #e3e3e3;
    }
  }

  .aha-icon-cross {
    &:before {
      font-weight: 800;
    }
  }
  .profile-icon {
    display: inline-block;
    padding-right: 0.625rem;
  }
  .dropdown .dropdown-menu.make-visible {
    display: block;
    margin-top: 0px; // remove the gap so it doesn't close
    border-top: 0.125rem solid #c10e21;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .aui-header-dropdown.show {
    border-top: 0.125rem solid #c10e21 !important;
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
  }

  .hover-open::after {
    transition: all 0.4s ease 0s;
    transform: rotateZ(315deg);
  }
  button.hover-open::before {
    transition: none !important;
    visibility: visible !important;
    transform: translateY(0px) !important;
    opacity: 1 !important;
  }
  .dropdown-item {
    display: block;
    width: 100%;
    padding: 0 !important;
    clear: both;
    font-weight: 400;
    color: #222328;
    text-align: inherit;
    white-space: nowrap;
    background-color: transparent;
    border: 0;
  }

  li.nav-item-roleName.roleSwitcherWidth {
    width: 260px;
    @media screen and (max-width: 450px) {
      width: 174px;
      margin-right: 0 !important;
    }

    select.form-control {
      -webkit-appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      background-image: none;
      background-repeat: no-repeat;
      border: 1px solid #bcc3ca !important;
      cursor: pointer;
      text-transform: capitalize;

      + i {
        float: right;
        top: 0;
        left: -30px;
        position: relative;
        margin-right: 13px;
        font-size: 40%;
        pointer-events: none;
        @media screen and (max-width: 450px) {
          margin-left: 13px;
          margin-right: 0px;
        }
      }
    }
  }

  #roleSwitchDropdown {
    @media screen and (max-width: 575px) {
      padding-right: 20px;
    }
  }

  @media screen and (max-width: 991px) {
    padding-bottom: 4px !important;
    .aui-pri-header-t {
      padding-left: 0 !important;
      padding-right: 1rem;
    }

    .navbar-expand-lg {
      .navbar-collapse {
        display: flex !important;
        flex-basis: auto;
        justify-content: flex-end !important;
        border-top: 0;
        margin-top: 0;
        .navbar-nav {
          flex-direction: row !important;
          padding: 0;
          .nav-link.signout-link {
            width: auto;
            padding: 0.625rem 0.625rem;
          }
          .dropdown-toggle {
            &::after {
              right: 0;
              top: 0;
              position: relative;
            }
          }
          .aui-header-dropdown {
            position: absolute;
            margin-top: 4px;
            box-shadow: 0px 3px 6px #00000029;
            border: 1px solid #e3e3e3;
            background-color: #fff;
            border-radius: 0.25rem;
          }

          @media screen and (max-width: 768px) {
            .nav-item-roleName {
              margin-right: 1rem;
            }
            .nav-item.dropdown {
              display: none !important;
            }
          }
        }
      }
      .navbar-toggler.signout-link {
        /* &::before {
          content: "";
          position: absolute;
          background-color: #f8f8f8;
          width: 70px;
          height: 70px;
          opacity: 1;
          top: -9px;
          left: 0px;
        } */
        .aha-icon-hamburger {
          /* padding-left: 10px; */
          &::before {
            opacity: 0.8;
            margin-left: 0;
          }
        }
      }
    }
    .headerAHALogoMob {
      margin-top: -10px;
      /*  margin-left: 10px; */
      margin-left: 3.25rem;
      width: 8.125rem;
      @media screen and (min-width: 320px) and (max-width: 575px) {
        width: 6.8rem;
      }
    }
  }

  @media screen and (max-width: 991px) {
    .navbar-toggler {
      position: absolute;
      background-color: rgb(248, 248, 248);
      /* padding: 18px 18px !important; */
      margin-left: 0 !important;
      width: 70px;
      height: 70px;
    }
  }

  .aui-header-content {
    .nav-item {
      .nav-link {
        @media screen and (min-width: 992px) {
          padding: 0.5rem 0.5rem;
        }
      }
    }
  }

  .nav-item.show .nav-link:before {
    content: none;
  }
  .nav-item .dropdown-toggle.nav-link:before {
    content: none;
  }
  .d-style-NotFound {
    display: none !important;
  }
  .roleName {
    font-weight: 600;
  }
  .roleClientName {
    font-weight: 600;
  }
  .roleStylesMin {
    padding: 4px 8px;
    border-radius: 4px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    word-break: break-all;
    max-width: 100%;
  }
  .groupedRoleStyle {
    .roleStylesMin.roleColorCodeSA {
      margin-top: 2px;
    }
  }
  .roleStylesMin.roleColorCodeSA {
    background: var(--superAdmin-superUser-bgColor);
    color: var(--superAdmin-superUser-color);
    font-size: 14px;
    margin-bottom: 0;
    line-height: 1.5;
    font-weight: 500;
    display: inline-block;
  }

  .roleStylesMin.roleColorCodeTN {
    background: rgb(0 157 146 / 8%);
    margin-top: 2px;
    color: #037e76;
    font-size: 14px;
    margin-bottom: 0;
    line-height: 1.5;
    font-weight: 500;
    display: inline-block;
  }
  .roleStylesMin.roleColorCodeINACTIVE {
    position: relative;
  }
  .roleStylesMin.roleColorCodeINACTIVE::after {
    background: rgb(112 112 112 / 20%);
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    content: "";
    border-radius: 4px;
  }
  .roleStylesMin.roleColorCodeCL {
    background: var(--clientAdmin-bgColor);
    margin-top: 2px;
    color: var(--clientAdmin-color);
    font-size: 14px;
    margin-bottom: 0;
    line-height: 1.5;
    font-weight: 500;
    display: inline-block;
  }

  .roleStylesMin.roleColorCodeEU {
    background: var(--endUser-bgColor);
    margin-top: 2px;
    color: var(--endUser-color);
    font-size: 14px;
    margin-bottom: 0;
    line-height: 1.5;
    font-weight: 500;
    display: inline-block;
  }
  .helpTextStyles {
    padding-left: 3px;
    margin-top: -1px;
    cursor: pointer;
  }
  .helpTextStylesImg {
    width: 14px;
    margin-right: 4px;
  }
  .role-dropdown {
    position: relative;
    border: none;
    max-width: 12rem;
  }
  .dropdown-menu {
    position: absolute;
    top: 35px;
    left: inherit;
    right: 0;
    max-width: 20rem;
  }
  .dropdown-arrow {
    font-size: 7px;
    padding-left: 6px;
    padding-top: 4px;
  }
  .role-list {
    margin: 8px 8px 0px 8px !important;
    max-width: 18rem;
    &:nth-child(1) {
      margin: 0px 8px 0px 8px !important;
    }
  }
  .rotate {
    transform: rotate(180deg);
  }
  .rotateArrow {
    transform: rotateZ(180deg);
  }

  .role-dropdown {
    display: flex;
    justify-content: center;
    align-items: center;
    .dropdown-arrow {
      -webkit-transition: all 1s ease;
      transition: all 1s ease;
      font-size: 7px;
      padding-left: 0;
      padding-top: 0;
      .aha-icon-arrow-down::before {
        width: 3em;
      }
    }
  }
  .role-dropdown[aria-expanded="true"] {
    .dropdown-arrow {
      -webkit-transition: all 1s ease;
      transition: all 1s ease;
      -webkit-transform: rotateZ(180deg);
      -ms-transform: rotateZ(180deg);
      transform: rotateZ(180deg);
    }
  }
`;
