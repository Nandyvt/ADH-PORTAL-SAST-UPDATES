import React, { FunctionComponent, useRef, useEffect } from "react";
import {
  formatOptionsForMultiSelectFilter,
  passAuiObject,
  AddEventListenerToElement,
} from "common/utils";
import Restricted from "services/PermissionManager/Restricted";
import { ICredentialsFiltersProps, statusFilterOptions } from "./util";

export const CredentialsFilters: FunctionComponent<
  ICredentialsFiltersProps
> = ({
  setSelectedClients,
  setStatus,
  clients = [],
  clearAllFilters = false,
}) => {
  // refs to filters
  const clientsFilterRef: any = useRef(null);
  const statusFilterRef: any = useRef(null);

  const handleClientsFilterChange = async () => {
    const selectedClients = await clientsFilterRef.current?.getCurrentValue();

    setSelectedClients(selectedClients);
  };
  const handleStatusFilterChange = async () => {
    const selectedValue = await statusFilterRef.current?.getCurrentValue();
    setStatus(selectedValue.value);
  };

  AddEventListenerToElement(
    document.querySelector("aui-multiselect"),
    "auiMultiselectChange",
    handleClientsFilterChange
  );

  AddEventListenerToElement(
    document.querySelector("aui-dropdown"),
    "auiDropdownChange",
    handleStatusFilterChange
  );

  // useEffect to clearAll filters
  useEffect(() => {
    const clearFilterValue = (filterRef: any) => {
      if (
        filterRef.current &&
        typeof filterRef.current.clearValue === "function"
      ) {
        filterRef.current.clearValue();
      }
    };

    clearFilterValue(clientsFilterRef);
    clearFilterValue(statusFilterRef);
  }, [clearAllFilters]);

  const clientsMultiSelectFilter = (
    <div className="col-md-6 col-lg-4 col-sm-6 mt-lg-4 mb-4 mt-md-3 mt-sm-3 filter-top-large client-status-filter">
      <aui-multiselect
        options={passAuiObject(formatOptionsForMultiSelectFilter(clients))}
        iconbackground
        placeholder="Select Client"
        multiselectid="roleMultiselDropdown"
        label="Select Client"
        labelgrid="col-sm-3"
        multiselectgrid="col-sm-9"
        direction="column"
        searchable
        ref={clientsFilterRef}
      />
    </div>
  );
  const statusDropdownFilter = (
    <div className="col-md-6 col-lg-4 col-sm-6 mt-lg-4 mb-4 mt-md-3 filter-top-large mt-sm-3 client-status-filter">
      <aui-dropdown
        id="status-filter"
        dropdownid="status-filter"
        label="Select Status"
        placeholder="Select Status"
        labelgrid="col-sm-3"
        dropdowngrid="col-sm-9"
        direction="column"
        clearable={false}
        iconbackground
        options={passAuiObject(statusFilterOptions)}
        ref={statusFilterRef}
      />
    </div>
  );

  const largeScreenFilters = (
    <>
      <Restricted to="account.clients.get">
        {clientsMultiSelectFilter}
      </Restricted>
      {statusDropdownFilter}
    </>
  );
  return <>{largeScreenFilters}</>;
};
