import styled from "styled-components";

const PaginationSettingsWrapper = styled.div`
  .svg-parent.position-relative {
    display: inline-block;
    margin: 0px 4px;
    .invisible-cls {
      opacity: 0;
      z-index: -5;
      left: -9999px;
    }
    .visible_cls {
      display: block !important;
      z-index: 3 !important;
    }
    svg.position-relative {
      margin: 0px 4px;
    }
    .keydown-recordfilter {
      cursor: pointer;
    }
    .rotateArrow {
      transform: rotateZ(180deg);
    }
    .page-sort {
      list-style-type: none;
      border: 1px solid rgb(227, 227, 227);
      padding: 0px;
      background: rgb(255, 255, 255);
      font-size: 14px;
      top: 23px;
      left: -30px;
      width: 52px;

      > div {
        padding: 7px 9px 5px;
        border-bottom: 1px solid #e3e3e3;
      }
      > div.active,
      div:hover {
        cursor: pointer;
        color: #c10e21;
      }
    }
  }
`;

export default PaginationSettingsWrapper;
