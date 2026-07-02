import styled from "styled-components";

const AutoSuggestStyles = styled.div`
  /* AutoSuggest Styles - start*/

  .react-autosuggest__container {
    position: relative;
  }

  .react-autosuggest__input {
    /*     width: 240px;
    height: 30px;
    padding: 10px 20px;
    font-weight: 300;
    font-size: 16px;
    border: 1px solid #aaa;
    border-radius: 4px; */
  }

  .react-autosuggest__input--focused {
    outline: none;
  }

  .react-autosuggest__input--open {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .react-autosuggest__suggestions-container {
    display: none;
  }

  .react-autosuggest__suggestions-container--open {
    display: block;
    position: absolute;
    top: 39px;
    width: 100%;
    border: 1px solid #727272;
    background-color: #fff;
    font-weight: 300;
    font-size: 16px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    z-index: 2;
    box-shadow: 0px 3px 15px #00000029;
  }

  .react-autosuggest__suggestions-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
    max-height: 12rem;
    overflow-y: auto;
  }

  .react-autosuggest__suggestion {
    cursor: pointer;
    padding: 12px 12px;
    font-weight: normal;
  }

  .react-autosuggest__suggestion--highlighted {
    background-color: #ddd;
  }

  .react-autosuggest__suggestion-match {
    color: #c10e21;
    font-weight: normal;
    text-decoration: underline;
  }

  .marginAlign-errorMsg {
    margin-top: -14px;
  }

  .modal .form-control {
    border: 1px solid #bcc3ca !important;
  }

  /* AutoSuggest Styles - end*/
`;

export default AutoSuggestStyles;
