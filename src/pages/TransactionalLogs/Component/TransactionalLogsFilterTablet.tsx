import React, { useEffect, useRef, useState } from "react";

import store from "app/store";
import CustDateRangePicker from "components/DateRangePicker";
import CustomTooltip from "components/CustomTooltip";
import { TransactionalLogsFilterTabStyled } from "./styled";
import SearchInputField from "./SearchInputField";
import {
  clearDatePickerVal,
  exportToCSV,
  generateOptions,
  toggleDatePicker,
} from "../utils";
import {
  setClearFilter,
  setEntityNameFilter,
  setSourceFilter,
  setStatusFilter,
  setConsumerFilter,
  setDateRangeFilter,
} from "./common/TransactionalLogs.slice";

const TransactionalLogsFilterTablet: React.FunctionComponent<any> = (
  {
    transactionalData,
    resentCount,
    setRefresh,
    refresh,
    toggleSelectAll,
    setSelectAll,
    selectAll,
    columnHeaders,
    generateCustomizeTableContent,
    toggleCustContentPopover,
    reset,
    setReset,
    entityNameArr,
    sourceArr,
    statusArr,
    consumerArr,
  }: any,
  ref
) => {
  const entityNameRef: any = useRef(null);
  const sourceRef: any = useRef();
  const statusRef: any = useRef();
  const consumerRef: any = useRef();

  // RESET FUNCTIONALITY
  const resetAllFilter = async () => {
    // reset datepicker
    clearDatePickerVal();
    setSelectAll(false);
    toggleSelectAll(false);
    store.dispatch(setClearFilter());

    await entityNameRef?.current?.clearValue();

    await sourceRef?.current?.clearValue();

    await statusRef?.current?.clearValue();

    await consumerRef?.current?.clearValue();

    setReset(!reset);
  };

  const getValueFromMultiSelect = async (event: any) => {
    // Reset Pagination is added to the slice directly to avoid unnecessary calls
    if (event?.target?.multiselectid === "entity-dropdown") {
      const entityMultiSelValue =
        await entityNameRef.current?.getCurrentValue();
      store.dispatch(
        setEntityNameFilter(
          entityMultiSelValue.map((item: any) => item.value).join(",")
        )
      );
    }
    if (event?.target?.multiselectid === "source-dropdown") {
      const sourceMultiSelValue = await sourceRef.current?.getCurrentValue();
      store.dispatch(
        setSourceFilter(
          sourceMultiSelValue.map((item: any) => item.value).join(",")
        )
      );
    }
    if (event?.target?.multiselectid === "status-dropdown") {
      const statusMultiSelValue = await statusRef.current?.getCurrentValue();
      store.dispatch(
        setStatusFilter(
          statusMultiSelValue.map((item: any) => item.value).join(",")
        )
      );
    }

    if (event?.target?.multiselectid === "consumer-dropdown") {
      const consumerMultiSelValue =
        await consumerRef.current?.getCurrentValue();
      store.dispatch(
        setConsumerFilter(
          consumerMultiSelValue.map((item: any) => item.value).join(",")
        )
      );
    }
  };

  // AUI 2.0 MULTISELECT
  useEffect(() => {
    entityNameRef?.current?.addEventListener(
      "auiMultiselectChange",
      getValueFromMultiSelect
    );

    sourceRef?.current?.addEventListener(
      "auiMultiselectChange",
      getValueFromMultiSelect
    );

    statusRef?.current?.addEventListener(
      "auiMultiselectChange",
      getValueFromMultiSelect
    );

    consumerRef?.current?.addEventListener(
      "auiMultiselectChange",
      getValueFromMultiSelect
    );

    return () => {
      entityNameRef?.current?.removeEventListener(
        "auiMultiselectChange",
        getValueFromMultiSelect
      );
      sourceRef?.current?.removeEventListener(
        "auiMultiselectChange",
        getValueFromMultiSelect
      );
      statusRef?.current?.removeEventListener(
        "auiMultiselectChange",
        getValueFromMultiSelect
      );
      consumerRef?.current?.removeEventListener(
        "auiMultiselectChange",
        getValueFromMultiSelect
      );
    };
  }, []);

  // Window Resize Listener
  const getCurrentDimension = () => {
    return {
      width: window.innerWidth,
    };
  };

  const [screenSize, setScreenSize] = useState(getCurrentDimension());

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);

  const [selectedDateRange, setSelectedDateRange] = useState<any>({});

  useEffect(() => {
    if (Object.keys(selectedDateRange).length > 0) {
      const { startDateRange, endDateRange } = selectedDateRange;
      store.dispatch(setDateRangeFilter({ startDateRange, endDateRange }));
    }
  }, [selectedDateRange]);

  return (
    <TransactionalLogsFilterTabStyled>
      <div className="transactional-logs-filter-md">
        <div>
          <div className="row">
            <div className="col-lg-4 col-lg-5 col-md-12 col-sm-12">
              <div id="date" className="position-relative text-box">
                <div className="position-relative">
                  <button
                    className="noBtnStyle calendar-icon"
                    aria-label="date range picker"
                    type="button"
                    onClick={() => {
                      toggleDatePicker();
                    }}
                  >
                    <aui-icon
                      block={false}
                      icon="daterange"
                      svgwidth="20"
                      svgheight="20"
                    />
                  </button>

                  <CustDateRangePicker
                    setSelectedDateRange={setSelectedDateRange}
                    className="w-100 text-truncate form-control inputs"
                  />
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-8 pb-lg-3">
              {/* Search Input Field Starts Here */}
              <SearchInputField reset={reset} />
            </div>
          </div>
          <div className="row">
            <div className="col-6 col-md-6 col-lg-4 pb-3">
              <aui-multiselect
                options={`${JSON.stringify(generateOptions(entityNameArr))}`}
                iconbackground
                placeholder="Select any option"
                multiselectid="entity-dropdown"
                label="Select Entity Name"
                labelgrid="col-sm-3"
                multiselectgrid="col-sm-9"
                direction="column"
                ref={entityNameRef}
                searchable
              />
            </div>

            <div className="col-6 col-md-6 col-lg-4 pb-3 ">
              <aui-multiselect
                options={`${JSON.stringify(generateOptions(sourceArr))}`}
                iconbackground
                placeholder="Select any option"
                multiselectid="source-dropdown"
                label="Select Source"
                labelgrid="col-sm-3"
                multiselectgrid="col-sm-9"
                direction="column"
                ref={sourceRef}
                searchable
              />
            </div>

            <div className="col-6 col-md-6 col-lg-4 pb-3 ">
              <aui-multiselect
                options={`${JSON.stringify(generateOptions(statusArr))}`}
                iconbackground
                placeholder="Select any option"
                multiselectid="status-dropdown"
                label="Select Status"
                labelgrid="col-sm-3"
                multiselectgrid="col-sm-9"
                direction="column"
                ref={statusRef}
                searchable
              />
            </div>

            <div className="col-6 col-md-6 col-lg-4 pb-3 ">
              <aui-multiselect
                options={`${JSON.stringify(generateOptions(consumerArr))}`}
                iconbackground
                placeholder="Select any option"
                multiselectid="consumer-dropdown"
                label="Select Consumer"
                labelgrid="col-sm-3"
                multiselectgrid="col-sm-9"
                direction="column"
                ref={consumerRef}
                searchable
              />
            </div>

            <div className="col-6 col-md-6 col-lg-4 pb-3 d-flex align-self-end ml-auto px-0">
              <div className="d-flex align-self-end d-flex ml-auto">
                <aui-button
                  variant="link-style"
                  id="clear-filter-tablet"
                  className="d-flex align-self-end"
                  onClick={async () => {
                    await resetAllFilter();
                  }}
                  buttontitle="Clear Filter"
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="d-flex align-items-center pb-2 justify-content-between mt-3">
            <div className="d-flex align-items-center">
              <div className="d-flex align-items-center export-button">
                <aui-button
                  variant="link-style"
                  disabled={transactionalData.length === 0}
                  onClick={(e: any) => {
                    e.preventDefault();
                    if (transactionalData.length !== 0) {
                      if (transactionalData.length !== 0) {
                        const filteredData = transactionalData.filter(
                          (item: any) => {
                            return item.checked === true;
                          }
                        );
                        if (filteredData.length === 0) {
                          exportToCSV(transactionalData, "Transactional Logs");
                        } else {
                          exportToCSV(
                            filteredData,
                            "Filtered Transactional Logs"
                          );
                        }
                      }
                    }
                  }}
                >
                  <span className="pr-2 export-img">
                    <img
                      style={{ width: "15px", height: "16px" }}
                      src="../images/icon-export.svg"
                      alt=""
                    />
                  </span>
                  Export
                </aui-button>
              </div>
              <div className="d-flex align-items-center px-2">
                <CustomTooltip
                  tooltipid="resent-transactions"
                  content="Select atleast 1 Transaction to resent"
                >
                  <aui-button
                    variant="primary"
                    buttontitle={
                      resentCount !== 0
                        ? `Resent ${resentCount} Transaction`
                        : "Resent Transactions"
                    }
                    size="medium"
                    disabled={resentCount === 0}
                  />
                </CustomTooltip>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between ">
          <span className="pl-2 ml-2">
            <input
              id="select-all-mobile"
              type="checkbox"
              className="aui-checkbox"
              checked={selectAll}
              onChange={() => {
                toggleSelectAll(!selectAll);
                setSelectAll(!selectAll);
              }}
              aria-label="Select All"
            />
          </span>

          <div className="d-flex flex-row flex-nowrap">
            <div className="d-flex align-items-center pr-3">
              Sort By: <span className="created-date">Created Date - DESC</span>{" "}
            </div>
            <div className="d-flex align-items-center mr-2">
              <CustomTooltip tooltipid="refresh-tooltip" content="Refresh">
                <button
                  type="button"
                  className="noBtnStyle p-0"
                  aria-label="Refresh"
                  onClick={() => {
                    setRefresh(!refresh);
                  }}
                >
                  <aui-icon
                    className="text-danger refresh-icon"
                    block
                    icon="reload"
                    svgclass="svg-class-name"
                    svgwidth="20"
                    svgheight="20"
                    pathclass="path-class-name"
                  />
                </button>
              </CustomTooltip>
            </div>
            <div className="d-flex align-items-center pl-2 mt-3">
              {/* Customize Table Grid Section Starts here */}
              <div className="custTableWrapper align-self-end mb-3">
                <CustomTooltip
                  tooltipid="customize-table-tooltip"
                  content="Customize Table"
                >
                  <>
                    <button
                      type="button"
                      className="noBtnStyle p-0 mt-1"
                      aria-label="Customize Table Option"
                      aria-expanded="false"
                      onClick={(e) => toggleCustContentPopover(e)}
                    >
                      <aui-icon
                        className="text-danger"
                        block
                        icon="customisabletable"
                        svgclass="svg-class-name"
                        svgwidth="24"
                        svgheight="24"
                        pathclass="path-class-name"
                      />
                    </button>
                    <div className="d-none filterSec">
                      <div className="multiSelectWrapper">
                        {generateCustomizeTableContent(columnHeaders, true)}
                      </div>
                    </div>
                  </>
                </CustomTooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TransactionalLogsFilterTabStyled>
  );
};

export default TransactionalLogsFilterTablet;
