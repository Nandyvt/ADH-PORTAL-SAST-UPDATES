// create interface for props for filter
export interface IFiltersProps {
  filters: IFilter[];
  onChangeHandler: any;
  clearAll?: boolean;
  setClearAll?: any;
  clearFilter?: any;
  searchFieldValue?: any;
  searchType?: any;
  appliedFilters?: any;
}

export interface IFilter {
  type: string;
  filterParams: any;
}

export const clearDatePickerVal = () => {
  // DOM manipulation needed here as plugin doesnot support refs
  document.querySelector<any>(".rs-picker-toggle-clean")?.click();
};
