import styled from "styled-components";

export const ChartWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  button.dropdown-styles {
    border: none;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: #fff;
    font-size: 14px;
    font-weight: 500;
    line-height: 27px;
    /* margin-right: 30px !important; */
    font-family: Montserrat;
    width: fit-content;
    @media screen and (min-width: 320px) and (max-width: 575px) {
      justify-content: flex-start;
    }
    cursor: pointer;
    ul {
    }
  }
  li {
    cursor: pointer;
  }
  i.aha-icon-arrow-down.forModal:before {
    font-size: 6px;
    margin-top: -20px;
    position: relative;
    margin-right: 15px;
    pointer-events: none;
    padding-left: 10px;
    padding-right: 0;
    @media (min-width: 576px) {
      padding-left: 10px;
      padding-right: 0;
      margin-top: -38px;
      margin-right: 15px;
    }
  }
  .font-change {
    color: "#222328";
    font-size: 18px;
    font-weight: 500;
    line-height: 27px;
    font-family: Montserrat;
    padding-left: 15px !important;
  }

  .dropdown:hover .dropdown-menu {
    display: block;
    margin-top: 0; // remove the gap so it doesn't close
  }
  .dropdown-menu {
    background: #fff;
    padding-inline: 10px;
    font-size: 14px;
    font-weight: 500;
    line-height: 27px;
    font-family: Montserrat;
    border-radius: 0 !important;
    border: 1px solid #bdc3c9;
    box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.16);
    z-index: 10000000;
  }
  .dropdown-open::after {
    transition: all 0.4s ease 1s;
    transform: rotateZ(315deg);
  }
  button.dropdown-open::before {
    transition: none !important;
    visibility: visible !important;
    transform: translateY(0px) !important;
    opacity: 1 !important;
    border: none;
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
  .dropdown-item.active {
    color: #c10e21;
    font-size: 14px;
    font-weight: 500;
    line-height: 27px;
    font-family: Montserrat;
  }
  .position-relative.show i {
    transform: rotate(180deg) !important;
    margin-top: 5px !important;
    margin-right: -5px !important;
    padding-left: 0px !important;
    padding-right: 5px;
    @media (min-width: 576px) {
      padding-left: 0px !important;
      padding-right: 5px;
      margin-top: 6px !important;
      margin-right: -5px !important;
    }
  }
  .position-relative i {
    transform: rotate(0deg) !important;
  }
`;
