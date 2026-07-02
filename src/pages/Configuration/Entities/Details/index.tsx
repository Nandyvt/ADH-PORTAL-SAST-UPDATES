import React from "react";
import DetailsTabComp from "pages/Configuration/Nats/Streams/Details/DetailsTabComp";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { GetEntityDetailsByID } from "services/api/nats.api";
import CONSTANTS from "common/constants";
import NATSHeadingComp from "pages/Configuration/Nats/Streams/Details/NATSHeadingComp";
import { EntitiesDetailsWrapper } from "./styled";

interface IEntitiesDetailsProps {}

interface IJsonSchema {
  type: string;
  title: string;
  $schema: string;
  required: string[];
  properties: {
    source: {
      type: string;
    };
    changeType: {
      type: string;
    };
    entityName: {
      type: string;
    };
  };
}

interface IEntity {
  id: number;
  code: string;
  name: string;
  version: number;
  type: string;
  json_schema: IJsonSchema;
  sources: string[];
  createdAt: string;
  updatedAt: string;
}

const EntityDetails = (props: IEntitiesDetailsProps) => {
  const navigate = useNavigate();
  // Use the useParams hook compatible with react-router-dom v6
  const { id } = useParams<{ id: any }>();
  const { data: entityDetailsData, isFetching: loading } = useQuery(
    "entity-details-by-id",
    () => GetEntityDetailsByID(id),
    {
      select: (data): IEntity => {
        return data?.data?.entity;
      },
    }
  );

  const generateSourcesTags = () => {
    return entityDetailsData?.sources.map((sourceItem: string) => (
      <div key={`${sourceItem}`} className="d-inline-block tags-wrapper">
        <aui-tags
          crossicon={false}
          numberoftags={sourceItem}
          size="small"
          type="clients"
        />
      </div>
    ));
  };
  const entityDetailsPageElements = [
    { id: "name", label: "Name", value: entityDetailsData?.name },
    {
      id: "code",
      label: "Code",
      value: entityDetailsData?.code ?? "-",
    },
    {
      id: "sources",
      label: "Sources",
      value: generateSourcesTags() ?? "-",
    },
    {
      id: "version",
      label: "Version",
      value: entityDetailsData?.version ?? "-",
    },
  ];

  const backBtnClickHandler = () => {
    navigate(CONSTANTS.PAGE_ROUTES.NATS_ENTITIES_LISTING);
  };
  return (
    <EntitiesDetailsWrapper>
      {/* Heading */}
      <NATSHeadingComp
        ariaLabel="View Stream"
        dataTestID="view-stream"
        headingLabel="Entity"
        viewPageLabelAffix={entityDetailsData?.name}
        loading={loading}
      />

      <DetailsTabComp
        detailsData={entityDetailsPageElements}
        detailsJSONdata={entityDetailsData?.json_schema}
        backBtnClickHandler={backBtnClickHandler}
      />
    </EntitiesDetailsWrapper>
  );
};

export default EntityDetails;
