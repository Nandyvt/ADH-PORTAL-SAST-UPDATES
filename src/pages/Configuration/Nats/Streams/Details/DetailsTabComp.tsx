import { makeContentEditableFalse } from "common/utils";
import JsonEditor from "components/JsonEditor";
import { BorderBottomComp } from "pages/Configuration/utilComp";
import React, { useEffect } from "react";
import { DetailsCompStyles } from "./styled";

interface Idetails {
  id: string;
  label: string;
  value: any;
}
interface IDetailsTabProps {
  detailsData: Idetails[];
  detailsJSONdata: any;
  backBtnClickHandler: () => void;
}

const DetailsTabComp = (props: IDetailsTabProps) => {
  useEffect(() => {
    makeContentEditableFalse();
  }, []);

  return (
    <DetailsCompStyles>
      <div className="details-container-bkp">
        {/* Details Section */}
        <div className="details">
          {props?.detailsData?.map((detail: Idetails) => (
            <div key={detail.id} className="detail-item">
              <strong>{detail.label}</strong>
              <span id={detail.id}>{detail.value}</span>
            </div>
          ))}
        </div>

        <BorderBottomComp />

        {/* JSON view component */}
        <div className="mt-5 d-block">
          <div className="editor-title-wrapper">
            <p className="editor-title m-0">Configurations</p>
          </div>
          <div
            id="editor-div"
            className="editor-wrapper"
            style={{ pointerEvents: "none" }}
            tabIndex={-1}
          >
            <JsonEditor
              id="json-input-view-wrapper"
              placeholderProp={props.detailsJSONdata ?? {}}
              editModeEnabled={false}
            />
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-5 mb-4">
          <aui-button
            variant="secondary"
            size="small"
            onClick={props.backBtnClickHandler}
            buttontitle="Back"
            buttonid="back-button"
          />
        </div>
      </div>
    </DetailsCompStyles>
  );
};

export default DetailsTabComp;
