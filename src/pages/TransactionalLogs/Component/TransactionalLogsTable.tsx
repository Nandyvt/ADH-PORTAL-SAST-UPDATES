import React from "react";
import CursorPagination, {
  ICursorPagination,
} from "components/CursorPagination";
import CONSTANTS from "common/constants";
import CustomTable from "./CustomTable";
import ShowNumberOfRecordsComp from "./ShowNumberOfRecords";

interface ITransactionalLogsTableProps {
  isTableLoading: boolean;
  transactionalData: any;
  transactionalHeaderData: any;
  checkfilter: any[];
  pagination: ICursorPagination;
  toggleSelectAll: any;
  setSelectAll: any;
  selectAll: any;
  toggleRow: any;
  reset: any;
  setReset: any;
}

export interface IcolumnHeaders {
  name?: string;
  id?: number;
  filterSupport?: boolean;
  filterCode?: string;
  optionalColumn?: boolean;
  defaultSort?: string;
  optionalColumnClass?: string;
  isChecked?: boolean;
}

const TransactionalLogsTableComp: React.FunctionComponent<
  ITransactionalLogsTableProps
> = ({
  isTableLoading,
  transactionalData,
  transactionalHeaderData,
  checkfilter,
  pagination,
  toggleSelectAll,
  setSelectAll,
  selectAll,
  toggleRow,
  reset,
  setReset,
}) => {
  return (
    <div>
      {/* Table Component */}

      <div className="table-content">
        <CustomTable
          theadData={transactionalHeaderData}
          tbodyData={transactionalData}
          isTableLoading={isTableLoading}
          checkfilter={checkfilter}
          toggleSelectAll={toggleSelectAll}
          setSelectAll={setSelectAll}
          selectAll={selectAll}
          toggleRow={toggleRow}
          reset={reset}
          setReset={setReset}
        />
      </div>

      {/* Show Records and Pagination Section */}
      <div className="heading-lbl-wrapper mt-4 pagination-sec d-flex flex-wrap justify-content-between">
        {transactionalData.length > 0 && !isTableLoading && (
          <ShowNumberOfRecordsComp
            rangeArr={CONSTANTS.NUMBER_OF_RECORDS.TRANSLOG_PAGE}
            isCursorPagination
          />
        )}

        {/* <div className=""> */}
        {/* AUI v2 Pagination Component */}
        {/* <aui-pagination
            inputdata={pagination}
            currentpage={pagination.pageNumber}
            alignment="end"
          /> */}
        {/* </div> */}
        {transactionalData.length > 0 && !isTableLoading && (
          <CursorPagination
            pageNumber={pagination.pageNumber}
            pageSize={pagination.pageSize}
            totalCount={pagination.totalCount}
            totalPages={pagination.totalPages}
            isFirst={pagination.isFirst}
            isLast={pagination.isLast}
            paginationSetLimit={CONSTANTS.PAGINATION_LIMIT}
          />
        )}
      </div>
    </div>
  );
};

export default TransactionalLogsTableComp;
