import CONSTANTS from "common/constants";
import React from "react";
import PaginationSettingsWrapper from "./styled";
import {
  keydownToggleNoOfRecordTableFilter,
  toggleNoOfRecordTableFilter,
} from "./utils";

export interface IPaginationSettings {
  pageSize: number;
  totalCounts: number;
  setPageSize: (pageNumber: number) => void;
  setPageNumber: (pageNumber: number) => void;
}
const PaginationSettings: React.FunctionComponent<IPaginationSettings> = ({
  totalCounts,
  pageSize,
  setPageSize,
  setPageNumber,
}) => {
  const pageRange = [20, 50, 100];

  return (
    <PaginationSettingsWrapper className="row">
      <div className=" col-sm-12 mr-auto page-number filterHeaderChildElement filterheadchild">
        Show &nbsp;
        <span className="boldCount">
          {pageSize < totalCounts ? pageSize : totalCounts}
        </span>
        <div className="svg-parent position-relative">
          <label
            htmlFor="pagenumberitemsSM"
            className="position-absolute invisible-cls"
          >
            pagenumberitems
            <input
              type="text"
              id="pagenumberitemsSM"
              className="position-absolute invisible-cls"
              data-testid="pagenumberitemsSM"
              tabIndex={-1}
            />
          </label>
          <div
            className="keydown-recordfilter d-inline-block"
            onKeyDown={keydownToggleNoOfRecordTableFilter}
            tabIndex={0}
            onClick={toggleNoOfRecordTableFilter}
            aria-label={`${pageSize} number of items is displayed in one page`}
            role="combobox"
            aria-controls="pagelistitems"
            aria-expanded="true"
            aria-haspopup="listbox"
          >
            <i className="aha-icon-down-arrow-thin" />
          </div>
          <div
            className="page-sort position-absolute m-0 d-none pagecontent-filter"
            id="pagelistitems"
            role="listbox"
            aria-label="filter"
          >
            {pageRange.map((item, index) => {
              const key = `${index}_${item}`;
              return (
                <div
                  key={key}
                  role="option"
                  tabIndex={0}
                  aria-selected="true"
                  className={pageSize === item ? "active" : ""}
                  onKeyUp={(e: any) => {
                    if (
                      e.keyCode === CONSTANTS.KEY_ENTER ||
                      e.keyCode === CONSTANTS.KEY_SPACEBAR
                    ) {
                      setPageSize(item);
                      setPageNumber(1);
                      e.currentTarget.classList.toggle("active");
                    }
                  }}
                  onClick={(e: any) => {
                    setPageSize(item);
                    setPageNumber(1);
                    e.currentTarget.classList.toggle("active");
                    e.currentTarget.parentNode.classList.toggle("visible_cls");
                    e.currentTarget.parentNode?.previousSibling.classList.toggle(
                      "rotateArrow"
                    );
                  }}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>
        items of {totalCounts}
      </div>
    </PaginationSettingsWrapper>
  );
};
export default PaginationSettings;
