import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { useQuery } from "react-query";
import store from "app/store";
import CONSTANTS from "common/constants";
import { formatOptionsForClientDropdown, passAuiObject } from "common/utils";
import { logger } from "common/utils/logger.utils";
import {
  setClearFilter,
  setFilters,
  setPageSize,
} from "pages/Configuration/common/Consumers.slice";
import { consumerTypeFilterOptions } from "pages/Configuration/utils";
import { ClientListService } from "services/api/clients.api";
import { useSelector } from "react-redux";

const ConsumerTabFilterComp = forwardRef<any, any>((props, ref) => {
  const searchFieldRef = useRef<any>(null);
  const typeFilterRef = useRef<any>(null);
  const clientFilterRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    clearFilters: () => {
      searchFieldRef.current.clearValue();
      typeFilterRef.current.clearValue();
      clientFilterRef.current.clearValue();
    },
  }));

  const { search, prepopulateValues } = useSelector(
    (state: any) => state?.consumerList?.consumerTabFilters
  );

  const searchFilter = (
    <div className="col-md-6 col-sm-6 col-lg-8 mt-lg-4 mt-md-4">
      <aui-input
        placeholder="Search Consumer Name"
        inputid="consumersSearchField"
        clearable
        direction="column"
        label="Search"
        ref={searchFieldRef}
        value={search}
      />
    </div>
  );

  const typeDropdownFilter = (
    <div className="col-md-6 col-lg-4 col-sm-6 mt-lg-4 mb-4 mt-md-3  mt-sm-3">
      <aui-dropdown
        id="type-filter"
        dropdownid="type-filter"
        label="Select Type"
        placeholder="Select Type"
        labelgrid="col-sm-3"
        dropdowngrid="col-sm-9"
        direction="column"
        clearable
        iconbackground
        options={passAuiObject(consumerTypeFilterOptions)}
        ref={typeFilterRef}
        value={JSON.stringify({
          label: prepopulateValues?.typeDropdown?.label,
          value: prepopulateValues?.typeDropdown?.value,
        })}
      />
    </div>
  );

  const { data: clients } = useQuery(
    "clients",
    () =>
      ClientListService({
        pageSize: CONSTANTS.MAX_RECORDS,
        pageNumber: 1,
        isActive: true,
      }),
    {
      select: (data) => data?.data?.clients,
      onError: (err) => logger("Error loading clients data ", err),
    }
  );

  const clientDropdownFilter = (
    <div className="col-md-6 col-lg-4 col-sm-6 mb-4">
      <aui-dropdown
        id="client-filter"
        dropdownid="client-filter"
        label="Select Client"
        placeholder="Select Client Name"
        labelgrid="col-sm-3"
        dropdowngrid="col-sm-9"
        direction="column"
        clearable
        iconbackground
        searchable
        options={passAuiObject(formatOptionsForClientDropdown(clients)) ?? []}
        ref={clientFilterRef}
        value={JSON.stringify({
          label: prepopulateValues?.clientDropdown?.label,
          value: prepopulateValues?.clientDropdown?.value,
        })}
      />
    </div>
  );

  const getFilteredRecords = async () => {
    const searchValue = searchFieldRef.current?.value;
    const { value: typeValue, label: typeLabel } =
      await (typeFilterRef.current?.getCurrentValue() ?? {
        value: null,
        label: null,
      });
    const { value: clientCodeValue, label: clientLabel } =
      await (clientFilterRef.current?.getCurrentValue() ?? {
        value: null,
        label: null,
      });
    const storeUpdateObj = {
      search: searchValue,
      type: typeValue?.trim()?.toUpperCase(),
      clientCode: clientCodeValue,
      pageNumber: 1,
      prepopulateValues: {
        typeDropdown: {
          label: typeLabel,
          value: typeValue,
        },
        clientDropdown: {
          label: clientLabel,
          value: clientCodeValue,
        },
      },
    };
    store.dispatch(setFilters(storeUpdateObj));
  };

  const clearFilters = () => {
    searchFieldRef.current.clearValue();
    typeFilterRef.current.clearValue();
    clientFilterRef.current.clearValue();
    store.dispatch(setClearFilter());
    store.dispatch(setPageSize(20));
    props?.clearAllFilterFunc();
  };

  return (
    <div className="row justify-content-start mt-sm-3-bkp mb-4">
      {searchFilter}
      {typeDropdownFilter}
      {clientDropdownFilter}

      <div className="col-lg-8 d-flex show-results-btn-wrapper">
        <aui-button
          variant="primary"
          buttontitle="Search"
          buttonclass="show-results-btn"
          onClick={getFilteredRecords}
        />

        <aui-button
          variant="link-style"
          id="clear-filter-desktop"
          className="d-flex align-self-end"
          onClick={(e: any) => {
            e.preventDefault();
            clearFilters();
          }}
          buttontitle="Clear Filters"
        />
      </div>
    </div>
  );
});

export default ConsumerTabFilterComp;
