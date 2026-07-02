import CONSTANTS from "common/constants";
import React from "react";

interface PageSizeSelectorProps {
  pageSize: number;
  setPageSize: (size: number) => void;
  setPageNumber: (page: number) => void;
  pageSizeRange: number[];
  pageSizeChangeHandler: (
    event: React.KeyboardEvent | React.MouseEvent,
    size: number
  ) => void;
  pagination: {
    totalCount: number;
  };
}

const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({
  pageSize,
  setPageSize,
  setPageNumber,
  pageSizeRange,
  pageSizeChangeHandler,
  pagination,
}) => {
  const toggleNoOfRecordTableFilter = (e: any) => {
    e.currentTarget.nextSibling.classList.toggle("visible_cls");
    e.currentTarget.classList.toggle("rotateArrow");
  };

  const keydownToggleNoOfRecordTableFilter = (e: any) => {
    if (
      e.keyCode === CONSTANTS.KEY_ENTER ||
      e.keyCode === CONSTANTS.KEY_SPACEBAR
    ) {
      e.stopPropagation();
      e.preventDefault();
      e.currentTarget.nextSibling.classList.toggle("visible_cls");
      e.currentTarget.nextSibling.classList.contains("visible_cls") === true
        ? e.currentTarget.setAttribute("aria-expanded", "true")
        : e.currentTarget.setAttribute("aria-expanded", "false");
    }
  };

  return (
    <div>
      Show&nbsp;
      <span className="boldCount">{pageSize}</span>
      <div className="svg-parent position-relative">
        <label
          htmlFor="pagenumberitems"
          className="position-absolute invisible-cls"
        >
          pagenumberitems
          <input
            type="text"
            id="pagenumberitems"
            className="position-absolute invisible-cls"
            data-testid="pagenumberitems"
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
          aria-controls=""
          aria-owns="pagelistitems"
          aria-expanded="false"
          aria-haspopup="listbox"
        >
          <i className="aha-icon-down-arrow-thin pageNumber" />
        </div>
        <div
          className="page-sort position-absolute m-0 d-none pagecontent-filter"
          id="pagelistitems"
          role="listbox"
          aria-label="filter"
        >
          {pageSizeRange.map((size) => (
            <div
              key={size}
              role="option"
              tabIndex={0}
              aria-selected={pageSize === size ? "true" : "false"}
              className={pageSize === size ? "active" : ""}
              onKeyUp={(event) => pageSizeChangeHandler(event, size)}
              onClick={() => {
                setPageSize(size);
                setPageNumber(1);
              }}
            >
              {size}
            </div>
          ))}
        </div>
      </div>
      items of {pagination.totalCount}
    </div>
  );
};

export default PageSizeSelector;
