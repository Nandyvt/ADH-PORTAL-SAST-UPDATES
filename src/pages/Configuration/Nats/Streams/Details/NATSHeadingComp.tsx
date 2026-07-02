/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
import { HeadingLabelWrapper } from "pages/Configuration/utils";
import React from "react";

interface INatsHeadingComp {
  ariaLabel?: string;
  dataTestID?: string;
  headingLabel?: string;
  viewPageLabelAffix?: string;
  loading?: any;
}
function NATSHeadingComp(props: INatsHeadingComp) {
  return (
    <HeadingLabelWrapper>
      {/* Heading */}
      <h1
        className="menuheading"
        aria-label={props.ariaLabel}
        data-testid={props.dataTestID}
      >
        {props.headingLabel}
        {props.viewPageLabelAffix &&
          (props.loading ? "-" : `: ${props.viewPageLabelAffix}`)}
      </h1>
    </HeadingLabelWrapper>
  );
}

export default NATSHeadingComp;
