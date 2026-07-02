/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useEffect, useRef } from "react";
import "./styled-datepicker.css";
import "./styled-datepicker-custom.scss";
import DateRangePicker from "rsuite/esm/DateRangePicker";
import {
  getCurrentDateTime,
  getCustomDateRange,
  setHoursMinutesToZero,
} from "common/utils";

const CustDateRangePicker = ({
  className,
  prefillDateRange = [getCustomDateRange(7, true), new Date()],
  setSelectedDateRange,
}: any) => {
  const { afterToday, allowedMaxDays, combine, allowedRange } = DateRangePicker;

  const dateRef: any = useRef({});

  useEffect(() => {
    // Accessibility fix
    document
      .querySelector<any>(".rs-picker-toggle-placeholder")
      ?.removeAttribute("aria-placeholder");

    document
      .querySelector<any>(".rs-picker-toggle-caret")
      ?.setAttribute("aria-label", "datepicker button");
  }, []);

  useEffect(() => {
    const dateTextContent = dateRef?.current?.target?.textContent;
    if (dateTextContent && dateTextContent !== "Select Date Range") {
      const [startDateRangeString, endDateRangeString] =
        dateTextContent.split(" ~ ");
      const startDateRange = new Date(
        setHoursMinutesToZero(new Date(startDateRangeString))
      ).toISOString();

      const endDateRange = new Date(
        getCurrentDateTime(endDateRangeString)
      ).toISOString();

      setSelectedDateRange({ startDateRange, endDateRange });
    }
  }, []);

  return (
    <>
      <label
        className="mb-0 date-range-label"
        htmlFor="datetimerangepicker-input"
      >
        Date Range
      </label>
      <DateRangePicker
        aria-label="Select Date Range"
        ref={dateRef}
        defaultValue={prefillDateRange}
        id="datetimerangepicker-input"
        appearance="default"
        block
        placeholder="Select Date Range"
        format="yyyy-MM-dd"
        caretAs="button"
        /* showMeridian */
        data-testid="daterange"
        className={className ?? ""}
        style={{ color: "Red", display: "block" }}
        onChange={useCallback((dates: any) => {
          if (dates !== null) {
            /* Converting to ISO time from local time which user selects in date range picker 
                Start date - user will select from calendar
                Start time : reset to midnight 12 of that selected date
                End date - user will select from calendar
                End time - current time during selection
                */
            const startDateRange = new Date(
              setHoursMinutesToZero(dates[0])
            ).toISOString();

            let endDateRange;
            // if end date is today then take current time with date
            if (dates[1].getTime() === new Date().getTime()) {
              endDateRange = new Date(
                dates[1].setMilliseconds(0)
              ).toISOString();
            } else {
              // if not today then set the time to 23:59:59 for end date
              dates[1].setHours(23);
              dates[1].setMinutes(59);
              dates[1].setSeconds(59);
              dates[1].setMilliseconds(0);
              endDateRange = new Date(dates[1]).toISOString();
            }

            setSelectedDateRange({ startDateRange, endDateRange });
          }
        }, [])}
        onClean={() => {
          setSelectedDateRange({ startDateRange: "", endDateRange: "" });
        }}
        onOpen={() => {
          /* Accessibility fix */
          document
            .querySelector<any>(".rs-picker-daterange-menu.rs-picker-menu")
            ?.setAttribute("aria-label", "Datepicker Dialog");
        }}
        /* disabled={props.disabled ?? false}
      defaultValue={props.defaultValue || []} */
        /* shouldDisableDate={afterToday && afterToday()} */
        shouldDisableDate={
          combine &&
          allowedMaxDays &&
          afterToday &&
          allowedRange &&
          combine(
            allowedRange(getCustomDateRange(30, true), new Date()),
            afterToday()
          )
        }
        editable={false}
      />
    </>
  );
};

export default CustDateRangePicker;
