import styled from "styled-components";

const ChipsStyled = styled.div`
  display: flex;
  align-items: center;
  color: var(--primary-black);
  background-color: rgba(85, 85, 85, 0.1);
  border-radius: 4px;
  padding: 4px 8px;
  margin: 6px;
  margin-left: 0px !important;

  .label {
    font-size: 12px;
  }

  .label-value {
    font-size: 12px;
    line-height: 18px;
    color: var(--primary-black);
    font-weight: 500;
    word-break: break-all;
  }

  .closeIcon {
    border: none;
    background: transparent;
    cursor: pointer;
  }
`;

export default ChipsStyled;
