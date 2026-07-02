import React from "react";
import { useSelector } from "react-redux";
import {
  setCursor,
  setCursorNextCount,
  setCursorPrevCount,
} from "pages/TransactionalLogs/Component/common/TransactionalLogs.slice";
import store from "app/store";
import CursorPaginationStyle from "./styled";

export interface ICursorPagination {
  pageNumber: number;
  pageSize: number;
  totalCount?: number;
  totalPages?: number;
  isFirst: number;
  isLast: number;
  paginationSetLimit: number;
}

const CursorPagination: React.FunctionComponent<any> = () => {
  const cursorDataStore = useSelector((state: any) => {
    return state.transactionalLog?.pagination;
  });

  const pageSizeCursorDataStore = useSelector((state: any) => {
    return state.transactionalLog?.cursorpagination?.pageSize;
  });

  const transLodDataLengthCursorDataStore = useSelector((state: any) => {
    return state.transactionalLog?.cursorpagination?.transLogDataLength;
  });

  const paginationDataStorePrevCount = useSelector((state: any) => {
    return state.transactionalLog.cursorpagination.prevCount;
  });

  const paginationDataStoreNextCount = useSelector((state: any) => {
    return state.transactionalLog.cursorpagination.nextCount;
  });

  const calculatePageCount = (pageOrderFlag: string) => {
    // check for nextcursor or prev cursor
    if (pageOrderFlag === "PAGE-INCREMENT") {
      store.dispatch(setCursorPrevCount(paginationDataStoreNextCount + 1));
      store.dispatch(
        setCursorNextCount(
          paginationDataStoreNextCount + pageSizeCursorDataStore
        )
      );
      store.dispatch(setCursor(cursorDataStore?.nextCursor));
    } else if (pageOrderFlag === "PAGE-DECREMENT") {
      store.dispatch(
        setCursorPrevCount(
          paginationDataStorePrevCount - pageSizeCursorDataStore
        )
      );
      store.dispatch(
        setCursorNextCount(
          paginationDataStoreNextCount - pageSizeCursorDataStore
        )
      );
      store.dispatch(setCursor(cursorDataStore?.previousCursor));
    }
  };

  return (
    <CursorPaginationStyle className="ml-mob-paginationwrapper">
      <div className="col-12 col-sm-7 col-md-7 col-lg-12 count-range-wrapper">
        <p className="countRangeSec">
          {paginationDataStorePrevCount} -{" "}
          {cursorDataStore?.nextCursor?.trim()?.length === 0
            ? parseInt(paginationDataStorePrevCount, 10) +
              parseInt(transLodDataLengthCursorDataStore, 10) -
              1
            : paginationDataStoreNextCount}{" "}
          of &nbsp;
          {cursorDataStore?.nextCursor?.trim()?.length === 0
            ? parseInt(paginationDataStorePrevCount, 10) +
              parseInt(transLodDataLengthCursorDataStore, 10) -
              1
            : "Many"}
          <span className="visually-hidden"> transaction logs</span>
        </p>
        <nav className=" aha-pagination" aria-label="Pagination">
          <ul className="pagination aui-pagination">
            <li className="page-item pr-3">
              <button
                className={
                  cursorDataStore?.previousCursor?.trim()?.length === 0
                    ? "page-link page-disabled"
                    : "page-link"
                }
                aria-label="Previous Page"
                disabled={cursorDataStore?.previousCursor?.trim()?.length === 0}
                onClick={() => {
                  calculatePageCount("PAGE-DECREMENT");
                }}
                type="button"
              >
                {/*  <span aria-hidden="true">&laquo;</span> */}
                <aui-icon icon="arrowleft" block={false} />
              </button>
            </li>

            <li className="page-item">
              <button
                className={
                  cursorDataStore?.nextCursor?.trim()?.length === 0
                    ? "page-link page-disabled"
                    : "page-link"
                }
                aria-label="Next Page"
                disabled={cursorDataStore?.nextCursor?.trim()?.length === 0}
                onClick={() => {
                  window.scrollTo(0, 0);
                  calculatePageCount("PAGE-INCREMENT");
                }}
                type="button"
              >
                {/* <span aria-hidden="true">&raquo;</span> */}
                <aui-icon icon="arrowright" block={false} />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </CursorPaginationStyle>
  );
};

export default CursorPagination;

CursorPagination.defaultProps = {
  pageSize: 0,
  totalCount: 0,
  totalPages: 0,
};
