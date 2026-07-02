import styled from "styled-components";

const CredentialsDetailsStyled = styled.div`
  font-family: "Montserrat", sans-serif;
  display: flex;
  flex-direction: column;
  .menuheading {
    font-size: 30px;
    font-weight: 400;
    line-height: 36.57px;
    text-align: left;
  }

  .credentials-details {
    flex-grow: 1;
    flex-flow: column;
    display: flex;
    flex-direction: column;
    flex-basis: auto;
    .row {
      margin-bottom: 20px;
    }
  }

  .credentials-field {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column;

    .label {
      font-size: 16px;
      font-weight: 500;
      line-height: 19.5px;
      text-align: left;
      margin-bottom: 10px;
    }

    .value {
      font-size: 16px;
      font-weight: 400;
      line-height: 19.5px;
      text-align: left;

      .password-toggle {
        background: none;
        border: none;
        cursor: pointer;
        padding-left: 10px;
        margin-left: 10px;
      }
    }
  }

  .back-button-div {
    border-top: 1px solid #e5e5e5;
    margin-top: 20px;
    padding-top: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .mt-5 {
    margin-top: 2rem;
  }

  .mb-4 {
    margin-bottom: 1.5rem;
  }
`;

export default CredentialsDetailsStyled;
