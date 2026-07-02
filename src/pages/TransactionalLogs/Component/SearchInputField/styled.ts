import styled from "styled-components";

export const SearchFilterStyled = styled.div`
  .search-field {
    width: 100%;
    .search-label {
      display: inline-block;
    }
  }
  .search-input-field {
    width: 100%;
    height: 40px;
    display: flex;
    flex-flow: row wrap;
    border: 1px solid rgb(145, 145, 145);
    .noBtnStyle {
      background: none;
      border: none;
      padding: 0;
    }
    .placeholder {
      color: #555555;
      font-weight: 400;
    }
    .input-group-prepend {
      .dropdown-toggle {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 10px;
        padding-right: 14px;
        margin-top: 5px;
        margin-bottom: 10px;
        border-right: 1px solid rgb(145, 145, 145);
        height: 28px;
        width: 200px;
        margin-left: 5px;
        margin-right: 2px;
      }
    }
    .search-input-field-container {
      display: flex;
      flex-grow: 1;
      padding-top: 2px;
    }
    .input-group-append {
      .search-input-dropdown {
        width: auto;
        border: none;
        padding: 0%;
        margin-right: 5px;
        height: 36px;
        width: 100%;
        padding-left: 12px;
      }
      .noBtnStyle {
        background: #ededed;
        border: none;
        height: 38px;
        width: 38px;
      }
    }
  }
`;
