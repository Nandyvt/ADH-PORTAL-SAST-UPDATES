import styled from "styled-components";

const CursorPaginationStyle = styled.div`
  .page-disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  .aha-pagination {
    @media screen and (min-width: 576px) and (max-width: 767px) {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }
  }
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
  .count-range-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-right: 0;
    p.countRangeSec {
      padding-right: 1.25rem;
    }
  }

  .aui-pagination {
    li.page-item {
      > button {
        padding: 0.5rem 0.75rem;
        &:hover {
          background: var(--cursorPagination-bgColor);
          border: 1px solid var(--cursorPagination-borderColor);
        }
      }
    }
  }
`;
export default CursorPaginationStyle;
