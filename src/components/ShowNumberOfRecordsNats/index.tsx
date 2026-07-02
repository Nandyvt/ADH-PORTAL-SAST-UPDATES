/* eslint-disable react/require-default-props */
/* eslint-disable no-return-assign */
import CONSTANTS from "common/constants";
import React, { useEffect, useRef, useState } from "react";
import { ShowMoreRecordsWrapper } from "./styled";

interface INumberOfRecordsProps {
  rangeArr?: number[];
  totalCount?: number;
  onChangeFunc?: any;
  reset?: boolean;
}

const ShowNumberOfRecordsNatsComp = (props: INumberOfRecordsProps) => {
  const recordsCountPopover = useRef<HTMLDivElement>(null);
  const showRecordArrRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<HTMLDivElement[]>([]);

  const accessibilityFixOnChangeNumberOfRecords = (e: any) => {
    e.currentTarget.nextSibling.classList.contains("visible_cls") === true
      ? e.currentTarget.setAttribute("aria-expanded", "true")
      : e.currentTarget.setAttribute("aria-expanded", "false");
  };

  const keydownToggleNoOfRecordTableFilter = (e: any) => {
    if (
      e.keyCode === CONSTANTS.KEY_ENTER ||
      e.keyCode === CONSTANTS.KEY_SPACEBAR
    ) {
      showRecordArrRef.current?.classList.toggle("rotateArrow");
      recordsCountPopover.current?.classList.toggle("visible_cls");
      /* Accessibility fix */
      accessibilityFixOnChangeNumberOfRecords(e);
    }
  };

  const handleArrowKeyNavigation = (e: any, index: number) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = (index + 1) % optionRefs.current.length;
      optionRefs.current[nextIndex]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex =
        (index - 1 + optionRefs.current.length) % optionRefs.current.length;
      optionRefs.current[prevIndex]?.focus();
    }
  };

  const toggleNoOfRecordTableFilter = (e: any) => {
    e.currentTarget.nextSibling.classList.toggle("visible_cls");
    e.currentTarget.classList.toggle("rotateArrow");

    /* Accessibility fix */
    accessibilityFixOnChangeNumberOfRecords(e);
  };

  const rangeArrPropData = props?.rangeArr || [20, 50, 100];

  const [rangeArr] = useState<number[]>(rangeArrPropData);

  const [pageSizeComp, setPageSizeComp] = useState<number>(20);

  const pageSizeDynamic =
    pageSizeComp < (props?.totalCount ?? 0) ? pageSizeComp : props.totalCount;

  useEffect(() => {
    setPageSizeComp(20);
    props?.onChangeFunc(20);
    document.querySelector<any>("#value0_20")?.classList.toggle("active");
  }, [props.reset]);

  return (
    <ShowMoreRecordsWrapper
      className={`ml-mob-paginationwrapper ${"col-4 pl-0"}`}
    >
      <div className="page-number pb-3 pb-sm-0 filterHeaderChildElement">
        Show
        <span className="boldCount pl-2">{pageSizeDynamic}</span>
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
            aria-label={`${pageSizeComp} number of items is displayed in one page`}
            role="combobox"
            aria-controls=""
            aria-owns="pagelistitems"
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
              const key = `pagesize-${item}`;
              return (
                <div
                  key={key}
                  id={`value${key}`}
                  role="option"
                  tabIndex={0}
                  data-check={`${pageSizeComp}-${item}`}
                  aria-selected={pageSizeComp === item ? "true" : "false"}
                  className={
                    Number(pageSizeComp) === Number(item) ? "active" : ""
                  }
                  ref={(el) => (optionRefs.current[index] = el!)}
                  onKeyDown={(e) => handleArrowKeyNavigation(e, index)}
                  onKeyUp={(e: any) => {
                    if (
                      e.keyCode === CONSTANTS.KEY_ENTER ||
                      e.keyCode === CONSTANTS.KEY_SPACEBAR
                    ) {
                      setPageSizeComp(item);
                      props?.onChangeFunc(item);

                      e.currentTarget.classList.toggle("active");
                      recordsCountPopover.current?.classList.toggle(
                        "visible_cls"
                      );
                      showRecordArrRef.current?.classList.toggle("rotateArrow");
                    }
                  }}
                  onClick={(e) => {
                    setPageSizeComp(item);
                    props?.onChangeFunc(item);

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
        {`items of ${props?.totalCount}`}
      </div>
    </ShowMoreRecordsWrapper>
  );
};

export default ShowNumberOfRecordsNatsComp;
