/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useRef, useState } from "react";
import store from "app/store";
import CustDateRangePicker from "components/DateRangePicker";
import { useSelector } from "react-redux";
import CustomTooltip from "components/CustomTooltip";
import {
  setClearFilter,
  setConsumerFilter,
  setDateRangeFilter,
  setEntityNameFilter,
  setSourceFilter,
  setStatusFilter,
} from "./common/TransactionalLogs.slice";
import {
  exportToCSV,
  clearDatePickerVal,
  generateOptions,
  toggleDatePicker,
  generateOptionsEntityName,
} from "../utils";
import TransactionalLogsFilterTablet from "./TransactionalLogsFilterTablet";
import TransactionalLogsFilterMobile from "./TransactionalLogsFilterMobile";
import SearchInputField from "./SearchInputField";
import { TransactionalLogsFilterStyled } from "./styled";

const TransactionalLogsFilter: React.FunctionComponent<any> =
  React.forwardRef<any>(
    (
      {
        transactionalData,
        resentCount,
        setRefresh,
        refresh,
        toggleSelectAll,
        setSelectAll,
        selectAll,
        onChangePageOrder,
        columnHeaders,
        generateCustomizeTableContent,
        toggleCustContentPopover,
        reset,
        setReset,
        entityNameArr,
        sourceArr,
        statusArr,
        consumerArr,
        setToggleModal,
        toggleModal,
        showClearAll,
        setShowClearAll,
      }: any,
      ref
    ) => {
      const entityNameRef: any = useRef(null);
      const sourceRef: any = useRef();
      const statusRef: any = useRef();
      const consumerRef: any = useRef();

      // RESET FUNCTIONALITY
      const resetAllFilter = useCallback(async () => {
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
      }, [
        clearDatePickerVal,
        consumerRef,
        entityNameRef,
        reset,
        setReset,
        sourceRef,
        statusRef,
        toggleSelectAll,
        setSelectAll,
      ]);

      const getValueFromMultiSelect = useCallback(
        async (event: any) => {
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
            const sourceMultiSelValue =
              await sourceRef.current?.getCurrentValue();
            store.dispatch(
              setSourceFilter(
                sourceMultiSelValue.map((item: any) => item.value).join(",")
              )
            );
          }
          if (event?.target?.multiselectid === "status-dropdown") {
            const statusMultiSelValue =
              await statusRef.current?.getCurrentValue();
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
        },
        [
          consumerRef,
          entityNameRef,
          setConsumerFilter,
          setEntityNameFilter,
          setSourceFilter,
          setStatusFilter,
        ]
      );

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
      const getCurrentDimension = useCallback(() => {
        return {
          width: window.innerWidth,
        };
      }, []);

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

      // UseSelectors for prefill filters (redirection or from params)
      const transactionalLogDataStore = useSelector((state: any) => {
        return state.transactionalLog.transactionalLogFilter;
      });

      const [selectedDateRange, setSelectedDateRange] = useState<any>({});
      useEffect(() => {
        if (Object.keys(selectedDateRange).length > 0) {
          const { startDateRange, endDateRange } = selectedDateRange;
          store.dispatch(setDateRangeFilter({ startDateRange, endDateRange }));
        }
      }, [selectedDateRange]);

      return (
        <div className="d-flex flex-column">
          {/* Filter for Desktop devices */}
          {screenSize.width > 992 && (
            <TransactionalLogsFilterStyled>
              <div className="transactional-logs-filter-lg">
                <div className="d-flex flex-wrap justify-content-start">
                  <div className="row w-100">
                    {/* ADD Date range here */}
                    <div className="col-lg-4 col-lg-5 col-md-6 col-sm-12">
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

                    <div className="col-12 col-lg-7 pb-lg-3">
                      {/* Search Input Field Starts Here */}
                      <SearchInputField reset={reset} />
                    </div>
                  </div>

                  <div className="row w-100">
                    <div className="col-12 col-lg-4 pb-3">
                      <aui-multiselect
                        options={`${JSON.stringify(
                          generateOptionsEntityName(entityNameArr)
                        )}`}
                        iconbackground
                        placeholder="Select any option"
                        multiselectid="entity-dropdown"
                        label="Select Entity Name"
                        labelgrid="col-sm-3"
                        multiselectgrid="col-sm-9"
                        direction="column"
                        ref={entityNameRef}
                        searchable
                        value={`${JSON.stringify(
                          generateOptions(
                            `${transactionalLogDataStore.entityName}`.split(",")
                          )
                        )} ?? []`}
                      />
                    </div>

                    <div className="col-6 col-md-6 col-lg-4 pb-3 ">
                      <aui-multiselect
                        options={`${JSON.stringify(
                          generateOptions(sourceArr)
                        )}`}
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
                        options={`${JSON.stringify(
                          generateOptions(statusArr)
                        )}`}
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
                        options={`${JSON.stringify(
                          generateOptions(consumerArr)
                        )}`}
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
                          id="clear-filter-desktop"
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

                <div className="d-flex justify-content-between align-items-center export-Sort-Sec">
                  <div className="d-flex align-items-center">
                    <div className="d-flex align-items-center export-button">
                      <aui-button
                        variant="link-style"
                        arialabel="Export Transaction Details to Excel"
                        disabled={transactionalData.length === 0}
                        onClick={() => {
                          const filteredData = transactionalData?.filter(
                            (item: any) => {
                              return item.checked === true;
                            }
                          );
                          filteredData.length === 0
                            ? exportToCSV(
                                transactionalData,
                                "Transactional Logs"
                              )
                            : exportToCSV(
                                filteredData,
                                "Filtered Transactional Logs"
                              );
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
                        tooltipid="Resend-Transactions"
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
                  <div className="d-flex align-items-center">
                    <div className="d-flex align-items-center mx-2">
                      Sort By:{" "}
                      <span className="created-date">Created Date - DESC</span>{" "}
                    </div>
                    <div className="d-flex align-items-center ml-3 refresh-icon">
                      <CustomTooltip tooltipid="refresh-icon" content="Refresh">
                        <>
                          <button
                            type="button"
                            className="noBtnStyle p-0"
                            aria-label="Refresh"
                            onClick={() => {
                              setRefresh(!refresh);
                            }}
                            onFocus={(event: any) => {
                              // Accessibility Fix
                              document
                                .querySelector<any>(
                                  ".custTableWrapper .filterSec"
                                )
                                ?.classList.add("d-none");
                              document
                                .querySelector<any>(".filterGrid")
                                ?.setAttribute("aria-expanded", "false");
                            }}
                          >
                            <aui-icon
                              block
                              icon="reload"
                              svgclass="svg-class-name"
                              svgwidth="20"
                              svgheight="20"
                              pathclass="custom-path-class-name"
                            />
                          </button>
                        </>
                      </CustomTooltip>
                    </div>
                    <div className="d-flex align-items-center ml-3 mr-2">
                      {/* Customize Table Grid Section Starts here */}
                      <div className="custTableWrapper align-self-end">
                        <CustomTooltip
                          tooltipid="customize-table"
                          content="Customize Table"
                        >
                          <>
                            <button
                              type="button"
                              className="noBtnStyle mt-1 filterGrid"
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
                            <div className="d-none filterSec" ref={ref}>
                              <div className="multiSelectWrapper">
                                {generateCustomizeTableContent(
                                  columnHeaders,
                                  false
                                )}
                              </div>
                            </div>
                          </>
                        </CustomTooltip>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TransactionalLogsFilterStyled>
          )}
          {screenSize.width >= 576 && screenSize.width < 991 && (
            <TransactionalLogsFilterTablet
              transactionalData={transactionalData}
              resentCount={resentCount}
              setRefresh={setRefresh}
              refresh={refresh}
              toggleSelectAll={toggleSelectAll}
              setSelectAll={setSelectAll}
              selectAll={selectAll}
              onChangePageOrder={onChangePageOrder}
              columnHeaders={columnHeaders}
              generateCustomizeTableContent={generateCustomizeTableContent}
              toggleCustContentPopover={toggleCustContentPopover}
              reset={reset}
              setReset={setReset}
              entityNameArr={entityNameArr}
              sourceArr={sourceArr}
              statusArr={statusArr}
              consumerArr={consumerArr}
              entityNameRef={entityNameRef}
              sourceRef={sourceRef}
              statusRef={statusRef}
              consumerRef={consumerRef}
              resetAllFilter={resetAllFilter}
              exportToCSV={exportToCSV}
              getCurrentDimension={getCurrentDimension}
              setScreenSize={setScreenSize}
              screenSize={screenSize}
              toggleDatePicker={toggleDatePicker}
              transactionalLogDataStore={transactionalLogDataStore}
              getValueFromMultiSelect={getValueFromMultiSelect}
            />
          )}
          {/* Filter for Mobile devices */}
          {screenSize.width <= 575 && (
            <TransactionalLogsFilterMobile
              transactionalData={transactionalData}
              resentCount={resentCount}
              setRefresh={setRefresh}
              refresh={refresh}
              toggleSelectAll={toggleSelectAll}
              setSelectAll={setSelectAll}
              selectAll={selectAll}
              onChangePageOrder={onChangePageOrder}
              columnHeaders={columnHeaders}
              generateCustomizeTableContent={generateCustomizeTableContent}
              toggleCustContentPopover={toggleCustContentPopover}
              reset={reset}
              setReset={setReset}
              entityNameArr={entityNameArr}
              sourceArr={sourceArr}
              statusArr={statusArr}
              consumerArr={consumerArr}
              entityNameRef={entityNameRef}
              sourceRef={sourceRef}
              statusRef={statusRef}
              consumerRef={consumerRef}
              resetAllFilter={resetAllFilter}
              exportToCSV={exportToCSV}
              getCurrentDimension={getCurrentDimension}
              setScreenSize={setScreenSize}
              screenSize={screenSize}
              toggleDatePicker={toggleDatePicker}
              transactionalLogDataStore={transactionalLogDataStore}
              getValueFromMultiSelect={getValueFromMultiSelect}
              setToggleModal={setToggleModal}
              toggleModal={toggleModal}
              setShowClearAll={setShowClearAll}
              showClearAll={showClearAll}
            />
          )}
        </div>
      );
    }
  );

export default TransactionalLogsFilter;
