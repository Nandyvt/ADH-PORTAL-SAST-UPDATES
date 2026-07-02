/* eslint-disable react/require-default-props */
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import TableComp from "components/Table";
import ShowNumberOfRecordsNatsComp from "components/ShowNumberOfRecordsNats";
import { passAuiObject } from "common/utils";
import store from "app/store";
import {
  setClearFilter,
  setPageNumber,
  setPageSize,
} from "pages/Configuration/common/Consumers.slice";
import { setClearFilter as clearStreamFilters } from "pages/Configuration/common/StreamList.slice";
import UsePagination from "pages/Configuration/common/UsePaginationHook";
import { ListNatsConsumers } from "services/api/nats.api";
import CONSTANTS from "common/constants";
import { useNavigate, useLocation } from "react-router-dom";
import { modifyURLOnTabChange } from "pages/Configuration/utils";
import { NatsConsumerListingStyles } from "./styled";
import ConsumerTabFilterComp from "./ConsumerTabFilterComp";
import CreateConsumerComp from "./CreateConsumer";
import ViewConsumerDetails from "./ViewConsumer";

interface ITablecolumnHeaders {
  name?: string;
  id?: number;
  clsName?: string;
  filterCode?: string;
  referenceCol?: any;
  isElipsesPopoverDisabled?: boolean;
  isAnchor?: boolean;
  anchorRedirect?: string;
}

interface IqueryParamsAPI {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
  type?: string;
  clientCode?: string;
  streamId?: number;
}

interface IConsumerListProps {
  streamID: any;
  filterCompRef?: any;
}

const useQueryURL = () => {
  return new URLSearchParams(useLocation().search);
};

const ConsumerListingComp = (props: IConsumerListProps) => {
  const [isNoDataStatus, setIsNoDataStatus] = useState("INITIAL"); // Track if it's the initial load
  const navigate = useNavigate();
  const consumerListStoreData: IqueryParamsAPI = useSelector((state: any) => {
    return state?.consumerList?.consumerTabFilters;
  });

  const consumerListStoreDataWithStreamID = {
    ...consumerListStoreData,
    streamId: props.streamID,
  };

  UsePagination(setPageNumber);

  const searchFieldRef = useRef<HTMLAuiInputElement>(null);

  const [, setPopoverSearchErrorMsg] = useState<boolean>(false);

  // Customize Table Columns
  const [columnHeaders] = useState<ITablecolumnHeaders[]>([
    {
      name: "Consumer Name",
      id: 1,
      clsName: "consumer-name-header",
      filterCode: "name",
      isAnchor: true,
      /* anchorRedirect: CONSTANTS.PAGE_ROUTES.NATS_STREAM_LISTING, */
      anchorRedirect: window.location.pathname,
    },
    {
      name: "Client",
      id: 2,
      clsName: "client-header",
      filterCode: "client_name_transform",
      referenceCol: {
        clientName: "clientName",
        clientCode: "clientCode",
      },
    },
    {
      name: "Type",
      id: 3,
      clsName: "type-header",
      filterCode: "natsConsumerConfiguration.type",
    },
    {
      name: "Subscriptions",
      id: 4,
      clsName: "subscription-header",
      filterCode: "subscription_transform",
      referenceCol: "natsConsumerConfiguration.subscriptions",
    },
    {
      name: "Action",
      id: 5,
      clsName: "action-header",
      filterCode: "action-elipses",
      isElipsesPopoverDisabled: true,
    },
  ]);

  /* API Call  */
  const {
    data: consumers,
    refetch,
    isFetching: loading,
  } = useQuery(
    "stream-list",
    () => ListNatsConsumers(consumerListStoreDataWithStreamID),
    {
      select: (data) => {
        return {
          consumersListData: data?.data?.natsConsumers,
          paginationData: {
            ...data._pagination,
            isFirst: Boolean(data._pagination.isFirst),
            isLast: Boolean(data._pagination.isLast),
          },
        };
      },
      onSuccess: (data: any) => {
        if (
          data?.consumersListData?.length === 0 &&
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

  const [reset, setReset] = useState(false);
  const clearFilters = () => {
    props.filterCompRef?.current?.clearFilters();
    store.dispatch(setClearFilter());
    setReset(!reset);
    setIsNoDataStatus("INITIAL");
  };

  /* Refetch table records on change of filters ,num of records and pagination */
  useEffect(() => {
    const isAnyFilterApplied = Boolean(
      consumerListStoreData.search ||
        consumerListStoreData.type ||
        consumerListStoreData.clientCode
    );
    isAnyFilterApplied && setIsNoDataStatus("PARAMS_CHANGE");
    refetch();
  }, [
    consumerListStoreData.pageSize,
    consumerListStoreData.pageNumber,
    consumerListStoreData.search,
    consumerListStoreData.type,
    consumerListStoreData.clientCode,
  ]);

  const { consumersListData, paginationData } = consumers || {};

  const handleChangeNumOfRecords = (pageSizeSelected: number) => {
    /* Push to store with number of records data */
    store.dispatch(setPageSize(pageSizeSelected));
  };

  const query = useQueryURL();
  const viewParmURL = query.get("view");
  const consumerID = query.get("consumerid") ?? "";

  const [changeCompOnView, setChangeCompOnView] = useState(viewParmURL ?? "");

  useEffect(() => {
    refetch();
    store.dispatch(setPageNumber(1));
  }, [changeCompOnView]);

  // Update component when URL changes
  useEffect(() => {
    const urlParams = new URLSearchParams(window?.location?.search);
    const viewParam = urlParams.get("view");
    const tabParam = urlParams.get("tab");

    // Update state if viewParam exists in the URL
    if (viewParam) {
      setChangeCompOnView(viewParam);
    } else if (!viewParam && tabParam === "consumers-listing") {
      setChangeCompOnView("consumer-listing");
    }
  }, [window?.location?.search]);

  if (changeCompOnView === "create-consumer") {
    return <CreateConsumerComp setChangeCompOnView={setChangeCompOnView} />;
  }
  if (changeCompOnView === "consumer-details") {
    return <ViewConsumerDetails consumerID={consumerID} />;
  }

  const checkForNonInitialStateOrParamSelected = () => {
    let showConsumerFilters = true;

    if (isNoDataStatus === "INITIAL" && consumersListData?.length === 0) {
      showConsumerFilters = false;
    }
    return showConsumerFilters;
  };

  const navigateToAddNatsConsumer = () => {
    modifyURLOnTabChange(
      { view: "create-consumer" },
      setChangeCompOnView,
      navigate
    );
  };

  const noDataCompElement = {
    noDataHeading:
      !checkForNonInitialStateOrParamSelected() &&
      CONSTANTS.CONSUMER_LIST_NO_DATA_HEADING,
    noDataMarkup: !checkForNonInitialStateOrParamSelected() && (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <button
          aria-label="Add NATS Consumer"
          data-testid="clear-filters-btn"
          type="button"
          className="reload-btn"
          onClick={navigateToAddNatsConsumer}
          onKeyUp={(e) => {
            if (e.key === "Enter" || e.key === "Spacebar") {
              navigateToAddNatsConsumer();
            }
          }}
        >
          {CONSTANTS.BREADCRUMB_HEADING.ADD_NATS_CONSUMER}
        </button>
      </div>
    ),
  };

  return (
    <NatsConsumerListingStyles>
      {checkForNonInitialStateOrParamSelected() && (
        <>
          <div className="header d-flex justify-content-end">
            <aui-button
              id="add-nats-consumers-btn"
              buttontitle={CONSTANTS.BREADCRUMB_HEADING.ADD_NATS_CONSUMER}
              buttonclass="aui-modal-launch"
              className="aui-modal-launch"
              variant="link-style-arrow"
              onClick={navigateToAddNatsConsumer}
            />
          </div>

          {/* If params are applied and no results found then show the filters */}
          <ConsumerTabFilterComp
            ref={props.filterCompRef}
            clearAllFilterFunc={clearFilters}
          />
        </>
      )}

      <div className="container p-lg-0">
        <TableComp
          theadData={columnHeaders}
          tbodyData={consumersListData}
          isTableLoading={loading}
          clearAllFilterFunc={clearFilters}
          tableName="NATS Consumers"
          noDataCompElement={noDataCompElement}
          setChangeCompOnView={setChangeCompOnView}
        />
      </div>

      <div className="heading-lbl-wrapper mt-4 pagination-sec d-flex flex-wrap justify-content-between">
        {consumersListData?.length > 0 && (
          <ShowNumberOfRecordsNatsComp
            totalCount={paginationData?.totalCount}
            onChangeFunc={handleChangeNumOfRecords}
            reset={reset}
          />
        )}

        {consumersListData?.length > 0 && !loading && (
          <div className="col-8 pr-0">
            <aui-pagination
              inputdata={passAuiObject(paginationData)}
              alignment="end"
            />
          </div>
        )}
      </div>
    </NatsConsumerListingStyles>
  );
};

export default ConsumerListingComp;
