/* eslint-disable prettier/prettier */
import React from "react";
import { useDispatch } from "react-redux";
import NoDataComp from "components/NoData";
import { TransactionalLogData } from "pages/TransactionalLogs/TransactionalLogs";
import { Link } from "react-router-dom";
import { formatDate, lowerCaseAllWordsExceptFirstLetters } from "common/utils";
import { CustomTableWrapper } from "./styled";
import { setClearFilter } from "../common/TransactionalLogs.slice";

interface ICustomTable {
  theadData: any;
  tbodyData: any;
  customClass?: any;
  isTableLoading: boolean;
  checkfilter: any[];
  toggleSelectAll?: any;
  setSelectAll: any;
  selectAll: any;
  toggleRow?: any;
  reset: any;
  setReset: any;
}

const CustomTable: React.FunctionComponent<ICustomTable> = ({
  theadData,
  tbodyData,
  customClass = "",
  isTableLoading,
  checkfilter,
  toggleSelectAll,
  setSelectAll,
  selectAll,
  toggleRow,
  reset,
  setReset,
}: ICustomTable) => {
  const dispatch = useDispatch();


  // RESET FUNCTIONALITY
  const resetAllFilter = async () => {
    // reset datepicker
    document.querySelector<any>("#clear-filter-desktop")?.click();
  };

  const generateTdCell = (each: any, filterCode: any) => {
    if (filterCode === "entityName") {
      return (
        <span>
          <label htmlFor={each.id} className="lblStyles">
            <input
              id={each.id}
              type="checkbox"
              className="aui-checkbox pr-2"
              checked={each.checked}
              onChange={() => toggleRow(each.id)}
            />
            <Link
              to={`/transactionLogs/${each.id}/request`}
              className="adh-anchorStyle mb-0 ml-2"
              data-testid="entityName"
            >
              {each[filterCode].toUpperCase()}
            </Link>
          </label>
        </span>
      );
    }
    if (filterCode === "status") {
      if (each[filterCode] === "SUCCESS" || each[filterCode] === "SKIPPED") {
        return lowerCaseAllWordsExceptFirstLetters(each[filterCode]);
      }
      return (
        <Link
          to={`/transactionLogs/${each.id}/error`}
          className="adh-anchorStyle mb-0"
        >
          {lowerCaseAllWordsExceptFirstLetters(each[filterCode])}
        </Link>
      );
    }
    if (filterCode === "createdAt") {
      const { dateResp, timeResp } = formatDate(
        each[filterCode],
        "time-second"
      );
      return (
        <div className="createdDateColWrapper">
          <p className="m-0 p-0">{dateResp}</p>
          <p className="m-0 p-0">{timeResp}</p>
        </div>
      );
    }

    return each[filterCode];
  };

  return (
    <CustomTableWrapper>
      {tbodyData?.length !== 0 && (
        <aui-table
          type="status"
          loader={isTableLoading}
          loadertype="content"
          headerbackground
        >
          <table
            className="aui-responsive-status-table"
            data-testid="custom-table"
          >
            <thead>
              <tr>
                {theadData?.map((header: any) => {
                  return (
                    header.isChecked && (
                      <th
                        key={header.id}
                        scope="col"
                        className={`${header.clsName} ${
                          header?.optionalColumnClass !==
                          "optionalColumnTransactionID"
                            ? header?.optionalColumnClass
                            : ""
                        }`}
                      >
                        <div className="d-flex aui-th justify-content-between">
                          <div className="placeHolderWrapper tooltip-role">
                            {header.name === "Entity Name" ? (
                              <span>
                                <label htmlFor="select-all">
                                  <input
                                    id="select-all"
                                    type="checkbox"
                                    aria-label="Select all rows"
                                    className="aui-checkbox pr-2"
                                    checked={selectAll}
                                    onChange={() => {
                                      toggleSelectAll(!selectAll);
                                      setSelectAll(!selectAll);
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
                                        ?.setAttribute(
                                          "aria-expanded",
                                          "false"
                                        );
                                    }}
                                  />
                                  {header.name}
                                </label>
                              </span>
                            ) : (
                              header.name
                            )}
                          </div>
                        </div>
                      </th>
                    )
                  );
                })}
              </tr>
            </thead>
            {!isTableLoading && (
              <tbody>
                {tbodyData?.map((tableData: TransactionalLogData) => {
                  let statusClassName = "";
                  if (tableData.status === "SUCCESS") {
                    statusClassName = "aui-tr-success";
                  }
                  if (tableData.status === "FAILURE") {
                    statusClassName = "aui-tr-danger";
                  }
                  if (tableData.status === "SKIPPED") {
                    statusClassName = "aui-tr-warning";
                  }
                  return (
                    <tr key={tableData.id} className={statusClassName}>
                      {theadData.map(
                        (theadDataObj: any) =>
                          theadDataObj.isChecked && (
                            <td
                              key={theadDataObj.filterCode}
                              data-title={theadDataObj.name}
                            >
                              <div
                                className={`aui-td ${theadDataObj.optionalColumnClass}`}
                                title={
                                  theadDataObj.optionalColumnClass ===
                                  "optionalColumnTransactionID"
                                    ? generateTdCell(
                                        tableData,
                                        theadDataObj.filterCode
                                      )
                                    : null
                                }
                              >
                                <div className="optinalcolumn">
                                  {generateTdCell(
                                    tableData,
                                    theadDataObj.filterCode
                                  )}
                                </div>
                              </div>
                            </td>
                          )
                      )}
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        </aui-table>
      )}
      {tbodyData?.length === 0 &&
        !isTableLoading &&
        checkfilter?.length !== 0 && (
          <>
            <NoDataComp DataList={tbodyData} Filter />
            <div className="d-flex flex-column justify-content-center align-items-center">
              <p>Change the filter options or</p>
              <button
                aria-label="Reload"
                type="button"
                className="reload-btn"
                onClick={() => {
                  dispatch(setClearFilter());
                  resetAllFilter();
                }}
                onKeyUp={(e) => {
                  if (e.key === "Enter" || e.key === "Spacebar") {
                    dispatch(setClearFilter());
                    resetAllFilter();
                  }
                }}
              >
                <i className="aha-icon-reload" />
                Reload
              </button>
            </div>
          </>
        )}
    </CustomTableWrapper>
  );
};

export default CustomTable;

CustomTable.defaultProps = {
  customClass: null,
  toggleSelectAll: null,
  toggleRow: null,
};
