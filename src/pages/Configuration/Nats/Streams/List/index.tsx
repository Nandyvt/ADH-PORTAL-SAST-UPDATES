import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { ListNatsStreams } from "services/api/nats.api";
import TableComp from "components/Table";
import ShowNumberOfRecordsNatsComp from "components/ShowNumberOfRecordsNats";
import { passAuiObject } from "common/utils";
import CONSTANTS from "common/constants";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import store from "app/store";
import {
  IStreamListFilter,
  setClearFilter as clearStreamFilters,
  setPageSize,
  setSearchFilter,
  setStreamPageNumber,
} from "pages/Configuration/common/StreamList.slice";
import { NatsStreamsStyled } from "./styled";
import StreamListFilters from "./Filters";

interface ITablecolumnHeaders {
  name?: string;
  id?: number;
  sortable?: boolean;
  clsName?: string;
  filterSupport?: boolean;
  filterCode?: string;
  referenceCol?: any;
  isAnchor?: boolean;
  anchorRedirect?: string;
}

interface IqueryParamsAPI {
  pageNumber?: number;
  pageSize?: number;
  Search?: string;
}

const NatsStreamsList: React.FC = () => {
  const navigate = useNavigate();

  /* Loading default values from store */
  const defaultQueryParamsAPIStore: IStreamListFilter = useSelector(
    (state: any) => state.streamList.streamListFilters
  );

  const searchFieldRef = useRef<HTMLAuiInputElement>(null);

  const [popoverSearchErrorMsg, setPopoverSearchErrorMsg] =
    useState<boolean>(false);

  // Customize Table Columns
  const [columnHeaders] = useState<ITablecolumnHeaders[]>([
    {
      name: "Stream Name",
      id: 1,
      clsName: "stream-name-header",
      filterCode: "name",
      isAnchor: true,
      anchorRedirect: CONSTANTS.PAGE_ROUTES.NATS_STREAM_LISTING,
    },
    {
      name: "Client",
      id: 2,
      clsName: "client-header",
      filterCode: "client_name_transform",
      referenceCol: {
        clientName: "client_name",
        clientCode: "client_code",
      },
    },
    {
      name: "Subject",
      id: 3,
      clsName: "subject-header",
      filterCode: "Subject",
    },
    {
      name: "Action",
      id: 4,
      clsName: "action-header",
      filterCode: "action-elipses",
    },
  ]);

  const {
    data: streams,
    refetch,
    isFetching: loading,
  } = useQuery(
    "stream-list",
    () => ListNatsStreams(defaultQueryParamsAPIStore),
    {
      select: (data) => {
        return {
          streamsListData: data?.data?.streams,
          paginationData: {
            ...data._pagination,
            isFirst: Boolean(data._pagination.isFirst),
            isLast: Boolean(data._pagination.isLast),
          },
        };
      },
      onSuccess: (data: any) => {
        if (
          data?.streamsListData?.length === 0 &&
          searchFieldRef?.current?.value
        ) {
          setPopoverSearchErrorMsg(true);

          setTimeout(() => {
            setPopoverSearchErrorMsg(false);
          }, 6000);
        }
      },
    }
  );

  const { streamsListData, paginationData } = streams || {};

  const handleChangeNumOfRecords = (pageSizeSelected: number) => {
    /* dispatch action to store */
    store.dispatch(setPageSize(pageSizeSelected));
  };

  const handleSearchFieldChange = async (event: any) => {
    const SearchFieldvalue = event.detail;

    /* dispatch action to store */
    store.dispatch(setSearchFilter(SearchFieldvalue));
  };

  const handleChangePagination = (event: any) => {
    /* dispatch action to store */
    store.dispatch(setStreamPageNumber(event.detail));
  };

  useEffect(() => {
    refetch();
  }, [
    defaultQueryParamsAPIStore.pageSize,
    defaultQueryParamsAPIStore.pageNumber,
    defaultQueryParamsAPIStore.Search,
  ]);

  useEffect(() => {
    window.addEventListener(
      CONSTANTS.AUI_CUSTOM_EVENTS.PAGINATION_CHANGE,
      handleChangePagination
    );
    return () =>
      /* cleanup */
      window.removeEventListener(
        CONSTANTS.AUI_CUSTOM_EVENTS.PAGINATION_CHANGE,
        handleChangePagination
      );
  }, []);

  const handleClearAllFilters = () => {
    if (searchFieldRef?.current) {
      searchFieldRef.current.value = "";
    }

    // Resetting Query Params
    store.dispatch(clearStreamFilters());
  };

  return (
    <NatsStreamsStyled>
      {/* Heading Comp Code */}
      <div className="header">
        <h1>NATS Streams</h1>
        <aui-button
          id="add-nats-streams-btn"
          buttontitle={CONSTANTS.BREADCRUMB_HEADING.ADD_NATS_STREAM}
          buttonclass="aui-modal-launch"
          className="aui-modal-launch"
          variant="link-style-arrow"
          onClick={(e: React.MouseEvent<HTMLAuiButtonElement>) => {
            e.preventDefault();
            handleClearAllFilters();
            navigate(CONSTANTS.PAGE_ROUTES.NATS_STREAM_CREATE);
          }}
        />
      </div>

      {/* Search Filter */}
      <div className="row mb-5">
        <div className="col-md-6 col-sm-6 col-lg-6">
          <StreamListFilters
            searchError={popoverSearchErrorMsg}
            onChangeSearchInput={handleSearchFieldChange}
            searchFieldRef={searchFieldRef}
            searchFieldVal={defaultQueryParamsAPIStore.Search ?? ""}
          />
        </div>
      </div>

      {/* Table Component */}
      <div className="container p-lg-0">
        <TableComp
          theadData={columnHeaders}
          tbodyData={streamsListData}
          isTableLoading={loading}
          clearAllFilterFunc={handleClearAllFilters}
          tableName="Nats Streams"
        />
      </div>

      {/* Show Records and Pagination Section */}
      <div className="heading-lbl-wrapper mt-4 pagination-sec d-flex flex-wrap justify-content-between">
        {streamsListData?.length > 0 && (
          <ShowNumberOfRecordsNatsComp
            totalCount={paginationData?.totalCount}
            onChangeFunc={handleChangeNumOfRecords}
          />
        )}

        {/* AUI v2 Pagination Component */}
        {streamsListData?.length > 0 && !loading && (
          <div className="col-8 pr-0">
            <aui-pagination
              inputdata={passAuiObject(paginationData)}
              alignment="end"
            />
          </div>
        )}
      </div>

      {/* Modal popup code */}
      {/* <NatsStreamsAdd
        setShowModal={setShowModal}
        showModal={showModal}
        setRefreshList={setRefreshList}
        refreshList={refreshList}
      /> */}
    </NatsStreamsStyled>
  );
};

export default NatsStreamsList;
