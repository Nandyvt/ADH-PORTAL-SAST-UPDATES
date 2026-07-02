import styled from "styled-components";

interface IProps {
  editMode?: any;
}

const MenuWrapper = styled.div<IProps>`
  min-width: 72vw;
  .drop-down-wrapper {
    margin-bottom: 2rem;
  }
  .menuheading {
    color: #222328;
    font-size: 30px;
    opacity: 1;
    margin-bottom: 1.75rem;
    padding-bottom: 10px;
    font-weight: 400;
    border-bottom: 1px solid #e3e3e3;
  }
  .editor-title-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-top: 1px solid #e3e3e3;
    border-left: 1px solid #e3e3e3;
    border-right: 1px solid #e3e3e3;
    background-color: ${(props) => (props.editMode ? "#e3e3e3" : "#fff")};
    padding: 1rem 1.5rem;
  }
  .title-buttons {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    outline: none;
  }
  .view-schema {
    font: normal normal 600 14px/25px Montserrat;
    color: #222328;
  }
  .editor-title {
    font: normal normal 600 18px/27px Montserrat;
    color: #222328;
  }
  .circleSec {
    width: auto;
    padding-right: 1rem;
    /* position: relative; */
    .circleWrapper {
      height: 25px;
      /* width: 30px; */
      color: #000;
      background-color: transparent;
      font-size: 12px;
      display: flex;
      font-weight: 500;
      justify-content: center;
      align-items: center;
      position: relative;
      z-index: 999;
      /* top: -0.85rem;
        left: 0rem; */
    }

    .circleWrapper:hover::after {
      content: "";
      position: absolute;
      background-color: transparent !important;
      top: -9px;
      left: 50%;
      margin-left: -5px;
      border-width: 7px;
      border-style: solid;
      border-color: white transparent transparent transparent;
      color: #000;
    }

    .roleSec {
      position: absolute;
      /* bottom: -8.2rem;
        left: -0.75rem; */
      width: 23rem;
      background: #fff;
      padding: 0.75rem 0rem;
      padding-bottom: 0;
      box-shadow: 0px 3px 6px #00000029;
      border: 1px solid #e3e3e3;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      z-index: 99;
      padding: 1.325rem;
      padding-top: 2.5rem;
      padding-bottom: 5px;
      .roleStylesMin {
        display: inline-block;
      }
      h3 {
        color: black;
        font: normal normal 600 14px/25px Montserrat !important;
      }
      p {
        margin-bottom: 0.5rem;
        padding-bottom: 6px;
        line-height: 20px;
        color: black;
        font: normal normal 500 14px/25px Montserrat !important;
      }
    }
  }
  .editor-wrapper {
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #e3e3e3;
    padding-left: 1.5rem;
  }
  .editor-wrapper * {
    font: normal normal normal 16px/27px Montserrat !important;
  }
  .disabled-btn {
    background: #aaaaaa 0% 0% no-repeat padding-box;
    border: 2px solid #aaaaaa;
    color: white;
  }
  .json-buttons {
    padding: 0.5rem 1.75rem;
  }

  select + i {
    float: right;
    margin-top: -26px;
    position: relative;
    margin-right: 7px;
    pointer-events: none;
    background-color: #fff;
    padding-right: 5px;
  }
  .forModal {
    font-size: 0.5rem;
  }
  select.form-control {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-image: none;
    background-repeat: no-repeat;
  }
  .rotate {
    transform: rotate(180deg);
  }
  .reset-btn:before {
    transform: scaleX(-1);
  }

  .btn.btn-primary:disabled {
    color: #fff;
    background-color: #949494;
    border-color: #949494;
    box-shadow: none;
    opacity: 1;
    text-decoration: none;
    pointer-events: none;
    user-select: none;
  }
`;
export default MenuWrapper;
