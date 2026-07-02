import styled from "styled-components";

interface IProps {
  style?: {
    marginBottom?: string;
  };
}

const CustomTooltipStyle = styled.div<IProps>`
  .tooltip-container {
    position: relative;
    display: inline-block;
    cursor: pointer;
  }

  .tooltip-text {
    visibility: visible;
    text-align: center;
    position: absolute;
    bottom: 125%;
    left: 50%;
    transform: translateX(-50%);
    transition: opacity 0.3s;

    padding: 0.4375rem 0.5rem;
    background-color: #222328;
    color: #fff;
    /* min-width: 100px; */
    opacity: 0;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    z-index: 1100;
    /* max-width: 12.5rem; */
    width: auto;
    white-space: nowrap;

    margin-bottom: ${(props: any) => {
      if (props?.style?.marginBottom) return props?.style?.marginBottom;
      return "0";
    }};
  }

  .tooltip-container .tooltip-text {
    visibility: visible;
    opacity: 1;
  }

  .tooltip-text::after {
    content: " ";
    position: absolute;
    top: 100%; /* Position at the bottom of the tooltip */
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
  }

  /* Responsive adjustments */
  @media (max-width: 600px) {
    .tooltip-text {
      font-size: 12px;
      padding: 3px 7px;
    }
  }
`;

export default CustomTooltipStyle;
