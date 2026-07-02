import CONSTANTS from "common/constants";
import NoDataComp from "components/NoData";
import React, { useEffect, useState } from "react";
import { ListServiceProviderEmailAPI } from "services/api/notification.api";
import { passAuiObject } from "common/utils";
import PaginationSettings from "../List/PaginationSettings";
import ServiceProviderWrapper from "./styled";
import { defaultValues, filtersLabel } from "../List/utils";
import { notificationTypebasedOnId } from "../utils";

const tableHeaderNames = [
  { name: "Service Providers", id: 1 },
  { name: "Type", id: 2 },
];

const ServiceProvider: React.FunctionComponent = () => {
  const [loading, setLoading] = useState(false);
  const [refresh] = useState(false);
  const [type] = useState<string>("SMS,EMAIL,HTTP");
  const [pageSize, setPageSize] = useState<number>(20);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [prevPageSize, setPrevPageSize] = useState<number>(20);
  const [pagination, setPagination] = useState(defaultValues);
  const [serviceProviders, setServiceProviders] = useState<any>([]);

  const [apiRespFlag, setApiRespFlag] = useState(false);

  useEffect(() => {
    if (pageSize !== prevPageSize) {
      setPrevPageSize(pageSize);
      setPageNumber(1);
    }
  }, [pageSize]);

  useEffect(() => {
    setLoading(true);

    ListServiceProviderEmailAPI({
      pageSize,
      pageNumber,
    })
      .then((response: any) => {
        if (response && response.data.serviceProviders === null) {
          setLoading(false);
          setPagination(defaultValues);
          setServiceProviders(response.data.serviceProviders);
        } else {
          setLoading(false);
          setServiceProviders(response.data.serviceProviders);
          setApiRespFlag(true);
          setPagination({
            ...response._pagination,
            isFirst: Boolean(response._pagination.isFirst),
            isLast: Boolean(response._pagination.isLast),
          });
        }
      })
      .catch();
  }, [prevPageSize, pageNumber, type, refresh]);

  const paginationOnChange = (event: any) => {
    setPageNumber(event.detail);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    filtersLabel.forEach((item: any) => {
      item.isSelected = false;
    });
    window.addEventListener(
      CONSTANTS.AUI_CUSTOM_EVENTS.PAGINATION_CHANGE,
      paginationOnChange
    );
    return () =>
      window.removeEventListener(
        CONSTANTS.AUI_CUSTOM_EVENTS.PAGINATION_CHANGE,

        paginationOnChange
      );
  }, []);

  return (
    <ServiceProviderWrapper>
      <div className="container">
        <h1
          data-testid="test-heading"
          className="notifications pt-3 pb-3 d-block header-bottom"
        >
          Service Providers
        </h1>

        <div />
        {loading ? (
          <table
            className="aui-responsive-table aui-table-cols aui-table-loader"
            role="alert"
            aria-live="assertive"
            aria-label="Table is Loading"
          >
            <thead className="d-none">
              <tr>
                <th className="sr-only">Loading...</th>
              </tr>
            </thead>
            <tbody className="d-none">
              <tr>
                <td className="sr-only">Loading...</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <>
            <aui-table type="status" loader={loading} loadertype="content">
              <table className="aui-responsive-status-table">
                {serviceProviders.length !== 0 ? (
                  <thead>
                    <tr>
                      {tableHeaderNames?.map((colHeader) => (
                        <th key={colHeader.id} scope="col">
                          <div className="aui-th">{colHeader.name}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                ) : null}

                <tbody>
                  {serviceProviders?.map((serviceProvider: any) => (
                    <tr
                      className="aui-table-status-normal"
                      key={serviceProvider.id}
                    >
                      <td data-title="Service Providers">
                        <div className="aui-td">
                          <p className="mb-0 name-col">
                            {serviceProvider.name}
                          </p>
                        </div>
                      </td>
                      <td data-title="Type">
                        <div className="aui-td">
                          <ul className="d-flex type-col p-0 m-0">
                            <li className="type-col disabled-icon">
                              {notificationTypebasedOnId(
                                serviceProvider.notificationTypeId
                              )}
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </aui-table>
            <div className="row justify-content-center filterhead">
              <div className="col-sm-5 mr-auto page-number filterHeaderChildElement filterheadchild">
                <PaginationSettings
                  setPageSize={setPageSize}
                  pageSize={pageSize}
                  totalCounts={pagination.totalCount}
                  setPageNumber={setPageNumber}
                />
              </div>
              <div className=" mr-2 mr-xs-1 ">
                {/* AUI v2 Pagination Component */}
                <aui-pagination
                  inputdata={passAuiObject(pagination)}
                  alignment="end"
                />
              </div>
            </div>
          </>
        )}
        {apiRespFlag && serviceProviders.length === 0 && !loading ? (
          <NoDataComp DataList={serviceProviders} />
        ) : (
          ""
        )}
      </div>
    </ServiceProviderWrapper>
  );
};

export default ServiceProvider;
