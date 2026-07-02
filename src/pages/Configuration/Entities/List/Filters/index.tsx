import React, { forwardRef, useImperativeHandle } from "react";
import { useQuery } from "react-query";
import store from "app/store";
import CONSTANTS from "common/constants";
import { formatOptionsForClientDropdown, passAuiObject } from "common/utils";
import { logger } from "common/utils/logger.utils";
import {
  setClearFilter,
  setFilters,
} from "pages/Configuration/common/Entities.slice";
import { ClientListService } from "services/api/clients.api";

const EntitiesFilterComp = forwardRef((props: any, ref) => {
  useImperativeHandle(ref, () => ({
    clearFilters: () => {
      props.searchFieldRef.current.clearValue();
      props.clientFilterRef.current.clearValue();
    },
  }));

  const searchFilter = (
    <div className="col-md-4 col-sm-4 col-lg-4">
      <aui-input
        placeholder={CONSTANTS.PLACEHOLDER_TEXT.ENTITIES.LIST_SEARCH}
        inputid="entitiesListingSearchField"
        clearable
        direction="column"
        label="Search"
        ref={props.searchFieldRef}
        value={props.searchValue ? props.searchValue : ""}
        errorstate={props.searchError}
        errormessage={CONSTANTS.ERROR_MESSAGE.ENTITIES.LIST_SEARCH}
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
    <div className="col-md-4 col-lg-4 col-sm-4">
      <aui-dropdown
        id="client-filter"
        dropdownid="client-filter"
        label="Select Source"
        placeholder="Select Source"
        labelgrid="col-sm-3"
        dropdowngrid="col-sm-9"
        direction="column"
        clearable
        iconbackground
        searchable
        value={
          props.clientLabelValue && props.clientCodeValue
            ? `{"label":"${props?.clientLabelValue}","value":"${props?.clientCodeValue}"}`
            : "{}"
        }
        options={passAuiObject(formatOptionsForClientDropdown(clients)) ?? []}
        ref={props.clientFilterRef}
      />
    </div>
  );

  const getFilteredRecords = async () => {
    const searchValue = props.searchFieldRef.current?.value;
    const { value: clientCodeValue, label: clientLabel } =
      await (props.clientFilterRef.current?.getCurrentValue() ?? {
        value: null,
        label: null,
      });
    const storeUpdateObj = {
      search: searchValue,
      source: clientCodeValue,
      clientLabel,
      pageNumber: 1,
    };
    store.dispatch(setFilters(storeUpdateObj));
  };

  const clearFilters = () => {
    props.searchFieldRef.current.clearValue();
    props.clientFilterRef.current.clearValue();
    store.dispatch(setClearFilter());
    props.handleClearAllFilters();
  };

  return (
    <div className="row justify-content-start mt-sm-3-bkp mb-4">
      <div className="d-flex flex-row w-100 mb-4">
        {searchFilter}
        {clientDropdownFilter}
        <div className="col-md-3 col-lg-3 col-sm-3 pl-2 search-clear">
          <aui-button
            variant="primary"
            buttontitle="Search"
            buttonclass="search-btn"
            onClick={getFilteredRecords}
          />
        </div>
        <div className="col-md-1 col-lg-1 col-sm-1 search-clear">
          <aui-button
            variant="link-style"
            buttonclass="clearfilters-btn"
            onClick={(e: any) => {
              e.preventDefault();
              clearFilters();
            }}
            buttontitle="Clear Filters"
          />
        </div>
      </div>
    </div>
  );
});

export default EntitiesFilterComp;
