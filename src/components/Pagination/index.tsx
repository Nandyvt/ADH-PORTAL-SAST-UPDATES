import React from "react";
import PropTypes from "prop-types";
import PaginationStyle from "./styled";

export interface IPagination {
  pageNumber: number;
  pageSize: number;
  totalCount?: number;
  totalPages?: number;
  isFirst: number;
  isLast: number;
  setPageNumber: any;
  paginationSetLimit: number;
}

const Pagination = ({
  pageNumber,
  pageSize,
  totalCount,
  totalPages,
  isFirst,
  isLast,
  setPageNumber,
  paginationSetLimit,
}: IPagination) => {
  let paginationSetIndex = 0;
  let paginationSetMaxLimit = paginationSetLimit;

  if (totalPages && totalPages < paginationSetLimit) {
    paginationSetMaxLimit = totalPages;
  } else if (pageNumber / paginationSetLimit > 1) {
    paginationSetIndex =
      Math.floor((pageNumber - 1) / paginationSetLimit) * paginationSetLimit;
    if (Number(totalPages) - (pageNumber - 1) < paginationSetLimit) {
      paginationSetMaxLimit = Number(totalPages) - paginationSetIndex;
      if (paginationSetMaxLimit > paginationSetLimit) {
        paginationSetMaxLimit = paginationSetLimit;
      }
    }
  } else if (totalPages === 0) {
    paginationSetMaxLimit = 1;
  }

  return (
    <PaginationStyle>
      <div className="col-12 col-sm-7 col-md-7 col-lg-7">
        <nav className=" aha-pagination" aria-label="Pagination">
          <ul className="pagination aui-pagination">
            <li className="page-item">
              <button
                className={
                  isFirst === 1 ? "page-link page-disabled" : "page-link"
                }
                aria-label="Previous"
                disabled={isFirst === 1}
                onClick={() => setPageNumber(pageNumber - 1)}
                type="button"
              >
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
            {[...Array(paginationSetMaxLimit)].map((x, i) => (
              <li
                key={`${pageNumber}-pageLink-${isFirst}-${isLast}`}
                className={
                  1 + i + paginationSetIndex === pageNumber
                    ? "page-item active"
                    : "page-item"
                }
              >
                <button
                  className="page-link"
                  aria-label={
                    1 + i + paginationSetIndex === pageNumber
                      ? `current page ${1 + i + paginationSetIndex}`
                      : `page ${1 + i + paginationSetIndex}`
                  }
                  onClick={() => {
                    setPageNumber(1 + i + paginationSetIndex);
                  }}
                  type="button"
                >
                  {1 + i + paginationSetIndex}
                </button>
              </li>
            ))}
            <li className="page-item">
              <button
                className={
                  isLast === 1 || pageNumber === totalPages
                    ? "page-link page-disabled"
                    : "page-link"
                }
                aria-label="Next"
                disabled={isLast === 1}
                onClick={() => {
                  setPageNumber(pageNumber + 1);
                }}
                type="button"
              >
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </PaginationStyle>
  );
};

export default Pagination;

Pagination.propTypes = {
  pageSize: PropTypes.number,
  totalCount: PropTypes.number,
  totalPages: PropTypes.number,
};

Pagination.defaultProps = {
  pageSize: 0,
  totalCount: 0,
  totalPages: 0,
};

export const generatePaginationRange = (_pagination: any) => {
  const rangeArrValues = [];
  let j = 0;

  for (let i = 1; i <= _pagination.totalPages; ) {
    if (i * _pagination.pageSize > _pagination.totalCount) {
      rangeArrValues.push(
        `${j * _pagination.pageSize + 1} - ${_pagination.totalCount}`
      );
    } else {
      rangeArrValues.push(
        `${j * _pagination.pageSize + 1} - ${i * _pagination.pageSize}`
      );
    }
    i += 1;
    j += 1;
  }
  return rangeArrValues;
};
