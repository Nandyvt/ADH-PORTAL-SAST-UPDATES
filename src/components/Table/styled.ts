import styled from "styled-components";

const TableStyles = styled.div`
  .sr-only-bkp {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }

  tbody {
    tr {
      .aui-td {
        flex-wrap: wrap;
        p {
          margin-bottom: 0;
        }
      }
    }
  }
  th.action-header {
    width: 16%;
  }

  th.consumer-name-header {
    width: 26%;
  }

  .aui-td.actions-column {
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    padding-bottom: 12px !important;

    .noBtnStyle {
      border: 0;
      background: white;
    }
  }

  .reload-btn {
    background: #c10e21;
    border: #c10e21;
    color: white;
    border-radius: 50px;
    padding: 4px 16px 4px 11px;
  }

  .nobtnstyle:focus {
    outline: 2px solid #d6700a !important;
    -webkit-box-shadow: 0 0 4px 4px #d6700a !important;
    box-shadow: 0 0 4px 4px #d6700a !important;
  }
  .noBtnStyle:focus-visible {
    outline: none;
  }
  .noBtnStyle {
    background: none;
    border: none;
    height: fit-content;
  }

  .star-content {
    margin-top: 4px;
  }

  .ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px; /* Adjust the width as needed */
  }

  .adh-anchorStyle {
    width: 100%;
    text-decoration: underline;
    color: #c10e21;
    cursor: pointer;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 23px;
    font-family: Montserrat;
  }

  .connection-td-wrapper {
    position: relative;
    .popoverWrapper {
      position: absolute;
      width: 10rem;
      background: #fff;
      padding: 1rem;
      box-shadow: 0px 3px 6px #00000029;
      border: 1px solid #e3e3e3;
      top: 0.45rem !important;
      left: -3.5rem;
      z-index: 99;
      line-height: 2;
      border-top: 4px solid var(--primary) !important;
      border: 1px solid var(--gray);

      > button {
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 18px;
        font-family: Montserrat;
        color: #343a40;
        margin-bottom: 0 !important;
        width: 100%;
        text-align: left;
      }
    }
  }
`;

export default TableStyles;
