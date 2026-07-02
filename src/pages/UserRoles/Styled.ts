import styled from "styled-components";

export const UserRolesStyles = styled.div`
  .proj-heading {
    color: #222328;
    font-size: 22px;
    line-height: 28px;
    opacity: 1;
    margin-top: 2rem;
    font-weight: 600;
  }
  .container {
    min-height: 100vh;
  }
  .card-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 2px solid #e3e3e3;
    border-radius: 7px;
    padding-top: 0.75rem;
    padding-right: 0rem;
    margin-right: 2rem;
    margin-bottom: 2rem;
    flex: 30%;
    padding-bottom: 0.5rem;

    p {
      margin-bottom: 0.5rem;
      letter-spacing: 0px;
      color: #222328;
    }
    p.role-label {
      font-size: 12px;
      line-height: 18px;
    }
    p.role-name {
      font-size: 16px;
      line-height: 23px;
      font-weight: 600;
    }

    p.color-tenantClient {
      color: #555555;
    }
    p.tenantClient-name {
      font-weight: 500;
      line-height: 25px;
      color: #555555;
      font-size: 16px;
    }

    .card-tenantClientSec {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .alignSelf-Start {
      align-self: flex-start;
    }
    .alignSelf-base {
      align-self: baseline;
    }
    .arrow-wrapper {
      background: #ffffff 0% 0% no-repeat padding-box;
      border: 1px solid #e3e3e3;
      border-radius: 6px;
      opacity: 1;
      width: 40px;
      height: 40px;
      position: relative;

      .arrow-styles {
        border: 2px solid #b1292a;
        border-width: 0 3px 3px 0;
        display: inline-block;
        padding: 5px;
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
        position: absolute;
        top: 12px;
        left: 10px;
      }
    }
  }
  .card-wrapper.hovered {
    background-color: #bcc3ca1a;
  }
  .tooltip-role {
    position: relative;
    display: inline-block;
    .tooltiptext {
      visibility: hidden;
      width: 8.5rem;
      background-color: black;
      color: #fff;
      text-align: center;
      border-radius: 6px;
      padding: 5px 0;
      position: absolute;
      z-index: 1;
      bottom: 3.75rem;
      left: 0;
      margin-left: -2.3rem;
      opacity: 0;
      transition: opacity 1s;
      font-size: 12px;
      line-height: 20px;
      &::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 7px;
        border-style: solid;
        border-color: black transparent transparent transparent;
      }
    }
  }

  .hovered .tooltiptext {
    visibility: visible;
    opacity: 1;
  }

  .card-wrapper.hovered .arrow-wrapper .arrow-styles {
    background: url(../images/iconNextArrow.svg) no-repeat;
    width: 50px;
    height: 50px;
    border: none;
    transform: none;
    top: 0;
    left: 0;
  }

  .roleCardWrapper input[type="radio"] {
    display: none;
  }

  .roleCardWrapper input[type="radio"]:checked + div {
    border: 2px solid #e3e3e3;
    background-color: #bcc3ca1a;
  }

  .roleCardWrapper input[type="radio"]:checked + div .arrow-styles {
    background: url(../images/iconNextArrow.svg) no-repeat;
    width: 50px;
    height: 50px;
    border: none;
    transform: none;
    top: 0;
    left: 0;
  }

  .btn-group {
    justify-content: flex-end;
    > .btn {
      font-size: 16px;
      line-height: 19px;
    }
    .btn:disabled {
      pointer-events: none;
      background: #aaaaaa;
      border: 1px solid #aaaaaa;
      opacity: 1;
    }
  }

  .btn-group.notAllowedCursor {
    cursor: not-allowed;
  }
  .btnwidth {
    width: 102px;
    padding: 8px;
  }

  .separatorLine {
    border-right: 1px solid #bdc3c9;
    height: 3rem;
  }
`;
