import React from "react";
import { useQuery } from "react-query";
import { GetConsumerDetailsByID } from "services/api/nats.api";
import { formatDate } from "common/utils";
import { NatsConsumerDetails } from "pages/Configuration/models";
import { useNavigate } from "react-router-dom";
import DetailsTabComp from "../DetailsTabComp";
import { ConsumerDetailsStyles } from "./styled";

interface IConsumerDetailsProps {
  consumerID: string;
}
const ViewConsumerDetails = (props: IConsumerDetailsProps) => {
  const navigate = useNavigate();

  /* API Call */
  const { data: consumerDetailsAPIData } = useQuery(
    "consumer-details-by-id",
    () => GetConsumerDetailsByID(Number(props.consumerID)),
    {
      select: (data): NatsConsumerDetails => {
        return data?.data?.natsConsumer;
      },
    }
  );

  const generateSubscriptionsTags = () => {
    return (
      <>
        {consumerDetailsAPIData?.natsConsumerConfiguration.subscriptions?.map(
          (subscription, index) => (
            <span key={`${subscription.source}-${subscription.entity}`}>
              {subscription.source} - {subscription.entity}
              {index <
                consumerDetailsAPIData?.natsConsumerConfiguration?.subscriptions
                  .length -
                  1 && ", "}
            </span>
          )
        )}
      </>
    );
  };
  const consumerDetailsTabData = [
    {
      id: "consumerName",
      label: "Consumer Name",
      value: consumerDetailsAPIData?.name,
    },
    {
      id: "clientName",
      label: "Client Name",
      value: consumerDetailsAPIData?.clientName ?? "-",
    },
    {
      id: "clientCode",
      label: "Client Code",
      value: consumerDetailsAPIData?.clientCode ?? "-",
    },
    {
      id: "type",
      label: "Type",
      value: consumerDetailsAPIData?.natsConsumerConfiguration.type ?? "-",
    },
    {
      id: "createdOn",
      label: "Created On",
      value:
        formatDate(consumerDetailsAPIData?.createdAt ?? "", "time-minute") ??
        "-",
    },
    {
      id: "description",
      label: "Description",
      value: consumerDetailsAPIData?.description ?? "-",
    },
    {
      id: "subscriptions",
      label: "Subscriptions",
      value: consumerDetailsAPIData?.natsConsumerConfiguration?.subscriptions
        ? generateSubscriptionsTags()
        : "-",
    },
  ];

  const navigateToConsumerListingView = () => {
    // Get the current search parameters
    const currentUrlParams = new URLSearchParams(window.location.search);

    // Remove the 'view' and 'consumerid' parameters
    currentUrlParams.delete("view");
    currentUrlParams.delete("consumerid");

    // set tab to consumer listing
    currentUrlParams.set("tab", "consumers-listing");

    // Construct the new URL
    const newUrl = `${window.location.pathname}?${currentUrlParams.toString()}`;

    // Push the new URL to history without reloading the page
    navigate(newUrl);
  };

  const backBtnClickHandler = () => {
    navigateToConsumerListingView();
  };

  return (
    <ConsumerDetailsStyles>
      <DetailsTabComp
        detailsData={consumerDetailsTabData}
        detailsJSONdata={
          consumerDetailsAPIData?.natsConsumerConfiguration?.consumer_config
        }
        backBtnClickHandler={backBtnClickHandler}
      />
    </ConsumerDetailsStyles>
  );
};

export default ViewConsumerDetails;
