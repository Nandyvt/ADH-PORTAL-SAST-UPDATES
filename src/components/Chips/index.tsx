import React from "react";
import ChipsStyled from "./styled";

const Chips = ({ chipData, setClearChipData }: any) => {
  return chipData?.value ? (
    <ChipsStyled>
      <span className="label">{chipData.label}:&nbsp;</span>
      <span className="label-value">{chipData.value}</span>
      <button
        type="button"
        className="closeIcon"
        aria-label="Close"
        onClick={() =>
          setClearChipData({
            label: chipData.label,
            value: chipData.value,
            id: chipData.id,
          })
        }
      >
        <aui-icon icon="closeIcon" svgwidth="9" svgheight="9" />
      </button>
    </ChipsStyled>
  ) : null;
};

export default Chips;
