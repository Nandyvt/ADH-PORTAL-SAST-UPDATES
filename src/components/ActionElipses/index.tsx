import React, { useState } from "react";
import ActionElipsesWrapperStyle from "./styled";

interface IActionElipses {
  elipsesActions: Array<Object>;
}

const ActionElipses: React.FunctionComponent<IActionElipses> = ({
  elipsesActions,
}) => {
  const [togglePopoverAria, setTogglePopoverAria] = useState<boolean>(false);
  const [toolTipToggler, setToolTipToggler] = useState(false);

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
    Array.from(document.querySelectorAll(".btnEllipses")).forEach((el) => {
      if (e.currentTarget === el) {
        if (el.classList.contains("rotate-90")) {
          el.classList.remove("rotate-90");
          el.classList.toggle("rotate-90-anti");
        } else if (el.classList.contains("rotate-90-anti")) {
          el.classList.remove("rotate-90-anti");
          el.classList.toggle("rotate-90");
        } else {
          el.classList.toggle("rotate-90");
        }
      } else {
        el.classList.remove("rotate-90");
      }
    });
  };

  return (
    <ActionElipsesWrapperStyle>
      <div className="text-right pr-0 tooltip-role">
        <button
          type="button"
          className="noBtnStyle btnEllipses rotate-90-anti"
          aria-label="View more"
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
          {/* <i className="aha-icon-meat-balls" /> */}
          <aui-icon icon="ellipsis" block={false} />
        </button>

        <span className="tooltiptext">View More</span>

        <div className="d-none connection-td-wrapper">
          <div className="popoverWrapper">
            {elipsesActions.map((item: any) => {
              return (
                <button
                  key={item.name}
                  type="button"
                  className="noBtnStyle mb-3"
                  onClick={item.onClickCalBackFun}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </ActionElipsesWrapperStyle>
  );
};

export default ActionElipses;
