import store from "app/store";
import CONSTANTS from "common/constants";
import {
  formatDate,
  getErrorMessage,
  lowerCaseAllWordsExceptFirstLetters,
} from "common/utils";
import { showToast } from "components/Toast/toast.slice";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TransactionalLogList } from "services/api/transactionalLog.api";
import { logger } from "common/utils/logger.utils";
import { TransactionalTable } from "./styled";

const TransactionalLogs: React.FunctionComponent = () => {
  const [dashboardTransLog, setDashboardTransLog] = useState<any>([]);

  const navigate = useNavigate();
  const getTransactionalLogs = (filterParams: any) => {
    TransactionalLogList(filterParams)
      .then((response) => {
        if (response.data.transactionLogs === null) {
          setDashboardTransLog([]);
        } else {
          setDashboardTransLog(response.data.transactionLogs);
        }
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
      .finally(() => {});
  };

  useEffect(() => {
    getTransactionalLogs({
      pageSize: CONSTANTS.DASHBOARD_TRANSLOG_RECORDS,
      pageOrder: "DESC",
    });
  }, []);

  interface IcolumnHeaders {
    name?: string;
    id?: number;
    sortable?: boolean;
    filterSupport?: boolean;
    filterCode?: string;
    optionalColumn?: boolean;
    defaultSort?: string;
    optionalColumnClass?: string;
    isChecked?: boolean;
  }
  const [columnHeaders, setColumnHeaders] = useState<IcolumnHeaders[]>([
    {
      name: "Entity Name",
      id: 1,
      sortable: false,
      filterSupport: true,
      filterCode: "entityName",
      optionalColumn: false,
      isChecked: true,
    },
    {
      name: "Status",
      id: 3,
      sortable: false,
      filterSupport: true,
      filterCode: "status",
      optionalColumn: false,
      isChecked: true,
    },
    {
      name: "Channel",
      id: 5,
      sortable: false,
      filterSupport: true,
      filterCode: "channel",
      optionalColumn: false,
      isChecked: true,
    },
    {
      name: "Date",
      id: 6,
      sortable: true,
      filterSupport: false,
      filterCode: "createdAt",
      optionalColumn: false,
      defaultSort: "DESC",
      isChecked: true,
      optionalColumnClass: "optionalColumnCreatedDate",
    },
    {
      name: "Transaction ID",
      id: 7,
      sortable: false,
      filterSupport: false,
      filterCode: "transactionId",
      optionalColumn: true,
      optionalColumnClass: "optionalColumnTransactionID",
      isChecked: false,
    },
    {
      name: "Error Code",
      id: 8,
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
      sortable: false,
      filterSupport: false,
      filterCode: "eventType",
      optionalColumn: true,
      optionalColumnClass: "optionalColumnEventType",
      isChecked: false,
    },
  ]);

  logger("state of setter ", setColumnHeaders);

  return (
    <TransactionalTable>
      <div className="container justify-content-between p-0 mt-5">
        <div className="row">
          <div className="">
            <div className="transactional-box">
              <div className="table-content">
                <div className="transactional-header d-flex justify-content-between align-items-center mb-3">
                  <div className="heading">Transactional Logs</div>
                  <div className="view-all">
                    <button
                      className="adh-anchorStyle noBtnStyle"
                      type="button"
                      onClick={() => {
                        navigate(`${CONSTANTS.PAGE_ROUTES.TRANSACTIONLOGS}`);
                        window.scrollTo(0, 0);
                      }}
                    >
                      View All
                    </button>
                  </div>
                </div>
                <div className="project-table">
                  <table className="aui-responsive-status-table">
                    <thead>
                      <tr>
                        {columnHeaders &&
                          columnHeaders.map((header) => {
                            return (
                              header.isChecked && (
                                <th
                                  key={header.id}
                                  scope="col"
                                  className={header.optionalColumnClass}
                                >
                                  <div className="d-flex aui-th rounded-0 justify-content-between">
                                    {header.name}
                                  </div>
                                </th>
                              )
                            );
                          })}
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardTransLog.map((logItem: any) => {
                        const keyId = `${logItem.status}-${logItem.entityName}-${logItem.channel}-${logItem.createdAt}`;
                        return (
                          <tr
                            key={keyId} /* IPAD page error issue fix */
                            data-test-id={keyId}
                            className={
                              logItem.status === "SUCCESS"
                                ? "aui-table-status-success"
                                : "aui-table-status-deactivated"
                            }
                          >
                            <>
                              <td data-title="Entity Name">
                                <div className="aui-td">
                                  {logItem.entityName}
                                </div>
                              </td>
                              <td data-title="Status">
                                <div className="aui-td">
                                  {lowerCaseAllWordsExceptFirstLetters(
                                    logItem.status
                                  )}
                                </div>
                              </td>
                              <td data-title="Channel">
                                <div className="aui-td">{logItem.channel}</div>
                              </td>
                              <td data-title="Date">
                                <div className="aui-td">
                                  {formatDate(logItem.createdAt, "time-minute")}
                                </div>
                              </td>
                            </>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TransactionalTable>
  );
};

export default TransactionalLogs;
