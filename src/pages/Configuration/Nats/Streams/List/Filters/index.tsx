import CONSTANTS from "common/constants";
import { AddEventListenerToElement } from "common/utils";
import React, { RefObject } from "react";

interface IFiltersProps {
  searchError: boolean;
  onChangeSearchInput: any;
  searchFieldRef: RefObject<HTMLAuiInputElement>;
  searchFieldVal: string;
}

function StreamListFilters(props: IFiltersProps) {
  AddEventListenerToElement(
    document.querySelector("aui-input"),
    "auiInputSearch",
    props.onChangeSearchInput
  );
  return (
    <aui-input
      placeholder={CONSTANTS.PLACEHOLDER_TEXT.STREAMS.LIST_SEARCH}
      inputid="streamListingSearchField"
      clearable
      searchicon
      searchbackground
      direction="column"
      label="Search"
      ref={props.searchFieldRef}
      errorstate={props.searchError}
      errormessage={CONSTANTS.ERROR_MESSAGE.STREAMS.LIST_SEARCH}
      value={props.searchFieldVal}
    />
  );
}

export default StreamListFilters;
