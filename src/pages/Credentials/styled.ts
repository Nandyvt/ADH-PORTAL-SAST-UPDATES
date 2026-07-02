import styled from "styled-components";

const CredentialsWrapperStyles = styled.div`
  input:focus + span {
    transform: rotate(180deg);
  }
  .form-wrapper {
    width: 100%;
  }
  .font-12 {
    font-size: 12px;
  }
  .font16 {
    font-size: 16px;
  }
  .font14 {
    font-size: 14px;
  }
  .card-active {
    border-left: 4px solid #329300;
  }
  .card-inactive {
    border-left: 4px solid var(--dark);
    background-color: #f8f8f8;
  }
  .filter-top-large {
    @media screen and (min-width: 991px) {
      margin-top: 32px !important;
    }
  }
  .client-status-filter {
    @media screen and (min-width: 576px) {
      margin-bottom: 16px !important;
    }
  }
  .channel-filter {
    @media screen and (min-width: 576px) and (max-width: 991px) {
      margin-top: 0px !important;
    }
  }
  .credential-span {
    @media screen and (min-width: 576px) {
      margin-bottom: 12px;
    }
  }
  .create-btn-sm {
    @media screen and (max-width: 991px) {
      margin-bottom: 12px;
    }
  }
  .cred-heading {
    color: #222328;
    font-size: 30px;
    line-height: 37px;
    font-weight: 400;
    @media screen and (min-width: 320px) and (max-width: 767px) {
      font-size: 22px;
      line-height: 27px;
    }
    @media screen and (min-width: 768px) and (max-width: 991px) {
      font-size: 24px;
      line-height: 29px;
    }
  }
  .m15 {
    margin: 15px;
  }
  .clientText {
    color: #c10e21;
    opacity: 1;
    font-weight: 400;
    margin-bottom: 12px;
    max-width: 200px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-right: 5px;

    @media screen and (max-width: 767px) {
      max-width: 130px;
    }
  }
  .greendot,
  .blackdot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
  .greendot {
    background-color: #329300;
  }
  .blackdot {
    background-color: #343a40;
  }
  .red-tooltip + .tooltip > .tooltip-inner {
    background-color: #f00;
  }
  .cursorpointer {
    cursor: pointer;
  }
  .card-text {
    font-size: 12px;
    color: #c10e21;
    opacity: 1;
    color: red;
    border: 1px;
    padding: 3px;
    text-align: center;
    font-family: Montserrat;
  }
  .common-field {
    font-size: 12px;
    color: #555555;
    font-family: Montserrat;
  }
  .common-value {
    font-size: 14px;
    color: #222328;
    font-family: Montserrat;
    font-weight: 500;
    line-height: 18px;
    // overflow: hidden;
  }
  .permission-icon {
    width: 18px;
    height: 18px;
    margin-right: 12px;
  }
  .copy-icon {
    width: 1%;
    width: 9px;
    height: 9px;
  }
  .font-14 {
    font-size: 14px;
  }
  .create-credential {
    margin: 20px 0px 0px 0px;
    font-weight: 600;
  }
  .plus-icon {
    margin-top: 20px;
  }
  .card-title-text {
    font-weight: 400;
    font-family: Montserrat;
    text-align: center;
    display: inline-block;
    padding: 0px 6px 15px 6px;
    border-radius: 4px;
    border: none;
  }
  .api-text {
    background-color: rgb(193 14 32 / 8%);
    color: #b50b1c;
    padding: 4px 8px;
  }
  .api-card-text {
    background-color: rgb(193 14 32 / 8%);
    color: #c10e21;
    font-weight: 500;
    padding: 4px 8px;
    border-radius: 4px;
  }

  .api-text-focus {
    background-color: rgba(193, 14, 32, 1);
    color: #ffffff;
  }
  .nats-text {
    background-color: rgba(0, 157, 147, 0.1);
    color: #027770;
  }
  .nats-card-text {
    background-color: rgba(0, 157, 147, 0.1);
    color: #027770;
    padding: 4px 8px;
    border-radius: 4px;
  }

  .nats-text-focus {
    background-color: rgba(0, 157, 147, 1);
    color: #ffffff;
  }
  .left-1 {
    width: 40%;
    margin-bottom: 5px;
  }
  .mid {
    width: 50%;
  }
  .mid span {
    display: inline-block;
    width: 10px;
  }
  .tags {
    padding: 4px 8px;
  }
  .icons {
    text-align: right;
    width: 70px;
    margin-left: auto;
  }
  .two-icon {
    text-align: end;
  }
  .copy-icons {
    padding-left: 28px;
  }
  .ellipses {
    font-weight: bold;
    font-size: 1rem;
    letter-spacing: 0.4rem;
    cursor: pointer;
    color: #343a40;
  }
  .noBtnStyle {
    background: none;
    border: none;
    height: fit-content;
  }
  .bg-selected {
    background-color: #e8e8e9;
  }
  .filter-label {
    font-size: 14px;
    font-weight: 500;
    color: var(--primary-black);
    padding: 0 5px;
  }
  .nobtnstyle:focus {
    outline: 2px solid #d6700a !important;
    -webkit-box-shadow: 0 0 4px 4px #d6700a !important;
    box-shadow: 0 0 4px 4px #d6700a !important;
  }
  .noBtnStyle:focus-visible {
    outline: none;
  }
  .three-dot-icon {
    font-size: 25px;
    padding-right: 12px;
  }

  .tenantCircle {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #009d92;
    border: 1px solid #009d92;
    display: inline-block;
  }
  .clientCircle {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #1978b2;
    border: 1px solid #1978b2;
    display: inline-block;
  }

  .multiSelectContainer {
    > p {
      margin-bottom: 0.5rem;
      > span {
        margin-right: 0.25rem;
      }
    }
    .highlightOption,
    li:hover {
      background: #2223280d;
      color: #222328;
    }
    .chip {
      display: none !important;
      padding: 4px 10px;
      background: #c10e2136;
      margin-right: 5px;
      margin-bottom: 5px;
      border-radius: 11px;
      display: inline-flex;
      align-items: center;
      font-size: 12px;
      line-height: 15px;
      color: #c10e21;
      border-radius: 0px !important;
      font-weight: 500;
    }
    .searchWrapper {
      input {
        padding: 5px;
        margin-bottom: 3px;
        padding-left: 7rem;
      }
    }
  }

  .multiSelectContainer.multiCntNone {
    .searchWrapper {
      input {
        padding-left: 1rem;
      }
    }
  }
  [type="checkbox"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    position: relative;
    margin-right: 2px;
  }
  [type="checkbox"]::before {
    width: 20px;
    height: 20px;
    border: solid 1px #bdc3c9;
    margin-right: 8px;
    position: relative;
    content: "";
    display: inline-block;
  }
  [type="checkbox"]:checked::before {
    border: 2px solid #c10e21;
  }

  [type="checkbox"]:checked::after {
    content: "";
    position: absolute;
    top: 0.35rem;
    left: 0.25rem !important;
    border: 2px solid #c10e21;
    border-top: none;
    border-right: none;
    height: 0.375rem;
    transform: rotate(-45deg);
    width: 0.75rem;
    border-color: #c10e21;
  }

  .aha-icon-cancel-icon {
    &::before {
      font-size: 1.2rem;
      left: -0.75rem;
      top: 0.2rem;
    }
  }

  .aha-icon-arrow-down {
    &::before {
      width: 10px;
      margin-right: 0.2em;
      text-align: center;
      font-variant: normal;
      text-transform: none;
      line-height: 1em;
      margin-left: 0.2em;
      font-size: 43%;
      font-weight: normal;
      top: -4px;
      position: absolute;
    }
  }

  .icon_down_dir:before {
    display: none;
  }

  .searchWrapper {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0px;
    min-height: 22px;
    position: relative;
    background: #fff;
    cursor: pointer;
  }
  .connection-td-wrapper {
    position: relative;
    .popoverWrapper {
      position: absolute;
      width: 9.4rem;
      background: #fff;
      padding: 0.5rem;
      box-shadow: 0px 3px 6px #00000029;
      border: 1px solid #e3e3e3;
      top: 1rem;
      left: -7rem;
      z-index: 99;
      border-top: 4px solid var(--primary) !important;
      border: 1px solid var(--gray);
      @media screen and (min-width: 320px) and (max-width: 575px) {
        left: -7rem;
      }
      @media screen and (min-width: 576px) and (max-width: 767px) {
        /* small Tablet */
        width: 7.25rem;
      }

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
        width: 100%;
        text-align: left;
      }
    }
  }

  .cardwidth {
    overflow: visible;
    padding: 0 !important;
  }

  .card-row {
    display: flex;
    padding: 0 15px;
  }

  .card-row .tags,
  .card-row .icons {
    margin-top: 8px;
    margin-bottom: 12px;
  }

  .card-row .tags,
  .card-row .icons {
    margin-top: 8px;
    margin-bottom: 12px;
  }

  .icons {
    text-align: right;
    width: 70%;
  }

  .left-1 {
    width: 40%;
    margin-bottom: 20px;
  }

  .card-row p {
    margin-bottom: 0;
  }

  .mid {
    width: 50%;
  }
  .mid span {
    vertical-align: top;
    display: inline-block;
    width: 10px;
  }

  .copy-icon {
    width: 1%;
    width: 9px;
    height: 9px;
  }

  .card-row .mid p {
    display: inline-block;
    width: calc(100% - 15px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .card-row p {
    margin-bottom: 0;
  }

  p {
    margin-top: 0;
    margin-bottom: 1rem;
  }
  .flex-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .flex-container > div {
  }
  .filter-clicked {
    color: #c10e21;
  }

  /* Target every fourth .col element within the #dynamic-row */
  .row > .padding-remove:nth-child(1n) .card-common {
    @media screen and (min-width: 576px) and(max-width: 991px) {
      margin-left: 0 !important;
    }
    @media screen and (min-width: 992px) {
      margin-left: 0 !important;
    }
  }
  .row > .padding-remove:nth-child(2n) .card-common {
    @media screen and (min-width: 576px) and (max-width: 991px) {
      margin-right: 0 !important;
      margin-left: 15px !important;
    }
  }

  .row > .padding-remove:nth-child(4n) .card-common {
    @media screen and (min-width: 992px) {
      margin-right: 0 !important;
    }
  }

  .border-bottom {
    border-bottom: 1px solid #e3e3e3;
  }
  .channel-text {
    font-weight: 500;
    font-size: 12px;
  }
  .hideInMobile {
    display: none !important;
  }
  .bottom-70 {
    bottom: -70px;
  }
  .bottom-0 {
    bottom: 0;
    box-shadow: 0px -4px 6px #00000029;
  }
  .mt10px {
    margin-top: 10px;
  }
  .card-common {
    max-height: 9.813rem;
    padding: 10px;
    @media screen and (min-width: 768px) and (max-width: 991px) {
      /* Ipad */
      margin-bottom: 29px;
      margin-right: 15px;
    }
    @media screen and (min-width: 992px) {
      margin-bottom: 29px;
      margin-right: 15px;
      margin-left: 15px;
    }
    @media screen and (min-width: 576px) and (max-width: 767px) {
      /* small Tablet */
      margin-bottom: 19px;
      margin-right: 15px;
    }
    @media only screen and (min-width: 320px) and (max-width: 576px) {
      /* Mobile */
      max-height: unset;
      margin-bottom: 11px;
    }
  }
  .show-filter {
    display: none;
    @media screen and (min-width: 320px) and (max-width: 576px) {
      display: inline-flex;
    }
  }

  .filter-width {
    width: 32%;
    margin: 0 0px 30px 0px;
    @media screen and (min-width: 320px) and (max-width: 575px) {
      width: 100%;
      margin: 0 0px 30px 0px;
    }
    @media screen and (min-width: 576px) and (max-width: 767px) {
      width: 42%;
    }
    @media screen and (min-width: 768px) and (max-width: 991px) {
      width: 44%;
      margin: 0 0px 30px 0px;
    }
  }
  .d-flex.btnGrp-addTanant {
    margin-bottom: 30px;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 30px;
    @media screen and (min-width: 320px) and (max-width: 575px) {
      margin-bottom: 0;
      background-color: #fff;
      left: 0;
      padding: 1rem;
      flex-direction: row;
      justify-content: center;
      margin-top: 0;
      position: sticky;
      transition: bottom 0.3s !important;
      > .btn {
        font-size: 14px;
        padding: 0.5rem 14px;
      }
    }
    @media screen and (min-width: 576px) and (max-width: 767px) {
      /* small Tablet */
      justify-content: center;
      margin-top: 0;
      margin-bottom: 0;
    }
    @media screen and (min-width: 768px) and (max-width: 991px) {
      /* Ipad */
      margin-top: 0;
    }

    > .btn {
      padding: 0.5rem 2rem;
    }
  }

  .star-content {
    margin-top: 4px;
  }
  aui-tooltip {
    height: fit-content;
  }
  .tooltip-role {
    position: relative;
    cursor: pointer;
    height: fit-content;

    > img {
      cursor: pointer;
    }
    .tooltiptext {
      visibility: hidden;
      width: 8rem;
      background-color: black;
      color: #fff;
      text-align: center;
      border-radius: 6px;
      padding: 5px 2px;
      position: absolute;
      z-index: 1;
      bottom: 3rem;
      right: -3rem;
      opacity: 0;
      -webkit-transition: opacity 1s;
      transition: opacity 1s;
      font-size: 11px;
      line-height: 20px;
      @media screen and (min-width: 320px) and (max-width: 575px) {
        right: 0;
      }
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
  .tooltip-role .tooltip-right span.tooltiptext {
    bottom: 1rem;
    &::after {
      top: 27%;
      left: 104%;
      border-color: transparent transparent transparent black;
    }
  }
  .tooltip-role.viewOnly {
    .tooltiptext {
      bottom: 1.95rem;
    }
  }
  .helpTextWrapper {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
  }
  .tooltip-role .cardwrapper-ellipses:hover + span.tooltiptext {
    visibility: visible;
    opacity: 1;
    right: 3rem;
  }
  .tooltip-role img:hover + span.tooltiptext {
    visibility: visible;
    opacity: 1;
    right: -3.25rem;
    @media screen and (min-width: 320px) and (max-width: 575px) {
      display: none;
      right: 0;
    }
  }
  .tooltip-role img.helpTextStyles:hover + span.tooltiptext {
    visibility: visible;
    opacity: 1;
    right: 1.75rem;
    @media screen and (min-width: 320px) and (max-width: 575px) {
      display: none;
      right: 0;
    }
  }
  .tooltip-role .tooltip-right:focus span.tooltiptext {
    visibility: visible;
    opacity: 1;
    right: 1.75rem;
    @media screen and (min-width: 320px) and (max-width: 575px) {
      display: none;
      right: 0;
    }
  }
  button:focus .tooltip-role img + span.tooltiptext {
    visibility: visible;
    opacity: 1;
    right: -3.25rem;
    @media screen and (min-width: 320px) and (max-width: 575px) {
      display: none;
      right: 0;
    }
  }
  .tooltip-role button:focus + .tooltiptext {
    visibility: visible;
    opacity: 1;
    @media screen and (min-width: 320px) and (max-width: 575px) {
      display: none;
      right: 0;
    }
  }
  .tooltip-role button:hover + .tooltiptext {
    visibility: visible;
    opacity: 1;
    @media screen and (min-width: 320px) and (max-width: 575px) {
      display: none;
      right: 0;
    }
  }
  .cardwrapper-ellipses {
    max-width: 227px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: relative;
    margin-bottom: 15px;
    line-height: 18px;
    @media screen and (min-width: 576px) and (max-width: 767px) {
      /* small Tablet */
      width: auto;
    }
  }
  button.rotate-90:hover ~ span.tooltiptext {
    visibility: hidden !important;
    opacity: 0 !important;
  }
  @media screen and (min-width: 992px) {
    /* Desktop */
  }
  @media all and (device-width: 1024px) and (device-height: 768px) and (orientation: landscape) {
    .card-common {
    }
    .cardwrapper {
      justify-content: space-between;
    }
  }
  @media screen and (min-width: 768px) and (max-width: 991px) {
    /* Ipad */
    .card-common:nth-child(2n + 2) {
      margin-right: 0;
    }
  }
  @media screen and (min-width: 576px) and (max-width: 767px) {
    /* small Tablet */
    .card-common:nth-child(2n + 2) {
      margin-right: 0;
    }
  }
  @media screen and (max-width: 320px) and (max-width: 575px) {
    /* Mobile */
  }
  .btn-background {
    height: 66px;
    background: rgb(255, 255, 255);
    position: fixed;
    bottom: 0rem;
    width: 100%;
    right: 0rem;
    box-shadow: rgb(0 0 0 / 16%) 0px -4px 6px;
    z-index: 1;
  }
  .fxdbtn {
    position: relative;
    bottom: 0rem;
    right: 0rem;
    margin: 12px 15px;
    width: 92%;
    border-radius: 50px;
    font-size: 16px;
    line-height: 1.5;
    padding: 0.5rem 1.375rem;
  }
  .addCredsBtn {
    font-size: 14px;
    padding: 0.75rem 2rem;
    line-height: 1rem;
    border-radius: 50px;
    border: none;
  }
  .create-credentials {
    font-size: 1rem;
    line-height: 19px;
    letter-spacing: 0;
    font-weight: 500;
    padding: 0.75rem 2rem !important;
    border: none !important;
  }

  @media screen and (min-width: 320px) and (max-width: 576px) {
    .credFilterSec {
      width: 100%;
      justify-content: center;
      .show-filter {
        border: 1px solid #e3e3e3;
        padding: 8px 0;
        width: 100%;
        justify-content: center !important;
      }
    }
  }

  .aha-card-sm {
    overflow: visible;
  }
`;
export default CredentialsWrapperStyles;
