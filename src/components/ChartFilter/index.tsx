/* eslint-disable jsx-a11y/label-has-associated-control */
import { datediff, parseDate } from "common/utils";
import React, { FunctionComponent, useState, useRef } from "react";
import { ChartWrapper } from "./styled";

export interface FilterProps {
  defaultSelection: string;
  uniqueId: string;
  setSelectedDays: (days: number) => void;
  backgroundColor: string;
}

const ChartFilter: FunctionComponent<FilterProps> = ({
  defaultSelection,
  uniqueId,
  setSelectedDays,
  backgroundColor,
}) => {
  const ref: any = useRef(null);
  const iconRef: any = useRef(null);

  const getPastDate = (month: number) =>
    new Date(new Date().setMonth(new Date().getMonth() - month));

  const toDay = parseDate(new Date().toLocaleDateString("en-US"));
  const options = [
    {
      labelName: "3 Months",
      value: datediff(
        parseDate(getPastDate(3).toLocaleDateString("en-US")),
        toDay
      ),
    },
    {
      labelName: "2 Months",
      value: datediff(
        parseDate(getPastDate(2).toLocaleDateString("en-US")),
        toDay
      ),
    },
    {
      labelName: "1 Month",
      value: datediff(
        parseDate(getPastDate(1).toLocaleDateString("en-US")),
        toDay
      ),
    },
    {
      labelName: "2 Weeks",
      value: 2 * 7,
    },
    {
      labelName: "1 Week",
      value: 7,
    },
    {
      labelName: "2 Days",
      value: 2,
    },
    {
      labelName: "1 Day",
      value: 1,
    },
  ];
  const getDefaultSelectedValue = () => {
    return options.filter(
      (item) => item.labelName.toLowerCase() === defaultSelection.toLowerCase()
    )[0].value;
  };
  const [days, setDays] = useState<any>(getDefaultSelectedValue);
  const [dropdownName, setDropdownName] = useState<any>(defaultSelection);
  const [dropDownToggle, setDropDownToggle] = useState(true);

  const onChangeHandler = (event: any, name: any) => {
    const { value } = event.target;
    setDays(value);
    setSelectedDays(value);
    setDropdownName(name);
    document.querySelectorAll(".options").forEach((item: any) => {
      item.classList.remove("active");
    });
    event.currentTarget.classList.add("active");
  };
  const onClickHandler = (event: any) => {
    setDropDownToggle(true);
  };

  return (
    <ChartWrapper className="d-flex align-items-end">
      <div className="form-group m-0" ref={ref}>
        <label htmlFor={`${uniqueId}-line`} className="sr-only">
          Date Range Dropdown
        </label>

        <div className="position-relative">
          <button
            style={{ backgroundColor: `${backgroundColor}` }}
            className="text-truncate form-control dropdown-styles p-0"
            id={`${uniqueId}-line`}
            type="button"
            data-toggle="dropdown"
            aria-label="Date Selector"
            aria-haspopup="true"
            aria-expanded="false"
            onClick={onClickHandler}
          >
            <span>{dropdownName}</span>
            <i
              ref={iconRef}
              id={`#${uniqueId}`}
              className="aha-icon-arrow-down forModal"
            />
          </button>
          <ul
            className={`dropdown-menu dropdown-menu-right ${
              dropDownToggle ? "dropdown-open" : ""
            }`}
          >
            {options.map((item: any) => (
              <li key={`${item.labelName}uniqueId`}>
                <option
                  className={`options dropdown-item ${
                    item.value === days ? "active" : ""
                  }`}
                  key={item.value}
                  onClick={(e) => {
                    onChangeHandler(e, item.labelName);
                  }}
                  value={item.value}
                >
                  {item.labelName}
                </option>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ChartWrapper>
  );
};

export default ChartFilter;
