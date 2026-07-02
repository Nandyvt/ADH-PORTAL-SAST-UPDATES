import { passAuiObject, AddEventListenerToElement } from "common/utils";
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import PermissionContext from "services/PermissionManager/PermissionContext";
import CONSTANTS from "common/constants";
import { formatDataForMultiSelectFilter } from "../util";
import { IFiltersProps } from "./util";

const UserFilters: FunctionComponent<IFiltersProps> = ({
  rolesFilterData,
  clientsFilterData,
  setSearchText,
  setSelectedClients,
  setSelectedRoles,
  searchError,
  clearMultiSelectFilters,
}) => {
  const { loggedInUserObjectContext } = useContext(PermissionContext);
  const multiSelectRoleRef: any = useRef(null);
  const multiSelectClientRef: any = useRef(null);
  const searchFieldRef: any = useRef(null);

  const getSearchText = async (event: any) => {
    const value = event.detail;
    setSearchText(value);
  };

  const getMultiSelectRoles = async (event: any) => {
    const roles = await multiSelectRoleRef.current?.getCurrentValue();
    setSelectedRoles(roles);
  };

  const getMultiSelectClients = async (event: any) => {
    const clients = await multiSelectClientRef.current?.getCurrentValue();
    setSelectedClients(clients);
  };

  AddEventListenerToElement(
    document.querySelector("aui-input"),
    "auiInputSearch",
    getSearchText
  );
  AddEventListenerToElement(
    document.querySelector("aui-multiselect"),
    "auiMultiselectChange",
    getMultiSelectRoles
  );
  AddEventListenerToElement(
    document.getElementById("clients-multiselect"),
    "auiMultiselectChange",
    getMultiSelectClients
  );

  useEffect(() => {
    [multiSelectClientRef, multiSelectRoleRef, searchFieldRef].forEach(
      (ref) => {
        if (typeof ref?.current?.clearValue === "function") {
          ref.current.clearValue();
        }
      }
    );
  }, [clearMultiSelectFilters]);

  const searchFilter = (
    <div className="col-md-6 col-sm-6 col-lg-4 mt-lg-4 mt-md-4">
      <aui-input
        placeholder="Search Mail / Name / ID"
        inputid="usersSearchField"
        clearable
        searchicon
        searchbackground
        direction="column"
        label="Search"
        ref={searchFieldRef}
        errorstate={searchError}
        errormessage="User / Email id not found"
      />
    </div>
  );
  const rolesMultiSelectFilter = (
    <div className="col-md-6 col-lg-4 col-sm-6 mt-lg-4 mb-3 mt-md-4 mb-lg-3">
      {/* AUI v2 MultiSelect Component */}
      <aui-multiselect
        options={passAuiObject(formatDataForMultiSelectFilter(rolesFilterData))}
        iconbackground
        placeholder="Select Roles"
        multiselectid="roleMultiselDropdown"
        label="Select Roles"
        labelgrid="col-sm-3"
        multiselectgrid="col-sm-9"
        direction="column"
        ref={multiSelectRoleRef}
      />
    </div>
  );
  const clientsMultiSelectFilter = (
    <div className="col-md-6 col-sm-6 col-lg-4 mt-lg-4">
      {/* AUI v2 MultiSelect Component */}
      <aui-multiselect
        id="clients-multiselect"
        options={passAuiObject(
          formatDataForMultiSelectFilter(clientsFilterData)
        )}
        iconbackground
        placeholder="Select Client"
        multiselectid="clientMultiselDropdown"
        label="Select Client"
        labelgrid="col-sm-3"
        multiselectgrid="col-sm-9"
        direction="column"
        searchable
        ref={multiSelectClientRef}
      />
    </div>
  );
  return (
    <div className="row justify-content-start mt-sm-3 mb-4 roleBasedStyle-dropdown">
      {searchFilter}
      {rolesMultiSelectFilter}
      {(loggedInUserObjectContext?.roleCode ===
        CONSTANTS.USER_ROLES.SUPER_ADMIN ||
        loggedInUserObjectContext?.roleCode ===
          CONSTANTS.USER_ROLES.SUPER_USER) &&
        clientsMultiSelectFilter}
    </div>
  );
};

export default UserFilters;
