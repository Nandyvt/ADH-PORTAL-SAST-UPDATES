import React, { useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { GetStreamDetailsByID } from "services/api/nats.api";
import TabsComp from "components/Tabs";
import { formatDate } from "common/utils";
import store from "app/store";
import {
  setReserveStreamListFilterState,
  setClearFilter as clearStreamFilters,
} from "pages/Configuration/common/StreamList.slice";
import { useNavigate, useParams } from "react-router-dom";
import CONSTANTS from "common/constants";
import { setStreamDetailsData } from "pages/Configuration/common/StreamDetails.slice";
import { setClearFilter } from "pages/Configuration/common/Consumers.slice";
import StreamDetailsStyles from "./styled";
import DetailsTabComp from "./DetailsTabComp";
import ConsumerListingComp from "./ConsumerTabComp";
import NATSHeadingComp from "./NATSHeadingComp";

interface IStreamDetailsProps {}

interface StreamConfig {
  name: string;
  description: string;
  subjects: string[];
  retention: string;
  max_consumers: number;
  max_msgs: number;
  max_bytes: number;
  discard: string;
  max_age: number;
  max_msgs_per_subject: number;
  storage: string;
  num_replicas: number;
  duplicate_window: number;
  compression: string;
  allow_direct: boolean;
  mirror_direct: boolean;
  consumer_limits: Record<string, unknown>;
}

interface IStream {
  data: any;
  ID: number;
  name: string;
  CreatedAt: string;
  UpdatedAt: string;
  client_id: number;
  Description: string;
  Subject: string;
  stream_config: StreamConfig;
  client_name: string;
  client_code: string;
}

const StreamDetailsComp = (props: IStreamDetailsProps) => {
  const navigate = useNavigate();
  // Use the useParams hook compatible with react-router-dom v6
  const { id } = useParams<{ id: any }>();
  const { data: streamsDetailsData, isFetching: loading } = useQuery(
    "stream-details-by-id",
    () => GetStreamDetailsByID(id),
    {
      select: (data): IStream => {
        return data?.data?.stream;
      },
    }
  );

  const filterCompRef = useRef<any>(null);

  useEffect(() => {
    if (streamsDetailsData)
      store.dispatch(setStreamDetailsData(streamsDetailsData));
  }, [streamsDetailsData]);

  // Update component when URL changes
  useEffect(() => {
    const urlParams = new URLSearchParams(window?.location?.search);
    const viewParam = urlParams.get("view");
    const tabParam = urlParams.get("tab");

    const clearFilterForUrlsPaths = ["create-consumer"];
    const shouldClearFilters = clearFilterForUrlsPaths?.includes(
      viewParam ?? ""
    );

    if (tabParam === "consumers-listing" && shouldClearFilters) {
      filterCompRef?.current?.clearFilters();
      store.dispatch(setClearFilter());
    }

    if (tabParam === "consumers-listing") {
      store.dispatch(clearStreamFilters());
    }
  }, [window?.location?.search]);

  const streamDetailsTabData = [
    { id: "streamName", label: "Stream Name", value: streamsDetailsData?.name },
    {
      id: "clientName",
      label: "Client Name",
      value: streamsDetailsData?.client_name ?? "-",
    },
    {
      id: "clientCode",
      label: "Client Code",
      value: streamsDetailsData?.client_code ?? "-",
    },
    {
      id: "clientId",
      label: "Client Id",
      value: streamsDetailsData?.client_id ?? "-",
    },
    {
      id: "subject",
      label: "Subject",
      value: streamsDetailsData?.Subject ?? "-",
    },
    {
      id: "retention",
      label: "Retention",
      value: streamsDetailsData?.stream_config?.retention ?? "-",
    },
    {
      id: "createdAt",
      label: "Created At",
      value:
        formatDate(streamsDetailsData?.CreatedAt ?? "", "time-minute") ?? "-",
    },
    {
      id: "description",
      label: "Description",
      value: streamsDetailsData?.Description ?? "-",
    },
  ];

  /* Render only when tab activates */
  const searchParams = new URLSearchParams(window.location.search);
  const isStreamDetails = searchParams.get("tab") === "stream-details";
  const isConsumer = searchParams.get("tab") === "consumers-listing";

  const activeTab = isStreamDetails ? "details-tab" : "consumers-tab";

  /* if active tab is details-tab then remove applied filters in consumers listing */
  if (activeTab === "details-tab") {
    filterCompRef?.current?.clearFilters();
    store.dispatch(setClearFilter());
  }

  const tabViewParam = searchParams.get("view");

  const backBtnClickHandler = () => {
    store.dispatch(setReserveStreamListFilterState(true));
    navigate(CONSTANTS.PAGE_ROUTES.NATS_STREAM_LISTING);
  };

  const TabsConfigData = [
    {
      heading: "Stream Details",
      contentComp: isStreamDetails && (
        <DetailsTabComp
          detailsData={streamDetailsTabData}
          detailsJSONdata={streamsDetailsData?.stream_config}
          backBtnClickHandler={backBtnClickHandler}
        />
      ),
      tabid: "details-tab",
      urlTabName: "stream-details",
    },
    {
      heading: !tabViewParam ? "Consumers" : "Consumer",
      contentComp: isConsumer && <ConsumerListingComp streamID={id} />,
      tabid: "consumers-tab",
      urlTabName: "consumers-listing",
    },
  ];

  return (
    <StreamDetailsStyles>
      {/* Heading */}
      <NATSHeadingComp
        ariaLabel="View Stream"
        dataTestID="view-stream"
        headingLabel="Stream"
        viewPageLabelAffix={streamsDetailsData?.name}
        loading={loading}
      />

      {/* Tabs Component */}
      <TabsComp tabs={TabsConfigData} activeTab={activeTab} />
    </StreamDetailsStyles>
  );
};

export default StreamDetailsComp;
