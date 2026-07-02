import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  TransactionalLogFilter,
  TransactionalLogList,
} from "services/api/transactionalLog.api";
import store from "app/store";
import { showToast } from "components/Toast/toast.slice";
import { getErrorMessage, getParamsFromURL, toggleModalStyles } from "common/utils";
import { useDispatch, useSelector } from "react-redux";
import Chips from "components/Chips";
import { useWindowDimensionOnPageResize } from "pages/_layouts/componentUtil";
import TransactionalLogsFilter from "./Component/TransactionalLogsFilter";
import TransactionalLogsTable from "./Component/TransactionalLogsTable";
import {
  setClearFilter,
  setConsumerFilter,
  setEntityNameFilter,
  setPagination,
  setSortByFilter,
  setSourceFilter,
  setStatusFilter,
  setTransLogDataLength,
  setUrlParamsFilter,
  setSearchParamFilter,
  setDateRangeFilter,
} from "./Component/common/TransactionalLogs.slice";
import { TransactionalLogsStyled } from "./styled";
import TransactionalLogsFilterModal from "./Component/TransactionalLogsModal/TransactionalLogsFilterModal";
import CreateTransactionModal from "./Component/CreateTransactionModal";
import { formatDate, generateOptions, searchByMapping } from "./utils";

export interface TransactionalLogData {
  id: number;
  transactionId: string;
  consumer: string;
  eventType: string;
  entityName: string;
  status: string;
  source: string;
  clientId: string;
  errorCode: string;
  createdAt: string;
  checked?: boolean;
  isPassThrough?: boolean;
}

interface IcolumnHeaders {
  name?: string;
  id?: number;
  sortable?: boolean;
  clsName?: string;
  filterSupport?: boolean;
  filterCode?: string;
  optionalColumn?: boolean;
  defaultSort?: string;
  optionalColumnClass?: string;
  isChecked?: boolean;
}

const TransactionalLogsFinal = () => {
  //   Table Data Use state values
  const [transactionalData, setTransactionalData] = useState<
    TransactionalLogData[]
  >([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [showCreateTransactionModal, setShowCreateTransactionModal] =
    useState<boolean>(false);
  const [resentCount, setResentCount] = useState<number>(0);
  const [isTableLoading, setTableLoading] = useState<boolean>(false);
  const [selectedDateRange, setSelectedDateRange] = useState<any>({});

  useEffect(() => {
    if (Object.keys(selectedDateRange).length > 0) {
      const { startDateRange, endDateRange } = selectedDateRange;
      setDateRangeFilter({ startDateRange, endDateRange });
    }
  }, [selectedDateRange]);

  const transactionalLogsFilter: any = useSelector(
    (state: any) => state.transactionalLog.transactionalLogFilter
  );

  // Select All Functionality
  const [selectAll, setSelectAll] = useState<boolean>(false);

  // FilterModal show hide
  const [, setFilterModal] = useState<boolean>(false);

  // REDUX Declarations
  const dispatch = useDispatch();
  const paginationDataStore = useSelector((state: any) => {
    return state.transactionalLog.pagination;
  });

  const pageSizeCursorDataStore = useSelector((state: any) => {
    return state.transactionalLog?.cursorpagination?.pageSize;
  });
  const checkfilter = useSelector(
    (state: any) => state.transactionalLog.checkfilter
  );

  // Toggle checkbox

  const toggleSelectAll = useCallback(
    (select: any) => {
      const updatedRowData = transactionalData.map(
        (row: TransactionalLogData) => ({
          ...row,
          checked: select,
        })
      );
      if (select) {
        setResentCount(updatedRowData.length);
      } else {
        setResentCount(0);
      }
      setTransactionalData(updatedRowData);
    },
    [transactionalData]
  );

  const toggleRow = useCallback(
    (id: any) => {
      for (let i = 0; i < transactionalData.length; i += 1) {
        if (transactionalData[i].id === id) {
          if (!transactionalData[i].checked === false) {
            setResentCount(resentCount - 1);
          } else {
            setResentCount(resentCount + 1);
          }
          setTransactionalData([
            ...transactionalData.slice(0, i),
            {
              ...transactionalData[i],
              checked: !transactionalData[i].checked,
            },
            ...transactionalData.slice(i + 1),
          ]);
          break;
        }
      }
    },
    [transactionalData, resentCount]
  );

  // Transactional Filter API Call
  const [entityNameArr, setEntityNameArr] = useState<any>([]);
  const [sourceArr, setsourceArr] = useState<any>([]);
  const [statusArr, setStatusArr] = useState<any>([]);
  const [consumerArr, setConsumerArr] = useState<any>([]);

  const getDistinctFilterList = () => {
    const p1 = TransactionalLogFilter("entityName");
    const p2 = TransactionalLogFilter("source");
    const p3 = TransactionalLogFilter("status");
    const p4 = TransactionalLogFilter("consumer");

    Promise.all([p1, p2, p3, p4])
      .then((response) => {
        setEntityNameArr(
          (response[0]?.data?.transactionLogFilters?.entityName ?? []).filter(
            (item: any) => item !== "UNMARSHALLING ERROR"
          )
        );
        setsourceArr(
          (response[1]?.data?.transactionLogFilters?.source ?? []).filter(
            (item: any) => item
          )
        );
        setStatusArr(
          (response[2]?.data?.transactionLogFilters?.status ?? []).filter(
            (item: any) => item
          )
        );

        setConsumerArr(
          (response[3]?.data?.transactionLogFilters?.consumer ?? []).filter(
            (item: any) => item
          )
        );
      })
      .catch((error) => {
        store.dispatch(
          showToast({
            type: "danger",
            title: "Error Occurred",
            message: getErrorMessage(error),
          })
        );
      });
  };

  useEffect(() => {
    getDistinctFilterList();
  }, []);

  // Transactional Logs API Call
  const getTransactionalLogs = async (filterParams?: any) => {
    setTableLoading(true);
    let resData: any = {};

    await TransactionalLogList(filterParams)
      .then((response) => {
        resData = response;

        const paginationRes = { ...response._pagination };
        setTransactionalData(response.data.transactionLogs);
        store.dispatch(
          setTransLogDataLength(response.data?.transactionLogs?.length)
        );
        dispatch(setPagination(paginationRes));
        setResentCount(0);
        setSelectAll(false);
      })
      .catch((error) => {
        store.dispatch(
          showToast({
            type: "danger",
            title: "Error Occurred",
            message: getErrorMessage(error),
          })
        );
      })
      .finally(() => {
        setTableLoading(false);
        return resData;
      });
  };

  // Customize Table Columns
  const [columnHeaders, setColumnHeaders] = useState<IcolumnHeaders[]>([
    {
      name: "Entity Name",
      id: 1,
      clsName: "entityNameTableHeader",
      sortable: false,
      filterSupport: true,
      filterCode: "entityName",
      optionalColumn: false,
      isChecked: true,
    },
    {
      name: "Transaction ID",
      id: 7,
      clsName: "transIDTableHeader",
      sortable: false,
      filterSupport: false,
      filterCode: "id",
      optionalColumn: false,
      optionalColumnClass: "optionalColumnTransactionID",
      isChecked: true,
    },
    {
      name: "Source",
      id: 2,
      clsName: "sourceTableHeader",
      sortable: false,
      filterSupport: true,
      filterCode: "source",
      optionalColumn: false,
      isChecked: true,
    },
    {
      name: "Status",
      id: 3,
      clsName: "statusTableHeader",
      sortable: false,
      filterSupport: true,
      filterCode: "status",
      optionalColumn: false,
      isChecked: true,
    },
    {
      name: "Consumer",
      id: 4,
      clsName: "consumerTableHeader",
      sortable: false,
      filterSupport: true,
      filterCode: "consumer",
      optionalColumn: false,
      isChecked: true,
    },
    {
      name: "Created Date",
      id: 6,
      clsName: "createdAtTableHeader",
      sortable: true,
      filterSupport: false,
      filterCode: "createdAt",
      optionalColumn: false,
      defaultSort: "DESC",
      isChecked: true,
      optionalColumnClass: "optionalColumnCreatedDate",
    },
    {
      name: "Error Code",
      id: 8,
      clsName: "",
      sortable: false,
      filterSupport: false,
      filterCode: "errorCode",
      optionalColumn: true,
      optionalColumnClass: "optionalColumnErrorCode",
      isChecked: false,
    },
    {
      name: "Event Type",
      id: 9,
      clsName: "",
      sortable: false,
      filterSupport: false,
      filterCode: "eventType",
      optionalColumn: true,
      optionalColumnClass: "optionalColumnEventType",
      isChecked: false,
    },
  ]);
  const toggleOptionalColumns = (index: any, checkedStatus: any) => {
    const clonedColumns = [...columnHeaders];
    clonedColumns[index].isChecked = !clonedColumns[index].isChecked;
    setColumnHeaders(clonedColumns);
  };

  const generateCustomizeTableContent = useCallback(
    (columnHeaderObj: any, mobile: any) => {
      return columnHeaderObj?.map((item: any, index: any) => {
        return item.name.length > 0 ? (
          <div
            key={`custTable_${item.name.replace(" ", "_")}_${
              mobile ? "mob" : "des"
            }`}
            className="form-group form-check mb-0"
          >
            <input
              type="checkbox"
              value={item.filterCode}
              id={`custTable_${item.name.replace(" ", "_")}_${index}_${
                mobile ? "mob" : "des"
              }_${index}`}
              defaultChecked={item.isChecked}
              disabled={!item.optionalColumn}
              onChange={(e) => {
                toggleOptionalColumns(index, e.currentTarget.checked);
              }}
            />
            <label
              className="labelHeading"
              htmlFor={`custTable_${item.name.replace(" ", "_")}_${index}_${
                mobile ? "mob" : "des"
              }_${index}`}
            >
              {item.name}
            </label>
          </div>
        ) : null;
      });
    },
    [columnHeaders]
  );

  const toggleCustContentPopover = useCallback((event: any) => {
    event.currentTarget.nextSibling?.classList.toggle("d-none");
    event.currentTarget.classList.toggle("filterSecOpen");
    if (event.currentTarget.nextSibling.classList.contains("d-none")) {
      event.currentTarget.setAttribute("aria-expanded", "false");
    } else {
      event.currentTarget.setAttribute("aria-expanded", "true");
    }
  }, []);

  const filterSecRef = useRef<any>();
  const closeFilterSecOnESC = (evt: any) => {
    if (evt.code === "Escape") {
      filterSecRef?.current?.classList.add("d-none");
      filterSecRef?.current.previousSibling.focus();
    }
  };

  // All Use Effects below this.
  // Sort Functionality
  const pageOrder = useSelector((state: any) => {
    return state.transactionalLog.pagination.pageOrder;
  });

  const dateRange = useSelector((state: any) => {
    const startDate =
      state?.transactionalLog?.transactionalLogFilter?.startDate;
    const endDate = state?.transactionalLog?.transactionalLogFilter?.endDate;
    return [startDate, endDate];
  });
  const entityName = useSelector((state: any) => {
    return state?.transactionalLog?.transactionalLogFilter?.entityName;
  });

  const sourceName = useSelector((state: any) => {
    return state?.transactionalLog?.transactionalLogFilter?.source;
  });

  const status = useSelector((state: any) => {
    return state?.transactionalLog?.transactionalLogFilter?.transactionStatus;
  });

  const consumer = useSelector((state: any) => {
    return state?.transactionalLog?.transactionalLogFilter?.consumer;
  });
  const searchParam = useSelector((state: any) => {
    const filter = state?.transactionalLog?.transactionalLogFilter;
    const { id, message, code, email } = filter;
    const filteredEntries = Object.entries({ id, message, code, email })
      .filter(
        ([key, value]) => value !== "" && value !== null && value !== undefined
      )
      .map(([key, value]) => ({ label: searchByMapping[key], value }));
    return filteredEntries[0];
  });

  const onChangePageOrder = useCallback(() => {
    if (pageOrder === "DESC") {
      store.dispatch(setSortByFilter("ASC"));
    } else {
      store.dispatch(setSortByFilter("DESC"));
    }
  }, [pageOrder]);

  // Get Params from LocalStorage for Automatic Email Task
  const [urlParams] = useState<any>(getParamsFromURL()?.params);

  useEffect(() => {
    if (urlParams) {
      store.dispatch(
        setUrlParamsFilter({
          ...urlParams,
          startDate: urlParams?.startDate,
          endDate: urlParams?.endDate,
        })
      );
    }
    return () => {
      localStorage.removeItem("TransLogAutoFillPath");
      localStorage.removeItem("TransLogAutoFillParams");
      localStorage.removeItem("RedirectUrlParams");
      store.dispatch(setClearFilter());
    };
  }, [urlParams]);

  useEffect(() => {
    // DO NOT ADD ANY STATE UPDATE AFTER THIS CALL
    getTransactionalLogs({
      ...transactionalLogsFilter,
      cursor: paginationDataStore.cursor,
      pageSize: pageSizeCursorDataStore || 50,
      pageOrder: paginationDataStore.pageOrder,
    });
  }, [
    transactionalLogsFilter,
    refresh,
    paginationDataStore.cursor,
    pageSizeCursorDataStore,
    paginationDataStore.pageOrder,
  ]);

  useEffect(() => {
    getDistinctFilterList();
  }, []);

  useEffect(() => {
    // add event listener- Accessibility fix
    document
      .querySelector<any>(".custTableWrapper")
      ?.addEventListener("keyup", closeFilterSecOnESC, false);
    return () =>
      /* cleanup */
      document
        .querySelector<any>(".custTableWrapper")
        ?.removeEventListener("keyup", closeFilterSecOnESC);
  }, []);

  // Mobile Filter
  const [toggleModal, setToggleModal] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<any>({});

  // Reset UseState
  const [reset, setReset] = useState<any>(false);

  useEffect(() => {
    if (
      Object.prototype.hasOwnProperty.call(
        appliedFilters,
        "multiSelectDropdownFilters"
      ) &&
      appliedFilters.multiSelectDropdownFilters.length > 0
    ) {
      if (
        appliedFilters.multiSelectDropdownFilters.some(
          (item: any) => item.id === "multiselect-entity-dropdown-modal"
        )
      ) {
        const entities = appliedFilters.multiSelectDropdownFilters.filter(
          (item: any) => item.id === "multiselect-entity-dropdown-modal"
        );
        store.dispatch(
          setEntityNameFilter(
            entities[0].data.map((item: any) => item.value).join(",")
          )
        );
      }
      if (
        appliedFilters.multiSelectDropdownFilters.some(
          (item: any) => item.id === "multiselect-source-dropdown-modal"
        )
      ) {
        const sources = appliedFilters.multiSelectDropdownFilters.filter(
          (item: any) => item.id === "multiselect-source-dropdown-modal"
        );
        store.dispatch(
          setSourceFilter(
            sources[0].data.map((item: any) => item.value).join(",")
          )
        );
      }

      if (
        appliedFilters.multiSelectDropdownFilters.some(
          (item: any) => item.id === "multiselect-status-dropdown-modal"
        )
      ) {
        const statuses = appliedFilters.multiSelectDropdownFilters.filter(
          (item: any) => item.id === "multiselect-status-dropdown-modal"
        );
        store.dispatch(
          setStatusFilter(
            statuses[0].data.map((item: any) => item.value).join(",")
          )
        );
      }

      if (
        appliedFilters.multiSelectDropdownFilters.some(
          (item: any) => item.id === "multiselect-consumer-dropdown-modal"
        )
      ) {
        const consumers = appliedFilters.multiSelectDropdownFilters.filter(
          (item: any) => item.id === "multiselect-consumer-dropdown-modal"
        );
        store.dispatch(
          setConsumerFilter(
            consumers[0].data.map((item: any) => item.value).join(",")
          )
        );
      }
    }
    // handle Date Range and serach by Field todo
    if (Object.prototype.hasOwnProperty.call(appliedFilters, "searchByField")) {
      store.dispatch(
        setSearchParamFilter({
          searchType: appliedFilters?.searchByField?.selectedOption,
          searchFieldValue: appliedFilters?.searchByField?.searchText,
        })
      );
    }
    if (Object.prototype.hasOwnProperty.call(appliedFilters, "dateRange")) {
      store.dispatch(setDateRangeFilter(appliedFilters?.dateRange));
    }
  }, [appliedFilters]);

  // Clear Chip
  const [clearChipData, setClearChipData] = useState<any>({});

  const idToActionMap: Record<string, any> = {
    "entities-multiselect": setEntityNameFilter,
    "sources-multiselect": setSourceFilter,
    "status-multiselect": setStatusFilter,
    "consumer-multiselect": setConsumerFilter,
    "date-range-filter": setDateRangeFilter,
  };

  useEffect(() => {
    if (Object.keys(clearChipData).length > 0) {
      const { id } = clearChipData;
      const action = idToActionMap[id];
      if (action) {
        dispatch(action([]));
      }
      if (id === "search-by-field") {
        dispatch(
          setSearchParamFilter({
            searchType: clearChipData.label,
          })
        );
      }
    }
  }, [clearChipData, dispatch]);

  const [showClearAll, setShowClearAll] = useState(false);

  const zoomedWindowWidth = useWindowDimensionOnPageResize();

  useEffect(() => {
    if (
      entityName.length > 0 ||
      sourceName.length > 0 ||
      status.length > 0 ||
      consumer.length > 0 ||
      dateRange.every((item: any) => item) ||
      searchParam?.label
    ) {
      setShowClearAll(true);
    } else {
      setShowClearAll(false);
    }
  }, [dateRange, consumer, entityName, sourceName, status, searchParam]);

  return (
    <TransactionalLogsStyled className="d-lg-flex mt-4">
      <div className="container transactional-logs-main">
        <div className="d-flex flex-grow-1 justify-content-between mt-3 heading-border">
          <h1
            className="proj-heading font-400"
            aria-label="Transactional Logs"
            data-testid="test-projects"
          >
            Transactional Logs
          </h1>
          <button
            type="button"
            aria-label="Create Transaction"
            className="btn btn-round btn-primary btnwidth"
            onClick={() => {
              toggleModalStyles();
              setShowCreateTransactionModal(true);
            }}
          >
            Create Transaction
          </button>
        </div>
        <TransactionalLogsFilter
          transactionalData={transactionalData}
          resentCount={resentCount}
          refresh={refresh}
          setRefresh={setRefresh}
          toggleSelectAll={toggleSelectAll}
          setSelectAll={setSelectAll}
          selectAll={selectAll}
          onChangePageOrder={onChangePageOrder}
          columnHeaders={columnHeaders}
          generateCustomizeTableContent={generateCustomizeTableContent}
          toggleCustContentPopover={toggleCustContentPopover}
          toggleModal={toggleModal}
          setToggleModal={setToggleModal}
          reset={reset}
          setReset={setReset}
          ref={filterSecRef}
          entityNameArr={entityNameArr}
          sourceArr={sourceArr}
          statusArr={statusArr}
          consumerArr={consumerArr}
          setFilterModal={setFilterModal}
          showClearAll={showClearAll}
          setShowClearAll={setShowClearAll}
        />
        {+zoomedWindowWidth < 576 && (
          <div className="d-flex flex-wrap mb-3">
            {[
              {
                label: "Date Range",
                value:
                  dateRange.every((item: any) => item) &&
                  dateRange.map((item: any) => formatDate(item)).join("-"),
                id: "date-range-filter",
              },
              {
                label: "Entities",
                value: entityName.length > 0 && entityName,
                id: "entities-multiselect",
              },
              {
                label: "Consumers",
                value: consumer.length > 0 && consumer,
                id: "consumer-multiselect",
              },
              {
                label: "Sources",
                value: sourceName.length > 0 && sourceName,
                id: "sources-multiselect",
              },
              {
                label: "Status",
                value: status.length > 0 && status,
                id: "status-multiselect",
              },
              {
                label: searchParam?.label,
                value: searchParam?.value,
                id: "search-by-field",
              },
            ].map((data: any, index: number) => (
              <Chips
                key={data.label}
                chipData={data}
                setClearChipData={setClearChipData}
              />
            ))}
          </div>
        )}

        <TransactionalLogsTable
          isTableLoading={isTableLoading}
          transactionalData={transactionalData}
          transactionalHeaderData={columnHeaders}
          checkfilter={checkfilter}
          pagination={paginationDataStore}
          toggleSelectAll={toggleSelectAll}
          setSelectAll={setSelectAll}
          selectAll={selectAll}
          toggleRow={toggleRow}
          reset={reset}
          setReset={setReset}
        />
      </div>
      <CreateTransactionModal
        showModal={showCreateTransactionModal}
        setShowModal={setShowCreateTransactionModal}
        onCreated={() => setRefresh(!refresh)}
      />
      <TransactionalLogsFilterModal
        filters={[
          {
            type: "dateRange",
            filterParams: {
              name: "search",
              label: "Search",
              placeholder: "Search",
              searchIcon: true,
              id: "search-date-range",
              value: dateRange,
              setSelectedDateRange,
              defaultDateRange: dateRange.every((item: any) => item)
                ? dateRange
                : [],
            },
          },
          {
            type: "searchByField",
            filterParams: {
              name: "Search by",
              label: "Search by",
              placeholder: "Search",
              searchByOptions: [
                {
                  label: "Transaction ID",
                  value: "Transaction ID",
                },
                {
                  label: "Error Message",
                  value: "Error Message",
                },
                {
                  label: "Organization Code",
                  value: "Organization Code",
                },
                {
                  label: "Email",
                  value: "Email",
                },
              ],
              searchType: searchParam?.label,
              searchFieldValue: searchParam?.value,
            },
          },
          {
            type: "multiSelectDropdown",
            filterParams: {
              name: "Select Entity Name",
              label: "Select Entity Name",
              placeholder: "Select Entity Name",
              options: JSON.stringify(generateOptions(entityNameArr)),
              value: JSON.stringify(
                generateOptions(
                  entityName.length > 0 ? entityName.split(",") : []
                )
              ),
              iconbackground: true,
              id: "entity-dropdown-modal",
            },
          },
          {
            type: "multiSelectDropdown",
            filterParams: {
              name: "Select Source",
              label: "Select Source",
              placeholder: "Select Source",
              options: JSON.stringify(generateOptions(sourceArr)),
              iconbackground: true,
              id: "source-dropdown-modal",
              value: JSON.stringify(
                generateOptions(
                  sourceName.length > 0 ? sourceName.split(",") : []
                )
              ),
            },
          },
          {
            type: "multiSelectDropdown",
            filterParams: {
              name: "Select Status",
              label: "Select Status",
              placeholder: "Select Status",
              options: JSON.stringify(generateOptions(statusArr)),
              iconbackground: true,
              id: "status-dropdown-modal",
              value: JSON.stringify(
                generateOptions(status.length > 0 ? status.split(",") : [])
              ),
            },
          },
          {
            type: "multiSelectDropdown",
            filterParams: {
              name: "Select Consumer",
              label: "Select Consumer",
              placeholder: "Select Consumer",
              options: JSON.stringify(generateOptions(consumerArr)),
              id: "consumer-dropdown-modal",
              iconbackground: true,
              value: JSON.stringify(
                generateOptions(consumer.length > 0 ? consumer.split(",") : [])
              ),
            },
          },
        ]}
        showModal={toggleModal}
        setShowModal={setToggleModal}
        appliedFilters={appliedFilters}
        setAppliedFilters={setAppliedFilters}
      />
    </TransactionalLogsStyled>
  );
};

export default TransactionalLogsFinal;
