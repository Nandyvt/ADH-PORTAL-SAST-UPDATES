/* eslint-disable react/require-default-props */
import CONSTANTS from "common/constants";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCursorPageSize } from "../common/TransactionalLogs.slice";
import { ShowMoreRecordsWrapper } from "./styled";

interface INumberOfRecordsProps {
  rangeArr?: number[];
  isCursorPagination?: boolean;
  totalCount?: number;
  onChangeFunc?: any;
}

const ShowNumberOfRecordsComp = (props: INumberOfRecordsProps) => {
  const dispatch = useDispatch();
  const recordsCountPopover = useRef<HTMLDivElement>(null);
  const showRecordArrRef = useRef<HTMLDivElement>(null);

  const keydownToggleNoOfRecordTableFilter = (e: any) => {
    if (
      e.keyCode === CONSTANTS.KEY_ENTER ||
      e.keyCode === CONSTANTS.KEY_SPACEBAR
    ) {
      showRecordArrRef.current?.classList.toggle("rotateArrow");
      recordsCountPopover.current?.classList.toggle("visible_cls");
    }
  };

  const toggleNoOfRecordTableFilter = (e: any) => {
    e.currentTarget.nextSibling.classList.toggle("visible_cls");
    e.currentTarget.classList.toggle("rotateArrow");
  };

  const rangeArrPropData = props?.rangeArr || [20, 50, 100];

  const [rangeArr] = useState<number[]>(rangeArrPropData);

  const [pageSizeComp, setPageSizeComp] = useState<number>(20);

  const pageSizeDynamic =
    pageSizeComp < (props?.totalCount ?? 0) ? pageSizeComp : props.totalCount;

  const cursorPageSize = useSelector(
    (state: any) => state.transactionalLog?.cursorpagination?.pageSize
  );

  const pageSizeCursorDataStore = props.isCursorPagination
    ? cursorPageSize
    : pageSizeComp;

  return (
    <ShowMoreRecordsWrapper
      className={`ml-mob-paginationwrapper ${
        !props.isCursorPagination ? "col-4 pl-0" : ""
      }`}
    >
      <div className="page-number pb-3 pb-sm-0 filterHeaderChildElement">
        {props.isCursorPagination ? "Items per page" : "Show"}
        <span className="boldCount pl-2">
          {props.isCursorPagination ? pageSizeCursorDataStore : pageSizeDynamic}
        </span>
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
            aria-label={`${pageSizeCursorDataStore} number of items is displayed in one page`}
            role="combobox"
            aria-controls="pagelistitems"
            aria-expanded="false"
            aria-haspopup="listbox"
            ref={showRecordArrRef}
          >
            <i className="aha-icon-down-arrow-thin" />
          </div>
          <div
            className="page-sort position-absolute m-0 pagecontent-filter"
            id="pagelistitems"
            role="listbox"
            aria-label="filter"
            ref={recordsCountPopover}
          >
            {rangeArr.map((item, index) => {
              const key = `${index}_${item}`;
              return (
                <div
                  key={key}
                  role="option"
                  tabIndex={0}
                  aria-selected="true"
                  className={pageSizeCursorDataStore === item ? "active" : ""}
                  onKeyUp={(e: any) => {
                    if (
                      e.keyCode === CONSTANTS.KEY_ENTER ||
                      e.keyCode === CONSTANTS.KEY_SPACEBAR
                    ) {
                      if (props.isCursorPagination) {
                        dispatch(setCursorPageSize(item));
                      } else {
                        setPageSizeComp(item);
                        props?.onChangeFunc(item);
                      }
                      e.currentTarget.classList.toggle("active");
                      recordsCountPopover.current?.classList.toggle(
                        "visible_cls"
                      );
                      showRecordArrRef.current?.classList.toggle("rotateArrow");
                    }
                  }}
                  onClick={(e) => {
                    if (props.isCursorPagination) {
                      dispatch(setCursorPageSize(item));
                    } else {
                      setPageSizeComp(item);
                      props?.onChangeFunc(item);
                    }
                    e.currentTarget.classList.toggle("active");
                    recordsCountPopover.current?.classList.toggle(
                      "visible_cls"
                    );
                    showRecordArrRef.current?.classList.toggle("rotateArrow");
                  }}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>
        {!props.isCursorPagination && `items of ${props?.totalCount}`}
      </div>
    </ShowMoreRecordsWrapper>
  );
};

export default ShowNumberOfRecordsComp;
