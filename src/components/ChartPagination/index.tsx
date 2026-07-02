import store from "app/store";
import { getErrorMessage } from "common/utils";
import { showToast } from "components/Toast/toast.slice";
import React, { useEffect, useState } from "react";
import ChartPaginationStyleWrapper from "./Styled";

interface IPagination {
  pageNumber: any;
  pageSize: any;
  totalCount?: any;
  totalPages?: any;
  isFirst: any;
  isLast: any;
  pageOffset: any;
}

const ChartPagination: React.FunctionComponent<any> = ({
  apiCaller,
  updateChart,
}: any) => {
  const [pagination, setPagination] = useState<IPagination>({
    pageNumber: 1,
    pageSize: 1,
    isFirst: 0,
    isLast: 0,
    totalCount: 0,
    totalPages: 0,
    pageOffset: 0,
  });

  const [totalCount, setTotalCount] = useState(0);
  const [disableNxtBtn, setDisableNxtBtn] = useState(false);
  const [disablePrevBtn, setDisablePrevBtn] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [endCount, setEndCount] = useState(0);
  const [startCount, setStartCount] = useState(0);

  useEffect(() => {
    apiCaller(pageNumber, 6)
      .then((response: any) => {
        // update chart with new data
        updateChart(response);

        // update pagination with new data
        setPagination({
          ...pagination,
          pageNumber: response._pagination.pageNumber,
          totalCount: response._pagination.totalCount,
          pageOffset: response._pagination.pageOffset,
          pageSize: response._pagination.pageSize,
          totalPages: response._pagination.totalPages,
          isFirst: response._pagination.isFirst,
          isLast: response._pagination.isLast,
        });

        response._pagination.isLast === 1
          ? setDisableNxtBtn(true)
          : setDisableNxtBtn(false);

        response._pagination.isFirst === 1
          ? setDisablePrevBtn(true)
          : setDisablePrevBtn(false);
      })
      .catch((error: any) => {
        store.dispatch(
          showToast({
            type: "danger",
            title: "Error Occurred",
            message: getErrorMessage(error),
          })
        );
      });
  }, [pageNumber]);

  useEffect(() => {
    // Pagination Updation

    let startNum = 1;
    let endNum = pagination.pageSize;
    if (pagination.isFirst !== 1) {
      startNum = pagination.pageOffset;
      endNum = pageNumber * pagination.pageSize;
    }
    if (pagination.isLast === 1) {
      endNum = pagination.totalCount;
    }

    setTotalCount(pagination.totalCount);
    setStartCount(startNum);
    setEndCount(endNum);
  }, [pagination]);

  const paginationRangeContent = () => {
    if (totalCount - startCount === 0) return `${endCount}`;
    return `${startCount} - ${endCount}`;
  };
  return (
    <ChartPaginationStyleWrapper>
      <div className="paginationNumberSection">
        <span className="numberSections" data-testid="paginationNumberSec">
          {paginationRangeContent()} of {totalCount}
        </span>
        <button
          type="button"
          className="noBtnStyle firstBtn"
          aria-label="PaginationPreviousButton"
          data-testid="paginationPrevBtn"
          onClick={() => {
            setDisablePrevBtn(true);
            !disablePrevBtn && setPageNumber(pageNumber - 1);
          }}
          disabled={disablePrevBtn}
        >
          <i className="aha-icon-right-arrow-thick arrow-style inverseArrow mr-2" />
        </button>
        <button
          type="button"
          className="noBtnStyle nextBtn"
          aria-label="PaginationNextButton"
          data-testid="paginationNextBtn"
          onClick={() => {
            setDisableNxtBtn(true);
            !disableNxtBtn && setPageNumber(pageNumber + 1);
          }}
          disabled={disableNxtBtn}
        >
          <i className="aha-icon-right-arrow-thick arrow-style mr-2" />
        </button>
      </div>
    </ChartPaginationStyleWrapper>
  );
};

export default ChartPagination;
