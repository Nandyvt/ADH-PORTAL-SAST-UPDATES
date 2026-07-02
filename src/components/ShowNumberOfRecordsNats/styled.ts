import styled from "styled-components";

export const ShowMoreRecordsWrapper = styled.div`
  [class^="aha-icon-"]::before,
  .hCCGVU [class*=" aha-icon-"]::before {
    font-family: fontello;
    font-style: normal;
    font-weight: normal;
    display: inline-block;
    text-decoration: inherit;
    width: 1em;
    margin-right: 0.2em;
    text-align: center;
    font-size: 13px;
    font-variant: normal;
    text-transform: none;
    line-height: 1em;
    margin-left: 0.2em;
    -webkit-font-smoothing: antialiased;
  }
  .pagecontent-filter {
    display: none;
  }
  .rotateArrow {
    transform: rotateZ(180deg);
  }

  .visible_cls {
    display: block;
    z-index: 3 !important;
  }
  .boldCount {
    font-weight: 500;
  }
  .filterHeaderChildElement {
    @media screen and (min-width: 576px) and (max-width: 768px) {
      margin-top: 24px !important;
    }
  }
  .svg-parent.position-relative {
    display: inline-block;
    margin: 0px 4px;
    cursor: pointer;

    .invisible-cls {
      opacity: 0;
      z-index: -5;
      left: -9999px;
    }
    .page-sort {
      list-style-type: none;
      border: 1px solid var(--aui-header-borderclr);
      padding: 0px;
      font-size: 14px;
      top: 23px;
      left: -27px;
      width: 54px;
      background: var(--bg-white);

      > div {
        text-align: center;
        border-bottom: 1px solid var(--aui-header-borderclr);
        line-height: 2.2;
        padding: 7px 9px 5px;
      }

      > div.active,
      div:hover {
        color: var(--primary-c10e21);
      }
    }
  }

  .filterHeaderChildElement {
    @media screen and (min-width: 992px) {
      margin-bottom: 0;
      margin-top: 1rem;
    }
  }
`;
