import styled from "styled-components";

const FormHeaderWrapper = styled.div`
  .flex-row {
    display: flex;
    justify-content: start;
    align-items: center;
    width: 45%;
  }

  .form-header-padding {
    padding-left: 145px;
    padding-right: 200px;
  }
  img {
    width: 45px;
    height: 100%;
    opacity: 1;
    @media only screen and (min-width: 576px) {
      width: 47px;
    }
  }
  .aha-org-text {
    opacity: 1;
    color: #222328;
    font-size: 18px;
  }
  .txtcenter {
    justify-content: center;
    @media only screen and (min-width: 1200px) {
      justify-content: start;
    }
  }
`;

export default FormHeaderWrapper;
