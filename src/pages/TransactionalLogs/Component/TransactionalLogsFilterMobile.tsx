import React, { useEffect, useRef, useState } from "react";

import store from "app/store";
import CustomTooltip from "components/CustomTooltip";
import { TransactionalLogsFilterMobileStyled } from "./styled";
import { exportToCSV } from "../utils";
import {
  setEntityNameFilter,
  setSourceFilter,
  setStatusFilter,
  setConsumerFilter,
  setDateRangeFilter,
  setSearchParamFilter,
} from "./common/TransactionalLogs.slice";

const TransactionalLogsFilterMobile: React.FunctionComponent<any> = (
  {
    transactionalData,
    resentCount,
    setRefresh,
    refresh,
    columnHeaders,
    generateCustomizeTableContent,
    toggleCustContentPopover,
    setSelectAll,
    selectAll,
    toggleSelectAll,
    setToggleModal,
    showClearAll,
    setShowClearAll,
  }: any,
  ref
) => {
  const entityNameRef: any = useRef(null);
  const sourceRef: any = useRef();
  const statusRef: any = useRef();
  const consumerRef: any = useRef();

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
  const customcolor = true;
  return (
    <TransactionalLogsFilterMobileStyled>
      <div className="d-flex flex-wrap flex-column justify-content-between transactional-logs-filter-sm ">
        <div className="d-flex flex-nowrap flex-row justify-content-center export-button">
          <button
            type="button"
            aria-label="Export"
            disabled={transactionalData.length === 0}
            className="btn btn-transactionallog-mob"
            onClick={() => {
              if (transactionalData.length !== 0) {
                const filteredData = transactionalData.filter((item: any) => {
                  return item.checked === true;
                });
                if (filteredData.length === 0) {
                  exportToCSV(transactionalData, "Transactional Logs");
                } else {
                  exportToCSV(filteredData, "Filtered Transactional Logs");
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
          </button>
          <div
            className={`d-flex btn-transactionallog-mob justify-content-center align-items-center ${
              showClearAll ? "bg-selected" : ""
            }`}
          >
            <button
              type="button"
              className="align-items-center d-flex font14 justify-content-center m-0 noBtnStyle pr-0"
              onClick={() => {
                setToggleModal(true);
              }}
            >
              <aui-icon
                block
                svgclass="aui-icon-filter"
                pathclass="aui-path-filter"
                icon="filter"
                svgwidth="12"
                svgheight="12"
              />
              <span className="filter-label">Filter</span>
            </button>
            {showClearAll ? (
              <button
                type="button"
                className="noBtnStyle p-0"
                onClick={() => {
                  store.dispatch(
                    setDateRangeFilter({
                      startDateRange: "",
                      endDateRange: "",
                    })
                  );
                  store.dispatch(setEntityNameFilter([]));
                  store.dispatch(setSourceFilter([]));
                  store.dispatch(setStatusFilter([]));
                  store.dispatch(setConsumerFilter([]));
                  store.dispatch(
                    setSearchParamFilter({
                      searchType: "",
                      searchFieldValue: "",
                    })
                  );
                }}
              >
                <img src="./images/clear-all-icon.svg" alt="filterIcon" />
              </button>
            ) : null}
          </div>
        </div>
        <div>
          <div className="d-flex align-items-center pb-2 justify-content-between">
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
                size="small"
                disabled={resentCount === 0}
              />
            </CustomTooltip>
            <div className="d-flex flex-row flex-nowrap">
              <div className="d-flex align-items-center mr-2">
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
        <div className="d-flex justify-content-between mt-3 mb-3">
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
          <div className="d-flex align-items-center ">
            Sort By: <span className="created-date">Created Date - DESC</span>{" "}
          </div>
        </div>
      </div>
    </TransactionalLogsFilterMobileStyled>
  );
};

export default TransactionalLogsFilterMobile;
