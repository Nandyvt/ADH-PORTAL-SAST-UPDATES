import CustDateRangePicker from "components/DateRangePicker";
import React from "react";
import { toggleDatePicker } from "pages/TransactionalLogs/utils";
import DateRangeWrapper from "./styled";

const MobileDateRangePicker = ({
  defaultDateRange,
  setSelectedDateRange,
}: any) => {
  return (
    <DateRangeWrapper className="position-relative text-box">
      <button
        className="noBtnStyle calendar-icon"
        aria-label="date range picker"
        type="button"
        onClick={() => {
          toggleDatePicker();
        }}
      >
        <aui-icon block={false} icon="daterange" svgwidth="20" svgheight="20" />
      </button>
      <CustDateRangePicker
        prefillDateRange={defaultDateRange}
        setSelectedDateRange={setSelectedDateRange}
        className="w-100 text-truncate form-control inputs"
      />
    </DateRangeWrapper>
  );
};

export default MobileDateRangePicker;
