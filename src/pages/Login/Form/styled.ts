import styled from "styled-components";

const FormWrapper = styled.div`
  .input-icons i {
    position: absolute;
    padding: 8px;
  }

  .input-icons {
    width: 100%;
  }

  .icon {
    padding: 10px;
    min-width: 40px;
  }

  .input-field {
    width: 100%;
    padding-left: 30px;
    text-align: left;
  }
  .btn-width {
    /*  width: 236px; */
    font-size: 16px;
    @media only screen and (min-width: 320px) and (max-width: 991px) {
      font-size: 14px;
    }
  }
  .buttonstyle {
    justify-content: center;
    text-align: center;
    padding-top: 30px;
    @media only screen and (min-width: 1200px) {
      justify-content: start;
      text-align: left;
    }
  }
`;
export default FormWrapper;
