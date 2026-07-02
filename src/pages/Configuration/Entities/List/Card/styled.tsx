import styled from "styled-components";

export const StyledCard = styled.div`
  margin-bottom: 20px;
  /* margin-right: 15px;  except last card*/
  /* .card:nth-child(4n) {
      margin-right: 0;
    } */

  .entity-name {
    font-size: 18px;
    font-weight: 500;
    line-height: 22px;
    @media only screen and (max-width: 767px) {
      font-size: 16px;
      line-height: 19px;
    }
    margin-bottom: 8px !important;
    white-space: nowrap; /* Prevents text from wrapping */
    overflow: hidden; /* Hides any overflowing content */
    text-overflow: ellipsis; /* Adds ellipsis (...) to indicate truncated text */
    width: 100%;
  }
  .version {
    font-size: 14px;
    line-height: 18px;
    font-weight: 400;
    color: #717272;
    margin-bottom: 8px !important;
  }
`;
