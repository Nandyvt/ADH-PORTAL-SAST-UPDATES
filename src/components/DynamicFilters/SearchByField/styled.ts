import styled from "styled-components";

const SearchByFieldStyled = styled.div`
  .dropdown-toggle::after {
    margin-left: auto !important;
  }
  .dropdown-menu {
    width: 100%;
    border: 1px solid #777979;
    border-radius: 0;
    margin-top: 0;
  }
  .btn {
    padding: 5.25px 10.5px !important;
    border: 1px solid #777979 !important;
    border-radius: 0 !important;
    color: var(--primary-black) !important;
    font-size: 14px !important;
    border-bottom: none !important;
    @media screen and (max-width: 575px) {
      height: 34px !important;
    }
  }
  hr {
    bottom: -15px;
    width: 94%;
    margin-left: 0.8125rem;
    margin-right: 0.8125rem;
    border-top: 1px solid #777979 !important;
  }
  input {
    text-indent: 0 !important;
    border: 1px solid #777979 !important;
    border-top: none !important;
    border-radius: 0 !important;
    @media screen and (max-width: 575px) {
      height: 34px !important;
    }
  }
  .aui-input-placeholder {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  input:focus {
    padding: 5.25px 10.5px !important;
    text-indent: 0px; /* Adjust the value to match input padding */
  }

  input::placeholder {
    color: rgb(34, 35, 40) !important;
  }

  .btn.btn-secondary:not(:disabled):hover {
    color: #555555;
  }
  .show > .btn.btn-secondary.dropdown-toggle {
    color: #555555;
  }

  .dropdown-item:active {
    color: var(--primary-black) !important;
    text-decoration: none;
    background-color: rgba(0, 0, 0, 0);
  }
  .dropdown-toggle::after {
    border-top: 2px solid rgba(34, 35, 40, 0.7) !important;
    border-right: 2px solid rgba(34, 35, 40, 0.7) !important;
    margin-bottom: auto;
    width: 11px !important;
    height: 11px !important;
  }
  /* @media only screen and (max-width: 575px) {
    .dropdown {
      height: 34px;
    }
  } */
`;

export default SearchByFieldStyled;
