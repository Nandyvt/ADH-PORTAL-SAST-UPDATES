import styled from "styled-components";

const CreateCardWrapper = styled.div`
  .cursorpointer {
    cursor: pointer;
  }

  .card-box {
    width: calc(25% - 30px / 4);
    margin: 0 22px 30px 0;
  }
  /* Target every fourth .col element within the #dynamic-row */
  #dynamic-row .card-box:nth-child(4n) {
    margin-right: 0 !important;
  }
`;
export default CreateCardWrapper;
