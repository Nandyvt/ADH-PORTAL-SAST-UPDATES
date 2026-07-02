import styled from "styled-components";

const NotificationsSettingWrapper = styled.div`
  .nav-tabs .nav-item {
    margin-bottom: -7px !important;
    @media screen and (min-width: 576px) and (max-width: 767px) {
      margin-bottom: -6px;
    }
  }
  .aui-p-tabs .nav-tabs .nav-link {
    padding-bottom: 2rem !important;
  }
  li.nav-item:not(:last-child):after {
    bottom: 14px !important;
  }
  .notifications {
    font-size: 30px;
    line-height: 37px;
    font-family: Montserrat;
    font-weight: 400;
    color: #222328;
    @media screen and (min-width: 320px) and (max-width: 767px) {
      font-size: 22px;
      line-height: 27px;
    }
    @media screen and (min-width: 768px) and (max-width: 991px) {
      font-size: 24px;
      line-height: 29px;
    }
  }
  .header-bottom {
    border-bottom: 1px solid var(--cecece);
  }
  .aui-p-tabs .nav-tabs {
    @media only screen and (min-width: 320px) {
      display: flex !important;
      border-bottom: 1px solid #e3e3e3 !important;
      width: 100% !important;
    }
  }
  .nav-item {
    position: relative;
  }
  .aui-p-tabs .nav-tabs .nav-link.active,
  .aui-p-tabs .nav-tabs .nav-item.show .nav-link {
    color: var(--red) !important;
  }

  li.nav-item:not(:last-child):after {
    content: "";
    position: absolute;
    top: 10px;
    bottom: 10px;
    width: 1px;
    background: #e3e3e3 !important;
    right: -30px;
    @media screen and (min-width: 320px) and (max-width: 991px) {
      right: 11px;
    }
  }
  .tab-item-font {
    font-family: Montserrat !important;
    font-weight: 500 !important;
    font-size: 16px !important;
    color: #222328 !important;
    @media screen and (min-width: 320px) and (max-width: 576px) {
      font-size: 14px !important;
      line-height: 23px !important;
    }
  }
  .nav-link:before {
    content: none;
  }
`;

export default NotificationsSettingWrapper;
