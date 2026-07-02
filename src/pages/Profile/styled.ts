import styled from "styled-components";

const ProfileWrapper = styled.div`
  min-width: 75vw;
  @media screen and (min-width: 1700px) {
    min-width: 65vw;
  }
  .form-wrapper {
    width: 100%;
  }
  .cardcontent {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .roleStylesMin.roleColorCodeSA {
    background: var(--superAdmin-superUser-bgColor);
    font-weight: 600;
    > p {
      color: var(--superAdmin-superUser-color);
    }
  }
  .roleStylesMin.roleColorCodeAHA {
    background: rgb(0 157 146 / 8%);
    > p {
      color: #037e76;
    }
  }
  .roleStylesMin.roleColorCodeSCPRU {
    background: rgba(25, 120, 178, 0.1);
    > p {
      color: #10689f;
    }
  }
  .roleStylesMin.roleColorCodeCPU {
    background: var(--clientAdmin-bgColor);
    > p {
      color: var(--clientAdmin-color);
    }
  }

  .roleStylesMin.roleColorCodeEU {
    background: var(--endUser-bgColor);
    > p {
      color: var(--endUser-color);
    }
  }
  .profile-heading {
    color: #222328;
    font-size: 26px;
    opacity: 1;
  }

  .user-style {
    overflow: hidden;
    border-radius: 10px;
  }

  .icon-spacing {
    width: 1rem;
    height: 1rem;
  }

  .user-style img {
    width: 100%;
  }
  .user-style {
    width: 166px;
    height: 166px;
    @media screen and (min-width: 768px) and (max-width: 991px) {
      width: 200px;
      height: 200px;
    }
  }
  .font-12 {
    font-size: 12px;
  }
  .font16 {
    font-size: 16px;
  }

  .card-active {
    border-left: 4px solid #329300;
  }
  .card-inactive {
    border-left: 4px solid #343a40;
  }
  .red-tooltip + .tooltip > .tooltip-inner {
    background-color: #f00;
  }
  .line {
    border-bottom: 1px solid #bcc3ca;
  }
  .cursorpointer {
    cursor: pointer;
  }
  .form-check input[type="checkbox"]:checked + label:before {
    background-color: #fafafa;
    border-color: #7c8383;
  }
  .form-check label:after {
    border: 2px solid #495057;
    border-top: none;
    border-right: none;
    content: "";
    height: 0.375rem;
    opacity: 0;
    position: absolute;
    top: 0.375rem;
    left: 0.3125rem;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    width: 0.75rem;
  }
  .bgcolor {
    background-color: #f8f8f8;
  }
  .font18 {
    font-size: 18px;
  }
  .font12 {
    font-size: 12px;
  }
  .role-card-wrapper {
    display: flex;
    flex-wrap: wrap;
  }
  .role-box {
    width: 100%;
    height: 100%;
    @media screen and (min-width: 576px) {
      width: 48%;
    }
    @media screen and (min-width: 768px) {
      width: calc(25% - 7.5px);
    }
  }
  .addRoleBox {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    display: flex;
    border: 1px solid #e3e3e3;
    border-radius: 7px;
    padding: 1.125rem 1rem;

    .addRoleHeading {
      font-size: 16px;
      line-height: 27px;
      padding-left: 1.625rem;
      margin-bottom: 0;
      color: #222328;
    }
  }

  .addRoleBox.changeWidth {
    flex: 0 0 17rem;
    padding: 0.5rem 1rem;
    padding-top: 10px;
    padding-bottom: 0.5rem;
  }

  .roleStylesMin {
    padding: 4px;
    width: auto;
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    text-align: center;
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    > p {
      margin-bottom: 0;
    }
  }

  .roleContainer {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    .roleSec {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
    }
  }

  .containerSA {
    border-left: 4px solid #329300;
  }

  .containerTN {
    border-left: 4px solid #c0242b;
    background: #fafafa;
  }

  .tooltip-role {
    /* position: relative; */
    display: inline-block;
    cursor: inherit;

    > img {
      cursor: inherit;
    }

    .tooltiptext {
      visibility: hidden;
      width: 5.5rem;
      background-color: black;
      color: #fff;
      text-align: center;
      border-radius: 6px;
      padding: 5px 0;
      position: absolute;
      z-index: 1;
      bottom: 1.75rem;
      right: 7rem;
      opacity: 0;
      -webkit-transition: opacity 1s;
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

  .tooltip-role {
    .tooltipLocation {
      bottom: 3.8rem;
      left: 18.55rem;
    }
    .tooltipPhone {
      bottom: 1.3rem;
      left: 18.75rem;
    }
    .tooltipEmail {
      bottom: 1.3rem;
      left: 29.2rem;
    }
  }
  .tooltip-role.viewOnly {
    .tooltiptext {
      bottom: 4.95rem;
      right: -0.25rem;
    }
  }

  .proj-heading {
    color: #222328;
    font-size: 1.375rem;
    opacity: 1;
    font-weight: normal;
    letter-spacing: 0px;
    font-family: Montserrat;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e3e3e3;
    margin-bottom: 2rem;
    @media screen and (min-width: 320px) and (max-width: 765px) {
      font-size: 22px;
    }
    @media screen and (min-width: 762px) and (max-width: 991px) {
      font-size: 24px;
    }
    @media screen and (min-width: 992px) {
      font-size: 30px;
    }
  }

  .name-heading {
    font-size: 1.1rem;
    opacity: 1;
    letter-spacing: 0px;
    font-family: Montserrat;
    @media screen and (min-width: 320px) and (max-width: 765px) {
      font-size: 16px;
    }
    @media screen and (min-width: 762px) {
      font-size: 18px;
    }
  }

  .role-heading {
    font-size: 1.1rem;
    opacity: 1;
    letter-spacing: 0px;
    font-family: Montserrat;
    @media screen and (min-width: 320px) and (max-width: 575px) {
      font-size: 16px;
    }
    @media screen and (min-width: 576px) {
      font-size: 18px;
    }
  }

  .helpTextWrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;

    .roleText {
      font-size: 12px;
      color: #555555;
      padding-bottom: 0.5rem;
    }
  }

  .tooltip-role img:hover + span.tooltiptext {
    visibility: visible;
    opacity: 1;
  }
  .rotate-90 {
    transition: all 0.3s ease 0s;
    color: rgb(193, 14, 33) !important;
    transform: translate(0%, 0%) rotateZ(90deg) !important;
    padding-left: 4px !important;
    padding-left: 10px !important;
  }
  .rotate-90-anti {
    transition: 0.3s;
    transform: rotateZ(0deg);
  }
  .rotate-90-anti {
    transition: 0.3s;
    transform: rotateZ(0deg);
    padding-left: 10px !important;
  }

  .connection-td-wrapper {
    position: relative;
    .popoverWrapper {
      position: absolute;
      width: 8rem;
      background: #fff;
      padding: 0.5rem;
      box-shadow: 0px 3px 6px #00000029;
      border: 1px solid #e3e3e3;
      top: 0.7rem;
      right: -1rem;
      z-index: 99;
      line-height: 1.75;
      text-align: left;

      > p {
        cursor: pointer;
      }
      > button {
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 18px;
        font-family: Montserrat;
        color: #343a40;
        margin-bottom: 0 !important;
      }
    }
  }

  .noBtnStyle {
    background: none;
    border: none;
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
  .d-flex.btnGrp-addTanant {
    margin-bottom: 3rem;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 4rem;

    > .btn {
      padding: 0.5rem 2rem;
    }
  }

  .labelNames {
    color: #222328;
    font-weight: 500;
    font-size: 16px;
    line-height: 25px;
  }

  .btn.btn-primary:disabled {
    color: #fff;
    background-color: #aaaaaa;
    border-color: #aaaaaa;
    -webkit-box-shadow: none;
    box-shadow: none;
    font-size: 16px;
  }
  .nheight {
    height: 87px;
  }
  @media screen and (min-width: 320px) and (max-width: 575px) {
    .user-mob {
      background: rgb(188 195 202 / 10%);
      border-radius: 12px;
      padding: 20px;
    }
    .user-style {
      width: auto;
      height: auto;
    }
    .user-style img {
      width: 50%;
    }
  }
  .roleName {
    font-weight: 600;
  }
  .roleClientName {
    font-weight: 600;
  }
`;
export default ProfileWrapper;
