import React, { useEffect, useRef, useState } from "react";
import { applyStylesToShadowDomElement } from "common/utils";
import { IFilter, IFiltersProps, clearDatePickerVal } from "./utils";
import SearchByField from "./SearchByField";
import MobileDateRangePicker from "./DateRange";
import DynamicFiltersStyled from "./styled";

const DynamicFilters = ({
  filters,
  setClearAll,
  clearAll = false,
  onChangeHandler,
}: IFiltersProps) => {
  // state for input type filters
  const [inputFilters, setInputFilters] = useState<any>([]);
  const [searchByField, setSearchByField] = useState<any>();
  const [textAreaFilters, setTextAreaFilters] = useState<any>();

  const inputRef: any = useRef({});
  const dropdownRef: any = useRef({});
  const multiselectRef: any = useRef({});
  const textAreaRef: any = useRef({});

  const getSearchByFieldFilterValue = (
    searchText: any,
    selectedOption: any
  ) => {
    setSearchByField({
      searchText: searchText || "",
      selectedOption: selectedOption || "",
    });
  };

  // state for dropdown type filters
  const [dropdownFilters, setDropdownFilters] = useState<any>([]);
  const [dateRange, setDateRange] = useState<any>([]);

  // state for multiselect dropdown type filters
  const [multiSelectDropdownFilters, setMultiSelectDropdownFilters] =
    useState<any>([]);

  // on change filters data state
  const [filtersData, setFiltersData] = useState<any>([]);

  // state of onChnage Filter
  const [onChangeData, setOnChangeData] = useState<any>({});

  function generateInputType(props: any) {
    return (
      <div
        className={`${
          props.wrappergrid ? props.wrappergrid : "col-lg-4"
        } col-md-6 col-sm-12 col-12 margin-top-filter`}
        key={props.name}
      >
        {props.customUIElement ? props.customUIElement() : null}
        <aui-input
          ref={(ref: any) => {
            inputRef.current[props.id] = ref;
          }}
          {...props}
          inputid={`input-${props.name || ""}`.toLocaleLowerCase()}
        />
      </div>
    );
  }

  function generateDropdownType(props: any) {
    let filter: any = null;
    if (props.show === undefined || props.show) {
      filter = (
        <div
          className={`${
            props.wrappergrid ? props.wrappergrid : "col-lg-4"
          }  col-md-6 col-sm-12 col-12 margin-top-filter`}
          key={props?.name}
        >
          <aui-dropdown
            ref={(ref: any) => {
              dropdownRef.current[props.id] = ref;
            }}
            {...props}
            dropdownid={`dropdown-${props.id || ""}`}
          />
        </div>
      );
    }
    return filter;
  }

  function generateMultiSelectDropdownType(props: any) {
    let filter: any = null;
    if (props.show === undefined || props.show) {
      filter = (
        <div
          className="col-lg-4 col-md-6 col-sm-12 col-12 margin-top-filter"
          key={props.name}
        >
          <aui-multiselect
            ref={(ref: any) => {
              multiselectRef.current[props.id] = ref;
            }}
            {...props}
            multiselectid={`multiselect-${props.id || ""}`}
          />
        </div>
      );
    }
    return filter;
  }

  function generateDateRangeType(props: any) {
    return (
      <div
        className="margin-top-filter col-lg-4 col-md-6 col-sm-12"
        key={props.name}
      >
        <MobileDateRangePicker
          defaultDateRange={[
            ...props.defaultDateRange.map((item: any) => new Date(item)),
          ]}
          setSelectedDateRange={setDateRange}
        />
      </div>
    );
  }

  const generateSerachByType = (props: any) => (
    <div
      className="col-lg-4 col-md-6 col-sm-12 margin-top-filter"
      key={props?.name}
    >
      <SearchByField
        options={props.searchByOptions}
        getSearchByFieldFilterValue={getSearchByFieldFilterValue}
        clearAll={clearAll}
        searchFieldValue={props.searchFieldValue}
        searchType={props.searchType}
      />
    </div>
  );

  const generateTextAreaType = (props: any) => {
    return (
      <div
        className={`${
          props.wrappergrid ? props.wrappergrid : "col-lg-4"
        }  col-md-6 col-sm-12 margin-top-filter`}
        key={props?.name}
      >
        <aui-textarea
          ref={(ref: any) => {
            textAreaRef.current[props.id] = ref;
          }}
          id={props.id}
          textareaid={`textArea-${props.name || ""}`.toLocaleLowerCase()}
          label={props.label}
          placeholder={props.placeholder || "Enter Description"}
          labelgrid={props.labelgrid || "col-sm-3"}
          textareagrid={props.textareagrid || "col-sm-9"}
          minlength={props.minlength || 2}
          maxlength={props.maxlength || 100}
          enableautofocus={props.enableautofocus || false}
          direction={props.direction || "row"}
        />
      </div>
    );
  };

  function handleMultiSelectOnChange(event: any) {
    const { detail } = event;
    const filterType = event.target?.tagName?.toLowerCase();
    if (filterType === "aui-multiselect") {
      setOnChangeData({
        id: event.target.multiselectid,
        type: filterType,
        data: detail,
      });
    }
  }

  function onChange(event: any) {
    const { detail } = event;
    const filterType = event.target?.tagName?.toLowerCase();
    if (filterType === "aui-input") {
      setOnChangeData({
        id: event.target.inputid,
        type: filterType,
        data: detail ? [detail] : [],
      });
    }
    if (filterType === "aui-dropdown") {
      setOnChangeData({
        id: event.target.dropdownid,
        type: filterType,
        data: detail ? [detail] : [],
      });
    }
    if (filterType === "aui-textarea") {
      setOnChangeData({
        id: event.target.textareaid,
        type: filterType,
        data: detail ? [detail] : [],
      });
    }
  }

  useEffect(() => {
    if (Object.prototype.hasOwnProperty.call(onChangeData, "type")) {
      setFiltersData((prev: any) => {
        return [
          ...prev.filter(
            (item: any) => item.id !== onChangeData.id && item.data.length > 0
          ),
          {
            type: onChangeData.type,
            id: onChangeData.id,
            data: onChangeData.data,
          },
        ];
      });
    }
  }, [onChangeData, inputRef.current.value]);

  useEffect(() => {
    if (filtersData.length === 0) {
      return;
    }

    // Process input filters
    const inputItems = filtersData.filter(
      (item: any) => item.type === "aui-input"
    );
    setInputFilters(inputItems.length > 0 ? [inputItems[0]] : []);

    // Process dropdown filters
    const dropdownItems = filtersData.filter(
      (item: any) => item.type === "aui-dropdown"
    );
    setDropdownFilters(dropdownItems);

    // Process multi-select filters
    const multiSelectItems = filtersData.filter(
      (item: any) => item.type === "aui-multiselect"
    );
    setMultiSelectDropdownFilters(multiSelectItems);

    // Process textarea filters
    const textAreaItems = filtersData.filter(
      (item: any) => item.type === "aui-textarea"
    );
    setTextAreaFilters(textAreaItems.length > 0 ? [textAreaItems[0]] : []);
  }, [filtersData]);

  useEffect(() => {
    onChangeHandler({
      inputFilters,
      multiSelectDropdownFilters,
      searchByField,
      dropdownFilters,
      dateRange,
      textAreaFilters,
    });
  }, [
    multiSelectDropdownFilters,
    inputFilters,
    searchByField,
    dropdownFilters,
    dateRange,
    textAreaFilters,
  ]);

  // query all aui and add event listner
  useEffect(() => {
    const cleanupFunctions: any[] = [];

    filters.length > 0 &&
      filters.forEach((config: any) => {
        const {
          filterParams: { id, shadowInputStyles },
          type,
        } = config;
        let ref: any = null;
        let eventType = "";

        switch (type) {
          case "input":
            ref = inputRef.current[id];
            eventType = "auiInputChange";
            break;
          case "dropdown":
            ref = dropdownRef.current[id];
            eventType = "auiDropdownChange";
            break;
          case "multiSelectDropdown":
            ref = multiselectRef.current[id];
            eventType = "auiMultiselectChange";
            break;
          case "textarea":
            ref = textAreaRef.current[id];
            eventType = "auiTextareaChange";
            break;
          default:
            break;
        }

        if (ref) {
          ref.addEventListener(
            eventType,
            type === "multiSelectDropdown"
              ? handleMultiSelectOnChange
              : onChange
          );

          cleanupFunctions.push(() => {
            ref.removeEventListener(
              eventType,
              type === "multiSelectDropdown"
                ? handleMultiSelectOnChange
                : onChange
            );
          });
        }

        /* NATS related style changes - start */

        if (id === "stream-name-field") {
          applyStylesToShadowDomElement(
            "stream-name-field",
            "input-stream-name",
            shadowInputStyles
          );
        }

        document
          .querySelectorAll<any>("aui-dropdown")
          ?.forEach((item: any) =>
            item?.shadowRoot
              ?.querySelector(".aui-dropdown-wrapper label")
              ?.setAttribute("style", "padding-left:0 !important")
          );

        /* NATS related style changes - end */
      });

    return () => {
      cleanupFunctions.forEach((cleanup: any) => cleanup());
    };
  }, [filters]);

  useEffect(() => {
    if (clearAll) {
      setFiltersData([]);
      clearDatePickerVal();
      // clear values from all aui-multiselect filters
      Array.from(document.querySelectorAll("aui-multiselect")).forEach(
        (element: any) => {
          element.clearValue();
        }
      );
      setMultiSelectDropdownFilters([]);
      setInputFilters([]);
      setSearchByField([]);
      setTextAreaFilters([]);
      setClearAll(false);
    }
  }, [clearAll]);

  // Object to store type and respective methods to generate html for filter
  const filterTypes: any = {
    input: generateInputType,
    dropdown: generateDropdownType,
    multiSelectDropdown: generateMultiSelectDropdownType,
    dateRange: generateDateRangeType,
    searchByField: generateSerachByType,
    textarea: generateTextAreaType,
  };
  const filtersList = filters.map((filter: IFilter) => {
    if (filterTypes[filter.type]) {
      return filterTypes[filter.type](filter.filterParams);
    }
    return undefined;
  });

  return (
    <DynamicFiltersStyled className="row">{filtersList}</DynamicFiltersStyled>
  );
};

export default DynamicFilters;
