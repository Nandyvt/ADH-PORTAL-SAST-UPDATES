import React from "react";
import { NoDataWrapper } from "./styled";

export const NoDataComp = (props: any) => {
  const { Datalist, Filter, noDataHeading } = props;
  return (
    <NoDataWrapper>
      {Datalist ? (
        <div
          role="alert"
          aria-live="polite"
          aria-label="No Data Found Change the Filter options or Reload"
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <img
            className="img-fluid mx-auto d-block no-data-img"
            src="/images/NoDataAnimation.gif"
            alt="No Data Animation Gif"
          />
          <h2 className="no-data-title">{noDataHeading || "No Data"}</h2>
          {!Filter && <p className="no-data-p-tag">Please Try again later</p>}
        </div>
      ) : (
        ""
      )}
    </NoDataWrapper>
  );
};

NoDataComp.defaultProps = {
  Datalist: [],
  Filter: false,
};

export default NoDataComp;
