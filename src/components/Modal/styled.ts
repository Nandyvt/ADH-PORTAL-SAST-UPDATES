import styled from "styled-components";

const ModalWrapper = styled.div`
  .modalwidth{
    width: 583px;
    @media screen and (max-width: 576px) {
      width: 100%;
    }
  }
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1050;
    display: inline-block;
    width: 100%;
    height: 100%;
    overflow: hidden;
    outline: 0;
    @media screen and (max-width: 993px) {
      left: 0;
    }
  }
  .modal-sm {
    @media screen and (min-width: 576px) {
      max-width: 31.5rem;
    }
    @media screen and (min-width: 768px) {
      max-width: 38.5rem;
    }
  }
  .modal-text {
    display: block;
    text-align: center;
    font-weight: 600;
    font-size: 16px;
    padding-left: 2.25rem;
    padding-right: 2.25rem;
    line-height: 28px;
    letter-spacing: 0px;
    color: #222328;
    opacity: 1;
    @media screen and (min-width: 576px) {
      padding-left: 4.5rem;
      padding-right: 4.5rem;
      line-height: 32px;
    }
    @media screen and (min-width: 768px) {
      padding-left: 6.5rem;
      padding-right: 6.5rem;
    }
    @media screen and (min-width: 768px) {
      font-size: 18px;
      line-height: 36px;
    }
  }
  .cnf-btn {
    text-align: center;
    font-weight: 500;
    padding: 8px 28px;
    font-size: 16px;
    line-height: 19px;
    font-family: Montserrat;
    letter-spacing: 0px;
    border: 2px solid #b1292a;
    border-radius: 50px;
    opacity: 1;
    width: 130px;
    @media screen and (min-width: 576px) {
     width: 88px;
    }
     @media screen and (min-width: 992px) and (max-width: 1200px) {
     width: 150px;
    }
  }
  .cnf-btn-non-focus {
    box-shadow: none !important;
    outline: none !important;
  }
  .lockimg {
    padding-top: 25px;
    padding-bottom: 24px;
    width: 80px;
    @media screen and (min-width: 576px) {
    width: 95px;
    }
  }
  .super-admin {
    color: var(--superAdmin-superUser-color);
    background-color: var(--superAdmin-superUser-bgColor);
    opacity: 1;
    border-radius: 4px;
  }
  .aha-admin {
    color: #10689f;
    background-color: rgba(0, 157, 146, 0.1);
    opacity: 1;
    border-radius: 4px;
  }
  .modal-dialog-centered {
    @media screen and (min-width: 320px) and (max-width: 575px) {
      min-height: 100% !important;
    } 
}
  .modal-dialog {
   @media screen and (min-width: 320px) and (max-width: 575px) {
      max-width: 100%;
    }
  .modal-content {
   @media screen and (min-width: 320px) and (max-width: 575px) {
      position: absolute;
      bottom: 0;
      border: none !important;
    }
  .client-admin {
    letter-spacing: 0px;
    color: var(--clientAdmin-color);
    background-color: var(--clientAdmin-bgColor);
    opacity: 1;
    border-radius: 4px;
  }
  .client-user {
    letter-spacing: 0px;
    color: var(--endUser-color);
    background-color: var(--endUser-bgColor);
    opacity: 1;
    border-radius: 4px;
  }
  .role {
    padding-left: 3.125rem;
    padding-right: 3.125rem;
  }
  .role-text {
    padding: 0.25rem 0.5rem;
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    text-align: center;
    letter-spacing: 0;
    font-family: Montserrat;
  }

  .warning-msg {
    padding-top: 1rem;
    padding-bottom: 1rem;
    color: #707070;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0;
    text-align: center;
    font-family: Montserrat;
    font-weight: 500;
    padding-right: 2rem;
    padding-left: 2rem;
    white-space: pre-wrap;
    @media screen and (min-width: 576px) {
      padding-right: 5.125rem;
      padding-left: 5.125rem;
    }
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
    bottom: 1.5rem;
    margin-left: -2rem;
    opacity: 0;
    transition: opacity 1s ease 0s;
    font-size: 12px;
    line-height: 20px;
  }
  .tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 7px;
    border-style: solid;
    border-color: black transparent transparent;
  }
  .tooltip-role {
    position: relative;
  }
  .pencil-icon {
    padding-left: 0.5rem;
    cursor: pointer;
  }
  .pencil-icon:hover ~ p.tooltiptext {
    visibility: visible;
    opacity: 1;
    display: block;
  }
  .pb-40 {
    padding-bottom: 2.5rem;
  }
  .modal-close-style{
    position:absolute;
    right:0;
    top:0;
  }
   .modal-dialog.modalwidth.inviteuser-modal .modal-content {
    @media screen and (min-width: 320px) and (max-width: 575px) {
      height: 100vh;
    }
  }

  .roleColorCodeINACTIVE {
    position: relative;
  }
  .roleColorCodeINACTIVE::after {
    background: rgb(112 112 112 / 20%);
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    content: '';
    border-radius: 4px;
    }
  .helpTextStyles {
        padding-left: 3px;
        margin-top: -1px;
        cursor: pointer;
      }
  .helpTextStylesImg{
        width: 14px;
        margin-right: 4px;
      }
  .roleName{
    font-weight: 600;
  }
  .roleClientName{
    font-weight: 600;
  }
`;

export default ModalWrapper;
