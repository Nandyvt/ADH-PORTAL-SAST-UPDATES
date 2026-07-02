import styled from "styled-components";

const PaginationStyle = styled.div`
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
`;
export default PaginationStyle;
