/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from "react";
import CustomTooltipStyle from "./styled";

interface TooltipProps {
  content: string;
  children: React.JSX.Element;
  tooltipid: string;
  styleProps?: any;
  alwaysShow?: boolean;
}
const CustomTooltip = (props: TooltipProps) => {
  const [visible, setVisible] = useState(false);

  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(props.alwaysShow || false);

  return (
    <CustomTooltipStyle style={props.styleProps}>
      <div
        className="tooltip-container"
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        aria-describedby="tooltip"
      >
        {props.children}
        {visible && props.content && (
          <div
            role="tooltip"
            id={`tooltip-${props.tooltipid}`}
            className="tooltip-text"
          >
            {props.content}
          </div>
        )}
      </div>
    </CustomTooltipStyle>
  );
};

export default CustomTooltip;
