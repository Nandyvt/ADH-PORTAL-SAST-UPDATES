import { IEntity } from "pages/Configuration/models";
import React from "react";
import { StyledCard } from "./styled";

export const EntitiesCard: React.FC<IEntity> = ({
  id,
  name,
  code,
  type,
  version,
  json_schema,
}) => {
  return (
    <StyledCard className="col-lg-3 col-sm-6 col-md-6">
      <div className="card card-body">
        <p className="entity-name" title={name}>
          {name}
        </p>
        <p className="version">Version: {version}</p>
        <div className="d-flex justify-content-end">
          <aui-button
            buttonid={`view-entity-${id}`}
            buttontitle="View Entity"
            variant="link-style-arrow"
          />
        </div>
      </div>
    </StyledCard>
  );
};
