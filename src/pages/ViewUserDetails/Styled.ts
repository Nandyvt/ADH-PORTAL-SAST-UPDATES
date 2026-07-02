import styled from "styled-components";

export const ViewUserDetailsWrapperStyles = styled.div`
  min-width: 75vw;
  @media screen and (min-width: 1700px) {
    min-width: 65vw;
  }
  @media screen and (min-width: 576px) {
    margin-bottom: 30px;
    .modal-md {
      max-width: 32.5rem !important;
    }
  }
  .modal-md {
    max-width: 36.5rem;
  }
  .modal-header {
    border-bottom: 0.0625rem solid #e3e3e3;
    margin-bottom: 1.25rem;
    padding-bottom: 1rem;
    justify-content: flex-start;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-bottom: 1rem;
  }
  .modal-fullscreen-sm-down {
    width: 100vw;
    max-width: none;
    height: 100vh;
    margin: 0;
    @media screen and (min-width: 768px) {
      margin: 9.75rem auto;
      max-width: 36.5rem;
    }
  }
  .modal-fullscreen-sm-down .modal-content {
    @media (max-width: 575.98px) {
      height: 100%;
      border: 0;
      border-radius: 0;
    }
  }
  .add-heading {
    font-size: 16px;
    @media screen and (min-width: 576px) {
      font-size: 18px;
    }
  }
  .proj-heading {
    color: #222328;
    font-size: 26px;
    opacity: 1;
    line-height: 32px;

    .userSubHeading {
      color: #c10e21;
    }
  }
  .roleHeading {
    color: #222328;
    font-size: 18px;
    line-height: 27px;
    opacity: 1;
    font-weight: 600;
  }
  select.form-control {
    border: 1px solid #bcc3ca;
  }
  .form-check input[type="checkbox"]:checked + label:before {
    background-color: #ffff;
    border-color: #c10321;
  }
  .form-check label {
    cursor: pointer;
    background-color: #fff;
  }
  .form-check label:before {
    background-color: transparent;
    border: 1px solid #bcc3ca;
    cursor: pointer;
    width: 1.375rem;
    height: 1.375rem;
    left: 0;
    position: absolute;
    top: 0;
    content: "";
  }
  .form-check input[type="checkbox"]:disabled:checked + label:before {
    border: 1px solid #777979 !important;
    opacity: 0.8;
  }
  .btnbottom {
    right: 0;
    bottom: 0;
    padding: 1rem;
  }
  .editbtn {
    border: none;
    background-color: #ffff;
  }
  .form-check label:after {
    border: 2px solid #c10e21;
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
  .form-check input[type="checkbox"]:disabled + label:before,
  .form-check input[type="checkbox"]:disabled + label:after {
    cursor: not-allowed;
    border: 2px solid grey;
    border-top: none;
    border-right: none;
  }
  .btn.btn-primary:disabled {
    color: #fff;
    background-color: #aaaaaa;
    border-color: #aaaaaa;
  }
  .addRoleBox {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    display: flex;
    border: 1px solid #e3e3e3;
    border-radius: 7px;
    padding: 1.125rem 1rem;
    /*     flex: 0 0 21.5%;
    max-width: 27%; */

    .addRoleHeading {
      font: normal normal medium 16px/27px Montserrat;
      font-size: 16px;
      line-height: 27px;
      padding-left: 1rem;
      margin-bottom: 0;
      color: #222328;
    }
  }

  .addRoleBox:focus {
    outline: 2px solid #e17509 !important;
    -webkit-box-shadow: 0 0 4px 4px #e17509 !important;
    box-shadow: 0 0 4px 4px #e17509 !important;
  }

  .addRoleBox.changeWidth {
    flex: 0 0 17rem;
    padding: 1rem;
    padding-top: 10px;
    padding-bottom: 0.5rem;
  }

  .roleStylesMin {
    padding: 4px 8px;
    text-align: center;
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
    font-size: 12px;
    margin-bottom: 0;
    line-height: 1.5;
    font-weight: 500;
    display: inline-block;
  }

  .roleStylesMin.roleColorCodeTN {
    background: rgb(0 157 146 / 8%);
    margin-top: 2px;
    color: #037e76;
    font-size: 12px;
    margin-bottom: 0;
    line-height: 1.5;
    font-weight: 500;
    display: inline-block;
  }
  .roleStylesMin.roleColorCodeINACTIVE {
    position: relative;
    background: #cfd5da !important;
  }

  /* .roleStylesMin.roleColorCodeINACTIVE::after {
    background: rgb(112 112 112 / 20%);
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    content: "";
    border-radius: 4px;
  } */
  @media screen and (min-width: 992px) {
    .user-action.user-actionbtnEllipses:focus {
      line-height: 1 !important;
      padding-top: 4px !important;
      padding-bottom: 5px !important;
      padding-left: 0px !important;
    }
    .btnEllipses:focus {
      line-height: 1 !important;
      padding-top: 4px !important;
      padding-bottom: 5px !important;
      padding-left: 6px !important;
    }
  }
  .roleStylesMin.roleColorCodeCL {
    background: var(--clientAdmin-bgColor);
    margin-top: 2px;
    color: var(--clientAdmin-color);
    font-size: 12px;
    margin-bottom: 0;
    line-height: 1.5;
    font-weight: 500;
    display: inline-block;
  }

  .roleStylesMin.roleColorCodeEU {
    background: var(--endUser-bgColor);
    margin-top: 2px;
    color: var(--endUser-color);
    font-size: 12px;
    margin-bottom: 0;
    line-height: 1.5;
    font-weight: 500;
    display: inline-block;
  }

  .roleContainer {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    .roleSec {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      > span {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
      }
      .groupedRoleStyle {
        display: flex;
        max-width: 16.5vw;
        @media screen and (max-width: 767px) {
          max-width: 200px;
        }
        @media screen and (min-width: 768px) and (max-width: 991px) {
          max-width: 295px;
        }
      }
    }

    .col-md-3 {
      display: flex;
      flex-direction: row;
      align-items: flex-end;
    }
  }

  .containerSA {
    border-left: 4px solid #329300 !important;
  }

  .containerTN {
    border-left: 4px solid #343a40 !important;
    background: #fafafa;
  }
  .Img-tooltip {
    /* position: relative; */
    display: inline-block;
    margin-left: 5px !important;

    .Img-tooltiptext {
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
      right: 7.5rem;
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
    position: relative;
    display: inline-block;
    margin-left: 5px;
    > img {
      cursor: pointer;
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
      right: -2rem;
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
  .select-client-section .tooltip-role {
    margin-left: 0px !important;
  }
  .select-client-section .tooltiptext {
    width: auto;
    padding: 5px 7px;
    bottom: 2.85rem;
    right: 8rem;
  }
  .tooltip-role.viewOnly {
    .tooltiptext {
      bottom: 1.95rem;
      right: -2.25rem;
    }
  }

  .helpTextWrapper {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
  }
  .tooltip-role .select-client select:focus ~ span.tooltiptext,
  .tooltip-role .select-client select:hover ~ span.tooltiptext {
    visibility: visible;
    opacity: 1;
  }
  .tooltip-role i:hover + span.tooltiptext,
  .tooltip-role i:focus + span.tooltiptext {
    visibility: visible;
    opacity: 1;
  }

  .tooltip-role .headingTooltipEle:hover + span.tooltiptext,
  .tooltip-role .headingTooltipEle:focus + span.tooltiptext {
    visibility: visible;
    opacity: 1;
  }

  .Img-tooltip img:hover + span.Img-tooltiptext,
  .Img-tooltip img:focus + span.Img-tooltiptext {
    visibility: visible;
    opacity: 1;
  }
  .tooltip-role img.rotate-90:hover + span.tooltiptext {
    visibility: hidden;
    opacity: 0;
  }
  .rotate-90 {
    /* transition: all 0.3s ease 0s; */
    color: rgb(193, 14, 33) !important;
    /* transform: translate(0%, 0%) rotateZ(90deg) !important; */
  }
  .rotate-90-anti {
    /* transition: 0.3s; */
    /* transform: rotateZ(0deg); */
  }

  .connection-td-wrapper {
    position: relative;
    .popoverWrapper {
      position: absolute;
      width: 8rem;
      background: #fff;
      padding: 0.5rem;
      box-shadow: 0px 3px 6px #00000029;
      border: 1px solid #6d6e71;
      top: 0.7rem;
      right: -1rem;
      z-index: 99;
      line-height: 1.75;
      text-align: left;
      border-top: 4px solid var(--primary);
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
        text-align: left;
        width: 100%;
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
  }
  .helpTextStylesImg {
    width: 14px;
    margin-right: 4px;
  }

  .d-flex.btnGrp-addTanant {
    margin-bottom: 30px;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 30px;

    > .btn {
      /* padding: 0.5rem 2rem; */
    }
  }

  .labelNames {
    color: #222328;
    font-weight: 500;
    font-size: 16px;
    line-height: 25px;
  }
  .btn {
    -webkit-box-shadow: none;
    box-shadow: none;
    font-size: 1rem;
    line-height: 1.375rem;
    padding: 0.5rem 2rem;
    font-weight: 500;
  }

  .btn.btn-primary:disabled {
    color: #fff;
    background-color: #aaaaaa;
    border-color: #aaaaaa;
    -webkit-box-shadow: none;
    box-shadow: none;
    font-size: 16px;
  }

  .addRoleWrapper {
    cursor: pointer;
  }

  .ml-gutter {
    margin-left: 30px;
  }

  .offset-1 {
    margin-left: 30px;
  }
  .offset-2 {
    margin-left: 9.8rem;
    @media screen and (min-width: 1000px) and (max-width: 1450px) {
      margin-left: 8.2rem;
    }
  }

  .col-md-1 {
    -ms-flex: 0 0 10.33333%;
    flex: 0 0 10.33333%;
    max-width: 10.33333%;
  }

  .addRoleBox:hover {
    box-shadow: 0 2px 4px rgb(0 0 0 / 20%);
  }

  .containerSection {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    border: 1px solid #e3e3e3;
    border-radius: 7px;
    /*     flex: 0 0 30%;
    max-width: 30.333%; */
    padding: 1rem;
    padding-top: 10px;
    padding-bottom: 0.5rem;
  }

  select + i {
    float: right;
    margin-top: -25px;
    @media screen and (min-width: 320px) and (max-width: 575px) {
      margin-top: -20px;
    }
    position: relative;
    margin-right: 9px;
    pointer-events: none;
    background-color: #fff;
    padding-right: 5px;
  }
  .forModal {
    font-size: 43%;
  }
  select.form-control {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-image: none;
    background-repeat: no-repeat;
  }
  .rotate-90-anti:hover ~ span.tooltiptext {
    opacity: 1 !important;
    visibility: visible;
  }
  button.rotate-90:hover ~ span.tooltiptext {
    visibility: hidden !important;
    opacity: 0 !important;
  }
  .rotate {
    transform: rotate(180deg);
  }

  .ml-gutter-row {
    margin-left: 15px;
    .colStyles {
      padding-bottom: 30px;
    }
  }

  .user-heading {
    display: flex;
    font-size: 30px;
    line-height: 37px;
    font-weight: 400;
    @media screen and (min-width: 320px) and (max-width: 767px) {
      flex-direction: column;
      font-size: 22px;
      line-height: 34px;
    }
    @media screen and (min-width: 768px) and (max-width: 991px) {
      font-size: 24px;
      line-height: 29px;
    }
    .primary-color {
      color: #c10e21;
    }
  }
  .user-hyphen {
    margin-left: 6px;
    @media screen and (min-width: 320px) and (max-width: 412px) {
      display: none;
    }
  }

  .user-email i {
    padding-right: 10px;
  }
  .user-email div {
    word-break: break-all;
    font-size: 16px;
    line-height: 25px;
    color: #222328;
    font-weight: 500;
  }
  .user-email {
    display: flex;
    font-size: 16px;
    font-weight: 500;
    @media screen and (max-width: 767px) {
      .email-icon-styles {
        margin-top: -4px !important;
      }
    }
  }
  .user-status-activate {
    background: #2e8104;
    border-radius: 4px;
    color: #ffffff;
    font-size: 12px;
    text-align: center;
    padding: 4px 8px;
    margin-right: 1rem;
    @media screen and (min-width: 320px) and (max-width: 575px) {
      margin-left: 1.95rem;
    }
    @media screen and (min-width: 576px) and (max-width: 767px) {
      margin-right: 0px !important;
    }
  }
  .user-status-inactivate {
    background: #707070;
    color: #ffffff;
    border-radius: 4px;
    font-size: 12px;
    padding: 4px 8px;
    margin-right: 1rem;
    @media screen and (min-width: 320px) and (max-width: 575px) {
      margin-left: 1.5rem;
    }
    @media screen and (min-width: 576px) and (max-width: 991px) {
      margin-right: 0px !important;
    }
  }
  .user-status-pending {
    background: #1978b2;
    color: #ffffff;
    border-radius: 4px;
    font-size: 12px;
    padding: 4px 8px;
    margin-right: 1rem;
    @media screen and (min-width: 320px) and (max-width: 575px) {
      margin-left: 1.5rem;
    }
    @media screen and (min-width: 576px) and (max-width: 991px) {
      margin-right: 0px !important;
    }
  }

  .esa-block {
    display: flex;
    justify-content: space-between;
  }
  @media screen and (min-width: 992px) {
    .cardWidth.col-lg-4 {
      flex: 0 0 330px;
    }

    .cardSecWrapper {
      align-items: flex-start;
      > .responsiveBadgeStyle {
        margin-top: 16px;
      }
    }
  }

  @media screen and (min-width: 992px) and (max-width: 1400px) {
    .roleColorCodeSA.badgeHeading {
      padding: 4px 6px;
    }
    .modal-dialog.editaccess-modal {
      margin: 9.75rem auto;
    }
  }
  @media screen and (max-width: 991px) {
    .hideColumn {
      display: none !important;
    }
    .responsiveBadgeStyle {
      text-align: left;
      /* padding-left: 15px; */
    }
    .ml-gutter-row {
      margin-left: -15px;
    }
    .responsiveBadgeStyle .badgeHeading {
      font-size: 14px;
    }
    .cardSecWrapper {
      align-items: center;
    }
  }

  @media screen and (min-width: 576px) {
    .addRoleMobBtn {
      display: none !important;
    }
    .modal-dialog.editaccess-modal {
      margin: 9.75rem auto;
    }
  }

  @media screen and (min-width: 576px) and (max-width: 767px) {
    .d-flex.btnGrp-addTanant {
      justify-content: center;
    }

    /* Addition UI comments fix */

    .respStylesHeadingWrapper {
      margin-top: 0.375rem;
    }
    .user-details-block {
      position: relative;
    }
    .user-action {
      position: absolute;
      top: 3px;
      right: 0px;
    }
    .esa-block {
      display: flex;
      flex-direction: row;
    }
    .user-heading {
      padding-bottom: 0.75rem;
      font-size: 22px;
      margin-bottom: 0;
      > p {
        margin-bottom: 0;
      }
    }

    label.col-sm-2,
    .col-form-label {
      padding-top: 0;
      padding-bottom: 8px;
    }
    .form-group {
      margin-bottom: 0.75rem;
    }
    .roleHeading {
      color: #222328;
      font-size: 18px;
      line-height: 27px;
      opacity: 1;
      margin-top: 0.625rem;
      font-weight: 600;
      margin-bottom: 1.25rem;
    }

    .d-flex.btnGrp-addTanant {
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  @media screen and (min-width: 320px) and (max-width: 575px) {
    .labelNames {
      > span {
        display: none !important;
      }
    }

    .rotateInverse {
      transform: rotateZ(-180deg);
    }
    .d-flex.btnGrp-addTanant {
      margin-bottom: 0;
      background-color: #fff;
      width: 99%;
      left: 0;
      padding: 0.5rem;
      flex-direction: row;
      justify-content: center;
      margin-top: 0;
      position: sticky;
      box-shadow: rgb(0 0 0 / 16%) 0px -4px 6px;
      transition: bottom 0.3s !important;
      > .btn {
        font-size: 14px;
      }
      > .btn:first-child {
        margin-right: 12px !important;
      }
    }
    .bottom-70 {
      bottom: -70px;
    }
    .bottom-0 {
      bottom: 0;
      box-shadow: 0px -4px 6px #00000029;
    }
    .noBoxShadow {
      box-shadow: rgb(0 0 0 / 16%) 0px -4px 6px;
    }
    .addRoleMobBtn {
      background-color: #c10e21;
      color: #fff;
    }
    .colStyles {
      padding-bottom: 30px;
    }
    .ml-gutter-row {
      margin-left: -15px;
    }
    .hideInMobile {
      display: none !important;
    }
    .ml-gutter-row .colStyles {
      padding-bottom: 16px;
    }

    .btn-background {
      height: 60px;
      background: #fff;
      position: fixed;
      bottom: 0rem;
      width: 100%;
      right: 0rem;
      box-shadow: 0px -4px 6px #00000029;
      z-index: 99;
    }

    /* Addition UI comments fix */

    .row {
      margin-right: 0 !important;
    }

    .respStylesHeadingWrapper {
      margin-top: 0.375rem;
    }
    .esa-block {
      display: flex;
      flex-direction: column;
    }
    .user-details-block {
      position: relative;
    }
    .user-action {
      position: absolute;
      top: 3px;
      right: 10px;
    }
    .user-heading {
      padding-bottom: 0.75rem;
      margin-bottom: 0;
      font-size: 22px;
      > p {
        margin-bottom: 0;
      }
    }

    label.col-sm-2,
    .col-form-label {
      padding-top: 0;
      padding-bottom: 8px;
    }
    .form-group {
      margin-bottom: 0.75rem;
    }
    .roleHeading {
      color: #222328;
      font-size: 18px;
      line-height: 27px;
      opacity: 1;
      margin-top: 0.625rem;
      font-weight: 600;
      margin-bottom: 0.375rem;
    }

    .modal-dialog.editaccess-modal {
      margin: 0;
    }
  }

  @media screen and (min-width: 768px) and (max-width: 991px) {
    /* Addition UI comments fix */

    .respStylesHeadingWrapper {
      margin-top: 0.375rem;
    }
    .user-heading {
      padding-bottom: 0.75rem;
      margin-bottom: 0;
      > p {
        margin-bottom: 0;
      }
    }
    label.col-sm-2,
    .col-form-label {
      padding-top: 0;
      padding-bottom: 8px;
    }
    .form-group {
      margin-bottom: 0.75rem;
    }
    .roleHeading {
      color: #222328;
      font-size: 18px;
      line-height: 27px;
      opacity: 1;
      margin-top: 0.625rem;
      font-weight: 600;
      margin-bottom: 1.25rem;
    }

    .d-flex.btnGrp-addTanant {
      margin-top: 0;
    }
  }
  @media screen and (min-width: 576px) {
    .cnf-btn {
      width: auto;
    }
  }
  @media screen and (max-width: 575px) {
    #modal .modal-dialog .modal-content {
      height: auto !important;
    }
    .modal-sm {
      max-width: 31.5rem;
    }
  }
  .modal-dialog.modal-md.editaccess-modal.modalwidth .modal-content {
    @media screen and (min-width: 320px) and (max-width: 575px) {
      height: 100vh;
    }
  }
  @media screen and (min-width: 320px) and (max-width: 575px) {
    .role-ellipse .tooltip-role button:hover + .tooltiptext {
      display: none;
      right: 0;
    }
    .role-ellipse .tooltip-role i:hover + .tooltiptext {
      display: none;
      right: 0;
    }
    .user-action .tooltiptext {
      width: 4.6rem;
      right: -1.6rem;
      line-height: 16px;
    }
  }
  .aui-modal.addRoleModal.show {
    display: inline-block;
  }
  .aui-modal.editRoleModal.show {
    display: inline-block;
  }
  .instruction {
    color: #555;
    font-size: 14px;
    font-weight: 500;
  }
  @media screen and (max-width: 575px) {
    .instruction {
      font-size: 12px;
      margin-bottom: 0px;
      margin-top: 1rem;
    }
  }
  .close {
    position: absolute;
    right: -4px;
    top: -5px;
  }
  .close:not(:disabled):not(.disabled):hover,
  .close:not(:disabled):not(.disabled):focus {
    opacity: 1;
  }
  .roleName {
    font-weight: 600;
  }
  .roleClientName {
    font-weight: 600;
  }

  .tooltip-role .headingTooltipEle:hover + span.tooltiptext,
  .tooltip-role .headingTooltipEle:focus + span.tooltiptext {
    visibility: visible;
    opacity: 1;
  }
  .cursPointer {
    cursor: pointer;
  }

  .headingWrapperTooltip {
    width: 100%;
    padding-left: 0 !important;
    .headingTooltipEle {
      display: inline-block;
    }
    .tooltiptext {
      left: 4%;
      bottom: 3rem;
      width: auto;
      @media screen and (max-width: 767px) {
        width: 15rem;
      }
      @media screen and (min-width: 768px) {
        max-width: 30%;
      }
      padding: 0.5rem;
      word-break: break-all;
      z-index: 1001;
    }
  }

  .tooltip-role {
    position: relative;
  }

  .header-title {
    max-width: 85%;
    max-height: 4.625rem;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    display: -webkit-box !important;
    @media screen and (min-width: 768px) {
      max-width: calc(100% - 120px);
    }
  }
  .container-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 30px;
    grid-row-gap: 20px;
    margin: 0 auto; /* Centering the container */
  }

  .item {
    background-color: #ccc;
    padding: 20px;
    text-align: center;
  }

  .item:last-child {
    grid-column: span 4;
    width: calc(100% - 30px);
  }

  @media screen and (min-width: 576px) and (max-width: 991px) {
    .container-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media screen and (max-width: 575px) {
    .container-grid {
      grid-template-columns: 1fr;
      grid-gap: 10px;
    }

    .item:last-child {
      grid-column: span 1;
      width: calc(100% - 10px);
    }
  }
  .border-bottom-email {
    border-bottom: 1px solid #e5e5e5;
  }
  .mt-32px {
    margin-top: 32px;
    @media screen and (min-width: 320px) and (max-width: 767px) {
      margin-top: 24px;
    }
  }
  .mt-40px {
    margin-top: 40px;
    @media screen and (min-width: 320px) and (max-width: 575px) {
      margin-top: 24px;
    }
    @media screen and (min-width: 576px) and (max-width: 767px) {
      margin-top: 32px;
    }
  }

  .super-admin-label {
    font-size: 18px;
    line-height: 27px;
    opacity: 1;
    font-weight: 500;
    // for small devices
    @media screen and (min-width: 320px) and (max-width: 991px) {
      font-size: 16px;
    }
  }
  .client-label {
    font-size: 18px;
    line-height: 27px;
    opacity: 1;
    font-weight: 500;
    @media screen and (min-width: 320px) and (max-width: 575px) {
      font-size: 16px;
    }
  }
  .responsiveBadgeStyle > p {
    @media screen and (min-width: 320px) and (max-width: 575px) {
      margin-bottom: 12px !important;
    }
  }
  .roleText {
    font-size: 12px;
    line-height: 18px;
    color: #555555;
  }
  .mb-14px {
    margin-bottom: 14px;
  }

  .connection-td-wrapper {
    .popoverWrapper {
      aui-button {
        a {
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 18px;
          color: var(--bgcolor-343a40);
          width: 100%;
          text-align: left;
          padding: 0 6px;

          &:focus {
            border-radius: 0;
          }
        }
      }
    }
  }

  @media screen and (min-width: 320px) and (max-width: 575px) {
    .btnGrp-add {
      > .btn.btn-primary {
        justify-content: center;
      }
    }
  }
`;
