import CustomTooltip from "components/CustomTooltip";
import { IStream } from "pages/Configuration/models";
import React, { useState } from "react";

const NatsStreamsCard: React.FC<IStream> = ({
  Name,
  Subject,
  consumer_name,
}) => {
  const [toolTipToggler, setToolTipToggler] = useState(false);
  const [togglePopoverAria, setTogglePopoverAria] = useState<boolean>(false);
  const togglePopver = (e: any) => {
    Array.from(document.querySelectorAll(".connection-td-wrapper")).forEach(
      (el) => {
        if (e.currentTarget?.nextSibling?.nextSibling !== el) {
          el.classList.remove("d-flex", "d-none");
          el.classList.add("d-none");
        }
      }
    );
    setTogglePopoverAria(!togglePopoverAria);
    e.currentTarget.nextSibling?.nextSibling?.classList.toggle("d-none");
  };

  const generatePopoverButtons = () => {
    return (
      <>
        <button
          type="button"
          className="noBtnStyle mb-3"
          onClick={async () => {}}
        >
          Edit
        </button>
        <button type="button" className="noBtnStyle mb-2" onClick={() => {}}>
          Delete
        </button>
      </>
    );
  };

  return (
    <div className="col-lg-3 col-sm-6 col-md-6 pr-0">
      <div className="card">
        <div className="d-flex justify-content-between">
          <h2 className="m-0">
            <span title={consumer_name} className="consumer-name">
              {consumer_name}
            </span>
          </h2>
          <div className="ml-2 text-right mb-1 pr-0 tooltip-role">
            <CustomTooltip tooltipid="stream-viewMore" content="View More">
              <>
                <button
                  type="button"
                  className="noBtnStyle btnEllipses"
                  aria-label={`View more for ${consumer_name}`}
                  aria-expanded={togglePopoverAria}
                  onClick={(e) => {
                    togglePopver(e);
                    setToolTipToggler(!toolTipToggler);
                  }}
                  onKeyUp={(e) => {
                    if (e.key === "Spacebar") {
                      togglePopver(e);
                    }
                  }}
                >
                  <i className="aha-icon-meat-balls" />
                </button>

                <div className="d-none connection-td-wrapper">
                  <div className="popoverWrapper">
                    {generatePopoverButtons()}
                  </div>
                </div>
              </>
            </CustomTooltip>
          </div>
        </div>
        <div className="card-body">
          <p className="stream-name">
            <span className="head">
              <span>Stream Name</span>
              <span>Subject</span>
            </span>
            <span className="head">
              <span>:</span>
              <span>:</span>
            </span>
            <span className="head">
              <span title={Name} className="name">
                {Name}
              </span>
              <span title={Subject} className="name">
                {Subject}
              </span>
            </span>
          </p>
          <div className="btn-view-config">
            <aui-button
              variant="link-style-arrow"
              buttontitle="View Configuration"
              buttonclass="view-config"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NatsStreamsCard;
