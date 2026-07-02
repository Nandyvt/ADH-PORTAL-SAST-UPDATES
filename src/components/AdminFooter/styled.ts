import styled from "styled-components";

interface IProps {
  buttonClick?: any;
  isLoginPage?: any;
}

const AdminFooterWrapper = styled.footer<IProps>`
  background-color: #343a40;
  color: #fff;
  padding: 26px 24px;
  text-align: left;
  font: normal normal normal 14px/27px Montserrat;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
  @media screen and (min-width: 992px) {
    margin-left: ${(props) => {
      if (props.isLoginPage) return "0px";

      return props.buttonClick ? "303px" : "80px";
    }};
    padding: ${(props) => (props.isLoginPage ? "26px 10rem" : "26px 24px")};
  }
  @media screen and (min-width: 992px) and (max-width: 1250px) {
    margin-left: ${(props) => {
      if (props.isLoginPage) return "0px";

      return props.buttonClick ? "290px" : "80px";
    }};
  }
`;
export default AdminFooterWrapper;
